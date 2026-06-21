---
permalink: /transactions.html
title: Transactions
layout: Post
content-type: static
---

You can find most of these in the public domain.

<div id="txn-experience">
  <div class="tx-controls">
    <div class="tx-search">
      <input id="tx-q" class="search-input" type="search" placeholder="Search" autocomplete="off">
    </div>
    <div class="tx-cats" id="tx-cats" role="group" aria-label="Filter by transaction type"></div>
  </div>

  <ol class="tx-list" id="tx-list"></ol>
  <p class="tx-empty" id="tx-empty" hidden>No matches. <button type="button" id="tx-clear">Clear filters</button></p>
</div>

<script>
(function () {
  var DATA = [{% for row in site.data.transactions %}{"client":{{ row.client | jsonify }},"blurb":{{ row.blurb | jsonify }},"cats":{{ row.cats | split: "|" | jsonify }},"sectors":{{ row.sectors | split: "|" | jsonify }},"subs":{{ row.subs | split: "|" | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}];
  DATA.forEach(function (r, i) { r._id = i; });
  var state = { cats: [], sector: "All", subs: [], q: "" };
  var catsAutoSelected = false; // true when state.cats was set by autoActivateCat(), not a manual click
  var openSet = {}; // row._id -> true, persists each card's manually-set open/closed state across re-renders

  var elList   = document.getElementById("tx-list");
  var elCats   = document.getElementById("tx-cats");
  var elQ      = document.getElementById("tx-q");
  var elEmpty  = document.getElementById("tx-empty");

  (function init() {

  // Transaction filter row (top)
  var CAT_ORDER = ["Advisory", "Contract", "Due Diligence", "Litigation"];

  // Counts against entries matching sector/subs/search, ignoring the cats filter itself —
  // so the number shown is "how many results this cat would include," not "how many are shown now."
  function catCount(c) {
    var pool = DATA.filter(function (r) { return matches(r, true); });
    return c === "All" ? pool.length : pool.filter(function (r) { return r.cats.indexOf(c) > -1; }).length;
  }

  function syncCatCounts() {
    Array.prototype.forEach.call(elCats.querySelectorAll(".tx-cat"), function (b) {
      var cat = b.dataset.cat;
      if (!cat) return;
      var count = catCount(cat);
      var n = b.querySelector(".tx-cat-n");
      if (n) n.textContent = "(" + count + ")";
      b.disabled = count === 0 && cat !== "All";
    });
  }
  ["All"].concat(CAT_ORDER).forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tx-cat" + (c === "All" ? " is-on" : "");
    b.setAttribute("aria-pressed", c === "All" ? "true" : "false");
    b.dataset.cat = c;
    b.innerHTML = esc(c) + ' <span class="tx-cat-n">(' + catCount(c) + ')</span>';
    b.addEventListener("click", function () { toggleCat(c); });
    elCats.appendChild(b);
  });

  // Expand-all toggle — sits at the right of the filter row (margin-left: auto in CSS)
  var elExpandAll = document.createElement("button");
  elExpandAll.type = "button";
  elExpandAll.className = "tx-expand-all";
  elExpandAll.setAttribute("aria-pressed", "false");
  elExpandAll.textContent = "Expand all";
  elCats.appendChild(elExpandAll);

  // Flex-break: zero-width on wide screens, 100% on narrow — forces chip to its own row
  var elFlexBreak = document.createElement("div");
  elFlexBreak.className = "tx-flex-break";
  elFlexBreak.setAttribute("aria-hidden", "true");
  elFlexBreak.hidden = true;
  elCats.appendChild(elFlexBreak);

  // Active sector chip — sits after expand-all so chip ends up rightmost when present
  var elSectorChip = document.createElement("button");
  elSectorChip.type = "button";
  elSectorChip.className = "tx-sector-chip";
  elSectorChip.hidden = true;
  elSectorChip.addEventListener("click", function () { setSector("All"); });
  elCats.appendChild(elSectorChip);

  // Active sub chips — one per selected sub-category, sits after the sector chip
  var elSubChips = document.createElement("span");
  elSubChips.className = "tx-sub-chips";
  elCats.appendChild(elSubChips);

  function toggleCat(c) {
    catsAutoSelected = false; // a manual click always overrides any auto-derived selection
    if (c === "All") {
      state.cats = [];
    } else {
      var idx = state.cats.indexOf(c);
      if (idx >= 0) state.cats.splice(idx, 1);
      else state.cats.push(c);
    }
    syncCatButtons();
    render();
  }

  function syncCatButtons() {
    Array.prototype.forEach.call(elCats.querySelectorAll(".tx-cat"), function (b) {
      var cat = b.dataset.cat;
      if (!cat) return;
      var on = (cat === "All") ? state.cats.length === 0 : state.cats.indexOf(cat) >= 0;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function syncFlexBreak() {
    elFlexBreak.hidden = state.sector === "All" && state.subs.length === 0;
  }

  function setSector(s) {
    state.sector = s;
    if (s === "All") {
      elSectorChip.hidden = true;
      elSectorChip.innerHTML = "";
    } else {
      elSectorChip.innerHTML = esc(s) + ' <span class="tx-sector-chip-x" aria-hidden="true">×</span><span class="tx-sr"> – clear sector filter</span>';
      elSectorChip.hidden = false;
    }
    syncFlexBreak();
    // Manually-opened cards (openSet) survive sector pivots. If search or a sub-cat is active,
    // applyExpansionState's force-open re-expands the new filtered set, same as it would for any
    // other filter change — sector pivots are not a special case.
    autoActivateCat();
    render();
    if (s !== "All") {
      elCats.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function syncSubChips() {
    elSubChips.innerHTML = "";
    state.subs.forEach(function (s) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tx-sector-chip tx-sub-chip";
      chip.innerHTML = esc(s) + ' <span class="tx-sector-chip-x" aria-hidden="true">×</span><span class="tx-sr"> – clear ' + esc(s) + ' filter</span>';
      chip.addEventListener("click", function () { toggleSub(s); });
      elSubChips.appendChild(chip);
    });
    syncFlexBreak();
  }

  function toggleSub(s) {
    var idx = state.subs.indexOf(s);
    var deselecting = idx >= 0;
    if (deselecting) state.subs.splice(idx, 1);
    else state.subs.push(s);
    syncSubChips();
    // Manually-opened cards (openSet) survive sub-cat changes, same as for sector pivots.
    // While subs remain active the force-open keeps everything visible expanded; once the last
    // sub is removed, only cards that were manually open before subs were turned on stay open.
    autoActivateCat();
    render();
    elCats.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  elQ.addEventListener("input", function () {
    state.q = elQ.value.trim().toLowerCase();
    autoActivateCat();
    render();
  });

  document.getElementById("tx-clear").addEventListener("click", function () {
    state = { cats: [], sector: "All", subs: [], q: "" };
    elQ.value = "";
    syncCatButtons();
    syncSubChips();
    setSector("All");
  });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function matches(r, skipCats) {
    if (!skipCats && state.cats.length > 0 && !state.cats.some(function (c) { return r.cats.indexOf(c) >= 0; })) return false;
    if (state.sector !== "All" && r.sectors.indexOf(state.sector) === -1) return false;
    if (state.subs.length > 0 && !state.subs.every(function (s) { return r.subs.indexOf(s) >= 0; })) return false;
    if (state.q) {
      var hay = (r.client + " " + r.blurb + " " + r.sectors.join(" ") + " " + r.subs.join(" ") + " " + r.cats.join(" ")).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  // If narrowing by sector/sub-cat (ignoring the cats filter itself) leaves only one distinct
  // cat among the matches, select that cat filter automatically — it's already implied by the
  // narrower filters, so this just surfaces it. Never overrides a cat the user picked by hand;
  // reverts itself once the result set is no longer narrow enough to imply a single cat.
  function autoActivateCat() {
    var pool = DATA.filter(function (r) { return matches(r, true); });
    var catsUnion = {};
    pool.forEach(function (r) {
      r.cats.forEach(function (c) { catsUnion[c] = true; });
    });
    var distinctCats = Object.keys(catsUnion);
    var isNarrow = distinctCats.length > 0 && distinctCats.length < CAT_ORDER.length;
    if (pool.length > 0 && isNarrow && (state.cats.length === 0 || catsAutoSelected)) {
      state.cats = distinctCats;
      catsAutoSelected = true;
      syncCatButtons();
    } else if (catsAutoSelected && (!isNarrow || pool.length === 0)) {
      state.cats = [];
      catsAutoSelected = false;
      syncCatButtons();
    }
  }

  function render() {
    syncCatCounts();
    var hits = DATA.filter(function (r) { return matches(r); });
    elList.innerHTML = "";
    elEmpty.hidden = hits.length !== 0;

    hits.forEach(function (r) {
      var li = document.createElement("li");
      li.className = "tx-item";
      li.dataset.id = r._id;
      var sectorEyebrow = r.sectors.map(function (s) {
        return '<button type="button" class="tx-eyebrow-link" data-sector="' + esc(s) + '">' + esc(s) + "</button>";
      }).join('<span class="tx-eyebrow-sep"> · </span>');
      var catTags = r.cats.map(function (c) {
        return '<span class="tx-tag tx-tag--cat">' + esc(c) + "</span>";
      }).join("");
      var subTags = r.subs.map(function (s) {
        var on = state.subs.indexOf(s) >= 0;
        return '<button type="button" class="tx-tag' + (on ? " is-active" : "") + '" data-sub="' + esc(s) + '">' + esc(s) + "</button>";
      }).join("");
      li.innerHTML =
        '<p class="tx-cat-eyebrow">' + sectorEyebrow + "</p>" +
        '<div class="tx-item-toggle" role="button" tabindex="0" aria-expanded="false">' +
          '<h3 class="tx-client">' + esc(r.client) + "</h3>" +
          '<svg class="tx-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
            '<polyline points="9 6 15 12 9 18"/>' +
          '</svg>' +
        '</div>' +
        '<div class="tx-item-body">' +
          '<div class="tx-item-body-inner">' +
            '<p class="tx-blurb">' + esc(r.blurb) + "</p>" +
            '<div class="tx-tags">' + catTags + subTags + "</div>" +
          '</div>' +
        '</div>';
      elList.appendChild(li);
    });

    // Wire sector eyebrow clicks. Clicking an eyebrow is a "commit to this sector" gesture:
    // pin the source card into openSet (so it survives the resulting filter change) and prune
    // any other openSet entries whose row doesn't include the new sector (so cards from prior
    // browsing in other sectors don't resurface later as ghost-open cards when filters widen).
    // The sector chip × is the opposite — a "back to exploration" gesture that doesn't prune.
    Array.prototype.forEach.call(elList.querySelectorAll(".tx-eyebrow-link"), function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var src = btn.closest(".tx-item");
        var newSector = btn.dataset.sector;
        Object.keys(openSet).forEach(function (id) {
          var row = DATA[+id];
          if (!row || row.sectors.indexOf(newSector) === -1) delete openSet[id];
        });
        if (src) openSet[src.dataset.id] = true;
        setSector(newSector);
      });
    });

    // Wire sub tag clicks
    Array.prototype.forEach.call(elList.querySelectorAll("[data-sub]"), function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleSub(btn.dataset.sub);
      });
    });

    // Wire row toggle (div with role=button needs explicit keyboard handling)
    Array.prototype.forEach.call(elList.querySelectorAll(".tx-item-toggle"), function (toggle) {
      toggle.addEventListener("click", function () { toggleItem(toggle.closest(".tx-item")); });
      toggle.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleItem(toggle.closest(".tx-item"));
        }
      });
    });

    // After building DOM, apply the right initial expansion state.
    // Search active → expand all visible matches; otherwise → collapsed.
    applyExpansionState();
  }

  // True if a card is already shown open for reasons that have nothing to do with a manual click
  // (active search or active sub-cat filter force every visible card open).
  function isImpliedOpen() {
    return state.q.length > 0 || state.subs.length > 0;
  }

  // Per-entry toggle. Only records a genuine manual open into openSet — clicking a card that's
  // already open because of search/sub-cat filtering doesn't pin it open beyond that filter.
  function toggleItem(li) {
    if (!li) return;
    var open = !li.classList.contains("is-open");
    li.classList.toggle("is-open", open);
    var toggle = li.querySelector(".tx-item-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    var id = li.dataset.id;
    if (open && !isImpliedOpen()) openSet[id] = true;
    else if (!open) delete openSet[id];
    updateExpandAllButton();
  }

  // Sets every visible entry's expansion state. Called after render().
  // Rule: search non-empty or a sub-category filter active → force all visible cards open.
  // This force-open is transient — once the filter is cleared, cards revert to whatever was
  // manually open (openSet).
  function applyExpansionState() {
    var forceOpen = state.q.length > 0 || state.subs.length > 0;
    Array.prototype.forEach.call(elList.querySelectorAll(".tx-item"), function (li) {
      var open = forceOpen || !!openSet[li.dataset.id];
      li.classList.toggle("is-open", open);
      var toggle = li.querySelector(".tx-item-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    updateExpandAllButton();
  }

  // Update the expand-all button's label based on current entry states.
  // Rule: as soon as ANY entry is open, label flips to "Collapse all".
  function updateExpandAllButton() {
    var items = elList.querySelectorAll(".tx-item");
    if (items.length === 0) {
      elExpandAll.hidden = true;
      elExpandAll.textContent = "Expand all";
      elExpandAll.setAttribute("aria-pressed", "false");
      return;
    }
    elExpandAll.hidden = false;
    var openCount = elList.querySelectorAll(".tx-item.is-open").length;
    var anyOpen = openCount > 0;
    elExpandAll.textContent = anyOpen ? "Collapse all" : "Expand all";
    elExpandAll.setAttribute("aria-pressed", anyOpen ? "true" : "false");
  }

  // Expand-all toggle: button label and action stay in sync.
  // If any entry is open → label is "Collapse all" → click closes all.
  // If none are open → label is "Expand all" → click opens all.
  elExpandAll.addEventListener("click", function () {
    var items = elList.querySelectorAll(".tx-item");
    var openCount = elList.querySelectorAll(".tx-item.is-open").length;
    var openAll = openCount === 0;
    Array.prototype.forEach.call(items, function (li) {
      li.classList.toggle("is-open", openAll);
      var toggle = li.querySelector(".tx-item-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", openAll ? "true" : "false");
      var id = li.dataset.id;
      if (openAll && !isImpliedOpen()) openSet[id] = true;
      else if (!openAll) delete openSet[id];
    });
    updateExpandAllButton();
  });

    render();
  })();
})();
</script>

<style>
/* Inherits Jekyll Garden's theme variables: --bg, --bg2, --text, --title, --brand, --border.
   Uses theme's Inter font and spacing scale. Adapts to [data-theme="dark"] automatically. */

#txn-experience {
  max-width: 48rem;
  margin: 0;
}

/* ---- Controls ---- */
#txn-experience .tx-controls {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#txn-experience .tx-search {
  position: relative;
}

#txn-experience .tx-search input[type="search"]::-webkit-search-cancel-button,
#txn-experience .tx-search input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

#txn-experience .tx-search input[type="search"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

#txn-experience .tx-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

#txn-experience .tx-cat {
  font: inherit;
  font-family: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.35rem 0.7rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

#txn-experience .tx-cat:hover {
  background: var(--bg2);
}

#txn-experience .tx-cat .tx-cat-n {
  font-size: 0.72rem;
  font-weight: 400;
  opacity: 0.65;
  margin-left: 0.1rem;
}

#txn-experience .tx-cat.is-on {
  background: transparent;
  border-color: var(--brand);
  color: var(--brand);
  font-weight: 600;
}

#txn-experience .tx-cat.is-on:hover {
  background: color-mix(in srgb, var(--brand) 8%, transparent);
}

#txn-experience .tx-cat.is-on .tx-cat-n {
  color: var(--brand);
  opacity: 0.7;
}

#txn-experience .tx-cat:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

#txn-experience .tx-cat:disabled:hover {
  background: transparent;
}

#txn-experience .tx-sector-chip {
  font: inherit;
  font-family: inherit;
  font-size: 0.8rem;
  font-style: italic;
  cursor: pointer;
  padding: 0.35rem 0.7rem;
  border-radius: 0.25rem;
  border: 1px solid var(--brand);
  background: transparent;
  color: var(--brand);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.15s;
}

#txn-experience .tx-sector-chip:hover {
  background: color-mix(in srgb, var(--brand) 8%, transparent);
}

#txn-experience .tx-sector-chip[hidden] {
  display: none;
}

/* Flex line-break: invisible on wide screens; on splitscreen/mobile forces chip to its own row */
#txn-experience .tx-flex-break {
  flex-basis: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}

#txn-experience .tx-flex-break[hidden] {
  display: none;
}

@media (max-width: 768px) {
  #txn-experience .tx-flex-break {
    flex-basis: 100%;
  }
}

#txn-experience .tx-sub-chips {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

#txn-experience .tx-sub-chip {
  font-style: normal;
  border: 1px solid var(--brand);
  background: var(--brand);
  color: #fff;
  transition: opacity 0.15s;
}

#txn-experience .tx-sub-chip:hover {
  background: var(--brand);
  opacity: 0.85;
}

#txn-experience .tx-sector-chip-x {
  font-style: normal;
  font-size: 1rem;
  line-height: 1;
  opacity: 0.7;
}

#txn-experience .tx-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

/* ---- List ---- */
#txn-experience .tx-list {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
}

#txn-experience .tx-item {
  border-top: 1px solid var(--border);
  padding: 1.25rem 0 0;
}

#txn-experience .tx-item:last-child {
  border-bottom: 1px solid var(--border);
}

#txn-experience .tx-cat-eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 0.4rem;
  line-height: 1.3;
  color: var(--brand);
}

#txn-experience .tx-eyebrow-link {
  font: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  color: inherit;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;
}

#txn-experience .tx-eyebrow-link:hover,
#txn-experience .tx-eyebrow-link:focus-visible {
  opacity: 0.7;
  text-decoration: underline;
  text-underline-offset: 3px;
  outline: none;
}

#txn-experience .tx-eyebrow-sep {
  color: var(--brand);
  opacity: 0.5;
  margin: 0 0.1rem;
}

/* The row toggle — div with role=button so the eyebrow's real <button> can nest. */
#txn-experience .tx-item-toggle {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.25rem;
  outline: none;
}

#txn-experience .tx-item-toggle:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
  border-radius: 0.125rem;
}

#txn-experience .tx-client {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
  color: var(--title);
}

/* Chevron rotates 90° when item is open */
#txn-experience .tx-chevron {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: var(--text);
  opacity: 0.5;
  margin-top: 0.25rem;
  transition: transform 0.25s ease, opacity 0.2s;
}

#txn-experience .tx-item-toggle:hover .tx-chevron {
  opacity: 1;
}

#txn-experience .tx-item.is-open .tx-chevron {
  transform: rotate(90deg);
  opacity: 0.8;
}

/* Collapsible body — uses grid-template-rows trick for smooth variable-height animation */
#txn-experience .tx-item-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s ease;
}

#txn-experience .tx-item.is-open .tx-item-body {
  grid-template-rows: 1fr;
}

#txn-experience .tx-item-body-inner {
  overflow: hidden;
  min-height: 0;
}

#txn-experience .tx-blurb {
  margin: 0 0 0.8rem;
  color: var(--text);
  font-size: 0.933rem;
  line-height: 1.65;
}

#txn-experience .tx-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding-bottom: 1.25rem;
}

#txn-experience .tx-tag {
  font: inherit;
  font-family: inherit;
  font-size: 0.75rem;
  line-height: 1;
  padding: 0.35rem 0.55rem;
  border-radius: 0.25rem;
  background: var(--bg2);
  color: var(--text);
  white-space: nowrap;
  border: none;
}

#txn-experience .tx-tag--cat {
  font-weight: 600;
  color: var(--title);
}

/* Sub tags are clickable filters; cat tags (above) stay static.
   Unselected = outline (signals "clickable filter"); selected = solid fill. */
#txn-experience button.tx-tag {
  cursor: pointer;
  border: 1px solid var(--brand);
  background: transparent;
  color: var(--brand);
  transition: background 0.15s, color 0.15s;
}

#txn-experience button.tx-tag:hover {
  background: color-mix(in srgb, var(--brand) 12%, transparent);
}

#txn-experience button.tx-tag.is-active {
  background: var(--brand);
  color: #fff;
}

#txn-experience button.tx-tag.is-active:hover {
  background: var(--brand);
  opacity: 0.85;
}


/* ---- Expand-all toggle (inline in filter row, pushed right) ---- */
#txn-experience .tx-expand-all {
  font: inherit;
  font-family: inherit;
  font-size: 0.8rem;
  color: var(--brand);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.35rem 0.2rem;
  margin-left: auto;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  opacity: 0.9;
  transition: opacity 0.2s;
  white-space: nowrap;
}

#txn-experience .tx-expand-all:hover,
#txn-experience .tx-expand-all:focus-visible {
  opacity: 1;
  outline: none;
}

#txn-experience .tx-expand-all[hidden] {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  #txn-experience .tx-item-body { transition: none !important; }
  #txn-experience .tx-chevron { transition: opacity 0.2s !important; }
}

/* ---- Empty state ---- */
#txn-experience .tx-empty {
  margin: 2rem 0;
  text-align: center;
  color: var(--text);
  font-size: 0.95rem;
}

#txn-experience .tx-empty button {
  font: inherit;
  font-size: 0.9rem;
  color: var(--brand);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 0;
  opacity: 0.9;
  transition: opacity 0.2s;
}

#txn-experience .tx-empty button:hover {
  opacity: 1;
}

/* ---- Mobile ---- */
@media (max-width: 560px) {
  /* On mobile, expand-all flows inline rather than being pushed to the right,
     but keep a clear gap so it doesn't sit on top of the last filter button. */
  #txn-experience .tx-expand-all {
    margin-left: 1rem;
  }
}


</style>