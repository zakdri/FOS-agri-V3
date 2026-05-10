// Secondary pages only. This file is not loaded by index.html.
(function () {
  const root = document.documentElement;
  const body = document.body;
  const supported = ['fr', 'ar', 'zgh'];
  const saved = localStorage.getItem('fosagri-lang');
  let lang = supported.includes(saved) ? saved : 'fr';

  const nav = {
    fr: {
      home: 'Accueil', foundation: 'La Fondation', services: 'Prestations', news: 'Actualités',
      events: 'Agenda solidaire', contact: 'Contact', member: 'Espace adherent', footerAbout: 'Fondation pour la Promotion des Œuvres Sociales du Personnel du Ministère de l\'Agriculture.',
      usefulTitle: 'Liens utiles', quickTitle: 'Accès rapides', contactTitle: 'Contact', copy: '© FOS-Agri. Tous droits réservés.'
    },
    ar: {
      home: 'الرئيسية', foundation: 'المؤسسة', services: 'الخدمات', news: 'المستجدات',
      events: 'الأجندة التضامنية', contact: 'اتصل بنا', member: 'فضاء المنخرط', footerAbout: 'مؤسسة النهوض بالأعمال الاجتماعية لموظفي وزارة الفلاحة.',
      usefulTitle: 'روابط مفيدة', quickTitle: 'ولوج سريع', contactTitle: 'اتصل بنا', copy: '© FOS-Agri. جميع الحقوق محفوظة.'
    },
    zgh: {
      home: 'ⴰⵙⵏⵓⴱⴳ', foundation: 'ⵜⴰⵎⵙⵙⵓⵔⵜ', services: 'ⵜⵉⵏⴼⴰⵙ', news: 'ⵉⵙⴰⵍⵏ',
      events: 'ⴰⴳⵏⴷⴰ ⵏ ⵜⴰⵏⴼⴰ', contact: 'ⴰⵏⴰⵔⵎⵙ', member: 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵏⵖⵓⵔ', footerAbout: 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⵎⵓⵜⵜⴳⴰ ⵏ ⵉⵣⵎⴰⵣ ⵉⵎⵓⵏⵏ ⵏ ⵉⵎⴰⵍⴰⵙⵏ ⵏ ⵜⴼⵍⴰⵃⵜ.',
      usefulTitle: 'ⵉⵙⵖⵡⴰⵏ ⵉⵏⴼⴰⵏ', quickTitle: 'ⴰⴽⵛⵓⵎ ⴰⵙⵔⵉⴷ', contactTitle: 'ⴰⵏⴰⵔⵎⵙ', copy: '© FOS-Agri. ⴰⴽⴽⵯ ⵉⵣⵔⴼⴰⵏ ⵜⵜⵓⵃⵔⴰⵣⵏ.'
    }
  };

  function text(key) {
    return nav[lang]?.[key] || nav.fr[key] || '';
  }

  function applyStaticLanguage() {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    body.dataset.lang = lang;

    document.querySelectorAll('[data-static-i18n]').forEach((el) => {
      const key = el.dataset.staticI18n;
      el.textContent = text(key);
    });

    document.querySelectorAll('.secondary-lang-select').forEach((select) => {
      select.value = lang;
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
  }

  function initLanguage() {
    document.querySelectorAll('.secondary-lang-select').forEach((select) => {
      select.value = lang;
      select.addEventListener('change', () => {
        lang = supported.includes(select.value) ? select.value : 'fr';
        localStorage.setItem('fosagri-lang', lang);
        applyStaticLanguage();
      });
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        lang = supported.includes(btn.dataset.lang) ? btn.dataset.lang : 'fr';
        localStorage.setItem('fosagri-lang', lang);
        applyStaticLanguage();
      });
    });
  }

  function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.site-nav');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open', !expanded);
      body.classList.toggle('nav-open', !expanded);
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        body.classList.remove('nav-open');
      });
    });
  }

  applyStaticLanguage();
  initLanguage();
  initMenu();
})();
