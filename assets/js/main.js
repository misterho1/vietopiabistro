/* Vietopia Bistro — main.js
   Vanilla JS. No dependencies. Progressive enhancement. */

(function () {
  'use strict';

  /* ---------- Order URLs ----------
     PASTE YOUR LIVE URLS HERE before going live. The four placeholders below
     are wired through to the order modal and every "Order Online" button. */
  var ORDER_URLS = {
    toast: {
      taylorsville: 'https://order.toasttab.com/online/miyazaki-taylorsville-5308-s-redwood-rd',
      'west-jordan': 'https://www.toasttab.com/local/order/miyazaki-west-jordan-1407-w-9000-s'
    },
    doordash: {
      taylorsville: 'https://www.doordash.com/store/808377',
      'west-jordan': 'https://www.doordash.com/store/vietopia-bistro-west-jordan-(w-9000-s)-west-jordan-1934146/2429190/'
    },
    grubhub: {
      taylorsville: 'https://www.grubhub.com/restaurant/vietopia-bistro-taylorsville-5308-s-redwood-rd-salt-lake-city/3029526',
      'west-jordan': 'https://www.grubhub.com/restaurant/vietopia-bistro-west-jordan-1407-w-9000-s-west-jordan/3017369'
    },
    uber_eats: {
      taylorsville: 'https://www.ubereats.com/store/vietopia-bistro-taylorsville/AXZetOASWOeZtVhnqUkukA',
      'west-jordan': 'https://www.ubereats.com/store/vietopia-bistro-west-jordan/7qZEQdByWfOvMoGgfDVBbg'
    }
  };

  /* ---------- Order modal ---------- */
  function buildOrderModal() {
    if (document.getElementById('order-modal')) return;
    var locked = document.body.getAttribute('data-location') || '';
    var dialog = document.createElement('dialog');
    dialog.id = 'order-modal';
    dialog.className = 'order-modal';
    dialog.setAttribute('aria-labelledby', 'order-modal-title');

    var cards = [
      { ch: 'toast',    loc: 'taylorsville', label: 'Pickup · Toast',     city: 'Taylorsville', sub: 'Ready in 15–20 min' },
      { ch: 'toast',    loc: 'west-jordan',  label: 'Pickup · Toast',     city: 'West Jordan',  sub: 'Ready in 15–20 min' },
      { ch: 'doordash', loc: 'taylorsville', label: 'Delivery · DoorDash', city: 'Taylorsville', sub: 'Fee and time vary' },
      { ch: 'doordash', loc: 'west-jordan',  label: 'Delivery · DoorDash', city: 'West Jordan',  sub: 'Fee and time vary' },
      { ch: 'grubhub',  loc: 'taylorsville', label: 'Delivery · Grubhub',  city: 'Taylorsville', sub: 'Fee and time vary' },
      { ch: 'grubhub',  loc: 'west-jordan',  label: 'Delivery · Grubhub',  city: 'West Jordan',  sub: 'Fee and time vary' },
      { ch: 'uber_eats', loc: 'taylorsville', label: 'Delivery · Uber Eats', city: 'Taylorsville', sub: 'Fee and time vary' },
      { ch: 'uber_eats', loc: 'west-jordan',  label: 'Delivery · Uber Eats', city: 'West Jordan',  sub: 'Fee and time vary' }
    ];

    var cardHtml = cards
      .filter(function (c) { return !locked || c.loc === locked; })
      .map(function (c) {
        var href = ORDER_URLS[c.ch][c.loc];
        return ''
          + '<a class="order-modal__card" href="' + href + '" target="_blank" rel="noopener">'
          +   '<span class="order-modal__card-channel">' + c.label + '</span>'
          +   '<span class="order-modal__card-loc">' + c.city + '</span>'
          +   '<span class="order-modal__card-sub">' + c.sub + '</span>'
          + '</a>';
      }).join('');

    dialog.innerHTML = ''
      + '<form method="dialog" class="order-modal__close-form">'
      +   '<button class="order-modal__close" aria-label="Close" value="cancel">×</button>'
      + '</form>'
      + '<div class="order-modal__inner">'
      +   '<p class="eyebrow" style="margin-bottom: 0.5rem;">Order online</p>'
      +   '<h2 id="order-modal-title" style="margin-bottom: 0.5rem;">Pickup or delivery?</h2>'
      +   '<p class="text-muted" style="margin-bottom: 1.25rem;">Pickup goes through Toast. Delivery is available via DoorDash, Grubhub, or Uber Eats.</p>'
      +   '<div class="order-modal__grid">' + cardHtml + '</div>'
      + '</div>';

    document.body.appendChild(dialog);

    // Click backdrop to close
    dialog.addEventListener('click', function (e) {
      var rect = dialog.getBoundingClientRect();
      var inside = e.clientX >= rect.left && e.clientX <= rect.right
                && e.clientY >= rect.top  && e.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }

  function openOrderModal(e) {
    var dialog = document.getElementById('order-modal');
    if (!dialog) return;
    if (typeof dialog.showModal !== 'function') return; // graceful degradation: let the native href take over
    if (e) e.preventDefault();
    dialog.showModal();
  }

  document.addEventListener('DOMContentLoaded', buildOrderModal);

  // Any element marked data-order-trigger opens the modal.
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('[data-order-trigger]');
    if (trigger) openOrderModal(e);
  });

  // ---------- Mobile nav toggle ----------
  const navToggle = document.querySelector('[data-nav-toggle]');
  const primaryNav = document.querySelector('[data-primary-nav]');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const open = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // close nav when a link is clicked on mobile
    primaryNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Menu filters ----------
  const filterButtons = document.querySelectorAll('[data-filter]');
  const menuItems = document.querySelectorAll('[data-tags]');
  if (filterButtons.length && menuItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');
        filterButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        menuItems.forEach(function (item) {
          const tags = (item.getAttribute('data-tags') || '').split(' ');
          if (filter === 'all' || tags.indexOf(filter) !== -1) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        });
      });
    });
  }

  // ---------- Lazy Instagram embed ----------
  const igTarget = document.querySelector('[data-ig-embed]');
  if (igTarget && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const profileUrl = igTarget.getAttribute('data-ig-url');
          if (profileUrl) {
            igTarget.innerHTML =
              '<blockquote class="instagram-media" data-instgrm-permalink="' +
              profileUrl +
              '" data-instgrm-version="14"></blockquote>';
            const s = document.createElement('script');
            s.async = true;
            s.src = 'https://www.instagram.com/embed.js';
            document.body.appendChild(s);
          }
          obs.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    observer.observe(igTarget);
  }

  // ---------- Form enhancer ----------
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const endpoint = form.getAttribute('action');
      const status = form.querySelector('[data-form-status]');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      if (status) {
        status.className = '';
        status.textContent = 'Sending…';
      }
      const data = new FormData(form);
      const payload = {};
      data.forEach(function (val, key) { payload[key] = val; });
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json().catch(function () { return {}; }).then(function (body) { return { ok: res.ok, body: body }; }); })
        .then(function (result) {
          if (submitBtn) submitBtn.disabled = false;
          if (!status) return;
          if (result.ok) {
            status.className = 'form-success';
            status.textContent = (result.body && result.body.message) || 'Thanks. We received your message and will be in touch.';
            form.reset();
          } else {
            status.className = 'form-error';
            status.textContent = (result.body && result.body.error) || 'Something went wrong. Please call us instead.';
          }
        })
        .catch(function () {
          if (submitBtn) submitBtn.disabled = false;
          if (status) {
            status.className = 'form-error';
            status.textContent = 'Network error. Please call us instead.';
          }
        });
    });
  });

  // ---------- Footer year ----------
  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
