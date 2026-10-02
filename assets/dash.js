/* Rushab Tours dashboard prototype: overview, leads with a detail drawer, package list and the package editor. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var inr = function (n) { return '₹' + Number(n).toLocaleString('en-IN'); };
  var leads = LEADS.slice();
  var state = { tab: 'All', q: '', etab: 'Overview' };

  /* ------------------------------------------------------------- overview */
  function overview() {
    var open = leads.filter(function (l) { return l.status !== 'Lost' && l.status !== 'Won'; });
    var value = open.reduce(function (a, l) { return a + l.value; }, 0);
    var kpis = [
      ['Enquiries this month', '68', '+18% on September', 'up'],
      ['Open in the pipeline', String(open.length * 7), inr(value * 7) + ' of value', 'up'],
      ['Turned into bookings', '21', '31% of enquiries', 'up'],
      ['Average trip value', inr(84500), '+6% on September', 'up']
    ];
    $('#kpis').innerHTML = kpis.map(function (k) {
      return '<div class="kpi"><small>' + k[0] + '</small><b>' + k[1] + '</b><span class="' + k[3] + '">' + k[2] + '</span></div>';
    }).join('');

    var days = [4, 6, 3, 8, 11, 7, 5, 9, 14, 10, 6, 12, 16, 9];
    $('#chart').innerHTML = days.map(function (d, i) {
      return '<div style="height:' + (d / 16 * 100) + '%;animation-delay:' + (i * 45) + 'ms"><span>' + d + '</span>' +
        '<small>' + (i % 2 === 0 ? (i + 19) : '') + '</small></div>';
    }).join('');

    var srcs = [['Google Ads', 38], ['Organic search', 24], ['WhatsApp bubble', 18], ['Instagram', 12], ['Referral', 8]];
    $('#srcList').innerHTML = srcs.map(function (s) {
      return '<div class="src"><b>' + s[0] + '</b><div class="bar"><i style="width:' + s[1] * 2.4 + '%"></i></div><span>' + s[1] + '%</span></div>';
    }).join('');

    $('#recent').innerHTML = '<div class="tbl-wrap"><table class="tbl"><thead><tr>' +
      '<th>Traveller</th><th>Package</th><th>Travel date</th><th>Value</th><th>Source</th><th>Status</th><th>When</th></tr></thead><tbody>' +
      leads.slice(0, 5).map(function (l) {
        return '<tr data-lead="' + l.id + '"><td><b>' + l.name + '</b><small>' + l.phone + '</small></td>' +
          '<td>' + l.pkg + '</td><td>' + l.date + '<small>' + l.pax + '</small></td>' +
          '<td><b>' + inr(l.value) + '</b></td><td>' + l.src + '</td>' +
          '<td><span class="pill ' + l.status + '">' + l.status + '</span></td><td class="muted">' + l.when + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  /* ---------------------------------------------------------------- leads */
  function leadTabs() {
    var tabs = ['All', 'New', 'Contacted', 'Quoted', 'Won', 'Lost'];
    $('#lTabs').innerHTML = tabs.map(function (t) {
      var n = t === 'All' ? leads.length : leads.filter(function (l) { return l.status === t; }).length;
      return '<button class="' + (state.tab === t ? 'on' : '') + '" data-tab="' + t + '">' + t + ' <span style="opacity:.6">' + n + '</span></button>';
    }).join('');
  }

  function leadTable() {
    leadTabs();
    var rows = leads.filter(function (l) {
      if (state.tab !== 'All' && l.status !== state.tab) return false;
      if (state.q && (l.name + ' ' + l.phone + ' ' + l.pkg + ' ' + l.dest).toLowerCase().indexOf(state.q.toLowerCase()) < 0) return false;
      return true;
    });
    $('#lTable').innerHTML = '<thead><tr><th>Traveller</th><th>Package and dates</th><th>Group</th><th>Budget</th>' +
      '<th>Value</th><th>Source</th><th>Status</th><th>Received</th></tr></thead><tbody>' +
      (rows.length ? rows.map(function (l) {
        return '<tr data-lead="' + l.id + '"><td><b>' + l.name + '</b><small>' + l.phone + (l.wa ? ' · on WhatsApp' : '') + '</small></td>' +
          '<td><b>' + l.pkg + '</b><small>' + l.date + '</small></td><td>' + l.pax + '</td><td>' + l.budget + '</td>' +
          '<td><b>' + inr(l.value) + '</b></td><td>' + l.src + '<small>' + l.city + '</small></td>' +
          '<td><span class="pill ' + l.status + '">' + l.status + '</span></td><td class="muted">' + l.when + '</td></tr>';
      }).join('') : '<tr><td colspan="8" style="padding:40px;text-align:center;color:var(--mut)">No leads match that.</td></tr>') + '</tbody>';
  }

  function drawer(id) {
    var l = leads.filter(function (x) { return x.id === id; })[0];
    if (!l) return;
    var kv = function (k, v) { return '<div class="dkv"><span>' + k + '</span><b>' + v + '</b></div>'; };
    $('#drawer').innerHTML =
      '<div class="dh"><div><h3>' + l.name + '</h3><p>' + l.id + ' · received ' + l.when + '</p></div><button id="dX">&times;</button></div>' +
      '<div class="db">' +
        '<div class="dgroup"><h4>Move this along</h4><div class="pipe" id="pipe">' +
          ['New', 'Contacted', 'Quoted', 'Won', 'Lost'].map(function (s) {
            return '<button class="' + (l.status === s ? 'on' : '') + '" data-st="' + s + '">' + s + '</button>'; }).join('') +
        '</div><div class="dactions" style="margin-top:12px">' +
          '<button class="btn btn-sm wa-link">WhatsApp ' + l.name.split(' ')[0] + '</button>' +
          '<button class="btn btn-o btn-sm">Call</button><button class="btn btn-o btn-sm">Send quote</button></div>' +
          '<div class="note">Next follow up: tomorrow 11am. Reminder goes to the owner of this lead.</div>' +
        '</div>' +
        '<div class="dgroup"><h4>The trip</h4>' + kv('Package', l.pkg) + kv('Destination', l.dest) + kv('Travel date', l.date) +
          kv('Travellers', l.pax) + kv('Budget band', l.budget) + kv('Quote value', inr(l.value)) + '</div>' +
        '<div class="dgroup"><h4>Contact</h4>' + kv('Mobile', l.phone) + kv('On WhatsApp', l.wa ? 'Yes' : 'Not checked') +
          kv('Email', l.email) + kv('City', l.city) + '</div>' +
        '<div class="dgroup"><h4>How they found you</h4>' + kv('Source', l.src) + kv('Campaign', l.utm) +
          kv('Device', l.device) + kv('Time on site', l.time) + kv('Pages viewed', String(l.pages)) +
          kv('First page', '/holidays/' + l.dest.toLowerCase()) + kv('Last page', 'enquiry form') + '</div>' +
        '<div class="dgroup"><h4>Owner</h4>' + kv('Assigned to', 'Rushab Shah') + kv('Last touched', l.when) + '</div>' +
      '</div>';
    $('#dMask').classList.add('on');
    $('#dX').onclick = function () { $('#dMask').classList.remove('on'); };
    $$('#pipe button').forEach(function (b) {
      b.onclick = function () {
        l.status = b.getAttribute('data-st');
        $$('#pipe button').forEach(function (x) { x.classList.toggle('on', x === b); });
        leadTable(); overview();
      };
    });
  }

  /* ------------------------------------------------------------- packages */
  function pkgTable() {
    var extra = [{ name: 'Sri Lanka Round Trip', dest: 'Sri Lanka', nights: 6, price: 41500, status: 'draft', views: 0, leads: 0, upd: 'today' },
                 { name: 'Singapore and Malaysia', dest: 'Singapore', nights: 6, price: 68900, status: 'draft', views: 0, leads: 0, upd: 'yesterday' }];
    var rows = PKGS.map(function (p, i) {
      return { name: p.name, dest: p.dest, nights: p.nights, price: p.price, status: 'live',
               views: [1840, 1120, 2210, 1660, 1430, 980, 760, 640][i] || 500,
               leads: [24, 14, 31, 22, 18, 11, 9, 7][i] || 5, upd: ['2 days ago', 'last week', 'yesterday', '3 days ago', 'last week', '2 weeks ago', 'today', 'last month'][i] };
    }).concat(extra).filter(function (r) {
      return !state.pq || (r.name + ' ' + r.dest).toLowerCase().indexOf(state.pq.toLowerCase()) > -1;
    });
    $('#pTable').innerHTML = '<thead><tr><th>Package</th><th>Destination</th><th>Nights</th><th>Price from</th>' +
      '<th>Views, 30 days</th><th>Enquiries</th><th>Status</th><th>Updated</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr data-v="vEdit"><td><b>' + r.name + '</b></td><td>' + r.dest + '</td><td>' + r.nights + 'N</td>' +
          '<td><b>' + inr(r.price) + '</b><small>per person</small></td><td>' + r.views.toLocaleString('en-IN') + '</td>' +
          '<td><b>' + r.leads + '</b></td><td><span class="pill ' + r.status + '">' + (r.status === 'live' ? 'Live' : 'Draft') + '</span></td>' +
          '<td class="muted">' + r.upd + '</td></tr>';
      }).join('') + '</tbody>';
  }

  /* -------------------------------------------------------- package editor */
  var ETABS = ['Overview', 'Hotels', 'Itinerary', 'Sightseeing', 'Inclusions', 'Pricing', 'Gallery', 'SEO'];
  function ef(label, value, type) {
    if (type === 'area') return '<div class="ef"><label>' + label + '</label><textarea>' + value + '</textarea></div>';
    return '<div class="ef"><label>' + label + '</label><input value="' + value + '"></div>';
  }
  function row(title, sub, acts) {
    return '<div class="rowcard"><div class="drag">☰</div><div><b>' + title + '</b><small>' + sub + '</small></div>' +
      '<div class="acts">' + (acts || ['Edit', 'Duplicate', 'Remove']).map(function (a) { return '<button>' + a + '</button>'; }).join('') + '</div></div>';
  }
  function editor() {
    var p = PKGS[0];
    $('#eTabs').innerHTML = ETABS.map(function (t) {
      return '<button class="' + (state.etab === t ? 'on' : '') + '" data-etab="' + t + '">' + t + '</button>'; }).join('');
    var b = '';
    if (state.etab === 'Overview') {
      b = '<p class="hint">These fields fill the top of the package page. Nothing here needs code.</p>' +
        '<div class="erow">' + ef('Package name', p.name) + ef('Destination', p.dest) + '</div>' +
        '<div class="erow">' + ef('Nights', String(p.nights)) + ef('Days', String(p.days)) + '</div>' +
        '<div class="erow">' + ef('Themes', p.theme.join(', ')) + ef('Departs from', p.from.join(', ')) + '</div>' +
        ef('Short description, shown on the card', p.blurb, 'area') +
        '<div class="erow">' + ef('Cities and nights', p.cities.map(function (c) { return '(' + c.nights + 'N) ' + c.name; }).join(', ')) +
        ef('Best months', p.months.join(', ')) + '</div>';
    } else if (state.etab === 'Hotels') {
      b = '<p class="hint">Hotels per city, with the star rating, room type and meal plan the traveller sees before paying.</p>' +
        p.hotels.map(function (h) { return row(h.name + '  ·  ' + h.star + ' star', h.city + ' · ' + h.room + ' · ' + h.meal); }).join('') +
        '<button class="addrow">Add a hotel</button>';
    } else if (state.etab === 'Itinerary') {
      b = '<p class="hint">Drag a day to reorder it. Each day holds its own list of lines, exactly as they appear on the page.</p>' +
        p.itinerary.map(function (d) { return row('Day ' + d.day + ': ' + d.title, d.items.length + ' lines'); }).join('') +
        '<button class="addrow">Add a day</button>';
    } else if (state.etab === 'Sightseeing') {
      b = '<p class="hint">Each place has a photo and a short note. Reuse them across packages instead of retyping.</p>' +
        p.sights.map(function (s) { return row(s.name, s.note.slice(0, 74) + '...'); }).join('') +
        '<button class="addrow">Add a place</button>';
    } else if (state.etab === 'Inclusions') {
      b = '<p class="hint">Four lists, all editable. They print into the package page and into the quote.</p>' +
        '<div class="erow">' + ef('Included', p.inc.join('\n'), 'area') + ef('Not included', p.exc.join('\n'), 'area') + '</div>' +
        '<div class="erow">' + ef('Good to know', p.notes.join('\n'), 'area') + ef('Cancellation policy', p.cancel.join('\n'), 'area') + '</div>' +
        ef('Payment policy', p.pay.join('\n'), 'area');
    } else if (state.etab === 'Pricing') {
      b = '<p class="hint">Price per person, with seasonal rates. The site always shows the rate for the date the traveller picked.</p>' +
        '<div class="erow">' + ef('Base price per person', String(p.price)) + ef('Strike through price', String(p.was)) + '</div>' +
        row('01 Oct 26 to 15 Dec 26', 'Regular season · ' + inr(p.price) + ' per person') +
        row('16 Dec 26 to 05 Jan 27', 'Peak season · ' + inr(p.price + 4500) + ' per person') +
        row('06 Jan 27 to 31 Mar 27', 'Regular season · ' + inr(p.price) + ' per person') +
        '<button class="addrow">Add a date range</button>' +
        '<div class="erow" style="margin-top:16px">' + ef('Child with bed, percent of adult', '70') + ef('Child without bed, percent', '50') + '</div>';
    } else if (state.etab === 'Gallery') {
      b = '<p class="hint">Drag photos to reorder. The first one is the cover everywhere on the site.</p>' +
        '<div class="media">' + new Array(13).join('<div></div>') + '</div>' +
        '<button class="addrow" style="margin-top:14px">Upload photos</button>';
    } else {
      b = '<p class="hint">This is what Google shows, and what gets shared on WhatsApp.</p>' +
        ef('Page title', 'Andaman Package for 3 Nights and 4 Days, from ' + inr(p.price)) +
        ef('Meta description', 'Port Blair and Havelock in 4 days, with hotels, transfers, ferry and Cellular Jail Light and Sound show included. Planned by Rushab Tours.', 'area') +
        '<div class="erow">' + ef('URL slug', 'andaman-3-nights-4-days') + ef('Share image', 'radhanagar-beach.jpg') + '</div>';
    }
    $('#eBody').innerHTML = b;
  }

  /* ---------------------------------------------------------------- other */
  function others() {
    $('#destCards').innerHTML = DESTS.map(function (d, i) {
      return '<div class="dcard"><div class="im" style="background:linear-gradient(135deg,' +
        ['#1d4e89,#0FA3A3', '#0d7377,#14b8a6', '#b45309,#f59e0b', '#7c2d12,#ef4444', '#1e3a8a,#3b82f6', '#065f46,#10b981', '#581c87,#a855f7', '#0c4a6e,#0ea5e9'][i % 8] + ')"></div>' +
        '<div class="bd"><b>' + d.name + '</b><small>' + d.n + ' packages · ' + d.tag + '</small></div></div>';
    }).join('');
    $('#mediaGrid').innerHTML = new Array(25).join('<div></div>');
    $('#tTable').innerHTML = '<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Can do</th><th>Last active</th></tr></thead><tbody>' +
      [['Rushab Shah', 'rushab@rushabtours.com', 'Owner', 'Everything', 'Now'],
       ['Priya Shah', 'priya@rushabtours.com', 'Manager', 'Packages and leads', '20 minutes ago'],
       ['Karan Mehta', 'karan@rushabtours.com', 'Sales', 'Leads only', '2 hours ago'],
       ['Anita Joshi', 'anita@rushabtours.com', 'Content', 'Packages and media', 'Yesterday']]
      .map(function (r) { return '<tr><td><b>' + r[0] + '</b></td><td>' + r[1] + '</td><td><span class="pill">' + r[2] + '</span></td><td>' + r[3] + '</td><td class="muted">' + r[4] + '</td></tr>'; }).join('') + '</tbody>';
  }

  /* --------------------------------------------------------------- events */
  document.addEventListener('click', function (e) {
    var el;
    if (el = e.target.closest('[data-lead]')) { drawer(el.getAttribute('data-lead')); return; }
    if (el = e.target.closest('[data-tab]')) { state.tab = el.getAttribute('data-tab'); leadTable(); return; }
    if (el = e.target.closest('[data-etab]')) { state.etab = el.getAttribute('data-etab'); editor(); return; }
    if (el = e.target.closest('[data-v]')) {
      var v = el.getAttribute('data-v');
      $$('.view').forEach(function (s) { s.classList.toggle('on', s.id === v); });
      $$('.side nav a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-v') === v); });
      window.scrollTo(0, 0);
      return;
    }
    if (e.target.id === 'dMask') $('#dMask').classList.remove('on');
  });
  $('#lq').oninput = function () { state.q = this.value; leadTable(); };
  $('#pq').oninput = function () { state.pq = this.value; pkgTable(); };

  overview(); leadTable(); pkgTable(); editor(); others();
})();
