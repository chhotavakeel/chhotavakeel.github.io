---
permalink: /deals.html
title: Deals
layout: Post
content-type: static
---

<div id="txn-experience">
  <header class="tx-head">
    <span id="tx-count">0</span> mandates. <span class="tx-hint">Filter by type, sector, or search.</span>
  </header>

  <div class="tx-controls">
    <div class="tx-search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
      <input id="tx-q" type="search" placeholder="Search." aria-label="Search transactions" autocomplete="off">
    </div>
    <div class="tx-cats" id="tx-cats" role="group" aria-label="Filter by transaction type"></div>
    <label class="tx-sectorwrap">
      <span class="tx-sr">Filter by sector</span>
      <select id="tx-sector" aria-label="Filter by sector"></select>
    </label>
  </div>

  <ol class="tx-list" id="tx-list"></ol>
  <p class="tx-empty" id="tx-empty" hidden>No mandates match those filters. <button type="button" id="tx-clear">Clear filters</button></p>
</div>

<script>
(function () {
  var DATA = [{"client": "AB Mauri India", "blurb": "Development of its USD 137 million, 257-acre greenfield yeast manufacturing facility.", "cats": ["Contracts"], "sectors": ["Manufacturing"], "subs": ["Contract drafting"], "scale": "USD 137M/257 acres"}, {"client": "Actis", "blurb": "USD 1.5 billion sale of Sprng Energy, its renewable energy platform having a cumulative capacity of 2.9 GWp, to Shell Overseas Investment B.V.", "cats": ["Advisory"], "sectors": ["Energy", "Renewables"], "subs": ["Sell-side"], "scale": "USD 1.5B/2.9 GWp"}, {"client": "Aequs", "blurb": "Representation to the Ministry of Power seeking approval for subdistribution of power by industrial park developers.", "cats": ["Policy"], "sectors": ["Energy"], "subs": ["Advisory"], "scale": ""}, {"client": "Asian Infrastructure Investment Bank", "blurb": "USD 58.4 million investment into an OTPP-backed Indian infrastructure investment trust housing eight solar power projects with a cumulative capacity of 1.54 GWp.", "cats": ["Due Diligence"], "sectors": ["Energy", "Renewables"], "subs": ["Buy-side"], "scale": "USD 58.4M/1.54 GWp"}, {"client": "Asianet", "blurb": "Challenging a USD 69 million demand for enhanced license fees following the Supreme Court of India decision upholding the Department of Telecommunications’ definition of adjusted gross revenue.", "cats": ["Litigation"], "sectors": ["Telecommunication"], "subs": [], "scale": "USD 69M"}, {"client": "Brookfield Asset Management", "blurb": "Acquisition of a controlling stake in CleanMax Enviro Energy Solutions for USD 360 million.", "cats": ["Due Diligence"], "sectors": ["Energy", "Renewables"], "subs": ["Buy-side"], "scale": "USD 360M"}, {"client": "Brookfield Asset Management", "blurb": "Overturning its disqualification from a tender for the development of a 400 MW solar project.", "cats": ["Litigation"], "sectors": ["Energy", "Renewables"], "subs": ["Writs"], "scale": "400 MW"}, {"client": "Brookfield Renewables", "blurb": "USD 1 billion debt investment in the Avaada Group’s 4 GW portfolio.", "cats": ["Due Diligence"], "sectors": ["Energy", "Renewables"], "subs": ["Buy-side", "Debt"], "scale": "USD 1B/4 GW"}, {"client": "Brookfield Renewables", "blurb": "Proposed acquisition of SoftBank's 5 GW renewable energy project portfolio valued at USD 3.5 billion.", "cats": ["Due Diligence"], "sectors": ["Energy", "Renewables"], "subs": ["Buy-side"], "scale": "USD 3.5B/5 GW"}, {"client": "Cellular Operators Association of India", "blurb": "Civil and criminal defamation proceedings filed by Reliance Jio Infocomm Limited.", "cats": ["Litigation"], "sectors": ["Telecommunication"], "subs": [], "scale": ""}, {"client": "Copenhagen Infrastructure Partners", "blurb": "USD 100 million equity investment in a platform with AMPin Energy Transition for the development of 1.7 GWp of renewable energy projects across India.", "cats": ["Advisory", "Contracts"], "sectors": ["Energy", "Renewables"], "subs": ["Buy-side", "Contract review"], "scale": "USD 100M/1.7 GWp"}, {"client": "Cube Highways", "blurb": "USD 29 million acquisition of 147 kilometres of road assets from KNR Constructions Limited.", "cats": ["Due Diligence", "Contracts"], "sectors": ["Infrastructure", "Roads"], "subs": ["Buy-side", "Contract drafting"], "scale": "USD 29M/147 km"}, {"client": "Digivate Labs", "blurb": "Development of an AI-driven bid evaluation platform.", "cats": ["Advisory"], "sectors": ["Infrastructure", "Artificial Intelligence"], "subs": ["Tender analysis"], "scale": ""}, {"client": "Dynasty Holdings", "blurb": "Development of its USD 7 million commercial office space project.", "cats": ["Contracts"], "sectors": ["Infrastructure", "Construction"], "subs": ["Contract drafting"], "scale": "USD 7M"}, {"client": "Fourth Partner Energy", "blurb": "Sale of I-RECs generated from its 150 MWp wind and solar power project portfolio to Meta Inc.", "cats": ["Contracts"], "sectors": ["Energy", "Renewables"], "subs": ["Contract review"], "scale": "150 MWp"}, {"client": "GE Energy Financial Services", "blurb": "USD 30 million acquisition of a 49% stake in a 150 MW wind power project from Continuum Energy.", "cats": ["Due Diligence"], "sectors": ["Energy", "Renewables"], "subs": ["Buy-side"], "scale": "USD 30M/150 MW"}, {"client": "Government of India", "blurb": "Comprehensive review of the Indian offshore wind policy framework potentially impacting 70 GW of future offshore wind development.", "cats": ["Policy"], "sectors": ["Energy", "Renewables", "Offshore wind"], "subs": ["Comparative analysis"], "scale": "70 GW"}, {"client": "Government of Madhya Pradesh", "blurb": "Regulatory structuring of its International Finance Corporation-funded 600 MW solar power park.", "cats": ["Advisory"], "sectors": ["Energy", "Renewables"], "subs": ["Regulatory structuring"], "scale": "600 MW"}, {"client": "International Finance Corporation", "blurb": "Structuring and drafting tender documents for the first independent power project in Fiji under the domestic PPP framework.", "cats": ["Due Diligence", "Contracts"], "sectors": ["Energy", "Renewables"], "subs": ["Regulatory structuring", "Tender drafting"], "scale": ""}, {"client": "International Finance Corporation", "blurb": "Structuring and drafting tender documents for the first wastewater treatment plant in Bangladesh under the domestic PPP framework.", "cats": ["Due Diligence", "Contracts"], "sectors": ["Infrastructure", "WASH"], "subs": ["Regulatory structuring", "Tender drafting"], "scale": ""}, {"client": "Karnataka Electricity Regulatory Commission", "blurb": "Recommending amendments to the regulations governing verification of captive power projects in the state.", "cats": ["Policy"], "sectors": ["Energy"], "subs": ["Advisory"], "scale": "USD 117M/4 GW"}, {"client": "Ministry of Heavy Industries", "blurb": "Reviewing the tender documents for the Production Linked Incentive scheme for Advanced Chemistry Cells with a cumulative subsidy disbursement of USD 431 million.", "cats": ["Contracts"], "sectors": ["Infrastructure", "Energy", "Renewables", "e-Mobility"], "subs": ["Tender drafting"], "scale": "USD 431M"}, {"client": "Ministry of New and Renewable Energy", "blurb": "Suggesting amendments to the domestic content mandate for solar modules.", "cats": ["Policy"], "sectors": ["Energy", "Renewables"], "subs": ["Advisory"], "scale": ""}, {"client": "Noida International Airport Limited", "blurb": "Standardisation of its purchase order templates for the supply of goods and services.", "cats": ["Contracts"], "sectors": ["Infrastructure", "Airports"], "subs": ["Contract review"], "scale": ""}, {"client": "NTPC", "blurb": "Reviewing the change in control restrictions in its tender documents.", "cats": ["Contracts"], "sectors": ["Energy", "Renewables"], "subs": ["Tender analysis"], "scale": ""}, {"client": "O2 Power", "blurb": "Regulatory and commercial structuring of interstate renewable energy projects across India.", "cats": ["Advisory"], "sectors": ["Energy", "Renewables"], "subs": ["Regulatory structuring"], "scale": ""}, {"client": "Oil India Limited", "blurb": "Augmentation of its 660-kilometre white oil product transportation pipeline.", "cats": ["Contracts"], "sectors": ["Energy", "Oil and gas"], "subs": ["Contract review"], "scale": "660 km/3.78 MMTPA"}, {"client": "Power Exchange of India Limited", "blurb": "Submitting comments to the Central Electricity Regulatory Commission on proposed amendments to the Power Market Regulations  impacting 56.6 billion kWh of trading volume.", "cats": ["Policy"], "sectors": ["Energy"], "subs": ["Advisory"], "scale": "56.6 Billion kWh"}, {"client": "Radiance Renewables", "blurb": "Permissibility of developing captive solar power projects in Rajasthan.", "cats": ["Advisory"], "sectors": ["Energy", "Renewables"], "subs": ["Regulatory structuring"], "scale": ""}, {"client": "Rain CII Carbon", "blurb": "Challenging the arbitrary enforcement of import quotas by the Directorate General of Foreign Trade impacting the import of 144,000 MT of raw petroleum coke", "cats": ["Litigation"], "sectors": ["Manufacturing"], "subs": ["Writs"], "scale": "144,000 MT"}, {"client": "Saudi Aramco", "blurb": "Proposed acquisition of a stake in the chemicals and refining business of Reliance Industries Limited.", "cats": ["Due Diligence"], "sectors": ["Energy", "Oil and gas"], "subs": ["Buy-side"], "scale": "Confidential"}, {"client": "Statkraft; Tata Power", "blurb": "Successfully contesting the state of Himachal Pradesh's imposition of approximately USD 6 million in damages for premature withdrawal from a hydropower project.", "cats": ["Litigation"], "sectors": ["Energy: Hydro"], "subs": ["Arbitration"], "scale": "USD 6M"}, {"client": "The World Bank Group", "blurb": "Structuring and negotiating the PPP aspects of a USD 830 million credit facility being extended to the Government of India for a revamp of the country’s vocational training ecosystem.", "cats": ["Due Diligence", "Contracts"], "sectors": ["Infrastructure", "Social"], "subs": ["Regulatory structuring", "Tender drafting"], "scale": "USD 830M"}, {"client": "United Nations Environment Programme", "blurb": "Drafting template tender documents for the construction and development of district cooling infrastructure in India.", "cats": ["Contracts"], "sectors": ["Infrastructure", "Cooling"], "subs": ["Tender drafting"], "scale": ""}, {"client": "Wind Independent Power Producers Association", "blurb": "Submitting comments to the Central Electricity Regulatory Commission regarding proposed amendments to India’s power transmission regime.", "cats": ["Policy"], "sectors": ["Energy", "Renewables"], "subs": ["Advisory"], "scale": ""}];

  var CAT_ORDER = ["Due Diligence", "Advisory", "Contracts", "Policy", "Litigation"];
  var state = { cat: "All", sector: "All", q: "" };

  var elList   = document.getElementById("tx-list");
  var elCats   = document.getElementById("tx-cats");
  var elSector = document.getElementById("tx-sector");
  var elQ      = document.getElementById("tx-q");
  var elCount  = document.getElementById("tx-count");
  var elEmpty  = document.getElementById("tx-empty");

  // --- Build category buttons with live counts ---
  function catCount(c) {
    return c === "All" ? DATA.length : DATA.filter(function (r) { return r.cats.indexOf(c) > -1; }).length;
  }
  ["All"].concat(CAT_ORDER).forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tx-cat" + (c === "All" ? " is-on" : "");
    b.setAttribute("aria-pressed", c === "All" ? "true" : "false");
    b.dataset.cat = c;
    b.innerHTML = '<span class="tx-cat-l">' + c + '</span><span class="tx-cat-n">' + catCount(c) + '</span>';
    b.addEventListener("click", function () { state.cat = c; syncCats(); render(); });
    elCats.appendChild(b);
  });
  function syncCats() {
    Array.prototype.forEach.call(elCats.children, function (b) {
      var on = b.dataset.cat === state.cat;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  // --- Build sector dropdown ---
  var sectors = {};
  DATA.forEach(function (r) { r.sectors.forEach(function (s) { sectors[s] = (sectors[s] || 0) + 1; }); });
  var sectorNames = Object.keys(sectors).sort();
  var optAll = document.createElement("option"); optAll.value = "All"; optAll.textContent = "All sectors"; elSector.appendChild(optAll);
  sectorNames.forEach(function (s) {
    var o = document.createElement("option"); o.value = s; o.textContent = s + " (" + sectors[s] + ")"; elSector.appendChild(o);
  });
  elSector.addEventListener("change", function () { state.sector = elSector.value; render(); });
  elQ.addEventListener("input", function () { state.q = elQ.value.trim().toLowerCase(); render(); });

  document.getElementById("tx-clear").addEventListener("click", function () {
    state = { cat: "All", sector: "All", q: "" };
    elQ.value = ""; elSector.value = "All"; syncCats(); render();
  });

  // --- Render scale figure: split "USD 1.5B/2.9 GWp" into stacked lines ---
  function scaleHTML(scale) {
    if (!scale) return "";
    if (scale.toLowerCase() === "confidential")
      return '<div class="tx-scale"><span class="tx-conf">Confidential</span></div>';
    var parts = scale.split("/").map(function (p) { return p.trim(); }).filter(Boolean);
    return '<div class="tx-scale">' + parts.map(function (p) {
      return '<span class="tx-fig">' + esc(p) + "</span>";
    }).join("") + "</div>";
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function tag(text, cls) { return '<span class="tx-tag ' + (cls || "") + '">' + esc(text) + "</span>"; }

  function matches(r) {
    if (state.cat !== "All" && r.cats.indexOf(state.cat) === -1) return false;
    if (state.sector !== "All" && r.sectors.indexOf(state.sector) === -1) return false;
    if (state.q) {
      var hay = (r.client + " " + r.blurb + " " + r.sectors.join(" ") + " " + r.subs.join(" ")).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  function render() {
    var hits = DATA.filter(matches);
    elCount.textContent = hits.length;
    elList.innerHTML = "";
    elEmpty.hidden = hits.length !== 0;

    hits.forEach(function (r) {
      var li = document.createElement("li");
      li.className = "tx-item";
      var eyebrow = r.cats.map(function (c) { return esc(c); }).join(" · ");
      var tags = "".concat(
        r.sectors.map(function (s) { return tag(s, "tx-tag--sector"); }).join(""),
        r.subs.map(function (s) { return tag(s); }).join("")
      );
      li.innerHTML =
        '<div class="tx-main">' +
          '<p class="tx-cat-eyebrow">' + eyebrow + "</p>" +
          '<h2 class="tx-client">' + esc(r.client) + "</h2>" +
          '<p class="tx-blurb">' + esc(r.blurb) + "</p>" +
          '<div class="tx-tags">' + tags + "</div>" +
        "</div>" +
        scaleHTML(r.scale);
      elList.appendChild(li);
    });
  }

  render();
})();
</script>

<style>
/* Inherits Jekyll Garden's palette, spacing scale, and dark mode toggle.
   All colors derive from currentColor or the theme's CSS variables where available.
   Accent brightens automatically in dark mode via [data-theme="dark"] selector. */

#txn-experience {
  /* Color derivation: inherit theme text, derive muted variants via opacity */
  --tx-ink: inherit;
  --tx-muted: color-mix(in srgb, currentColor 62%, transparent);
  --tx-faint: color-mix(in srgb, currentColor 45%, transparent);
  --tx-line: color-mix(in srgb, currentColor 15%, transparent);
  --tx-line-strong: color-mix(in srgb, currentColor 28%, transparent);
  --tx-chip: color-mix(in srgb, currentColor 8%, transparent);
  --tx-field: color-mix(in srgb, currentColor 4%, transparent);
  
  /* Accent: match Jekyll Garden's brand color and dark-mode lightening */
  --tx-accent: rgb(58, 169, 159);        /* Light: #3aa99f */
  --tx-accent-soft: color-mix(in srgb, var(--tx-accent) 15%, transparent);
  
  /* Typography: inherit theme font stack */
  --tx-mono: ui-monospace, "SF Mono", "Cascadia Mono", "JetBrains Mono", Menlo, Consolas, monospace;
  --tx-sans: inherit;
  
  /* Spacing: use theme's scale */
  --tx-space-xs: 0.5rem;
  --tx-space-sm: 1rem;
  --tx-space-md: 1.5rem;
  --tx-space-lg: 2rem;

  max-width: 48rem;
  margin: 0 auto;
  font-family: var(--tx-sans);
  color: inherit;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Dark mode: brighten accent (match theme's dark brand color) */
[data-theme="dark"] #txn-experience {
  --tx-accent: rgb(58, 201, 176);        /* Dark: #3ac9b0 */
}

#txn-experience * { box-sizing: border-box; }

/* ---- Header ---- */
#txn-experience .tx-eyebrow {
  font: 600 11px/1 var(--tx-mono);
  letter-spacing: .16em; text-transform: uppercase;
  color: var(--tx-accent); margin: 0 0 .65rem;
}
#txn-experience .tx-title {
  font-size: clamp(1.4rem, 4.5vw, 1.4rem); font-weight: 600;
  letter-spacing: -.02em; margin: 0 0 .5rem; line-height: 1.2; color: inherit;
}
#txn-experience .tx-sub { margin: 0; color: var(--tx-muted); font-size: .95rem; }
#txn-experience .tx-sub #tx-count { font-family: var(--tx-mono); font-weight: 600; color: inherit; }
#txn-experience .tx-hint { color: var(--tx-faint); }

/* ---- Controls ---- */
#txn-experience .tx-controls {
  margin: var(--tx-space-lg) 0 .4rem;
  display: flex; flex-wrap: wrap; gap: var(--tx-space-sm); align-items: center;
}
#txn-experience .tx-search { position: relative; flex: 1 1 240px; min-width: 200px; }
#txn-experience .tx-search svg {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  width: 16px; height: 16px; fill: none; stroke: var(--tx-faint); stroke-width: 2; stroke-linecap: round;
}
#txn-experience .tx-search input {
  width: 100%; padding: .58rem .7rem .58rem 2.1rem; font: inherit; font-size: .92rem;
  color: inherit; background: var(--tx-field); border: 1px solid var(--tx-line-strong);
  border-radius: 0.25rem; outline: none;
}
#txn-experience .tx-search input::placeholder { color: var(--tx-faint); }
#txn-experience .tx-search input:focus-visible { border-color: var(--tx-accent); box-shadow: 0 0 0 2px var(--tx-accent-soft); }

#txn-experience .tx-cats { display: flex; flex-wrap: wrap; gap: .3rem; }
#txn-experience .tx-cat {
  display: inline-flex; align-items: center; gap: .4rem;
  font: inherit; font-size: .82rem; cursor: pointer;
  padding: .42rem .62rem; border-radius: 0.25rem;
  border: 1px solid var(--tx-line); background: transparent; color: var(--tx-muted);
  transition: background .14s, border-color .14s, color .14s;
}
#txn-experience .tx-cat:hover { border-color: var(--tx-line-strong); color: inherit; }
#txn-experience .tx-cat .tx-cat-n { font-family: var(--tx-mono); font-size: .72rem; font-weight: 600; color: var(--tx-faint); }
#txn-experience .tx-cat.is-on { background: var(--tx-accent); border-color: var(--tx-accent); color: #fff; }
#txn-experience .tx-cat.is-on .tx-cat-n { color: rgba(255,255,255,.78); }
#txn-experience .tx-cat:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--tx-accent-soft); }

#txn-experience .tx-sectorwrap { position: relative; }
#txn-experience .tx-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
#txn-experience .tx-sectorwrap select {
  font: inherit; font-size: .85rem; color: inherit; cursor: pointer;
  padding: .5rem 2rem .5rem .7rem; border: 1px solid var(--tx-line-strong);
  border-radius: 0.25rem; background-color: var(--tx-field);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%238a93a0' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right .65rem center;
}
#txn-experience .tx-sectorwrap select:focus-visible { outline: none; border-color: var(--tx-accent); box-shadow: 0 0 0 2px var(--tx-accent-soft); }

/* ---- List ---- */
#txn-experience .tx-list { list-style: none; margin: var(--tx-space-lg) 0 0; padding: 0; }
#txn-experience .tx-item {
  display: flex; gap: var(--tx-space-md); align-items: flex-start;
  padding: var(--tx-space-md) 0; border-top: 1px solid var(--tx-line);
}
#txn-experience .tx-item:first-child { border-top: 1px solid var(--tx-line-strong); }
#txn-experience .tx-main { flex: 1 1 auto; min-width: 0; }

#txn-experience .tx-cat-eyebrow {
  font: 600 10.5px/1 var(--tx-mono); letter-spacing: .12em; text-transform: uppercase;
  color: var(--tx-accent); margin: 0 0 .4rem;
}
#txn-experience .tx-client { font-size: 1.02rem; font-weight: 600; letter-spacing: -.01em; margin: 0 0 .25rem; line-height: 1.3; color: inherit; }
#txn-experience .tx-blurb { margin: 0 0 .6rem; color: var(--tx-muted); font-size: .92rem; }

#txn-experience .tx-tags { display: flex; flex-wrap: wrap; gap: .35rem; }
#txn-experience .tx-tag { font-size: .72rem; line-height: 1; padding: .32rem .5rem; border-radius: 0.25rem; background: var(--tx-chip); color: var(--tx-muted); white-space: nowrap; }
#txn-experience .tx-tag--sector { background: var(--tx-accent-soft); color: var(--tx-accent); font-weight: 600; }

/* ---- Scale figure: deal magnitude (the signature) ---- */
#txn-experience .tx-scale { flex: 0 0 auto; text-align: right; min-width: 96px; display: flex; flex-direction: column; gap: .15rem; padding-top: .1rem; }
#txn-experience .tx-fig { font-family: var(--tx-mono); font-size: .9rem; font-weight: 600; letter-spacing: -.01em; color: inherit; font-variant-numeric: tabular-nums; }
#txn-experience .tx-fig ~ .tx-fig { font-weight: 500; color: var(--tx-muted); font-size: .82rem; }
#txn-experience .tx-conf { font-family: var(--tx-mono); font-size: .76rem; font-style: italic; color: var(--tx-faint); }

/* ---- Empty state ---- */
#txn-experience .tx-empty { margin: var(--tx-space-xl) 0; text-align: center; color: var(--tx-muted); font-size: .95rem; }
#txn-experience .tx-empty button { font: inherit; font-size: .9rem; color: var(--tx-accent); background: none; border: none; cursor: pointer; text-decoration: underline; padding: 0; }

/* ---- Mobile ---- */
@media (max-width: 560px) {
  #txn-experience .tx-item { flex-direction: column; gap: .6rem; }
  #txn-experience .tx-scale { text-align: left; flex-direction: row; flex-wrap: wrap; gap: .6rem; min-width: 0; }
  #txn-experience .tx-fig ~ .tx-fig { font-size: .82rem; }
  #txn-experience .tx-search { flex-basis: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  #txn-experience * { transition: none !important; }
}
</style>