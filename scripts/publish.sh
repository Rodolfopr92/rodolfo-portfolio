#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REMOTE_URL="${1:-}"
COMMIT_MESSAGE="${2:-Publish developer portfolio v0.6.9}"

if [[ -z "$REMOTE_URL" ]]; then
  echo "Usage: bash scripts/publish.sh https://github.com/USERNAME/REPOSITORY.git [commit message]"
  exit 2
fi

command -v git >/dev/null || { echo "git is required"; exit 1; }
command -v python3 >/dev/null || { echo "python3 is required"; exit 1; }
command -v node >/dev/null || { echo "node is required"; exit 1; }

python3 scripts/validate_site.py

if grep -R --line-number "example.com" index.html content.js; then
  echo
  echo "WARNING: placeholder example.com URLs remain."
  echo
fi

[[ -d .git ]] || git init
git checkout -B main

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git add -A
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "$COMMIT_MESSAGE"
fi

git push -u origin main

echo
echo "Push complete."
echo "GitHub: Settings → Pages → Source: GitHub Actions"
