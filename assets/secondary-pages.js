// Secondary pages only. This file is not loaded by index.html.
// It keeps all inner pages aligned with the validated home page navigation style.
(function () {
  const root = document.documentElement;
  const body = document.body;
  const supported = ['fr', 'ar', 'zgh'];
  const saved = localStorage.getItem('fosagri-lang');
  let lang = supported.includes(saved) ? saved : 'fr';
  const isNested = window.location.pathname.includes('/services/');
  const base = isNested ? '../' : '';

  const nav = {
    fr: {
      home: 'Accueil', foundation: 'La Fondation', services: 'Prestations', adhesion: 'Adhésion', mediatheque: 'Médiathèque', news: 'Actualités',
      events: 'Agenda solidaire', contact: 'Contact', member: 'Espace adherent', footerAbout: 'Fondation pour la Promotion des Œuvres Sociales du Personnel du Ministère de l\'Agriculture.',
      usefulTitle: 'Liens utiles', quickTitle: 'Accès rapides', contactTitle: 'Contact', copy: '© FOS-Agri. Tous droits réservés.',
      minister: 'Mot du Ministre', president: 'Mot du Président', history: 'Histoire, mission et valeurs', governance: 'Gouvernance',
      prevoyance: 'Prévoyance médico-sociale', culture: 'Culture, loisirs et voyages', scolarisation: 'Scolarisation et formation', logement: 'Accès au logement', projets: 'Projets personnels', education: 'Éducation et culture',
      adherents: 'Nos adhérents & bénéficiaires', procedure: 'Procédure d’adhésion', cotisations: 'Cotisations',
      media2017: 'Galerie 2017', media2018: 'Galerie 2018', media2019: 'Galerie 2019', media2020: 'Galerie 2020',
      coordinates: 'Coordonnées', regional: 'Relais régionaux', social: 'Réseaux sociaux'
    },
    ar: {
      home: 'الرئيسية', foundation: 'المؤسسة', services: 'الخدمات', adhesion: 'الانخراط', mediatheque: 'الخزانة الرقمية', news: 'المستجدات',
      events: 'الأجندة التضامنية', contact: 'اتصل بنا', member: 'فضاء المنخرط', footerAbout: 'مؤسسة النهوض بالأعمال الاجتماعية لموظفي وزارة الفلاحة.',
      usefulTitle: 'روابط مفيدة', quickTitle: 'ولوج سريع', contactTitle: 'اتصل بنا', copy: '© FOS-Agri. جميع الحقوق محفوظة.',
      minister: 'كلمة الوزير', president: 'كلمة الرئيس', history: 'التاريخ، المهمة والقيم', governance: 'الحكامة والتنظيم',
      prevoyance: 'الوقاية الطبية الاجتماعية', culture: 'الثقافة والترفيه والأسفار', scolarisation: 'الدراسة والتكوين', logement: 'الولوج إلى السكن', projets: 'المشاريع الشخصية', education: 'التربية والثقافة',
      adherents: 'المنخرطون والمستفيدون', procedure: 'مسطرة الانخراط', cotisations: 'الاشتراكات',
      media2017: 'صور 2017', media2018: 'صور 2018', media2019: 'صور 2019', media2020: 'صور 2020',
      coordinates: 'المعلومات', regional: 'المنسقون الجهويون', social: 'الشبكات الاجتماعية'
    },
    zgh: {
      home: 'ⴰⵙⵏⵓⴱⴳ', foundation: 'ⵜⴰⵎⵙⵙⵓⵔⵜ', services: 'ⵜⵉⵏⴼⴰⵙ', adhesion: 'ⴰⵎⵓⵏ', mediatheque: 'ⵜⴰⵎⵓⵙⵙⵏⴰ', news: 'ⵉⵙⴰⵍⵏ',
      events: 'ⴰⴳⵏⴷⴰ ⵏ ⵜⴰⵏⴼⴰ', contact: 'ⴰⵏⴰⵔⵎⵙ', member: 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵏⵖⵓⵔ', footerAbout: 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⵎⵓⵜⵜⴳⴰ ⵏ ⵉⵣⵎⴰⵣ ⵉⵎⵓⵏⵏ ⵏ ⵉⵎⴰⵍⴰⵙⵏ ⵏ ⵜⴼⵍⴰⵃⵜ.',
      usefulTitle: 'ⵉⵙⵖⵡⴰⵏ ⵉⵏⴼⴰⵏ', quickTitle: 'ⴰⴽⵛⵓⵎ ⴰⵙⵔⵉⴷ', contactTitle: 'ⴰⵏⴰⵔⵎⵙ', copy: '© FOS-Agri. ⴰⴽⴽⵯ ⵉⵣⵔⴼⴰⵏ ⵜⵜⵓⵃⵔⴰⵣⵏ.',
      minister: 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵏⵣⴰⵡ', president: 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ', history: 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵙⵜ ⴷ ⵉⵎⴰⵙⵙⴰⵏ', governance: 'ⵜⴰⴳⵓⵔⵉ ⴷ ⵜⵎⵙⵙⵓⴷⵙⵜ',
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

  function ensureSearchAction() {
    const actions = document.querySelector('.nav-actions');
    if (!actions || actions.querySelector('[data-header-search]')) return;
    const link = document.createElement('a');
    link.className = 'member-link desktop-only';
    link.href = href('index.html#search');
    link.setAttribute('aria-label', 'Recherche');
    link.setAttribute('title', 'Recherche');
    link.dataset.headerSearch = 'true';
    link.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>';
    const langWrap = actions.querySelector('.lang-select-wrap');
    if (langWrap && langWrap.nextSibling) actions.insertBefore(link, langWrap.nextSibling);
    else actions.appendChild(link);
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
        { href: 'fondation.html#histoire-mission-valeurs', key: 'history' },
        { href: 'fondation.html#gouvernance', key: 'governance' }
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
    ensureSearchAction();
    renderFooter();

    document.querySelectorAll('[data-static-i18n]').forEach((el) => {
      const key = el.dataset.staticI18n;
      el.textContent = t(key);
    });

    document.querySelectorAll('.secondary-lang-select').forEach((select) => {
      select.value = lang;
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    initLanguage();
    initMenu();
    initSubmenus();
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

    toggle.onclick = () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open', !expanded);
      body.classList.toggle('nav-open', !expanded);
    };
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

    document.addEventListener('click', (event) => {
      if (event.target.closest('.nav-item')) return;
      document.querySelectorAll('.nav-item.is-open').forEach((openItem) => openItem.classList.remove('is-open'));
      document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach((openButton) => openButton.setAttribute('aria-expanded', 'false'));
    });
  }

  applyStaticLanguage();
})();
