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
    <div class="tx-chips" id="tx-chips"></div>
  </div>

  <ol class="tx-list" id="tx-list"></ol>
  <p class="tx-empty" id="tx-empty" hidden>No matches. <button type="button" id="tx-clear">Clear filters</button></p>
</div>

<script>
(function () {
  var DATA = [{% for row in site.data.transactions %}{"client":{{ row.client | jsonify }},"blurb":{{ row.blurb | jsonify }},"cats":{{ row.cats | split: "|" | jsonify }},"sectors":{{ row.sectors | split: "|" | jsonify }},"subs":{{ row.subs | split: "|" | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}];
  DATA.forEach(function (r, i) { r._id = i; });

  var CAT_ORDER = ["Advisory", "Contract", "Due Diligence", "Litigation"];

  // cats are OR across active filters (union); sector is single-select (every row has one
  // sector, so multi-select is unreachable via eyebrows); subs are AND (intersection).
  var state = { cats: [], sector: "", subs: [], q: "" };
  var catsIndicated = []; // cats present in the current sector/sub pool — visual only, not filtering

  var elList  = document.getElementById("tx-list");
  var elCats  = document.getElementById("tx-cats");
  var elChips = document.getElementById("tx-chips");
  var elQ     = document.getElementById("tx-q");
  var elEmpty = document.getElementById("tx-empty");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // skip: an object like {cats:true} to ignore that facet during matching (used for count pools).
  function matches(r, skip) {
    skip = skip || {};
    if (!skip.cats && state.cats.length > 0
        && !state.cats.some(function (c) { return r.cats.indexOf(c) >= 0; })) return false;
    if (!skip.sector && state.sector && r.sectors.indexOf(state.sector) === -1) return false;
    if (!skip.subs && state.subs.length > 0
        && !state.subs.every(function (s) { return r.subs.indexOf(s) >= 0; })) return false;
    if (state.q) {
      var hay = (r.client + " " + r.blurb + " " + r.sectors.join(" ") + " " + r.subs.join(" ") + " " + r.cats.join(" ")).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  // --- Cat filter buttons (top row) ---

  function catCount(c) {
    var pool = DATA.filter(function (r) { return matches(r, { cats: true }); });
    return c === "All" ? pool.length : pool.filter(function (r) { return r.cats.indexOf(c) >= 0; }).length;
  }

  ["All"].concat(CAT_ORDER).forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tx-cat";
    b.dataset.cat = c;
    b.innerHTML = esc(c) + ' <span class="tx-cat-n"></span>';
    b.addEventListener("click", function () { toggleCat(c); });
    elCats.appendChild(b);
  });

  function syncCats() {
    Array.prototype.forEach.call(elCats.querySelectorAll(".tx-cat"), function (b) {
      var c = b.dataset.cat;
      var on = (c === "All") ? state.cats.length === 0 : state.cats.indexOf(c) >= 0;
      var indicated = !on && catsIndicated.indexOf(c) >= 0;
      var count = catCount(c);
      b.classList.toggle("is-on", on);
      b.classList.toggle("is-indicated", indicated);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      // Never disable a selected cat — otherwise narrowing its count to 0 (e.g. via search)
      // would trap it: highlighted, greyed, and unclickable to deselect.
      b.disabled = count === 0 && c !== "All" && !on;
      var n = b.querySelector(".tx-cat-n");
      if (n) n.textContent = "(" + count + ")";
    });
  }

  function toggleCat(c) {
    if (c === "All") {
      state.cats = [];
    } else {
      var i = state.cats.indexOf(c);
      if (i >= 0) state.cats.splice(i, 1);
      else state.cats.push(c);
    }
    render();
  }

  function refreshCatsIndicated() {
    if (!state.sector && state.subs.length === 0) {
      catsIndicated = [];
      return;
    }
    var pool = DATA.filter(function (r) { return matches(r, { cats: true }); });
    var union = {};
    pool.forEach(function (r) { r.cats.forEach(function (c) { union[c] = true; }); });
    catsIndicated = CAT_ORDER.filter(function (c) { return union[c]; });
  }

  // --- Active-filter chips (sectors + subs) ---

  function syncChips() {
    elChips.innerHTML = "";
    if (state.sector) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tx-chip tx-chip--sector";
      chip.innerHTML = esc(state.sector) + ' <span class="tx-chip-x" aria-hidden="true">×</span>';
      chip.setAttribute("aria-label", "Clear " + state.sector + " sector filter");
      chip.addEventListener("click", function () { setSector(""); });
      elChips.appendChild(chip);
    }
    state.subs.forEach(function (s) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tx-chip tx-chip--sub";
      chip.innerHTML = esc(s) + ' <span class="tx-chip-x" aria-hidden="true">×</span>';
      chip.setAttribute("aria-label", "Clear " + s + " filter");
      chip.addEventListener("click", function () { toggleSub(s); });
      elChips.appendChild(chip);
    });
  }

  // --- Sector / sub toggles ---

  // Clicking the active sector's eyebrow clears it; otherwise the new sector replaces.
  function setSector(s) {
    state.sector = (state.sector === s) ? "" : s;
    render(); // eyebrow interactions always render collapsed (no force conditions for sector)
  }

  function toggleSub(s) {
    var i = state.subs.indexOf(s);
    if (i >= 0) state.subs.splice(i, 1);
    else state.subs.push(s);
    render();
  }

  // --- Search ---

  elQ.addEventListener("input", function () {
    state.q = elQ.value.trim().toLowerCase();
    render();
  });

  document.getElementById("tx-clear").addEventListener("click", function () {
    state = { cats: [], sector: "", subs: [], q: "" };
    elQ.value = "";
    render();
  });

  // --- Render ---

  function render() {
    refreshCatsIndicated();
    syncCats();
    syncChips();

    var hits = DATA.filter(function (r) { return matches(r); });
    elList.innerHTML = "";
    elEmpty.hidden = hits.length !== 0;

    // forceOpen: when search or sub-cats are active, every visible card is expanded.
    var forceOpen = state.q.length > 0 || state.subs.length > 0;

    hits.forEach(function (r) {
      var li = document.createElement("li");
      li.className = "tx-item" + (forceOpen ? " is-open" : "");
      li.dataset.id = r._id;

      var sectorEyebrow = r.sectors.map(function (s) {
        var on = state.sector === s;
        return '<button type="button" class="tx-eyebrow-link' + (on ? " is-on" : "") + '" data-sector="' + esc(s) + '">' + esc(s) + "</button>";
      }).join('<span class="tx-eyebrow-sep"> · </span>');

      var catTags = r.cats.map(function (c) {
        return '<span class="tx-tag tx-tag--cat">' + esc(c) + "</span>";
      }).join("");
      var subTags = r.subs.map(function (s) {
        var on = state.subs.indexOf(s) >= 0;
        return '<button type="button" class="tx-tag tx-tag--sub' + (on ? " is-active" : "") + '" data-sub="' + esc(s) + '">' + esc(s) + "</button>";
      }).join("");

      li.innerHTML =
        '<p class="tx-eyebrow">' + sectorEyebrow + "</p>" +
        '<div class="tx-toggle" role="button" tabindex="0" aria-expanded="' + (forceOpen ? "true" : "false") + '">' +
          '<h3 class="tx-client">' + esc(r.client) + "</h3>" +
          '<svg class="tx-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
            '<polyline points="9 6 15 12 9 18"/>' +
          "</svg>" +
        "</div>" +
        '<div class="tx-body"><div class="tx-body-inner">' +
          '<p class="tx-blurb">' + esc(r.blurb) + "</p>" +
          '<div class="tx-tags">' + catTags + subTags + "</div>" +
        "</div></div>";

      elList.appendChild(li);
    });

    wireCards();
  }

  function wireCards() {
    // Eyebrow (sector) clicks
    Array.prototype.forEach.call(elList.querySelectorAll(".tx-eyebrow-link"), function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        setSector(btn.dataset.sector);
      });
    });
    // Sub-tag clicks
    Array.prototype.forEach.call(elList.querySelectorAll(".tx-tag--sub"), function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleSub(btn.dataset.sub);
      });
    });
    // Row toggle. Also live during force-open (search/subs): a manual collapse holds until
    // the next render, when force-open re-expands it.
    Array.prototype.forEach.call(elList.querySelectorAll(".tx-toggle"), function (t) {
      var handler = function () {
        var li = t.closest(".tx-item");
        var open = !li.classList.contains("is-open");
        li.classList.toggle("is-open", open);
        t.setAttribute("aria-expanded", open ? "true" : "false");
      };
      t.addEventListener("click", handler);
      t.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handler(); }
      });
    });
  }

  render();
})();
</script>

<style>
/* Inherits Jekyll Garden's theme variables: --bg, --bg2, --text, --title, --brand, --border. */

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

#txn-experience .tx-search input[type="search"]::-webkit-search-cancel-button,
#txn-experience .tx-search input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
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

#txn-experience .tx-cat:hover { background: var(--bg2); }

#txn-experience .tx-cat .tx-cat-n {
  font-size: 0.72rem;
  font-weight: 400;
  opacity: 0.65;
  margin-left: 0.1rem;
}

/* Selected (manual click): filled brand tint + bold — visibly stronger than an indicated hint. */
#txn-experience .tx-cat.is-on {
  border-color: var(--brand);
  color: var(--brand);
  font-weight: 600;
  background: color-mix(in srgb, var(--brand) 12%, transparent);
}

#txn-experience .tx-cat.is-on:hover { background: color-mix(in srgb, var(--brand) 18%, transparent); }
#txn-experience .tx-cat.is-on .tx-cat-n { color: var(--brand); opacity: 0.7; }

/* Indicated (cat present in the active sector/sub pool): outline-only brand hint, no fill. */
#txn-experience .tx-cat.is-indicated {
  border-color: var(--brand);
  color: var(--brand);
}
#txn-experience .tx-cat.is-indicated:hover { background: color-mix(in srgb, var(--brand) 8%, transparent); }
#txn-experience .tx-cat.is-indicated .tx-cat-n { color: var(--brand); opacity: 0.7; }

#txn-experience .tx-cat:disabled { opacity: 0.4; cursor: not-allowed; }
#txn-experience .tx-cat:disabled:hover { background: transparent; }

/* ---- Active-filter chips (sectors + subs) ---- */
#txn-experience .tx-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

#txn-experience .tx-chips:empty { display: none; }

#txn-experience .tx-chip {
  font: inherit;
  font-family: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.35rem 0.7rem;
  border-radius: 0.25rem;
  border: 1px solid var(--brand);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: opacity 0.15s, background 0.15s;
}

#txn-experience .tx-chip--sector {
  font-style: italic;
  background: transparent;
  color: var(--brand);
}
#txn-experience .tx-chip--sector:hover { background: color-mix(in srgb, var(--brand) 8%, transparent); }

#txn-experience .tx-chip--sub {
  background: var(--brand);
  color: #fff;
}
#txn-experience .tx-chip--sub:hover { opacity: 0.85; }

#txn-experience .tx-chip-x { font-size: 1rem; line-height: 1; opacity: 0.7; }

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

#txn-experience .tx-item:last-child { border-bottom: 1px solid var(--border); }

#txn-experience .tx-eyebrow {
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
  transition: opacity 0.2s;
}

#txn-experience .tx-eyebrow-link:hover,
#txn-experience .tx-eyebrow-link:focus-visible {
  opacity: 0.7;
  text-decoration: underline;
  text-underline-offset: 3px;
  outline: none;
}

#txn-experience .tx-eyebrow-link.is-on {
  text-decoration: underline;
  text-underline-offset: 3px;
}

#txn-experience .tx-eyebrow-sep { color: var(--brand); opacity: 0.5; margin: 0 0.1rem; }

/* The row toggle — div with role=button so the eyebrow's real <button> can nest. */
#txn-experience .tx-toggle {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.25rem;
  outline: none;
}

#txn-experience .tx-toggle:focus-visible {
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

#txn-experience .tx-chevron {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: var(--text);
  opacity: 0.5;
  margin-top: 0.25rem;
  transition: transform 0.25s ease, opacity 0.2s;
}

#txn-experience .tx-toggle:hover .tx-chevron { opacity: 1; }
#txn-experience .tx-item.is-open .tx-chevron { transform: rotate(90deg); opacity: 0.8; }

/* Collapsible body via grid-template-rows trick */
#txn-experience .tx-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s ease;
}
#txn-experience .tx-item.is-open .tx-body { grid-template-rows: 1fr; }
/* visibility:hidden when collapsed pulls the sub-tag buttons out of the tab order and blocks
   pointer events; it stays visible through the close animation, then flips off at the end. */
#txn-experience .tx-body-inner {
  overflow: hidden;
  min-height: 0;
  visibility: hidden;
  transition: visibility 0.28s;
}
#txn-experience .tx-item.is-open .tx-body-inner { visibility: visible; }

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

#txn-experience .tx-tag--cat { font-weight: 600; color: var(--title); }

#txn-experience button.tx-tag--sub {
  cursor: pointer;
  border: 1px solid var(--brand);
  background: transparent;
  color: var(--brand);
  transition: background 0.15s, color 0.15s;
}
#txn-experience button.tx-tag--sub:hover { background: color-mix(in srgb, var(--brand) 12%, transparent); }
#txn-experience button.tx-tag--sub.is-active { background: var(--brand); color: #fff; }
#txn-experience button.tx-tag--sub.is-active:hover { opacity: 0.85; }

@media (prefers-reduced-motion: reduce) {
  #txn-experience .tx-body { transition: none !important; }
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

#txn-experience .tx-empty button:hover { opacity: 1; }
</style>
