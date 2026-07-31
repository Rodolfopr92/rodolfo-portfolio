#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [[ -f "$SCRIPT_DIR/index.html" ]]; then
  RELEASE_ROOT="$SCRIPT_DIR"
elif [[ -f "$SCRIPT_DIR/../index.html" ]]; then
  RELEASE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
elif [[ -n "${RELEASE_DIR:-}" && -f "$RELEASE_DIR/index.html" ]]; then
  RELEASE_ROOT="$(cd "$RELEASE_DIR" && pwd)"
else
  echo "Release files were not found. Put this script inside the extracted release, or set RELEASE_DIR=/path/to/release." >&2
  exit 2
fi

TARGET="${1:-$HOME/Cloud Money/rodolfo-portfolio-live}"
REPO_URL="${REPO_URL:-https://github.com/Rodolfopr92/rodolfo-portfolio.git}"
MAIN_BRANCH="${MAIN_BRANCH:-main}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-Install accepted signature mark across portfolio v0.7.8}"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_BRANCH="backup-before-signature-mark-v0.7.8-$STAMP"

for cmd in git rsync node python3; do
  command -v "$cmd" >/dev/null || { echo "$cmd is required" >&2; exit 1; }
done

if [[ ! -d "$TARGET/.git" ]]; then
  if [[ -e "$TARGET" && ! -d "$TARGET" ]]; then
    echo "Target exists but is not a directory: $TARGET" >&2
    exit 2
  fi
  mkdir -p "$(dirname "$TARGET")"
  git clone "$REPO_URL" "$TARGET"
fi

cd "$TARGET"
if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$REPO_URL"
fi

git fetch origin --prune
git checkout "$MAIN_BRANCH"
git pull --ff-only origin "$MAIN_BRANCH"
git branch "$BACKUP_BRANCH"
echo "Local safety branch created: $BACKUP_BRANCH"

rsync -av --delete \
  --exclude '.git/' \
  --exclude 'CNAME' \
  --exclude 'reports/*.png' \
  "$RELEASE_ROOT/" "$TARGET/"

node --check app.js
node --check content.js
python3 scripts/validate_site.py

git add -A
if git diff --cached --quiet; then
  echo "No repository changes detected. Nothing to commit."
  exit 0
fi

git commit -m "$COMMIT_MESSAGE"
git push origin "$MAIN_BRANCH"

echo "Repository updated: $REPO_URL ($MAIN_BRANCH)"
echo "Rollback reference: $BACKUP_BRANCH"
