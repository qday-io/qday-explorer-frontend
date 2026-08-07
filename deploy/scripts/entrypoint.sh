#!/bin/bash


export_envs_from_preset() {
  if [ -z "$ENVS_PRESET" ]; then
      return
  fi

  if [ "$ENVS_PRESET" = "none" ]; then
      return
  fi

  local preset_file="./configs/envs/.env.$ENVS_PRESET"

  if [ ! -f "$preset_file" ]; then
      return
  fi

  # Runtime env wins; the preset only fills in what the runtime (docker-compose
  # environment) did NOT set. This keeps every setting — including NETWORK_ID and
  # RPC/API hosts — overridable at deploy time, so nothing chain-specific is hard
  # baked into the image. The preset is a safe default, not an override.
  while IFS='=' read -r name value; do
      name="${name#"${name%%[![:space:]]*}"}"  # Trim leading whitespace
      if [[ -n $name && $name == "NEXT_PUBLIC_"* ]]; then
          # Only export from the preset if the variable is not already set at runtime.
          if [[ -z "${!name+x}" ]]; then
              export "$name"="$value"
          fi
      fi
  done < <(grep "^[^#;]" "$preset_file")
}

# If there is a preset, load the environment variables from the its file
export_envs_from_preset

# Download external assets
./download_assets.sh ./public/assets/configs
if [ $? -ne 0 ]; then
  echo "🛑 Failed to download external assets. The application cannot start."
  exit 1
fi

# Check run-time ENVs values
if [ "$SKIP_ENVS_VALIDATION" != "true" ]; then
  ./validate_envs.sh
  if [ $? -ne 0 ]; then
    exit 1
  fi
else
  echo "😱 Skipping ENVs validation."
  echo
fi

# Generate favicons bundle
./favicon_generator.sh
if [ $? -ne 0 ]; then
  echo "👎 Unable to generate favicons bundle."
else
  echo "👍 Favicons bundle successfully generated."
fi
echo

# Generate OG image
node --no-warnings ./og_image_generator.js

# Create envs.js file with run-time environment variables for the client app
./make_envs_script.sh

# Generate multichain config
node ./deploy/tools/multichain-config-generator/dist/index.js

# Generate essential dapps chains config
node ./deploy/tools/essential-dapps-chains-config-generator/dist/index.js

# Generate sitemap.xml and robots.txt files
./sitemap_generator.sh

# Generate llms.txt file
node ./deploy/tools/llms-txt-generator/dist/index.js

# Print list of enabled features
node ./feature-reporter.js

echo "Starting Next.js application"
exec "$@"
