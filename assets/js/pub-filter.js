/*
 * Publication filter: topic tabs plus year buttons for the Publications section.
 *
 * Markup comes from _includes/pub-card.html and pub-item.html. Each paper
 * carries data-tags="tag1 tag2" and data-year="YYYY". The All tab
 * lists every paper; a topic tab lists the papers with that tag. Without
 * JavaScript the filter bar stays hidden and every paper is shown.
 */
(function () {
  'use strict';

  var bar = document.querySelector('.pub-filter');
  if (!bar) return;

  var HIDDEN = 'pub-filtered-out';
  var tabs = Array.prototype.slice.call(bar.querySelectorAll('.pub-filter__tab'));
  var yearGroup = bar.querySelector('.pub-filter__years');
  var status = bar.querySelector('.pub-filter__status');
  var empty = document.querySelector('.pub-filter__empty');

  // The section runs from the filter bar to the next h1 (the next page section).
  // Group papers under their h2 so a heading can hide when nothing under it matches.
  var items = [];
  var groups = [];
  var group = { heading: null, items: [] };
  groups.push(group);

  function addItem(el) {
    el._pubTags = (el.getAttribute('data-tags') || '').trim().split(/\s+/).filter(Boolean);
    el._pubYear = (el.getAttribute('data-year') || '').trim();
    items.push(el);
    group.items.push(el);
  }

  for (var el = bar.nextElementSibling; el && el.tagName !== 'H1'; el = el.nextElementSibling) {
    if (el.tagName === 'H2') {
      group = { heading: el, items: [] };
      groups.push(group);
    } else if (el.hasAttribute('data-tags')) {
      addItem(el);
    }
  }
  if (!items.length || !tabs.length) return;

  var state = { tag: 'all', year: 'all' };

  function matches(item, tag, year) {
    var inTab = tag === 'all' || item._pubTags.indexOf(tag) !== -1;
    return inTab &&
      (year === 'all' || item._pubYear === year);
  }

  function countFor(tag, year) {
    var n = 0;
    for (var i = 0; i < items.length; i++) if (matches(items[i], tag, year)) n++;
    return n;
  }

  // Year buttons: "All" plus one per distinct data-year, newest first.
  var years = [];
  items.forEach(function (item) {
    if (item._pubYear && years.indexOf(item._pubYear) === -1) years.push(item._pubYear);
  });
  years.sort(function (a, b) { return b.localeCompare(a); });
  var yearButtons = [];
  if (yearGroup) {
    ['all'].concat(years).forEach(function (year) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'pub-filter__year';
      button.setAttribute('data-year', year);
      button.textContent = year === 'all' ? 'All' : year;
      button.addEventListener('click', function () {
        state.year = year;
        render();
      });
      yearGroup.appendChild(button);
      yearButtons.push(button);
    });
  }

  // Each tab gets a count badge that follows the selected year.
  tabs.forEach(function (tab) {
    var badge = document.createElement('span');
    badge.className = 'pub-filter__count';
    badge.setAttribute('aria-hidden', 'true');
    tab.appendChild(badge);
    tab._pubCount = badge;
  });

  function setHidden(el, hidden) {
    el.classList.toggle(HIDDEN, hidden);
  }

  function render() {
    var visible = 0;
    items.forEach(function (item) {
      var show = matches(item, state.tag, state.year);
      setHidden(item, !show);
      if (show) visible++;
    });

    groups.forEach(function (g) {
      if (!g.heading) return;
      var any = g.items.some(function (item) { return !item.classList.contains(HIDDEN); });
      setHidden(g.heading, g.items.length > 0 && !any);
    });

    tabs.forEach(function (tab) {
      var tag = tab.getAttribute('data-filter');
      var n = countFor(tag, state.year);
      tab._pubCount.textContent = n;
      tab.setAttribute('aria-pressed', tag === state.tag ? 'true' : 'false');
      tab.classList.toggle('is-empty', n === 0);
      var name = tab.getAttribute('title') || tab.firstChild.textContent.trim();
      tab.setAttribute('aria-label', name + ', ' + n + ' papers');
    });
    // A year with nothing under the current tab is disabled, unless it is the
    // selected one, so a visitor cannot click into an empty list.
    yearButtons.forEach(function (button) {
      var year = button.getAttribute('data-year');
      var n = countFor(state.tag, year);
      var selected = year === state.year;
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      button.disabled = n === 0 && !selected;
      button.setAttribute('aria-label', (year === 'all' ? 'All years' : year) + ', ' + n + ' papers');
    });

    if (empty) empty.hidden = visible !== 0;
    if (status) status.textContent = 'Showing ' + visible + ' of ' + items.length + ' publications';
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      state.tag = tab.getAttribute('data-filter');
      render();
    });
  });

  bar.hidden = false;
  render();
})();
