"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const source = fs.readFileSync("app.js", "utf8");
const context = vm.createContext({});
// Evaluate the real catalog declarations, without requiring a browser or duplicating data.
vm.runInContext(source.slice(0, source.indexOf("const state =")), context);
const { repos, groups, ordered, categories } = JSON.parse(vm.runInContext(
  "JSON.stringify({ repos: REPOS, groups: PROJECT_GROUPS, ordered: ORDERED_REPOS, categories: CATEGORY_ORDER })",
  context
));
const names = repos.map(repo => repo.name);
assert.equal(repos.length, 73, "Update the reviewed catalog count when adding/removing projects");
assert.equal(new Set(names).size, repos.length, "Repository names must be unique");
for (const repo of repos) {
  assert.match(repo.name, /^[A-Za-z0-9_.-]+$/);
  assert.ok(categories.includes(repo.category), `Unknown category: ${repo.name}`);
  assert.ok(typeof repo.description === "string" && repo.description.trim().length >= 15, `Missing description: ${repo.name}`);
  assert.ok(repo.description.length <= 130, `Keep the description short: ${repo.name}`);
}
const priorities = groups.flatMap(group => group.names);
assert.equal(new Set(groups.map(group => group.id)).size, groups.length, "Group IDs must be unique");
assert.equal(new Set(priorities).size, priorities.length, "A repository must appear in exactly one group");
assert.deepEqual([...priorities].sort(), [...names].sort(), "Priority groups must cover the entire catalog");
assert.deepEqual(ordered.map(repo => repo.name), priorities, "Display order must follow editorial priority");
const html = fs.readFileSync("index.html", "utf8");
for (const group of groups) assert.ok(html.includes(`href="#group-${group.id}"`), `Missing directory shortcut: ${group.id}`);
assert.ok(html.includes(`${repos.length} PROJECT NODES`), "Hero count is stale");
assert.ok(html.includes(`${repos.length} curated project nodes`), "Social preview count is stale");
console.log(`Validated ${repos.length} described projects in ${groups.length} exhaustive priority groups.`);
