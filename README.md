# QSOL-IMC Constellation

**One signal. 57 project nodes.**

QSOL-IMC Constellation is the curated public front door for selected QSOL-IMC work hosted in the `QSOLKCB` GitHub organisation.

**Pages URL:** https://qsolkcb.github.io/QSOL-IMC/

## What this is

The organisation contains more than the projects represented here. The constellation is intentionally a **whitelist**, not an automatic organisation scrape: only repositories deliberately selected for QSOL-IMC are shown.

The public site provides:

- 57 curated repository links
- retro phosphor / observatory interface
- deterministic constellation background generated from repository names
- instant repository search
- field/category filtering
- random-node navigation
- one-click sharing of the constellation URL
- responsive layouts for desktop and mobile
- keyboard shortcuts (`/` to search, `Esc` to clear)
- reduced-motion support
- zero third-party JavaScript, fonts, analytics or trackers
- zero build step

## Repository structure

```text
.
├── .github/workflows/pages.yml    # GitHub Pages deployment
├── assets/
│   └── qsol-constellation.svg     # favicon / constellation mark
├── .nojekyll
├── app.js                         # curated repository whitelist + UI logic
├── effects.css                    # starfield / content layering
├── index.html                     # site structure
├── styles.css                     # retro CRT / observatory styling
├── LICENSE
└── README.md
```

## Maintaining the constellation

The authoritative public whitelist lives in `REPOS` inside [`app.js`](app.js).

To add a repository, add one object:

```js
{ name: "REPOSITORY-NAME", category: "Research" }
```

Supported fields are currently:

- `Research`
- `Physics`
- `AI`
- `Security`
- `Audio`
- `Games`

The repository URL is generated locally as `https://github.com/QSOLKCB/<name>`; the site does **not** call the GitHub API in visitors' browsers.

## Local preview

No Node.js, package manager or build tool is required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## GitHub Pages

`.github/workflows/pages.yml` deploys the repository root whenever `main` changes. It uses GitHub's official Pages actions and requests only the permissions needed for deployment.

For a brand-new Pages repository, GitHub may require **Settings → Pages → Source → GitHub Actions** to be selected once. After that, merges to `main` deploy automatically.

## Design principle

This is a constellation, not an org dump. The site deliberately keeps the selection explicit so repositories can be included or excluded by authorship and project ownership rather than whatever happens to exist in the organisation at a given moment.

---

`QSOL-IMC // CONSTELLATION`  
No frameworks · no build step · no trackers · just signal.
