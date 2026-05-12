// Secondary pages only. This file is not loaded by index.html.
// It keeps all inner pages aligned with the validated home page navigation style.
(function () {
  const root = document.documentElement;
  const body = document.body;
  const supported = ['fr', 'ar', 'zgh'];
  const saved = localStorage.getItem('fosagri-lang');
  let lang = supported.includes(saved) ? saved : 'fr';
  const explicitBase = body?.dataset?.base;
  const isNested = window.location.pathname.includes('/services/');
  const base = typeof explicitBase === 'string' && explicitBase.length ? explicitBase : (isNested ? '../' : '');

  const nav = {
    fr: {
      home: 'Accueil', foundation: 'La Fondation', services: 'Prestations', adhesion: 'Adhésion', mediatheque: 'Médiathèque', news: 'Actualités',
      events: 'Agenda solidaire', contact: 'Contact', member: 'Espace adherent', footerAbout: 'Fondation pour la Promotion des Œuvres Sociales du Personnel du Ministère de l\'Agriculture.',
      usefulTitle: 'Liens utiles', quickTitle: 'Accès rapides', contactTitle: 'Contact', copy: '© FOS-Agri. Tous droits réservés.',
      minister: 'Mot du Ministre', president: 'Mot du Président', history: 'Histoire, mission et valeurs', organization: 'Notre organisation', governance: 'Gouvernance',
      prevoyance: 'Prévoyance médico-sociale', culture: 'Culture, loisirs et voyages', scolarisation: 'Scolarisation et formation', logement: 'Accès au logement', projets: 'Projets personnels', education: 'Éducation et culture',
      adherents: 'Nos adhérents & bénéficiaires', procedure: 'Procédure d’adhésion', cotisations: 'Cotisations',
      media2017: 'Galerie 2017', media2018: 'Galerie 2018', media2019: 'Galerie 2019', media2020: 'Galerie 2020',
      coordinates: 'Coordonnées', regional: 'Relais régionaux', social: 'Réseaux sociaux'
    },
    ar: {
      home: 'الرئيسية', foundation: 'المؤسسة', services: 'الخدمات', adhesion: 'الانخراط', mediatheque: 'الخزانة الرقمية', news: 'المستجدات',
      events: 'الأجندة التضامنية', contact: 'اتصل بنا', member: 'فضاء المنخرط', footerAbout: 'مؤسسة النهوض بالأعمال الاجتماعية لموظفي وزارة الفلاحة.',
      usefulTitle: 'روابط مفيدة', quickTitle: 'ولوج سريع', contactTitle: 'اتصل بنا', copy: '© FOS-Agri. جميع الحقوق محفوظة.',
      minister: 'كلمة الوزير', president: 'كلمة الرئيس', history: 'التاريخ، المهمة والقيم', organization: 'تنظيمنا', governance: 'الحكامة والتنظيم',
      prevoyance: 'الوقاية الطبية الاجتماعية', culture: 'الثقافة والترفيه والأسفار', scolarisation: 'الدراسة والتكوين', logement: 'الولوج إلى السكن', projets: 'المشاريع الشخصية', education: 'التربية والثقافة',
      adherents: 'المنخرطون والمستفيدون', procedure: 'مسطرة الانخراط', cotisations: 'الاشتراكات',
      media2017: 'صور 2017', media2018: 'صور 2018', media2019: 'صور 2019', media2020: 'صور 2020',
      coordinates: 'المعلومات', regional: 'المنسقون الجهويون', social: 'الشبكات الاجتماعية'
    },
    zgh: {
      home: 'ⴰⵙⵏⵓⴱⴳ', foundation: 'ⵜⴰⵎⵙⵙⵓⵔⵜ', services: 'ⵜⵉⵏⴼⴰⵙ', adhesion: 'ⴰⵎⵓⵏ', mediatheque: 'ⵜⴰⵎⵓⵙⵙⵏⴰ', news: 'ⵉⵙⴰⵍⵏ',
      events: 'ⴰⴳⵏⴷⴰ ⵏ ⵜⴰⵏⴼⴰ', contact: 'ⴰⵏⴰⵔⵎⵙ', member: 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵏⵖⵓⵔ', footerAbout: 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⵎⵓⵜⵜⴳⴰ ⵏ ⵉⵣⵎⴰⵣ ⵉⵎⵓⵏⵏ ⵏ ⵉⵎⴰⵍⴰⵙⵏ ⵏ ⵜⴼⵍⴰⵃⵜ.',
      usefulTitle: 'ⵉⵙⵖⵡⴰⵏ ⵉⵏⴼⴰⵏ', quickTitle: 'ⴰⴽⵛⵓⵎ ⴰⵙⵔⵉⴷ', contactTitle: 'ⴰⵏⴰⵔⵎⵙ', copy: '© FOS-Agri. ⴰⴽⴽⵯ ⵉⵣⵔⴼⴰⵏ ⵜⵜⵓⵃⵔⴰⵣⵏ.',
      minister: 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵏⵣⴰⵡ', president: 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ', history: 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵙⵜ ⴷ ⵉⵎⴰⵙⵙⴰⵏ', organization: 'ⵜⴰⵙⵏⵙⵙⵓⴷⵙⵜ ⵏⵏⵖ', governance: 'ⵜⴰⴳⵓⵔⵉ ⴷ ⵜⵎⵙⵙⵓⴷⵙⵜ',
      prevoyance: 'ⵜⴰⴼⵔⴰⵙⵜ ⵜⴰⴷⴰⵡⵙⴰⵏⵜ', culture: 'ⵜⴰⴷⵍⵙⴰ, ⴰⵙⴰⵢⵔⴰⵔ ⴷ ⵉⵙⵉⴽⵍⵏ', scolarisation: 'ⴰⵙⴳⵎⵉ ⴷ ⵜⵙⴳⵎⵉ', logement: 'ⴰⴽⵛⵓⵎ ⵖⵔ ⵜⴰⴷⴷⴰⵔⵜ', projets: 'ⵉⵙⵏⴼⴰⵔⵏ ⵉⵎⴰⵏⴰⵡⵏ', education: 'ⴰⵙⴳⵎⵉ ⴷ ⵜⴷⵍⵙⴰ',
      adherents: 'ⵉⵎⵓⵏⵏ ⴷ ⵉⵎⵙⴼⵔⴽⵏ', procedure: 'ⵜⴰⵎⵙⵙⴰⵔⵜ ⵏ ⵓⵎⵓⵏ', cotisations: 'ⵜⵉⵡⵙⵉⵡⵉⵏ',
      media2017: 'ⵜⴰⵡⵍⴰⴼⵜ 2017', media2018: 'ⵜⴰⵡⵍⴰⴼⵜ 2018', media2019: 'ⵜⴰⵡⵍⴰⴼⵜ 2019', media2020: 'ⵜⴰⵡⵍⴰⴼⵜ 2020',
      coordinates: 'ⵉⵙⴰⵍⵏ', regional: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ', social: 'ⵉⵥⴹⵡⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ'
    }
  };

  function t(key) {
    return nav[lang]?.[key] || nav.fr[key] || '';
  }

  function href(path) {
    return `${base}${path}`;
  }

  function ensureSubmenuCss() {
    if (document.querySelector('link[data-fos-nav-submenu]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href('assets/nav-submenu.css');
    link.dataset.fosNavSubmenu = 'true';
    document.head.appendChild(link);
  }

  function item(activeKey, currentKey, url, labelKey) {
    const active = activeKey === currentKey ? ' class="is-active" aria-current="page"' : '';
    return `<a href="${href(url)}"${active} data-nav-key="${labelKey}">${t(labelKey)}</a>`;
  }

  function submenu(activeKey, currentKey, url, labelKey, entries) {
    const active = activeKey === currentKey ? ' is-active' : '';
    return `
      <div class="nav-item has-submenu${active}">
        <a href="${href(url)}"${active ? ' aria-current="page"' : ''} data-nav-key="${labelKey}">${t(labelKey)}</a>
        <button class="submenu-toggle" type="button" aria-label="${t(labelKey)} submenu" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button>
        <div class="nav-submenu">
          ${entries.map((entry) => `<a href="${href(entry.href)}">${t(entry.key)}</a>`).join('')}
        </div>
      </div>`;
  }

  function renderNavActions() {
    const actions = document.querySelector('.nav-actions');
    if (!actions) return;
    const labelText = lang === 'fr' ? 'FR' : lang === 'ar' ? 'AR' : 'ⵜⵎⵣⵉⵖⵜ';
    actions.innerHTML = `
      <div class="lang-select-wrap desktop-only" id="sec-lang-wrap">
        <button class="lang-select" id="sec-lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false">
          <span id="sec-lang-label">${labelText}</span>
          <i class="fa-solid fa-chevron-down lang-chevron" aria-hidden="true"></i>
        </button>
        <ul class="lang-dropdown-panel" id="sec-lang-panel" role="listbox" aria-label="Langue">
          <li class="lang-dropdown-option${lang === 'fr' ? ' is-selected' : ''}" role="option" data-lang="fr" tabindex="0">FR — Français</li>
          <li class="lang-dropdown-option${lang === 'ar' ? ' is-selected' : ''}" role="option" data-lang="ar" tabindex="0">AR — العربية</li>
          <li class="lang-dropdown-option${lang === 'zgh' ? ' is-selected' : ''}" role="option" data-lang="zgh" tabindex="0">ⵜⵎⵣⵉⵖⵜ</li>
        </ul>
      </div>
      <button class="nav-search-btn" type="button" aria-label="Recherche" title="Recherche" data-header-search="true">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      </button>
      <a class="btn-cta-nav desktop-only" href="${href('espace-adherent.html')}">${t('member')}</a>
    `;
  }

  function initLangDropdown() {
    const wrap = document.getElementById('sec-lang-wrap');
    const btn = document.getElementById('sec-lang-btn');
    const panel = document.getElementById('sec-lang-panel');
    if (!wrap || !btn || !panel) return;

    const openDD = () => { wrap.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
    const closeDD = () => { wrap.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      wrap.classList.contains('is-open') ? closeDD() : openDD();
    });

    panel.querySelectorAll('.lang-dropdown-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        lang = supported.includes(opt.dataset.lang) ? opt.dataset.lang : 'fr';
        localStorage.setItem('fosagri-lang', lang);
        closeDD();
        applyStaticLanguage();
      });
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lang = supported.includes(opt.dataset.lang) ? opt.dataset.lang : 'fr';
          localStorage.setItem('fosagri-lang', lang);
          closeDD();
          applyStaticLanguage();
        } else if (e.key === 'Escape') {
          closeDD(); btn.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (opt.nextElementSibling) opt.nextElementSibling.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (opt.previousElementSibling) opt.previousElementSibling.focus();
        }
      });
    });

    if (!document.__secLangDropBound) {
      document.__secLangDropBound = true;
      document.addEventListener('click', (e) => { if (!document.getElementById('sec-lang-wrap')?.contains(e.target)) closeDD(); });
    }
  }

  function initSearchModal() {
    if (document.getElementById('site-search-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'site-search-modal';
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Recherche');
    modal.hidden = true;
    modal.innerHTML = `
      <div class="search-modal-backdrop"></div>
      <div class="search-modal-box">
        <button class="search-modal-close" type="button" aria-label="Fermer">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <form class="search-modal-form" role="search" onsubmit="return false">
          <i class="fa-solid fa-magnifying-glass search-modal-icon" aria-hidden="true"></i>
          <input id="site-search-input" class="search-modal-input" type="search"
            placeholder="Rechercher sur FOS-Agri..." autocomplete="off" spellcheck="false" />
        </form>
        <p class="search-modal-hint">Echap pour fermer</p>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => { modal.hidden = true; document.body.classList.remove('search-modal-open'); };
    window.__openSearchModal = () => {
      modal.hidden = false;
      document.body.classList.add('search-modal-open');
      setTimeout(() => document.getElementById('site-search-input')?.focus(), 60);
    };

    modal.querySelector('.search-modal-backdrop').addEventListener('click', close);
    modal.querySelector('.search-modal-close').addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });
  }

  function renderNavigation() {
    const menu = document.querySelector('.site-nav');
    if (!menu) return;
    const page = body.dataset.page || '';
    menu.id = menu.id || 'site-nav';
    menu.setAttribute('aria-label', 'Navigation principale');
    menu.innerHTML = `
      ${item(page, 'home', 'index.html', 'home')}
      ${submenu(page, 'fondation', 'fondation.html', 'foundation', [
        { href: 'fondation.html#mot-ministre', key: 'minister' },
        { href: 'fondation.html#mot-president', key: 'president' },
        { href: 'histoire-mission-valeurs.html', key: 'history' },
        { href: 'notre-organisation.html', key: 'organization' },
        { href: 'la-fondation/gouvernance/index.html', key: 'governance' }
      ])}
      ${submenu(page, 'adhesion', 'adhesion.html', 'adhesion', [
        { href: 'adhesion.html#adherents-beneficiaires', key: 'adherents' },
        { href: 'adhesion.html#procedure-adhesion', key: 'procedure' },
        { href: 'adhesion.html#cotisations', key: 'cotisations' }
      ])}
      ${submenu(page, 'prestations', 'prestations.html', 'services', [
        { href: 'services/prevoyance.html', key: 'prevoyance' },
        { href: 'services/culture-loisirs-voyages.html', key: 'culture' },
        { href: 'services/formation-scolarisation.html', key: 'scolarisation' },
        { href: 'services/acces-logement.html', key: 'logement' },
        { href: 'services/projets-personnels.html', key: 'projets' },
        { href: 'services/education-culture.html', key: 'education' }
      ])}
      ${submenu(page, 'mediatheque', 'mediatheque.html', 'mediatheque', [
        { href: 'mediatheque.html#galerie-2017', key: 'media2017' },
        { href: 'mediatheque.html#galerie-2018', key: 'media2018' },
        { href: 'mediatheque.html#galerie-2019', key: 'media2019' },
        { href: 'mediatheque.html#galerie-2020', key: 'media2020' }
      ])}
      ${submenu(page, 'contact', 'contact.html', 'contact', [
        { href: 'contact.html#coordonnees', key: 'coordinates' },
        { href: 'contact.html#relais-regionaux', key: 'regional' },
        { href: 'contact.html#reseaux-sociaux', key: 'social' }
      ])}
      <button class="mobile-search-btn" type="button" data-header-search="true">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Rechercher
      </button>
      <a class="member-link mobile-only btn-cta-nav" href="${href('espace-adherent.html')}" data-nav-key="member">${t('member')}</a>
      <div class="lang-toggle mobile-nav-lang" role="group" aria-label="Choix de langue">
        <button class="lang-btn ${lang === 'fr' ? 'is-active' : ''}" type="button" data-lang="fr">FR</button>
        <button class="lang-btn ${lang === 'ar' ? 'is-active' : ''}" type="button" data-lang="ar">AR</button>
        <button class="lang-btn ${lang === 'zgh' ? 'is-active' : ''}" type="button" data-lang="zgh">ⵜⵎⵣⵉⵖⵜ</button>
      </div>`;
  }

  function renderFooter() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    footer.innerHTML = `
      <div class="container footer-grid" id="footer-links">
        <div>
          <a class="brand footer-brand" href="${href('index.html')}">
            <span class="brand-mark footer-brand-mark"><img src="${href('logo.png')}" alt="Logo FOS-Agri" /></span>
            <span class="brand-copy"><strong>FOS-Agri</strong><small>Ministère de l'agriculture</small></span>
          </a>
          <p class="footer-copy">${t('footerAbout')}</p>
        </div>
        <div>
          <h3>${t('usefulTitle')}</h3>
          <ul class="footer-links">
            <li><a href="${href('actualites.html')}">${t('news')}</a></li>
            <li><a href="${href('agenda-solidaire.html')}">${t('events')}</a></li>
            <li><a href="mailto:fos-agri@fos-agri.ma">fos-agri@fos-agri.ma</a></li>
          </ul>
        </div>
        <div>
          <h3>${t('quickTitle')}</h3>
          <ul class="footer-links">
            <li><a href="${href('fondation.html')}">${t('foundation')}</a></li>
            <li><a href="${href('prestations.html')}">${t('services')}</a></li>
            <li><a href="${href('adhesion.html')}">${t('adhesion')}</a></li>
            <li><a href="${href('mediatheque.html')}">${t('mediatheque')}</a></li>
          </ul>
        </div>
        <div>
          <h3>${t('contactTitle')}</h3>
          <ul class="footer-links">
            <li><a href="mailto:fos-agri@fos-agri.ma">fos-agri@fos-agri.ma</a></li>
            <li><a href="tel:+212537774748">+212 537 77 47 48</a></li>
            <li><a href="${href('contact.html#relais-regionaux')}">${t('regional')}</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <div class="footer-meta"><p>${t('copy')}</p></div>
        <div class="footer-social">
          <a href="https://www.facebook.com/FOS.Agri" target="_blank" class="footer-social-link" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/fos.agri/" target="_blank" class="footer-social-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://www.youtube.com/@FOSAgri" target="_blank" class="footer-social-link" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>`;
  }

  function applyStaticLanguage() {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    body.dataset.lang = lang;
    ensureSubmenuCss();
    renderNavigation();
    renderNavActions();
    renderFooter();

    document.querySelectorAll('[data-static-i18n]').forEach((el) => {
      const key = el.dataset.staticI18n;
      el.textContent = t(key);
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    initLanguage();
    initMenu();
    initSubmenus();
    initLangDropdown();

    /* Cross-script notification: per-page renderers (org chart, history
       timeline, future modules) listen for this and re-render in the new
       language. The <html lang/dir> change also fires a MutationObserver
       fallback. */
    try {
      window.dispatchEvent(new CustomEvent('fosagri:lang-change', { detail: { lang } }));
    } catch (_) { /* old browsers — MutationObserver covers them */ }
  }

  function initLanguage() {
    document.querySelectorAll('.secondary-lang-select').forEach((select) => {
      select.value = lang;
      select.onchange = () => {
        lang = supported.includes(select.value) ? select.value : 'fr';
        localStorage.setItem('fosagri-lang', lang);
        applyStaticLanguage();
      };
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.onclick = () => {
        lang = supported.includes(btn.dataset.lang) ? btn.dataset.lang : 'fr';
        localStorage.setItem('fosagri-lang', lang);
        applyStaticLanguage();
      };
    });
  }

  function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.site-nav');
    if (!toggle || !menu) return;

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      body.classList.remove('menu-open');
    }

    /* toggle.onclick is idempotent — safe to set on every applyStaticLanguage() call */
    toggle.onclick = () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open', !expanded);
      body.classList.toggle('menu-open', !expanded);
    };

    /* Guard: add document + menu listeners only once per page load */
    if (!document.__secMenuOutsideBound) {
      document.__secMenuOutsideBound = true;
      document.addEventListener('click', (e) => {
        if (body.classList.contains('menu-open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
          closeMenu();
        }
      });
    }
    if (!menu.__secMenuLinkBound) {
      menu.__secMenuLinkBound = true;
      menu.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (link) closeMenu();
      });
    }
  }

  function initSubmenus() {
    document.querySelectorAll('.submenu-toggle').forEach((button) => {
      button.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const item = button.closest('.nav-item');
        const isOpen = item?.classList.contains('is-open');
        document.querySelectorAll('.nav-item.is-open').forEach((openItem) => openItem.classList.remove('is-open'));
        document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach((openButton) => openButton.setAttribute('aria-expanded', 'false'));
        if (!isOpen && item) {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
        }
      };
    });

    /* Mobile: first tap on parent label opens submenu, second tap navigates.
       stopPropagation keeps the menu's close-on-link-click handler from firing here. */
    const isMobile = () => window.matchMedia('(max-width: 980px)').matches;
    document.querySelectorAll('.site-nav .has-submenu > a').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (!isMobile()) return;
        const item = link.closest('.nav-item');
        if (!item || item.classList.contains('is-open')) return;
        event.preventDefault();
        event.stopPropagation();
        document.querySelectorAll('.nav-item.is-open').forEach((x) => x.classList.remove('is-open'));
        document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach((x) => x.setAttribute('aria-expanded', 'false'));
        item.classList.add('is-open');
        const togBtn = item.querySelector('.submenu-toggle');
        if (togBtn) togBtn.setAttribute('aria-expanded', 'true');
      });
    });

    /* Guard: add document listener only once per page load */
    if (!document.__secSubmenuOutsideBound) {
      document.__secSubmenuOutsideBound = true;
      document.addEventListener('click', (event) => {
        if (event.target.closest('.nav-item')) return;
        document.querySelectorAll('.nav-item.is-open').forEach((openItem) => openItem.classList.remove('is-open'));
        document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach((openButton) => openButton.setAttribute('aria-expanded', 'false'));
      });
    }
  }

  function initScrollHeader() {
    const header = document.querySelector('.site-header');
    if (!header || header.__scrollInitialized) return;
    header.__scrollInitialized = true;

    const topThreshold = 12;
    const directionThreshold = 6;
    const hideThreshold = 72;
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    let ticking = false;

    const showSolid = () => {
      header.classList.add('is-scrolled');
      header.classList.remove('is-hidden');
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
      header.style.pointerEvents = 'auto';
    };

    const hideHeader = () => {
      header.classList.add('is-hidden', 'is-scrolled');
      header.style.transform = 'translateY(calc(-100% - 0.75rem))';
      header.style.opacity = '0';
      header.style.pointerEvents = 'none';
    };

    const updateHeaderState = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const delta = scrollTop - lastScrollTop;

      if (scrollTop <= topThreshold) {
        header.classList.remove('is-scrolled', 'is-hidden');
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
        lastScrollTop = 0;
        ticking = false;
        return;
      }

      if (delta > directionThreshold && scrollTop > hideThreshold) {
        hideHeader();
      } else if (delta < -directionThreshold) {
        showSolid();
      } else if (!header.classList.contains('is-hidden')) {
        showSolid();
      }

      lastScrollTop = Math.max(0, scrollTop);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeaderState);
    }, { passive: true });

    updateHeaderState();
  }

  function initFloatingSocialButton() {
    if (document.querySelector('.floating-social')) return;
    const socialLinks = Array.from(document.querySelectorAll('.footer-social-link'))
      .filter((l) => l.getAttribute('href') && l.getAttribute('href') !== '#')
      .map((l) => ({ href: l.href, label: l.getAttribute('aria-label') || '', html: l.innerHTML }))
      .filter((l, i, arr) => arr.findIndex((x) => x.href === l.href) === i);
    if (!socialLinks.length) return;

    const host = document.createElement('div');
    host.className = 'floating-social';
    host.innerHTML = `
      <div class="floating-social-links" aria-label="Liens sociaux rapides">
        ${socialLinks.map((l) => `<a class="floating-social-link" href="${l.href}" target="_blank" rel="noopener noreferrer" aria-label="${l.label}">${l.html}</a>`).join('')}
      </div>
      <button class="floating-social-main" type="button" aria-label="Ouvrir les liens sociaux">
        <i class="fa-solid fa-share-nodes"></i>
      </button>
    `;
    document.body.appendChild(host);

    const toggle = host.querySelector('.floating-social-main');
    const close = () => host.classList.remove('is-open');
    toggle.addEventListener('click', (e) => { e.stopPropagation(); host.classList.toggle('is-open'); });
    document.addEventListener('click', (e) => { if (host.classList.contains('is-open') && !host.contains(e.target)) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  applyStaticLanguage();
  initScrollHeader();
  initSearchModal();
  initFloatingSocialButton();
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-header-search]')) {
      e.preventDefault();
      window.__openSearchModal?.();
    }
  });
})();
