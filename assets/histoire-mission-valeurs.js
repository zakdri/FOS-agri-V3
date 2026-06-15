/* ============================================================
 *  Histoire, mission et valeurs — data + renderer
 *  ------------------------------------------------------------
 *  Static (no backend) but designed to plug into a dashboard / CMS:
 *
 *    1. To override the data at build time, set
 *         window.FOSAGRI_TIMELINE_DATA = [...]
 *         window.FOSAGRI_VALUES_DATA   = [...]
 *       BEFORE this script is loaded (or before DOMContentLoaded).
 *
 *    2. To plug a future REST/CMS endpoint, replace the
 *       `loadTimeline()` / `loadValues()` async functions below
 *       with `fetch('/api/...')` calls. The render functions
 *       already handle loading/empty/error states.
 *
 *    3. Each entry uses translation keys (titleKey, textKey, ...)
 *       so the dashboard only stores stable IDs while the actual
 *       strings live in the I18N dictionary below — making the
 *       same data immediately multilingual.
 * ============================================================ */
(function () {
  'use strict';

  // ----- Supported languages (mirrors assets/secondary-pages.js) -----
  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  function currentLang() {
    const html = document.documentElement.lang;
    if (SUPPORTED.includes(html)) return html;
    const stored = localStorage.getItem('fosagri-lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  // ============================================================
  // I18N DICTIONARY
  // Add new languages here and add their code to SUPPORTED above.
  // A missing key falls back to French, then to the raw key.
  // ============================================================
  const I18N = {
    fr: {
      'page.title': 'Histoire, mission et valeurs',
      'hero.kicker': 'Notre parcours',
      'hero.lead': "Depuis sa création, FOS-Agri œuvre au service des femmes et des hommes du secteur agricole. Découvrez les grandes étapes, notre mission et les valeurs qui guident notre action.",

      'sections.history.tag': 'Histoire',
      'sections.history.title': 'Les grandes étapes de FOS-Agri',
      'sections.history.intro': 'Une frise chronologique des moments fondateurs et des initiatives qui ont façonné la Fondation.',
      'sections.history.ariaTimeline': 'Chronologie FOS-Agri',

      'sections.mission.tag': 'Mission',
      'sections.mission.title': 'Notre mission',
      'sections.mission.paragraph1': "Accompagner, soutenir et valoriser les femmes et les hommes du secteur agricole à travers des prestations sociales de proximité, accessibles et de qualité.",
      'sections.mission.paragraph2': "Renforcer la solidarité au sein de la grande famille du Ministère de l'Agriculture en développant des services adaptés aux besoins des adhérents, des retraités et de leurs familles.",
      'sections.mission.pillar1': 'Solidarité de proximité',
      'sections.mission.pillar2': 'Couverture médico-sociale',
      'sections.mission.pillar3': 'Soutien aux familles',
      'sections.mission.quote': "« Une Fondation au service de la famille du Ministère de l'Agriculture. »",

      'sections.values.tag': 'Principes fondateurs',
      'sections.values.title': 'Une action guidée par quatre engagements',
      'sections.values.intro': "Les principes qui guident l'action sociale de la FOS-Agri.",

      'cta.title': 'Vous souhaitez en savoir plus sur la Fondation ?',
      'cta.subtitle': "Découvrez la gouvernance, les prestations et l'espace adhérent.",
      'cta.button': 'Retour à la Fondation',

      'timeline.loading': 'Chargement de la chronologie…',
      'timeline.empty': "Aucune étape n'est disponible pour le moment.",
      'timeline.error': "Impossible de charger la chronologie.",
      'values.loading': 'Chargement…',
      'values.empty': "Aucune valeur n'est disponible pour le moment.",
      'values.intro.title': 'Nos valeurs',
      'values.intro.body': "Les valeurs sont les constituants de base de la culture de la fondation et un aiguillage à nos actions et à nos interactions avec l’ensemble de nos parties-prenantes. Ces valeurs fondamentales sont portées au quotidien par nos collaborateurs et donnent du sens à notre quotidien et une portée à notre mission.",
      'values.equity.title': 'Équité',
      'values.equity.desc': "L'équité renvoie vers l'égalité des chances en termes d'accès aux prestations à l'ensemble des adhérents.",
      'values.service.title': 'Sens du service',
      'values.service.desc': 'Être mobilisé pour fournir toujours le meilleur service en faisant preuve de bienveillance, d’assistance et de réactivité et garantir la continuité et l’accès à nos prestations.',
      'values.inclusion.title': 'Inclusion',
      'values.inclusion.desc': "Garantir l'accès aux prestations sociales à l'ensemble des agents actifs ou retraités du département indépendamment de leur grade, genre, région ou fonction…",

      // Timeline content
      'timeline.2015.title': 'Naissance de la Fondation',
      'timeline.2015.creation': 'Création de la FOS-Agri',
      'timeline.2015.governance': 'Mise en place des organes de gouvernance',

      'timeline.2016.title': 'Lancement opérationnel',
      'timeline.2016.services': 'Lancement des prestations',
      'timeline.2016.tools': 'Instauration des outils de gestion',

      'timeline.2017.title': 'Déploiement des prestations phares',
      'timeline.2017.amc_amts': "Déploiement des prestations phares relatives de l'AMC et de l'AMTS",

      'timeline.2018.title': 'Adaptation et digitalisation',
      'timeline.2018.health': "Adaptation de l'offre à la situation sanitaire",
      'timeline.2018.app': "Lancement de l'application FOSAGRI",
      'timeline.2018.digital': 'Déploiement de la communication digitale',

      'timeline.2019.title': 'Ouverture et ancrage régional',
      'timeline.2019.retirees': 'Intégration des retraités',
      'timeline.2019.relais': "Nomination des relais régionaux afin de garantir une coordination optimale à l'échelle régionale.",

      'timeline.2021.title': 'Élargissement et nouveaux crédits',
      'timeline.2021.onssa': "Intégration de l'ONSSA et l'ONCA",
      'timeline.2021.credits': 'Lancement des crédits sociaux et de la bonification aux crédits de logement',

      'timeline.2022.title': "Ouverture du Club de l'Agriculture",
      'timeline.2022.club_provided': 'Mise à la disposition du club auprès de la Fos-Agri',
      'timeline.2022.club_open': 'Ouverture du club',
      'timeline.2022.club_services': "Lancement des prestations du Club de l'Agriculture",

      'timeline.2023.title': 'Nouvelles aides et partenariats',
      'timeline.2023.housing': "Mise en place de la nouvelle formule d'aide au logement",
      'timeline.2023.partners': 'Signature de nouveaux partenariats',
      'timeline.2023.medical': 'Ouverture du nouveau centre médical',

      'timeline.2024.title': 'Enrichissement des prestations',
      'timeline.2024.amts': "Enrichissement du panier de l'AMTS",
      'timeline.2024.medical_new': 'Mise en place de nouvelles prestations au niveau du centre médical',
      'timeline.2024.partners': 'Signature de nouveaux partenariats',

      // Values
      'values.solidarity.title': 'Solidarité',
      'values.solidarity.desc': 'Agir ensemble au service de la famille FOS-Agri et de ses bénéficiaires.',
      'values.proximity.title': 'Proximité',
      'values.proximity.desc': 'Être à l\'écoute des adhérents, partout sur le territoire, grâce à nos relais régionaux.',
      'values.commitment.title': 'Engagement',
      'values.commitment.desc': "Un engagement constant pour la qualité, la fiabilité et l'impact social de nos prestations.",
      'values.innovation.title': 'Innovation',
      'values.innovation.desc': 'Moderniser sans cesse les prestations et les outils pour mieux servir.',
      'values.transparency.title': 'Transparence',
      'values.transparency.desc': 'Une gouvernance claire et une communication ouverte avec nos adhérents.',
      'values.excellence.title': 'Excellence',
      'values.excellence.desc': 'Viser le meilleur niveau de service, de gestion et de satisfaction des bénéficiaires.'
    },

    ar: {
      'page.title': 'التاريخ، المهمة والقيم',
      'hero.kicker': 'مسارنا',
      'hero.lead': 'منذ تأسيسها، تعمل FOS-Agri في خدمة نساء ورجال القطاع الفلاحي. اكتشفوا أبرز المحطات، مهمتنا والقيم التي توجه عملنا.',

      'sections.history.tag': 'التاريخ',
      'sections.history.title': 'أبرز محطات FOS-Agri',
      'sections.history.intro': 'تسلسل زمني للحظات المؤسِّسة والمبادرات التي شكّلت المؤسسة.',
      'sections.history.ariaTimeline': 'تسلسل زمني لـ FOS-Agri',

      'sections.mission.tag': 'المهمة',
      'sections.mission.title': 'مهمتنا',
      'sections.mission.paragraph1': 'مواكبة ودعم وتثمين نساء ورجال القطاع الفلاحي من خلال خدمات اجتماعية قريبة وفي المتناول وعالية الجودة.',
      'sections.mission.paragraph2': 'تعزيز التضامن داخل الأسرة الكبرى لوزارة الفلاحة عبر تطوير خدمات تستجيب لاحتياجات المنخرطين والمتقاعدين وأسرهم.',
      'sections.mission.pillar1': 'تضامن قريب',
      'sections.mission.pillar2': 'تغطية طبية واجتماعية',
      'sections.mission.pillar3': 'دعم الأسر',
      'sections.mission.quote': '«مؤسسة في خدمة أسرة وزارة الفلاحة.»',

      'sections.values.tag': 'مبادئ مؤسِّسة',
      'sections.values.title': 'عملنا يرتكز على أربعة التزامات',
      'sections.values.intro': 'المبادئ التي توجه العمل الاجتماعي لمؤسسة FOS-Agri.',

      'cta.title': 'هل ترغبون في معرفة المزيد عن المؤسسة؟',
      'cta.subtitle': 'تعرفوا على الحكامة والخدمات وفضاء المنخرط.',
      'cta.button': 'العودة إلى المؤسسة',

      'timeline.loading': 'جارٍ تحميل التسلسل الزمني…',
      'timeline.empty': 'لا توجد محطات متاحة حالياً.',
      'timeline.error': 'تعذّر تحميل التسلسل الزمني.',
      'values.loading': 'جارٍ التحميل…',
      'values.empty': 'لا توجد قيم متاحة حالياً.',
      'values.intro.title': 'قيمنا',
      'values.intro.body': 'القيم هي المكونات الأساسية لثقافة المؤسسة، وهي التي توجه أعمالنا وتفاعلاتنا مع مختلف الأطراف المعنية.',
      'values.equity.title': 'الإنصاف',
      'values.equity.desc': 'يرتبط الإنصاف بتكافؤ الفرص من حيث الولوج إلى الخدمات لفائدة جميع المنخرطين.',
      'values.service.title': 'روح الخدمة',
      'values.service.desc': 'نحن معبؤون لضمان خدمة يقظة ونافعة وسريعة التفاعل، مع الاستمرارية وجودة الخدمات.',
      'values.inclusion.title': 'الإدماج',
      'values.inclusion.desc': 'ضمان الولوج إلى الخدمات الاجتماعية لجميع المنخرطين، بغض النظر عن الدرجة أو النوع أو الجهة أو الوظيفة.',

      'timeline.2015.title': 'تأسيس المؤسسة',
      'timeline.2015.creation': 'إحداث FOS-Agri',
      'timeline.2015.governance': 'إرساء أجهزة الحكامة',

      'timeline.2016.title': 'الانطلاقة العملية',
      'timeline.2016.services': 'إطلاق الخدمات',
      'timeline.2016.tools': 'وضع أدوات التدبير',

      'timeline.2017.title': 'تعميم الخدمات الرئيسية',
      'timeline.2017.amc_amts': 'تعميم الخدمات الرئيسية للتغطية الصحية التكميلية والتغطية الاجتماعية',

      'timeline.2018.title': 'التكيّف والرقمنة',
      'timeline.2018.health': 'تكييف العرض مع الوضع الصحي',
      'timeline.2018.app': 'إطلاق تطبيق FOSAGRI',
      'timeline.2018.digital': 'تطوير التواصل الرقمي',

      'timeline.2019.title': 'الانفتاح والتجذّر الجهوي',
      'timeline.2019.retirees': 'إدماج المتقاعدين',
      'timeline.2019.relais': 'تعيين المنسقين الجهويين لضمان تنسيق أمثل على المستوى الجهوي.',

      'timeline.2021.title': 'توسيع المنخرطين وقروض اجتماعية جديدة',
      'timeline.2021.onssa': 'إدماج ONSSA و ONCA',
      'timeline.2021.credits': 'إطلاق القروض الاجتماعية ودعم قروض السكن',

      'timeline.2022.title': 'افتتاح نادي الفلاحة',
      'timeline.2022.club_provided': 'وضع النادي رهن إشارة FOS-Agri',
      'timeline.2022.club_open': 'افتتاح النادي',
      'timeline.2022.club_services': 'إطلاق خدمات نادي الفلاحة',

      'timeline.2023.title': 'مساعدات وشراكات جديدة',
      'timeline.2023.housing': 'إرساء الصيغة الجديدة للمساعدة على السكن',
      'timeline.2023.partners': 'توقيع شراكات جديدة',
      'timeline.2023.medical': 'افتتاح المركز الطبي الجديد',

      'timeline.2024.title': 'إثراء الخدمات',
      'timeline.2024.amts': 'إثراء سلة الخدمات الاجتماعية',
      'timeline.2024.medical_new': 'إرساء خدمات جديدة بالمركز الطبي',
      'timeline.2024.partners': 'توقيع شراكات جديدة',

      'values.solidarity.title': 'التضامن',
      'values.solidarity.desc': 'العمل الجماعي في خدمة أسرة FOS-Agri ومستفيديها.',
      'values.proximity.title': 'القُرب',
      'values.proximity.desc': 'الإنصات إلى المنخرطين في كل التراب الوطني عبر منسقينا الجهويين.',
      'values.commitment.title': 'الالتزام',
      'values.commitment.desc': 'التزام دائم بالجودة والموثوقية والأثر الاجتماعي لخدماتنا.',
      'values.innovation.title': 'الابتكار',
      'values.innovation.desc': 'تحديث مستمر للخدمات والأدوات من أجل خدمة أفضل.',
      'values.transparency.title': 'الشفافية',
      'values.transparency.desc': 'حكامة واضحة وتواصل منفتح مع منخرطينا.',
      'values.excellence.title': 'الامتياز',
      'values.excellence.desc': 'بلوغ أعلى مستويات الخدمة والتدبير ورضى المستفيدين.'
    },

    zgh: {
      'page.title': 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵙⵜ ⴷ ⵉⵎⴰⵙⵙⴰⵏ',
      'hero.kicker': 'ⴰⴱⵔⵉⴷ ⵏⵏⵖ',
      'hero.lead': 'ⵙⴳ ⵓⵙⵏⵓⵍⴼⵓ ⵏⵏⵙ, ⵜⵙⵙⵎⵔⵙ FOS-Agri ⵉ ⵜⵉⵙⴷⵎⵜ ⵏ ⵉⵡⴷⴰⵏ ⵏ ⵜⴼⵍⵍⴰⵃⵜ.',

      'sections.history.tag': 'ⴰⵎⵣⵔⵓⵢ',
      'sections.history.title': 'ⵉⵎⴰⵏⴰⵔⵏ ⵎⵇⵇⵓⵔⵏⵉⵏ ⵏ FOS-Agri',
      'sections.history.intro': 'ⴰⵙⴰⵔⵙⵉⵙ ⵏ ⵜⴼⵔⴽⵉⵡⵉⵏ ⵉⵙⵏⵓⵍⴼⵉⵏ ⵜⴰⵎⵙⵙⵓⵔⵜ.',
      'sections.history.ariaTimeline': 'ⴰⵙⴰⵔⵙⵉⵙ ⴰⵎⵣⵔⵓⵢⴰⵏ ⵏ FOS-Agri',

      'sections.mission.tag': 'ⵜⴰⵎⴰⵙⵜ',
      'sections.mission.title': 'ⵜⴰⵎⴰⵙⵜ ⵏⵏⵖ',
      'sections.mission.paragraph1': 'ⴰⴷⴷⴰⴷ ⴷ ⵓⴷⵓⵙ ⵏ ⵉⵡⴷⴰⵏ ⵏ ⵜⴼⵍⵍⴰⵃⵜ ⵙ ⵜⵏⴼⴰⵙ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ.',
      'sections.mission.paragraph2': 'ⴰⵙⴽⵏⴰⴼ ⵏ ⵜⵉⵎⵓⵏⵉ ⴳⵔ ⵜⴰⵡⵊⴰ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴼⵍⵍⴰⵃⵜ.',
      'sections.mission.pillar1': 'ⵜⵉⵎⵓⵏⵉ ⵜⴰⵎⵣⵡⴰⵔⵓⵜ',
      'sections.mission.pillar2': 'ⴰⴼⵔⴰⵙ ⴰⴷⴰⵡⵙⴰⵏ ⴷ ⴰⵏⴰⵎⵓⵏ',
      'sections.mission.pillar3': 'ⴰⴷⵓⵙ ⵏ ⵜⵡⵓⵊⵉⵡⵉⵏ',
      'sections.mission.quote': '« ⵜⴰⵎⵙⵙⵓⵔⵜ ⵉ ⵜⴰⵡⵊⴰ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴼⵍⵍⴰⵃⵜ. »',

      'sections.values.tag': 'ⵉⵎⴰⵡⵓⵜⵏ ⵉⵙⵙⴰⵙⵏ',
      'sections.values.title': 'ⵜⵉⴳⴰⵡⵜ-ⵏⵏⴻⵖ ⵜⴻⵜⵜⵓⵙⵙⴻⵏⴷ ⵖⴼ ⴽⵕⴰⴹ ⵉⵎⴰⵏⵙⵏ',
      'sections.values.intro': 'ⵉⵎⴰⵡⵓⵜⵏ ⵉ ⵙⵙⵏⴰⵏ ⵜⵉⴳⴰⵡⵜ ⵜⴰⵏⵎⴻⵜⵜⵉⵜ ⵏ FOS-Agri.',

      'cta.title': 'ⵉⵙ ⵜⵔⴰⵎ ⴰⴷ ⵜⵙⵙⵏⵎ ⵓⴳⴳⴰⵔ ⵅⴼ ⵜⵎⵙⵙⵓⵔⵜ ?',
      'cta.subtitle': 'ⵙⵙⵏⵎ ⵜⴰⴳⵓⵔⵉ, ⵜⵉⵏⴼⴰⵙ ⴷ ⵓⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵏⵖⵓⵔ.',
      'cta.button': 'ⵜⵓⵖⴰⵍⵉⵏ ⵖⵔ ⵜⵎⵙⵙⵓⵔⵜ',

      'timeline.loading': 'ⴰⵙⴰⵍⵉ…',
      'timeline.empty': 'ⵓⵔ ⵍⵍⵉⵏ ⵉⵎⴰⵏⴰⵔⵏ ⴰⵙⵙⴰ.',
      'timeline.error': 'ⵓⵔ ⵉⵣⵎⵉⵔ ⵓⵙⴰⵍⵉ ⵏ ⵓⵙⴰⵔⵙⵉⵙ.',
      'values.loading': 'ⴰⵙⴰⵍⵉ…',
      'values.empty': 'ⵓⵔ ⵍⵍⵉⵏ ⵉⵎⴰⵙⵙⴰⵏ ⴰⵙⵙⴰ.',
      'values.intro.title': 'ⵜⵉⵏⵉⵍⴰ',
      'values.intro.body': 'ⵜⵉⵏⵉⵍⴰ ⴷ ⵉⴳⵔⴰⵏ ⵉⵙⵙⴰⵙⵏ ⵏ ⵜⴷⵍⵙⴰ ⵏ ⵜⵎⵙⵙⵓⴷⵙⵜ, ⵜⴻⵏⵏⴰ ⴷ ⵜⵙⵙⵏⵓⵔⴰ ⵉ ⵜⵉⴳⴰⵡⵉⵏ-ⵏⵏⴻⵖ ⴷ ⵉⵎⵢⴰⵡⴰⵙⵏ-ⵏⵏⴻⵖ.',
      'values.equity.title': 'ⵜⴰⵏⴱⴰⴹⵜ',
      'values.equity.desc': 'ⵜⴰⵏⴱⴰⴹⵜ ⵜⵉⴳⵉ ⴷ ⵜⴰⵎⴰⴳⴷⴰⵍⵜ ⵏ ⵜⴼⵓⵔⵙⵉⵏ ⴷⴻⴳ ⵓⵍⵓⵣⵣⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰ ⵉ ⵎⴻⵔⵔⴰ ⵉⵎⵓⵏⵏ.',
      'values.service.title': 'ⴰⵙⵙⴰⵙ ⵏ ⵜⵏⴼⴰ',
      'values.service.desc': 'ⵏⴻⵜⵜⵎⵓⵙ ⴰⴷ ⵏⴼⴽ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⵎⴻⵙⴱⵕⵉⴷⵜ ⴷ ⵜⴰⵎⴻⵣⴹⴰⵢⵜ, ⵜⴻⴱⴷⴰ ⵙⴳ ⵉⵙⵕⴰ ⵉⵎⵓⵏⵏ.',
      'values.inclusion.title': 'ⵜⴰⵎⴰⵙⵙⵓⵜ',
      'values.inclusion.desc': 'ⴰⴷ ⵏⵙⵃⴻⴱⴱⴻⵜ ⴰⴷ ⵜⵉⵍⵍⵉ ⵜⴰⵎⴰⴳⴷⴰⵍⵜ ⴷⴻⴳ ⵓⵍⵓⵣⵣⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰ ⵉ ⵎⴻⵔⵔⴰ ⵉⵎⵓⵏⵏ.',

      'timeline.2015.title': 'ⴰⵙⵏⵓⵍⴼⵓ ⵏ ⵜⵎⵙⵙⵓⵔⵜ',
      'timeline.2015.creation': 'ⴰⵙⵏⵓⵍⴼⵓ ⵏ FOS-Agri',
      'timeline.2015.governance': 'ⴰⵙⵔⵙ ⵏ ⵜⵏⴱⴰⴹⵉⵏ ⵏ ⵜⴳⵓⵔⵉ',

      'timeline.2016.title': 'ⴰⵙⵏⵜⵉ ⴰⵎⵙⴽⴰⵔ',
      'timeline.2016.services': 'ⴰⵙⵏⵜⵉ ⵏ ⵜⵏⴼⴰⵙ',
      'timeline.2016.tools': 'ⴰⵙⵔⵙ ⵏ ⵉⵙⵏⵙⵙⴰⵍ ⵏ ⵜⵙⵏⴱⴹⴰⵏⵜ',

      'timeline.2017.title': 'ⴰⵙⵙⵉⵡⴹ ⵏ ⵜⵏⴼⴰⵙ ⵜⵉⵎⴰⵇⵇⵔⴰⵏⵉⵏ',
      'timeline.2017.amc_amts': 'ⴰⵙⵙⵉⵡⴹ ⵏ ⵜⵏⴼⴰⵙ AMC ⴷ AMTS',

      'timeline.2018.title': 'ⴰⵎⵙⴰⵙⴰ ⴷ ⵓⵙⴷⴷⵉⵇ ⴰⵎⵓⵟⵟⵓⵏ',
      'timeline.2018.health': 'ⴰⵎⵙⴰⵙⴰ ⵏ ⵜⵏⴼⴰⵙ ⴷ ⵡⴰⴷⴷⴰⴷ ⴰⴷⴰⵡⵙⴰⵏ',
      'timeline.2018.app': 'ⴰⵙⵏⵜⵉ ⵏ ⵓⵙⵏⵙ FOSAGRI',
      'timeline.2018.digital': 'ⴰⵙⵙⵉⵡⴹ ⵏ ⵓⵎⵢⴰⵡⴰⴹ ⴰⵎⵓⵟⵟⵓⵏ',

      'timeline.2019.title': 'ⴰⵔⵣⵣⵓ ⴷ ⵜⵎⵏⴰⴹⵜ',
      'timeline.2019.retirees': 'ⴰⵙⵎⵓⵏ ⵏ ⵉⵎⴰⵎⴰⵙⵏ',
      'timeline.2019.relais': 'ⴰⵙⵎⵉⵍⵍⵉ ⵏ ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ.',

      'timeline.2021.title': 'ⴰⵙⵎⴳⴳⵔ ⴷ ⵉⵏⴹⴹⴰⴹⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ',
      'timeline.2021.onssa': 'ⴰⵙⵎⵓⵏ ⵏ ONSSA ⴷ ONCA',
      'timeline.2021.credits': 'ⴰⵙⵏⵜⵉ ⵏ ⵉⵏⴹⴹⴰⴹⵏ ⵉⵏⴰⵎⵓⵏⵏ ⴷ ⵓⵙⴷⵓⵙ ⵏ ⵉⵏⴹⴹⴰⴹⵏ ⵏ ⵜⴰⴷⴷⴰⵔⵜ',

      'timeline.2022.title': 'ⴰⵔⵣⵣⵓ ⵏ ⵓⴽⵍⵓⴱ ⵏ ⵜⴼⵍⵍⴰⵃⵜ',
      'timeline.2022.club_provided': 'ⴰⵙⵙⵉⵡⴹ ⵏ ⵓⴽⵍⵓⴱ ⵉ FOS-Agri',
      'timeline.2022.club_open': 'ⴰⵔⵣⵣⵓ ⵏ ⵓⴽⵍⵓⴱ',
      'timeline.2022.club_services': 'ⴰⵙⵏⵜⵉ ⵏ ⵜⵏⴼⴰⵙ ⵏ ⵓⴽⵍⵓⴱ',

      'timeline.2023.title': 'ⵜⴰⵏⴰⴼⵓⵜ ⴷ ⵉⵎⵎⴰⵏⴽⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ',
      'timeline.2023.housing': 'ⴰⵙⵔⵙ ⵏ ⵜⵏⵇⵉⴹⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵏ ⵜⵏⴰⴼⵓⵜ ⵉ ⵜⴰⴷⴷⴰⵔⵜ',
      'timeline.2023.partners': 'ⴰⵙⵙⵉⵏⵏ ⵏ ⵉⵎⵎⴰⵏⴽⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ',
      'timeline.2023.medical': 'ⴰⵔⵣⵣⵓ ⵏ ⵓⵙⵏⵉⵏ ⴰⴷⴰⵡⵙⴰⵏ ⴰⵎⴰⵢⵏⵓ',

      'timeline.2024.title': 'ⴰⵙⵎⵓⵟⵟⵓⵏ ⵏ ⵜⵏⴼⴰⵙ',
      'timeline.2024.amts': 'ⴰⵙⵎⵓⵟⵟⵓⵏ ⵏ ⵉⵙⴱⵉⵃⵏ ⵏ AMTS',
      'timeline.2024.medical_new': 'ⴰⵙⵔⵙ ⵏ ⵜⵏⴼⴰⵙ ⵜⵉⵎⴰⵢⵏⵓⵜⵉⵏ ⴷⴳ ⵓⵙⵏⵉⵏ ⴰⴷⴰⵡⵙⴰⵏ',
      'timeline.2024.partners': 'ⴰⵙⵙⵉⵏⵏ ⵏ ⵉⵎⵎⴰⵏⴽⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ',

      'values.solidarity.title': 'ⵜⵉⵎⵓⵏⵉ',
      'values.solidarity.desc': 'ⴰⵅⴷⴷⴰⵎ ⴰⵙⵎⵓⵏⴰⵏ ⵉ ⵜⴰⵡⵊⴰ FOS-Agri.',
      'values.proximity.title': 'ⴰⵎⵣⵡⴰⵔⵓ',
      'values.proximity.desc': 'ⴰⵙⴼⵍⴷ ⵉ ⵉⵎⵎⵓⵏⵏ ⴳ ⴰⴽⴽⵯ ⴰⵎⵏⴰⴹ.',
      'values.commitment.title': 'ⴰⵎⵎⵉⴽⵙ',
      'values.commitment.desc': 'ⴰⵎⵎⵉⴽⵙ ⵉ ⵜⴰⵙⴽⴰ ⴷ ⵓⵏⴰⴼⵍⵍⴰ ⴰⵏⴰⵎⵓⵏ.',
      'values.innovation.title': 'ⴰⵙⵏⵓⵍⴼⵓ',
      'values.innovation.desc': 'ⴰⵙⵎⴰⵢⵏⵓ ⴰⵎⴰⵔⵙ ⵏ ⵜⵏⴼⴰⵙ ⴷ ⵉⵙⵏⵙⵙⴰⵍ.',
      'values.transparency.title': 'ⵜⴰⵙⴼⵉⴼⵉⵏⵜ',
      'values.transparency.desc': 'ⵜⴰⴳⵓⵔⵉ ⵉⵍⴰⵏ ⴷ ⵓⵎⵢⴰⵡⴰⴹ ⴰⵔⵎⵎⴰⴷ.',
      'values.excellence.title': 'ⴰⵏⴰⴼⵍⵍⴰ',
      'values.excellence.desc': 'ⴰⵏⴰⵎⵎⴰⵙ ⵏ ⵓⵙⵡⵉⵔ ⵉⴼⵍⴰⵏ ⵏ ⵜⵏⴼⴰⵙ ⴷ ⵜⵙⵏⴱⴹⴰⵏⵜ.'
    }
  };

  function t(key, lang) {
    const l = lang || currentLang();
    return (I18N[l] && I18N[l][key]) || I18N[DEFAULT_LANG][key] || key;
  }

  // ============================================================
  // DEFAULT DATA — replace by overriding window.FOSAGRI_TIMELINE_DATA
  // / window.FOSAGRI_VALUES_DATA before this script runs, or by
  // adapting loadTimeline()/loadValues() into fetch() calls.
  //
  // SHAPE (Timeline):
  //   {
  //     id:       string  – stable identifier (used by CMS as primary key)
  //     year:     string  – display label of the badge ("2015")
  //     order:    number  – ascending sort order
  //     isActive: boolean – false => entry is skipped at render time
  //     titleKey: string  – i18n key for the card title (optional)
  //     icon:     string  – Font Awesome class (optional)
  //     items: [{ id, textKey }] – bullet list (textKey resolved via I18N)
  //   }
  //
  // SHAPE (Values):
  //   {
  //     id:      string
  //     order:   number
  //     isActive:boolean
  //     icon:    string  – Font Awesome class
  //     titleKey:string
  //     descKey: string
  //   }
  // ============================================================
  const DEFAULT_TIMELINE = [
    {
      id: '2015', year: '2015', order: 1, isActive: true, icon: 'fa-solid fa-seedling',
      titleKey: 'timeline.2015.title',
      items: [
        { id: '2015-1', textKey: 'timeline.2015.creation' },
        { id: '2015-2', textKey: 'timeline.2015.governance' }
      ]
    },
    {
      id: '2016', year: '2016', order: 2, isActive: true, icon: 'fa-solid fa-rocket',
      titleKey: 'timeline.2016.title',
      items: [
        { id: '2016-1', textKey: 'timeline.2016.services' },
        { id: '2016-2', textKey: 'timeline.2016.tools' }
      ]
    },
    {
      id: '2017', year: '2017', order: 3, isActive: true, icon: 'fa-solid fa-stethoscope',
      titleKey: 'timeline.2017.title',
      items: [
        { id: '2017-1', textKey: 'timeline.2017.amc_amts' }
      ]
    },
    {
      id: '2018', year: '2018', order: 4, isActive: true, icon: 'fa-solid fa-mobile-screen',
      titleKey: 'timeline.2018.title',
      items: [
        { id: '2018-1', textKey: 'timeline.2018.health' },
        { id: '2018-2', textKey: 'timeline.2018.app' },
        { id: '2018-3', textKey: 'timeline.2018.digital' }
      ]
    },
    {
      id: '2019', year: '2019', order: 5, isActive: true, icon: 'fa-solid fa-users-line',
      titleKey: 'timeline.2019.title',
      items: [
        { id: '2019-1', textKey: 'timeline.2019.retirees' },
        { id: '2019-2', textKey: 'timeline.2019.relais' }
      ]
    },
    {
      id: '2021', year: '2021', order: 6, isActive: true, icon: 'fa-solid fa-building-columns',
      titleKey: 'timeline.2021.title',
      items: [
        { id: '2021-1', textKey: 'timeline.2021.onssa' },
        { id: '2021-2', textKey: 'timeline.2021.credits' }
      ]
    },
    {
      id: '2022', year: '2022', order: 7, isActive: true, icon: 'fa-solid fa-mug-saucer',
      titleKey: 'timeline.2022.title',
      items: [
        { id: '2022-1', textKey: 'timeline.2022.club_provided' },
        { id: '2022-2', textKey: 'timeline.2022.club_open' },
        { id: '2022-3', textKey: 'timeline.2022.club_services' }
      ]
    },
    {
      id: '2023', year: '2023', order: 8, isActive: true, icon: 'fa-solid fa-house-medical',
      titleKey: 'timeline.2023.title',
      items: [
        { id: '2023-1', textKey: 'timeline.2023.housing' },
        { id: '2023-2', textKey: 'timeline.2023.partners' },
        { id: '2023-3', textKey: 'timeline.2023.medical' }
      ]
    },
    {
      id: '2024', year: '2024', order: 9, isActive: true, icon: 'fa-solid fa-star',
      titleKey: 'timeline.2024.title',
      items: [
        { id: '2024-1', textKey: 'timeline.2024.amts' },
        { id: '2024-2', textKey: 'timeline.2024.medical_new' },
        { id: '2024-3', textKey: 'timeline.2024.partners' }
      ]
    }
  ];

  const DEFAULT_VALUES = [
    { id: 'equite',    order: 1, isActive: true, icon: 'fa-solid fa-scale-balanced',    titleKey: 'values.equity.title',    descKey: 'values.equity.desc' },
    { id: 'proximite', order: 2, isActive: true, icon: 'fa-solid fa-location-dot',       titleKey: 'values.proximity.title', descKey: 'values.proximity.desc' },
    { id: 'service',   order: 3, isActive: true, icon: 'fa-solid fa-hand-holding-heart', titleKey: 'values.service.title',   descKey: 'values.service.desc' },
    { id: 'inclusion', order: 4, isActive: true, icon: 'fa-solid fa-handshake',          titleKey: 'values.inclusion.title', descKey: 'values.inclusion.desc' }
  ];

  // ----- Data loaders (swap these for real API calls later) -----
  async function loadTimeline() {
    // TODO: dashboard hook — replace with fetch('/api/timeline')
    if (Array.isArray(window.FOSAGRI_TIMELINE_DATA)) return window.FOSAGRI_TIMELINE_DATA;
    return DEFAULT_TIMELINE;
  }
  async function loadValues() {
    // TODO: dashboard hook — replace with fetch('/api/values')
    if (Array.isArray(window.FOSAGRI_VALUES_DATA)) return window.FOSAGRI_VALUES_DATA;
    return DEFAULT_VALUES;
  }

  // ============================================================
  // RENDERERS
  // ============================================================
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function renderTimeline(data, lang) {
    const root = document.getElementById('hmv-timeline');
    if (!root) return;

    if (!Array.isArray(data) || data.length === 0) {
      root.dataset.state = 'empty';
      root.innerHTML = `<li class="hmv-timeline-status" data-hmv-state="empty">${escapeHtml(t('timeline.empty', lang))}</li>`;
      return;
    }

    const active = data
      .filter((e) => e && e.isActive !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (active.length === 0) {
      root.dataset.state = 'empty';
      root.innerHTML = `<li class="hmv-timeline-status" data-hmv-state="empty">${escapeHtml(t('timeline.empty', lang))}</li>`;
      return;
    }

    root.dataset.state = 'ready';
    root.innerHTML = active.map((entry, i) => {
      const side = i % 2 === 1 ? ' is-right' : '';
      const items = (entry.items || []).map((it) =>
        `<li>${escapeHtml(t(it.textKey, lang))}</li>`
      ).join('');
      const iconHtml = entry.icon ? `<i class="${escapeHtml(entry.icon)}" aria-hidden="true"></i>` : '';
      const title = entry.titleKey ? `<h3 class="hmv-card-title">${escapeHtml(t(entry.titleKey, lang))}</h3>` : '';

      return `
        <li class="hmv-timeline-item${side}" data-id="${escapeHtml(entry.id)}">
          <article class="hmv-card">
            <span class="hmv-card-year">${iconHtml}<span>${escapeHtml(entry.year)}</span></span>
            ${title}
            ${items ? `<ul class="hmv-card-items">${items}</ul>` : ''}
          </article>
        </li>`;
    }).join('');
  }

  function renderValues(data, lang) {
    const root = document.getElementById('hmv-values');
    if (!root) return;

    if (!Array.isArray(data) || data.length === 0) {
      root.dataset.state = 'empty';
      root.innerHTML = `<p class="hmv-values-status" data-hmv-state="empty">${escapeHtml(t('values.empty', lang))}</p>`;
      return;
    }

    const active = data
      .filter((v) => v && v.isActive !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (active.length === 0) {
      root.dataset.state = 'empty';
      root.innerHTML = `<p class="hmv-values-status" data-hmv-state="empty">${escapeHtml(t('values.empty', lang))}</p>`;
      return;
    }

    root.dataset.state = 'ready';
    root.innerHTML = `
      <div class="values-cards">
        <article class="page-card values-intro-card">
          <h3>${escapeHtml(t('values.intro.title', lang))}</h3>
          <p>${escapeHtml(t('values.intro.body', lang))}</p>
        </article>

        <div class="values-timeline" aria-label="${escapeHtml(t('sections.values.title', lang))}">
          ${active.map((v) => `
            <article class="page-card timeline-item" id="${escapeHtml(v.id)}" data-id="${escapeHtml(v.id)}">
              <span class="timeline-dot" aria-hidden="true"></span>
              <span class="value-node-icon" aria-hidden="true"><i class="${escapeHtml(v.icon || 'fa-solid fa-circle')}"></i></span>
              <h3>${escapeHtml(t(v.titleKey, lang))}</h3>
              <p>${escapeHtml(t(v.descKey, lang))}</p>
            </article>
          `).join('')}
        </div>
        <img class="values-line-art" src="line.svg" alt="" aria-hidden="true" />
      </div>`;
  }

  // ----- Static text bound by data-hmv-i18n attributes -----
  function applyStaticText(lang) {
    document.title = `FOS-Agri | ${t('page.title', lang)}`;
    document.querySelectorAll('[data-hmv-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.hmvI18n, lang);
    });
    document.querySelectorAll('[data-hmv-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.hmvI18nAria, lang));
    });
  }

  // ============================================================
  // INIT
  // ============================================================
  let cachedTimeline = null;
  let cachedValues   = null;

  async function rerender() {
    const lang = currentLang();
    applyStaticText(lang);
    renderTimeline(cachedTimeline, lang);
    renderValues(cachedValues, lang);
  }

  async function init() {
    const lang = currentLang();
    applyStaticText(lang);

    // Initial loads — both stay independent so a slow one doesn't block the other.
    try {
      cachedTimeline = await loadTimeline();
      renderTimeline(cachedTimeline, currentLang());
    } catch (err) {
      const root = document.getElementById('hmv-timeline');
      if (root) {
        root.dataset.state = 'error';
        root.innerHTML = `<li class="hmv-timeline-status" data-hmv-state="error">${escapeHtml(t('timeline.error'))}</li>`;
      }
      console.error('[FOS-Agri] timeline load failed', err);
    }

    try {
      cachedValues = await loadValues();
      renderValues(cachedValues, currentLang());
    } catch (err) {
      const root = document.getElementById('hmv-values');
      if (root) {
        root.dataset.state = 'error';
        root.innerHTML = `<p class="hmv-values-status" data-hmv-state="error">${escapeHtml(t('values.empty'))}</p>`;
      }
      console.error('[FOS-Agri] values load failed', err);
    }

    // React to language changes performed by secondary-pages.js (which
    // toggles <html lang> + <html dir>). MutationObserver keeps this
    // page decoupled from that file's internal API.
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && (m.attributeName === 'lang' || m.attributeName === 'dir')) {
          rerender();
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

    // Also listen for an explicit cross-script event, if ever dispatched.
    window.addEventListener('fosagri:lang-change', rerender);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public surface for dashboards / debug consoles.
  window.FOSAGRI_HMV = {
    rerender,
    setTimelineData(data) { cachedTimeline = data; rerender(); },
    setValuesData(data)   { cachedValues   = data; rerender(); },
    t
  };
})();
