---
permalink: /library
title: Library
layout: page
---

Information worth retaining. Starred items have shaped how I think.

<div class="filter-row" id="lib-cats" role="group" aria-label="Filter by type"></div>


<ul class="lib-grid" id="lib-grid"></ul>
<p class="filter-empty" id="lib-empty" hidden>Nothing matches. <button type="button" id="lib-clear">Clear filters</button></p>

<script src="{{ site.baseurl }}/assets/js/filters.js"></script>
<script>
(function () {
  var DATA = {{ site.data.library | jsonify }};
  var esc = Filters.esc;

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

  Filters.buttons(elCats, ['All'].concat(allTags), toggleTag);

  function toggleTag(t) {
    if (t === 'All' || state.tags[0] === t) {
      state.tags = [];
    } else {
      state.tags = [t];
    }
    syncButtons();
    render();
  }

  function syncButtons() {
    Filters.sync(elCats, function (t) {
      return {
        on: t === 'All' ? state.tags.length === 0 : state.tags.indexOf(t) >= 0,
        count: tagCount(t)
      };
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
        return '<span class="tag">' + esc(t) + '</span>';
      }).join('');

      li.innerHTML =
        '<p class="lib-card-eyebrow">' + esc(tags[0] || '') + (starred ? '<span class="lib-card-star" title="Starred">★</span>' : '') + '</p>' +
        '<h3 class="lib-card-title">' + (d.Link ? '<a href="' + esc(d.Link) + '" target="_blank" rel="noopener noreferrer">' + esc(d.Title) + '</a>' : esc(d.Title)) + '</h3>' +
        '<div class="lib-card-author">' + esc(d.Author) + '</div>' +
        (d.Notes ? '<p class="lib-card-notes">' + mdLinks(d.Notes) + '</p>' : '') +
        '<div class="lib-tags"><span class="tag tag--strong">' + esc(d.Type) + '</span>' + extraChips + '</div>';

      elGrid.appendChild(li);
    });
  }

  syncButtons();
  render();
})();
</script>

<style>
.lib-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-sm);
  list-style: none;
  padding: 0;
  margin: var(--space-sm) 0 0;
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
  min-height: 14rem;
}
.lib-card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: var(--scale-base);
  font-weight: var(--weight-bold);
  color: var(--title);
  margin: 0;
  line-height: 1.35;
}

.lib-card-title a { color: var(--brand); text-decoration: none; }
.lib-card-title a:hover { text-decoration: underline; text-underline-offset: 3px; }
.lib-card-notes a { color: var(--brand); text-underline-offset: 3px; }
.lib-card-eyebrow {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text);
  margin: 0 0 0.25rem;
  line-height: 1.3;
}
.lib-card-star { color: var(--brand); }
.lib-card-author { font-size: var(--scale-sm); color: var(--text); opacity: 0.8; }
.lib-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
}
.lib-card-notes { font-size: var(--scale-sm); color: var(--text); line-height: 1.55; margin: 0.15rem 0 0; }
</style>
