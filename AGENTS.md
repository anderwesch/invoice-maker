<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Repo Workflows

- Install dependencies with `npm install` for local development.
- Start the app with `npm run dev` and open `http://localhost:3000`.
- Use `npm run lint` before handing off changes.
- Use `npm run build` to verify the production build locally.
- CI in `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, and `npm run build` on pushes to `main`, `master`, and `codex/**`, plus all pull requests.
- GitHub issue intake is scaffolded under `.github/ISSUE_TEMPLATE/` for `bug`, `feature`, and `task`.
- Suggested GitHub label conventions live in `docs/github-labels.md`.
- TODO: there is no repo-defined test script yet; do not invent one in instructions.
