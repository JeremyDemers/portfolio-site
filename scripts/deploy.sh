#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

: "${ARCADE_API_URL:?Set ARCADE_API_URL to the deployed shared Arcade API endpoint}"
: "${TWIN_API_URL:?Set TWIN_API_URL to the deployed Digital Twin API endpoint}"
: "${GOOGLE_CLIENT_ID:?Set GOOGLE_CLIENT_ID to the Google Web Client ID}"

export NEXT_PUBLIC_TETRIS_API_URL="$ARCADE_API_URL"
export NEXT_PUBLIC_NEON_SHATTER_API_URL="$ARCADE_API_URL"
export NEXT_PUBLIC_TWIN_API_URL="$TWIN_API_URL"
export NEXT_PUBLIC_GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID"

cd "$ROOT_DIR"
npm ci
npm run build

SITE_BUCKET="$(terraform -chdir=infrastructure output -raw site_bucket_name)"
DISTRIBUTION_ID="$(terraform -chdir=infrastructure output -raw cloudfront_distribution_id)"

aws s3 sync out/ "s3://${SITE_BUCKET}/" --delete
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"

echo "Portfolio deployed to $(terraform -chdir=infrastructure output -raw site_url)"
