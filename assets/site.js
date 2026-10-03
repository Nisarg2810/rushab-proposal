/* Rushab Tours prototype: routing, filtering, package detail, enquiry capture and the WhatsApp flow. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var PH = ['', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var inr = function (n) { return '₹' + Number(n).toLocaleString('en-IN'); };
  var state = { dest: '', nights: '', budget: '', theme: '', from: '', month: '', sort: 'pop', pax: { a: 2, c: 0 }, pkg: null };

  /* ---------------------------------------------------------------- cards */
  function card(p, i) {
    return '<article class="card" data-pkg="' + p.id + '">' +
      '<div class="ph ' + PH[i % PH.length] + '"><span class="pill">' + p.nights + 'N / ' + p.days + 'D</span>' +
      '<span class="fav">♡</span>' +
      '<span class="nm">' + p.dest + '<small>' + (p.cities || []).map(function (c) { return c.name; }).join(' · ') + '</small></span></div>' +
      '<div class="cb"><h3>' + p.name + '</h3>' +
      '<div class="meta"><span>' + p.theme.join(', ') + '</span><span>•</span><span>From <b>' + (p.from || [])[0] + '</b></span></div>' +
      '<p>' + p.blurb + '</p>' +
      '<div class="foot"><div class="price"><b>' + inr(p.price) + '</b>' + (p.was ? '<s>' + inr(p.was) + '</s>' : '') +
      '<span>per person, ' + p.nights + ' nights</span></div>' +
      '<div class="stars"><i>★</i> ' + p.rating + '<span style="display:block;font-weight:500;color:var(--mut);font-size:11.5px">' + p.sold + ' booked</span></div>' +
      '</div></div></article>';
  }

  /* ----------------------------------------------------------------- home */
  function home() {
    $('#homeGrid').innerHTML = PKGS.slice(0, 4).map(card).join('');
    $('#destGrid').innerHTML = DESTS.map(function (d, i) {
      return '<div class="dest" data-dest="' + d.name + '" style="background:linear-gradient(135deg,' +
        ['#1d4e89,#0FA3A3', '#0d7377,#14b8a6', '#b45309,#f59e0b', '#7c2d12,#ef4444', '#1e3a8a,#3b82f6', '#065f46,#10b981', '#581c87,#a855f7', '#0c4a6e,#0ea5e9'][i % 8] +
        ')"><b>' + d.name + '</b><small>' + d.n + ' packages · ' + d.tag + '</small></div>';
    }).join('');
    var ds = $('#sDest');
    DESTS.forEach(function (d) { ds.insertAdjacentHTML('beforeend', '<option>' + d.name + '</option>'); });
    var ms = $('#sMonth');
    MONTHS.forEach(function (m) { ms.insertAdjacentHTML('beforeend', '<option>' + m + '</option>'); });
  }

  /* -------------------------------------------------------------- listing */
  function chips(el, items, key) {
    $(el).innerHTML = items.map(function (x) {
      return '<button class="chip' + (state[key] === x.v ? ' on' : '') + '" data-f="' + key + '" data-v="' + x.v + '">' + x.t + '</button>';
    }).join('');
  }

  function filters() {
    chips('#fDest', [{ v: '', t: 'All' }].concat(DESTS.map(function (d) { return { v: d.name, t: d.name }; })), 'dest');
    chips('#fNights', [{ v: '', t: 'Any' }, { v: '3', t: 'Up to 3N' }, { v: '5', t: '4 to 5N' }, { v: '6', t: '6N plus' }], 'nights');
    chips('#fBudget', [{ v: '', t: 'Any' }, { v: '25000', t: 'Under 25k' }, { v: '50000', t: '25k to 50k' }, { v: '999999', t: '50k plus' }], 'budget');
    chips('#fTheme', [{ v: '', t: 'All' }, { v: 'Honeymoon', t: 'Honeymoon' }, { v: 'Family', t: 'Family' }, { v: 'Beach', t: 'Beach' }, { v: 'Nature', t: 'Nature' }, { v: 'Heritage', t: 'Heritage' }], 'theme');
    chips('#fFrom', [{ v: '', t: 'Any city' }, { v: 'Mumbai', t: 'Mumbai' }, { v: 'Delhi', t: 'Delhi' }, { v: 'Ahmedabad', t: 'Ahmedabad' }, { v: 'Bengaluru', t: 'Bengaluru' }], 'from');
  }

  function match() {
    return PKGS.filter(function (p) {
      if (state.dest && p.dest !== state.dest) return false;
      if (state.theme && p.theme.indexOf(state.theme) < 0) return false;
      if (state.from && (p.from || []).indexOf(state.from) < 0) return false;
      if (state.month && (p.months || []).indexOf(state.month) < 0) return false;
      if (state.nights === '3' && p.nights > 3) return false;
      if (state.nights === '5' && (p.nights < 4 || p.nights > 5)) return false;
      if (state.nights === '6' && p.nights < 6) return false;
      if (state.budget === '25000' && p.price >= 25000) return false;
      if (state.budget === '50000' && (p.price < 25000 || p.price > 50000)) return false;
      if (state.budget === '999999' && p.price <= 50000) return false;
      return true;
    }).sort(function (a, b) {
      if (state.sort === 'low') return a.price - b.price;
      if (state.sort === 'high') return b.price - a.price;
      if (state.sort === 'short') return a.nights - b.nights;
      return b.sold - a.sold;
    });
  }

  function listing() {
    filters();
    var r = match();
    $('#lCount').innerHTML = '<b>' + r.length + '</b> package' + (r.length === 1 ? '' : 's') +
      (state.dest ? ' in ' + state.dest : '') + (state.budget ? ', inside your budget' : '');
    $('#listGrid').innerHTML = r.length ? r.map(card).join('')
      : '<div style="grid-column:1/-1;padding:50px;text-align:center;color:var(--mut)">' +
        '<b style="display:block;color:var(--ink);font-size:18px;margin-bottom:6px">Nothing matches that yet</b>' +
        'Try a wider budget, or clear a filter. A planner can build this trip for you anyway.</div>';
  }

  /* --------------------------------------------------------------- detail */
  function stars(n) { return new Array(n + 1).join('★'); }

  function detail(p) {
    var line = function (x) {
      if (typeof x === 'string') return '<li>' + x + '</li>';
      return '<li>' + x.t + (x.sub ? '<ul class="sub">' + x.sub.map(function (y) { return '<li>' + y + '</li>'; }).join('') + '</ul>' : '') + '</li>';
    };
    var days = (p.itinerary || []).map(function (d) {
      return '<details class="day"' + (d.day === 1 ? ' open' : '') + '><summary><i>Day ' + d.day +
        (d.date ? '<em>' + d.date + '</em>' : '') + '</i>' + d.title + '</summary>' +
        '<ul>' + d.items.map(line).join('') + '</ul></details>';
    }).join('');
    var hotels = (p.hotels || []).map(function (h) {
      return '<div class="hotel"><div class="img"></div><div><b>' + h.name + '</b><span class="st">' + stars(h.star) + '</span>' +
        '<small>' + h.city + '</small><small>' + h.dates + '</small>' +
        '<small>Room type: ' + h.room + ' &nbsp;·&nbsp; Meal plan: ' + h.meal + '</small>' +
        (h.roomInc ? '<small>Room inclusion: ' + h.roomInc + '</small>' : '') + '</div></div>';
    }).join('');
    var sights = (p.sights || []).map(function (s) {
      return '<div class="sight"><div class="img"></div><div><b>' + s.name + '</b><p>' + s.note + '</p></div></div>';
    }).join('');
    var li = function (a) { return (a || []).map(function (x) { return '<li>' + x + '</li>'; }).join(''); };
    var similar = PKGS.filter(function (x) { return x.id !== p.id; }).slice(0, 4);

    $('#pkgWrap').innerHTML =
      '<nav style="font-size:13.5px;color:var(--mut);margin-bottom:14px"><a data-go="home" style="color:var(--brand);font-weight:600">Home</a> / ' +
      '<a data-go="list" style="color:var(--brand);font-weight:600">Packages</a> / ' + p.dest + '</nav>' +
      '<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:16px">' +
      '<div><h1 style="font-size:clamp(26px,3.2vw,40px)">' + p.name + '</h1>' +
      '<div class="meta" style="display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;color:var(--mut);font-size:14.5px;font-weight:600">' +
      '<span>' + p.nights + ' nights / ' + p.days + ' days</span><span>•</span>' +
      '<span>' + (p.cities || []).map(function (c) { return '(' + c.nights + 'N) ' + c.name; }).join(' · ') + '</span><span>•</span>' +
      '<span style="color:var(--ink)"><i style="color:var(--gold);font-style:normal">★</i> ' + p.rating + ' from ' + p.reviews + ' travellers</span></div></div></div>' +

      '<div class="gal"><div><span>Port Blair</span></div><div></div><div></div><div></div><div><span>+18 photos</span></div></div>' +

      '<div class="detail" style="margin-top:24px">' +
      '<div>' +
        '<div class="blk"><h3><em></em>Hotels included</h3>' + (hotels || '<p>Hotels confirmed at the time of booking.</p>') + '</div>' +
        '<div class="blk"><h3><em></em>Day by day</h3>' + (days || '<p>A full day by day plan is sent with your quote.</p>') + '</div>' +
        (sights ? '<div class="blk"><h3><em></em>What you will see</h3>' + sights + '</div>' : '') +
        '<div class="blk"><h3><em></em>What is included</h3><div class="two-col">' +
          '<ul class="tick">' + li(p.inc || ['Hotels, transfers and sightseeing as listed.']) + '</ul>' +
          '<div><b style="display:block;color:var(--ink);margin-bottom:8px">Not included</b><ul class="tick no">' + li(p.exc || ['Airfare and personal expenses.']) + '</ul></div>' +
        '</div></div>' +
        (p.notes ? '<div class="blk"><h3><em></em>Good to know</h3><div class="notebox"><ul>' + li(p.notes) + '</ul></div></div>' : '') +
        '<div class="blk"><h3><em></em>Cancellation and payment</h3><div class="two-col">' +
          '<div class="notebox red"><b style="display:block;margin-bottom:6px">Cancellation</b><ul>' + li(p.cancel || ['Shared with your quote.']) + '</ul></div>' +
          '<div class="notebox"><b style="display:block;margin-bottom:6px">Payment</b><ul>' + li(p.pay || ['50 percent to confirm, balance before travel.']) + '</ul></div>' +
        '</div></div>' +
      '</div>' +

      '<aside class="book">' +
        '<div class="top"><b>' + inr(p.price) + '</b>' + (p.was ? '<s>' + inr(p.was) + '</s>' : '') +
        '<span>per person, on twin sharing</span></div>' +
        '<div class="body">' +
          '<div class="fld"><label>Travel date</label><input type="date" id="bDate" value="2026-10-30"></div>' +
          '<div class="fld"><label>Travellers</label>' +
            '<div class="pax"><div><span>Adults</span><button data-pax="a-">&minus;</button><b id="pA">2</b><button data-pax="a+">+</button></div>' +
            '<div><span>Children</span><button data-pax="c-">&minus;</button><b id="pC">0</b><button data-pax="c+">+</button></div></div></div>' +
          '<div class="fld"><label>Departure city</label><select id="bCity">' + (p.from || ['Mumbai']).map(function (c) { return '<option>' + c + '</option>'; }).join('') + '</select></div>' +
          '<div class="total"><span>Per person<small id="bPax">2 adults, 0 children</small></span><b>' + inr(p.price) + '</b></div>' +
          '<div class="total grand"><span>Total amount</span><b id="bTotal">' + inr(p.price * 2) + '</b></div>' +
          '<button class="btn btn-p" data-enq="' + p.id + '">Send my enquiry</button>' +
          '<p class="small">A planner calls you back the same day. No payment now.</p>' +
          '<div class="badges"><span>Hotels named upfront</span><span>Transfers included</span><span>Free date change</span></div>' +
        '</div>' +
      '</aside></div>' +

      '<div class="sec tight" style="padding-bottom:0"><div class="sec-h"><div><h2 style="font-size:26px">Travellers also looked at</h2></div></div>' +
      '<div class="grid">' + similar.map(card).join('') + '</div></div>';

    state.pax = { a: 2, c: 0 };
    var sync = function () {
      var a = state.pax.a, c = state.pax.c;
      $('#pA').textContent = a; $('#pC').textContent = c;
      $('#bPax').textContent = a + (a === 1 ? ' adult, ' : ' adults, ') + c + (c === 1 ? ' child' : ' children');
      $('#bTotal').textContent = inr(p.price * a + Math.round(p.price * 0.7) * c);
    };
    $$('[data-pax]').forEach(function (b) {
      b.onclick = function () {
        var k = b.getAttribute('data-pax'), f = k[0], up = k[1] === '+';
        var v = state.pax[f] + (up ? 1 : -1);
        state.pax[f] = Math.max(f === 'a' ? 1 : 0, Math.min(12, v));
        sync();
      };
    });
    sync();
  }

  /* ---------------------------------------------------------- enquiry form */
  function enquiry(pkgId) {
    var p = PKGS.filter(function (x) { return x.id === pkgId; })[0] || PKGS[0];
    $('#modal').innerHTML =
      '<h3>Plan this trip with us</h3>' +
      '<p class="sub">' + p.name + ', ' + p.nights + ' nights. A planner calls you back today with dates and the final price.</p>' +
      '<div class="fld"><label>Your name</label><input id="eName" placeholder="Rhea Shah"></div>' +
      '<div class="fld"><label>Mobile number</label><input id="ePhone" placeholder="+91 98250 00000" inputmode="tel"></div>' +
      '<div class="fld"><label>Email</label><input id="eMail" placeholder="you@email.com" inputmode="email"></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
        '<div class="fld"><label>Travel date</label><input type="date" id="eDate" value="2026-10-30"></div>' +
        '<div class="fld"><label>Travellers</label><select id="ePax"><option>2 adults</option><option>2 adults, 1 child</option><option>4 adults</option><option>6 adults</option></select></div>' +
      '</div>' +
      '<div class="fld"><label>Budget per person</label><select id="eBudget"><option>Under 25k</option><option selected>25k to 50k</option><option>50k to 1L</option><option>1L plus</option></select></div>' +
      '<button class="btn btn-p" id="eSend" style="width:100%;margin-top:6px">Send enquiry</button>' +
      '<p style="font-size:12.5px;color:var(--mut);text-align:center;margin:12px 0 0">We never share your number. One call, no spam.</p>';
    $('#mask').classList.add('on');
    $('#eSend').onclick = function () {
      var name = ($('#eName').value || '').trim();
      if (!name || !($('#ePhone').value || '').trim()) {
        ($('#ePhone').value ? $('#eName') : $('#ePhone')).style.borderColor = 'var(--coral)';
        return;
      }
      $('#modal').innerHTML = '<div class="done"><div class="ok">✓</div>' +
        '<h3>Thanks ' + name.split(' ')[0] + ', we have it.</h3>' +
        '<p class="sub" style="margin-bottom:18px">A planner will call you within a few hours. Your enquiry now sits in the dashboard with the package, the dates, the budget and where you came from.</p>' +
        '<a class="btn btn-o" href="../dashboard/" style="width:100%">See it land in the dashboard</a>' +
        '<button class="btn btn-p" id="eClose" style="width:100%;margin-top:10px">Keep browsing</button></div>';
      $('#eClose').onclick = function () { $('#mask').classList.remove('on'); };
    };
  }

  /* -------------------------------------------------------------- whatsapp */
  var WA = [
    { from: 'them', text: 'Hi, this is Rushab Tours. Where would you like to go?' , opts: ['Andaman', 'Kerala', 'Dubai', 'Not sure yet'] },
    { from: 'them', text: 'Lovely. When are you planning to travel?', opts: ['Next month', 'In 2 to 3 months', 'Just looking'] },
    { from: 'them', text: 'How many of you are travelling?', opts: ['2 adults', '2 adults, 1 child', '4 or more'] },
    { from: 'them', text: 'Last one. What budget per person are you working with?', opts: ['Under 25k', '25k to 50k', '50k plus'] },
    { from: 'them', text: 'Perfect. Tap below and one of our planners picks this up on WhatsApp with everything you just told me.', opts: ['Open WhatsApp'] }
  ];
  var waStep = 0;
  function waRender() {
    var body = $('#waBody');
    body.innerHTML = '';
    for (var i = 0; i <= waStep && i < WA.length; i++) {
      body.insertAdjacentHTML('beforeend', '<div class="wa-m">' + WA[i].text + '</div>');
      if (WA[i].answer) body.insertAdjacentHTML('beforeend', '<div class="wa-m me">' + WA[i].answer + '</div>');
    }
    var cur = WA[waStep];
    if (cur && !cur.answer) {
      body.insertAdjacentHTML('beforeend', '<div class="wa-opts">' + cur.opts.map(function (o) {
        return '<button data-wa="' + o + '">' + o + '</button>'; }).join('') + '</div>');
    }
    body.scrollTop = body.scrollHeight;
  }
  function waPick(v) {
    if (waStep >= WA.length - 1) {
      $('#waBody').insertAdjacentHTML('beforeend',
        '<div class="wa-m me">' + v + '</div><div class="wa-m">Opening WhatsApp now. In the real site this hands over with your answers already typed in.</div>');
      $('#waBody').scrollTop = 9999;
      return;
    }
    WA[waStep].answer = v;
    waStep++;
    waRender();
  }

  /* ---------------------------------------------------------------- routes */
  function show(v) {
    $$('.view').forEach(function (s) { s.classList.toggle('on', s.id === v); });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  document.addEventListener('click', function (e) {
    var el;
    if (el = e.target.closest('[data-enq]')) { enquiry(el.getAttribute('data-enq')); return; }
    if (el = e.target.closest('[data-pkg]')) {
      var p = PKGS.filter(function (x) { return x.id === el.getAttribute('data-pkg'); })[0];
      if (p) { state.pkg = p; detail(p); show('vPkg'); }
      return;
    }
    if (el = e.target.closest('[data-dest]')) { state.dest = el.getAttribute('data-dest'); listing(); show('vList'); return; }
    if (el = e.target.closest('[data-f]')) {
      state[el.getAttribute('data-f')] = state[el.getAttribute('data-f')] === el.getAttribute('data-v') ? '' : el.getAttribute('data-v');
      listing(); return;
    }
    if (el = e.target.closest('[data-go]')) {
      var to = el.getAttribute('data-go');
      if (to === 'list') { listing(); show('vList'); } else { show('vHome'); }
      $$('.nav a').forEach(function (a) { a.classList.toggle('on', a === el); });
      return;
    }
    if (el = e.target.closest('[data-wa]')) { waPick(el.getAttribute('data-wa')); return; }
    if (e.target.id === 'mask') $('#mask').classList.remove('on');
  });

  $('#sGo').onclick = function () {
    state.dest = $('#sDest').value; state.month = $('#sMonth').value;
    state.nights = $('#sNights').value; state.budget = $('#sBudget').value;
    listing(); show('vList');
  };
  $('#lSort').onchange = function () { state.sort = this.value; listing(); };
  $('#waBtn').onclick = function () { $('#waPanel').classList.toggle('on'); if (!$('#waBody').innerHTML) waRender(); };
  $('#waX').onclick = function () { $('#waPanel').classList.remove('on'); };

  home();
  listing();
})();
