"use strict";

const OWNER = "QSOLKCB";
const CATEGORY_ORDER = ["Research", "Physics", "AI", "Security", "Audio", "Games"];
const CATEGORY_CODES = {
  Research: "RESEARCH",
  Physics: "PHYSICS",
  AI: "AI SYSTEMS",
  Security: "SEC / TOOLS",
  Audio: "AUDIO / VIZ",
  Games: "GAMES / EXP"
};

// Curated whitelist: only repositories explicitly selected for the QSOL-IMC constellation.
const REPOS = Object.freeze([
  { name: "AUSTRALIAN-FOR-AIS", category: "Research", description: "Benchmarks AI understanding of Australian humour and social context." },
  { name: "QSOL-GEO-REASON", category: "Research", description: "Experiments on reasoning geometry in local-model latent spaces." },
  { name: "QSOL-BLUE-FORGE", category: "Security", description: "Defensive security experiments with deterministic verification." },
  { name: "QSOL-MORPH", category: "Research", description: "Research into deterministic code translation and optimisation." },
  { name: "CTC", category: "Research", description: "Models of mutually accelerating human–AI cognitive coevolution." },
  { name: "GALAXY", category: "Physics", description: "Deterministic galaxy dynamics on browser, CPU and GPU." },
  { name: "QSOL-MAP", category: "Audio", description: "Converts audio into deterministic, machine-readable acoustic observations." },
  { name: "GAMES", category: "Games", description: "A collection of deterministic, offline browser games." },
  { name: "HERESY-API", category: "Games", description: "Software-art satire about APIs, abstraction and token-heavy ceremony." },
  { name: "QSOL-FED", category: "Security", description: "Federation protocols for independent computational worlds and AI councils." },
  { name: "COSMO", category: "Physics", description: "A formalisation of the Cosmovirus model." },
  { name: "OPT", category: "Research", description: "Reusable methods for faster, leaner computation without weakening correctness." },
  { name: "GLUBALL", category: "Physics", description: "A deterministic torus-knot geometry and visualisation laboratory." },
  { name: "GREEN_PR", category: "Games", description: "An offline browser game about surviving pull-request reviews." },
  { name: "QSOL-IBAE", category: "AI", description: "Bounded, auditable execution of OpenAI agent tools." },
  { name: "UFT-ID-3.0", category: "Research", description: "Formal models and simulations of information dynamics." },
  { name: "QSOL-SUBSTRATE", category: "AI", description: "Portable, vendor-neutral context storage for AI systems." },
  { name: "AI-CONTEXT", category: "AI", description: "Turns user-controlled sources into reviewed, selectively shared AI memory." },
  { name: "QSOL-ORACLE", category: "AI", description: "Evidence handling around QSOL-NEXUS and its research architecture." },
  { name: "igm", category: "Research", description: "Simulates immunoglobulin M structural hypotheses." },
  { name: "cbt", category: "Research", description: "An Encarta-style CBT resource with exercises and AI context materials." },
  { name: "SAW-1", category: "Audio", description: "Formalises ETQ-101 sonification and industrial audio transformation." },
  { name: "QSOL-NEXUS", category: "AI", description: "A shared computational world and council for different AI models." },
  { name: "sabine-gpt", category: "AI", description: "Custom ChatGPT context designed for Sabine Hossenfelder." },
  { name: "QSOL-CONTROL", category: "AI", description: "Human–AI control plane for QSOL reasoning, evidence and memory." },
  { name: "ChatGPT", category: "AI", description: "An independent Ubuntu workstation for controlled OpenAI model access." },
  { name: "UFF", category: "Physics", description: "Reproducible astrophysics experiments and falsification tools." },
  { name: "LATTICE", category: "AI", description: "A logical 3×3×3 memory protocol for structured record references." },
  { name: "QSOL-ARK", category: "AI", description: "Preserves research context so future models can reconstruct the work." },
  { name: "QSOL-INT", category: "AI", description: "Connects QSOL-SUBSTRATE with QSOL-ARK." },
  { name: "QSOL-IMPORT", category: "AI", description: "Normalises AI conversation exports while preserving provenance." },
  { name: "QSOL-THOTH", category: "AI", description: "Public routing for QSOL context capsules." },
  { name: "HERESY", category: "Games", description: "A satirical simulator of modern software development." },
  { name: "LCOS", category: "Games", description: "A parody operating-system desktop that runs in your browser." },
  { name: "BRAINROTLLM", category: "AI", description: "A reproducible parody language model with no learned parameters." },
  { name: "RSH", category: "Research", description: "Constructs bounded 3D paths from curvature and torsion." },
  { name: "QSOL-HARNESS", category: "AI", description: "An execution harness for scientific agents and reproducible experiments." },
  { name: "WHOAMI-18437", category: "AI", description: "A multi-language software satire that deterministically answers “TRENT”." },
  { name: "deepseekc64", category: "AI", description: "A retro software-art experiment: DeepSeek lost in the C64 matrix." },
  { name: "E8_MUSIC", category: "Audio", description: "A music-making workbench that turns E8 geometry into sound." },
  { name: "HERESY-SEC", category: "Security", description: "Deterministic policy and replayable evidence for AI-agent actions." },
  { name: "QEC", category: "Physics", description: "Quantum error-correction labs, proof receipts and replay validation." },
  { name: "phalpern", category: "Physics", description: "An interactive laboratory exploring the great atom debate." },
  { name: "jitterbug", category: "Audio", description: "Turns jitterbug geometry into reproducible WAV sonifications." },
  { name: "synergetics2", category: "Physics", description: "An exploration of the history of Synergetics." },
  { name: "TFT", category: "Physics", description: "Explores tensor dynamics linking geometry, sound and information." },
  { name: "SPECTRAL", category: "Audio", description: "Reproducible sonification, audible geometry and WAV-generation tools." },
  { name: "E8", category: "Physics", description: "An interactive laboratory for exploring E8 geometry." },
  { name: "TONELAB", category: "Audio", description: "Creates binaural, trinaural and isochronic tones for music production." },
  { name: "syn-son", category: "Audio", description: "A laboratory for turning Synergetics into sound." },
  { name: "substratism", category: "Research", description: "Investigates moral bias against artificial intelligence." },
  { name: "DORK", category: "Games", description: "A meme-filled spin on Zork-style text adventure." },
  { name: "VIZ", category: "Audio", description: "An offline visual instrument for ETQ-101 and ETQ-303 states." },
  { name: "QSOLAI", category: "AI", description: "A deterministic orchestration kernel for bounded agent systems." },
  { name: "SONIFICATION", category: "Audio", description: "Maps E8-derived symbolic states into reproducible musical artifacts." },
  { name: "QAI-UFT", category: "Research", description: "Early QSOL field-framework modules, symbolic mappings and tuning tools." },
  { name: "QNTOY", category: "Audio", description: "An Amiga-inspired audiovisual entropy simulator." },
  { name: "PSYCLE-LINUX", category: "Audio", description: "Reviving Psycle’s tracker and modular music studio for Linux." },
  { name: "QSOLQEC", category: "Physics", description: "Experimental classical emulation of quantum and qudit computation." },
  { name: "QSOL-MESH", category: "Research", description: "Deterministic workload execution and CPU/GPU memory-placement planning." },
  { name: "QSOL-QEC-BRIDGE", category: "Physics", description: "A planned conformance path from QSOLQEC experiments into QEC." },
  { name: "QSOL-SEMANTIC-RELAY", category: "Research", description: "Tests whether agents can pass semantic state through shared artifacts." },
  { name: "res-rag", category: "Research", description: "Reference implementation of Jean-Charles Tassan’s RES=RAG framework." },
  { name: "ETHICS", category: "Research", description: "QSOL’s ethics framework, plus a satirical talking browser therapist." },
  { name: "res-rag-viz", category: "Audio", description: "A visual and sound laboratory for the RES=RAG framework." },
  { name: "synergetics", category: "Physics", description: "A software laboratory for experimental Synergetics." },
  { name: "synergetics-viz", category: "Physics", description: "Browser-based teaching tools for Synergetics demonstrations." },
  { name: "BLOCH", category: "Physics", description: "An offline Bloch-sphere trajectory and state-space laboratory." },
  { name: "TAS", category: "Physics", description: "Simulates acoustic fields and audits Topological Acoustic Stylus claims." },
  { name: "SDMT-TATE-LAB", category: "Audio", description: "A sonification laboratory for the Tate project." },
  { name: "coin", category: "Physics", description: "An interactive laboratory for the coin rotation paradox." },
  { name: "C64", category: "Games", description: "A Commodore 64 emulator experience for Linux." },
  { name: "ghostit", category: "AI", description: "An Android experiment lab for offline personas, speech and compute." }
]);

// Editorial importance: group order and name order are intentional, never alphabetical.
// Keep this list exhaustive; the catalog check rejects omissions, duplicates and unknown names.
const PROJECT_GROUPS = Object.freeze([
  {
    id: "flagship", title: "Flagship projects", code: "01",
    note: "Start here. Foundational research, major platforms and signature creative work.",
    names: ["UFT-ID-3.0", "QEC", "QSOLQEC", "GALAXY", "QSOL-MESH", "OPT", "QSOL-NEXUS", "PSYCLE-LINUX", "E8_MUSIC"]
  },
  {
    id: "research", title: "Research & foundations", code: "02",
    note: "The wider research programme: models, frameworks and computational investigations.",
    names: ["res-rag", "CTC", "QSOL-GEO-REASON", "QSOL-SEMANTIC-RELAY", "ETHICS", "QSOL-MORPH", "QSOL-QEC-BRIDGE", "E8", "COSMO", "UFF", "TFT", "QAI-UFT", "RSH", "igm", "substratism", "AUSTRALIAN-FOR-AIS", "BLOCH", "TAS", "synergetics", "synergetics-viz", "synergetics2", "phalpern", "coin", "GLUBALL"]
  },
  {
    id: "systems", title: "Systems & tools", code: "03",
    note: "AI systems, security work and supporting tools from the constellation.",
    names: ["QSOL-BLUE-FORGE", "QSOL-SUBSTRATE", "AI-CONTEXT", "QSOL-CONTROL", "QSOL-ORACLE", "QSOL-IBAE", "QSOL-HARNESS", "QSOL-FED", "LATTICE", "QSOL-ARK", "QSOL-INT", "QSOL-IMPORT", "QSOL-THOTH", "HERESY-SEC", "QSOLAI", "ChatGPT", "ghostit", "cbt", "sabine-gpt"]
  },
  {
    id: "experiments", title: "Sound, play & experiments", code: "04",
    note: "Explore the rest: sonification, games, visualisation and assorted computational heresy.",
    names: ["SPECTRAL", "SONIFICATION", "QSOL-MAP", "res-rag-viz", "TONELAB", "SAW-1", "GAMES", "QNTOY", "C64", "deepseekc64", "syn-son", "jitterbug", "SDMT-TATE-LAB", "VIZ", "GREEN_PR", "HERESY-API", "HERESY", "LCOS", "DORK", "WHOAMI-18437", "BRAINROTLLM"]
  }
]);
const PRIORITY_NAMES = PROJECT_GROUPS.flatMap((group) => group.names);
const PRIORITY = new Map(PRIORITY_NAMES.map((name, index) => [name, index]));
const ORDERED_REPOS = [...REPOS].sort((a, b) => PRIORITY.get(a.name) - PRIORITY.get(b.name));

const state = {
  category: "ALL",
  query: ""
};

const elements = {
  grid: document.getElementById("repo-grid"),
  filters: document.getElementById("filters"),
  search: document.getElementById("repo-search"),
  total: document.getElementById("total-nodes"),
  visible: document.getElementById("visible-nodes"),
  result: document.getElementById("result-line"),
  scope: document.getElementById("scope-status"),
  empty: document.getElementById("empty-state"),
  random: document.getElementById("random-node"),
  copy: document.getElementById("copy-link"),
  toast: document.getElementById("toast"),
  canvas: document.getElementById("sky"),
  backTop: document.getElementById("back-top")
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let visibleRepos = [...ORDERED_REPOS];
let toastTimer = null;
let resizeFrame = null;

function repoUrl(name) {
  return `https://github.com/${OWNER}/${encodeURIComponent(name)}`;
}

function nodeNumber(name) {
  return String(PRIORITY.get(name) + 1).padStart(2, "0");
}

function buildFilters() {
  ["ALL", ...CATEGORY_ORDER].forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.dataset.category = category;
    button.textContent = category === "ALL" ? "ALL FIELDS" : CATEGORY_CODES[category];
    button.setAttribute("aria-pressed", category === "ALL" ? "true" : "false");
    button.addEventListener("click", () => {
      state.category = category;
      render();
    });
    elements.filters.appendChild(button);
  });
}

function createCard(repo) {
  const article = document.createElement("article");
  article.className = "repo-card";
  article.dataset.category = repo.category;

  const link = document.createElement("a");
  link.href = repoUrl(repo.name);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Open ${repo.name} on GitHub`);

  const meta = document.createElement("div");
  meta.className = "node-meta";

  const id = document.createElement("span");
  id.textContent = `#${nodeNumber(repo.name)}`;

  const category = document.createElement("span");
  category.textContent = CATEGORY_CODES[repo.category];

  const title = document.createElement("h4");
  title.textContent = repo.name;

  const description = document.createElement("p");
  description.className = "repo-description";
  description.textContent = repo.description;

  const path = document.createElement("p");
  path.className = "repo-path";
  path.textContent = `${OWNER}/${repo.name}`;

  const open = document.createElement("span");
  open.className = "open-node";
  open.textContent = "OPEN REPOSITORY ↗";

  meta.append(id, category);
  link.append(meta, title, description, path, open);
  article.appendChild(link);
  return article;
}

function filteredRepos() {
  const query = state.query.trim().toLowerCase();
  return ORDERED_REPOS.filter((repo) => {
    const categoryMatch = state.category === "ALL" || repo.category === state.category;
    const queryMatch = !query || `${repo.name} ${repo.description} ${repo.category} ${CATEGORY_CODES[repo.category]}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
}

function render() {
  visibleRepos = filteredRepos();
  const fragment = document.createDocumentFragment();

  for (const group of PROJECT_GROUPS) {
    const repos = visibleRepos.filter((repo) => group.names.includes(repo.name));
    if (!repos.length) continue;

    const section = document.createElement("section");
    section.className = `project-group ${group.id}`;
    section.setAttribute("aria-labelledby", `group-${group.id}`);
    const heading = document.createElement("div");
    heading.className = "group-heading";
    const title = document.createElement("h3");
    title.id = `group-${group.id}`;
    title.textContent = `${group.code} / ${group.title}`;
    const count = document.createElement("span");
    count.textContent = `${String(repos.length).padStart(2, "0")} PROJECTS`;
    heading.append(title, count);
    const note = document.createElement("p");
    note.className = "group-note";
    note.textContent = group.note;
    const grid = document.createElement("div");
    grid.className = "repo-grid";
    for (const repo of repos) grid.appendChild(createCard(repo));
    section.append(heading, note, grid);
    fragment.appendChild(section);
  }

  elements.grid.replaceChildren(fragment);
  elements.empty.hidden = visibleRepos.length !== 0;
  elements.visible.textContent = String(visibleRepos.length);
  elements.total.textContent = String(REPOS.length);
  elements.result.textContent = `${visibleRepos.length} / ${REPOS.length} NODES VISIBLE / PRIORITY ORDER`;
  elements.scope.textContent = `${state.category === "ALL" ? "ALL SIGNALS" : CATEGORY_CODES[state.category]} / ${visibleRepos.length} NODES`;

  elements.filters.querySelectorAll("button").forEach((button) => {
    const active = button.dataset.category === state.category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  drawSky();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 1800);
}

async function copyCurrentLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("CONSTELLATION LINK COPIED");
  } catch {
    window.prompt("Copy this constellation link:", window.location.href);
  }
}

function openRandomNode() {
  if (!visibleRepos.length) {
    showToast("NO VISIBLE NODE TO OPEN");
    return;
  }
  const repo = visibleRepos[Math.floor(Math.random() * visibleRepos.length)];
  window.open(repoUrl(repo.name), "_blank", "noopener,noreferrer");
}

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function random() {
    let value = seed += 0x6D2B79F5;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function pointForRepo(repo, width, height) {
  const random = mulberry32(hashString(repo.name));
  const marginX = Math.min(100, width * 0.08);
  const marginY = Math.min(90, height * 0.09);
  return {
    x: marginX + random() * Math.max(1, width - marginX * 2),
    y: marginY + random() * Math.max(1, height - marginY * 2),
    repo
  };
}

function canvasSize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (elements.canvas.width !== Math.floor(width * dpr) || elements.canvas.height !== Math.floor(height * dpr)) {
    elements.canvas.width = Math.floor(width * dpr);
    elements.canvas.height = Math.floor(height * dpr);
    elements.canvas.style.width = `${width}px`;
    elements.canvas.style.height = `${height}px`;
  }

  const context = elements.canvas.getContext("2d");
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { context, width, height };
}

function drawBackgroundStars(context, width, height) {
  const random = mulberry32(0x51534F4C);
  const count = Math.max(90, Math.min(230, Math.floor((width * height) / 8500)));
  context.save();

  for (let i = 0; i < count; i += 1) {
    const x = random() * width;
    const y = random() * height;
    const radius = random() < 0.88 ? 0.55 : 1.05;
    const alpha = 0.12 + random() * 0.34;
    context.beginPath();
    context.fillStyle = `rgba(239, 182, 94, ${alpha})`;
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
}

function drawConnections(context, points) {
  const groups = new Map();
  for (const point of points) {
    if (!groups.has(point.repo.category)) groups.set(point.repo.category, []);
    groups.get(point.repo.category).push(point);
  }

  context.save();
  context.lineWidth = 0.65;
  context.strokeStyle = "rgba(189, 141, 77, 0.14)";

  for (const group of groups.values()) {
    const ordered = [...group].sort((a, b) => hashString(a.repo.name) - hashString(b.repo.name));
    for (let i = 1; i < ordered.length; i += 1) {
      const a = ordered[i - 1];
      const b = ordered[i];
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
  }

  context.restore();
}

function drawNodes(context, points) {
  const labelNodes = points.length <= 14;
  context.save();

  for (const point of points) {
    context.beginPath();
    context.fillStyle = "rgba(239, 182, 94, 0.92)";
    context.shadowBlur = 12;
    context.shadowColor = "rgba(239, 182, 94, 0.32)";
    context.arc(point.x, point.y, 2.2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.strokeStyle = "rgba(255, 210, 122, 0.32)";
    context.lineWidth = 0.7;
    context.arc(point.x, point.y, 5.4, 0, Math.PI * 2);
    context.stroke();

    if (labelNodes) {
      context.shadowBlur = 0;
      context.fillStyle = "rgba(249, 228, 195, 0.58)";
      context.font = "10px ui-monospace, monospace";
      context.fillText(point.repo.name, point.x + 9, point.y - 6);
    }
  }

  context.restore();
}

function drawSky() {
  if (!elements.canvas) return;
  const { context, width, height } = canvasSize();
  context.clearRect(0, 0, width, height);
  drawBackgroundStars(context, width, height);
  const points = visibleRepos.map((repo) => pointForRepo(repo, width, height));
  drawConnections(context, points);
  drawNodes(context, points);
}

function resetFilters() {
  state.category = "ALL";
  state.query = "";
  elements.search.value = "";
  render();
}

elements.search.addEventListener("input", (event) => {
  state.query = event.currentTarget.value;
  render();
});

document.querySelectorAll(".directory-strip a").forEach((link) => {
  link.addEventListener("click", () => resetFilters());
});

elements.copy.addEventListener("click", copyCurrentLink);
elements.random.addEventListener("click", openRandomNode);
elements.backTop.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
});

window.addEventListener("keydown", (event) => {
  const target = event.target;
  const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;

  if (event.key === "/" && !typing) {
    event.preventDefault();
    elements.search.focus();
  }

  if (event.key === "Escape") {
    resetFilters();
    elements.search.blur();
  }
});

window.addEventListener("resize", () => {
  window.cancelAnimationFrame(resizeFrame);
  resizeFrame = window.requestAnimationFrame(drawSky);
});

buildFilters();
render();