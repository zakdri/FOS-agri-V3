(function () {
  'use strict';

  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  function currentLang() {
    const htmlLang = document.documentElement.lang;
    if (SUPPORTED.includes(htmlLang)) return htmlLang;
    const stored = localStorage.getItem('fosagri-lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  const I18N = {
    fr: {
      title: 'FOS-Agri | La Fondation',
      description: "Découvrez la Fondation FOS-Agri, sa mission sociale, ses valeurs, son histoire, son organisation et sa gouvernance.",
      'hero.kicker': 'Fondation pour la Promotion des Œuvres Sociales',
      'hero.title': 'Une Fondation proche des agents du secteur agricole',
      'hero.body': "FOS-Agri accompagne les adhérents, les retraités et leurs familles à travers une action sociale structurée, solidaire et orientée vers le service.",
      'hero.primary': 'Découvrir notre mission',
      'hero.secondary': "Voir l'organisation",
      'intro.tag': 'Rôle institutionnel',
      'intro.title': 'Un cadre social au service de la famille agricole',
      'intro.body': "La Fondation organise et développe des prestations sociales au profit du personnel du Ministère de l'Agriculture et des organismes concernés. Son action s'appuie sur la proximité, l'écoute, la qualité de service et une gouvernance claire.",
      'highlight.solidarity.title': 'Solidarité',
      'highlight.solidarity.body': 'Soutenir les adhérents et leurs familles dans les moments importants de leur parcours.',
      'highlight.proximity.title': 'Proximité',
      'highlight.proximity.body': "Faciliter l'accès à l'information, aux prestations et aux relais de terrain.",
      'highlight.governance.title': 'Transparence',
      'highlight.governance.body': 'Structurer les décisions, les responsabilités et le suivi des actions sociales.',
      'path.tag': 'Comprendre la Fondation',
      'path.title': 'Les rubriques institutionnelles',
      'path.body': "Accédez aux messages officiels, à l'histoire, à l'organisation et aux instances de gouvernance de FOS-Agri.",
      'cards.minister.title': 'Mot du Ministre',
      'cards.minister.body': "La vision institutionnelle portée par le Ministère pour renforcer l'action sociale au profit des agents.",
      'cards.minister.link': 'Lire le mot du Ministre',
      'cards.president.title': 'Mot du Président',
      'cards.president.body': "Un message sur la proximité, la modernisation des services et l'engagement envers les adhérents.",
      'cards.president.link': 'Lire le mot du Président',
      'cards.history.title': 'Histoire, mission et valeurs',
      'cards.history.body': "Les étapes clés de FOS-Agri, sa mission sociale et les valeurs qui orientent son action quotidienne.",
      'cards.history.link': "Explorer l'histoire et les valeurs",
      'cards.organization.title': 'Notre organisation',
      'cards.organization.body': 'La structure opérationnelle de la Fondation, ses directions, ses services et ses responsabilités.',
      'cards.organization.link': "Voir l'organigramme",
      'cards.governance.title': 'Gouvernance',
      'cards.governance.body': 'Les instances de pilotage, les comités et les règles qui encadrent le fonctionnement de la Fondation.',
      'cards.governance.link': 'Découvrir la gouvernance',
      'band.title': 'Une Fondation lisible, proche et utile',
      'band.body': "Cette rubrique rassemble les informations institutionnelles essentielles avant d'accéder aux prestations, à l'adhésion ou aux contacts utiles.",
      'band.cta': 'Voir les prestations'
    },

    ar: {
      title: 'FOS-Agri | المؤسسة',
      description: 'تعرفوا على مؤسسة FOS-Agri، مهمتها الاجتماعية، قيمها، تاريخها، تنظيمها وحكامتها.',
      'hero.kicker': 'مؤسسة النهوض بالأعمال الاجتماعية',
      'hero.title': 'مؤسسة قريبة من نساء ورجال القطاع الفلاحي',
      'hero.body': 'تواكب FOS-Agri المنخرطين والمتقاعدين وأسرهم عبر عمل اجتماعي منظم، تضامني وموجه نحو جودة الخدمة.',
      'hero.primary': 'اكتشاف مهمتنا',
      'hero.secondary': 'عرض التنظيم',
      'intro.tag': 'الدور المؤسساتي',
      'intro.title': 'إطار اجتماعي في خدمة الأسرة الفلاحية',
      'intro.body': 'تنظم المؤسسة وتطور خدمات اجتماعية لفائدة موظفي وزارة الفلاحة والهيئات المعنية. ويرتكز عملها على القرب والإنصات وجودة الخدمة وحكامة واضحة.',
      'highlight.solidarity.title': 'التضامن',
      'highlight.solidarity.body': 'دعم المنخرطين وأسرهم في المحطات المهمة من مسارهم.',
      'highlight.proximity.title': 'القرب',
      'highlight.proximity.body': 'تسهيل الولوج إلى المعلومة والخدمات والوسائط الميدانية.',
      'highlight.governance.title': 'الشفافية',
      'highlight.governance.body': 'تنظيم القرارات والمسؤوليات وتتبع العمل الاجتماعي.',
      'path.tag': 'فهم المؤسسة',
      'path.title': 'الروابط المؤسساتية',
      'path.body': 'ولوج الرسائل الرسمية والتاريخ والتنظيم وهيئات الحكامة الخاصة بمؤسسة FOS-Agri.',
      'cards.minister.title': 'كلمة الوزير',
      'cards.minister.body': 'الرؤية المؤسساتية التي تحملها الوزارة لتعزيز العمل الاجتماعي لفائدة الموظفين.',
      'cards.minister.link': 'قراءة كلمة الوزير',
      'cards.president.title': 'كلمة الرئيس',
      'cards.president.body': 'رسالة حول القرب وتحديث الخدمات والالتزام تجاه المنخرطين.',
      'cards.president.link': 'قراءة كلمة الرئيس',
      'cards.history.title': 'التاريخ، المهمة والقيم',
      'cards.history.body': 'المحطات الأساسية للمؤسسة، مهمتها الاجتماعية والقيم التي توجه عملها اليومي.',
      'cards.history.link': 'استكشاف التاريخ والقيم',
      'cards.organization.title': 'تنظيمنا',
      'cards.organization.body': 'البنية العملية للمؤسسة، مديرياتها، مصالحها ومسؤولياتها.',
      'cards.organization.link': 'عرض المخطط التنظيمي',
      'cards.governance.title': 'الحكامة',
      'cards.governance.body': 'هيئات القيادة واللجان والقواعد التي تؤطر عمل المؤسسة.',
      'cards.governance.link': 'اكتشاف الحكامة',
      'band.title': 'مؤسسة واضحة، قريبة ومفيدة',
      'band.body': 'تجمع هذه الصفحة المعلومات المؤسساتية الأساسية قبل الولوج إلى الخدمات أو الانخراط أو قنوات التواصل.',
      'band.cta': 'عرض الخدمات'
    },

    zgh: {
      title: 'FOS-Agri | ⵜⴰⵎⵙⵙⵓⵔⵜ',
      description: 'ⵙⵙⵏⴰⵜ ⵜⴰⵎⵙⵙⵓⵔⵜ FOS-Agri, ⵜⴰⵎⴰⵡⵉⵜ ⵏⵏⵙ, ⵜⵉⵏⵉⵍⴰ, ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵙⵓⴷⴷⵓⵔⵜ ⴷ ⵜⴰⴳⵓⵔⵉ.',
      'hero.kicker': 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⵏⵀⵓⵔⵜ ⵙ ⵡⵓⵎⴰⵍ',
      'hero.title': 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵉⵇⵔⴱⵏ ⵙ ⵉⵎⴳⴳⴰⵢⵏ ⵏ ⵓⵙⴳⵔ ⵏ ⵜⴼⵍⴰⵃⵜ',
      'hero.body': 'FOS-Agri ⵜⵙⵎⵓⵏ ⵉⵎⵏⵖⵔⴰⵟⵏ, ⵉⵎⴰⵎⴰⵙⵏ ⴷ ⵜⵡⴰⵊⴰⵡⵉⵏ ⵏⵙⵏ ⵙ ⵓⵎⴰⵍ ⴰⵎⴰⴷⴰⵏ, ⴰⵎⵙⵙⵓⵔ ⴷ ⴰⵎⵙⴰⵡⴰⵍ.',
      'hero.primary': 'ⵙⵙⵏ ⵜⴰⵎⴰⵡⵉⵜ ⵏⵏⵖ',
      'hero.secondary': 'ⵥⵕ ⵜⴰⵙⵓⴷⴷⵓⵔⵜ',
      'intro.tag': 'ⴰⵙⴰⵜⵉ ⴰⵎⵙⵙⵓⵔ',
      'intro.title': 'ⴰⴼⵔⴰⴽ ⴰⵎⴰⴷⴰⵏ ⴳ ⵓⵎⵍⵉⵍ ⵏ ⵜⵡⴰⵊⴰ ⵜⴰⴼⵍⴰⵃⵜ',
      'intro.body': 'ⵜⵙⵓⴷⴷⵓ ⵜⵎⵙⵙⵓⵔⵜ ⵜⵉⵏⴼⴰⵙ ⵜⵉⵎⴰⴷⴰⵏⵉⵏ ⵉ ⵉⵎⴳⴳⴰⵢⵏ ⵏ ⵜⴰⵎⴰⵣⴰⵔⵜ ⵏ ⵜⴼⵍⴰⵃⵜ. ⵜⵙⵙⵏⵎⴰⵍ ⵅⴼ ⵓⵣⵉⵟ, ⴰⵙⵍⵍⵉⵙ, ⵜⴰⵙⴽⴰⵍⴰ ⵏ ⵜⵏⴼⴰ ⴷ ⵜⴰⴳⵓⵔⵉ ⵉⴼⵔⴰⵏ.',
      'highlight.solidarity.title': 'ⵜⴰⴷⵓⵙⵉ',
      'highlight.solidarity.body': 'ⴰⵙⵙⵉⵙⵏ ⵏ ⵉⵎⵏⵖⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵊⴰⵡⵉⵏ ⵏⵙⵏ ⴳ ⵉⵎⵏⵣⴰⵢⵏ ⵉⵎⵇⵇⵔⴰⵏⵏ.',
      'highlight.proximity.title': 'ⴰⵣⵉⵟ',
      'highlight.proximity.body': 'ⴰⵙⵙⵉⴼⵙ ⵏ ⵓⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⴰⵍⵉ, ⵜⵉⵏⴼⴰⵙ ⴷ ⵉⵎⵙⵏⴰⵡⴰⵢⵏ ⵏ ⵓⴽⴰⵍ.',
      'highlight.governance.title': 'ⵜⴰⴼⴰⵡⵉⵏⵜ',
      'highlight.governance.body': 'ⴰⵙⵓⴷⴷⵓ ⵏ ⵉⵏⵎⵍⴰ, ⵜⵉⵎⵙⵙⵓⵔⵉⵏ ⴷ ⵓⵙⵙⴼⵔⵓ ⵏ ⵓⵎⴰⵍ ⴰⵎⴰⴷⴰⵏ.',
      'path.tag': 'ⵙⵙⵏ ⵜⴰⵎⵙⵙⵓⵔⵜ',
      'path.title': 'ⵜⵉⵔⵎⴰⴷ ⵜⵉⵎⵙⵙⵓⵔⵉⵏ',
      'path.body': 'ⴽⵛⵎⴰⵜ ⵖⵔ ⵉⵡⴰⵍⵏ ⵉⵎⵙⵙⵓⵔⵉⵏ, ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵙⵓⴷⴷⵓⵔⵜ ⴷ ⵉⵎⴰⵙⵙⵏ ⵏ ⵜⴰⴳⵓⵔⵉ ⵏ FOS-Agri.',
      'cards.minister.title': 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵉⵏⵉⵙⵜⵔ',
      'cards.minister.body': 'ⵜⵉⵣⵉ ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⴰⵎⴰⵣⴰⵔⵜ ⵉ ⵓⵙⵙⵉⵙⵏ ⵏ ⵓⵎⴰⵍ ⴰⵎⴰⴷⴰⵏ.',
      'cards.minister.link': 'ⵖⵔ ⴰⵡⴰⵍ ⵏ ⵓⵎⵉⵏⵉⵙⵜⵔ',
      'cards.president.title': 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ',
      'cards.president.body': 'ⴰⵡⴰⵍ ⵅⴼ ⵓⵣⵉⵟ, ⴰⵙⵎⴰⵢⵏⵓ ⵏ ⵜⵉⵏⴼⴰⵙ ⴷ ⵓⵣⴷⴰⵢ ⴷ ⵉⵎⵏⵖⵔⴰⵟⵏ.',
      'cards.president.link': 'ⵖⵔ ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ',
      'cards.history.title': 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵡⵉⵜ ⴷ ⵜⵉⵏⵉⵍⴰ',
      'cards.history.body': 'ⵉⵎⵏⵣⴰⵢⵏ ⵉⵙⵎⵓⵏⵏ, ⵜⴰⵎⴰⵡⵉⵜ ⴰⵎⴰⴷⴰⵏⵜ ⴷ ⵜⵉⵏⵉⵍⴰ ⵉⵜⵜⴰⵡⵉⵏ ⴰⵎⴰⵍ ⵏⵏⵙ.',
      'cards.history.link': 'ⵙⵙⵏ ⴰⵎⵣⵔⵓⵢ ⴷ ⵜⵉⵏⵉⵍⴰ',
      'cards.organization.title': 'ⵜⴰⵙⵓⴷⴷⵓⵔⵜ ⵏⵏⵖ',
      'cards.organization.body': 'ⵜⴰⵙⵓⴷⴷⵓⵔⵜ ⵜⴰⵎⴰⵙⵙⴰⵢⵜ, ⵜⵉⵎⵏⴰⴹⵉⵏ, ⵜⵉⵙⵏⴰⵙ ⴷ ⵜⵎⵙⵙⵓⵔⵉⵏ.',
      'cards.organization.link': 'ⵥⵕ ⴰⵎⵓⵙⵙⵓ ⵏ ⵜⴰⵙⵓⴷⴷⵓⵔⵜ',
      'cards.governance.title': 'ⵜⴰⴳⵓⵔⵉ',
      'cards.governance.body': 'ⵉⵎⴰⵙⵙⵏ ⵏ ⵓⵙⵏⴼⵍ, ⵉⴽⵓⵎⵉⵜⵏ ⴷ ⵉⵍⵓⴳⵏ ⵉⵙⵙⵓⴷⴷⵓⵏ ⵜⴰⵎⵙⵙⵓⵔⵜ.',
      'cards.governance.link': 'ⵙⵙⵏ ⵜⴰⴳⵓⵔⵉ',
      'band.title': 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵉⴼⵔⴰⵏ, ⵜⵇⵔⴱ ⴷ ⵜⵏⴼⴰ',
      'band.body': 'ⵜⴰⵙⵏⴰ ⴰⴷ ⵜⵙⵎⵓⵏ ⵉⵙⴰⵍⵏ ⵉⵎⵙⵙⵓⵔⵉⵏ ⵉⵎⵇⵇⵔⴰⵏⵏ ⵇⴱⵍ ⴰⴽⵛⵛⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰⵙ, ⴰⵎⵓⵏ ⵏⵖ ⵉⵙⴰⵍⵏ ⵏ ⵓⵎⵢⴰⵡⴰⴹ.',
      'band.cta': 'ⵥⵕ ⵜⵉⵏⴼⴰⵙ'
    }
  };

  function t(key, lang) {
    const active = lang || currentLang();
    return (I18N[active] && I18N[active][key]) || I18N[DEFAULT_LANG][key] || key;
  }

  function applyLanguage() {
    const lang = currentLang();
    document.title = t('title', lang);
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', t('description', lang));
    document.querySelectorAll('[data-foundation-i18n]').forEach((node) => {
      node.textContent = t(node.dataset.foundationI18n, lang);
    });
  }

  function init() {
    applyLanguage();
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'attributes' && (m.attributeName === 'lang' || m.attributeName === 'dir'))) {
        applyLanguage();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
    window.addEventListener('fosagri:lang-change', applyLanguage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
