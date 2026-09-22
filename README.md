# QSOL-IMC Constellation

**One signal. 73 project nodes.**

QSOL-IMC Constellation is the curated public front door for selected QSOL-IMC work hosted in the `QSOLKCB` GitHub organisation.

**Pages URL:** https://qsolkcb.github.io/QSOL-IMC/

## What this is

The organisation contains more than the projects represented here. The constellation is intentionally a **whitelist**, not an automatic organisation scrape: only repositories deliberately selected for QSOL-IMC are shown.

The public site provides:

- 73 curated repository links
- amber monochrome workstation interface with static scanlines and an orbital field monitor
- four editorial priority groups, with flagship work first
- short, searchable descriptions for every project
- deterministic constellation background generated from repository names
- instant repository and description search
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
├── .github/workflows/
│   ├── pages.yml                   # GitHub Pages deployment
│   └── validate.yml                # syntax/catalog/static checks
├── assets/
│   └── qsol-constellation.svg      # favicon / constellation mark
├── .nojekyll
├── app.js                          # curated repository whitelist + UI logic
├── effects.css                     # starfield / content layering
├── index.html                      # site structure
├── styles.css                      # amber workstation styling
├── scripts/validate-catalog.cjs     # catalog and priority validation
├── LICENSE
└── README.md
```

## Maintaining the constellation

The authoritative public whitelist lives in `REPOS` inside [`app.js`](app.js).

To add a repository, add one object:

```js
{ name: "REPOSITORY-NAME", category: "Research", description: "A short, factual description of what it does." }
```

Add the same name to exactly one `PROJECT_GROUPS.names` array in `app.js`. Group order and name order define importance; filtering preserves that order. Update the reviewed count in `scripts/validate-catalog.cjs`, the static counts in `index.html`, and this README.

Supported categories are currently:

- `Research`
- `Physics`
- `AI`
- `Security`
- `Audio`
- `Games`

The repository URL is generated locally as `https://github.com/QSOLKCB/<name>`; the site does **not** call the GitHub API in visitors' browsers.

`Validate Constellation` checks JavaScript syntax, enforces 73 unique described entries, validates categories and exhaustive priority groups, and confirms the referenced assets exist. Both PR validation and Pages deployment run the same catalog check.

```sh
node --check app.js
node scripts/validate-catalog.cjs
```

### Editorial order

1. **Flagship projects** — foundational research, major platforms, and signature music work.
2. **Research & foundations** — supporting models, formalisation, experiments, and ethics.
3. **Systems & tools** — context, orchestration, security, and supporting applications.
4. **Sound, play & experiments** — audio labs, games, visualisation, and software satire.

Priority is an editorial navigation choice, not a scientific quality score or a GitHub popularity ranking. Rank numbers remain stable when searching or filtering.

### Catalog refresh — 22 September 2026

Compared the existing catalog with all public QSOLKCB repositories (including the three already-selected forks). Added 16 missing projects: PSYCLE-LINUX, QSOLQEC, QSOL-MESH, QSOL-QEC-BRIDGE, QSOL-SEMANTIC-RELAY, res-rag, res-rag-viz, ETHICS, synergetics, synergetics-viz, BLOCH, TAS, SDMT-TATE-LAB, coin, C64, and ghostit. The directory itself remains linked through the Source controls.

Descriptions are concise editorial summaries of each repository’s public GitHub description, supplemented by its README where metadata was ambiguous. They describe project purpose without treating proposals as completed capabilities. The res-rag entry credits Jean-Charles Tassan’s framework. Category corrections follow those same sources. No private repositories are included, and visitors still make no GitHub API requests.

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
