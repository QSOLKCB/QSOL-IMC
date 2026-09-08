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
  { name: "AUSTRALIAN-FOR-AIS", category: "Research" },
  { name: "QSOL-GEO-REASON", category: "Research" },
  { name: "QSOL-BLUE-FORGE", category: "Research" },
  { name: "QSOL-MORPH", category: "Research" },
  { name: "CTC", category: "Research" },
  { name: "GALAXY", category: "Physics" },
  { name: "QSOL-MAP", category: "Research" },
  { name: "GAMES", category: "Games" },
  { name: "HERESY-API", category: "Security" },
  { name: "QSOL-FED", category: "Security" },
  { name: "COSMO", category: "Physics" },
  { name: "OPT", category: "Physics" },
  { name: "GLUBALL", category: "Games" },
  { name: "GREEN_PR", category: "Security" },
  { name: "QSOL-IBAE", category: "Research" },
  { name: "UFT-ID-3.0", category: "Research" },
  { name: "QSOL-SUBSTRATE", category: "Research" },
  { name: "AI-CONTEXT", category: "AI" },
  { name: "QSOL-ORACLE", category: "AI" },
  { name: "igm", category: "AI" },
  { name: "cbt", category: "AI" },
  { name: "SAW-1", category: "AI" },
  { name: "QSOL-NEXUS", category: "AI" },
  { name: "sabine-gpt", category: "AI" },
  { name: "QSOL-CONTROL", category: "AI" },
  { name: "ChatGPT", category: "AI" },
  { name: "UFF", category: "Physics" },
  { name: "LATTICE", category: "Physics" },
  { name: "QSOL-ARK", category: "Research" },
  { name: "QSOL-INT", category: "Research" },
  { name: "QSOL-IMPORT", category: "Research" },
  { name: "QSOL-THOTH", category: "Research" },
  { name: "HERESY", category: "Security" },
  { name: "LCOS", category: "Security" },
  { name: "BRAINROTLLM", category: "AI" },
  { name: "RSH", category: "Research" },
  { name: "QSOL-HARNESS", category: "AI" },
  { name: "WHOAMI-18437", category: "AI" },
  { name: "deepseekc64", category: "AI" },
  { name: "E8_MUSIC", category: "Audio" },
  { name: "HERESY-SEC", category: "Security" },
  { name: "QEC", category: "Physics" },
  { name: "phalpern", category: "Physics" },
  { name: "jitterbug", category: "Physics" },
  { name: "synergetics2", category: "Physics" },
  { name: "TFT", category: "Physics" },
  { name: "SPECTRAL", category: "Audio" },
  { name: "E8", category: "Physics" },
  { name: "TONELAB", category: "Audio" },
  { name: "syn-son", category: "Audio" },
  { name: "substratism", category: "Audio" },
  { name: "DORK", category: "Security" },
  { name: "VIZ", category: "Audio" },
  { name: "QSOLAI", category: "AI" },
  { name: "SONIFICATION", category: "Audio" },
  { name: "QAI-UFT", category: "Research" },
  { name: "QNTOY", category: "Physics" }
]);

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

let visibleRepos = [...REPOS];
let toastTimer = null;
let resizeFrame = null;

function repoUrl(name) {
  return `https://github.com/${OWNER}/${encodeURIComponent(name)}`;
}

function nodeNumber(name) {
  return String(REPOS.findIndex((repo) => repo.name === name) + 1).padStart(2, "0");
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
  id.textContent = `NODE ${nodeNumber(repo.name)}`;

  const category = document.createElement("span");
  category.textContent = CATEGORY_CODES[repo.category];

  const title = document.createElement("h3");
  title.textContent = repo.name;

  const path = document.createElement("p");
  path.className = "repo-path";
  path.textContent = `${OWNER}/${repo.name}`;

  const open = document.createElement("span");
  open.className = "open-node";
  open.textContent = "OPEN REPOSITORY ↗";

  meta.append(id, category);
  link.append(meta, title, path, open);
  article.appendChild(link);
  return article;
}

function filteredRepos() {
  const query = state.query.trim().toLocaleLowerCase();
  return REPOS.filter((repo) => {
    const categoryMatch = state.category === "ALL" || repo.category === state.category;
    const queryMatch = !query || `${repo.name} ${repo.category} ${CATEGORY_CODES[repo.category]}`.toLocaleLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
}

function render() {
  visibleRepos = filteredRepos();
  const fragment = document.createDocumentFragment();

  for (const repo of visibleRepos) {
    fragment.appendChild(createCard(repo));
  }

  elements.grid.replaceChildren(fragment);
  elements.empty.hidden = visibleRepos.length !== 0;
  elements.visible.textContent = String(visibleRepos.length);
  elements.total.textContent = String(REPOS.length);
  elements.result.textContent = `${visibleRepos.length} / ${REPOS.length} NODES VISIBLE`;
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
    context.fillStyle = `rgba(166, 255, 190, ${alpha})`;
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
  context.strokeStyle = "rgba(118, 201, 141, 0.14)";

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
    context.fillStyle = "rgba(166, 255, 190, 0.92)";
    context.shadowBlur = 12;
    context.shadowColor = "rgba(166, 255, 190, 0.32)";
    context.arc(point.x, point.y, 2.2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.strokeStyle = "rgba(255, 210, 122, 0.32)";
    context.lineWidth = 0.7;
    context.arc(point.x, point.y, 5.4, 0, Math.PI * 2);
    context.stroke();

    if (labelNodes) {
      context.shadowBlur = 0;
      context.fillStyle = "rgba(221, 255, 229, 0.58)";
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

elements.copy.addEventListener("click", copyCurrentLink);
elements.random.addEventListener("click", openRandomNode);
elements.backTop.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
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
