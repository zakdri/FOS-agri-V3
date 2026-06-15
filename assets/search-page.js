(function () {
  'use strict';

  const supported = ['fr', 'ar', 'zgh'];
  const stored = localStorage.getItem('fosagri-lang');
  let lang = supported.includes(stored) ? stored : (supported.includes(document.documentElement.lang) ? document.documentElement.lang : 'fr');

  const labels = {
    fr: {
      'search.kicker': 'Recherche',
      'search.title': 'Résultats de recherche',
      'search.body': 'Trouvez toutes les pages du site liées au même mot-clé.',
      'search.inputLabel': 'Mot-clé',
      'search.button': 'Rechercher',
      'search.placeholder': 'Rechercher sur FOS-Agri…',
      'search.emptyStart': 'Saisissez un mot-clé pour afficher les résultats.',
      'search.empty': 'Aucune page ne correspond à ce mot-clé.',
      'search.count': 'résultat(s) trouvé(s)',
      'search.for': 'pour',
      home: 'Accueil', foundation: 'La Fondation', minister: 'Mot du Ministre', president: 'Mot du Président',
      history: 'Histoire, mission et valeurs', values: 'Nos valeurs', organization: 'Notre organisation',
      governance: 'Gouvernance', adhesion: 'Adhésion', adherents: 'Adhérents et bénéficiaires',
      procedure: "Procédure d'adhésion", cotisations: 'Cotisations', services: 'Prestations',
      prevoyance: 'Prévoyance médico-sociale', culture: 'Culture, loisirs et voyages',
      scolarisation: 'Scolarisation et formation', logement: 'Accès au logement',
      projets: 'Projets personnels', education: 'Éducation et culture', mediatheque: 'Médiathèque',
      media2017: 'Galerie 2017', media2018: 'Galerie 2018', media2019: 'Galerie 2019', media2020: 'Galerie 2020',
      news: 'Actualités', events: 'Agenda solidaire', contact: 'Contact', coordinates: 'Coordonnées',
      regional: 'Relais régionaux', social: 'Réseaux sociaux', member: 'Espace adhérent'
    },
    ar: {
      'search.kicker': 'بحث',
      'search.title': 'نتائج البحث',
      'search.body': 'اعثر على جميع صفحات الموقع المرتبطة بنفس الكلمة المفتاحية.',
      'search.inputLabel': 'كلمة مفتاحية',
      'search.button': 'بحث',
      'search.placeholder': 'ابحث في موقع FOS-Agri…',
      'search.emptyStart': 'أدخل كلمة مفتاحية لعرض النتائج.',
      'search.empty': 'لا توجد صفحات مطابقة لهذه الكلمة.',
      'search.count': 'نتيجة',
      'search.for': 'عن',
      home: 'الرئيسية', foundation: 'المؤسسة', minister: 'كلمة الوزير', president: 'كلمة الرئيس',
      history: 'التاريخ، المهمة والقيم', values: 'قيمنا', organization: 'تنظيمنا',
      governance: 'الحكامة', adhesion: 'الانخراط', adherents: 'المنخرطون والمستفيدون',
      procedure: 'مسطرة الانخراط', cotisations: 'الاشتراكات', services: 'الخدمات',
      prevoyance: 'الاحتياط الطبي والاجتماعي', culture: 'الثقافة والترفيه والأسفار',
      scolarisation: 'التمدرس والتكوين', logement: 'الولوج إلى السكن',
      projets: 'المشاريع الشخصية', education: 'التربية والثقافة', mediatheque: 'الوسائط',
      media2017: 'معرض 2017', media2018: 'معرض 2018', media2019: 'معرض 2019', media2020: 'معرض 2020',
      news: 'المستجدات', events: 'الأجندة التضامنية', contact: 'اتصل بنا', coordinates: 'الإحداثيات',
      regional: 'المنسقون الجهويون', social: 'الشبكات الاجتماعية', member: 'فضاء المنخرط'
    },
    zgh: {
      'search.kicker': 'ⴰⵔⵣⵣⵓ',
      'search.title': 'ⵉⵔⵔⴰⵙⵏ ⵏ ⵓⵔⵣⵣⵓ',
      'search.body': 'ⴰⴼ ⵎⴻⵔⵔⴰ ⵜⵉⵙⵏⴰⵡⵉⵏ ⵉ ⵉⵍⴰⵏ ⴰⵡⴰⵍ ⴰⵎⵇⵇⵔⴰⵏ.',
      'search.inputLabel': 'ⴰⵡⴰⵍ',
      'search.button': 'ⴰⵔⵣⵣⵓ',
      'search.placeholder': 'ⵔⵣⵣⵓ ⴷⴻⴳ FOS-Agri…',
      'search.emptyStart': 'ⴰⵔⵓ ⴰⵡⴰⵍ ⵉ ⵓⵙⴽⵏ ⵏ ⵉⵔⵔⴰⵙⵏ.',
      'search.empty': 'ⵓⵍⴰ ⵜⴰⵙⵏⴰ ⵉⵎⵙⴰⵙⴰⵏ ⴷ ⵓⵡⴰⵍ.',
      'search.count': 'ⵉⵔⵔⴰⵙⵏ',
      'search.for': 'ⵉ',
      home: 'ⴰⵙⵏⵓⴱⴳ', foundation: 'ⵜⴰⵎⵙⵙⵓⵔⵜ', minister: 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵉⵏⵉⵙⵜⵔ',
      president: 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵍⵉⵙ', history: 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵙⵜ ⴷ ⵜⵉⵏⵉⵍⴰ',
      values: 'ⵜⵉⵏⵉⵍⴰ', organization: 'ⵜⴰⵙⵓⴷⴷⵙⵜ', governance: 'ⵜⴰⴳⵓⵔⵉ',
      adhesion: 'ⴰⵏⵎⵓⵏ', adherents: 'ⵉⵎⵓⵏⵏ ⴷ ⵉⵎⵙⵜⴼⴰⴷⵏ', procedure: 'ⵜⴰⵎⵓⵙⵙⵓⵜ ⵏ ⵓⵏⵎⵓⵏ',
      cotisations: 'ⵜⵉⵙⵓⵜⵔⴰ', services: 'ⵜⵉⵏⴼⴰ', prevoyance: 'ⴰⵏⴰⵎⵎⴰⵍ ⴰⴷⴰⵡⵙⴰⵏ',
      culture: 'ⵜⴰⴷⵍⵙⴰ ⴷ ⵉⵎⵙⵓⴷⴰ', scolarisation: 'ⴰⵙⵍⵎⴷ ⴷ ⵓⵙⴼⵙⵔ',
      logement: 'ⴰⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⴷⵓⵔ', projets: 'ⵉⵎⵙⵏⴼⴰⵔⵏ ⵉⵏⴰⵎⵓⵏⵏ',
      education: 'ⴰⵙⵍⵎⴷ ⴷ ⵜⴰⴷⵍⵙⴰ', mediatheque: 'ⵜⴰⵎⴷⵢⴰⵜⵉⴽ', media2017: 'ⵜⴰⴳⴰⵍⵉⵔⵉⵜ 2017',
      media2018: 'ⵜⴰⴳⴰⵍⵉⵔⵉⵜ 2018', media2019: 'ⵜⴰⴳⴰⵍⵉⵔⵉⵜ 2019', media2020: 'ⵜⴰⴳⴰⵍⵉⵔⵉⵜ 2020',
      news: 'ⵉⵙⴰⵍⵏ', events: 'ⴰⴳⴻⵏⴷⴰ', contact: 'ⴰⵎⵢⴰⵡⴰⴹ', coordinates: 'ⵉⵙⴰⵍⵏ ⵏ ⵓⵎⵢⴰⵡⴰⴹ',
      regional: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ', social: 'ⵉⵥⴹⵡⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ', member: 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵓⵏ'
    }
  };

  const SEARCH_INDEX = [
    { key: 'home', url: 'index.html', icon: 'fa-house' },
    { key: 'foundation', url: 'fondation.html', icon: 'fa-landmark' },
    { key: 'minister', url: 'la-fondation/mot-du-ministre/index.html', icon: 'fa-user-tie' },
    { key: 'president', url: 'la-fondation/mot-du-president/index.html', icon: 'fa-user-tie' },
    { key: 'history', url: 'histoire-mission-valeurs.html', icon: 'fa-clock-rotate-left' },
    { key: 'values', url: 'nos-valeurs.html', icon: 'fa-gem' },
    { key: 'organization', url: 'notre-organisation.html', icon: 'fa-sitemap' },
    { key: 'governance', url: 'la-fondation/gouvernance/index.html', icon: 'fa-scale-balanced' },
    { key: 'adhesion', url: 'adhesion.html', icon: 'fa-id-card' },
    { key: 'adherents', url: 'adhesion.html#adherents-beneficiaires', icon: 'fa-users' },
    { key: 'procedure', url: 'adhesion.html#procedure-adhesion', icon: 'fa-file-signature' },
    { key: 'cotisations', url: 'adhesion.html#cotisations', icon: 'fa-coins' },
    { key: 'services', url: 'prestations.html', icon: 'fa-hand-holding-heart' },
    { key: 'prevoyance', url: 'services/prevoyance.html', icon: 'fa-heart-pulse' },
    { key: 'culture', url: 'services/culture-loisirs-voyages.html', icon: 'fa-plane' },
    { key: 'scolarisation', url: 'services/formation-scolarisation.html', icon: 'fa-graduation-cap' },
    { key: 'logement', url: 'services/acces-logement.html', icon: 'fa-house-chimney' },
    { key: 'projets', url: 'services/projets-personnels.html', icon: 'fa-lightbulb' },
    { key: 'education', url: 'services/education-culture.html', icon: 'fa-book-open' },
    { key: 'mediatheque', url: 'mediatheque.html', icon: 'fa-photo-film' },
    { key: 'media2017', url: 'mediatheque.html#galerie-2017', icon: 'fa-images' },
    { key: 'media2018', url: 'mediatheque.html#galerie-2018', icon: 'fa-images' },
    { key: 'media2019', url: 'mediatheque.html#galerie-2019', icon: 'fa-images' },
    { key: 'media2020', url: 'mediatheque.html#galerie-2020', icon: 'fa-images' },
    { key: 'news', url: 'actualites.html', icon: 'fa-newspaper' },
    { key: 'events', url: 'agenda-solidaire.html', icon: 'fa-calendar-days' },
    { key: 'contact', url: 'contact.html', icon: 'fa-envelope' },
    { key: 'coordinates', url: 'contact.html#coordonnees', icon: 'fa-map-location-dot' },
    { key: 'regional', url: 'contact.html#relais-regionaux', icon: 'fa-map-pin' },
    { key: 'social', url: 'contact.html#reseaux-sociaux', icon: 'fa-share-nodes' },
    { key: 'member', url: 'espace-adherent.html', icon: 'fa-user-shield' }
  ];

  const SEARCH_KEYWORDS = {
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
    news: 'actualites annonces nouvelles communiques conventions campagnes programmes blog article articles',
    events: 'agenda solidaire calendrier evenements operations campagnes echeances',
    contact: 'contact coordonnees adresse telephone email localisation relais regionaux reseaux sociaux',
    coordinates: 'coordonnees adresse telephone email localisation carte',
    regional: 'relais regionaux regions coordination proximite contact',
    social: 'reseaux sociaux facebook linkedin youtube partage contact',
    member: 'espace adherent portail agent compte services accompagnement suivi'
  };

  function t(key) {
    return labels[lang]?.[key] || labels.fr[key] || key;
  }

  function normalize(value) {
    return (value || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function searchText(entry) {
    return normalize([t(entry.key), entry.key, entry.url, SEARCH_KEYWORDS[entry.key] || ''].join(' '));
  }

  function currentQuery() {
    return new URLSearchParams(window.location.search).get('q') || '';
  }

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-search-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.searchI18n);
    });
    const input = document.getElementById('search-page-input');
    if (input) {
      input.placeholder = t('search.placeholder');
      input.setAttribute('aria-label', t('search.inputLabel'));
    }
  }

  function render() {
    applyLanguage();

    const input = document.getElementById('search-page-input');
    const summary = document.getElementById('search-page-summary');
    const results = document.getElementById('search-page-results');
    const query = currentQuery().trim();
    input.value = query;

    const q = normalize(query);
    if (!q) {
      summary.textContent = '';
      results.innerHTML = `<div class="search-page-empty">${t('search.emptyStart')}</div>`;
      return;
    }

    const hits = SEARCH_INDEX.filter((entry) => searchText(entry).includes(q));
    summary.textContent = `${hits.length} ${t('search.count')} ${t('search.for')} "${query}"`;

    if (!hits.length) {
      results.innerHTML = `<div class="search-page-empty">${t('search.empty')}</div>`;
      return;
    }

    results.innerHTML = hits.map((entry) => `
      <a class="search-page-result" href="${entry.url}">
        <span class="search-page-result-icon"><i class="fa-solid ${entry.icon}" aria-hidden="true"></i></span>
        <span>
          <h2>${t(entry.key)}</h2>
          <p>${entry.url}</p>
        </span>
        <i class="fa-solid fa-arrow-right search-page-result-arrow" aria-hidden="true"></i>
      </a>
    `).join('');
  }

  function init() {
    const form = document.getElementById('search-page-form');
    const input = document.getElementById('search-page-input');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = input.value.trim();
      window.location.href = `search.html${query ? `?q=${encodeURIComponent(query)}` : ''}`;
    });

    render();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'lang')) {
        const next = document.documentElement.lang;
        if (supported.includes(next) && next !== lang) {
          lang = next;
          localStorage.setItem('fosagri-lang', lang);
          render();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
