# QSOL-IMC Constellation

**One signal. 99 project nodes.**

QSOL-IMC Constellation is the curated public front door for QSOL-IMC work hosted in the `QSOLKCB` GitHub organisation.

**Pages URL:** https://qsolkcb.github.io/QSOL-IMC/

## What this is

The constellation is a reviewed snapshot of the organisation's public projects, maintained as an explicit **whitelist**. As of 30 October 2026, all 100 public repositories are represented: 99 project nodes plus this directory's own repository, linked through the Source controls. Descriptions, categories and editorial placement are reviewed when refreshing the catalog.

The public site provides:

- 99 curated repository links
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

`Validate Constellation` checks JavaScript syntax, enforces 99 unique described entries, validates categories and exhaustive priority groups, and confirms the referenced assets exist. Both PR validation and Pages deployment run the same catalog check.

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

### Catalog refresh — 30 October 2026

Compared the catalog with GitHub's complete public organisation listing, including forks, and cross-checked repository metadata and READMEs. Added 27 missing projects:

- **Research & foundations:** NS, NS-SIM, NS-LLM, YANG-MILLS, NEXUS, LHC, Trinite, QSOL-SYNTHESIS, CONSTRAINT-SHIFT, NOTEBOOK, and RECEIPTS.
- **Systems & tools:** QSOL-MACH, PROVENANCE, WORKBENCH, RIVET, RUNE, and ROADRUNNER.
- **Sound, play & experiments:** ARCADE, QwakeTF, CorpoWars, BLOAT-OPS, LOWBLOWLEGENDS, QUICKSCOPER, TrustMeBro, ZERO-DAY-DREAD, 486, and RANDO.

Removed the unavailable QSOL-HARNESS entry after its repository URL returned 404. The catalog now contains 99 public project nodes; this directory itself remains linked through the Source controls. Updated every static count and the catalog validator together. The four editorial groups and flagship order are retained.

Descriptions summarise public repository metadata, with README checks for ambiguous projects. Proposed scientific architectures remain described as proposals; satire remains labelled as satire. Visitors make no GitHub API requests.

### Previous refresh — 22 September 2026

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

The catalog keeps public projects discoverable through reviewed descriptions, field filters and editorial ordering. The explicit list records the reviewed scope; newly public repositories can be included in the next catalog refresh.

---

`QSOL-IMC // CONSTELLATION`  
No frameworks · no build step · no trackers · just signal.
