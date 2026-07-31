# Deployment

The release contains a reusable updater for the existing GitHub repository.

```bash
bash scripts/update_existing_repo.sh "$HOME/Cloud Money/rodolfo-portfolio-live"
```

Defaults:

- repository: `https://github.com/Rodolfopr92/rodolfo-portfolio.git`
- branch: `main`
- commit: `Apply portfolio performance pass v0.7.5`

Override them when needed:

```bash
REPO_URL="https://github.com/OWNER/REPOSITORY.git" \
MAIN_BRANCH="main" \
COMMIT_MESSAGE="Describe this release" \
bash scripts/update_existing_repo.sh /path/to/local/repository
```

The updater:

1. clones the repository when the target folder does not exist;
2. fetches and fast-forwards the main branch;
3. creates a local timestamped safety branch;
4. copies the release while preserving `.git`, `CNAME` and local report screenshots;
5. runs JavaScript and site validation;
6. commits only when files changed;
7. pushes the selected branch.

Before commercial launch, replace all `example.com` URLs, configure or disable WhatsApp and Telegram, and add the final absolute social metadata.
