/* Homepage header — submenu nav, search, i18n. Does NOT touch hero/slider/video/content. v3 */
(function () {
  'use strict';
  if ((document.body.dataset.page || 'home') !== 'home') return;

  /* ── Translations (FR / AR / ZGH) ──────────────────────────────────────── */
  var T = {
    fr: {
      home: 'Accueil', foundation: 'La Fondation', services: 'Prestations',
      adhesion: 'Adhésion', mediatheque: 'Médiathèque', contact: 'Contact',
      member: 'Espace adhérent', news: 'Actualités', events: 'Agenda solidaire',
      minister: 'Mot du Ministre', president: 'Mot du Président',
      history: 'Histoire, mission et valeurs', values: 'Nos valeurs', organization: 'Notre organisation', governance: 'Gouvernance',
      prevoyance: 'Prévoyance médico-sociale',
      culture: 'Culture, loisirs et voyages', scolarisation: 'Scolarisation et formation',
      logement: 'Accès au logement', projets: 'Projets personnels',
      education: 'Éducation et culture',
      adherents: 'Nos adhérents & bénéficiaires',
      procedure: 'Procédure d’adhésion', cotisations: 'Cotisations',
      media2017: 'Galerie 2017', media2018: 'Galerie 2018',
      media2019: 'Galerie 2019', media2020: 'Galerie 2020',
      coordinates: 'Coordonnées', regional: 'Relais régionaux',
      social: 'Réseaux sociaux', search: 'Rechercher',
      searchPlaceholder: 'Rechercher sur FOS-Agri…',
      searchHint: 'Échap pour fermer',
      searchEmpty: 'Aucun résultat. Essayez un autre mot-clé.',
      searchStart: 'Commencez à taper pour voir les résultats…',
      memberClose: 'Fermer'
    },
    ar: {
      home: 'الرئيسية',
      foundation: 'المؤسسة',
      services: 'الخدمات',
      adhesion: 'الانخراط',
      mediatheque: 'الخزانة الرقمية',
      contact: 'اتصل بنا',
      member: 'فضاء المنخرط',
      minister: 'كلمة الوزير',
      president: 'كلمة الرئيس',
      history: 'التاريخ، المهمة والقيم',
      values: 'قيمنا',
      organization: 'تنظيمنا',
      governance: 'الحكامة والتنظيم',
      prevoyance: 'الوقاية الطبية الاجتماعية',
      culture: 'الثقافة والترفيه والأسفار',
      scolarisation: 'الدراسة والتكوين',
      logement: 'الولوج إلى السكن',
      projets: 'المشاريع الشخصية',
      education: 'التربية والثقافة',
      adherents: 'المنخرطون والمستفيدون',
      procedure: 'مسطرة الانخراط',
      cotisations: 'الاشتراكات',
      media2017: 'صور 2017', media2018: 'صور 2018',
      media2019: 'صور 2019', media2020: 'صور 2020',
      coordinates: 'المعلومات',
      regional: 'المنسقون الجهويون',
      social: 'الشبكات الاجتماعية',
      search: 'بحث',
      news: 'المستجدات', events: 'الأجندة التضامنية',
      searchPlaceholder: 'ابحث في موقع FOS-Agri…',
      searchHint: 'إسكاب للإغلاق',
      searchEmpty: 'لا توجد نتائج. جرّب كلمة أخرى.',
      searchStart: 'ابدأ الكتابة لعرض النتائج…',
      memberClose: 'إغلاق'
    },
    zgh: {
      home: 'ⴰⵙⵏⵓⴱⴳ',
      foundation: 'ⵜⴰⵎⵙⵙⵓⵔⵜ',
      services: 'ⵜⵉⵏⴼⴰⵙ',
      adhesion: 'ⴰⵎⵓⵏ',
      mediatheque: 'ⵜⴰⵎⵓⵙⵙⵏⴰ',
      contact: 'ⴰⵏⴰⵔⵎⵙ',
      member: 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵏⵖⵓⵔ',
      minister: 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵏⵣⴰⵡ',
      president: 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ',
      history: 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵙⵜ ⴷ ⵉⵎⴰⵙⵙⴰⵏ',
      values: 'ⵜⵉⵏⵉⵍⴰ',
      organization: 'ⵜⴰⵙⵏⵙⵙⵓⴷⵙⵜ ⵏⵏⵖ',
      governance: 'ⵜⴰⴳⵓⵔⵉ ⴷ ⵜⵎⵙⵙⵓⴷⵙⵜ',
      prevoyance: 'ⵜⴰⴼⵔⴰⵙⵜ ⵜⴰⴷⴰⵡⵙⴰⵏⵜ',
      culture: 'ⵜⴰⴷⵍⵙⴰ, ⴰⵙⴰⵢⵔⴰⵔ ⴷ ⵉⵙⵉⴽⵍⵏ',
      scolarisation: 'ⴰⵙⴳⵎⵉ ⴷ ⵜⵙⴳⵎⵉ',
      logement: 'ⴰⴽⵛⵓⵎ ⵖⵔ ⵜⴰⴷⴷⴰⵔⵜ',
      projets: 'ⵉⵙⵏⴼⴰⵔⵏ ⵉⵎⴰⵏⴰⵡⵏ',
      education: 'ⴰⵙⴳⵎⵉ ⴷ ⵜⴷⵍⵙⴰ',
      adherents: 'ⵉⵎⵓⵏⵏ ⴷ ⵉⵎⵙⴼⵔⴽⵏ',
      procedure: 'ⵜⴰⵎⵙⵙⴰⵔⵜ ⵏ ⵓⵎⵓⵏ',
      cotisations: 'ⵜⵉⵡⵙⵉⵡⵉⵏ',
      media2017: 'ⵜⴰⵡⵍⴰⴼⵜ 2017',
      media2018: 'ⵜⴰⵡⵍⴰⴼⵜ 2018',
      media2019: 'ⵜⴰⵡⵍⴰⴼⵜ 2019',
      media2020: 'ⵜⴰⵡⵍⴰⴼⵜ 2020',
      coordinates: 'ⵉⵙⴰⵍⵏ',
      regional: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ',
      social: 'ⵉⵥⴹⵡⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ',
      search: 'ⴰⵔⵣⵣⵓ',
      news: 'ⵉⵙⴰⵍⵏ', events: 'ⴰⴳⵏⴷⴰ ⵏ ⵜⴰⵏⴼⴰ',
      searchPlaceholder: 'ⵔⵣⵣⵓ ⴷⴻⴳ FOS-Agri…',
      searchHint: 'ⵙⵏⵙ ⵙ Échap',
      searchEmpty: 'ⵓⵍⴰ ⴰⵔⵔⴰⵙⵎ. ⴰⵔⵎ ⴰⵡⴰⵍ ⵏⵏⵉⴹⵏ.',
      searchStart: 'ⵙⵏⵜⵉ ⴰⴷ ⵜⴻⵜⵉ ⵉ ⵉⴽⴻⴽ ⵉⴰⵔⵎ…',
      memberClose: 'ⵙⵏⵙ'
    }
  };

  /* Site-wide search index — same shape as secondary-pages.js so
     results inside the menu work consistently on the home page. */
  var SEARCH_INDEX = [
    { key: 'home',          url: 'index.html',                            icon: 'fa-house' },
    { key: 'foundation',    url: 'fondation.html',                        icon: 'fa-landmark' },
    { key: 'minister',      url: 'la-fondation/mot-du-ministre/index.html',           icon: 'fa-user-tie' },
    { key: 'president',     url: 'la-fondation/mot-du-president/index.html',          icon: 'fa-user-tie' },
    { key: 'history',       url: 'histoire-mission-valeurs.html',         icon: 'fa-clock-rotate-left' },
    { key: 'values',        url: 'nos-valeurs.html',                      icon: 'fa-gem' },
    { key: 'organization',  url: 'notre-organisation.html',               icon: 'fa-sitemap' },
    { key: 'governance',    url: 'la-fondation/gouvernance/index.html',   icon: 'fa-scale-balanced' },
    { key: 'adhesion',      url: 'adhesion.html',                         icon: 'fa-id-card' },
    { key: 'adherents',     url: 'adhesion.html#adherents-beneficiaires', icon: 'fa-users' },
    { key: 'procedure',     url: 'adhesion.html#procedure-adhesion',      icon: 'fa-file-signature' },
    { key: 'cotisations',   url: 'adhesion.html#cotisations',             icon: 'fa-coins' },
    { key: 'services',      url: 'prestations.html',                      icon: 'fa-hand-holding-heart' },
    { key: 'prevoyance',    url: 'services/prevoyance.html',              icon: 'fa-heart-pulse' },
    { key: 'culture',       url: 'services/culture-loisirs-voyages.html', icon: 'fa-plane' },
    { key: 'scolarisation', url: 'services/formation-scolarisation.html', icon: 'fa-graduation-cap' },
    { key: 'logement',      url: 'services/acces-logement.html',          icon: 'fa-house-chimney' },
    { key: 'projets',       url: 'services/projets-personnels.html',      icon: 'fa-lightbulb' },
    { key: 'education',     url: 'services/education-culture.html',       icon: 'fa-book-open' },
    { key: 'mediatheque',   url: 'mediatheque.html',                      icon: 'fa-photo-film' },
    { key: 'media2017',     url: 'mediatheque.html#galerie-2017',         icon: 'fa-images' },
    { key: 'media2018',     url: 'mediatheque.html#galerie-2018',         icon: 'fa-images' },
    { key: 'media2019',     url: 'mediatheque.html#galerie-2019',         icon: 'fa-images' },
    { key: 'media2020',     url: 'mediatheque.html#galerie-2020',         icon: 'fa-images' },
    { key: 'news',          url: 'actualites.html',                       icon: 'fa-newspaper' },
    { key: 'events',        url: 'agenda-solidaire.html',                 icon: 'fa-calendar-days' },
    { key: 'contact',       url: 'contact.html',                          icon: 'fa-envelope' },
    { key: 'coordinates',   url: 'contact.html#coordonnees',              icon: 'fa-map-location-dot' },
    { key: 'regional',      url: 'contact.html#relais-regionaux',         icon: 'fa-map-pin' },
    { key: 'social',        url: 'contact.html#reseaux-sociaux',          icon: 'fa-share-nodes' },
    { key: 'member',        url: 'espace-adherent.html',                  icon: 'fa-user-shield' }
  ];

  var SEARCH_KEYWORDS = {
    home: 'accueil home fos agri fondation oeuvres sociales ministere agriculture',
    foundation: 'fondation mission valeurs gouvernance histoire organisation ministre president',
    minister: 'ministre mot message institutionnel vision sociale fondation',
    president: 'president mot message gouvernance proximite services fondation',
    history: 'histoire mission valeurs etapes chronologie solidarite proximite equite inclusion fondation',
    values: 'valeurs equite proximite service inclusion solidarite fondation engagements principes',
    organization: 'organisation organigramme structure president secretariat general directions services',
    governance: 'gouvernance comite directeur executif conseil gestion controle instances organigramme',
    adhesion: 'adhesion adherents beneficiaires cotisations procedure documents inscription',
    adherents: 'adherents beneficiaires actifs retraites famille ayants droit',
    procedure: 'procedure adhesion inscription pieces dossier documents formulaire',
    cotisations: 'cotisations contribution paiement adhesion adherent',
    services: 'prestations services sociaux prevoyance logement culture scolarisation projets adhesion',
    prevoyance: 'prevoyance medico sociale medical assurance assistance sante transport sanitaire centre medical',
    culture: 'culture loisirs voyages colonies omra pelerinage ceremonies conventions',
    scolarisation: 'scolarisation formation coaching scolaire bourses excellence rentree education',
    logement: 'logement habitat aide logement credit banque promoteur immobilier',
    projets: 'projets personnels credits sociaux financement partenariat tarifs preferentiels',
    education: 'education culture formation scolarisation enfants ecole',
    mediatheque: 'mediatheque galerie photos videos images media albums',
    media2017: 'galerie 2017 photos images mediatheque',
    media2018: 'galerie 2018 photos images mediatheque',
    media2019: 'galerie 2019 photos images mediatheque',
    media2020: 'galerie 2020 photos images mediatheque',
    news: 'actualites annonces nouvelles communiques conventions campagnes programmes',
    events: 'agenda solidaire calendrier evenements operations campagnes echeances',
    contact: 'contact coordonnees adresse telephone email localisation relais regionaux reseaux sociaux',
    coordinates: 'coordonnees adresse telephone email localisation carte',
    regional: 'relais regionaux regions coordination proximite contact',
    social: 'reseaux sociaux facebook linkedin youtube partage contact',
    member: 'espace adherent portail agent compte services accompagnement suivi'
  };

  function normalize(s) {
    return (s || '').toString().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function getLang() {
    var saved = localStorage.getItem('fosagri-lang') || document.documentElement.lang || 'fr';
    return T[saved] ? saved : 'fr';
  }

  function t(key) {
    var l = getLang();
    return (T[l] && T[l][key]) || T.fr[key] || '';
  }

  function goToSearchPage(query) {
    var q = (query || '').trim();
    window.location.href = 'search.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  }

  /* ── CSS ────────────────────────────────────────────────────────────────── */
  function injectCss() {
    if (document.querySelector('link[data-home-nav-submenu]')) return;
    var lk = document.createElement('link');
    lk.rel = 'stylesheet'; lk.href = 'assets/nav-submenu.css';
    lk.setAttribute('data-home-nav-submenu', 'true');
    document.head.appendChild(lk);
  }

  /* ── Nav HTML ───────────────────────────────────────────────────────────── */
  function navLink(key, href, active) {
    return '<a href="' + href + '"' + (active ? ' class="is-active" aria-current="page"' : '') + '>' + t(key) + '</a>';
  }

  function submenu(key, href, entries) {
    return '<div class="nav-item has-submenu">' +
      '<a href="' + href + '">' + t(key) + '</a>' +
      '<button class="submenu-toggle" type="button" aria-expanded="false">' +
        '<i class="fa-solid fa-chevron-down"></i>' +
      '</button>' +
      '<div class="nav-submenu">' +
        entries.map(function (e) { return '<a href="' + e.href + '">' + t(e.key) + '</a>'; }).join('') +
      '</div>' +
    '</div>';
  }

  /* ── Render nav ─────────────────────────────────────────────────────────── */
  function renderNav() {
    injectCss();
    var menu = document.querySelector('.site-nav');
    if (!menu) return;

    var l = getLang();
    menu.innerHTML = [
      navLink('home', 'index.html', true),
      submenu('foundation', 'fondation.html', [
        { href: 'la-fondation/mot-du-ministre/index.html',        key: 'minister' },
        { href: 'la-fondation/mot-du-president/index.html',       key: 'president' },
        { href: 'histoire-mission-valeurs.html',      key: 'history' },
        { href: 'notre-organisation.html',            key: 'organization' },
        { href: 'la-fondation/gouvernance/index.html', key: 'governance' }
      ]),
      submenu('adhesion', 'adhesion.html', [
        { href: 'adhesion.html#adherents-beneficiaires', key: 'adherents' },
        { href: 'adhesion.html#procedure-adhesion',   key: 'procedure' },
        { href: 'adhesion.html#cotisations',          key: 'cotisations' }
      ]),
      submenu('services', 'prestations.html', [
        { href: 'services/prevoyance.html',           key: 'prevoyance' },
        { href: 'services/culture-loisirs-voyages.html', key: 'culture' },
        { href: 'services/formation-scolarisation.html', key: 'scolarisation' },
        { href: 'services/acces-logement.html',       key: 'logement' },
        { href: 'services/projets-personnels.html',   key: 'projets' },
        { href: 'services/education-culture.html',    key: 'education' }
      ]),
      submenu('mediatheque', 'mediatheque.html', [
        { href: 'mediatheque.html#galerie-2017', key: 'media2017' },
        { href: 'mediatheque.html#galerie-2018', key: 'media2018' },
        { href: 'mediatheque.html#galerie-2019', key: 'media2019' },
        { href: 'mediatheque.html#galerie-2020', key: 'media2020' }
      ]),
      submenu('contact', 'contact.html', [
        { href: 'contact.html#coordonnees',       key: 'coordinates' },
        { href: 'contact.html#relais-regionaux',  key: 'regional' },
        { href: 'contact.html#reseaux-sociaux',   key: 'social' }
      ]),
      /* Mobile-only items */
      '<button class="mobile-search-btn" type="button" data-header-search="true">' +
        '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> ' + t('search') +
      '</button>',
      '<a class="member-link mobile-only btn-cta-nav" href="#member-space">' + t('member') + '</a>',
      '<div class="lang-toggle mobile-nav-lang" role="group" aria-label="Choix de langue">' +
        '<button class="lang-btn' + (l === 'fr' ? ' is-active' : '') + '" type="button" data-lang="fr">FR</button>' +
        '<button class="lang-btn' + (l === 'ar' ? ' is-active' : '') + '" type="button" data-lang="ar">AR</button>' +
        '<button class="lang-btn' + (l === 'zgh' ? ' is-active' : '') + '" type="button" data-lang="zgh">Amazigh</button>' +
      '</div>'
    ].join('');

    bindNav(menu);
    ensureDesktopSearchBtn();
    bindSearchTriggers();
    refreshSearchModalChrome();
  }

  /* ── Bind interactions ──────────────────────────────────────────────────── */
  function bindNav(menu) {
    var toggle = document.querySelector('.menu-toggle');

    /* Burger toggle
     * app.js registers addEventListener('click') BEFORE this file loads (app.js runs first).
     * We must NOT add another onclick — it would read the already-flipped aria-expanded
     * and cancel app.js's state change (classic double-toggle = no-op).
     *
     * Instead we add a SECOND addEventListener here. Listeners fire in registration order,
     * so app.js fires first and sets aria-expanded to the correct new value. Our listener
     * then reads that already-correct value and just ensures the DOM matches — no conflict.
     * If app.js somehow fails, we fall back to toggling ourselves.
     */
    if (toggle && !toggle.__homeBurgerBound) {
      toggle.__homeBurgerBound = true;

      toggle.addEventListener('click', function () {
        /* app.js has already updated aria-expanded. Read it and sync DOM. */
        var open = toggle.getAttribute('aria-expanded') === 'true';
        /* Safety: if DOM is already in sync (app.js ran), these are no-ops. */
        menu.classList.toggle('is-open', open);
        document.body.classList.toggle('menu-open', open);
      });

      /* Close drawer on nav-link click OR on in-menu search-button
         click. The search button is a <button>, not an <a>, so it
         needs its own selector. */
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a[href]') || e.target.closest('[data-header-search]')) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('is-open');
          document.body.classList.remove('menu-open');
        }
      });
    }

    /* Submenus — chevron toggle */
    menu.querySelectorAll('.submenu-toggle').forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = btn.closest('.nav-item');
        var isOpen = item && item.classList.contains('is-open');
        menu.querySelectorAll('.nav-item.is-open').forEach(function (x) { x.classList.remove('is-open'); });
        menu.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
        if (!isOpen && item) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
      };
    });

    /* Mobile: first tap on the parent label opens the submenu, second tap navigates.
       stopPropagation prevents the "close drawer on link click" handler from firing. */
    var isMobile = function () { return window.matchMedia('(max-width: 980px)').matches; };
    menu.querySelectorAll('.has-submenu > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (!isMobile()) return;
        var item = link.closest('.nav-item');
        if (!item || item.classList.contains('is-open')) return; /* already open → allow nav */
        e.preventDefault();
        e.stopPropagation();
        menu.querySelectorAll('.nav-item.is-open').forEach(function (x) { x.classList.remove('is-open'); });
        menu.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
        item.classList.add('is-open');
        var togBtn = item.querySelector('.submenu-toggle');
        if (togBtn) togBtn.setAttribute('aria-expanded', 'true');
      });
    });

    /* Language buttons in mobile drawer */
    menu.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.onclick = function () {
        var newLang = btn.dataset.lang || 'fr';
        localStorage.setItem('fosagri-lang', newLang);
        /* Sync with app.js translation engine (translates [data-i18n] page content) */
        if (typeof window.setLanguage === 'function') {
          window.setLanguage(newLang);
          /* app.js setLanguage() updates root.lang → our MutationObserver calls renderNav() */
        } else {
          /* app.js not available — update root.lang ourselves to trigger observer */
          document.documentElement.lang = newLang;
        }
      };
    });
  }

  /* Desktop: a single round search-icon button sits in .nav-actions
     next to the language dropdown. Mobile: hidden by CSS — search
     lives inside the opened menu instead. */
  function ensureDesktopSearchBtn() {
    var actions = document.querySelector('.nav-actions');
    if (!actions) return;
    /* Remove any older duplicates first so we keep exactly one */
    actions.querySelectorAll('.nav-search-btn, [data-header-search]').forEach(function (el) { el.remove(); });
    var btn = document.createElement('button');
    btn.className = 'nav-search-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', t('search') || 'Recherche');
    btn.setAttribute('data-header-search', 'true');
    btn.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>';
    var langWrap = actions.querySelector('.lang-select-wrap');
    if (langWrap && langWrap.nextSibling) actions.insertBefore(btn, langWrap.nextSibling);
    else actions.appendChild(btn);
  }

  function bindSearchTriggers() {
    document.querySelectorAll('.nav-search-btn, .mobile-search-btn[data-header-search]').forEach(function (button) {
      button.onclick = function (e) {
        e.preventDefault();
        if (window.__openSearchModal) window.__openSearchModal();
      };
    });
  }

  /* ── Search modal with live results ─────────────────────────────────────── */
  function initSearchModal() {
    if (document.getElementById('site-search-modal')) return;
    var modal = document.createElement('div');
    modal.id = 'site-search-modal';
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', t('search') || 'Recherche');
    modal.hidden = true;
    modal.innerHTML =
      '<div class="search-modal-backdrop"></div>' +
      '<div class="search-modal-box">' +
        '<button class="search-modal-close" type="button" aria-label="' + t('memberClose') + '">' +
          '<i class="fa-solid fa-xmark"></i>' +
        '</button>' +
        '<form class="search-modal-form" role="search">' +
          '<button class="search-modal-submit" type="submit" aria-label="' + t('search') + '">' +
            '<i class="fa-solid fa-magnifying-glass search-modal-icon" aria-hidden="true"></i>' +
          '</button>' +
          '<input id="site-search-input" class="search-modal-input" type="search"' +
          ' placeholder="' + t('searchPlaceholder') + '" autocomplete="off" spellcheck="false" />' +
        '</form>' +
        '<div class="search-results" id="site-search-results" aria-live="polite">' +
          '<p class="search-results-empty" data-state="initial">' + t('searchStart') + '</p>' +
        '</div>' +
        '<p class="search-modal-hint">' + t('searchHint') + '</p>' +
      '</div>';
    document.body.appendChild(modal);

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove('search-modal-open');
    }
    window.__openSearchModal = function () {
      modal.hidden = false;
      document.body.classList.add('search-modal-open');
      setTimeout(function () {
        var inp = document.getElementById('site-search-input');
        if (inp) inp.focus();
      }, 60);
    };
    modal.querySelector('.search-modal-backdrop').addEventListener('click', closeModal);
    modal.querySelector('.search-modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
    var input = modal.querySelector('#site-search-input');
    modal.querySelector('.search-modal-form').addEventListener('submit', function (e) {
      e.preventDefault();
      goToSearchPage(input.value);
    });
    input.addEventListener('input', function () { renderSearchResults(input.value); });
  }

  function refreshSearchModalChrome() {
    var modal = document.getElementById('site-search-modal');
    if (!modal) return;
    modal.setAttribute('aria-label', t('search') || 'Recherche');
    var input = modal.querySelector('.search-modal-input');
    if (input) input.placeholder = t('searchPlaceholder');
    var closeBtn = modal.querySelector('.search-modal-close');
    if (closeBtn) closeBtn.setAttribute('aria-label', t('memberClose'));
    var submitBtn = modal.querySelector('.search-modal-submit');
    if (submitBtn) submitBtn.setAttribute('aria-label', t('search'));
    var hint = modal.querySelector('.search-modal-hint');
    if (hint) hint.textContent = t('searchHint');
    if (input) renderSearchResults(input.value);
  }

  function renderSearchResults(query) {
    var box = document.getElementById('site-search-results');
    if (!box) return;
    var q = normalize(query).trim();
    if (!q) {
      box.innerHTML = '<p class="search-results-empty" data-state="initial">' + t('searchStart') + '</p>';
      return;
    }
    var hits = SEARCH_INDEX
      .map(function (entry) { return { entry: entry, label: t(entry.key) || entry.key }; })
      .filter(function (h) {
        var text = normalize([h.label, h.entry.key, h.entry.url, SEARCH_KEYWORDS[h.entry.key] || ''].join(' '));
        return text.indexOf(q) !== -1;
      });
    if (!hits.length) {
      box.innerHTML = '<p class="search-results-empty" data-state="empty">' + t('searchEmpty') + '</p>';
      return;
    }
    box.innerHTML = hits.map(function (h) {
      return '<a class="search-result-item" href="' + h.entry.url + '">' +
        '<span class="search-result-icon"><i class="fa-solid ' + h.entry.icon + '" aria-hidden="true"></i></span>' +
        '<span class="search-result-text">' + h.label + '</span>' +
        '<i class="fa-solid fa-arrow-right search-result-arrow" aria-hidden="true"></i>' +
      '</a>';
    }).join('');
  }

  /* ── Language sync with app.js ──────────────────────────────────────────── */
  /* When app.js's desktop dropdown changes language, it updates root.lang.
     We watch that attribute and re-render the nav with the new language. */
  function watchLangAttr() {
    if (typeof MutationObserver === 'undefined') return;
    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'lang') renderNav();
      });
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  /* ── Boot ───────────────────────────────────────────────────────────────── */
  function boot() {
    renderNav();
    initSearchModal();
    watchLangAttr();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());


