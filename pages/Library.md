---
permalink: /library
title: Library
layout: Post
content-type: static
---

Information worth retaining. Starred items have shaped how I think.

<div class="lib-controls" id="lib-cats" role="group" aria-label="Filter by type"></div>


<ul class="lib-grid" id="lib-grid"></ul>
<p class="lib-empty" id="lib-empty" hidden>Nothing matches. <button type="button" id="lib-clear">Clear filters</button></p>

<script>
(function () {
  var DATA = {{ site.data.library | jsonify }};

  var state = { tags: [] };

  var elGrid  = document.getElementById('lib-grid');
  var elCats  = document.getElementById('lib-cats');
  var elEmpty = document.getElementById('lib-empty');

  function mdLinks(s) {
    var parts = String(s ?? '').split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
    return parts.map(function (part, i) {
      if (i % 2 === 1) {
        var m = part.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
        return '<a href="' + esc(m[2]) + '" target="_blank" rel="noopener noreferrer">' + esc(m[1]) + '</a>';
      }
      return esc(part).replace(/\*(.*?)\*/g, '<em>$1</em>');
    }).join('');
  }

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function parseTags(d) {
    return (d.Tags || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
  }

  // Collect unique tags, alphabetically
  var allTags = [];
  DATA.forEach(function (d) {
    parseTags(d).forEach(function (t) {
      if (allTags.indexOf(t) === -1) allTags.push(t);
    });
  });
  allTags.sort(function (a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()); });

  function tagCount(tag) {
    return tag === 'All' ? DATA.length : DATA.filter(function (d) { return parseTags(d).indexOf(tag) !== -1; }).length;
  }

  ['All'].concat(allTags).forEach(function (t) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'lib-filter' + (t === 'All' ? ' active' : '');
    b.setAttribute('aria-pressed', t === 'All' ? 'true' : 'false');
    b.dataset.tag = t;
    b.innerHTML = esc(t) + ' <span class="count">(' + tagCount(t) + ')</span>';
    b.addEventListener('click', function () { toggleTag(t); });
    elCats.appendChild(b);
  });

  function toggleTag(t) {
    if (t === 'All') {
      state.tags = [];
    } else {
      var idx = state.tags.indexOf(t);
      if (idx >= 0) state.tags.splice(idx, 1);
      else state.tags.push(t);
    }
    syncButtons();
    render();
  }

  function syncButtons() {
    Array.prototype.forEach.call(elCats.querySelectorAll('.lib-filter'), function (b) {
      var on = b.dataset.tag === 'All' ? state.tags.length === 0 : state.tags.indexOf(b.dataset.tag) >= 0;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  document.getElementById('lib-clear').addEventListener('click', function () {
    state = { tags: [] };
    syncButtons();
    render();
  });

  function matches(d) {
    if (state.tags.length > 0) {
      var dtags = parseTags(d);
      if (!state.tags.some(function (t) { return dtags.indexOf(t) !== -1; })) return false;
    }
    return true;
  }

  function render() {
    var rows = DATA.filter(matches);

    rows.sort(function (a, b) {
      return (a.Title || '').toLowerCase().localeCompare((b.Title || '').toLowerCase());
    });

    elGrid.innerHTML = '';
    elEmpty.hidden = rows.length !== 0;

    rows.forEach(function (d) {
      var starred = d.Starred === 'Y';
      var li = document.createElement('li');
      li.className = 'lib-card' + (starred ? ' formative' : '');

      var tags = parseTags(d);
      var extraChips = tags.slice(1).map(function (t) {
        return '<span class="lib-tag">' + esc(t) + '</span>';
      }).join('');

      li.innerHTML =
        '<p class="lib-card-eyebrow">' + esc(tags[0] || '') + (starred ? '<span class="lib-card-star" title="Starred">★</span>' : '') + '</p>' +
        '<h3 class="lib-card-title">' + (d.Link ? '<a href="' + esc(d.Link) + '" target="_blank" rel="noopener noreferrer">' + esc(d.Title) + '</a>' : esc(d.Title)) + '</h3>' +
        '<div class="lib-card-author">' + esc(d.Author) + '</div>' +
        (d.Notes ? '<p class="lib-card-notes">' + mdLinks(d.Notes) + '</p>' : '') +
        '<div class="lib-tags"><span class="lib-tag lib-tag--type">' + esc(d.Type) + '</span>' + extraChips + '</div>';

      elGrid.appendChild(li);
    });
  }

  render();
})();
</script>

<style>
.lib-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: var(--space-sm);
}
.lib-filter {
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.35rem 0.7rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.lib-filter:hover { background: var(--bg2); }
.lib-filter.active {
  background: transparent;
  border-color: var(--brand);
  color: var(--brand);
  font-weight: 600;
}
.lib-filter.active:hover { background: color-mix(in srgb, var(--brand) 8%, transparent); }
.lib-filter .count {
  font-size: 0.72rem;
  font-weight: 400;
  opacity: 0.65;
  margin-left: 0.1rem;
}
.lib-filter.active .count { color: var(--brand); opacity: 0.7; }

.lib-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-sm);
  list-style: none;
  padding: 0;
  margin: 0;
}

.lib-card {
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  padding: var(--space-md);
  background: var(--bg);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
}

.lib-card-title a { color: var(--brand); text-decoration: none; }
.lib-card-title a:hover { text-decoration: underline; text-underline-offset: 3px; }
.lib-card-notes a { color: var(--brand); text-underline-offset: 3px; }
a.lib-tag--link { color: var(--brand); font-weight: var(--weight-bold); text-decoration: none; }
a.lib-tag--link:hover { text-decoration: underline; text-underline-offset: 3px; }
.lib-card-title {
  font-size: var(--scale-base);
  font-weight: var(--weight-bold);
  color: var(--title);
  margin: 0;
  line-height: 1.35;
}
.lib-card-eyebrow { display: flex; justify-content: space-between; }
.lib-card-star { color: var(--brand); }
.lib-card-author { font-size: var(--scale-sm); color: var(--text); opacity: 0.8; }
.lib-card-eyebrow {
  font-size: 0.7rem;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text);
  margin: 0 0 0.25rem;
  line-height: 1.3;
}
.lib-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}
.lib-tag {
  font-size: 0.75rem;
  line-height: 1;
  padding: 0.35rem 0.55rem;
  border-radius: 0.25rem;
  background: var(--bg2);
  color: var(--text);
  white-space: nowrap;
}
.lib-tag--type {
  font-weight: var(--weight-bold);
  color: var(--title);
}
.lib-card-notes { font-size: var(--scale-sm); color: var(--text); line-height: 1.55; margin: 0.15rem 0 0; }

.lib-empty {
  margin: var(--space-lg) 0;
  color: var(--text);
  font-size: var(--scale-sm);
}
.lib-empty button {
  font: inherit;
  color: var(--brand);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 0;
}
</style>
