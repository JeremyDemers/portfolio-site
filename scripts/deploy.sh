#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"
npm ci
npm run build

SITE_BUCKET="$(terraform -chdir=infrastructure output -raw site_bucket_name)"
DISTRIBUTION_ID="$(terraform -chdir=infrastructure output -raw cloudfront_distribution_id)"

aws s3 sync out/ "s3://${SITE_BUCKET}/" --delete
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"

echo "Portfolio deployed to $(terraform -chdir=infrastructure output -raw site_url)"

