// Shared helpers for the filterable list pages (Library, Transactions).
// Styles live under "Filterable-list components" in style.css.
window.Filters = (function () {
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Build one .filter-btn per label inside `container`. Counts and active
  // state are filled in by sync(), so call it once after building.
  function buttons(container, labels, onClick) {
    labels.forEach(function (label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-btn';
      b.dataset.label = label;
      b.innerHTML = esc(label) + ' <span class="filter-count"></span>';
      b.addEventListener('click', function () { onClick(label); });
      container.appendChild(b);
    });
  }

  // fn(label) -> { on, indicated, disabled, count } — all optional.
  function sync(container, fn) {
    Array.prototype.forEach.call(container.querySelectorAll('.filter-btn'), function (b) {
      var s = fn(b.dataset.label) || {};
      b.classList.toggle('is-on', !!s.on);
      b.classList.toggle('is-indicated', !!s.indicated);
      b.setAttribute('aria-pressed', s.on ? 'true' : 'false');
      b.disabled = !!s.disabled;
      var n = b.querySelector('.filter-count');
      if (n && s.count != null) n.textContent = '(' + s.count + ')';
    });
  }

  return { esc: esc, buttons: buttons, sync: sync };
})();
