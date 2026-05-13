(function () {
  'use strict';

  const SUPPORTED = ['fr', 'en', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  const I18N = {
    fr: {
      'governance.pageTitle': 'Gouvernance',
      'governance.hero.kicker': 'Instances de gouvernance',
      'governance.section.title': 'Comites de gouvernance',
      'governance.section.description': "Une organisation claire, avec des instances complementaires de pilotage, d'execution et de controle.",
      'governance.breadcrumb.label': "Fil d'Ariane",
      'governance.breadcrumb.home': 'Accueil',
      'governance.breadcrumb.foundation': 'La Fondation',
      'governance.breadcrumb.governance': 'Gouvernance',
      'governance.intro.paragraph1': 'La FOS-Agri a mis en place tous les outils necessaires a la bonne gouvernance avec des mecanismes de strategies, de gestion et de controle.',
      'governance.intro.paragraph2': 'Elle dispose ainsi de trois instances de gouvernance composees comme suit :',
      'governance.labels.composition': 'Composition',
      'governance.labels.responsibilities': 'Missions',
      'governance.actions.viewComposition': 'Voir la composition',
      'governance.actions.viewResponsibilities': 'Voir les missions',
      'governance.empty.title': 'Aucun comite actif',
      'governance.empty.description': 'Les informations de gouvernance seront publiees bientot.',
      'governance.loading': 'Chargement de la gouvernance...',
      'governance.committees.director.title': 'Comite Directeur',
      'governance.committees.director.compositionIntro': 'Le Comite Directeur est compose de :',
      'governance.committees.director.composition.president': 'La presidente de la FOS-Agri',
      'governance.committees.director.composition.departmentRepresentatives': 'Six representants des structures centrales et regionales du departement de l’agriculture',
      'governance.committees.director.composition.unions': 'Cinq representants des organisations syndicales les plus representatives des adherent(e)s, du departement de l’agriculture',
      'governance.committees.director.composition.financeRepresentative': "Un representant du Ministere charge de l'Economie, des Finances et la reforme de l’administration",
      'governance.committees.director.composition.publicInstitutions': 'Deux representants des etablissements publics sous tutelle du departement de l’agriculture',
      'governance.committees.director.responsibilityIntro': 'Le Comite Directeur est attendu sur toutes les questions relatives au fonctionnement de la Fondation, notamment :',
      'governance.committees.director.responsibilities.internalRules': 'Elaboration du reglement interieur de la fondation',
      'governance.committees.director.responsibilities.staffStatus': 'Preparation des statuts du personnel de la fondation',
      'governance.committees.director.responsibilities.programBudget': "Etablissement du programme d'action annuel ou pluriannuel et arret du budget et les comptes de la Fondation",
      'governance.committees.director.responsibilities.contributionScale': 'Fixation du bareme du montant des cotisations des adherents et arret de la liste des membres',
      'governance.committees.director.responsibilities.conventions': 'Approbation des conventions conclues par la Fondation',
      'governance.committees.executive.title': 'Comite executif',
      'governance.committees.executive.compositionIntro': "Le Comite executif est compose de l'equipe en charge de la mise en oeuvre des actions sociales et de la gestion operationnelle de la fondation, a savoir :",
      'governance.committees.executive.composition.presidency': 'La presidence de la FOS-Agri',
      'governance.committees.executive.composition.secretaryGeneral': 'Le secretariat General',
      'governance.committees.executive.composition.adminFinance': 'La direction administrative et financiere',
      'governance.committees.executive.composition.services': 'La direction des prestations',
      'governance.committees.executive.composition.members': 'La direction des adherents',
      'governance.committees.executive.responsibilityIntro': 'Le comite executif est en charge de :',
      'governance.committees.executive.responsibilities.programs': 'Elaborer les programmes annuels et pluriannuels de la Fondation',
      'governance.committees.executive.responsibilities.tools': 'Mettre en place les outils de gouvernance de la fondation',
      'governance.committees.executive.responsibilities.implementation': "Mettre en oeuvre les composantes des programmes d'action de la FOS-Agri",
      'governance.committees.audit.title': 'Comite Audit',
      'governance.committees.audit.compositionIntro': "Le Comite d'audit est compose de :",
      'governance.committees.audit.composition.financeMinistry': "Un representant du ministere de l'Economie, des Finances et de la reforme de l'Administration",
      'governance.committees.audit.composition.legalAffairs': 'Un representant de la Direction des affaires administratives et Juridiques du departement',
      'governance.committees.audit.composition.departmentFinance': 'Un representant de la Direction des Finances du departement',
      'governance.committees.audit.composition.auditor': 'Le commissaire aux comptes',
      'governance.committees.audit.responsibilityIntro': "Le comite d'audit est en charge du suivi des questions relatives a l'elaboration et au controle des informations comptables et financieres.",
      'governance.committees.audit.responsibilities.followup': "Suivi de l'elaboration des informations comptables et financieres",
      'governance.committees.audit.responsibilities.control': 'Controle de la fiabilite des informations comptables et financieres'
    },
    en: {
      'governance.pageTitle': 'Governance',
      'governance.hero.kicker': 'Governance Bodies',
      'governance.section.title': 'Governance Committees',
      'governance.section.description': 'A clear structure with complementary bodies for steering, execution, and control.',
      'governance.breadcrumb.label': 'Breadcrumb',
      'governance.breadcrumb.home': 'Home',
      'governance.breadcrumb.foundation': 'The Foundation',
      'governance.breadcrumb.governance': 'Governance',
      'governance.intro.paragraph1': 'FOS-Agri has established all the necessary tools for sound governance with strategic, management, and control mechanisms.',
      'governance.intro.paragraph2': 'It therefore has three governance bodies structured as follows:',
      'governance.labels.composition': 'Composition',
      'governance.labels.responsibilities': 'Responsibilities',
      'governance.actions.viewComposition': 'View composition',
      'governance.actions.viewResponsibilities': 'View responsibilities',
      'governance.empty.title': 'No active committee',
      'governance.empty.description': 'Governance information will be published soon.',
      'governance.loading': 'Loading governance...',
      'governance.committees.director.title': 'Steering Committee',
      'governance.committees.director.compositionIntro': 'The Steering Committee is composed of:',
      'governance.committees.director.composition.president': 'The President of FOS-Agri',
      'governance.committees.director.composition.departmentRepresentatives': 'Six representatives of central and regional structures of the agriculture department',
      'governance.committees.director.composition.unions': 'Five representatives of the most representative union organizations of members in the agriculture department',
      'governance.committees.director.composition.financeRepresentative': 'One representative of the Ministry of Economy, Finance and Public Administration Reform',
      'governance.committees.director.composition.publicInstitutions': 'Two representatives of public institutions under the supervision of the agriculture department',
      'governance.committees.director.responsibilityIntro': 'The Steering Committee addresses all issues related to the Foundation operations, including:',
      'governance.committees.director.responsibilities.internalRules': 'Drafting the Foundation internal rules',
      'governance.committees.director.responsibilities.staffStatus': 'Preparing the Foundation staff regulations',
      'governance.committees.director.responsibilities.programBudget': 'Setting annual or multi-year action programs and approving the Foundation budget and accounts',
      'governance.committees.director.responsibilities.contributionScale': 'Setting member contribution scales and approving the member list',
      'governance.committees.director.responsibilities.conventions': 'Approving agreements signed by the Foundation',
      'governance.committees.executive.title': 'Executive Committee',
      'governance.committees.executive.compositionIntro': 'The Executive Committee is composed of the team in charge of social actions implementation and the Foundation operational management:',
      'governance.committees.executive.composition.presidency': 'FOS-Agri Presidency',
      'governance.committees.executive.composition.secretaryGeneral': 'General Secretariat',
      'governance.committees.executive.composition.adminFinance': 'Administrative and Financial Department',
      'governance.committees.executive.composition.services': 'Services Department',
      'governance.committees.executive.composition.members': 'Members Department',
      'governance.committees.executive.responsibilityIntro': 'The Executive Committee is responsible for:',
      'governance.committees.executive.responsibilities.programs': 'Developing annual and multi-year Foundation programs',
      'governance.committees.executive.responsibilities.tools': 'Implementing Foundation governance tools',
      'governance.committees.executive.responsibilities.implementation': 'Implementing the components of FOS-Agri action programs',
      'governance.committees.audit.title': 'Audit Committee',
      'governance.committees.audit.compositionIntro': 'The Audit Committee is composed of:',
      'governance.committees.audit.composition.financeMinistry': 'A representative of the Ministry of Economy, Finance and Administration Reform',
      'governance.committees.audit.composition.legalAffairs': 'A representative of the Department Administrative and Legal Affairs Directorate',
      'governance.committees.audit.composition.departmentFinance': 'A representative of the Department Finance Directorate',
      'governance.committees.audit.composition.auditor': 'The statutory auditor',
      'governance.committees.audit.responsibilityIntro': 'The Audit Committee follows issues related to accounting and financial information development and control.',
      'governance.committees.audit.responsibilities.followup': 'Monitoring the development of accounting and financial information',
      'governance.committees.audit.responsibilities.control': 'Controlling the reliability of accounting and financial information'
    },
    ar: {
      'governance.pageTitle': 'الحكامة',
      'governance.hero.kicker': 'هيئات الحكامة',
      'governance.section.title': 'لجان الحكامة',
      'governance.section.description': 'تنظيم واضح بهيئات متكاملة للتوجيه والتنفيذ والمراقبة.',
      'governance.breadcrumb.label': 'مسار التصفح',
      'governance.breadcrumb.home': 'الرئيسية',
      'governance.breadcrumb.foundation': 'المؤسسة',
      'governance.breadcrumb.governance': 'الحكامة',
      'governance.intro.paragraph1': 'وضعت FOS-Agri جميع الأدوات اللازمة للحكامة الجيدة عبر آليات الإستراتيجية والتدبير والمراقبة.',
      'governance.intro.paragraph2': 'وتتوفر بذلك على ثلاث هيئات للحكامة تتكون كما يلي:',
      'governance.labels.composition': 'التركيبة',
      'governance.labels.responsibilities': 'المهام',
      'governance.actions.viewComposition': 'عرض التركيبة',
      'governance.actions.viewResponsibilities': 'عرض المهام',
      'governance.empty.title': 'لا توجد لجنة نشطة',
      'governance.empty.description': 'ستُنشر معلومات الحكامة قريبا.',
      'governance.loading': 'جاري تحميل الحكامة...',
      'governance.committees.director.title': 'اللجنة المديرة',
      'governance.committees.director.compositionIntro': 'تتكون اللجنة المديرة من:',
      'governance.committees.director.composition.president': 'رئيسة FOS-Agri',
      'governance.committees.director.composition.departmentRepresentatives': 'ستة ممثلين عن الهياكل المركزية والجهوية لقطاع الفلاحة',
      'governance.committees.director.composition.unions': 'خمسة ممثلين عن أكثر المنظمات النقابية تمثيلية للمنخرطين بقطاع الفلاحة',
      'governance.committees.director.composition.financeRepresentative': 'ممثل عن وزارة الاقتصاد والمالية وإصلاح الإدارة',
      'governance.committees.director.composition.publicInstitutions': 'ممثلان عن المؤسسات العمومية تحت وصاية قطاع الفلاحة',
      'governance.committees.director.responsibilityIntro': 'تختص اللجنة المديرة بجميع القضايا المتعلقة بسير عمل المؤسسة، لا سيما:',
      'governance.committees.director.responsibilities.internalRules': 'إعداد النظام الداخلي للمؤسسة',
      'governance.committees.director.responsibilities.staffStatus': 'إعداد النظام الأساسي لموظفي المؤسسة',
      'governance.committees.director.responsibilities.programBudget': 'وضع برنامج العمل السنوي أو متعدد السنوات وحصر ميزانية وحسابات المؤسسة',
      'governance.committees.director.responsibilities.contributionScale': 'تحديد سلم اشتراكات المنخرطين وحصر لائحة الأعضاء',
      'governance.committees.director.responsibilities.conventions': 'المصادقة على الاتفاقيات المبرمة من قبل المؤسسة',
      'governance.committees.executive.title': 'اللجنة التنفيذية',
      'governance.committees.executive.compositionIntro': 'تتكون اللجنة التنفيذية من الفريق المكلف بتفعيل الأعمال الاجتماعية والتدبير العملي للمؤسسة، وتضم:',
      'governance.committees.executive.composition.presidency': 'رئاسة FOS-Agri',
      'governance.committees.executive.composition.secretaryGeneral': 'الكتابة العامة',
      'governance.committees.executive.composition.adminFinance': 'المديرية الإدارية والمالية',
      'governance.committees.executive.composition.services': 'مديرية الخدمات',
      'governance.committees.executive.composition.members': 'مديرية المنخرطين',
      'governance.committees.executive.responsibilityIntro': 'تتكلف اللجنة التنفيذية بـ:',
      'governance.committees.executive.responsibilities.programs': 'إعداد البرامج السنوية ومتعددة السنوات للمؤسسة',
      'governance.committees.executive.responsibilities.tools': 'وضع أدوات الحكامة الخاصة بالمؤسسة',
      'governance.committees.executive.responsibilities.implementation': 'تفعيل مكونات برامج عمل FOS-Agri',
      'governance.committees.audit.title': 'لجنة التدقيق',
      'governance.committees.audit.compositionIntro': 'تتكون لجنة التدقيق من:',
      'governance.committees.audit.composition.financeMinistry': 'ممثل عن وزارة الاقتصاد والمالية وإصلاح الإدارة',
      'governance.committees.audit.composition.legalAffairs': 'ممثل عن مديرية الشؤون الإدارية والقانونية للقطاع',
      'governance.committees.audit.composition.departmentFinance': 'ممثل عن مديرية المالية للقطاع',
      'governance.committees.audit.composition.auditor': 'مراقب الحسابات',
      'governance.committees.audit.responsibilityIntro': 'تتكلف لجنة التدقيق بتتبع القضايا المتعلقة بإعداد ومراقبة المعلومات المحاسبية والمالية.',
      'governance.committees.audit.responsibilities.followup': 'تتبع إعداد المعلومات المحاسبية والمالية',
      'governance.committees.audit.responsibilities.control': 'مراقبة موثوقية المعلومات المحاسبية والمالية'
    },
    zgh: {
      'governance.pageTitle': 'ⵜⴰⴳⵓⵔⵉ',
      'governance.hero.kicker': 'ⵉⵙⵉⵍⵍⴻⵏ ⵏ ⵜⴳⵓⵔⵉ',
      'governance.section.title': 'ⵉⵙⵎⵉⵍⵏ ⵏ ⵜⴳⵓⵔⵉ',
      'governance.section.description': 'ⴰⵙⵎⵎⴰⵍ ⵉⴼⴰⵡⵏ, ⵙ ⵉⵙⵉⵍⵍⴻⵏ ⵉⵎⵎⴰⵙⵙⵏ ⵏ ⵓⵙⵎⵉⵙⵉ ⴷ ⵓⵙⴻⵙⵙⵉⴹ ⴷ ⵓⵙⴻⴽⵎⴻⵎ.',
      'governance.breadcrumb.label': 'ⴰⴱⵔⵉⴷ',
      'governance.breadcrumb.home': 'ⴰⵙⵏⵓⴱⴳ',
      'governance.breadcrumb.foundation': 'ⵜⴰⵎⵙⵙⵓⵔⵜ',
      'governance.breadcrumb.governance': 'ⵜⴰⴳⵓⵔⵉ',
      'governance.intro.paragraph1': 'ⵙⵙⴻⵍⵙⴰ FOS-Agri ⴰⴽⴽⵯ ⵉⵎⴰⵙⵙⵏ ⵉⵍⴰⵇⵏ ⵉ ⵜⴳⵓⵔⵉ ⵜⴰⵎⴰⴹⵍⴰⵏⵜ ⵙ ⵉⵙⵎⵙⵙⵍⵏ ⵏ ⵓⵙⵟⵕⴰⵜⵉⵊⵉ ⴷ ⵓⵙⴱⴷⴷⵉ ⴷ ⵓⵙⴻⴽⵎⴻⵎ.',
      'governance.intro.paragraph2': 'ⵜⵃⴻⵟⵟⵓ ⵙ ⴽⵕⴰⴹ ⵉⵙⵉⵍⵍⴻⵏ ⵏ ⵜⴳⵓⵔⵉ ⴱⴻⵙⵙⴻⴼ ⴰⵎ:',
      'governance.labels.composition': 'ⴰⵙⵎⴰⵏ',
      'governance.labels.responsibilities': 'ⵜⵉⵎⵉⵔⵉⵏ',
      'governance.actions.viewComposition': 'ⵥⵕ ⴰⵙⵎⴰⵏ',
      'governance.actions.viewResponsibilities': 'ⵥⵕ ⵜⵉⵎⵉⵔⵉⵏ',
      'governance.empty.title': 'ⵓⵍⴰ ⴰⵙⵎⵉⵍ ⵉⵍⵍⴰⵏ',
      'governance.empty.description': 'ⴰⴷ ⴷ ⵜⵏⴻⴼⵕⵏ ⵉⵙⴰⵍⵏ ⵏ ⵜⴳⵓⵔⵉ ⵉⵎⵉⴽ.',
      'governance.loading': 'ⴰⵙⴰⵎⵉ ⵏ ⵜⴳⵓⵔⵉ...',
      'governance.committees.director.title': 'ⴰⵙⵎⵉⵍ ⵏ ⵓⵙⵏⵎⵉⵍⵉ',
      'governance.committees.director.compositionIntro': 'ⴰⵙⵎⵉⵍ ⵏ ⵓⵙⵏⵎⵉⵍⵉ ⵉⵙⵎⵓⵏ ⵙⴻⴳ:',
      'governance.committees.director.composition.president': 'ⵜⴰⵙⵍⵡⴰⵢⵜ ⵏ FOS-Agri',
      'governance.committees.director.composition.departmentRepresentatives': 'ⵚⴹⵉⵚ ⵏ ⵉⴳⵏⵙⴰⵙ ⵏ ⵜⵙⵏⵙⵉⵡⵉⵏ ⵜⵉⵎⵎⴰⵙⴰⵏⵉⵏ ⴷ ⵜⵉⵎⵏⴰⴹⵉⵏ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴼⵍⴰⵃⵜ',
      'governance.committees.director.composition.unions': 'ⵙⵎⵎⵓⵙ ⵏ ⵉⴳⵏⵙⴰⵙ ⵏ ⵉⵎⵙⵍⵉⵍⵏ ⵉⵎⴰⴱⴱⵉⵟⵏ ⵏ ⵉⵎⵓⵏⵏ ⴷⴻⴳ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴼⵍⴰⵃⵜ',
      'governance.committees.director.composition.financeRepresentative': 'ⴰⴳⵏⵙⴰⵙ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴷⴰⵎⵙⴰ ⴷ ⵜⵡⴰⵏⵉ ⴷ ⵜⵎⵎⵓⵜⵜⵍⴰ ⵏ ⵜⵏⴱⴹⵉⵜ',
      'governance.committees.director.composition.publicInstitutions': 'ⵙⵉⵏ ⵏ ⵉⴳⵏⵙⴰⵙ ⵏ ⵜⵎⵙⵙⵓⵔⵉⵏ ⵜⵉⵏⴱⴰⵙⵉⵏ ⵙⴷⴷⴰⵡ ⵏ ⵓⴱⴷⴷⵉ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴼⵍⴰⵃⵜ',
      'governance.committees.director.responsibilityIntro': 'ⴰⵙⵎⵉⵍ ⵏ ⵓⵙⵏⵎⵉⵍⵉ ⵉⵟⵟⵓⴼ ⴽⵓⵍ ⵉⵎⵉⵔⵉ ⵏ ⵜⵎⵙⵙⵓⵔⵜ, ⵙ ⵓⵎⴻⵟⵟⴰⵍ:',
      'governance.committees.director.responsibilities.internalRules': 'ⴰⵙⵎⵎⵉⵙⵙⵏ ⵏ ⵓⵍⵓⴳ ⴰⴳⵏⵙⴰⵏ ⵏ ⵜⵎⵙⵙⵓⵔⵜ',
      'governance.committees.director.responsibilities.staffStatus': 'ⴰⵙⵎⵎⵉⵙⵙⵏ ⵏ ⵓⵙⴻⴼⵙⵉ ⵏ ⵉⵎⴰⵙⵙⵏⴻⵏ ⵏ ⵜⵎⵙⵙⵓⵔⵜ',
      'governance.committees.director.responsibilities.programBudget': 'ⴰⵙⴻⵎⵎⴰⵍ ⵏ ⵓⵖⴰⵡⴰⵙ ⵏ ⵜⵉⴽⴽⵉⵏ ⴷ ⵜⵃⵙⴻⴱⵉⵏ ⵏ ⵜⵎⵙⵙⵓⵔⵜ',
      'governance.committees.director.responsibilities.contributionScale': 'ⴰⵙⴻⵎⵎⴰⵍ ⵏ ⵓⵙⴱⴻⵎ ⵏ ⵜⵡⵙⵉⵡⵉⵏ',
      'governance.committees.director.responsibilities.conventions': 'ⴰⵙⴰⴷⴻⵎ ⵏ ⵉⵎⵢⴰⵏ ⵉⵙⵏⵓⵇⴱⵉⵍⵏ ⵙⴳ ⵜⵎⵙⵙⵓⵔⵜ',
      'governance.committees.executive.title': 'ⴰⵙⵎⵉⵍ ⴰⵙⵙⵏⴼⴰⵔⴰⵏ',
      'governance.committees.executive.compositionIntro': 'ⴰⵙⵎⵉⵍ ⴰⵙⵙⵏⴼⴰⵔⴰⵏ ⵉⵙⵎⵓⵏ ⵙⴳ ⵜⴰⴷⴱⴻⵍⵜ ⵏ ⵉⵎⴰⵙⵙⵏⴻⵏ ⵏ ⵜⴻⵎⵙⵙⵓⵔⵜ:',
      'governance.committees.executive.composition.presidency': 'ⵜⴰⵙⵍⵡⵉⵜ ⵏ FOS-Agri',
      'governance.committees.executive.composition.secretaryGeneral': 'ⵜⴰⵏⵎⴰⵍⴰ ⵜⴰⵎⴰⵜⵓⵜ',
      'governance.committees.executive.composition.adminFinance': 'ⵜⴰⵎⵇⵇⵔⴰⵏⵜ ⵜⴰⵏⴱⵉⵜ ⴷ ⵜⴷⵔⵉⵎⵉⵜ',
      'governance.committees.executive.composition.services': 'ⵜⴰⵎⵇⵇⵔⴰⵏⵜ ⵏ ⵜⵏⵓⴼⵉⵡⵉⵏ',
      'governance.committees.executive.composition.members': 'ⵜⴰⵎⵇⵇⵔⴰⵏⵜ ⵏ ⵉⵎⵓⵏⵏ',
      'governance.committees.executive.responsibilityIntro': 'ⴰⵙⵎⵉⵍ ⴰⵙⵙⵏⴼⴰⵔⴰⵏ ⵉⵟⵟⵓⴼ:',
      'governance.committees.executive.responsibilities.programs': 'ⴰⵙⵎⵎⵉⵙⵙⵏ ⵏ ⵉⵖⴰⵡⴰⵙⵏ ⵉⵙⴻⴳⴳⵯⴰⵙⴰⵏⴻⵏ',
      'governance.committees.executive.responsibilities.tools': 'ⴰⵙⵍⴰⵍ ⵏ ⵉⵎⴰⵙⵙⵏⴻⵏ ⵏ ⵜⴳⵓⵔⵉ',
      'governance.committees.executive.responsibilities.implementation': 'ⴰⵙⵎⵉⴽⵉ ⵏ ⵉⵖⴰⵡⴰⵙⵏ ⵏ FOS-Agri',
      'governance.committees.audit.title': 'ⴰⵙⵎⵉⵍ ⵏ ⵓⴷⴷⵉⵇ',
      'governance.committees.audit.compositionIntro': 'ⴰⵙⵎⵉⵍ ⵏ ⵓⴷⴷⵉⵇ ⵉⵙⵎⵓⵏ ⵙⴳ:',
      'governance.committees.audit.composition.financeMinistry': 'ⴰⴳⵏⵙⴰⵙ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴷⴰⵎⵙⴰ ⴷ ⵜⵡⴰⵏⵉ',
      'governance.committees.audit.composition.legalAffairs': 'ⴰⴳⵏⵙⴰⵙ ⵏ ⵜⵎⵇⵇⵔⴰⵏⵜ ⵏ ⵜⵎⴰⴹⵍⴰⵏⵉⵏ ⵜⵉⵏⴱⵉⵏ ⴷ ⵜⵉⵣⵔⴼⴰⵏⵉⵏ',
      'governance.committees.audit.composition.departmentFinance': 'ⴰⴳⵏⵙⴰⵙ ⵏ ⵜⵎⵇⵇⵔⴰⵏⵜ ⵏ ⵜⴷⵔⵉⵎⵉⵏ',
      'governance.committees.audit.composition.auditor': 'ⴰⵎⴻⵙⵙⴻⴽⵎⴻⵎ ⵏ ⵉⵃⵙⴻⴱⵉⵏ',
      'governance.committees.audit.responsibilityIntro': 'ⴰⵙⵎⵉⵍ ⵏ ⵓⴷⴷⵉⵇ ⵉⴹⴼⴰⵕ ⵉⵎⵉⵔⵉⵏ ⵉⵏⵏⵉⵎⵏⴻⵏ ⵙ ⵓⵙⵎⵎⵉⵙⵙⵏ ⴷ ⵓⵙⴽⵎⵎⴻⵎ ⵏ ⵉⵙⴰⵍⵏ ⵉⵃⵙⴻⴱⴰⵏⴻⵏ ⴷ ⵉⴷⵔⵉⵎⴰⵏⴻⵏ.',
      'governance.committees.audit.responsibilities.followup': 'ⴰⴹⴼⴰⵕ ⵏ ⵓⵙⵎⵎⵉⵙⵙⵏ ⵏ ⵉⵙⴰⵍⵏ ⵉⵃⵙⴻⴱⴰⵏⴻⵏ ⴷ ⵉⴷⵔⵉⵎⴰⵏⴻⵏ',
      'governance.committees.audit.responsibilities.control': 'ⴰⵙⴽⵎⵎⴻⵎ ⵏ ⵜⵎⴰⵙⵙⵉⵏⵜ ⵏ ⵉⵙⴰⵍⵏ ⵉⵃⵙⴻⴱⴰⵏⴻⵏ ⴷ ⵉⴷⵔⵉⵎⴰⵏⴻⵏ'
    }
  };

  const DEFAULT_COMMITTEES = [
    {
      id: 'comite-directeur',
      number: '01',
      order: 1,
      isActive: true,
      titleKey: 'governance.committees.director.title',
      introKey: 'governance.committees.director.compositionIntro',
      compositionKeys: [
        'governance.committees.director.composition.president',
        'governance.committees.director.composition.departmentRepresentatives',
        'governance.committees.director.composition.unions',
        'governance.committees.director.composition.financeRepresentative',
        'governance.committees.director.composition.publicInstitutions'
      ],
      responsibilityIntroKey: 'governance.committees.director.responsibilityIntro',
      responsibilityKeys: [
        'governance.committees.director.responsibilities.internalRules',
        'governance.committees.director.responsibilities.staffStatus',
        'governance.committees.director.responsibilities.programBudget',
        'governance.committees.director.responsibilities.contributionScale',
        'governance.committees.director.responsibilities.conventions'
      ],
      colorVariant: 'gold',
      icon: 'users'
    },
    {
      id: 'comite-executif',
      number: '02',
      order: 2,
      isActive: true,
      titleKey: 'governance.committees.executive.title',
      introKey: 'governance.committees.executive.compositionIntro',
      compositionKeys: [
        'governance.committees.executive.composition.presidency',
        'governance.committees.executive.composition.secretaryGeneral',
        'governance.committees.executive.composition.adminFinance',
        'governance.committees.executive.composition.services',
        'governance.committees.executive.composition.members'
      ],
      responsibilityIntroKey: 'governance.committees.executive.responsibilityIntro',
      responsibilityKeys: [
        'governance.committees.executive.responsibilities.programs',
        'governance.committees.executive.responsibilities.tools',
        'governance.committees.executive.responsibilities.implementation'
      ],
      colorVariant: 'teal',
      icon: 'briefcase'
    },
    {
      id: 'comite-audit',
      number: '03',
      order: 3,
      isActive: true,
      titleKey: 'governance.committees.audit.title',
      introKey: 'governance.committees.audit.compositionIntro',
      compositionKeys: [
        'governance.committees.audit.composition.financeMinistry',
        'governance.committees.audit.composition.legalAffairs',
        'governance.committees.audit.composition.departmentFinance',
        'governance.committees.audit.composition.auditor'
      ],
      responsibilityIntroKey: 'governance.committees.audit.responsibilityIntro',
      responsibilityKeys: [
        'governance.committees.audit.responsibilities.followup',
        'governance.committees.audit.responsibilities.control'
      ],
      colorVariant: 'neutral',
      icon: 'shield-halved'
    }
  ];

  const ICONS = {
    users: 'fa-solid fa-users',
    briefcase: 'fa-solid fa-briefcase',
    'shield-halved': 'fa-solid fa-shield-halved'
  };

  function currentLang() {
    const htmlLang = document.documentElement.lang;
    if (SUPPORTED.includes(htmlLang)) return htmlLang;
    const stored = localStorage.getItem('fosagri-lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  function normalizeLang(lang) {
    if (SUPPORTED.includes(lang)) return lang;
    return DEFAULT_LANG;
  }

  function t(key, lang) {
    const l = normalizeLang(lang || currentLang());
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

  function accentColor(variant) {
    if (variant === 'teal') return 'var(--green)';
    if (variant === 'neutral') return '#4e5554';
    return 'var(--gold)';
  }

  async function loadGovernanceData() {
    // TODO: Replace with future dashboard/API call:
    // const response = await fetch('/api/governance/committees');
    // return await response.json();
    if (Array.isArray(window.FOSAGRI_GOVERNANCE_COMMITTEES)) {
      return window.FOSAGRI_GOVERNANCE_COMMITTEES;
    }
    return DEFAULT_COMMITTEES;
  }

  function renderEmptyState(root, lang) {
    root.dataset.state = 'empty';
    root.innerHTML = (
      '<article class="gov-status-card" data-gov-state="empty">' +
      '<h3>' + escapeHtml(t('governance.empty.title', lang)) + '</h3>' +
      '<p>' + escapeHtml(t('governance.empty.description', lang)) + '</p>' +
      '</article>'
    );
  }

  function renderCommitteeCard(committee, lang) {
    const accent = accentColor(committee.colorVariant);
    const iconClass = ICONS[committee.icon] || 'fa-solid fa-circle-info';
    const compositionList = (committee.compositionKeys || [])
      .map(function (key) { return '<li>' + escapeHtml(t(key, lang)) + '</li>'; })
      .join('');
    const responsibilitiesList = (committee.responsibilityKeys || [])
      .map(function (key) { return '<li>' + escapeHtml(t(key, lang)) + '</li>'; })
      .join('');

    return (
      '<article class="gov-card" style="--committee-accent:' + accent + '">' +
        '<header class="gov-card-head">' +
          '<span class="gov-card-number">' + escapeHtml(committee.number || '') + '</span>' +
          '<h3 class="gov-card-title">' + escapeHtml(t(committee.titleKey, lang)) + '</h3>' +
          '<span class="gov-card-icon" aria-hidden="true"><i class="' + escapeHtml(iconClass) + '"></i></span>' +
        '</header>' +
        '<div class="gov-card-body">' +
          '<div class="gov-block">' +
            '<button class="gov-toggle" type="button" aria-expanded="false" data-target="composition-' + escapeHtml(committee.id) + '">' +
              '<span>' + escapeHtml(t('governance.actions.viewComposition', lang)) + '</span>' +
              '<i class="fa-solid fa-chevron-down" aria-hidden="true"></i>' +
            '</button>' +
            '<div class="gov-block-content" id="composition-' + escapeHtml(committee.id) + '">' +
              '<h4 class="gov-block-title">' + escapeHtml(t('governance.labels.composition', lang)) + '</h4>' +
              '<p class="gov-block-intro">' + escapeHtml(t(committee.introKey, lang)) + '</p>' +
              '<ul class="gov-list">' + compositionList + '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="gov-block">' +
            '<button class="gov-toggle" type="button" aria-expanded="false" data-target="responsibilities-' + escapeHtml(committee.id) + '">' +
              '<span>' + escapeHtml(t('governance.actions.viewResponsibilities', lang)) + '</span>' +
              '<i class="fa-solid fa-chevron-down" aria-hidden="true"></i>' +
            '</button>' +
            '<div class="gov-block-content" id="responsibilities-' + escapeHtml(committee.id) + '">' +
              '<h4 class="gov-block-title">' + escapeHtml(t('governance.labels.responsibilities', lang)) + '</h4>' +
              '<p class="gov-block-intro">' + escapeHtml(t(committee.responsibilityIntroKey, lang)) + '</p>' +
              '<ul class="gov-list">' + responsibilitiesList + '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initMobileToggles(root) {
    const isMobile = window.matchMedia('(max-width: 760px)').matches;
    const toggles = root.querySelectorAll('.gov-toggle');
    toggles.forEach(function (button) {
      const panel = root.querySelector('#' + button.dataset.target);
      if (!panel) return;

      if (!isMobile) {
        panel.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        return;
      }

      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.onclick = function () {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
      };
    });
  }

  function applyStaticText(lang) {
    document.title = 'FOS-Agri | ' + t('governance.pageTitle', lang);
    document.querySelectorAll('[data-gov-i18n]').forEach(function (el) {
      el.textContent = t(el.dataset.govI18n, lang);
    });
    document.querySelectorAll('[data-gov-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.dataset.govI18nAria, lang));
    });
  }

  let cachedCommittees = [];

  function render(lang) {
    const root = document.getElementById('gov-grid');
    if (!root) return;

    const activeCommittees = (cachedCommittees || [])
      .filter(function (item) { return item && item.isActive !== false; })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

    if (!activeCommittees.length) {
      renderEmptyState(root, lang);
      return;
    }

    root.dataset.state = 'ready';
    root.innerHTML = activeCommittees.map(function (committee) {
      return renderCommitteeCard(committee, lang);
    }).join('');
    initMobileToggles(root);
  }

  async function init() {
    const lang = currentLang();
    applyStaticText(lang);

    try {
      cachedCommittees = await loadGovernanceData();
      render(lang);
    } catch (error) {
      console.error('[FOS-Agri] governance load failed', error);
      renderEmptyState(document.getElementById('gov-grid'), lang);
    }

    const observer = new MutationObserver(function (mutations) {
      for (let i = 0; i < mutations.length; i += 1) {
        if (mutations[i].type === 'attributes' &&
          (mutations[i].attributeName === 'lang' || mutations[i].attributeName === 'dir')) {
          const nextLang = currentLang();
          applyStaticText(nextLang);
          render(nextLang);
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

    window.addEventListener('resize', function () {
      render(currentLang());
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
