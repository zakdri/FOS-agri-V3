(function () {
  'use strict';

  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  const I18N = {
    fr: {
      'values.pageTitle': 'Nos valeurs',
      'values.hero.kicker': 'Nos valeurs',
      'values.hero.subtitle': "Les principes qui guident l'action sociale de la FOS-Agri.",
      'values.section.tag': 'Principes fondateurs',
      'values.section.title': 'Une action guidée par quatre engagements',
      'values.intro.title': 'Nos valeurs',
      'values.intro.body': "Les valeurs sont les constituants de base de la culture de la fondation et un aiguillage à nos actions et à nos interactions avec l’ensemble de nos parties-prenantes. Ces valeurs fondamentales sont portées au quotidien par nos collaborateurs et donnent du sens à notre quotidien et une portée à notre mission.",
      'values.proximity.title': 'Proximité',
      'values.proximity.body': "Renvoie vers notre capacité à toujours être plus proche de nos adhérents afin de mieux comprendre et d'anticiper leurs attentes et aspirations.",
      'values.equity.title': 'Équité',
      'values.equity.body': "L'équité renvoie vers l'égalité des chances en termes d'accès aux prestations à l'ensemble des adhérents.",
      'values.service.title': 'Sens du service',
      'values.service.body': 'Être mobilisé pour fournir toujours le meilleur service en faisant preuve de bienveillance, d’assistance et de réactivité et garantir la continuité et l’accès à nos prestations.',
      'values.inclusion.title': 'Inclusion',
      'values.inclusion.body': 'Garantir l’accès aux prestations sociales à l’ensemble des agents actifs ou retraités du département indépendamment de leur grade, genre, région ou fonction…'
    },
    ar: {
      'values.pageTitle': 'قيمنا',
      'values.hero.kicker': 'قيمنا',
      'values.hero.subtitle': 'المبادئ التي توجه العمل الاجتماعي لمؤسسة FOS-Agri.',
      'values.section.tag': 'مبادئ مؤسِّسة',
      'values.section.title': 'عملنا يرتكز على أربعة التزامات',
      'values.intro.title': 'قيمنا',
      'values.intro.body': 'القيم هي المكونات الأساسية لثقافة المؤسسة، وهي التي توجه أعمالنا وتفاعلاتنا مع مختلف الأطراف المعنية.',
      'values.proximity.title': 'القرب',
      'values.proximity.body': 'يعبر عن قدرتنا على أن نكون أقرب دائماً من المنخرطين، من أجل فهم انتظاراتهم وتطلعاتهم واستباقها.',
      'values.equity.title': 'الإنصاف',
      'values.equity.body': 'يرتبط الإنصاف بتكافؤ الفرص من حيث الولوج إلى الخدمات لفائدة جميع المنخرطين.',
      'values.service.title': 'روح الخدمة',
      'values.service.body': 'نحن معبؤون لضمان خدمة يقظة ونافعة وسريعة التفاعل، مع الاستمرارية وجودة الخدمات.',
      'values.inclusion.title': 'الإدماج',
      'values.inclusion.body': 'ضمان الولوج إلى الخدمات الاجتماعية لجميع المنخرطين، بغض النظر عن الدرجة أو النوع أو الجهة أو الوظيفة.'
    },
    zgh: {
      'values.pageTitle': 'ⵜⵉⵏⵉⵍⴰ',
      'values.hero.kicker': 'ⵜⵉⵏⵉⵍⴰ',
      'values.hero.subtitle': 'ⵉⵎⴰⵡⵓⵜⵏ ⵉ ⵙⵙⵏⴰⵏ ⵜⵉⴳⴰⵡⵜ ⵜⴰⵏⵎⴻⵜⵜⵉⵜ ⵏ FOS-Agri.',
      'values.section.tag': 'ⵉⵎⴰⵡⵓⵜⵏ ⵉⵙⵙⴰⵙⵏ',
      'values.section.title': 'ⵜⵉⴳⴰⵡⵜ-ⵏⵏⴻⵖ ⵜⴻⵜⵜⵓⵙⵙⴻⵏⴷ ⵖⴼ ⴽⵕⴰⴹ ⵉⵎⴰⵏⵙⵏ',
      'values.intro.title': 'ⵜⵉⵏⵉⵍⴰ',
      'values.intro.body': 'ⵜⵉⵏⵉⵍⴰ ⴷ ⵉⴳⵔⴰⵏ ⵉⵙⵙⴰⵙⵏ ⵏ ⵜⴷⵍⵙⴰ ⵏ ⵜⵎⵙⵙⵓⴷⵙⵜ, ⵜⴻⵏⵏⴰ ⴷ ⵜⵙⵙⵏⵓⵔⴰ ⵉ ⵜⵉⴳⴰⵡⵉⵏ-ⵏⵏⴻⵖ ⴷ ⵉⵎⵢⴰⵡⴰⵙⵏ-ⵏⵏⴻⵖ.',
      'values.proximity.title': 'ⵜⴰⴳⴰⵏⵜ',
      'values.proximity.body': 'ⵜⴻⵜⵜⵙⴽⴽⵉⵔ ⵜⴰⵣⵎⵔⵜ-ⵏⵏⴻⵖ ⴰⴷ ⵏⵉⵍⵉ ⵢⴻⵣⵎⴻⵔ ⵉ ⵉⵎⵓⵏⵏ, ⴰⴷ ⵏⴼⴻⵀⵎ ⴷ ⴰⴷ ⵏⵙⵙⴻⵏⵜⵉ ⵉⵙⵕⴰ-ⵏⵙⴻⵏ.',
      'values.equity.title': 'ⵜⴰⵏⴱⴰⴹⵜ',
      'values.equity.body': 'ⵜⴰⵏⴱⴰⴹⵜ ⵜⵉⴳⵉ ⴷ ⵜⴰⵎⴰⴳⴷⴰⵍⵜ ⵏ ⵜⴼⵓⵔⵙⵉⵏ ⴷⴻⴳ ⵓⵍⵓⵣⵣⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰ ⵉ ⵎⴻⵔⵔⴰ ⵉⵎⵓⵏⵏ.',
      'values.service.title': 'ⴰⵙⵙⴰⵙ ⵏ ⵜⵏⴼⴰ',
      'values.service.body': 'ⵏⴻⵜⵜⵎⵓⵙ ⴰⴷ ⵏⴼⴽ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⵎⴻⵙⴱⵕⵉⴷⵜ ⴷ ⵜⴰⵎⴻⵣⴹⴰⵢⵜ, ⵜⴻⴱⴷⴰ ⵙⴳ ⵉⵙⵕⴰ ⵉⵎⵓⵏⵏ.',
      'values.inclusion.title': 'ⵜⴰⵎⴰⵙⵙⵓⵜ',
      'values.inclusion.body': 'ⴰⴷ ⵏⵙⵃⴻⴱⴱⴻⵜ ⴰⴷ ⵜⵉⵍⵍⵉ ⵜⴰⵎⴰⴳⴷⴰⵍⵜ ⴷⴻⴳ ⵓⵍⵓⵣⵣⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰ ⵉ ⵎⴻⵔⵔⴰ ⵉⵎⵓⵏⵏ.',
      // TODO: Validate official Amazigh copy with source visual/content owner.
    }
  };

  function currentLang() {
    const html = document.documentElement.lang;
    if (SUPPORTED.includes(html)) return html;
    const stored = localStorage.getItem('fosagri-lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  function t(key, lang) {
    const l = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
    return (I18N[l] && I18N[l][key]) || I18N[DEFAULT_LANG][key] || key;
  }

  function apply(lang) {
    document.title = 'FOS-Agri | ' + t('values.pageTitle', lang);
    document.querySelectorAll('[data-values-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.valuesI18n, lang);
    });
  }

  function init() {
    apply(currentLang());
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && (m.attributeName === 'lang' || m.attributeName === 'dir')) {
          apply(currentLang());
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
