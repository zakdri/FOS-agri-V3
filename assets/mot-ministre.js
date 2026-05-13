(function () {
  'use strict';

  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  const I18N = {
    fr: {
      'minister.pageTitle': 'Mot du Ministre',
      'minister.hero.kicker': 'Message institutionnel',
      'minister.hero.intro': "Un message de vision et d'engagement au service de la famille agricole.",
      'minister.breadcrumb.label': "Fil d'Ariane",
      'minister.breadcrumb.home': 'Accueil',
      'minister.breadcrumb.foundation': 'La Fondation',
      'minister.breadcrumb.page': 'Mot du Ministre',
      'minister.name': 'M. Ahmed EL BOUARI',
      'minister.position': "Ministre de l'Agriculture, de la Pêche Maritime, du Développement Rural et des Eaux et Forêts",
      'minister.message.paragraph1': "Depuis sa création, la FOS-Agri s'inscrit dans une dynamique d'accompagnement social durable au service des femmes et des hommes du secteur agricole. Elle traduit l'engagement constant du Ministère de l'Agriculture, de la Pêche Maritime, du Développement Rural et des Eaux et Forêts en faveur de l'amélioration des conditions sociales de ses adhérents et de leurs familles.",
      'minister.message.paragraph2': "À travers ses prestations, ses dispositifs d'appui et ses partenariats, la Fondation contribue à renforcer la solidarité, la proximité et la qualité des services rendus aux adhérents. Notre ambition est de poursuivre cette dynamique en développant des solutions innovantes, accessibles et adaptées aux besoins réels de nos bénéficiaires.",
      'minister.message.paragraph3': "La bonne gouvernance, la transparence, l'écoute et l'amélioration continue demeurent au cœur de notre action. Ensemble, nous œuvrons pour une Fondation moderne, performante et pleinement engagée au service de la famille agricole.",
      'minister.signature.label': 'Signature',
      'minister.signature.name': 'M. Ahmed EL BOUARI',
      'minister.signature.position': "Ministre de l'Agriculture, de la Pêche Maritime, du Développement Rural et des Eaux et Forêts",
      'minister.image.alt': "Portrait de M. Ahmed EL BOUARI, Ministre de l'Agriculture",
      'minister.seo.title': 'FOS-Agri | Mot du Ministre',
      'minister.seo.description': "Mot du Ministre de l'Agriculture sur la mission sociale de la Fondation FOS-Agri."
    },
    ar: {
      'minister.pageTitle': 'كلمة الوزير',
      'minister.hero.kicker': 'رسالة مؤسساتية',
      'minister.hero.intro': 'رسالة رؤية والتزام في خدمة الأسرة الفلاحية.',
      'minister.breadcrumb.label': 'مسار التصفح',
      'minister.breadcrumb.home': 'الرئيسية',
      'minister.breadcrumb.foundation': 'المؤسسة',
      'minister.breadcrumb.page': 'كلمة الوزير',
      'minister.name': 'أحمد البواري',
      'minister.position': 'وزير الفلاحة والصيد البحري والتنمية القروية والمياه والغابات',
      'minister.message.paragraph1': 'منذ تأسيسها، تندرج FOS-Agri ضمن دينامية مواكبة اجتماعية مستدامة في خدمة نساء ورجال القطاع الفلاحي. وهي تجسد الالتزام المتواصل لوزارة الفلاحة والصيد البحري والتنمية القروية والمياه والغابات من أجل تحسين الأوضاع الاجتماعية لمنخرطيها وأسرهم.',
      'minister.message.paragraph2': 'ومن خلال خدماتها وآليات الدعم والشراكات، تساهم المؤسسة في تعزيز التضامن والقرب وجودة الخدمات المقدمة للمنخرطين. وطموحنا هو مواصلة هذه الدينامية عبر تطوير حلول مبتكرة وميسرة وملائمة للاحتياجات الفعلية للمستفيدين.',
      'minister.message.paragraph3': 'تظل الحكامة الجيدة والشفافية والإنصات والتحسين المستمر في صلب عملنا. ومعاً نعمل من أجل مؤسسة حديثة وفعالة ومنخرطة بالكامل في خدمة الأسرة الفلاحية.',
      'minister.signature.label': 'التوقيع',
      'minister.signature.name': 'أحمد البواري',
      'minister.signature.position': 'وزير الفلاحة والصيد البحري والتنمية القروية والمياه والغابات',
      'minister.image.alt': 'صورة السيد أحمد البواري وزير الفلاحة',
      'minister.seo.title': 'FOS-Agri | كلمة الوزير',
      'minister.seo.description': 'كلمة الوزير حول الرسالة الاجتماعية لمؤسسة FOS-Agri.'
    },
    zgh: {
      'minister.pageTitle': 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵏⵣⴰⵡ',
      'minister.hero.kicker': 'ⵜⴰⴱⵔⴰⵜ ⵜⴰⵎⴰⵙⵙⵓⴷⵙⵜ',
      'minister.hero.intro': 'ⵉⵣⵏ ⵏ ⵜⵎⵓⵖⵍⵉ ⴷ ⵓⵎⵓⵔⵙ ⵉ ⵜⵡⴰⵛⵓⵍⵜ ⵜⴰⴼⵍⴰⵃⵜ.',
      'minister.breadcrumb.label': 'ⴰⴱⵔⵉⴷ ⵏ ⵓⵙⵏⵉⴼⵍ',
      'minister.breadcrumb.home': 'ⴰⵙⵏⵓⴱⴳ',
      'minister.breadcrumb.foundation': 'ⵜⴰⵙⵓⴷⴰⵙⵜ',
      'minister.breadcrumb.page': 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵏⵣⴰⵡ',
      'minister.name': 'M. Ahmed EL BOUARI',
      'minister.position': 'Amasay n Tflah t Bher t Tnmi n Udrar d Waman d Ixfawn',
      'minister.message.paragraph1': 'ⵙⴳ ⵓⵙⵏⵓⵍⴼⵓⵢ-ⵉⵙ, FOS-Agri ⵜⴻⵜⵜⴻⴷⴷⵓ ⴷⴻⴳ ⵓⵎⴻⵛⵡⴰⵔ ⵏ ⵓⵎⴷⵉⵇ ⵏ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⵏⵎⴻⵜⵜⵉⵜ ⵜⴰⵎⴻⵣⴷⴰⵢⵜ ⵉ ⵜⵍⴰⵡⵉⵏ ⴷ ⵉⵔⴳⴰⵣⴻⵏ ⵏ ⵓⵇⵟⴰⴻ ⴰⴼⴻⵍⵍⴰⵃⵉ.',
      'minister.message.paragraph2': 'ⵙ ⵍⵎⴷⴷ ⵏ ⵉⵎⴻⵣⵍⴰ, ⵉⵙⴻⵏⴼⴰⵔⴻⵏ ⵏ ⵜⴰⵍⵍⴰⵍⵜ ⴷ ⵓⵎⴻⵏⴷⴰⵡⴰⵔ, ⵜⴰⵙⴷⴰⵡⵉⵜ ⵜⴻⵜⵜⴻⵄⴰⵡⴰⵏ ⵉ ⵓⵙⴻⵎⵊⴻⴷ ⵏ ⵜⵎⵓⴷⴻⵎⵜ, ⵜⴰⵎⴰⵣⵓⵏⵜ ⴷ ⵜⵇⵡⴰⵍⵉⵜⵢⵜ ⵏ ⵉⵎⴻⵣⵍⴰ.',
      'minister.message.paragraph3': 'ⵜⴰⴳⵓⵔⵉ ⵉⴼⴰⵣⴻⵏ, ⵜⴰⴼⴰⵜ, ⴰⵙⴼⵍⵉ ⴷ ⵓⵙⵏⴻⵔⵏⵉ ⴰⵎⴻⵖⵍⴰⵍ ⵇⵇⵉⵎⴻⵏ ⴷⴻⴳ ⵓⵍ ⵏ ⵜⵉⴳⴰⵡⵜ-ⵏⵏⴻⵖ.',
      'minister.signature.label': 'ⴰⵙⵉⴳⵏⴰ',
      'minister.signature.name': 'M. Ahmed EL BOUARI',
      'minister.signature.position': 'Amasay n Tflah t Bher t Tnmi n Udrar d Waman d Ixfawn',
      'minister.image.alt': 'Tawlaft n M. Ahmed EL BOUARI',
      'minister.seo.title': 'FOS-Agri | ⴰⵡⴰⵍ ⵏ ⵓⵎⵏⵣⴰⵡ',
      'minister.seo.description': 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵏⵣⴰⵡ ⵖⴼ ⵜⵎⵉⵙⵙⵉⵓⵏⵜ ⵜⴰⵏⵎⴻⵜⵜⵉⵜ ⵏ FOS-Agri.'
    }
  };

  const DEFAULT_DATA = {
    id: 'minister-message',
    isActive: true,
    image: '../../bouari.png',
    nameKey: 'minister.name',
    positionKey: 'minister.position',
    messageKeys: [
      'minister.message.paragraph1',
      'minister.message.paragraph2',
      'minister.message.paragraph3'
    ],
    signatureLabelKey: 'minister.signature.label',
    signatureNameKey: 'minister.signature.name',
    signaturePositionKey: 'minister.signature.position',
    imageAltKey: 'minister.image.alt'
  };

  function currentLang() {
    const htmlLang = document.documentElement.lang;
    if (SUPPORTED.includes(htmlLang)) return htmlLang;
    const stored = localStorage.getItem('fosagri-lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  function t(key, lang) {
    const l = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
    return (I18N[l] && I18N[l][key]) || I18N[DEFAULT_LANG][key] || key;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function loadMinisterData() {
    // Future dashboard/API hook:
    // const response = await fetch('/api/foundation/minister-message');
    // return await response.json();
    if (window.FOSAGRI_MINISTER_MESSAGE && typeof window.FOSAGRI_MINISTER_MESSAGE === 'object') {
      return window.FOSAGRI_MINISTER_MESSAGE;
    }
    return DEFAULT_DATA;
  }

  function applyStaticText(lang) {
    document.title = t('minister.seo.title', lang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('minister.seo.description', lang));

    document.querySelectorAll('[data-minister-i18n]').forEach(function (el) {
      el.textContent = t(el.dataset.ministerI18n, lang);
    });
    document.querySelectorAll('[data-minister-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.dataset.ministerI18nAria, lang));
    });
  }

  function renderState(root, key, lang) {
    root.innerHTML = '<div class="minister-state">' + escapeHtml(t(key, lang)) + '</div>';
  }

  function renderMessage(root, data, lang) {
    if (!data || data.isActive === false) {
      renderState(root, 'minister.hero.intro', lang);
      return;
    }

    const messageHtml = (data.messageKeys || [])
      .map(function (key) { return '<p>' + escapeHtml(t(key, lang)) + '</p>'; })
      .join('');

    root.dataset.state = 'ready';
    root.innerHTML = '' +
      '<div class="minister-grid">' +
        '<div class="minister-media">' +
          '<div class="minister-portrait-wrap">' +
            '<img class="minister-portrait" src="' + escapeHtml(data.image || '../../bouari.png') + '" alt="' + escapeHtml(t(data.imageAltKey || 'minister.image.alt', lang)) + '" loading="eager" decoding="async" />' +
          '</div>' +
        '</div>' +
        '<div class="minister-content">' +
          '<h2 class="minister-name" id="minister-message-title">' + escapeHtml(t(data.nameKey || 'minister.name', lang)) + '</h2>' +
          '<p class="minister-position">' + escapeHtml(t(data.positionKey || 'minister.position', lang)) + '</p>' +
          '<div class="minister-divider" aria-hidden="true"></div>' +
          '<div class="minister-message">' + messageHtml + '</div>' +
          '<footer class="minister-signature">' +
            '<p class="minister-signature-label">' + escapeHtml(t(data.signatureLabelKey || 'minister.signature.label', lang)) + '</p>' +
            '<p class="minister-signature-name">' + escapeHtml(t(data.signatureNameKey || 'minister.signature.name', lang)) + '</p>' +
            '<p class="minister-signature-position">' + escapeHtml(t(data.signaturePositionKey || 'minister.signature.position', lang)) + '</p>' +
          '</footer>' +
        '</div>' +
      '</div>';
  }

  let cachedData = null;

  async function init() {
    const root = document.getElementById('minister-message-root');
    if (!root) return;

    try {
      cachedData = await loadMinisterData();
    } catch (_) {
      cachedData = DEFAULT_DATA;
    }

    const lang = currentLang();
    applyStaticText(lang);
    renderMessage(root, cachedData, lang);

    const observer = new MutationObserver(function (mutations) {
      for (let i = 0; i < mutations.length; i += 1) {
        if (mutations[i].type === 'attributes' &&
          (mutations[i].attributeName === 'lang' || mutations[i].attributeName === 'dir')) {
          const nextLang = currentLang();
          applyStaticText(nextLang);
          renderMessage(root, cachedData, nextLang);
          break;
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
