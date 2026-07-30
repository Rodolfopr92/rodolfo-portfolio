#!/usr/bin/env bash
set -euo pipefail
RELEASE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${1:-}"
if [[ -z "$TARGET" || ! -d "$TARGET/.git" ]]; then
  echo "Usage: bash scripts/update_existing_repo.sh /path/to/rodolfo-portfolio"
  echo "The target must already be a Git repository."
  exit 2
fi
command -v rsync >/dev/null || { echo "rsync is required"; exit 1; }
rsync -av --delete   --exclude '.git/'   --exclude 'CNAME'   --exclude 'reports/*.png'   "$RELEASE_ROOT/" "$TARGET/"
cd "$TARGET"
node --check app.js
node --check content.js
git add -A
git commit -m "Optimize mobile portfolio and project-first hero" || true
git push origin main
echo "GitHub update pushed. Pages will redeploy automatically."
