#!/bin/bash

echo "🌀 Creating client script with ENV values..."

# Define the output file name
output_file="${1:-./public/assets/envs.js}"

touch $output_file;
truncate -s 0 $output_file;

# Load build-baked defaults from .env, but do NOT override anything already set
# at runtime (docker-compose environment). Runtime wins; .env is only a fallback,
# so no chain-specific value is hard-baked into the image.
if [ -f .env ]; then
    while IFS='=' read -r name value; do
        name="${name#"${name%%[![:space:]]*}"}"  # trim leading whitespace
        [[ -z "$name" || "$name" == \#* ]] && continue
        if [[ -z "${!name+x}" ]]; then
            export "$name"="$value"
        fi
    done < .env
fi

echo "window.__envs = {" >> $output_file;

# Iterate through all environment variables
for var in $(env | grep '^NEXT_PUBLIC_' | cut -d= -f1); do
  # Skip variables that start with NEXT_PUBLIC_VERCEL. Vercel injects these
  # and they can cause runtime errors, particularly when commit messages wrap lines.
  if [[ $var == NEXT_PUBLIC_VERCEL* ]]; then
    continue
  fi

  # Get the value of the variable
  value="${!var}"

  # Replace double quotes with single quotes
  value="${value//\"/\'}"

  # Write the variable name and value to the output file
  echo "${var}: \"${value}\"," >> "$output_file"
done

echo "}" >> $output_file;

echo "✅ Done."
