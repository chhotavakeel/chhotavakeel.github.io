---
permalink: /deals.html
title: Deals
layout: Post
content-type: static
---

<div id="txn-experience">
  <div class="tx-controls">
    <div class="tx-search">
      <input id="tx-q" class="search-input" type="search" placeholder="Search" autocomplete="off">
    </div>
    <div class="tx-cats" id="tx-cats" role="group" aria-label="Filter by transaction type"></div>
  </div>

  <ol class="tx-list" id="tx-list"></ol>
  <p class="tx-empty" id="tx-empty" hidden>No mandates match those filters. <button type="button" id="tx-clear">Clear filters</button></p>
</div>

<script>
(function () {
  var DATA = [{"client": "AB Mauri India", "blurb": "on the development of its USD 137 million, 257-acre greenfield yeast manufacturing facility.", "cats": ["Contract"], "sectors": ["Manufacturing"], "subs": ["Drafting"]}, {"client": "Actis", "blurb": "on its USD 1.5 billion sale of Sprng Energy, its renewable energy platform having a cumulative capacity of 2.9 GWp, to Shell Overseas Investment B.V.", "cats": ["Advisory"], "sectors": ["Renewable energy"], "subs": ["Sell-side"]}, {"client": "Aequs", "blurb": "in succesfully seeking the Ministry of Power's approval for the subdistribution of power by industrial park developers across India.", "cats": ["Advisory"], "sectors": ["Renewable energy"], "subs": ["Policy"]}, {"client": "Asian Infrastructure Investment Bank", "blurb": "on its USD 58.4 million investment into an OTPP-backed Indian infrastructure investment trust housing eight solar power projects with a cumulative capacity of 1.54 GWp.", "cats": ["Due diligence"], "sectors": ["Renewable energy"], "subs": ["Buy-side"]}, {"client": "Asianet", "blurb": "in challenging a USD 69 million demand for enhanced license fees following the Supreme Court of India decision upholding the Department of Telecommunications’ definition of adjusted gross revenue.", "cats": ["Litigation"], "sectors": ["Telecommunication"], "subs": []}, {"client": "Brookfield Asset Management", "blurb": "on its acquisition of a controlling stake in CleanMax Enviro Energy Solutions for USD 360 million.", "cats": ["Due diligence"], "sectors": ["Renewable energy"], "subs": ["Buy-side"]}, {"client": "Brookfield Asset Management", "blurb": "on procuring a stay order from the Andhra Pradesh High Court against a directive by the state government retrospectively altering tariffs for 7.5 GW of wind and solar power projects leading to a potential revenue loss of USD 1.29 billion for affected power generators.", "cats": ["Litigation"], "sectors": ["Renewable energy"], "subs": ["Writ"]}, {"client": "Brookfield Asset Management", "blurb": "on overturning its disqualification from a tender for the development of a 400 MW solar project.", "cats": ["Litigation"], "sectors": ["Renewable energy"], "subs": ["Writ"]}, {"client": "Brookfield Renewables", "blurb": "on its USD 1 billion debt investment in the Avaada Group’s 4 GW portfolio.", "cats": ["Due diligence"], "sectors": ["Renewable energy"], "subs": ["Buy-side", "Debt"]}, {"client": "Brookfield Renewables", "blurb": "on its proposed acquisition of SoftBank's 5 GW renewable energy project portfolio in India valued at USD 3.5 billion.", "cats": ["Due diligence"], "sectors": ["Renewable energy"], "subs": ["Buy-side"]}, {"client": "Copenhagen Infrastructure Partners", "blurb": "on its USD 100 million equity investment in a platform with AMPin Energy Transition for the development of 1.7 GWp of renewable energy projects across India.", "cats": ["Advisory", "Contract"], "sectors": ["Renewable energy"], "subs": ["Buy-side", "Review"]}, {"client": "Cube Highways", "blurb": "on its USD 29 million acquisition of 147 kilometres of road assets from KNR Constructions Limited.", "cats": ["Due diligence", "Contract"], "sectors": ["Roads"], "subs": ["Buy-side", "Drafting"]}, {"client": "Digivate Labs", "blurb": "on the development of its AI-driven bid evaluation platform.", "cats": ["Advisory"], "sectors": ["Artificial intelligence"], "subs": ["Review"]}, {"client": "Egis India", "blurb": "on its dispute with the Delhi Metro Rail Corporation regarding the proposed descoping of its design consultancy services valued at USD 3 million.", "cats": ["Advisory"], "sectors": ["Mass rapid transit"], "subs": ["Review"]}, {"client": "Fourth Partner Energy", "blurb": "on the sale of I-RECs generated from its 150 MWp wind and solar power project portfolio to Meta Inc.", "cats": ["Contract"], "sectors": ["Renewable energy"], "subs": ["Review"]}, {"client": "GE Energy Financial Services", "blurb": "on its USD 30 million acquisition of a 49% stake in a 150 MW wind power project from Continuum Energy.", "cats": ["Due diligence"], "sectors": ["Renewable energy"], "subs": ["Buy-side"]}, {"client": "International Finance Corporation", "blurb": "on structuring and drafting tender documents for the first independent power project in Fiji under the domestic PPP framework.", "cats": ["Due diligence", "Contract"], "sectors": ["Renewable energy"], "subs": ["Structuring", "Drafting"]}, {"client": "International Finance Corporation", "blurb": "on structuring and drafting tender documents for the first wastewater treatment plant in Bangladesh under the domestic PPP framework.", "cats": ["Due diligence", "Contract"], "sectors": ["WASH"], "subs": ["Structuring", "Drafting"]}, {"client": "Noida International Airport Limited", "blurb": "on the standardisation of its purchase order templates for the supply of goods and services.", "cats": ["Contract"], "sectors": ["Airports"], "subs": ["Review"]}, {"client": "NTPC", "blurb": "on reviewing the change in control restrictions in its tender documents.", "cats": ["Contract"], "sectors": ["Renewable energy"], "subs": ["Review"]}, {"client": "O2 Power", "blurb": "on the regulatory and commercial structuring of interstate renewable energy projects in India.", "cats": ["Advisory"], "sectors": ["Renewable energy"], "subs": ["Structuring"]}, {"client": "Oil India Limited", "blurb": "on the augmentation of its 660-kilometre white oil product transportation pipeline from 1.72 MMTPA to 5.50 MMTPA.", "cats": ["Contract"], "sectors": ["Oil and gas"], "subs": ["Review"]}, {"client": "Power Exchange of India Limited", "blurb": "in submitting comments to the Central Electricity Regulatory Commission on proposed amendments to the Power Market Regulations  impacting 56.6 billion kWh of trading volume.", "cats": ["Advisory"], "sectors": ["Electricity"], "subs": ["Policy"]}, {"client": "Rain CII Carbon", "blurb": "in proceedings challenging the arbitrary enforcement of import quotas by the Directorate General of Foreign Trade impacting the import of 144,000 MT of raw petroleum coke.", "cats": ["Litigation"], "sectors": ["Manufacturing"], "subs": ["Writ"]}, {"client": "Saudi Aramco", "blurb": "on its proposed acquisition of a stake in the chemicals and refining business of Reliance Industries Limited.", "cats": ["Due diligence"], "sectors": ["Oil and gas"], "subs": ["Buy-side"]}, {"client": "Sembcorp Green Infra", "blurb": "on its proposed acquisition of Mytrah Energy's 1.75 GW renewable portfolio valued at USD 1.1 billion.", "cats": ["Due diligence"], "sectors": ["Renewable energy"], "subs": ["Buy-side"]}, {"client": "Tata Power", "blurb": "in proceedings successfully contesting the state of Himachal Pradesh's imposition of approximately USD 6 million in damages for premature withdrawal from a hydropower project.", "cats": ["Litigation"], "sectors": ["Hydropower"], "subs": ["Arbitration"]}, {"client": "The Government of India", "blurb": "on a comprehensive review of the Indian offshore wind policy framework potentially impacting 70 GW of future offshore wind development.", "cats": ["Advisory"], "sectors": ["Offshore wind"], "subs": ["Policy"]}, {"client": "The Government of Madhya Pradesh", "blurb": "on the regulatory structuring of its International Finance Corporation-funded 600 MW solar power park.", "cats": ["Advisory"], "sectors": ["Renewable energy"], "subs": ["Structuring"]}, {"client": "The Karnataka Electricity Regulatory Commission", "blurb": "on proposed amendments to the regulations governing verification of captive power projects in the state.", "cats": ["Advisory"], "sectors": ["Electricity"], "subs": ["Policy"]}, {"client": "The Ministry of Heavy Industries", "blurb": "on reviewing the tender documents for the Production Linked Incentive scheme for Advanced Chemistry Cells with a cumulative subsidy disbursement of USD 431 million.", "cats": ["Contract"], "sectors": ["e-Mobility"], "subs": ["Review"]}, {"client": "The Ministry of New and Renewable Energy", "blurb": "on amendments to the domestic content mandate for solar modules.", "cats": ["Advisory"], "sectors": ["Renewable energy"], "subs": ["Policy"]}, {"client": "The Ministry of Power", "blurb": "on amendments to the captive power framework.", "cats": ["Advisory"], "sectors": ["Electricity"], "subs": ["Policy"]}, {"client": "The Wind Independent Power Producers Association", "blurb": "in submitting comments to the Central Electricity Regulatory Commission regarding proposed amendments to India’s power transmission regime.", "cats": ["Advisory"], "sectors": ["Renewable energy"], "subs": ["Policy"]}, {"client": "The World Bank Group", "blurb": "on structuring and negotiating the PPP aspects of a USD 830 million credit facility being extended to the Government of India for a revamp of the country’s vocational training ecosystem.", "cats": ["Due diligence", "Contract"], "sectors": ["Social infrastructure"], "subs": ["Structuring", "Drafting"]}, {"client": "United Nations Environment Programme", "blurb": "on drafting template tender documents for the construction and development of district cooling infrastructure in India.", "cats": ["Contract"], "sectors": ["Cooling"], "subs": ["Drafting"]}];
  var state = { cat: "All", sector: "All", q: "" };

  var elList   = document.getElementById("tx-list");
  var elCats   = document.getElementById("tx-cats");
  var elQ      = document.getElementById("tx-q");
  var elEmpty  = document.getElementById("tx-empty");

  // Transaction filter row (top)
  var CAT_ORDER = ["Due diligence", "Advisory", "Contract", "Litigation"];

  function catCount(c) {
    return c === "All" ? DATA.length : DATA.filter(function (r) { return r.cats.indexOf(c) > -1; }).length;
  }
  ["All"].concat(CAT_ORDER).forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tx-cat" + (c === "All" ? " is-on" : "");
    b.setAttribute("aria-pressed", c === "All" ? "true" : "false");
    b.dataset.cat = c;
    b.innerHTML = esc(c) + ' <span class="tx-cat-n">(' + catCount(c) + ')</span>';
    b.addEventListener("click", function () { setCat(c); });
    elCats.appendChild(b);
  });

  // Active sector chip (appears after filter buttons when a sector is being filtered)
  var elSectorChip = document.createElement("button");
  elSectorChip.type = "button";
  elSectorChip.className = "tx-sector-chip";
  elSectorChip.hidden = true;
  elSectorChip.addEventListener("click", function () { setSector("All"); });
  elCats.appendChild(elSectorChip);

  function setCat(c) {
    state.cat = c;
    Array.prototype.forEach.call(elCats.querySelectorAll(".tx-cat"), function (b) {
      var on = b.dataset.cat === state.cat;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    render();
  }

  function setSector(s) {
    state.sector = s;
    if (s === "All") {
      elSectorChip.hidden = true;
    } else {
      elSectorChip.hidden = false;
      elSectorChip.innerHTML = esc(s) + ' <span class="tx-sector-chip-x" aria-hidden="true">×</span><span class="tx-sr">Clear sector filter</span>';
    }
    render();
    if (s !== "All") {
      elCats.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  elQ.addEventListener("input", function () { state.q = elQ.value.trim().toLowerCase(); render(); });

  document.getElementById("tx-clear").addEventListener("click", function () {
    state = { cat: "All", sector: "All", q: "" };
    elQ.value = "";
    setCat("All");
    setSector("All");
  });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function matches(r) {
    if (state.cat !== "All" && r.cats.indexOf(state.cat) === -1) return false;
    if (state.sector !== "All" && r.sectors.indexOf(state.sector) === -1) return false;
    if (state.q) {
      var hay = (r.client + " " + r.blurb + " " + r.sectors.join(" ") + " " + r.subs.join(" ") + " " + r.cats.join(" ")).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  function render() {
    var hits = DATA.filter(matches);
    elList.innerHTML = "";
    elEmpty.hidden = hits.length !== 0;

    hits.forEach(function (r) {
      var li = document.createElement("li");
      li.className = "tx-item";
      // Sector becomes the eyebrow — clickable, comma-separated for multiple sectors
      var sectorEyebrow = r.sectors.map(function (s) {
        return '<button type="button" class="tx-eyebrow-link" data-sector="' + esc(s) + '">' + esc(s) + "</button>";
      }).join('<span class="tx-eyebrow-sep"> · </span>');
      // Transaction + sub-transaction become neutral tags
      var catTags = r.cats.map(function (c) {
        return '<span class="tx-tag tx-tag--cat">' + esc(c) + "</span>";
      }).join("");
      var subTags = r.subs.map(function (s) {
        return '<span class="tx-tag">' + esc(s) + "</span>";
      }).join("");
      li.innerHTML =
        '<p class="tx-cat-eyebrow">' + sectorEyebrow + "</p>" +
        '<h3 class="tx-client">' + esc(r.client) + "</h3>" +
        '<p class="tx-blurb">' + esc(r.blurb) + "</p>" +
        '<div class="tx-tags">' + catTags + subTags + "</div>";
      elList.appendChild(li);
    });

    // Wire up sector eyebrow clicks within entries
    Array.prototype.forEach.call(elList.querySelectorAll(".tx-eyebrow-link"), function (btn) {
      btn.addEventListener("click", function () { setSector(btn.dataset.sector); });
    });
  }

  render();
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

#txn-experience .tx-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

#txn-experience .tx-cat {
  font: inherit;
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.35rem 0.7rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

#txn-experience .tx-cat:hover {
  border-color: var(--brand);
  color: var(--brand);
}

#txn-experience .tx-cat .tx-cat-n {
  font-size: 0.78rem;
  font-weight: 400;
  opacity: 0.65;
  margin-left: 0.1rem;
}

#txn-experience .tx-cat.is-on {
  background: var(--brand);
  border-color: var(--brand);
  color: white;
}

#txn-experience .tx-cat.is-on .tx-cat-n {
  color: rgba(255, 255, 255, 0.85);
  opacity: 1;
}

#txn-experience .tx-sector-chip {
  font: inherit;
  font-family: inherit;
  font-size: 0.85rem;
  font-style: italic;
  cursor: pointer;
  padding: 0.35rem 0.7rem;
  border-radius: 0.25rem;
  border: 1px solid var(--brand);
  background: color-mix(in srgb, var(--brand) 12%, transparent);
  color: var(--brand);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.2s, color 0.2s;
}

#txn-experience .tx-sector-chip:hover {
  background: var(--brand);
  color: white;
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
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
}

#txn-experience .tx-item:last-child {
  border-bottom: 1px solid var(--border);
}

#txn-experience .tx-cat-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 0.4rem;
  line-height: 1.3;
}

#txn-experience .tx-eyebrow-link {
  font: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  color: var(--brand);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: opacity 0.2s;
}

#txn-experience .tx-eyebrow-link:hover {
  opacity: 0.7;
  text-decoration: underline;
  text-underline-offset: 3px;
}

#txn-experience .tx-eyebrow-sep {
  color: var(--brand);
  opacity: 0.5;
  margin: 0 0.1rem;
}

#txn-experience .tx-client {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  line-height: 1.3;
  color: var(--title);
}

#txn-experience .tx-blurb {
  margin: 0 0 0.8rem;
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.6;
}

#txn-experience .tx-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

#txn-experience .tx-tag {
  font: inherit;
  font-family: inherit;
  font-size: 0.78rem;
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
  padding: 0;
}

/* ---- Mobile ---- */
@media (max-width: 560px) {
  #txn-experience .tx-cat {
    font-size: 0.82rem;
    padding: 0.3rem 0.55rem;
  }

  #txn-experience .tx-tag {
    font-size: 0.76rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  #txn-experience * {
    transition: none !important;
  }
}
</style>