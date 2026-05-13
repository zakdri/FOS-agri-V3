(function () {
  'use strict';

  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  const I18N = {
    fr: {
      'president.pageTitle': 'Mot du Président',
      'president.hero.kicker': 'Message institutionnel',
      'president.hero.intro': 'Une vision de proximité et de modernisation pour la Fondation.',
      'president.breadcrumb.label': "Fil d'Ariane",
      'president.breadcrumb.home': 'Accueil',
      'president.breadcrumb.foundation': 'La Fondation',
      'president.breadcrumb.page': 'Mot du Président',
      'president.name': 'M. Adil EL OUFIR',
      'president.position': 'Président de la FOS-Agri',
      'president.imageAlt': 'M. Adil EL OUFIR, Président de la FOS-Agri',
      'president.message.paragraph1': 'Depuis sa création, la FOS-Agri œuvre pour renforcer l’accompagnement social des adhérents du secteur agricole et de leurs familles. Notre Fondation place l’humain au cœur de son action, en développant des prestations adaptées, accessibles et porteuses de valeur pour l’ensemble de ses bénéficiaires.',
      'president.message.paragraph2': 'Notre ambition est de consolider une Fondation moderne, proche de ses adhérents et attentive à l’évolution de leurs besoins. À travers la diversification de nos services, le renforcement de nos partenariats et l’amélioration continue de nos dispositifs d’appui, nous poursuivons notre engagement en faveur de la solidarité, de la proximité et de la qualité.',
      'president.message.paragraph3': 'La gouvernance responsable, la transparence et l’écoute constituent les fondements de notre démarche. Ensemble, avec l’ensemble des équipes et partenaires de la FOS-Agri, nous continuerons à bâtir une institution performante, innovante et pleinement engagée au service de la famille agricole.',
      'president.signature.label': 'Signature',
      'president.signature.name': 'M. Adil EL OUFIR',
      'president.signature.position': 'Président de la FOS-Agri',
      'president.seo.title': 'FOS-Agri | Mot du Président',
      'president.seo.description': 'Mot du Président de la FOS-Agri sur la mission sociale de la Fondation.'
    },
    ar: {
      'president.pageTitle': 'كلمة الرئيس',
      'president.hero.kicker': 'رسالة مؤسساتية',
      'president.hero.intro': 'رؤية قائمة على القرب والتحديث لخدمة المؤسسة.',
      'president.breadcrumb.label': 'مسار التصفح',
      'president.breadcrumb.home': 'الرئيسية',
      'president.breadcrumb.foundation': 'المؤسسة',
      'president.breadcrumb.page': 'كلمة الرئيس',
      'president.name': 'عادل الوفير',
      'president.position': 'رئيس مؤسسة FOS-Agri',
      'president.imageAlt': 'السيد عادل الوفير، رئيس مؤسسة FOS-Agri',
      'president.message.paragraph1': 'منذ تأسيسها، تعمل FOS-Agri على تعزيز المواكبة الاجتماعية لمنخرطي القطاع الفلاحي وأسرهم. وتضع مؤسستنا الإنسان في صلب عملها عبر تطوير خدمات ملائمة وميسرة وذات قيمة لفائدة جميع المستفيدين.',
      'president.message.paragraph2': 'طموحنا هو ترسيخ مؤسسة حديثة، قريبة من منخرطيها، ومنصتة لتطور احتياجاتهم. ومن خلال تنويع خدماتنا، وتعزيز شراكاتنا، والتحسين المستمر لآليات الدعم، نواصل التزامنا بقيم التضامن والقرب والجودة.',
      'president.message.paragraph3': 'تشكل الحكامة المسؤولة والشفافية والإنصات أسس مقاربتنا. ومعاً، إلى جانب فرق العمل وشركاء FOS-Agri، سنواصل بناء مؤسسة فعالة ومبتكرة ومنخرطة بالكامل في خدمة الأسرة الفلاحية.',
      'president.signature.label': 'التوقيع',
      'president.signature.name': 'عادل الوفير',
      'president.signature.position': 'رئيس مؤسسة FOS-Agri',
      'president.seo.title': 'FOS-Agri | كلمة الرئيس',
      'president.seo.description': 'كلمة رئيس مؤسسة FOS-Agri حول رسالتها الاجتماعية.'
    },
    zgh: {
      'president.pageTitle': 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ',
      'president.hero.kicker': 'ⵜⴰⴱⵔⴰⵜ ⵜⴰⵎⴰⵙⵙⵓⴷⵙⵜ',
      'president.hero.intro': 'ⵜⴰⵎⵓⵖⵍⵉ ⵏ ⵜⴰⵎⴰⵣⵓⵏⵜ ⴷ ⵓⵙⵏⵓⵔⵣ ⵉ ⵜⴰⵙⵓⴷⴰⵙⵜ.',
      'president.breadcrumb.label': 'ⴰⴱⵔⵉⴷ ⵏ ⵓⵙⵏⵉⴼⵍ',
      'president.breadcrumb.home': 'ⴰⵙⵏⵓⴱⴳ',
      'president.breadcrumb.foundation': 'ⵜⴰⵙⵓⴷⴰⵙⵜ',
      'president.breadcrumb.page': 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ',
      'president.name': 'M. Adil EL OUFIR',
      'president.position': 'Aselway n FOS-Agri',
      'president.imageAlt': 'M. Adil EL OUFIR, Aselway n FOS-Agri',
      'president.message.paragraph1': 'ⵙⴳ ⵓⵙⵏⵓⵍⴼⵓⵢ-ⵉⵙ, FOS-Agri ⵜⴻⵜⵜⵡⴰⵛⵛⴰⵔ ⵉ ⵓⵙⴼⴻⵔⴽ ⵏ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⵏⵎⴻⵜⵜⵉⵜ ⵉ ⵉⵎⵓⵏⵏ ⵏ ⵓⵇⵟⴰⵄ ⴰⴼⴻⵍⵍⴰⵃⵉ ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ-ⵏⵙⴻⵏ. ⵜⴰⵙⵓⴷⴰⵙⵜ-ⵏⵏⴻⵖ ⵜⴻⵜⵙⵙⴻⵏⵙⵉ ⴰⵎⴷⴰⵏ ⴷⴻⴳ ⵓⵍ ⵏ ⵜⵉⴳⴰⵡⵜ-ⵏⵏⴻⵖ.',
      'president.message.paragraph2': 'ⵜⴰⵎⵉⵏⵜ-ⵏⵏⴻⵖ ⴷ ⴰⵙⴻⵙⴱⴻⴷ ⵏ ⵜⴰⵙⵓⴷⴰⵙⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ, ⵢⴻⵇⵇⵉⵎⴻⵏ ⵉ ⵉⵎⵓⵏⵏ-ⵉⵙ, ⴷ ⵜⴻⵜⵜⵙⴻⴼⵍⵉ ⵉ ⵓⵙⵏⵔⵏⵉ ⵏ ⵢⵉⵙⵔⴰ-ⵏⵙⴻⵏ. ⵙ ⵓⵙⵏⵉⴼ ⵏ ⵉⵎⴻⵣⵍⴰ ⴷ ⵓⵙⴼⵔⴰⴳ ⵏ ⵓⵎⴻⵏⴷⴰⵡⴰⵔ, ⵏⴻⵜⵜⴻⴷⴷⵓ ⵖⴼ ⵜⵉⴳⵉⵡⵉⵏ ⵏ ⵜⵎⵓⴷⴻⵎⵜ ⴷ ⵍⵇⵡⴰⵍⵉⵜⵢⵜ.',
      'president.message.paragraph3': 'ⵜⴰⴳⵓⵔⵉ ⵜⴰⵎⴰⵙⵙⵓⵍⵜ, ⵜⴰⴼⴰⵜ ⴷ ⵜⵉⵙⴻⴼⵍⵉ ⴷ ⴰⵙⵙⴰⵙ ⵏ ⵓⴱⵔⵉⴷ-ⵏⵏⴻⵖ. ⵙ ⵢⵉⵡⴻⵏ, ⴰⴽⴻⴷ ⵉⵇⵇⵉⵎⴻⵏ ⴷ ⵉⵎⴻⵏⴷⴰⵡⴰⵔⴻⵏ n FOS-Agri, ⵏⴻⵜⵜⵇⵇⵉⵎ ⴷⴻⴳ ⵓⵙⴱⴻⴷ ⵏ ⵜⴰⵙⵓⴷⴰⵙⵜ ⵜⵓⵙⵍⵉⴷⵜ ⴷ ⵜⴰⵎⴰⵢⵏⵓⵜ.',
      'president.signature.label': 'ⴰⵙⵉⴳⵏⴰ',
      'president.signature.name': 'M. Adil EL OUFIR',
      'president.signature.position': 'Aselway n FOS-Agri',
      'president.seo.title': 'FOS-Agri | ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ',
      'president.seo.description': 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ n FOS-Agri ɣef ⵜⵉⵎⵉⵙⵙⵉⵓⵏⵜ ⵜⴰⵏⵎⴻⵜⵜⵉⵜ.'
    }
  };

  const DEFAULT_DATA = {
    id: 'president-message',
    isActive: true,
    image: '../../assets/images/president.jpg',
    nameKey: 'president.name',
    positionKey: 'president.position',
    imageAltKey: 'president.imageAlt',
    messageKeys: [
      'president.message.paragraph1',
      'president.message.paragraph2',
      'president.message.paragraph3'
    ],
    signatureLabelKey: 'president.signature.label',
    signatureNameKey: 'president.signature.name',
    signaturePositionKey: 'president.signature.position'
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

  async function loadPresidentData() {
    // Future dashboard/API hook:
    // const response = await fetch('/api/foundation/president-message');
    // return await response.json();
    if (window.FOSAGRI_PRESIDENT_MESSAGE && typeof window.FOSAGRI_PRESIDENT_MESSAGE === 'object') {
      return window.FOSAGRI_PRESIDENT_MESSAGE;
    }
    return DEFAULT_DATA;
  }

  function applyStaticText(lang) {
    document.title = t('president.seo.title', lang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('president.seo.description', lang));

    document.querySelectorAll('[data-president-i18n]').forEach(function (el) {
      el.textContent = t(el.dataset.presidentI18n, lang);
    });
    document.querySelectorAll('[data-president-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.dataset.presidentI18nAria, lang));
    });
  }

  function renderState(root, key, lang) {
    root.innerHTML = '<div class="president-state">' + escapeHtml(t(key, lang)) + '</div>';
  }

  function renderMessage(root, data, lang) {
    if (!data || data.isActive === false) {
      renderState(root, 'president.hero.intro', lang);
      return;
    }

    const messageHtml = (data.messageKeys || [])
      .map(function (key) { return '<p>' + escapeHtml(t(key, lang)) + '</p>'; })
      .join('');

    root.dataset.state = 'ready';
    root.innerHTML = '' +
      '<div class="president-grid">' +
        '<div class="president-media">' +
          '<div class="president-portrait-wrap">' +
            '<img class="president-portrait" src="' + escapeHtml(data.image || '../../assets/images/president.jpg') + '" alt="' + escapeHtml(t(data.imageAltKey || 'president.imageAlt', lang)) + '" loading="eager" decoding="async" />' +
          '</div>' +
        '</div>' +
        '<div class="president-content">' +
          '<h2 class="president-name" id="president-message-title">' + escapeHtml(t(data.nameKey || 'president.name', lang)) + '</h2>' +
          '<p class="president-position">' + escapeHtml(t(data.positionKey || 'president.position', lang)) + '</p>' +
          '<div class="president-divider" aria-hidden="true"></div>' +
          '<div class="president-message">' + messageHtml + '</div>' +
          '<footer class="president-signature">' +
            '<p class="president-signature-label">' + escapeHtml(t(data.signatureLabelKey || 'president.signature.label', lang)) + '</p>' +
            '<p class="president-signature-name">' + escapeHtml(t(data.signatureNameKey || 'president.signature.name', lang)) + '</p>' +
            '<p class="president-signature-position">' + escapeHtml(t(data.signaturePositionKey || 'president.signature.position', lang)) + '</p>' +
          '</footer>' +
        '</div>' +
      '</div>';
  }

  let cachedData = null;

  async function init() {
    const root = document.getElementById('president-message-root');
    if (!root) return;

    try {
      cachedData = await loadPresidentData();
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
