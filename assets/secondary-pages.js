// Secondary pages only. This file is not loaded by index.html.
// It keeps all inner pages aligned with the validated home page navigation style.
(function () {
  const root = document.documentElement;
  const body = document.body;
  const supported = ['fr', 'ar', 'zgh'];
  const saved = localStorage.getItem('fosagri-lang');
  let lang = supported.includes(saved) ? saved : 'fr';
  const explicitBase = body?.dataset?.base;
  const isNested = window.location.pathname.includes('/services/');
  const base = typeof explicitBase === 'string' && explicitBase.length ? explicitBase : (isNested ? '../' : '');
  let footerTemplatePromise = null;

  const nav = {
    fr: {
      home: 'Accueil', foundation: 'La Fondation', services: 'Prestations', adhesion: 'Adhésion', mediatheque: 'Médiathèque', news: 'Actualités',
      events: 'Agenda solidaire', contact: 'Contact', member: 'Espace adhérent', footerAbout: 'Fondation pour la promotion des oeuvres sociales du personnel du ministere de l\'agriculture.',
      usefulTitle: 'Liens utiles', quickTitle: 'Acces rapide', contactTitle: 'Coordonnees', copy: '© 2026 FOS-Agri - Ministère de l\'Agriculture',
      useful1: 'Appels d\'offres', useful2: 'FAQ', useful3: 'Newsletter', quick1: 'Portail agent', quick2: 'Programme social', quick3: 'Actualites',
      minister: 'Mot du Ministre', president: 'Mot du Président', history: 'Histoire, mission et valeurs', values: 'Nos valeurs', organization: 'Notre organisation', governance: 'Gouvernance',
      prevoyance: 'Prévoyance médico-sociale', culture: 'Culture, loisirs et voyages', scolarisation: 'Scolarisation et formation', logement: 'Accès au logement', projets: 'Projets personnels', education: 'Éducation et culture',
      adherents: 'Nos adhérents & bénéficiaires', procedure: 'Procédure d’adhésion', cotisations: 'Cotisations',
      media2017: 'Galerie 2017', media2018: 'Galerie 2018', media2019: 'Galerie 2019', media2020: 'Galerie 2020',
      coordinates: 'Coordonnées', regional: 'Relais régionaux', social: 'Réseaux sociaux',
      search: 'Rechercher', searchPlaceholder: 'Rechercher sur FOS-Agri…', searchHint: 'Échap pour fermer',
      searchEmpty: 'Aucun résultat. Essayez un autre mot-clé.', searchStart: 'Commencez à taper pour voir les résultats…',
      brandSubtitle: 'Ministère de l\'Agriculture', langLabel: 'Langue', langMenuLabel: 'Choix de langue',
      navLabel: 'Navigation principale', submenuLabel: 'Sous-menu',
      memberClose: 'Fermer',
      /* Hero sections — secondary pages */
      adhesionKicker: 'Adhésion', adhesionTitle: 'Adhérents, bénéficiaires et procédures',
      adhesionBody: 'Conditions d\'adhésion, pièces à fournir et cotisations de la Fondation.',
      adh_activeTitle: 'Personnel en activité',
      adh_activeBody: 'Le personnel actif du Département de l\'Agriculture est adhérent d\'office, avec activation par les pièces justificatives.',
      adh_orgsTitle: 'Organismes sous tutelle',
      adh_orgsBody: 'Adhésion après signature de la convention liant la FOS-Agri et l\'administration de l\'établissement concerné.',
      adh_retraitesTitle: 'Retraités',
      adh_retraitesBody: 'Adhésion possible après validation du prélèvement mensuel auprès de la CMR et dépôt des documents requis.',
      adh_procedureTitle: 'Procédure d\'adhésion',
      adh_proc1: 'Fiche d\'adhésion.',
      adh_proc2: 'Bulletin individuel d\'adhésion.',
      adh_proc3: 'Chèque barré ou RIB.',
      adh_proc4: 'Pièces justificatives des conjoints et enfants.',
      adh_proc5: 'Autorisation de précompte pour les futurs retraités.',
      adh_dlTitle: 'Téléchargements',
      adh_dlBody: 'Les liens de téléchargement seront ajoutés après réception ou validation des formulaires officiels.',
      adh_ctaOrient: 'Demander une orientation',
      adh_cotTitle: 'Cotisations',
      adh_cotBody: 'Les catégories et montants seront présentés dans un tableau validé par FOS-Agri.',
      adh_ctaRelais: 'Relais régionaux',

      mediathequeKicker: 'Médiathèque', mediathequeTitle: 'Galeries et archives FOS-Agri',
      mediathequeBody: 'Photos et archives organisées par année et par rubrique.',
      med_seePhotos: 'Voir les photos',
      med_2017_1: 'Colonie', med_2017_2: 'Journée de la femme', med_2017_3: 'Coaching scolaire',
      med_2018_1: 'Cérémonie', med_2018_2: 'Colonie', med_2018_3: 'Omra', med_2018_4: 'Salon du cheval', med_2018_5: 'SIAM', med_2018_6: 'Coaching',
      med_2019_1: 'Coaching scolaire', med_2019_2: 'Colonie', med_2019_3: 'Omra', med_2019_4: 'Salon du cheval', med_2019_5: 'Journée de la femme', med_2019_6: 'SIAM',
      med_2020_1: 'Coaching scolaire', med_2020_2: 'Omra',
      med_orgTitle: 'Organisation future',
      med_orgBody: 'Les albums réels pourront être ajoutés après réception des images validées.',

      actualitesKicker: 'Centre d\'information', actualitesTitle: 'Actualités de la Fondation',
      actualitesBody: 'Annonces, conventions, campagnes et programmes sociaux.',
      act_card1Date: 'Programme 2025', act_card1Title: 'Vacances et loisirs',
      act_card1Body: 'Présentation des programmes de vacances, loisirs et accompagnement familial.',
      act_card2Date: 'Convention', act_card2Title: 'Partenariats médicaux',
      act_card2Body: 'Mise en avant des conventions médico-sociales au profit des adhérents.',
      act_card3Date: 'Opération sociale', act_card3Title: 'Omra 2025',
      act_card3Body: 'Information et accompagnement des bénéficiaires concernés par les opérations sociales.',
      act_editTitle: 'Organisation éditoriale',
      act_editBody: 'Cette page peut recevoir les actualités validées par le client : titre, date, image, résumé et détail.',
      act_nextTitle: 'Prochaine étape',
      act_nextBody: 'Après validation, chaque actualité pourra avoir sa propre page statique.',

      agendaKicker: 'Agenda solidaire', agendaTitle: 'Programmes et événements à venir',
      agendaBody: 'Calendrier des activités sociales, culturelles et de solidarité.',
      ag_1Title: 'Campagnes d\'information régionales',
      ag_1Body: 'Rencontres de proximité pour informer les adhérents sur les prestations, l\'adhésion et les nouveautés.',
      ag_2Title: 'Opérations sociales saisonnières',
      ag_2Body: 'Vacances, loisirs, scolarisation, Omra et accompagnement des familles selon le calendrier validé.',
      ag_3Title: 'Conventions et partenariats',
      ag_3Body: 'Annonce des nouvelles conventions médicales, éducatives, financières ou de loisirs.',
      ag_upcomingTitle: 'Événements à venir',
      ag_upcomingBody: 'Cette zone peut recevoir les prochains rendez-vous validés par l\'équipe FOS-Agri.',
      ag_archivesTitle: 'Archives',
      ag_archivesBody: 'Les événements passés peuvent être classés par année, catégorie ou région.',

      contactKicker: 'Contact & relais', contactTitle: 'Contacter FOS-Agri',
      contactBody: 'Coordonnées, adresse et carte de localisation de la Fondation.',
      ctc_emailTitle: 'Email', ctc_phoneTitle: 'Téléphone', ctc_addressTitle: 'Adresse',
      ctc_address: '461, Avenue Hassan II, Agdal - Rabat',
      ctc_relaisTitle: 'Relais régionaux',
      ctc_relaisBody: 'Cette zone est prévue pour organiser les contacts régionaux, responsables, horaires et informations pratiques après validation du client.',
      ctc_relais1: 'Coordonnées régionales',
      ctc_relais2: 'Informations d\'accueil',
      ctc_relais3: 'Demandes d\'orientation',
      ctc_demandesTitle: 'Demandes adhérents',
      ctc_demandesBody: 'Pour la démonstration Phase 1, cette page reste statique. Les formulaires dynamiques seront ajoutés seulement après validation de la Phase 2.',
      ctc_socialTitle: 'Réseaux sociaux',
      ctc_socialBody: 'Retrouvez FOS-Agri sur nos canaux officiels pour suivre les actualités, événements et témoignages de la communauté.'
    },
    ar: {
      home: 'الرئيسية', foundation: 'المؤسسة', services: 'الخدمات', adhesion: 'الانخراط', mediatheque: 'الخزانة الرقمية', news: 'المستجدات',
      events: 'الأجندة التضامنية', contact: 'اتصل بنا', member: 'فضاء المنخرط', footerAbout: 'مؤسسة النهوض بالأعمال الاجتماعية لموظفي وزارة الفلاحة.',
      usefulTitle: 'روابط مفيدة', quickTitle: 'ولوج سريع', contactTitle: 'بيانات الاتصال', copy: '© 2026 فوس-أكري - وزارة الفلاحة',
      useful1: 'طلبات العروض', useful2: 'الأسئلة الشائعة', useful3: 'النشرة الإخبارية', quick1: 'بوابة الموظف', quick2: 'البرنامج الاجتماعي', quick3: 'المستجدات',
      minister: 'كلمة الوزير', president: 'كلمة الرئيس', history: 'التاريخ، المهمة والقيم', values: 'قيمنا', organization: 'تنظيمنا', governance: 'الحكامة والتنظيم',
      prevoyance: 'الوقاية الطبية الاجتماعية', culture: 'الثقافة والترفيه والأسفار', scolarisation: 'الدراسة والتكوين', logement: 'الولوج إلى السكن', projets: 'المشاريع الشخصية', education: 'التربية والثقافة',
      adherents: 'المنخرطون والمستفيدون', procedure: 'مسطرة الانخراط', cotisations: 'الاشتراكات',
      media2017: 'صور 2017', media2018: 'صور 2018', media2019: 'صور 2019', media2020: 'صور 2020',
      coordinates: 'المعلومات', regional: 'المنسقون الجهويون', social: 'الشبكات الاجتماعية',
      search: 'بحث', searchPlaceholder: 'ابحث في موقع FOS-Agri…', searchHint: 'إسكاب للإغلاق',
      searchEmpty: 'لا توجد نتائج. جرّب كلمة أخرى.', searchStart: 'ابدأ الكتابة لعرض النتائج…',
      brandSubtitle: 'وزارة الفلاحة', langLabel: 'اللغة', langMenuLabel: 'اختيار اللغة',
      navLabel: 'التنقل الرئيسي', submenuLabel: 'قائمة فرعية',
      memberClose: 'إغلاق',
      adhesionKicker: 'الانخراط', adhesionTitle: 'المنخرطون والمستفيدون والمساطر',
      adhesionBody: 'شروط الانخراط، الوثائق المطلوبة، والاشتراكات الخاصة بالمؤسسة.',
      adh_activeTitle: 'الموظفون العاملون',
      adh_activeBody: 'الموظفون العاملون بوزارة الفلاحة منخرطون تلقائيا، ويتم تفعيل الانخراط عبر الوثائق المطلوبة.',
      adh_orgsTitle: 'المؤسسات تحت الوصاية',
      adh_orgsBody: 'الانخراط بعد توقيع اتفاقية بين FOS-Agri وإدارة المؤسسة المعنية.',
      adh_retraitesTitle: 'المتقاعدون',
      adh_retraitesBody: 'يمكن الانخراط بعد تفعيل الاقتطاع الشهري لدى الصندوق المغربي للتقاعد وتقديم الوثائق المطلوبة.',
      adh_procedureTitle: 'مسطرة الانخراط',
      adh_proc1: 'بطاقة الانخراط.',
      adh_proc2: 'نشرة فردية للانخراط.',
      adh_proc3: 'شيك مسطر أو رقم الحساب البنكي.',
      adh_proc4: 'وثائق إثبات الأزواج والأبناء.',
      adh_proc5: 'إذن بالاقتطاع للمتقاعدين المرتقبين.',
      adh_dlTitle: 'تحميلات',
      adh_dlBody: 'ستضاف روابط التحميل بعد توصل أو المصادقة على الاستمارات الرسمية.',
      adh_ctaOrient: 'طلب التوجيه',
      adh_cotTitle: 'الاشتراكات',
      adh_cotBody: 'ستعرض الفئات والمبالغ في جدول مصادق عليه من قبل FOS-Agri.',
      adh_ctaRelais: 'المنسقون الجهويون',

      mediathequeKicker: 'الخزانة الرقمية', mediathequeTitle: 'معارض وأرشيف FOS-Agri',
      mediathequeBody: 'الصور والأرشيف مرتبة حسب السنة والقسم.',
      med_seePhotos: 'مشاهدة الصور',
      med_2017_1: 'مخيم', med_2017_2: 'اليوم العالمي للمرأة', med_2017_3: 'التأطير المدرسي',
      med_2018_1: 'حفل', med_2018_2: 'مخيم', med_2018_3: 'العمرة', med_2018_4: 'معرض الفرس', med_2018_5: 'SIAM', med_2018_6: 'التأطير',
      med_2019_1: 'التأطير المدرسي', med_2019_2: 'مخيم', med_2019_3: 'العمرة', med_2019_4: 'معرض الفرس', med_2019_5: 'اليوم العالمي للمرأة', med_2019_6: 'SIAM',
      med_2020_1: 'التأطير المدرسي', med_2020_2: 'العمرة',
      med_orgTitle: 'التنظيم المستقبلي',
      med_orgBody: 'يمكن إضافة الألبومات الحقيقية بعد توصل الصور المصادق عليها.',

      actualitesKicker: 'مركز المعلومات', actualitesTitle: 'مستجدات المؤسسة',
      actualitesBody: 'الإعلانات، الاتفاقيات، الحملات والبرامج الاجتماعية.',
      act_card1Date: 'برنامج 2025', act_card1Title: 'العطل والترفيه',
      act_card1Body: 'تقديم برامج العطل والترفيه ومرافقة الأسر.',
      act_card2Date: 'اتفاقية', act_card2Title: 'الشراكات الطبية',
      act_card2Body: 'إبراز الاتفاقيات الطبية الاجتماعية لصالح المنخرطين.',
      act_card3Date: 'عملية اجتماعية', act_card3Title: 'عمرة 2025',
      act_card3Body: 'إعلام ومرافقة المستفيدين المعنيين بالعمليات الاجتماعية.',
      act_editTitle: 'التنظيم التحريري',
      act_editBody: 'يمكن لهذه الصفحة أن تستقبل المستجدات المصادق عليها: العنوان، التاريخ، الصورة، الملخص والتفاصيل.',
      act_nextTitle: 'الخطوة القادمة',
      act_nextBody: 'بعد المصادقة، يمكن لكل خبر أن يحظى بصفحة ثابتة خاصة به.',

      agendaKicker: 'الأجندة التضامنية', agendaTitle: 'برامج وفعاليات قادمة',
      agendaBody: 'روزنامة الأنشطة الاجتماعية والثقافية والتضامنية.',
      ag_1Title: 'حملات إعلامية جهوية',
      ag_1Body: 'لقاءات قرب لإخبار المنخرطين بالخدمات والانخراط والمستجدات.',
      ag_2Title: 'العمليات الاجتماعية الموسمية',
      ag_2Body: 'العطل، الترفيه، التمدرس، العمرة ومرافقة الأسر وفق الروزنامة المصادق عليها.',
      ag_3Title: 'الاتفاقيات والشراكات',
      ag_3Body: 'الإعلان عن الاتفاقيات الطبية والتربوية والمالية والترفيهية الجديدة.',
      ag_upcomingTitle: 'فعاليات قادمة',
      ag_upcomingBody: 'يمكن لهذه الزاوية أن تستقبل المواعيد القادمة المصادق عليها من طرف فريق FOS-Agri.',
      ag_archivesTitle: 'الأرشيف',
      ag_archivesBody: 'يمكن تصنيف الفعاليات الماضية حسب السنة، الفئة أو الجهة.',

      contactKicker: 'اتصل ومنسقون', contactTitle: 'اتصل بـ FOS-Agri',
      contactBody: 'المعلومات والعنوان وخريطة موقع المؤسسة.',
      ctc_emailTitle: 'البريد الإلكتروني', ctc_phoneTitle: 'الهاتف', ctc_addressTitle: 'العنوان',
      ctc_address: '461، شارع الحسن الثاني، أكدال - الرباط',
      ctc_relaisTitle: 'المنسقون الجهويون',
      ctc_relaisBody: 'هذه المنطقة مخصصة لتنظيم جهات الاتصال الجهوية والمسؤولين والمواقيت والمعلومات العملية بعد مصادقة العميل.',
      ctc_relais1: 'المعلومات الجهوية',
      ctc_relais2: 'معلومات الاستقبال',
      ctc_relais3: 'طلبات التوجيه',
      ctc_demandesTitle: 'طلبات المنخرطين',
      ctc_demandesBody: 'في إطار العرض التجريبي للمرحلة 1، تبقى هذه الصفحة ثابتة. ستضاف الاستمارات التفاعلية بعد المصادقة على المرحلة 2.',
      ctc_socialTitle: 'الشبكات الاجتماعية',
      ctc_socialBody: 'تابعوا FOS-Agri عبر قنواتنا الرسمية للاطلاع على المستجدات والفعاليات وشهادات المجتمع.'
    },
    zgh: {
      home: 'ⴰⵙⵏⵓⴱⴳ', foundation: 'ⵜⴰⵎⵙⵙⵓⵔⵜ', services: 'ⵜⵉⵏⴼⴰⵙ', adhesion: 'ⴰⵎⵓⵏ', mediatheque: 'ⵜⴰⵎⵓⵙⵙⵏⴰ', news: 'ⵉⵙⴰⵍⵏ',
      events: 'ⴰⴳⵏⴷⴰ ⵏ ⵜⴰⵏⴼⴰ', contact: 'ⴰⵏⴰⵔⵎⵙ', member: 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵏⵖⵓⵔ', footerAbout: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵓⵙⵙⴼⵍⴷ ⵏ ⵉⴳⵓⵍⵏ ⵉⵏⵎⴰⵍⴰⵏ ⵏ ⵓⵎⴷⴰⵏ ⵏ ⵜⴰⵎⴰⵣⵔⵜ ⵏ ⵜⴼⵍⴰⵃⵜ.',
      usefulTitle: 'ⵉⵙⵖⵡⴰⵏ ⵉⵏⴼⴰⵏ', quickTitle: 'ⴰⴽⵛⵛⵓⵎ ⴰⵣⵔⴰⵡ', contactTitle: 'ⵉⵙⴰⵍⵏ ⵏ ⵓⵎⵢⴰⵡⴰⴹ', copy: '© 2026 FOS-Agri - ⵜⴰⵎⴰⵣⵔⵜ ⵏ ⵜⴼⵍⴰⵃⵜ',
      useful1: 'ⵜⵉⵙⵓⵜⵔⴰ ⵏ ⵜⵉⵙⵎⵙⴽⴰⵍ', useful2: 'FAQ', useful3: 'ⴰⵙⴳⴳⵯⴰⵙ ⵏ ⵓⵎⵉⵏⵉⴷ', quick1: 'ⵜⴰⴱⵓⵔⵜ ⵏ ⵓⵎⵙⴽⴰⵔ', quick2: 'ⴰⵙⵏⴰⵎⴰⵍ ⴰⵏⵎⴰⵍⴰⵏ', quick3: 'ⵉⵎⵉⵏⵉⴷⵏ',
      minister: 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵏⵣⴰⵡ', president: 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ', history: 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵙⵜ ⴷ ⵉⵎⴰⵙⵙⴰⵏ', values: 'ⵜⵉⵏⵉⵍⴰ', organization: 'ⵜⴰⵙⵏⵙⵙⵓⴷⵙⵜ ⵏⵏⵖ', governance: 'ⵜⴰⴳⵓⵔⵉ ⴷ ⵜⵎⵙⵙⵓⴷⵙⵜ',
      prevoyance: 'ⵜⴰⴼⵔⴰⵙⵜ ⵜⴰⴷⴰⵡⵙⴰⵏⵜ', culture: 'ⵜⴰⴷⵍⵙⴰ, ⴰⵙⴰⵢⵔⴰⵔ ⴷ ⵉⵙⵉⴽⵍⵏ', scolarisation: 'ⴰⵙⴳⵎⵉ ⴷ ⵜⵙⴳⵎⵉ', logement: 'ⴰⴽⵛⵓⵎ ⵖⵔ ⵜⴰⴷⴷⴰⵔⵜ', projets: 'ⵉⵙⵏⴼⴰⵔⵏ ⵉⵎⴰⵏⴰⵡⵏ', education: 'ⴰⵙⴳⵎⵉ ⴷ ⵜⴷⵍⵙⴰ',
      adherents: 'ⵉⵎⵓⵏⵏ ⴷ ⵉⵎⵙⴼⵔⴽⵏ', procedure: 'ⵜⴰⵎⵙⵙⴰⵔⵜ ⵏ ⵓⵎⵓⵏ', cotisations: 'ⵜⵉⵡⵙⵉⵡⵉⵏ',
      media2017: 'ⵜⴰⵡⵍⴰⴼⵜ 2017', media2018: 'ⵜⴰⵡⵍⴰⴼⵜ 2018', media2019: 'ⵜⴰⵡⵍⴰⴼⵜ 2019', media2020: 'ⵜⴰⵡⵍⴰⴼⵜ 2020',
      coordinates: 'ⵉⵙⴰⵍⵏ', regional: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ', social: 'ⵉⵥⴹⵡⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ',
      search: 'ⴰⵔⵣⵣⵓ', searchPlaceholder: 'ⵔⵣⵣⵓ ⴷⴻⴳ FOS-Agri…', searchHint: 'ⵙⵏⵙ ⵙ Échap',
      searchEmpty: 'ⵓⵍⴰ ⴰⵔⵔⴰⵙⵎ. ⴰⵔⵎ ⴰⵡⴰⵍ ⵏⵏⵉⴹⵏ.', searchStart: 'ⵙⵏⵜⵉ ⴰⴷ ⵜⴻⵜⵉ ⵉ ⵉⴽⴻⴽ ⵉⴰⵔⵎ…',
      brandSubtitle: 'ⵜⴰⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴼⵍⴰⵃⵜ', langLabel: 'ⵜⵓⵜⵍⴰⵢⵜ', langMenuLabel: 'ⴰⴼⵔⴰⵏ ⵏ ⵜⵓⵜⵍⴰⵢⵜ',
      navLabel: 'ⴰⵙⵓⴷⴷⵓ ⴰⵎⴰⵟⵟⴰⵍ', submenuLabel: 'ⴰⵙⵓⴷⴷⵓ ⴰⴷⴷⴰⵢ',
      memberClose: 'ⵙⵏⵙ',
      adhesionKicker: 'ⴰⵎⵓⵏ', adhesionTitle: 'ⵉⵎⵓⵏⵏ, ⵉⵎⵙⴼⵔⴽⵏ ⴷ ⵜⵎⵙⵙⴰⵔⵉⵏ',
      adhesionBody: 'ⵜⵉⵎⴻⵍⵍⵓⵙⵉⵏ ⵏ ⵓⵎⵓⵏ ⴷ ⵜⵉⵡⵙⵉⵡⵉⵏ ⵏ ⵜⵎⵙⵙⵓⵔⵜ.',
      adh_activeTitle: 'ⵉⵎⵇⵇⵔⴰⵏⴻⵏ ⵉⵜⵜⵓⵙⴽⴰⵔⵏ',
      adh_activeBody: 'ⵉⵎⵇⵇⵔⴰⵏⴻⵏ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴼⵍⴰⵃⵜ ⴷ ⵉⵎⵓⵏⵏ ⵙ ⵉⵎⵉⴽ.',
      adh_orgsTitle: 'ⵜⵉⵎⵙⵙⵓⵔⵉⵏ ⵙⴷⴷⴰⵡ ⵏ ⵓⴱⴷⴷⵉ',
      adh_orgsBody: 'ⴰⵎⵓⵏ ⴷⴻⴼⴼⵉⵔ ⵏ ⵓⵙⵉⵔⵎ ⵏ ⵓⵎⵢⴰⴽ.',
      adh_retraitesTitle: 'ⵉⵎⴰⵙⵙⵉⵏⴻⵏ',
      adh_retraitesBody: 'ⴰⵎⵓⵏ ⴷ ⵉⵣⵎⵔⵏ ⴷⴻⴼⴼⵉⵔ ⵏ ⵓⵙⴻⴼⵙⵉ ⵏ ⵜⵡⵙⵉⵡⵜ ⵏ ⵓⵢⵢⵓⵔ.',
      adh_procedureTitle: 'ⵜⴰⵎⵙⵙⴰⵔⵜ ⵏ ⵓⵎⵓⵏ',
      adh_proc1: 'ⵜⴰⴽⴰⵔⴹⴰ ⵏ ⵓⵎⵓⵏ.',
      adh_proc2: 'ⵜⴰⵏⴰⵙⵙⵉⵎⵜ ⵜⴰⵎⴰⵏⴰⵡⵜ ⵏ ⵓⵎⵓⵏ.',
      adh_proc3: 'ⵛⵉⴽ ⵉⵙⵎⴻⵟⵟⴻⵔⵏ ⵏⵉⵖ RIB.',
      adh_proc4: 'ⵉⵎⴰⵙⵙⵉⵏⴻⵏ ⵏ ⵉⵙⵍⵉⵡⵉⵏ ⴷ ⵉⵙⴻⵍⵎⵉ.',
      adh_proc5: 'ⴰⴷⵓⴼ ⵏ ⵓⵙⴻⴽⵙⴻⵎ ⵉ ⵉⵎⴰⵙⵙⵉⵏⴻⵏ.',
      adh_dlTitle: 'ⵉⵙⵉⴹⵏⴻⵏ',
      adh_dlBody: 'ⴰⴷ ⴷ ⵉⵙⵙⴻⵎⵎⴰⵍ ⴰⵏⴰⵎⵉ ⵏ ⵉⵙⵉⴹⵏⴻⵏ ⴷⴻⴼⴼⵉⵔ ⵏ ⵓⵙⵉⵔⵎ.',
      adh_ctaOrient: 'ⴰⵙⵙⵓⵎⵔ ⵏ ⵜⵉⵏⴰⵙⵜ',
      adh_cotTitle: 'ⵜⵉⵡⵙⵉⵡⵉⵏ',
      adh_cotBody: 'ⴰⴷ ⵙⴽⵉⵏⵜ ⵜⵏⵙⵙⴰⵏⵉⵏ ⴷ ⵉⴹⵕⵉⵚⴻⵏ ⴷⴻⴳ ⵓⵙⴻⴼⵙⵉ.',
      adh_ctaRelais: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ',

      mediathequeKicker: 'ⵜⴰⵎⵓⵙⵙⵏⴰ', mediathequeTitle: 'ⵜⵉⵡⵍⴰⴼⵉⵏ ⴷ ⵜⵏⵙⵙⴰⵏⵉⵏ ⵏ FOS-Agri',
      mediathequeBody: 'ⵜⵉⵡⵍⴰⴼⵉⵏ ⴷ ⵜⵏⵙⵙⴰⵏⵉⵏ ⴱⵟⵟⵓⵏⵜ ⵙ ⵓⵙⴳⴳⵯⴰⵙ ⴷ ⵜⵙⵏⵙⵙⵓⴷⵙⵜ.',
      med_seePhotos: 'ⵥⵕ ⵜⵉⵡⵍⴰⴼⵉⵏ',
      med_2017_1: 'ⴽⵓⵍⵓⵏⵉ', med_2017_2: 'ⴰⵙⵙ ⵏ ⵜⵎⴻⵟⵟⵓⵟ', med_2017_3: 'ⴽⵓⵛⵉⵏⴳ ⵏ ⵜⵉⵎⴰⵙⴰⵏ',
      med_2018_1: 'ⵜⴰⵎⵖⵔⴰ', med_2018_2: 'ⴽⵓⵍⵓⵏⵉ', med_2018_3: 'ⵍⵄⵎⵕⴰ', med_2018_4: 'ⵙⴰⵍⵓⵏ ⵏ ⵉⵢⵉⵙⴰⵏ', med_2018_5: 'SIAM', med_2018_6: 'ⴽⵓⵛⵉⵏⴳ',
      med_2019_1: 'ⴽⵓⵛⵉⵏⴳ ⵏ ⵜⵉⵎⴰⵙⴰⵏ', med_2019_2: 'ⴽⵓⵍⵓⵏⵉ', med_2019_3: 'ⵍⵄⵎⵕⴰ', med_2019_4: 'ⵙⴰⵍⵓⵏ ⵏ ⵉⵢⵉⵙⴰⵏ', med_2019_5: 'ⴰⵙⵙ ⵏ ⵜⵎⴻⵟⵟⵓⵟ', med_2019_6: 'SIAM',
      med_2020_1: 'ⴽⵓⵛⵉⵏⴳ ⵏ ⵜⵉⵎⴰⵙⴰⵏ', med_2020_2: 'ⵍⵄⵎⵕⴰ',
      med_orgTitle: 'ⴰⵙⴻⴳⵎⵉ ⵏ ⵓⵎⴻⴹⴹⵕⵓⵇ',
      med_orgBody: 'ⵉⵍⴱⵓⵎⴰⵜ ⵉⴷⴰⵎⵏⴻⵏ ⴰⴷ ⵜⵜⵓⵙⵙⴽⴰⵏ ⴷⴻⴼⴼⵉⵔ ⵏ ⵓⵙⴻⴼⵙⵉ.',

      actualitesKicker: 'ⵜⴰⵎⴻⵍⵍⴰⵍⵜ ⵏ ⵉⵙⴰⵍⵏ', actualitesTitle: 'ⵉⵙⴰⵍⵏ ⵏ ⵜⵎⵙⵙⵓⵔⵜ',
      actualitesBody: 'ⵉⵙⵉⵡⵍⵏ, ⵉⵎⵢⴰⴽⵏ, ⴰⴽⴽⵯ ⴷ ⵉⵖⴰⵡⴰⵙⵏ ⵉⵏⴰⵎⵓⵏⵏ.',
      act_card1Date: 'ⴰⵖⴰⵡⴰⵙ 2025', act_card1Title: 'ⵜⵉⴽⴽⵉⵏ ⴷ ⵓⵙⴰⵢⵔⴰⵔ',
      act_card1Body: 'ⴰⵙⵏⵓⵍⴼⵓ ⵏ ⵉⵖⴰⵡⴰⵙⵏ ⵏ ⵜⵉⴽⴽⵉⵏ ⴷ ⵓⵙⴰⵢⵔⴰⵔ.',
      act_card2Date: 'ⵉⵎⵢⴰⵏ', act_card2Title: 'ⵉⵎⵢⴰⵏ ⵉⵙⵏⵓⵇⴱⵉⵍⵏ',
      act_card2Body: 'ⴰⵙⵙⴽⴰⵏ ⵏ ⵉⵎⵢⴰⵏ ⵉⵙⵏⵓⵇⴱⵉⵍⵏ ⵉⵎⵓⵙⵏⴰⵎⵉⵏ.',
      act_card3Date: 'ⵜⵉⵏⵓⴼⵉⵡⵉⵏ', act_card3Title: 'ⵍⵄⵎⵕⴰ 2025',
      act_card3Body: 'ⵜⴰⵎⵓⵍⵉⵜ ⴷ ⵜⵎⴻⴷⵍⴰ ⵏ ⵉⵎⵉⴼⴽⵏ ⵉⵎⴻⵏⵏⵉⵜⵏ.',
      act_editTitle: 'ⴰⵙⴻⴳⵎⵉ ⵏ ⵉⵙⴰⵍⵏ',
      act_editBody: 'ⵜⵙⴻⵏⵟⵉ ⵜⵉⴼⴰⵡⵜ ⴰⴷ ⵜⵙⵙⴻⵟⵟⵕ ⵉⵙⴰⵍⵏ ⵉⵎⵙⵙⴰⵏⴻⵏ: ⴰⵣⵡⴻⵍ, ⴰⵎⵉⴹⵉ, ⵜⴰⵡⵍⴰⴼⵜ.',
      act_nextTitle: 'ⴰⵙⵓⵔⴻⴼ ⵉⴳⴻⵔ',
      act_nextBody: 'ⴷⴻⴼⴼⵉⵔ ⵓⵙⴻⴼⵙⵉ, ⴽⵓⵍ ⴰⴽⴰⵍⴻⵏ ⴰⴷ ⵉⵙⴻⵎⵎⴰⵍ ⵙ ⵜⵉⴼⴰⵡⵜ ⵏⵏⵙ.',

      agendaKicker: 'ⴰⴳⵏⴷⴰ ⵏ ⵜⴰⵏⴼⴰ', agendaTitle: 'ⵉⵖⴰⵡⴰⵙⵏ ⴷ ⵜⴻⵎⵍⵍⵉⵍⵉⵏ ⴷ ⵉⵜⴻⴷⴷⵓⵏ',
      agendaBody: 'ⴰⵙⵙⴻⴷⵎⵎⴻⵔ ⵏ ⵜⵏⵓⴼⵉⵡⵉⵏ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ, ⵜⵉⴷⴻⵍⵙⴰⵏⵉⵏ ⴷ ⵜⵉⵏ ⵜⴰⵏⴼⴰ.',
      ag_1Title: 'ⵜⵉⴼⴰⵙⵉⵏ ⵏ ⵓⵙⵙⴻⴷⵎⴻⵔ ⵉⵎⵏⴰⴹⵏ',
      ag_1Body: 'ⵜⵉⵎⵍⵉⵍⵉⵏ ⵜⴰⵅⴰⵜⴰⵔⵉⵏ ⴰⴷ ⵜⵙⵙⵏⴻⵎⵏ ⵉⵎⵓⵏⵏ ⵙ ⵜⵏⵓⴼⵉⵡⵉⵏ.',
      ag_2Title: 'ⵜⵉⵏⵓⴼⵉⵡⵉⵏ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ ⵏ ⵉⴽⵓⴷⵏ',
      ag_2Body: 'ⵜⵉⴽⴽⵉⵏ, ⴰⵙⴰⵢⵔⴰⵔ, ⴰⵙⴻⴳⵎⵉ, ⵍⵄⵎⵕⴰ.',
      ag_3Title: 'ⵉⵎⵢⴰⵏ ⴷ ⵉⵎⴻⵙⴱⴰⴹⴻⵏ',
      ag_3Body: 'ⴰⵙⴻⵎⵎⴰⵍ ⵏ ⵉⵎⵢⴰⵏ ⵉⵎⴰⵢⵏⵓⵜⴻⵏ.',
      ag_upcomingTitle: 'ⵜⵉⵎⵍⵍⵉⵍⵉⵏ ⵉⴷⴷⴰⵏ',
      ag_upcomingBody: 'ⴰⴷ ⵜⵉⵎⵍⵍⵉⵍⵉⵏ ⵉⴷⴷⴰⵏ ⵏ ⵜⴽⴱⴱⴰⵏⵜ ⵏ FOS-Agri.',
      ag_archivesTitle: 'ⵜⵏⵙⵙⴰⵏⵉⵏ',
      ag_archivesBody: 'ⵜⵉⵎⵍⵍⵉⵍⵉⵏ ⵉⵣⵔⵉⵏ ⴰⴷ ⵜⵜⴱⵟⵟⵓⵏⵜ ⵙ ⵓⵙⴳⴳⵯⴰⵙ.',

      contactKicker: 'ⴰⵏⴰⵔⵎⵙ ⴷ ⵉⵎⵙⵏⴰⵡⵏ', contactTitle: 'ⴰⵏⴰⵔⵎⵙ ⵉ FOS-Agri',
      contactBody: 'ⵉⵙⴰⵍⵏ, ⴰⵏⵙⴰ ⴷ ⵜⴻⴽⴰⵕⵟⴰ ⵏ ⵓⵏⵙⴰ ⵏ ⵜⵎⵙⵙⵓⵔⵜ.',
      ctc_emailTitle: 'ⵉⵎⴰⵢⵍ', ctc_phoneTitle: 'ⴰⵟⵉⵍⵉⴼⵓⵏ', ctc_addressTitle: 'ⴰⵏⵙⴰ',
      ctc_address: '461, ⴰⵙⴰⵔⴰⴳ ⵏ Hassan II, ⴰⴳⴷⴰⵍ - ⴰⵕⴱⴰⵟ',
      ctc_relaisTitle: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ',
      ctc_relaisBody: 'ⵜⴰⵅⵅⴰⵎⵜ ⴰⴷ ⵉ ⵓⵙⵎⵎⴰⵍ ⵏ ⵉⵏⴰⵔⵎⴰⵙⵏ ⵉⵎⵏⴰⴹⵏ.',
      ctc_relais1: 'ⵉⵙⴰⵍⵏ ⵉⵎⵏⴰⴹⵏ',
      ctc_relais2: 'ⵉⵙⴰⵍⵏ ⵏ ⵓⵙⵏⵓⴱⴳ',
      ctc_relais3: 'ⵉⵙⵓⵎⵔⵏ ⵏ ⵜⵉⵏⴰⵙⵜ',
      ctc_demandesTitle: 'ⵉⵙⵓⵎⵔⵏ ⵏ ⵉⵎⵓⵏⵏ',
      ctc_demandesBody: 'ⵜⵉⴼⴰⵡⵜ ⴰ ⵜⴻⵇⵇⵉⵎ ⵜⵉⵙⵟⵟⴰⵇⵉⵟ.',
      ctc_socialTitle: 'ⵉⵥⴹⵡⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ',
      ctc_socialBody: 'ⴰⴹⴼⴰⵕ FOS-Agri ⴷⴻⴳ ⵉⵇⴻⵏⴰⵍⴻⵏ ⵏⵏⴻⵖ ⵉⵎⴰⵏⴰⵡⵏ.'
    }
  };

  /* ── Site-wide search index ──────────────────────────
     Used by the in-menu live search. Each entry has a
     translated title/description and a target URL. */
  const extra = {
    fr: {
      'brand.subtitle': "Ministere de l'agriculture",
      'footer.about': "Fondation pour la promotion des oeuvres sociales du personnel du ministere de l'agriculture.",
      'footer.usefulTitle': 'Liens utiles',
      'footer.useful1': "Appels d'offres",
      'footer.useful2': 'FAQ',
      'footer.useful3': 'Newsletter',
      'footer.quickTitle': 'Acces rapide',
      'footer.quick1': 'Portail agent',
      'footer.quick2': 'Programme social',
      'footer.quick3': 'Actualites',
      'footer.contactTitle': 'Coordonnees',
      'footer.copy': "© 2026 FOS-Agri - Ministere de l'Agriculture",
      'footer.credit': "Powered by <a href='https://neonovia.com/' target='_blank' rel='noopener noreferrer'>NEONOVIA</a>",
      'contact.phone1': '+212 5 37 77 47 48',
      'contact.address': '461 Avenue Hassan II, Agdal - Rabat',
      foundationHeroKicker: 'Fondation pour la Promotion des Oeuvres Sociales',
      foundationHeroTitle: "La Fondation au service de la famille du Ministere de l'Agriculture",
      foundationHeroBody: "Une page institutionnelle dediee a la mission, aux valeurs, a la gouvernance et a l'histoire de FOS-Agri, dans la meme identite visuelle que la page d'accueil.",
      foundationMissionTitle: 'Mission',
      foundationMissionBody: 'Accompagner, soutenir et valoriser les femmes et les hommes du secteur agricole a travers des prestations sociales de proximite.',
      foundationValuesTitle: 'Valeurs',
      foundationValuesBody: 'Solidarite, proximite, transparence, ecoute et amelioration continue des services destines aux adherents et a leurs familles.',
      foundationMinisterBody: "Message institutionnel du Ministre sur la vision sociale et l'engagement de la Fondation FOS-Agri.",
      foundationMinisterLink: 'Decouvrir le mot du Ministre →',
      foundationPresidentBody: "Message institutionnel du President sur la gouvernance, la proximite et le developpement des services de la Fondation.",
      foundationPresidentLink: 'Decouvrir le mot du President →',
      foundationGovernanceBody: "Presentation de l'organisation, des instances et de l'organigramme de la Fondation.",
      foundationGovernanceLink: 'Decouvrir la gouvernance →',
      foundationBandTitle: 'Construire les pages depuis la version validee',
      foundationBandBody: "Cette page est separee de l'accueil : elle garde le meme menu, le meme footer et les memes langues sans modifier la home page.",
      foundationBandCta: 'Retour accueil',
      prestationsHeroKicker: 'Catalogue des prestations',
      prestationsHeroTitle: 'Les services sociaux FOS-Agri',
      prestationsHeroBody: "Une page separee pour organiser toutes les prestations sans toucher a la page d'accueil validee.",
      prestationsCard1Title: 'Prevoyance medico-sociale',
      prestationsCard1Body: 'Centre medico-social, assurance maladie complementaire, assistance medicale, transport sanitaire et partenariats medicaux.',
      prestationsCard2Title: 'Culture, loisirs et voyages',
      prestationsCard2Body: 'Voyages, colonies, Omra, pelerinage, ceremonies et conventions de loisirs.',
      prestationsCard3Title: 'Scolarisation et formation',
      prestationsCard3Body: "Coaching scolaire, bourses d'excellence, primes de rentree et conventions educatives.",
      prestationsCard4Title: 'Acces au logement',
      prestationsCard4Body: 'Aide au logement, offres bancaires preferentielles, promoteurs immobiliers et projets logement.',
      prestationsCard5Title: 'Projets personnels',
      prestationsCard5Body: 'Credits sociaux, institutions financieres, partenariats subventionnes et tarifs preferentiels.',
      prestationsCard6Title: 'Adhesion & accompagnement',
      prestationsCard6Body: "Informations adherents, beneficiaires, retraites, cotisations et orientation vers l'espace adherent.",
      prestationsDetailLink: 'Voir details',
      prestationsBandTitle: 'Besoin d une prestation precise ?',
      prestationsBandBody: "Le contact et les relais regionaux seront detailles dans les prochaines pages, sans modifier l'accueil.",
      prestationsBandCta: 'Nous contacter'
    },
    ar: {
      'brand.subtitle': 'وزارة الفلاحة',
      'footer.about': 'مؤسسة النهوض بالأعمال الاجتماعية لموظفي وزارة الفلاحة.',
      'footer.usefulTitle': 'روابط مفيدة',
      'footer.useful1': 'طلبات العروض',
      'footer.useful2': 'الأسئلة الشائعة',
      'footer.useful3': 'النشرة الإخبارية',
      'footer.quickTitle': 'ولوج سريع',
      'footer.quick1': 'فضاء المنخرط',
      'footer.quick2': 'البرنامج الاجتماعي',
      'footer.quick3': 'المستجدات',
      'footer.contactTitle': 'البيانات',
      'footer.copy': '© 2026 FOS-Agri - وزارة الفلاحة',
      'footer.credit': "Powered by <a href='https://neonovia.com/' target='_blank' rel='noopener noreferrer'>NEONOVIA</a>",
      'contact.phone1': '+212 5 37 77 47 48',
      'contact.address': '461 شارع الحسن الثاني، أكدال - الرباط',
      foundationHeroKicker: 'مؤسسة النهوض بالأعمال الاجتماعية',
      foundationHeroTitle: 'المؤسسة في خدمة أسرة وزارة الفلاحة',
      foundationHeroBody: 'صفحة مؤسساتية مخصصة للمهمة والقيم والحكامة وتاريخ FOS-Agri، مع الحفاظ على نفس الهوية البصرية للصفحة الرئيسية.',
      foundationMissionTitle: 'المهمة',
      foundationMissionBody: 'مواكبة ودعم وتثمين نساء ورجال القطاع الفلاحي من خلال خدمات اجتماعية للقرب.',
      foundationValuesTitle: 'القيم',
      foundationValuesBody: 'التضامن والقرب والشفافية والإنصات والتحسين المستمر للخدمات الموجهة للمنخرطين وأسرهم.',
      foundationMinisterBody: 'رسالة مؤسساتية من الوزير حول الرؤية الاجتماعية والتزام مؤسسة FOS-Agri.',
      foundationMinisterLink: 'اكتشف كلمة الوزير ←',
      foundationPresidentBody: 'رسالة مؤسساتية من الرئيس حول الحكامة والقرب وتطوير خدمات المؤسسة.',
      foundationPresidentLink: 'اكتشف كلمة الرئيس ←',
      foundationGovernanceBody: 'تقديم تنظيم المؤسسة وهيئاتها ومخططها التنظيمي.',
      foundationGovernanceLink: 'اكتشف الحكامة ←',
      foundationBandTitle: 'بناء الصفحات انطلاقا من النسخة المعتمدة',
      foundationBandBody: 'هذه الصفحة مستقلة عن الرئيسية: تحتفظ بنفس القائمة ونفس التذييل ونفس اللغات دون تعديل الصفحة الرئيسية.',
      foundationBandCta: 'العودة إلى الرئيسية',
      prestationsHeroKicker: 'دليل الخدمات',
      prestationsHeroTitle: 'الخدمات الاجتماعية لـ FOS-Agri',
      prestationsHeroBody: 'صفحة مستقلة لتنظيم كل الخدمات دون المساس بالصفحة الرئيسية المعتمدة.',
      prestationsCard1Title: 'الاحتياط الطبي والاجتماعي',
      prestationsCard1Body: 'مركز طبي اجتماعي، تأمين صحي تكميلي، مساعدة طبية، نقل صحي وشراكات طبية.',
      prestationsCard2Title: 'الثقافة والترفيه والأسفار',
      prestationsCard2Body: 'أسفار، مخيمات، عمرة، حج، حفلات واتفاقيات ترفيه.',
      prestationsCard3Title: 'التمدرس والتكوين',
      prestationsCard3Body: 'مواكبة مدرسية، منح الاستحقاق، منح الدخول المدرسي واتفاقيات تربوية.',
      prestationsCard4Title: 'الولوج إلى السكن',
      prestationsCard4Body: 'دعم السكن، عروض بنكية تفضيلية، منعشون عقاريون ومشاريع سكن.',
      prestationsCard5Title: 'المشاريع الشخصية',
      prestationsCard5Body: 'قروض اجتماعية، مؤسسات مالية، شراكات مدعمة وتعريفات تفضيلية.',
      prestationsCard6Title: 'الانخراط والمواكبة',
      prestationsCard6Body: 'معلومات المنخرطين والمستفيدين والمتقاعدين والاشتراكات والتوجيه نحو فضاء المنخرط.',
      prestationsDetailLink: 'عرض التفاصيل',
      prestationsBandTitle: 'هل تحتاج إلى خدمة محددة؟',
      prestationsBandBody: 'سيتم تفصيل معلومات الاتصال والمنسقين الجهويين في الصفحات القادمة دون تغيير الصفحة الرئيسية.',
      prestationsBandCta: 'اتصل بنا'
    },
    zgh: {
      'brand.subtitle': 'ⵜⴰⵎⴰⵣⴰⵔⵜ ⵏ ⵜⴼⵍⴰⵃⵜ',
      'footer.about': 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⵏⵀⵓⵔⵜ ⵙ ⵡⵓⵎⴰⵍ ⵏ ⵉⵎⵙⵙⵓⵔⴰ ⵏ ⵜⴰⵎⴰⵣⴰⵔⵜ ⵏ ⵜⴼⵍⴰⵃⵜ.',
      'footer.usefulTitle': 'ⵉⵙⵖⵡⴰⵏ ⵉⵏⴼⴰⵏ',
      'footer.useful1': 'ⵉⵙⵙⵓⵜⵔⵏ ⵏ ⵓⴼⴰⵔⵙ',
      'footer.useful2': 'ⵜⵉⵙⵇⵙⵉⵏ ⵉⵜⵜⵓⵙⵜⴰⵢⵏ',
      'footer.useful3': 'ⵜⴰⴱⵔⴰⵜ ⵏ ⵓⵙⴰⵏ',
      'footer.quickTitle': 'ⴰⴽⵛⵛⵓⵎ ⴰⵣⵔⴰⵡ',
      'footer.quick1': 'ⴰⵙⵏⵓⴱⴳ ⵏ ⵓⵎⵏⵅⵔⴰⵟ',
      'footer.quick2': 'ⴰⵀⵉⵍ ⴰⵎⴰⴷⴰⵏ',
      'footer.quick3': 'ⵉⵙⴰⵍⵏ',
      'footer.contactTitle': 'ⵉⵙⴰⵍⵏ',
      'footer.copy': '© 2026 FOS-Agri - ⵜⴰⵎⴰⵣⴰⵔⵜ ⵏ ⵜⴼⵍⴰⵃⵜ',
      'footer.credit': "Powered by <a href='https://neonovia.com/' target='_blank' rel='noopener noreferrer'>NEONOVIA</a>",
      'contact.phone1': '+212 5 37 77 47 48',
      'contact.address': '461 Avenue Hassan II, Agdal - Rabat',
      foundationHeroKicker: 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⵏⵀⵓⵔⵜ ⵙ ⵡⵓⵎⴰⵍ',
      foundationHeroTitle: 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⴳ ⵓⵎⵍⵉⵍ ⵏ ⵜⵡⵊⴰ ⵏ ⵜⴰⵎⴰⵣⴰⵔⵜ ⵏ ⵜⴼⵍⴰⵃⵜ',
      foundationHeroBody: 'ⵜⴰⵙⵏⴰ ⵜⴰⵎⴰⵙⵙⵓⵔⵜ ⵉ ⵜⵎⴰⵡⵉⵜ ⴷ ⵜⵉⵏⵉⵍⴰ ⴷ ⵜⴰⴳⵡⵔⴰⵏⵙⴰ ⴷ ⵓⵎⵣⵔⵓⵢ ⵏ FOS-Agri, ⵙ ⵢⴰⵏ ⵓⵙⴷⴰⵡ ⵏ ⵓⵙⵏⴼⴰⵍ ⵏ ⵜⴰⵙⵏⴰ ⵏ ⵜⵣⵡⴰⵔⵓⵜ.',
      foundationMissionTitle: 'ⵜⴰⵎⴰⵡⵉⵜ',
      foundationMissionBody: 'ⴰⵎⵓⴷⴷⵓ ⴷ ⵓⵙⵙⵉⵙⵏ ⴷ ⵓⵙⵎⵉⵔⵏ ⵏ ⵢⵉⵎⴷⴷⵓⴽⴰⵍ ⵏ ⵓⵙⴳⵔ ⵏ ⵜⴼⵍⴰⵃⵜ ⵙ ⵜⵎⴰⴷⵉⵡⵉⵏ ⵜⵉⵎⴰⴷⴰⵏⵉⵏ ⵏ ⵓⵣⵉⵟ.',
      foundationValuesTitle: 'ⵜⵉⵏⵉⵍⴰ',
      foundationValuesBody: 'ⵜⴰⴷⵓⵙⵉ, ⴰⵣⵉⵟ, ⵜⴰⴼⴰⵡⵉⵏⵜ, ⴰⵙⵍⵍⵉⵙ ⴷ ⵓⵙⴼⵔⴽ ⴰⵎⵔⴽⵉⵙ ⵏ ⵜⵎⴰⴷⵉⵡⵉⵏ.',
      foundationMinisterBody: 'ⴰⵣⵡⴰⵍ ⴰⵎⴰⵙⵙⵓⵔ ⵏ ⵓⵎⵉⵏⵉⵙⵜⵔ ⵅⴼ ⵜⵉⵣⵉ ⵜⵉⵎⴰⴷⴰⵏⵜ ⴷ ⵓⵣⴷⴰⵢ ⵏ FOS-Agri.',
      foundationMinisterLink: 'ⵙⵙⵏ ⴰⵡⴰⵍ ⵏ ⵓⵎⵉⵏⵉⵙⵜⵔ ←',
      foundationPresidentBody: 'ⴰⵣⵡⴰⵍ ⴰⵎⴰⵙⵙⵓⵔ ⵏ ⵓⵙⵍⵍⵉⵙ ⵅⴼ ⵜⴰⴳⵡⵔⴰⵏⵙⴰ ⴷ ⵓⵣⵉⵟ ⴷ ⵓⵙⴼⵔⴽ ⵏ ⵜⵎⴰⴷⵉⵡⵉⵏ.',
      foundationPresidentLink: 'ⵙⵙⵏ ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵍⵉⵙ ←',
      foundationGovernanceBody: 'ⴰⵙⵙⴰⵏⴼ ⵏ ⵜⵙⵓⴷⴷⵓⵔⵜ ⵏ ⵜⵎⵙⵙⵓⵔⵜ ⴷ ⵉⵙⵎⴷⵢⴰⵜⵏ ⵏⵏⵙ.',
      foundationGovernanceLink: 'ⵙⵙⵏ ⵜⴰⴳⵡⵔⴰⵏⵙⴰ ←',
      foundationBandTitle: 'ⴰⵙⴱⴷⴷ ⵏ ⵜⵉⵙⵏⴰⵜⵉⵏ ⵙⴳ ⵜⵏⵖⵓⵍⵜ ⵉⵜⵜⵓⵙⵎⵖⵔⵜ',
      foundationBandBody: 'ⵜⴰⵙⵏⴰ ⴰⴷ ⵜⴱⵓⵕⵉ ⵙⴳ ⵜⵣⵡⴰⵔⵓⵜ: ⵜⵜⴰⵡⵉ ⵢⴰⵜ ⵜⵉⵏⵉⵍⴰ ⵏ ⵓⵎⵓⵏⵓ ⴷ ⵓⴼⵓⵜⵔ ⴷ ⵜⵓⵜⵍⴰⵢⵉⵏ.',
      foundationBandCta: 'ⵓⵖⴰⵍ ⵖⵔ ⵜⵣⵡⴰⵔⵓⵜ',
      prestationsHeroKicker: 'ⴼⵀⵔⵙ ⵏ ⵜⵎⴰⴷⵉⵡⵉⵏ',
      prestationsHeroTitle: 'ⵜⵉⵎⴰⴷⵉⵡⵉⵏ ⵜⵉⵎⴰⴷⴰⵏⵉⵏ ⵏ FOS-Agri',
      prestationsHeroBody: 'ⵜⴰⵙⵏⴰ ⵢⴰⴹⵏ ⵉ ⵓⵙⴷⵓⵙ ⵏ ⴽⵕⴰⴹ ⵜⵎⴰⴷⵉⵡⵉⵏ ⵡⴰⵔ ⴰⴷ ⵜⵜⵓⵙⵏⴼⵍ ⵜⵣⵡⴰⵔⵓⵜ.',
      prestationsCard1Title: 'ⴰⵏⴰⵎⵎⴰⵍ ⴰⵎⴰⴷⴰⵏ ⴷ ⴰⵏⴰⵎⵎⴰⵍ ⵏ ⵓⴳⵔⴰⵡ',
      prestationsCard1Body: 'ⴰⵎⵎⴰⵙ ⴰⵎⴰⴷⴰⵏ, ⴰⵙⵙⵓⵔⵏ ⴰⵎⴰⴷⴰⵏ ⴰⵙⴽⵓⵙⵉ, ⴰⵎⵓⴷⴷⵓ ⴰⵎⴰⴷⴰⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⵎⴰⴷⴰⵏⵏ.',
      prestationsCard2Title: 'ⵜⴰⴷⵍⵙⴰ, ⴰⵙⴰⵢⴰⵕ ⴷ ⵉⵙⵉⴽⵍ',
      prestationsCard2Body: 'ⵉⵙⵉⴽⵍ, ⵉⵅⵉⵎⵏ, ⵄⵓⵎⵔⴰ, ⵍⵃⵊ, ⵜⵉⵎⵀⵍⵉⵏ ⴷ ⵉⵙⴳⴳⵯⴰⵙⵏ ⵏ ⵓⵙⴰⵢⴰⵕ.',
      prestationsCard3Title: 'ⴰⵙⵍⵎⴷ ⴷ ⵓⵙⴼⵔⴽ',
      prestationsCard3Body: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵍⵎⴷ, ⵜⵉⵎⴰⵔⴰⵡⵉⵏ ⵏ ⵓⵎⵔⴰⵔⵉ, ⵜⵉⵎⵓⵔⵙⵉⵏ ⵏ ⵜⴽⵛⵛⵓⵎⵜ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⵙⵍⵎⴷⴰⵏ.',
      prestationsCard4Title: 'ⴰⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⵖⵉⵎ',
      prestationsCard4Body: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵖⵉⵎ, ⵜⵉⵙⵓⵎⴰⵔ ⵜⵉⴱⴰⵏⴽⵉⵢⵉⵏ ⵉⴼⵔⵏⴰⵏ, ⵉⵎⵏⵄⵛⵏ ⵉⵎⵎⵓⵔⵉⵢⵏ ⴷ ⵉⵎⵙⴰⵍⵏ ⵏ ⵓⵙⵖⵉⵎ.',
      prestationsCard5Title: 'ⵉⵎⵙⴰⵍⵏ ⵉⵎⴰⵏⴰⵏ',
      prestationsCard5Body: 'ⵉⵙⵔⴹⴰⵏ ⵉⵎⴰⴷⴰⵏⵏ, ⵜⵉⵎⵙⵙⵓⵔⵉⵏ ⵜⵉⵣⵔⴼⴰⵏⵉⵏ, ⵉⵣⴷⴰⵢⵏ ⵉⵜⵜⵓⵙⵙⵉⵡⴹⵏ ⴷ ⵜⴰⵔⵉⴼⵉⵏ ⵉⴼⵔⵏⴰⵏ.',
      prestationsCard6Title: 'ⴰⵏⵅⵔⴰⵟ ⴷ ⵓⵎⵓⴷⴷⵓ',
      prestationsCard6Body: 'ⵉⵙⴰⵍⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵉⵙⵜⴼⴰⵢⴷⵏ ⴷ ⵉⵎⵔⵟⵓⵃⵏ ⴷ ⵓⵣⵔⴰⵔ ⵖⵔ ⵓⵙⵏⵓⴱⴳ ⵏ ⵓⵎⵏⵅⵔⴰⵟ.',
      prestationsDetailLink: 'ⵥⵕ ⵜⵉⴼⵔⵓⵔⵉⵏ',
      prestationsBandTitle: 'ⵉⵙⵙⴰⵔⵓⵏⴽ ⵢⴰⵜ ⵜⵎⴰⴷⵉⵡⵜ ⵉⵎⵥⵍⵉⵏ؟',
      prestationsBandBody: 'ⴰⴷ ⵜⵜⵓⵙⵙⴰⵏⴼⵏ ⵉⵙⴰⵍⵏ ⵏ ⵓⵎⵢⴰⵡⴰⵍ ⴷ ⵉⵎⵙⵏⴰⵡⵏ ⵉⵏⵏⴰⵡⵏ ⴳ ⵜⵉⵙⵏⴰⵜⵉⵏ ⵉⴹⴼⵕⵏ.',
      prestationsBandCta: 'ⵎⵢⴰⵡⴰⵍ ⴰⵏⵖ'
    }
  };

  const SEARCH_INDEX = [
    { key: 'home',          url: 'index.html',                            icon: 'fa-house' },
    { key: 'foundation',    url: 'fondation.html',                        icon: 'fa-landmark' },
    { key: 'minister',      url: 'la-fondation/mot-du-ministre/index.html',           icon: 'fa-user-tie' },
    { key: 'president',     url: 'la-fondation/mot-du-president/index.html',          icon: 'fa-user-tie' },
    { key: 'history',       url: 'histoire-mission-valeurs.html',         icon: 'fa-clock-rotate-left' },
    { key: 'values',        url: 'nos-valeurs.html',                      icon: 'fa-gem' },
    { key: 'organization',  url: 'notre-organisation.html',               icon: 'fa-sitemap' },
    { key: 'governance',    url: 'la-fondation/gouvernance/index.html',   icon: 'fa-scale-balanced' },
    { key: 'adhesion',      url: 'adhesion.html',                         icon: 'fa-id-card' },
    { key: 'adherents',     url: 'adhesion.html#adherents-beneficiaires', icon: 'fa-users' },
    { key: 'procedure',     url: 'adhesion.html#procedure-adhesion',      icon: 'fa-file-signature' },
    { key: 'cotisations',   url: 'adhesion.html#cotisations',             icon: 'fa-coins' },
    { key: 'services',      url: 'prestations.html',                      icon: 'fa-hand-holding-heart' },
    { key: 'prevoyance',    url: 'services/prevoyance.html',              icon: 'fa-heart-pulse' },
    { key: 'culture',       url: 'services/culture-loisirs-voyages.html', icon: 'fa-plane' },
    { key: 'scolarisation', url: 'services/formation-scolarisation.html', icon: 'fa-graduation-cap' },
    { key: 'logement',      url: 'services/acces-logement.html',          icon: 'fa-house-chimney' },
    { key: 'projets',       url: 'services/projets-personnels.html',      icon: 'fa-lightbulb' },
    { key: 'education',     url: 'services/education-culture.html',       icon: 'fa-book-open' },
    { key: 'mediatheque',   url: 'mediatheque.html',                      icon: 'fa-photo-film' },
    { key: 'media2017',     url: 'mediatheque.html#galerie-2017',         icon: 'fa-images' },
    { key: 'media2018',     url: 'mediatheque.html#galerie-2018',         icon: 'fa-images' },
    { key: 'media2019',     url: 'mediatheque.html#galerie-2019',         icon: 'fa-images' },
    { key: 'media2020',     url: 'mediatheque.html#galerie-2020',         icon: 'fa-images' },
    { key: 'news',          url: 'actualites.html',                       icon: 'fa-newspaper' },
    { key: 'events',        url: 'agenda-solidaire.html',                 icon: 'fa-calendar-days' },
    { key: 'contact',       url: 'contact.html',                          icon: 'fa-envelope' },
    { key: 'coordinates',   url: 'contact.html#coordonnees',              icon: 'fa-map-location-dot' },
    { key: 'regional',      url: 'contact.html#relais-regionaux',         icon: 'fa-map-pin' },
    { key: 'social',        url: 'contact.html#reseaux-sociaux',          icon: 'fa-share-nodes' },
    { key: 'member',        url: 'espace-adherent.html',                  icon: 'fa-user-shield' }
  ];

  /* Strip accents for accent-insensitive matching */
  function normalize(s) {
    return (s || '').toString().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function t(key) {
    return nav[lang]?.[key] || extra[lang]?.[key] || nav.fr[key] || extra.fr[key] || '';
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
        <button class="submenu-toggle" type="button" aria-label="${t(labelKey)} - ${t('submenuLabel')}" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button>
        <div class="nav-submenu">
          ${entries.map((entry) => `<a href="${href(entry.href)}">${t(entry.key)}</a>`).join('')}
        </div>
      </div>`;
  }

  function renderNavActions() {
    const actions = document.querySelector('.nav-actions');
    if (!actions) return;
    const labelText = lang === 'fr' ? 'FR' : lang === 'ar' ? 'AR' : 'ⵜⵎⵣⵉⵖⵜ';
    /* Desktop only: round search-icon button between lang dropdown
       and the member CTA. Mobile hides it via CSS — search shows up
       only inside the opened menu. */
    actions.innerHTML = `
      <div class="lang-select-wrap desktop-only" id="sec-lang-wrap" aria-label="${t('langLabel')}">
        <button class="lang-select" id="sec-lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false">
          <span id="sec-lang-label">${labelText}</span>
          <i class="fa-solid fa-chevron-down lang-chevron" aria-hidden="true"></i>
        </button>
        <ul class="lang-dropdown-panel" id="sec-lang-panel" role="listbox" aria-label="${t('langLabel')}">
          <li class="lang-dropdown-option${lang === 'fr' ? ' is-selected' : ''}" role="option" data-lang="fr" tabindex="0">FR — Français</li>
          <li class="lang-dropdown-option${lang === 'ar' ? ' is-selected' : ''}" role="option" data-lang="ar" tabindex="0">AR — العربية</li>
          <li class="lang-dropdown-option${lang === 'zgh' ? ' is-selected' : ''}" role="option" data-lang="zgh" tabindex="0">ⵜⵎⵣⵉⵖⵜ</li>
        </ul>
      </div>
      <button class="nav-search-btn" type="button" aria-label="${t('search')}" data-header-search="true">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      </button>
      <a class="btn-cta-nav desktop-only" href="${href('espace-adherent.html')}">${t('member')}</a>
    `;
  }

  /* Deduplicate header-side search button — keep exactly one. */
  function removeHeaderSearchButton() {
    const buttons = Array.from(document.querySelectorAll('.nav-actions [data-header-search], .nav-actions .nav-search-btn'));
    buttons.slice(1).forEach((el) => el.remove());
  }

  /* Tag the header's brand subtitle for i18n if it's not already.
     Centralised here so we don't have to touch every HTML file. */
  function tagBrandSubtitle() {
    document.querySelectorAll('.brand-copy small').forEach((el) => {
      if (!el.dataset.staticI18n) el.dataset.staticI18n = 'brandSubtitle';
    });
  }

  /* Ensure the burger button exists as a direct child of .nav-shell
     (between .brand and .site-nav). Some pages had it inside .nav-actions
     where renderNavActions() would destroy it. */
  function normalizeMenuToggle() {
    const shell = document.querySelector('.nav-shell');
    if (!shell) return;
    const nav = shell.querySelector('.site-nav');
    let toggle = shell.querySelector(':scope > .menu-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'menu-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', nav ? nav.id || 'site-nav' : 'site-nav');
      if (nav) { shell.insertBefore(toggle, nav); } else { shell.appendChild(toggle); }
    }
    if (!toggle.querySelector('.burger-box')) {
      toggle.innerHTML = '<span class="burger-box"><span class="burger-inner"></span></span>';
    }
    toggle.setAttribute('aria-label', 'Menu');
  }

  function initLangDropdown() {
    const wrap = document.getElementById('sec-lang-wrap');
    const btn = document.getElementById('sec-lang-btn');
    const panel = document.getElementById('sec-lang-panel');
    if (!wrap || !btn || !panel) return;

    const openDD = () => { wrap.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
    const closeDD = () => { wrap.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      wrap.classList.contains('is-open') ? closeDD() : openDD();
    });

    panel.querySelectorAll('.lang-dropdown-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        lang = supported.includes(opt.dataset.lang) ? opt.dataset.lang : 'fr';
        localStorage.setItem('fosagri-lang', lang);
        closeDD();
        applyStaticLanguage();
      });
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lang = supported.includes(opt.dataset.lang) ? opt.dataset.lang : 'fr';
          localStorage.setItem('fosagri-lang', lang);
          closeDD();
          applyStaticLanguage();
        } else if (e.key === 'Escape') {
          closeDD(); btn.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (opt.nextElementSibling) opt.nextElementSibling.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (opt.previousElementSibling) opt.previousElementSibling.focus();
        }
      });
    });

    if (!document.__secLangDropBound) {
      document.__secLangDropBound = true;
      document.addEventListener('click', (e) => { if (!document.getElementById('sec-lang-wrap')?.contains(e.target)) closeDD(); });
    }
  }

  function initSearchModal() {
    if (document.getElementById('site-search-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'site-search-modal';
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', t('search') || 'Recherche');
    modal.hidden = true;
    modal.innerHTML = `
      <div class="search-modal-backdrop"></div>
      <div class="search-modal-box">
        <button class="search-modal-close" type="button" aria-label="${t('memberClose')}">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <form class="search-modal-form" role="search" onsubmit="return false">
          <i class="fa-solid fa-magnifying-glass search-modal-icon" aria-hidden="true"></i>
          <input id="site-search-input" class="search-modal-input" type="search"
            placeholder="${t('searchPlaceholder')}" autocomplete="off" spellcheck="false" />
        </form>
        <div class="search-results" id="site-search-results" aria-live="polite">
          <p class="search-results-empty" data-state="initial">${t('searchStart')}</p>
        </div>
        <p class="search-modal-hint">${t('searchHint')}</p>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => { modal.hidden = true; document.body.classList.remove('search-modal-open'); };
    window.__openSearchModal = () => {
      modal.hidden = false;
      document.body.classList.add('search-modal-open');
      setTimeout(() => document.getElementById('site-search-input')?.focus(), 60);
    };

    modal.querySelector('.search-modal-backdrop').addEventListener('click', close);
    modal.querySelector('.search-modal-close').addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });

    const input = modal.querySelector('#site-search-input');
    input.addEventListener('input', () => renderSearchResults(input.value));
  }

  /* Refresh the modal's translated chrome when language changes */
  function refreshSearchModalChrome() {
    const modal = document.getElementById('site-search-modal');
    if (!modal) return;
    modal.setAttribute('aria-label', t('search') || 'Recherche');
    const input = modal.querySelector('.search-modal-input');
    if (input) input.placeholder = t('searchPlaceholder');
    const closeBtn = modal.querySelector('.search-modal-close');
    if (closeBtn) closeBtn.setAttribute('aria-label', t('memberClose'));
    const hint = modal.querySelector('.search-modal-hint');
    if (hint) hint.textContent = t('searchHint');
    if (input) renderSearchResults(input.value);
  }

  /* Live in-menu search — filters SEARCH_INDEX by the typed query.
     Matches against the translated label. */
  function renderSearchResults(query) {
    const box = document.getElementById('site-search-results');
    if (!box) return;
    const q = normalize(query).trim();
    if (!q) {
      box.innerHTML = `<p class="search-results-empty" data-state="initial">${t('searchStart')}</p>`;
      return;
    }
    const hits = SEARCH_INDEX
      .map((entry) => ({ entry, label: t(entry.key) || entry.key }))
      .filter(({ label }) => normalize(label).includes(q))
      .slice(0, 12);

    if (!hits.length) {
      box.innerHTML = `<p class="search-results-empty" data-state="empty">${t('searchEmpty')}</p>`;
      return;
    }
    box.innerHTML = hits.map(({ entry, label }) => `
      <a class="search-result-item" href="${href(entry.url)}">
        <span class="search-result-icon"><i class="fa-solid ${entry.icon}" aria-hidden="true"></i></span>
        <span class="search-result-text">${label}</span>
        <i class="fa-solid fa-arrow-right search-result-arrow" aria-hidden="true"></i>
      </a>
    `).join('');
  }

  function renderNavigation() {
    const menu = document.querySelector('.site-nav');
    if (!menu) return;
    const page = body.dataset.page || '';
    menu.id = menu.id || 'site-nav';
    menu.setAttribute('aria-label', t('navLabel'));
    menu.innerHTML = `
      ${item(page, 'home', 'index.html', 'home')}
      ${submenu(page, 'fondation', 'fondation.html', 'foundation', [
        { href: 'la-fondation/mot-du-ministre/index.html', key: 'minister' },
        { href: 'la-fondation/mot-du-president/index.html', key: 'president' },
        { href: 'histoire-mission-valeurs.html', key: 'history' },
        { href: 'nos-valeurs.html', key: 'values' },
        { href: 'notre-organisation.html', key: 'organization' },
        { href: 'la-fondation/gouvernance/index.html', key: 'governance' }
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
      <button class="mobile-search-btn" type="button" data-header-search="true" aria-label="${t('search')}">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> ${t('search')}
      </button>
      <a class="member-link mobile-only btn-cta-nav" href="${href('espace-adherent.html')}" data-nav-key="member">${t('member')}</a>
      <div class="lang-toggle mobile-nav-lang" role="group" aria-label="${t('langMenuLabel')}">
        <button class="lang-btn ${lang === 'fr' ? 'is-active' : ''}" type="button" data-lang="fr">FR</button>
        <button class="lang-btn ${lang === 'ar' ? 'is-active' : ''}" type="button" data-lang="ar">AR</button>
        <button class="lang-btn ${lang === 'zgh' ? 'is-active' : ''}" type="button" data-lang="zgh">ⵜⵎⵣⵉⵖⵜ</button>
      </div>`;
  }

  function initSearchTriggers() {
    document.querySelectorAll('[data-header-search]').forEach((button) => {
      button.onclick = (event) => {
        event.preventDefault();
        window.__openSearchModal?.();
      };
    });
  }

  function getHomeFooterTemplate() {
    if (!footerTemplatePromise) {
      footerTemplatePromise = fetch(href('index.html'))
        .then((response) => {
          if (!response.ok) throw new Error(`Footer fetch failed: ${response.status}`);
          return response.text();
        })
        .then((html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const homeFooter = doc.querySelector('.site-footer');
          if (!homeFooter) throw new Error('Homepage footer not found');
          return homeFooter.innerHTML;
        })
        .catch(() => null);
    }
    return footerTemplatePromise;
  }

  function localizeClonedFooter(footer) {
    footer.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (!key) return;
      if (key === 'footer.credit') node.innerHTML = t(key);
      else node.textContent = t(key);
    });

    footer.querySelectorAll('[data-i18n-html]').forEach((node) => {
      const key = node.getAttribute('data-i18n-html');
      if (!key) return;
      node.innerHTML = t(key);
    });
  }

  function rewriteClonedFooterPaths(footer) {
    const brand = footer.querySelector('.footer-brand');
    if (brand) brand.href = href('index.html');

    footer.querySelectorAll('img[src]').forEach((img) => {
      if (img.getAttribute('src') === 'logo.png') img.setAttribute('src', href('logo.png'));
    });

    footer.querySelectorAll('a[href]').forEach((link) => {
      const raw = link.getAttribute('href');
      if (!raw) return;
      if (raw.startsWith('#')) {
        link.setAttribute('href', href(`index.html${raw}`));
        return;
      }
      if (/^(mailto:|tel:|https?:|\/\/)/i.test(raw)) return;
      link.setAttribute('href', href(raw));
    });
  }

  function renderFooter() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    /* Mirrors the home-page footer 1:1 (index.html). Single source of
       truth — edit here to update the footer on every secondary page. */
    footer.innerHTML = `
      <div class="container footer-grid" id="footer-links">
        <div>
          <a class="brand footer-brand" href="${href('index.html')}">
            <span class="brand-mark footer-brand-mark"><img src="${href('logo.png')}" alt="Logo FOS-Agri" /></span>
            <span class="brand-copy"><strong>FOS-Agri</strong><small>${t('brandSubtitle')}</small></span>
          </a>
          <p class="footer-copy">${t('footerAbout')}</p>
        </div>
        <div>
          <h3>${t('usefulTitle')}</h3>
          <ul class="footer-links">
            <li><a href="${href('index.html#news')}">${t('useful1')}</a></li>
            <li><a href="${href('index.html#contact')}">${t('useful2')}</a></li>
            <li><a href="mailto:fos-agri@fos-agri.ma">${t('useful3')}</a></li>
          </ul>
        </div>
        <div>
          <h3>${t('quickTitle')}</h3>
          <ul class="footer-links">
            <li><a href="${href('index.html#member-space')}">${t('quick1')}</a></li>
            <li><a href="${href('index.html#services')}">${t('quick2')}</a></li>
            <li><a href="${href('index.html#news')}">${t('quick3')}</a></li>
          </ul>
        </div>
        <div>
          <h3>${t('contactTitle')}</h3>
          <ul class="footer-links">
            <li><a href="mailto:fos-agri@fos-agri.ma"><i class="fa-solid fa-envelope"></i> fos-agri@fos-agri.ma</a></li>
            <li><a href="tel:+212537774748"><i class="fa-solid fa-phone"></i> <span>+212 5 37 77 47 48</span></a></li>
            <li><a href="https://maps.app.goo.gl/mUGT2XwCk56UjA5KA" target="_blank" rel="noopener"><i class="fa-solid fa-location-dot"></i> <span>${t('ctc_address')}</span></a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <div class="footer-meta">
          <p>${t('copy')}</p>
          <p class="footer-credit">Powered by <a href="https://neonovia.com/" target="_blank" rel="noopener noreferrer">NEONOVIA</a></p>
        </div>
        <div class="footer-social">
          <a href="https://www.facebook.com/FOS.Agri" target="_blank" rel="noopener" class="footer-social-link" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/fos.agri/" target="_blank" rel="noopener" class="footer-social-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://www.linkedin.com/in/fosagri/" target="_blank" rel="noopener" class="footer-social-link" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="https://www.youtube.com/@FOSAgri" target="_blank" rel="noopener" class="footer-social-link" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>`;
  }

  function applyStaticLanguage() {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    body.dataset.lang = lang;
    ensureSubmenuCss();
    tagBrandSubtitle();
    renderNavigation();
    renderNavActions();
    normalizeMenuToggle();
    removeHeaderSearchButton();
    renderFooter();
    refreshSearchModalChrome();

    document.querySelectorAll('[data-static-i18n]').forEach((el) => {
      const key = el.dataset.staticI18n;
      el.textContent = t(key);
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    initLanguage();
    initMenu();
    initSubmenus();
    initLangDropdown();
    initSearchTriggers();
    /* Re-init floating social so LinkedIn (added by renderFooter)
       always lands in the floating widget, even if app.js built one
       earlier from a stale footer. */
    initFloatingSocialButton();

    /* Cross-script notification: per-page renderers (org chart, history
       timeline, future modules) listen for this and re-render in the new
       language. The <html lang/dir> change also fires a MutationObserver
       fallback. */
    try {
      window.dispatchEvent(new CustomEvent('fosagri:lang-change', { detail: { lang } }));
    } catch (_) { /* old browsers — MutationObserver covers them */ }
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

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      body.classList.remove('menu-open');
    }

    /* toggle.onclick is idempotent — safe to set on every applyStaticLanguage() call */
    toggle.onclick = () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open', !expanded);
      body.classList.toggle('menu-open', !expanded);
    };

    /* Guard: add document + menu listeners only once per page load */
    if (!document.__secMenuOutsideBound) {
      document.__secMenuOutsideBound = true;
      document.addEventListener('click', (e) => {
        if (body.classList.contains('menu-open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
          closeMenu();
        }
      });
    }
    if (!menu.__secMenuLinkBound) {
      menu.__secMenuLinkBound = true;
      menu.addEventListener('click', (e) => {
        /* Close the drawer when a nav-link OR the in-menu search
           button is clicked. The search button is a <button>, so the
           old `a[href]`-only selector wasn't catching it. */
        if (e.target.closest('a[href]') || e.target.closest('.mobile-search-btn, .nav-search-btn')) {
          closeMenu();
        }
      });
    }
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

    /* Mobile: first tap on parent label opens submenu, second tap navigates.
       stopPropagation keeps the menu's close-on-link-click handler from firing here. */
    const isMobile = () => window.matchMedia('(max-width: 980px)').matches;
    document.querySelectorAll('.site-nav .has-submenu > a').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (!isMobile()) return;
        const item = link.closest('.nav-item');
        if (!item || item.classList.contains('is-open')) return;
        event.preventDefault();
        event.stopPropagation();
        document.querySelectorAll('.nav-item.is-open').forEach((x) => x.classList.remove('is-open'));
        document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach((x) => x.setAttribute('aria-expanded', 'false'));
        item.classList.add('is-open');
        const togBtn = item.querySelector('.submenu-toggle');
        if (togBtn) togBtn.setAttribute('aria-expanded', 'true');
      });
    });

    /* Guard: add document listener only once per page load */
    if (!document.__secSubmenuOutsideBound) {
      document.__secSubmenuOutsideBound = true;
      document.addEventListener('click', (event) => {
        if (event.target.closest('.nav-item')) return;
        document.querySelectorAll('.nav-item.is-open').forEach((openItem) => openItem.classList.remove('is-open'));
        document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach((openButton) => openButton.setAttribute('aria-expanded', 'false'));
      });
    }
  }

  function initScrollHeader() {
    const header = document.querySelector('.site-header');
    if (!header || header.__scrollInitialized) return;
    header.__scrollInitialized = true;

    const topThreshold = 12;
    const directionThreshold = 6;
    const hideThreshold = 72;
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    let ticking = false;

    const showSolid = () => {
      header.classList.add('is-scrolled');
      header.classList.remove('is-hidden');
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
      header.style.pointerEvents = 'auto';
    };

    const hideHeader = () => {
      header.classList.add('is-hidden', 'is-scrolled');
      header.style.transform = 'translateY(calc(-100% - 0.75rem))';
      header.style.opacity = '0';
      header.style.pointerEvents = 'none';
    };

    const updateHeaderState = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const delta = scrollTop - lastScrollTop;

      if (scrollTop <= topThreshold) {
        header.classList.remove('is-scrolled', 'is-hidden');
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
        lastScrollTop = 0;
        ticking = false;
        return;
      }

      if (delta > directionThreshold && scrollTop > hideThreshold) {
        hideHeader();
      } else if (delta < -directionThreshold) {
        showSolid();
      } else if (!header.classList.contains('is-hidden')) {
        showSolid();
      }

      lastScrollTop = Math.max(0, scrollTop);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeaderState);
    }, { passive: true });

    updateHeaderState();
  }

  /* Floating-social — rebuilds if the current widget is missing any
     link from the current footer (e.g. LinkedIn added by renderFooter
     after app.js's earlier init). Idempotent if already complete. */
  function initFloatingSocialButton() {
    const socialLinks = Array.from(document.querySelectorAll('.footer-social-link'))
      .filter((l) => l.getAttribute('href') && l.getAttribute('href') !== '#')
      .map((l) => ({ href: l.href, label: l.getAttribute('aria-label') || '', html: l.innerHTML }))
      .filter((l, i, arr) => arr.findIndex((x) => x.href === l.href) === i);
    if (!socialLinks.length) return;

    const existing = document.querySelector('.floating-social');
    if (existing) {
      const have = new Set(
        Array.from(existing.querySelectorAll('.floating-social-link'))
          .map((a) => a.getAttribute('href'))
      );
      const allCovered = socialLinks.every((l) => have.has(l.href));
      if (allCovered) return;
      existing.remove();
    }

    const host = document.createElement('div');
    host.className = 'floating-social';
    host.innerHTML = `
      <div class="floating-social-links" aria-label="Liens sociaux rapides">
        ${socialLinks.map((l) => `<a class="floating-social-link" href="${l.href}" target="_blank" rel="noopener noreferrer" aria-label="${l.label}">${l.html}</a>`).join('')}
      </div>
      <button class="floating-social-main" type="button" aria-label="Ouvrir les liens sociaux">
        <i class="fa-solid fa-share-nodes"></i>
      </button>
    `;
    document.body.appendChild(host);

    const toggle = host.querySelector('.floating-social-main');
    const close = () => host.classList.remove('is-open');
    toggle.addEventListener('click', (e) => { e.stopPropagation(); host.classList.toggle('is-open'); });
    document.addEventListener('click', (e) => { if (host.classList.contains('is-open') && !host.contains(e.target)) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  applyStaticLanguage();
  initScrollHeader();
  initSearchModal();
  initFloatingSocialButton();
})();


