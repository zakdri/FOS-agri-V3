(function () {
  'use strict';

  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  const I18N = {
    fr: {
      'values.pageTitle': 'Nos valeurs',
      'values.hero.kicker': 'Nos valeurs',
      'values.hero.subtitle': 'Les principes qui guident l’action sociale de la FOS-Agri.',
      'values.section.tag': 'Principes fondateurs',
      'values.section.title': 'Une action guidée par quatre engagements',
      'values.proximity.title': 'Proximité',
      'values.proximity.body': 'Renvoie vers notre capacité à toujours être plus proche de nos adhérents afin de mieux comprendre et d’anticiper leurs attentes et aspirations.',
      'values.equity.title': 'Équité',
      'values.equity.body': 'L’équité renvoie vers l’égalité des chances en termes d’accès aux prestations à l’ensemble des adhérents.',
      'values.service.title': 'Sens du service',
      'values.service.body': 'Nous nous engageons à offrir un accompagnement attentif, réactif et utile, centré sur les besoins réels des adhérents.',
      'values.inclusion.title': 'Inclusion',
      'values.inclusion.body': 'La Fondation veille à garantir un accès équitable aux services et à renforcer l’accompagnement de tous les adhérents, sans exclusion.'
    },
    ar: {
      'values.pageTitle': 'قيمنا',
      'values.hero.kicker': 'قيمنا',
      'values.hero.subtitle': 'المبادئ التي توجه العمل الاجتماعي لمؤسسة FOS-Agri.',
      'values.section.tag': 'مبادئ مؤسِّسة',
      'values.section.title': 'عملنا يرتكز على أربعة التزامات',
      'values.proximity.title': 'القرب',
      'values.proximity.body': 'يعبر عن قدرتنا على أن نكون أقرب دائماً من المنخرطين، من أجل فهم انتظاراتهم وتطلعاتهم واستباقها.',
      'values.equity.title': 'الإنصاف',
      'values.equity.body': 'يرتبط الإنصاف بتكافؤ الفرص من حيث الولوج إلى الخدمات لفائدة جميع المنخرطين.',
      'values.service.title': 'روح الخدمة',
      'values.service.body': 'نلتزم بتقديم مواكبة يقظة وفعالة ومفيدة، تنطلق من الحاجيات الحقيقية للمنخرطين.',
      'values.inclusion.title': 'الإدماج',
      'values.inclusion.body': 'تحرص المؤسسة على ضمان استفادة منصفة من الخدمات وتعزيز المواكبة لفائدة جميع المنخرطين دون إقصاء.'
    },
    zgh: {
      'values.pageTitle': 'ⵜⵉⵏⵉⵍⴰ',
      'values.hero.kicker': 'ⵜⵉⵏⵉⵍⴰ',
      'values.hero.subtitle': 'ⵉⵎⴰⵜⵓⵜⵏ ⵉ ⵙⵙⵏⵙⴰⵏ ⵜⵉⴳⴰⵡⵜ ⵜⴰⵏⵎⴻⵜⵜⵉⵜ ⵏ FOS-Agri.',
      'values.section.tag': 'ⵉⵎⴰⵜⵓⵜⵏ ⵉⵙⵙⴰⵙⵏ',
      'values.section.title': 'ⵜⵉⴳⴰⵡⵜ-ⵏⵏⴻⵖ ⵜⴻⵜⵜⵓⵙⵙⴻⵏⴷ ⵖⴼ ⴽⴽⵓⵥ ⵉⵎⴰⵔⵙⵏ',
      'values.proximity.title': 'ⵜⴰⴳⴰⵏⵜ',
      'values.proximity.body': 'ⵜⴻⵜⵜⵙⴽⴽⵉⵔ ⵜⴰⵣⵎⵔⵜ-ⵏⵏⴻⵖ ⴰⴷ ⵏⵉⵍⵉ ⵢⴻⵣⵎⴻⵔ ⵉ ⵉⵎⵓⵏⵏ, ⴰⴷ ⵏⴼⴻⵀⵎ ⴷ ⴰⴷ ⵏⵙⵙⴻⵏⵜⵉ ⵉⵙⵔⴰ-ⵏⵙⴻⵏ.',
      'values.equity.title': 'ⵜⴰⵏⴱⴰⴹⵜ',
      'values.equity.body': 'ⵜⴰⵏⴱⴰⴹⵜ ⵜⵉⴳⵉ ⴷ ⵜⴰⵎⴰⴳⴷⴰⵍⵜ ⵏ ⵜⴼⵓⵔⵙⵉⵡⵉⵏ ⴷⴻⴳ ⵓⴽⵛⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰ ⵉ ⵎⴻⵔⵔⴰ ⵉⵎⵓⵏⵏ.',
      'values.service.title': 'ⴰⵙⵙⴰⵙ ⵏ ⵜⵏⴼⴰ',
      'values.service.body': 'ⵏⴻⵜⵜⵎⵓⵔⵙ ⴰⴷ ⵏⴼⴽ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⵎⴻⵙⴱⵔⵉⴷⵜ ⴷ ⵜⴰⵎⴻⵣⴹⴰⵢⵜ, ⵜⴻⴱⴷⴰ ⵙⴳ ⵉⵙⵔⴰ ⵉⵎⵎⴰⵥⴰⵏⵏ.',
      'values.inclusion.title': 'ⵜⴰⵎⴰⵙⵙⵓⵜ',
      'values.inclusion.body': 'ⵜⴰⵙⵓⴷⴰⵙⵜ ⵜⴻⵜⵜⵃⵔⴻⵚ ⴰⴷ ⵜⴻⵍⵍⵉ ⵜⴰⵎⴰⴳⴷⴰⵍⵜ ⴷⴻⴳ ⵓⴽⵛⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰ ⵉ ⵎⴻⵔⵔⴰ ⵉⵎⵓⵏⵏ.'
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
