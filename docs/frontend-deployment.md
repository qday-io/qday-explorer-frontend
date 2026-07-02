# Frontend Deployment Guide

## Overview

`qday-explorer-frontend` is a Next.js application built on Blockscout v6 frontend, customized for the QDay blockchain. It is distributed as a Docker image and configured via environment variables.

---

## Image Build Flow

### Workflow

Builds are handled by `.github/workflows/docker-publish.yml` using GitHub-hosted runners (`ubuntu-latest`).

**Triggers:**
- Push to `current` branch (automatic)
- Manual via `workflow_dispatch` (Actions → Run workflow)

**Build steps per run:**

| Step | ENVS_PRESET | Image tags |
|------|-------------|------------|
| QDAY1 Testnet | `qday_testnet` | `testnet`, `testnet-YYYYMMDD` |
| QDAY1 Mainnet | `qday` | `mainnet`, `mainnet-YYYYMMDD` |
| QDAY2 | `qday2` | `qday2`, `qday2-YYYYMMDD` |

All images pushed to: `ghcr.io/qday-io/explorer-frontend`

### ENVS_PRESET

The `ENVS_PRESET` build arg selects a config file from `configs/envs/`:

```
configs/envs/
  .env.qday           → QDAY1 Mainnet
  .env.qday_testnet   → QDAY1 Testnet
  .env.qday2          → QDAY2 (testnet and mainnet share one image)
```

These values are baked into the Next.js bundle at build time.

---

## Environment Variables

### Build-time (baked into image, requires rebuild to change)

Defined in `configs/envs/.env.qday2`:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_NETWORK_NAME` | `QDay Testnet` | Display name shown in the UI title |
| `NEXT_PUBLIC_NETWORK_SHORT_NAME` | `QDay` | Short chain name |
| `NEXT_PUBLIC_NETWORK_ID` | `44005` | Chain ID |
| `NEXT_PUBLIC_NETWORK_CURRENCY_NAME` | `QDAY` | Currency name |
| `NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL` | `QDAY` | Currency symbol |
| `NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS` | `18` | Decimal places |
| `NEXT_PUBLIC_NETWORK_CURRENCY_WEI_NAME` | `bit` | Wei unit name |
| `NEXT_PUBLIC_NETWORK_CURRENCY_GWEI_NAME` | `Qbit` | Gwei unit name |
| `NEXT_PUBLIC_NETWORK_VERIFICATION_TYPE` | `validation` | Block verification type |
| `NEXT_PUBLIC_HOMEPAGE_CHARTS` | `['daily_txs']` | Charts shown on homepage |
| `NEXT_PUBLIC_NAVIGATION_LAYOUT` | `horizontal` | Nav bar layout |
| `NEXT_PUBLIC_COLOR_THEME_DEFAULT` | `dark` | Default color theme |
| `NEXT_PUBLIC_NETWORK_LOGO` | _(local file)_ | Logo path |
| `NEXT_PUBLIC_NETWORK_ICON` | _(local file)_ | Icon path |
| `NEXT_PUBLIC_IS_TESTNET` | `true` | Testnet badge in UI |

### Runtime (injected via docker-compose, no rebuild needed)

Passed as container environment variables at deploy time:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_HOST` | Public explorer domain (e.g. `explorer-test.qday.io`) |
| `NEXT_PUBLIC_APP_PROTOCOL` | Protocol for explorer UI (`https`) |
| `NEXT_PUBLIC_API_HOST` | Blockscout backend host |
| `NEXT_PUBLIC_API_PROTOCOL` | Backend API protocol (`https`) |
| `NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL` | WebSocket protocol (`wss` on HTTPS) |
| `NEXT_PUBLIC_NETWORK_RPC_URL` | RPC URL shown to users in MetaMask |
| `NEXT_PUBLIC_STATS_API_HOST` | Stats service host (leave empty to disable charts) |
| `NEXT_PUBLIC_VISUALIZE_API_HOST` | Visualizer host (leave empty to disable) |

These are set in `qday2-deploy/env.blockscout.example` under the **Frontend runtime configuration** section.

---

## Triggering a New Build

### After merging to `current` (automatic)

Any push or merged PR to `current` automatically triggers a build of all three images.

### Manual trigger (without merging)

1. Go to [Actions → Create and publish Docker image](https://github.com/qday-io/qday-explorer-frontend/actions/workflows/docker-publish.yml)
2. Click **Run workflow**
3. Select the target branch
4. Click **Run workflow**

> Use this to test a feature branch before merging.

---

## Updating Config Without Rebuilding

To change URLs or host settings on the deployed server:

1. Edit `qday2-deploy/.env.blockscout` — update the relevant runtime vars
2. Restart only the frontend container:

```bash
docker compose -f docker-compose.blockscout.yml --env-file .env.blockscout up -d frontend
```

No image rebuild or re-pull needed.

---

## Rollback

Use the date-stamped tag in `FRONTEND_IMAGE`:

```
FRONTEND_IMAGE=ghcr.io/qday-io/explorer-frontend:qday2-20260629
```

Then restart the frontend container as above.
