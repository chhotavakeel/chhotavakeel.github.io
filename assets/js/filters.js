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

  // Motion for a list container that carries `reveal-rows` (see the reveal
  // block in style.css). Call after each render: the first call lets the row
  // cascade play, every later one plays the short refresh dip instead. The
  // first-render state lives on the element rather than in a caller-side flag
  // so neither page has to keep that bookkeeping.
  function revealed(el) {
    if (!el.dataset.revealed) {
      el.dataset.revealed = '1';
      return; // let the first-paint cascade play
    }

    // Any later render has rebuilt the rows, so pin the cascade off for good —
    // re-running it per keystroke strobes the list. Settling here rather than
    // on a timer means it also holds when the reader starts filtering while
    // the cascade is still in flight, and adding it before the reflow below
    // keeps those rebuilt rows from animating even once.
    el.classList.add('reveal-settled');

    // Removing, forcing a reflow, then re-adding is what makes the animation
    // replay when the class is already there from the previous keystroke.
    el.classList.remove('is-refreshing');
    void el.offsetWidth;
    el.classList.add('is-refreshing');
  }

  return { esc: esc, buttons: buttons, sync: sync, revealed: revealed };
})();
