(function () {
  const root = document.documentElement;
  const body = document.body;
  const supported = ['fr', 'ar', 'zgh'];
  const base = body?.dataset?.base || '';
  const saved = (() => {
    try {
      return localStorage.getItem('fosagri-lang');
    } catch (_) {
      return null;
    }
  })();
  let lang = supported.includes(saved) ? saved : 'fr';

  const icons = {
    prevoyance: 'fa-heart-pulse',
    culture: 'fa-plane-departure',
    formation: 'fa-graduation-cap',
    logement: 'fa-house-chimney',
    projets: 'fa-hand-holding-dollar'
  };

  const prevoyanceMenuItems = [
    {
      id: 'a-propos',
      icon: 'fa-circle-info',
      labels: {
        fr: 'A PROPOS',
        ar: 'حول الخدمة',
        zgh: 'ⵅⴼ ⵜⴰⵏⴼⵓⵜ'
      }
    },
    {
      id: 'amc',
      icon: 'fa-shield-heart',
      labels: {
        fr: 'ASSURANCE MALADIE COMPLÉMENTAIRE',
        ar: 'التأمين الصحي التكميلي',
        zgh: 'ⴰⵙⵙⵓⵔⴰⵏⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵎⵔⵏⴰⵡ'
      }
    },
    {
      id: 'amts',
      icon: 'fa-truck-medical',
      labels: {
        fr: 'ASSISTANCE MÉDICALE ET TRANSPORT SANITAIRE',
        ar: 'المساعدة والنقل الصحي',
        zgh: 'ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ'
      }
    },
    {
      id: 'forfait-funeraire',
      icon: 'fa-ribbon',
      labels: {
        fr: 'FORFAIT FUNERAIRE',
        ar: 'منحة الوفاة',
        zgh: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵎⵜⵜⴰⵏⵜ'
      }
    },
    {
      id: 'centre-medico-social',
      icon: 'fa-house-medical',
      labels: {
        fr: 'CENTRE MEDICO-SOCIAL',
        ar: 'المركز الطبي الاجتماعي',
        zgh: 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ'
      }
    },
    {
      id: 'aides-besoins-specifiques',
      icon: 'fa-hands-holding-child',
      labels: {
        fr: 'AIDES AUX PERSONNES AUX BESOINS SPECIFIQUES',
        ar: 'دعم الأشخاص ذوي الاحتياجات الخاصة',
        zgh: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ ⵙ ⵉⵙⵡⵉⵔⵏ ⵉⵎⵥⵍⵉⵢⵏ'
      }
    },
    {
      id: 'conventions-medicales',
      icon: 'fa-file-contract',
      labels: {
        fr: 'CONVENTIONS ET PARTENARIATS MEDICALES',
        ar: 'الاتفاقيات والشراكات الطبية',
        zgh: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏⵏ'
      }
    }
  ];

  const subIcons = {
    prevoyance: prevoyanceMenuItems.map((item) => item.icon),
    culture: ['fa-suitcase-rolling', 'fa-children', 'fa-kaaba', 'fa-person-praying', 'fa-award', 'fa-handshake'],
    formation: ['fa-chalkboard-user', 'fa-medal', 'fa-school', 'fa-book-open-reader'],
    logement: ['fa-house-user', 'fa-building-columns', 'fa-building', 'fa-helmet-safety'],
    projets: ['fa-hand-holding-dollar', 'fa-building-columns', 'fa-handshake-angle', 'fa-tags']
  };

  const image = {
    prevoyance: 'assets/images/prestation-prevoyance-hero.png',
    culture: 'assets/images/prestation-culture-hero.png',
    formation: 'assets/images/prestation-formation-hero.png',
    logement: 'assets/images/prestation-logement-hero.png',
    projets: 'assets/images/prestation-projets-hero.png'
  };

  let selectedService = 'prevoyance';

  const labels = {
    fr: {
      kicker: 'Prestations sociales',
      discover: 'Découvrir',
      contact: 'Nous contacter',
      back: 'Toutes les prestations',
      explore: 'Voir les prestations',
      catalogueTitle: 'Prestations FOS-Agri',
      catalogueBody: 'Découvrez les prestations sociales de la Fondation : santé, culture, scolarisation, logement et projets personnels.',
      flowTitle: 'Choisir une prestation',
      flowBody: 'Sélectionnez une prestation pour afficher ses services et accéder à sa page dédiée.',
      flow1: 'Identifier le besoin', flow1Body: 'Santé, scolarité, logement, loisirs ou projet personnel.',
      flow2: 'Consulter la prestation', flow2Body: 'Comprendre les garanties, les plafonds et les partenaires disponibles.',
      flow3: 'Préparer le dossier', flow3Body: 'Rassembler les justificatifs selon la prestation concernée.',
      flow4: 'Contacter la Fondation', flow4Body: 'Être orienté par les équipes FOS-Agri ou les relais régionaux.',
      ctaTitle: 'Besoin d’une orientation personnalisée ?',
      ctaBody: 'Les équipes FOS-Agri peuvent orienter les adhérents vers la prestation, le partenaire ou le relais régional adapté.',
      highlights: 'Repères clés',
      rubriques: 'Rubriques',
      subrubriques: 'Sous-rubriques',
      icons2d: 'Icônes 2D',
      details: 'Détails de la prestation',
      partners: 'Conventions et partenaires',
      steps: 'Parcours adhérent',
      medicalPartners: {
        badge: 'Conventions médicales',
        title: 'Conventions et partenariats médicaux',
        intro: 'Sélectionnez une région sur la carte pour afficher les partenaires médicaux disponibles. Les conventions au niveau central sont listées séparément avec les mêmes filtres.',
        regionalTitle: 'Partenaires par région',
        regionalIntro: 'Carte interactive des partenaires médicaux régionaux.',
        centralTitle: 'Au Niveau Central',
        centralIntro: 'Conventions et partenaires rattachés au niveau central.',
        search: 'Rechercher',
        searchPlaceholder: 'Médecin, organisme, spécialité, adresse ou ville',
        city: 'Ville',
        allCities: 'Toutes les villes',
        category: 'Catégorie',
        allCategories: 'Toutes les catégories',
        region: 'Région',
        allRegions: 'Toutes les régions',
        results: 'résultat(s)',
        noResults: 'Aucun partenaire ne correspond aux filtres.',
        noRegional: 'Aucun partenaire régional renseigné pour cette région.',
        downloadNotice: 'Télécharger avis',
        downloadContact: 'Télécharger contact',
        downloadUnavailable: 'Avis indisponible',
        status: 'Statut',
        address: 'Adresse',
        phone: 'Téléphone',
        doctor: 'Médecin',
        organization: 'Organisme',
        selectedRegion: 'Région sélectionnée',
        mapLabel: 'Carte interactive des régions du Maroc',
        regionsListLabel: 'Sélection rapide des régions',
        pageLabel: 'Page',
        previousPage: 'Précédent',
        nextPage: 'Suivant'
      }
    },
    ar: {
      kicker: 'الخدمات الاجتماعية',
      discover: 'اكتشف',
      contact: 'اتصل بنا',
      back: 'كل الخدمات',
      explore: 'استكشاف الخانات',
      catalogueTitle: 'خدمات FOS-Agri',
      catalogueBody: 'فهرس منظم للخدمات الاجتماعية للمؤسسة: الصحة، الثقافة، التمدرس، السكن والمشاريع الشخصية.',
      flowTitle: 'التصفح حسب الحاجة',
      flowBody: 'اختر خانة للاطلاع على خدماتها الفرعية والولوج إلى صفحتها.',
      flow1: 'تحديد الحاجة', flow1Body: 'الصحة، الدراسة، السكن، الترفيه أو المشروع الشخصي.',
      flow2: 'الاطلاع على الخدمة', flow2Body: 'فهم الضمانات والأسقف والشركاء المتاحين.',
      flow3: 'إعداد الملف', flow3Body: 'تجميع الوثائق حسب الخدمة المطلوبة.',
      flow4: 'التواصل مع المؤسسة', flow4Body: 'توجيه المنخرط من طرف فرق FOS-Agri أو المنسقين الجهويين.',
      ctaTitle: 'هل تحتاج إلى توجيه خاص؟',
      ctaBody: 'يمكن لفرق FOS-Agri توجيه المنخرط نحو الخدمة أو الشريك أو المنسق الجهوي المناسب.',
      highlights: 'معطيات أساسية',
      rubriques: 'خانات',
      subrubriques: 'الخدمات الفرعية',
      icons2d: 'أيقونات 2D',
      details: 'تفاصيل الخدمة',
      partners: 'الاتفاقيات والشركاء',
      steps: 'مسار المنخرط',
      medicalPartners: {
        badge: 'اتفاقيات طبية',
        title: 'الاتفاقيات والشراكات الطبية',
        intro: 'اختر جهة على الخريطة لعرض الشركاء الطبيين المتوفرين. تعرض اتفاقيات المستوى المركزي في قسم مستقل مع نفس المرشحات.',
        regionalTitle: 'الشركاء حسب الجهة',
        regionalIntro: 'خريطة تفاعلية للشركاء الطبيين الجهويين.',
        centralTitle: 'على المستوى المركزي',
        centralIntro: 'اتفاقيات وشركاء مرتبطون بالمستوى المركزي.',
        search: 'بحث',
        searchPlaceholder: 'طبيب، مؤسسة، تخصص، عنوان أو مدينة',
        city: 'المدينة',
        allCities: 'كل المدن',
        category: 'الفئة',
        allCategories: 'كل الفئات',
        region: 'الجهة',
        allRegions: 'كل الجهات',
        results: 'نتيجة',
        noResults: 'لا يوجد شريك مطابق للمرشحات.',
        noRegional: 'لا يوجد شريك جهوي مسجل لهذه الجهة.',
        downloadNotice: 'تحميل الإشعار',
        downloadContact: 'تحميل جهة الاتصال',
        downloadUnavailable: 'الإشعار غير متوفر',
        status: 'الوضعية',
        address: 'العنوان',
        phone: 'الهاتف',
        doctor: 'الطبيب',
        organization: 'المؤسسة',
        selectedRegion: 'الجهة المختارة',
        mapLabel: 'خريطة تفاعلية لجهات المغرب',
        regionsListLabel: 'اختيار سريع للجهات',
        pageLabel: 'صفحة',
        previousPage: 'السابق',
        nextPage: 'التالي'
      }
    },
    zgh: {
      kicker: 'ⵜⵉⵏⴼⴰⵙ ⵜⵉⵎⴰⴷⴰⵏⵉⵏ',
      discover: 'ⵙⵙⵏ',
      contact: 'ⵎⵢⴰⵡⴰⵍ',
      back: 'ⴽⵔⴰ ⵜⵉⵏⴼⴰⵙ',
      explore: 'ⵙⵙⵏ ⵜⵉⵙⴳⴰⵔ',
      catalogueTitle: 'ⵜⵉⵏⴼⴰⵙ ⵏ FOS-Agri',
      catalogueBody: 'ⴰⵙⵎⵓⵜⵜⴳ ⵏ ⵜⵉⵏⴼⴰⵙ: ⵜⴰⴷⵓⵙⵉ, ⵜⴰⴷⵍⵙⴰ, ⴰⵙⵍⵎⴷ, ⴰⵙⵖⵉⵎ ⴷ ⵉⵎⵙⴰⵍⵏ.',
      flowTitle: 'ⴰⵙⵙⵏ ⵙ ⵓⵙⵔⵓⵜ',
      flowBody: 'ⴼⵔⵏ ⵜⴰⵙⴳⴰ ⴰⴷ ⵜⵥⵕⴷ ⵜⵉⵙⴳⴰⵔ ⵜⵉⵎⵥⵥⵉⵢⵏ.',
      flow1: 'ⵙⵙⵏ ⴰⵙⵔⵓⵜ', flow1Body: 'ⵜⴰⴷⵓⵙⵉ, ⴰⵙⵍⵎⴷ, ⴰⵙⵖⵉⵎ, ⴰⵙⴰⵢⴰⵕ ⵏⵖ ⴰⵙⵏⴼⴰⵔ.',
      flow2: 'ⵥⵕ ⵜⴰⵏⴼⵓⵙⵜ', flow2Body: 'ⴰⴷ ⵜⵙⵙⵏⴷ ⵜⵉⵣⴳⴰⵣ, ⵉⵙⵡⵉⵔⵏ ⴷ ⵉⵣⴷⴰⵢⵏ.',
      flow3: 'ⵙⵎⵓⵜⵜⴳ ⴰⴼⴰⵢⵍⵓ', flow3Body: 'ⵙⵎⵓⵏ ⵜⵉⴽⴰⵔⴹⵉⵡⵉⵏ ⵙ ⵎⴽ ⵜⴳⴰ ⵜⴰⵏⴼⵓⵙⵜ.',
      flow4: 'ⵎⵢⴰⵡⴰⵍ ⴷ ⵜⵙⴷⴰⵡⵉⵜ', flow4Body: 'ⴰⴷ ⴽ ⵙⵙⴷⵓⵏ ⵉⵎⵙⵙⵓⵔⵉⵏ ⵏ FOS-Agri ⵏⵖ ⵉⵎⵙⵏⴰⵡⵏ.',
      ctaTitle: 'ⵜⵔⵉⴷ ⴰⵙⴷⵓ ⵉⵎⵥⵍⵉ?',
      ctaBody: 'ⵉⵎⵙⵙⵓⵔⵉⵏ ⵏ FOS-Agri ⵣⵎⵔⵏ ⴰⴷ ⴽ ⵙⵙⴷⵓⵏ ⵖⵔ ⵜⴰⵏⴼⵓⵙⵜ, ⴰⵣⴷⴰⵢ ⵏⵖ ⴰⵎⵙⵏⴰⵡ.',
      highlights: 'ⵉⵙⴰⵍⵏ',
      rubriques: 'ⵜⵉⵙⴳⴰⵔ',
      subrubriques: 'ⵜⵉⵙⴳⴰⵔ ⵜⵉⵎⵥⵥⵉⵢⵏ',
      icons2d: 'ⵉⴽⵓⵏⵏ 2D',
      details: 'ⵜⵉⴼⵔⵓⵔⵉⵏ',
      partners: 'ⵉⵣⴷⴰⵢⵏ',
      steps: 'ⴰⴱⵔⵉⴷ ⵏ ⵓⵎⵏⵅⵔⴰⵟ',
      medicalPartners: {
        badge: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⵉⴷⵓⵙⴰⵏⵏ',
        title: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏⵏ',
        intro: 'ⴼⵔⵏ ⵜⴰⵎⵏⴰⴹⵜ ⴳ ⵜⴽⴰⵕⴹⴰ ⴰⴷ ⵜⵥⵕⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏⵏ. ⴰⵙⵡⵉⵔ ⴰⵎⵎⴰⵙ ⵉⵍⵍⴰ ⴳ ⵜⵙⴳⴰ ⵉⵎⵥⵍⵉⵢⵏ.',
        regionalTitle: 'ⵉⵣⴷⴰⵢⵏ ⵙ ⵜⵎⵏⴰⴹⵜ',
        regionalIntro: 'ⵜⴰⴽⴰⵕⴹⴰ ⵜⴰⵎⵢⴰⵡⴰⴹⵜ ⵏ ⵉⵣⴷⴰⵢⵏ ⵉⵏⵏⴰⵡⵏ.',
        centralTitle: 'ⴳ ⵓⵙⵡⵉⵔ ⴰⵎⵎⴰⵙ',
        centralIntro: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵏ ⵓⵙⵡⵉⵔ ⴰⵎⵎⴰⵙ.',
        search: 'ⵔⵣⵓ',
        searchPlaceholder: 'ⴰⵎⵙⵙⵉⵊⵊⵉ, ⴰⵎⴰⵙⵙⴰⵙ, ⵜⴰⵎⵥⵍⴰ, ⵜⴰⵏⵙⴰ ⵏⵖ ⵜⴰⵎⴷⵉⵏⵜ',
        city: 'ⵜⴰⵎⴷⵉⵏⵜ',
        allCities: 'ⴽⵓ ⵜⵉⵎⴷⵉⵏⵉⵏ',
        category: 'ⵜⴰⴳⴳⴰⵢⵜ',
        allCategories: 'ⴽⵓ ⵜⵉⴳⴳⴰⵢⵉⵏ',
        region: 'ⵜⴰⵎⵏⴰⴹⵜ',
        allRegions: 'ⴽⵓ ⵜⵉⵎⵏⴰⴹⵉⵏ',
        results: 'ⵜⵉⴼⵔⵉⵏ',
        noResults: 'ⵓⵔ ⵉⵍⵍⵉ ⵓⵣⴷⴰⵢ ⵉⵎⵙⴰⵙⴰⵏ ⴷ ⵉⵙⵜⴰⵢⵏ.',
        noRegional: 'ⵓⵔ ⵉⵍⵍⵉ ⵓⵣⴷⴰⵢ ⴰⵏⵏⴰⵡ ⵉ ⵜⵎⵏⴰⴹⵜ ⴰⴷ.',
        downloadNotice: 'ⵙⵉⴷⵔ ⴰⵙⴰⵍⵉ',
        downloadContact: 'ⵙⵉⴷⵔ ⴰⵎⵢⴰⵡⴰⴹ',
        downloadUnavailable: 'ⴰⵙⴰⵍⵉ ⵓⵔ ⵉⵍⵍⵉ',
        status: 'ⴰⴷⴷⴰⴷ',
        address: 'ⵜⴰⵏⵙⴰ',
        phone: 'ⵜⵉⵍⵉⴼⵓⵏ',
        doctor: 'ⴰⵎⵙⵙⵉⵊⵊⵉ',
        organization: 'ⴰⵎⴰⵙⵙⴰⵙ',
        selectedRegion: 'ⵜⴰⵎⵏⴰⴹⵜ ⵉⵜⵜⵓⴼⵔⵏ',
        mapLabel: 'ⵜⴰⴽⴰⵕⴹⴰ ⵜⴰⵎⵢⴰⵡⴰⴹⵜ ⵏ ⵜⵎⵏⴰⴹⵉⵏ ⵏ ⵍⵎⵖⵔⵉⴱ',
        regionsListLabel: 'ⴰⵙⵜⴰⵢ ⴰⵙⵔⵉⴷ ⵏ ⵜⵎⵏⴰⴹⵉⵏ',
        pageLabel: 'ⵜⴰⵙⵏⴰ',
        previousPage: 'ⵓⵣⵡⵉⵔ',
        nextPage: 'ⵓⴹⴼⵉⵔ'
      }
    }
  };

  const amcDetailFr = {
    title: 'Assurance Maladie Complémentaire',
    subtitle: 'Une couverture complémentaire à l’AMO-CNOPS permettant le remboursement ou la prise en charge d’une partie ou de la totalité des frais restant à la charge de l’adhérent, au Maroc et à l’étranger.',
    dispositionsTitle: 'Dispositions contractuelles',
    prestationsTitle: 'Prestations garanties',
    casesTitle: 'Cas particuliers',
    noteTitle: 'Note importante',
    assuredLabel: 'Affections et actes médicaux assurés',
    benefitsLabel: 'Prestations garanties',
    expandLabel: 'Afficher le détail',
    collapseLabel: 'Réduire le détail',
    paginationLabel: 'Cartes des dispositions contractuelles AMC',
    dispositions: [
      {
        icon: 'fa-file-shield',
        title: 'Objet de la garantie',
        body: ['En cas de maladie ou d’accident, Sanlam Maroc s’engage à rembourser ou à prendre en charge, dans le cadre de l’Assurance Maladie Complémentaire en complément à l’AMO-CNOPS, une partie ou la totalité des frais restant à la charge de l’adhérent, suite à des dépenses de santé engagées au Maroc et à l’étranger, couvertes ou non par l’AMO-CNOPS, conformément aux taux, bases et plafonds de remboursement définis par le contrat.']
      },
      {
        icon: 'fa-percent',
        title: 'Taux de remboursement',
        body: ['Les remboursements sont effectués à hauteur de 100% de la différence entre les frais engagés par l’Adhérent-Assuré et le règlement effectué ou à effectuer par le régime de l’Assurance Maladie Obligatoire AMO, géré par la Caisse Nationale des Organismes de Prévoyance Sociale CNOPS.']
      },
      {
        icon: 'fa-people-roof',
        title: 'Bénéficiaires',
        body: ['Option 1 : L’Adhérent-Assuré actif et retraité, sans limite d’âge.', 'Option 2 : L’Adhérent-Assuré actif.', 'Pour les options 1 et 2 :'],
        bullets: ['Le ou les conjoints sans limite d’âge.', 'Les veuves et orphelins jusqu’à l’âge de 26 ans révolus, du personnel décédé.', 'Les enfants à charge jusqu’à l’âge de 26 ans révolus.']
      },
      {
        icon: 'fa-clock',
        title: 'Délais de règlement des prestations',
        body: ['Le règlement est effectué par Sanlam Maroc à l’Adhérent-Assuré, soit par virement bancaire, soit par mandat postal, dans un délai maximum de quinze 15 jours. Ce délai commence à courir à compter du jour qui suit la date de réception par l’assureur de la copie du dossier et des pièces justificatives.']
      }
    ],
    options: [
      {
        title: 'Option 1',
        kicker: 'Affections ALD-ALC, soins courants et hospitalisations',
        guarantees: [
          {
            title: 'Soins ambulatoires relatifs aux affections ALD-ALC',
            assured: 'Sont couverts les frais de santé engagés, liés à une Affection Longue Durée ALD ou une Affection Lourde et Coûteuse ALC, tels que définis par le régime AMO-CNOPS et faisant l’objet d’une intervention de la couverture AMO-CNOPS, suite à une maladie ou un accident.',
            benefits: [
              'Consultations et visites médicales : remboursement des frais de consultations et visites de médecins effectuées le jour, la nuit, y compris les jours fériés.',
              'Actes médicaux et actes fournis par les auxiliaires médicaux : les actes médicaux courants et ceux fournis par les auxiliaires médicaux donnent droit au remboursement.',
              'Analyses et imageries médicales : les analyses prescrites par ordonnance médicale et les examens d’imagerie donnent droit au remboursement complémentaire.',
              'Pharmacie : remboursement complémentaire des médicaments prescrits par ordonnance médicale et pris en charge par l’AMO-CNOPS, sur la base du prix des génériques ou des princeps.'
            ]
          },
          {
            title: 'Soins ambulatoires hors ALD/ALC',
            assured: 'Soins ambulatoires ne concernant pas des affections ALD/ALC.',
            benefits: [
              'Consultations et visites médicales : remboursées dans la limite d’un plafond de 2 500 Dhs par personne et par an.',
              'Actes médicaux et actes fournis par les auxiliaires médicaux : remboursés à hauteur d’un plafond de 1 500 Dhs par personne et par an.',
              'Pharmacie : médicaments prescrits par ordonnance médicale et pris en charge par l’AMO-CNOPS, avec un plafond de remboursement fixé à 2 500 Dhs par personne et par an.'
            ]
          },
          {
            title: 'Hospitalisations chirurgicales et/ou médicales',
            assured: 'Hospitalisations chirurgicales et/ou médicales.',
            benefits: [
              'Hospitalisation médicale ou chirurgicale au Maroc : sur présentation de la facture et des pièces justificatives, remboursement au taux contractuel de la différence entre les frais engagés à concurrence du barème de la convention FMSAR / Association Nationale des Cliniques Privées, et le règlement effectué ou à effectuer par l’AMO-CNOPS.',
              'Hospitalisation médicale ou chirurgicale à l’étranger : sur présentation de la facture et des pièces justificatives, remboursement au taux contractuel de la différence entre les frais engagés et le règlement effectué ou à effectuer par l’AMO-CNOPS.'
            ]
          }
        ],
        cases: [
          ['fa-eye', 'Optique', 'Plafond de 600 Dhs pour verres progressifs + monture ou lentilles. Plafond de 400 Dhs pour verres non progressifs + monture ou lentilles. Par personne et par période de 24 mois pour les adultes et 12 mois pour les enfants de moins de 18 ans.'],
          ['fa-x-ray', 'Scanner', 'Plafond de 750 Dhs par personne, par maladie et par an.'],
          ['fa-magnet', 'IRM', 'Plafond de 1 500 Dhs par personne, par maladie et par an.'],
          ['fa-tooth', 'Soins dentaires', 'Plafond de 1 500 Dhs par personne et par an.'],
          ['fa-teeth', 'Orthodontie ODF', 'Plafond de 2 000 Dhs par semestre, par enfant de moins de 16 ans révolus, dans la limite de 6 semestres.'],
          ['fa-person-walking', 'Rééducation', 'Plafond de 2 000 Dhs par maladie, par personne et par an.'],
          ['fa-ear-listen', 'Prothèse auditive', 'Plafond de 5 000 Dhs par personne, par unité et par an.'],
          ['fa-head-side-virus', 'Implants cochléaires', 'Plafond de 70 000 Dhs par personne et par an.'],
          ['fa-stethoscope', 'Colonoscopie', 'Plafond de 500 Dhs par personne et par an.'],
          ['fa-vial', 'Frottis', 'Plafond de 400 Dhs par personne et par an.'],
          ['fa-ribbon', 'Mammographie', 'Plafond de 500 Dhs par personne et par an.'],
          ['fa-wave-square', 'Echographie mammaire', 'Plafond de 500 Dhs par personne et par an.'],
          ['fa-baby', 'Frais de mise en couveuse', 'Plafond de 700 Dhs par jour.'],
          ['fa-flask-vial', 'Analyses médicales', 'Les analyses prescrites par ordonnance médicale donnent droit au remboursement complémentaire sans plafond.'],
          ['fa-radiation', 'Petscan', 'Plafond de 6 000 Dhs par personne et par an.'],
          ['fa-notes-medical', 'Fibroscan', 'Plafond de 400 Dhs par personne, par maladie et par an.'],
          ['fa-crutch', 'Appareils orthopédiques et de prothèses hors prothèse dentaire', 'Plafond de 3 000 Dhs par personne et par an.']
        ]
      },
      {
        title: 'Option 2',
        kicker: 'Soins ambulatoires hors ALD/ALC',
        guarantees: [
          {
            title: 'Soins ambulatoires hors ALD/ALC',
            assured: 'Soins ambulatoires ne concernant pas des affections ALD/ALC. Le remboursement de ces soins s’effectue dans la limite de 150% du Tarif National de Référence, sans aucun plafond par prestation.',
            benefits: [
              'Consultations et visites médicales : remboursement des frais de consultations et visites de médecins effectuées le jour, la nuit, y compris les jours fériés.',
              'Actes médicaux et actes fournis par les auxiliaires médicaux : les actes médicaux courants et ceux fournis par les auxiliaires médicaux donnent droit au remboursement.',
              'Pharmacie : médicaments prescrits par ordonnance médicale et pris en charge par l’AMO-CNOPS, sur la base du prix des génériques ou princeps.',
              'Actes de radiologie et d’imagerie : remboursement complémentaire des actes de radiologie et d’imagerie réalisés par les auxiliaires médicaux.'
            ]
          }
        ],
        cases: [
          ['fa-tooth', 'Prothèses dentaires', 'Plafond de 1 000 Dhs par personne et par an.'],
          ['fa-baby-carriage', 'Accouchement normal', 'Plafond de 2 000 Dhs par personne et par an.'],
          ['fa-hospital-user', 'Césarienne', 'À hauteur de 100% du ticket modérateur par personne et par an.'],
          ['fa-eye', 'OCT', 'Plafond de 1 000 Dhs par personne et par an.'],
          ['fa-radiation', 'VMAT', 'Plafond de 10 000 Dhs par personne et par an.'],
          ['fa-x-ray', 'Coroscaner', 'Plafond de 2 000 Dhs par personne et par an.'],
          ['fa-teeth-open', 'Dentascan', 'Plafond de 1 000 Dhs par personne et par an.'],
          ['fa-bolt', 'Rapidarc', 'Plafond de 4 000 Dhs par personne et par an.'],
          ['fa-file-medical', 'Radios hors nomenclature', 'Sur prescription médicale. Plafond de 2 500 Dhs par personne et par an.']
        ]
      }
    ],
    note: 'N.B : Les déclarations de maladie ou d’accident doivent parvenir chez Sanlam Maroc à travers ses agents gestionnaires AMC dans un délai maximal de 90 jours suivant la date de survenance du sinistre.'
  };

  const amcDetailAr = {
    ...amcDetailFr,
    title: 'التأمين الصحي التكميلي',
    subtitle: 'تغطية تكميلية لنظام AMO-CNOPS تتيح تعويض أو تحمل جزء من المصاريف الصحية المتبقية على عاتق المنخرط، داخل المغرب وخارجه.',
    dispositionsTitle: 'المقتضيات التعاقدية',
    prestationsTitle: 'الخدمات المضمونة',
    casesTitle: 'حالات خاصة',
    noteTitle: 'ملاحظة مهمة',
    assuredLabel: 'الأمراض والأعمال الطبية المؤمن عليها',
    benefitsLabel: 'الخدمات المضمونة',
    expandLabel: 'عرض التفاصيل',
    collapseLabel: 'إخفاء التفاصيل',
    paginationLabel: 'بطاقات المقتضيات التعاقدية للتأمين الصحي التكميلي',
    dispositions: [
      {
        icon: 'fa-file-shield',
        title: 'موضوع الضمان',
        body: ['في حالة المرض أو الحادث، تلتزم Sanlam Maroc، في إطار التأمين الصحي التكميلي وبصفة مكملة لنظام AMO-CNOPS، بتعويض أو تحمل جزء أو مجموع المصاريف الصحية المتبقية على عاتق المنخرط، سواء تعلق الأمر بمصاريف داخل المغرب أو خارجه، مغطاة أو غير مغطاة من طرف AMO-CNOPS، وذلك وفق النسب والأسس والأسقف المحددة في العقد.']
      },
      {
        icon: 'fa-percent',
        title: 'نسبة التعويض',
        body: ['تتم التعويضات في حدود 100% من الفرق بين المصاريف التي تحملها المنخرط المؤمن والتسوية المنجزة أو التي يتعين إنجازها من طرف نظام التأمين الإجباري عن المرض AMO، المسير من طرف الصندوق الوطني لمنظمات الاحتياط الاجتماعي CNOPS.']
      },
      {
        icon: 'fa-people-roof',
        title: 'المستفيدون',
        body: ['الخيار 1: المنخرط المؤمن النشيط أو المتقاعد دون حد للسن.', 'الخيار 2: المنخرط المؤمن النشيط.', 'بالنسبة للخيارين 1 و2:'],
        bullets: ['الزوج أو الأزواج دون حد للسن.', 'الأرامل والأيتام إلى غاية 26 سنة كاملة بالنسبة لموظف متوفى.', 'الأطفال المتكفل بهم إلى غاية 26 سنة كاملة.']
      },
      {
        icon: 'fa-clock',
        title: 'آجال تسوية الخدمات',
        body: ['تتم التسوية من طرف Sanlam Maroc لفائدة المنخرط المؤمن، إما بواسطة تحويل بنكي أو حوالة بريدية، داخل أجل أقصاه خمسة عشر 15 يوما. ويبتدئ هذا الأجل من اليوم الموالي لتاريخ توصل المؤمن بنسخة الملف والوثائق التبريرية.']
      }
    ],
    options: [
      {
        title: 'الخيار 1',
        kicker: 'الأمراض طويلة الأمد والمكلفة، العلاجات الجارية والاستشفاء',
        guarantees: [
          {
            title: 'العلاجات المتنقلة المتعلقة بأمراض ALD-ALC',
            assured: 'تتم تغطية المصاريف الصحية المرتبطة بمرض طويل الأمد ALD أو مرض ثقيل ومكلف ALC، كما يعرفها نظام AMO-CNOPS، عندما تكون موضوع تدخل من تغطية AMO-CNOPS إثر مرض أو حادث.',
            benefits: [
              'الاستشارات والزيارات الطبية: تعويض مصاريف الاستشارات وزيارات الأطباء خلال النهار والليل، بما في ذلك أيام العطل.',
              'الأعمال الطبية وأعمال المساعدين الطبيين: تخول الأعمال الطبية الجارية وأعمال المساعدين الطبيين الحق في التعويض.',
              'التحاليل والتصوير الطبي: تخول التحاليل الموصوفة بوصفة طبية وفحوصات التصوير الحق في التعويض التكميلي.',
              'الأدوية: تعويض تكميلي للأدوية الموصوفة بوصفة طبية والمقبولة من طرف AMO-CNOPS، على أساس ثمن الأدوية الجنيسة أو الأصلية.'
            ]
          },
          {
            title: 'العلاجات المتنقلة خارج ALD/ALC',
            assured: 'العلاجات المتنقلة التي لا تتعلق بأمراض ALD/ALC.',
            benefits: [
              'الاستشارات والزيارات الطبية: تعوض في حدود سقف 2 500 درهم للشخص في السنة.',
              'الأعمال الطبية وأعمال المساعدين الطبيين: تعوض في حدود سقف 1 500 درهم للشخص في السنة.',
              'الأدوية: الأدوية الموصوفة بوصفة طبية والمقبولة من طرف AMO-CNOPS، بسقف تعويض قدره 2 500 درهم للشخص في السنة.'
            ]
          },
          {
            title: 'الاستشفاء الجراحي و/أو الطبي',
            assured: 'الاستشفاء الجراحي و/أو الطبي.',
            benefits: [
              'الاستشفاء الطبي أو الجراحي بالمغرب: بعد الإدلاء بالفاتورة والوثائق التبريرية، يتم التعويض وفق النسبة التعاقدية للفرق بين المصاريف المتحملة في حدود تعريفة اتفاقية FMSAR / الجمعية الوطنية للمصحات الخاصة، والتسوية المنجزة أو التي يتعين إنجازها من طرف AMO-CNOPS.',
              'الاستشفاء الطبي أو الجراحي بالخارج: بعد الإدلاء بالفاتورة والوثائق التبريرية، يتم التعويض وفق النسبة التعاقدية للفرق بين المصاريف المتحملة والتسوية المنجزة أو التي يتعين إنجازها من طرف AMO-CNOPS.'
            ]
          }
        ],
        cases: [
          ['fa-eye', 'البصريات', 'سقف 600 درهم للزجاج التدريجي مع الإطار أو العدسات. سقف 400 درهم للزجاج غير التدريجي مع الإطار أو العدسات. لكل شخص خلال 24 شهرا للراشدين و12 شهرا للأطفال أقل من 18 سنة.'],
          ['fa-x-ray', 'Scanner', 'سقف 750 درهما لكل شخص، لكل مرض وفي السنة.'],
          ['fa-magnet', 'IRM', 'سقف 1 500 درهم لكل شخص، لكل مرض وفي السنة.'],
          ['fa-tooth', 'علاجات الأسنان', 'سقف 1 500 درهم لكل شخص وفي السنة.'],
          ['fa-teeth', 'تقويم الأسنان ODF', 'سقف 2 000 درهم لكل فصل دراسي، لكل طفل أقل من 16 سنة كاملة، في حدود 6 فصول.'],
          ['fa-person-walking', 'إعادة التأهيل', 'سقف 2 000 درهم لكل مرض، لكل شخص وفي السنة.'],
          ['fa-ear-listen', 'الأجهزة السمعية', 'سقف 5 000 درهم لكل شخص، لكل وحدة وفي السنة.'],
          ['fa-head-side-virus', 'الغرسات القوقعية', 'سقف 70 000 درهم لكل شخص وفي السنة.'],
          ['fa-stethoscope', 'تنظير القولون', 'سقف 500 درهم لكل شخص وفي السنة.'],
          ['fa-vial', 'الفحص المخبري', 'سقف 400 درهم لكل شخص وفي السنة.'],
          ['fa-ribbon', 'Mammographie', 'سقف 500 درهم لكل شخص وفي السنة.'],
          ['fa-wave-square', 'فحص الصدى للثدي', 'سقف 500 درهم لكل شخص وفي السنة.'],
          ['fa-baby', 'مصاريف الحاضنة', 'سقف 700 درهم في اليوم.'],
          ['fa-flask-vial', 'التحاليل الطبية', 'التحاليل الموصوفة بوصفة طبية تخول الحق في التعويض التكميلي دون سقف.'],
          ['fa-radiation', 'Petscan', 'سقف 6 000 درهم لكل شخص وفي السنة.'],
          ['fa-notes-medical', 'Fibroscan', 'سقف 400 درهم لكل شخص، لكل مرض وفي السنة.'],
          ['fa-crutch', 'الأجهزة التقويمية والتعويضية خارج تعويضات الأسنان', 'سقف 3 000 درهم لكل شخص وفي السنة.']
        ]
      },
      {
        title: 'الخيار 2',
        kicker: 'العلاجات المتنقلة خارج ALD/ALC',
        guarantees: [
          {
            title: 'العلاجات المتنقلة خارج ALD/ALC',
            assured: 'العلاجات المتنقلة التي لا تتعلق بأمراض ALD/ALC. يتم تعويض هذه العلاجات في حدود 150% من التعريفة الوطنية المرجعية، دون أي سقف حسب الخدمة.',
            benefits: [
              'الاستشارات والزيارات الطبية: تعويض مصاريف الاستشارات وزيارات الأطباء خلال النهار والليل، بما في ذلك أيام العطل.',
              'الأعمال الطبية وأعمال المساعدين الطبيين: تخول الأعمال الطبية الجارية وأعمال المساعدين الطبيين الحق في التعويض.',
              'الأدوية: الأدوية الموصوفة بوصفة طبية والمقبولة من طرف AMO-CNOPS، على أساس ثمن الأدوية الجنيسة أو الأصلية.',
              'أعمال الأشعة والتصوير: يكتسب الحق في التعويض التكميلي لأعمال الأشعة والتصوير المنجزة من طرف المساعدين الطبيين.'
            ]
          }
        ],
        cases: [
          ['fa-tooth', 'تعويضات الأسنان', 'سقف 1 000 درهم لكل شخص وفي السنة.'],
          ['fa-baby-carriage', 'الولادة الطبيعية', 'سقف 2 000 درهم لكل شخص وفي السنة.'],
          ['fa-hospital-user', 'الولادة القيصرية', 'في حدود 100% من التذكرة المعدلة لكل شخص وفي السنة.'],
          ['fa-eye', 'OCT', 'سقف 1 000 درهم لكل شخص وفي السنة.'],
          ['fa-radiation', 'VMAT', 'سقف 10 000 درهم لكل شخص وفي السنة.'],
          ['fa-x-ray', 'Coroscaner', 'سقف 2 000 درهم لكل شخص وفي السنة.'],
          ['fa-teeth-open', 'Dentascan', 'سقف 1 000 درهم لكل شخص وفي السنة.'],
          ['fa-bolt', 'Rapidarc', 'سقف 4 000 درهم لكل شخص وفي السنة.'],
          ['fa-file-medical', 'أشعة خارج التسمية', 'بناء على وصفة طبية. سقف 2 500 درهم لكل شخص وفي السنة.']
        ]
      }
    ],
    note: 'ملاحظة: يجب أن تصل تصريحات المرض أو الحادث إلى Sanlam Maroc عبر وكلائها المكلفين بتدبير AMC داخل أجل أقصاه 90 يوما ابتداء من تاريخ وقوع الحادث أو المرض.'
  };

  const amcDetailZgh = {
    ...amcDetailFr,
    title: 'ⴰⵙⵉⴽⵍ ⴰⴷⵓⵙⴰⵏ ⴰⵎⵙⵎⴰⴷ',
    subtitle: 'ⵜⴰⴳⴳⵓⵔⵜ ⵜⴰⵎⵙⵎⴰⴷⵜ ⵉ AMO-CNOPS ⵉ ⵓⵔⴰⵔⵓ ⵏ ⵎⴽ ⵉⴳⴰ ⵏ ⵜⵡⵓⵔⵉⵡⵉⵏ ⵏ ⵜⴰⴷⵓⵙⵉ ⵉⵇⵇⵉⵎⵏ ⵅⴼ ⵓⵎⵏⵅⵔⴰⵟ, ⴳ ⵍⵎⵖⵔⵉⴱ ⴷ ⴱⵕⵕⴰ.',
    dispositionsTitle: 'ⵜⵉⵎⵙⴰⵔⵉⵏ ⵏ ⵓⵎⵙⴰⵡⴰⴹ',
    prestationsTitle: 'ⵜⵉⵏⴼⴰⵙ ⵉⵜⵜⵓⵙⴳⴳⴷⵏ',
    casesTitle: 'ⵜⵉⵎⵓⵔⴰ ⵜⵉⵎⵥⵍⴰⵢⵉⵏ',
    noteTitle: 'ⵜⴰⵎⴰⵡⵜ ⵜⴰⵎⵇⵔⴰⵏⵜ',
    assuredLabel: 'ⵜⵉⵎⵓⵔⴰ ⴷ ⵜⵉⴳⴰⵡⵉⵏ ⵜⵉⴷⵓⵙⴰⵏⵉⵏ',
    benefitsLabel: 'ⵜⵉⵏⴼⴰⵙ ⵉⵜⵜⵓⵙⴳⴳⴷⵏ',
    expandLabel: 'ⵙⵙⴽⵏ ⵓⴳⴳⴰⵔ',
    collapseLabel: 'ⵙⵎⴷ ⴰⵙⵏⴼⵍ',
    paginationLabel: 'ⵜⵉⴽⴰⵕⴹⵉⵡⵉⵏ ⵏ AMC',
    dispositions: [
      {
        icon: 'fa-file-shield',
        title: 'ⴰⵙⵏⵜⵍ ⵏ ⵜⵣⵎⵎⴰⵔⵜ',
        body: ['ⵎⴰ ⵉⵍⵍⴰ ⵓⵟⵟⴰⵏ ⵏⵖ ⴰⵎⵓⴽⵔⵉⵙ, Sanlam Maroc ⵜⵜⴰⵔⴰ ⵏⵖ ⵜⵜⴰⵡⵙ ⴳ ⵓⵙⵉⴽⵍ ⴰⴷⵓⵙⴰⵏ ⴰⵎⵙⵎⴰⴷ, ⴰⵎⵙⵎⴰⴷ ⵉ AMO-CNOPS, ⵙ ⵓⵔⴰⵔⵓ ⵏ ⵓⵣⴳⵏ ⵏⵖ ⴰⴽⴽⵯ ⵏ ⵎⴰⵕⵕⴰ ⵉⵇⵇⵉⵎⵏ ⵅⴼ ⵓⵎⵏⵅⵔⴰⵟ.']
      },
      {
        icon: 'fa-percent',
        title: 'ⴰⵙⴰⴽⵓⴷ ⵏ ⵓⵔⴰⵔⵓ',
        body: ['ⵉⵜⵜⴳⴰ ⵓⵔⴰⵔⵓ ⵙ 100% ⵏ ⵓⴼⵔⴰⵇ ⴳⵔ ⵎⴰⵕⵕⴰ ⵉⵙⵙⵓⴼⵖ ⵓⵎⵏⵅⵔⴰⵟ ⴷ ⵓⵔⴰⵔⵓ ⵏ AMO ⵉⵜⵜⵓⵙⵙⴼⵔⴽⵏ ⵙ CNOPS.']
      },
      {
        icon: 'fa-people-roof',
        title: 'ⵉⵎⵙⵜⴼⴰⴷⴰⵏ',
        body: ['ⵜⴰⴼⵔⵏⵜ 1: ⴰⵎⵏⵅⵔⴰⵟ ⴰⵎⴰⵍⵍⴰⵍ ⵏⵖ ⴰⵎⵇⵇⵔⴰⵏ, ⴱⵍⴰ ⵜⵉⵍⴰⵍ ⵏ ⵓⵙⴳⴳⵯⴰⵙ.', 'ⵜⴰⴼⵔⵏⵜ 2: ⴰⵎⵏⵅⵔⴰⵟ ⴰⵎⴰⵍⵍⴰⵍ.', 'ⵉ ⵜⴼⵔⵏⵉⵡⵉⵏ 1 ⴷ 2:'],
        bullets: ['ⴰⵙⵍⵉ ⵏⵖ ⵉⵙⵍⴰⵏ ⴱⵍⴰ ⵜⵉⵍⴰⵍ ⵏ ⵓⵙⴳⴳⵯⴰⵙ.', 'ⵜⵉⴳⵯⵊⴷⴰⵏ ⴷ ⵉⴳⵓⵊⵉⵍⵏ ⴰⵔ 26 ⵏ ⵓⵙⴳⴳⵯⴰⵙ.', 'ⵉⴼⵔⵅⴰⵏ ⵉⵜⵜⵓⵙⵜⴰⵍⵏ ⴰⵔ 26 ⵏ ⵓⵙⴳⴳⵯⴰⵙ.']
      },
      {
        icon: 'fa-clock',
        title: 'ⵜⵉⵣⵉ ⵏ ⵓⵔⴰⵔⵓ',
        body: ['ⵉⵜⵜⴳⴰ ⵓⵔⴰⵔⵓ ⵙ Sanlam Maroc ⵉ ⵓⵎⵏⵅⵔⴰⵟ, ⵙ ⵓⵙⴼⴰⴹ ⴰⴱⴰⵏⴽⵉ ⵏⵖ ⵙ ⵓⵎⴰⵏⴷⴰ ⴰⴱⵓⵙⵟⵉ, ⴳ 15 ⵏ ⵡⴰⵙⵙⵏ ⵙ ⵓⴳⴳⴰⵔ.']
      }
    ],
    options: [
      {
        title: 'ⵜⴰⴼⵔⵏⵜ 1',
        kicker: 'ALD-ALC, ⵜⴰⵡⵙⵉⵡⵉⵏ ⴷ ⵓⵙⵏⴰⴼⴰ',
        guarantees: amcDetailFr.options[0].guarantees.map((guarantee) => ({
          ...guarantee,
          title: guarantee.title.replace('Soins ambulatoires', 'ⵜⴰⵡⵙⵉⵡⵉⵏ').replace('Hospitalisations chirurgicales et/ou médicales', 'ⴰⵙⵏⴰⴼⴰ ⴰⵊⵉⵔⵓⵔⵊⵉ ⴷ/ⵏⵖ ⴰⴷⵓⵙⴰⵏ'),
          assured: 'ⴰⵎⵓⴷⴷⵓ ⴰⵎⵙⵎⴰⴷ ⵉ ⵜⵡⵓⵔⵉⵡⵉⵏ ⵏ ⵜⴰⴷⵓⵙⵉ ⵉⵜⵜⵓⵙⴳⴳⴷⵏ ⵙ AMO-CNOPS, ⵙ ⵎⴽ ⵉⵍⵍⴰ ⴳ ⵓⵎⵙⴰⵡⴰⴹ.',
          benefits: ['ⴰⵔⴰⵔⵓ ⵏ ⵜⵎⵙⵉⵔⵉⵏ ⴷ ⵓⵙⵏⵓⴱⴳ ⴰⴷⵓⵙⴰⵏ.', 'ⵜⵉⴳⴰⵡⵉⵏ ⵜⵉⴷⵓⵙⴰⵏⵉⵏ ⴷ ⵏ ⵉⵎⴰⵡⴰⵙⵏ ⵉⴷⵓⵙⴰⵏⵏ.', 'ⵜⵉⵎⵣⵣⴰⵔ ⴷ ⵜⵎⵓⵔⵉ ⵏ ⵓⵙⵎⵓⵏ ⵜⵜⴰⵔⴰⵏ ⵙ ⵓⵎⵙⵎⴰⴷ.', 'ⴰⵙⴼⴰⵔ: ⴰⵔⴰⵔⵓ ⵏ ⵉⵙⴼⴰⵔⵏ ⵉⵜⵜⵓⵙⵎⴰⵔⵏ ⵙ ⵜⴰⵙⴼⵜⴰⵔⵜ.']
        })),
        cases: [
          ['fa-eye', 'ⵜⵉⵟⵟⴰⵡⵉⵏ', 'ⴰⵙⵇⴼ 600 DH ⵉ ⵡⴰⵍⵍⴰⵏ ⵉⵎⵎⵔⵏ ⴷ ⵜⵎⵓⵔⵜ, ⴷ 400 DH ⵉ ⵡⴰⵍⵍⴰⵏ ⵓⵔ ⵉⵎⵎⵔⵏ.'],
          ['fa-x-ray', 'Scanner', 'ⴰⵙⵇⴼ 750 DH ⵉ ⴽⵓ ⵢⴰⵏ, ⵉ ⴽⵓ ⵓⵟⵟⴰⵏ, ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-magnet', 'IRM', 'ⴰⵙⵇⴼ 1 500 DH ⵉ ⴽⵓ ⵢⴰⵏ, ⵉ ⴽⵓ ⵓⵟⵟⴰⵏ, ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-tooth', 'ⵜⴰⵡⵙⴰ ⵏ ⵓⵅⵙⴰⵏ', 'ⴰⵙⵇⴼ 1 500 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-teeth', 'Orthodontie ODF', 'ⴰⵙⵇⴼ 2 000 DH ⵉ ⴽⵓ ⵙⵎⵙⵜⵔ, ⵉ ⵓⴼⵔⵓⵅ ⴷⴷⴰⵡ 16 ⵏ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-person-walking', 'ⴰⵙⵏⵓⴱⴳ ⴰⵎⴰⵢⵏⵓ', 'ⴰⵙⵇⴼ 2 000 DH ⵉ ⴽⵓ ⵓⵟⵟⴰⵏ, ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-ear-listen', 'ⵜⴰⵙⴼⵍⴷⵜ', 'ⴰⵙⵇⴼ 5 000 DH ⵉ ⴽⵓ ⵢⴰⵏ, ⵉ ⴽⵓ ⵜⴰⵡⵓⵔⵉ, ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-head-side-virus', 'ⵜⵉⴳⵔⴰ ⵜⵉⵙⴼⵍⴷⵉⵏ', 'ⴰⵙⵇⴼ 70 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-stethoscope', 'Colonoscopie', 'ⴰⵙⵇⴼ 500 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-vial', 'Frottis', 'ⴰⵙⵇⴼ 400 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-ribbon', 'Mammographie', 'ⴰⵙⵇⴼ 500 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-wave-square', 'Echographie mammaire', 'ⴰⵙⵇⴼ 500 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-baby', 'ⵜⴰⵙⵇⵇⴰ ⵏ ⵓⴼⵔⵓⵅ', 'ⴰⵙⵇⴼ 700 DH ⵉ ⵡⴰⵙⵙ.'],
          ['fa-flask-vial', 'ⵜⵉⵎⵣⵣⴰⵔ ⵜⵉⴷⵓⵙⴰⵏⵉⵏ', 'ⵜⵉⵎⵣⵣⴰⵔ ⵙ ⵜⴰⵙⴼⵜⴰⵔⵜ ⵜⵜⴰⵔⴰⵏ ⵙ ⵓⵎⵙⵎⴰⴷ ⴱⵍⴰ ⴰⵙⵇⴼ.'],
          ['fa-radiation', 'Petscan', 'ⴰⵙⵇⴼ 6 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-notes-medical', 'Fibroscan', 'ⴰⵙⵇⴼ 400 DH ⵉ ⴽⵓ ⵢⴰⵏ, ⵉ ⴽⵓ ⵓⵟⵟⴰⵏ, ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-crutch', 'ⵉⵎⴰⵙⵙⵏ ⵏ orthopédie', 'ⴰⵙⵇⴼ 3 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.']
        ]
      },
      {
        title: 'ⵜⴰⴼⵔⵏⵜ 2',
        kicker: 'ⵜⴰⵡⵙⵉⵡⵉⵏ ⴱⵕⵕⴰ ⵏ ALD/ALC',
        guarantees: [{
          title: 'ⵜⴰⵡⵙⵉⵡⵉⵏ ⴱⵕⵕⴰ ⵏ ALD/ALC',
          assured: 'ⵜⴰⵡⵙⵉⵡⵉⵏ ⵓⵔ ⵉⵍⵍⵉⵏ ⴳ ALD/ALC. ⵉⵜⵜⴳⴰ ⵓⵔⴰⵔⵓ ⵙ 150% ⵏ ⵜⵎⵓⵜⵜⴳⴰ ⵜⴰⵏⴰⵎⵓⵔⵜ, ⴱⵍⴰ ⴰⵙⵇⴼ ⵅⴼ ⴽⵓ ⵜⴰⵏⴼⵓⵜ.',
          benefits: ['ⴰⵔⴰⵔⵓ ⵏ ⵜⵎⵙⵉⵔⵉⵏ ⴷ ⵓⵙⵏⵓⴱⴳ ⴰⴷⵓⵙⴰⵏ.', 'ⵜⵉⴳⴰⵡⵉⵏ ⵜⵉⴷⵓⵙⴰⵏⵉⵏ ⴷ ⵏ ⵉⵎⴰⵡⴰⵙⵏ ⵉⴷⵓⵙⴰⵏⵏ.', 'ⴰⵙⴼⴰⵔ ⵉⵜⵜⵓⵙⵎⴰⵔⵏ ⵙ ⵜⴰⵙⴼⵜⴰⵔⵜ.', 'ⵜⵉⴳⴰⵡⵉⵏ ⵏ radiologie ⴷ imagerie ⵜⵜⴰⵔⴰⵏ ⵙ ⵓⵎⵙⵎⴰⴷ.']
        }],
        cases: [
          ['fa-tooth', 'ⵜⵉⵙⴷⵉⴷⵉⵏ ⵏ ⵓⵅⵙⴰⵏ', 'ⴰⵙⵇⴼ 1 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-baby-carriage', 'ⵜⴰⵔⵡⴰ ⵜⴰⵎⴰⴳⴰⵏⵜ', 'ⴰⵙⵇⴼ 2 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-hospital-user', 'ⵜⴰⵡⵍⴰⴼⵜ ⵙ ⵓⵙⵏⴰⵙ', 'ⴰⵔ 100% ⵏ ⵓⴼⵔⴰⴳ ⵉⵜⵜⴳⴰⵏ ⵅⴼ ⵓⵎⵏⵅⵔⴰⵟ ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-eye', 'OCT', 'ⴰⵙⵇⴼ 1 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-radiation', 'VMAT', 'ⴰⵙⵇⴼ 10 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-x-ray', 'Coroscaner', 'ⴰⵙⵇⴼ 2 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-teeth-open', 'Dentascan', 'ⴰⵙⵇⴼ 1 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-bolt', 'Rapidarc', 'ⴰⵙⵇⴼ 4 000 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['fa-file-medical', 'Radios hors nomenclature', 'ⵙ ⵜⴰⵙⴼⵜⴰⵔⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ. ⴰⵙⵇⴼ 2 500 DH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.']
        ]
      }
    ],
    note: 'ⵜⴰⵎⴰⵡⵜ: ⵉⵙⴼⴽ ⴰⴷ ⵉⵡⴹ ⵓⵙⵎⵓⵜⵜⴳ ⵏ ⵓⵟⵟⴰⵏ ⵏⵖ ⴰⵎⵓⴽⵔⵉⵙ ⵖⵔ Sanlam Maroc ⴳ 90 ⵏ ⵡⴰⵙⵙⵏ ⵙⴳ ⵡⴰⵙⵙ ⵏ ⵓⵎⵓⴽⵔⵉⵙ.'
  };

  const amtsDetailFr = {
    title: 'Assistance Médicale et Transport Sanitaire',
    badge: 'AMTS',
    subtitle: [
      'La FOS-Agri soutient ses adhérents pendant les moments difficiles à travers le service d’Assistance Médicale et Transport Sanitaire contracté avec la compagnie Wafa IMA Assistance.',
      'Cette assistance porte sur une large gamme de garanties en cas d’événements imprévisibles et urgents : accident, maladie, décès, voyages à l’étranger, évacuation sanitaire pour les pathologies non traitables au Maroc et conciergerie médicale.'
    ],
    beneficiariesTitle: 'Bénéficiaires',
    prestationsTitle: 'Prestations garanties',
    funeralTitle: 'Processus de demande d’octroi',
    contactTitle: 'Comment contacter Wafa IMA ?',
    contactIntro: 'Pour toute demande d’assistance, le plateau est opérationnel 24h/24, 7j/7, et met en place les solutions prévues contractuellement.',
    contactInstruction: 'L’adhérent se fait identifier par son nom, prénom, numéro d’adhésion à la Fondation ou numéro de CIN.',
    phone: '+212 52 90 751 00',
    beneficiaries: [
      ['01', 'L’adhérent et son ou ses conjoints.'],
      ['02', 'Ses enfants déclarés, à charge de l’assuré, âgés de moins de 21 ans ou au plus 26 ans s’ils poursuivent leurs études.'],
      ['03', 'Les enfants handicapés sans limite d’âge, ainsi que les ayants droit : orphelins des adhérents décédés, veuve ou veuf.'],
      ['04', 'Le couple d’ascendants pour lequel la surprime de 65 DH a été payée à Wafa IMA Assistance par l’adhérent concerné.']
    ],
    groups: [
      {
        title: 'Assistance médicale au Maroc',
        icon: 'fa-house-medical',
        services: [
          ['Transport sanitaire urbain au Maroc (aller / retour)', 'Prise en charge du transport sanitaire vers une unité hospitalière de la même ville choisie par l’adhérent.'],
          ['Transport sanitaire interurbain au Maroc (aller / retour)', 'Prise en charge du transport sanitaire vers l’unité hospitalière la plus proche et la mieux équipée pour la pathologie ou maladie à traiter en urgence, en commun accord entre le médecin traitant et celui de Wafa IMA.'],
          ['Déplacement de l’adhérent vers une unité hospitalière', 'Lorsque l’aller vers une unité hospitalière est assuré par l’adhérent, le retour à domicile peut être pris en charge par Wafa IMA, à condition de l’informer dans un délai de 5 jours à compter du jour de l’incident.'],
          ['Transport répétitif pour chimiothérapie, radiothérapie et curiethérapie', 'Wafa IMA Assistance couvre les évacuations répétitives pour effectuer les séances de chimiothérapie, radiothérapie, curiethérapie ou autres actes liés au cancer, à condition que le transport soit dûment justifié médicalement, dans la limite de douze fois par année.'],
          ['Hospitalisation et admission', ['Avance pour admission dans une unité hospitalière au Maroc à hauteur de 10 000 DH, à restituer par l’adhérent.', 'Prise de rendez-vous dans une structure hospitalière en France.']],
          ['Assistance médicale à domicile', ['Visite médicale à domicile 24h/24 et 7j/7 dans 68 villes du Royaume à 120 DH.', 'Envoi de médicaments suite à la visite médicale, avec frais des médicaments à la charge de l’adhérent.', 'Visite d’infirmier, avec coût des médicaments et du matériel à la charge de l’adhérent.', 'Orientation vers la pharmacie la plus proche du lieu de résidence.']],
          ['Évacuation et transport sanitaire', ['Évacuation sanitaire du Maroc vers l’étranger pour les pathologies non traitables au Maroc.', 'Garantie des frais médicaux en cas d’évacuation sanitaire avec un plafond de 80 000 DH, à restituer par l’adhérent.', 'Prise en charge du proche parent accompagnateur ou présence auprès de la personne assurée hospitalisée non accompagnée au Maroc et à l’étranger, à demander au préalable.', 'Titre de transport aller-retour.', 'Au Maroc : 500 DH par nuit pendant 8 nuits.', 'À l’étranger : 900 DH par nuit pendant 7 nuits.']],
          ['Poste-hospitalisation', ['Prise en charge de l’évacuation pour contrôle et suivi médical post-hospitalisation au Maroc, au maximum à 2 reprises dans un délai de 24 mois.', 'Frais de prolongation du séjour après hospitalisation : au Maroc 500 DH par nuit pendant 8 nuits au maximum, à l’étranger 900 DH par nuit pendant 7 nuits au maximum.', 'Retour au domicile après hospitalisation de la personne assurée à l’étranger.']],
          ['Prime de naissance', ['En cas de naissance d’un nouveau-né, le bénéficiaire doit déposer les documents dans un délai de 90 jours à compter de la date de naissance afin de bénéficier d’une prime de 350 DH.', 'Avis ou certificat de naissance.', 'Extrait d’acte de naissance original.', 'Relevé d’Identité Bancaire de l’adhérent.', 'Copie de la Carte Nationale d’Identité de l’adhérent.', 'Copie de la carte d’adhésion à la FOS-Agri.']]
        ]
      },
      {
        title: 'Transport et assistance funéraire',
        icon: 'fa-ribbon',
        services: [
          ['Transport funéraire', ['Transport de la personne assurée décédée jusqu’au lieu d’inhumation.', 'Prise en charge des formalités permettant le transport.', 'Accompagnement de la dépouille isolée.']],
          ['Forfait funéraire', 'Le forfait funéraire accompagne les ayants droit selon la situation du décès et les pièces justificatives prévues.']
        ]
      }
    ],
    funeralCards: [
      ['Décès de l’adhérent', ['Acte de décès.', 'Copie d’acte de mariage.', 'RIB du conjoint survivant.', 'Copie CIN et copie carte d’adhérent.', 'En cas d’absence de conjoint : attestation de lien de parenté avec le défunt, acte d’hérédité et RIB du bénéficiaire.']],
      ['Décès du conjoint', ['Acte de décès.', 'Copie d’acte de mariage.', 'CIN du conjoint survivant.', 'RIB du conjoint survivant.']],
      ['Décès de l’enfant', ['Acte de décès du défunt.', 'Acte de naissance du défunt.', 'RIB du bénéficiaire.', 'Copie CIN et copie carte d’adhérent.']],
      ['Contribution financière', ['7 000 DH en cas de décès de l’adhérent âgé au plus de 75 ans.', '2 500 DH en cas de décès du conjoint.', '1 000 DH en cas de décès d’un enfant.']]
    ]
  };

  const amtsDetailAr = {
    ...amtsDetailFr,
    title: 'المساعدة الطبية والنقل الصحي',
    subtitle: [
      'تدعم FOS-Agri منخرطيها خلال الفترات الصعبة عبر خدمة المساعدة الطبية والنقل الصحي المتعاقد بشأنها مع شركة Wafa IMA Assistance.',
      'تشمل هذه المساعدة ضمانات متعددة في الحالات غير المتوقعة والمستعجلة، مثل الحوادث والمرض والوفاة، إضافة إلى السفر إلى الخارج والإجلاء الصحي للحالات غير القابلة للعلاج بالمغرب وخدمات المواكبة الطبية.'
    ],
    beneficiariesTitle: 'المستفيدون',
    prestationsTitle: 'الخدمات المضمونة',
    funeralTitle: 'مسطرة طلب الاستفادة',
    contactTitle: 'كيف يمكن الاتصال بـ Wafa IMA ؟',
    contactIntro: 'لكل طلب مساعدة، يعمل مركز النداء 24 ساعة على 24 و7 أيام على 7 لتفعيل الحلول المنصوص عليها تعاقديا.',
    contactInstruction: 'يتعين على المنخرط التعريف بنفسه عبر الاسم والنسب ورقم الانخراط بالمؤسسة أو رقم البطاقة الوطنية.',
    beneficiaries: [
      ['01', 'المنخرط وزوجه أو أزواجه.'],
      ['02', 'الأطفال المصرح بهم والذين هم في كفالة المؤمن، أقل من 21 سنة أو إلى غاية 26 سنة إذا كانوا يتابعون دراستهم.'],
      ['03', 'الأطفال في وضعية إعاقة دون حد للسن، وذوو الحقوق من أيتام المنخرطين المتوفين والأرملة أو الأرمل.'],
      ['04', 'الأصول الذين تم أداء الزيادة الخاصة بهم 65 درهما لفائدة Wafa IMA Assistance من طرف المنخرط المعني.']
    ],
    groups: [
      {
        title: 'المساعدة الطبية بالمغرب',
        icon: 'fa-house-medical',
        services: [
          ['النقل الصحي الحضري بالمغرب (ذهابا وإيابا)', 'التكفل بالنقل الصحي نحو مؤسسة استشفائية داخل نفس المدينة التي يختارها المنخرط.'],
          ['النقل الصحي بين المدن بالمغرب (ذهابا وإيابا)', 'التكفل بالنقل الصحي نحو أقرب مؤسسة استشفائية وأكثرها تجهيزا لعلاج الحالة المرضية أو المرض المستعجل، بتنسيق مشترك بين الطبيب المعالج وطبيب Wafa IMA.'],
          ['تنقل المنخرط نحو مؤسسة استشفائية', 'إذا تكفل المنخرط بالتنقل نحو المؤسسة الاستشفائية، يمكن لـ Wafa IMA التكفل بالعودة إلى المنزل شريطة إخبارها داخل أجل 5 أيام ابتداء من يوم وقوع الحادث.'],
          ['النقل المتكرر لحصص العلاج الكيميائي والإشعاعي والكوريترابي', 'تغطي Wafa IMA Assistance عمليات الإجلاء المتكررة لإجراء حصص العلاج الكيميائي أو الإشعاعي أو الكوريترابي أو غيرها من الأعمال المرتبطة بالسرطان، شريطة أن يكون النقل مبررا طبيا، في حدود اثنتي عشرة مرة في السنة.'],
          ['الاستشفاء والقبول', ['تسبيق للقبول في مؤسسة استشفائية بالمغرب في حدود 10 000 درهم، يسترجعه المنخرط لاحقا.', 'أخذ موعد داخل مؤسسة استشفائية بفرنسا.']],
          ['المساعدة الطبية بالمنزل', ['زيارة طبية منزلية 24 ساعة على 24 و7 أيام على 7 في 68 مدينة بالمملكة مقابل 120 درهما.', 'إرسال الأدوية بعد الزيارة الطبية، مع بقاء مصاريف الأدوية على عاتق المنخرط.', 'زيارة ممرض، مع بقاء تكلفة الأدوية والمعدات على عاتق المنخرط.', 'توجيه المنخرط نحو أقرب صيدلية من محل السكن.']],
          ['الإجلاء والنقل الصحي', ['الإجلاء الصحي من المغرب إلى الخارج بالنسبة للحالات غير القابلة للعلاج بالمغرب.', 'ضمان مصاريف العلاج في حالة الإجلاء الصحي بسقف 80 000 درهم، يسترجعه المنخرط لاحقا.', 'التكفل بالقريب المرافق أو الحضور بجانب الشخص المؤمن المستشفى دون مرافق بالمغرب أو بالخارج، شريطة طلب ذلك مسبقا.', 'تذكرة سفر ذهابا وإيابا.', 'بالمغرب: 500 درهم لليلة لمدة 8 ليال.', 'بالخارج: 900 درهم لليلة لمدة 7 ليال.']],
          ['ما بعد الاستشفاء', ['التكفل بالإجلاء للمراقبة والتتبع الطبي بعد الاستشفاء بالمغرب، في حدود مرتين كحد أقصى داخل أجل 24 شهرا.', 'مصاريف تمديد الإقامة بعد الاستشفاء: بالمغرب 500 درهم لليلة لمدة 8 ليال كحد أقصى، وبالخارج 900 درهم لليلة لمدة 7 ليال كحد أقصى.', 'العودة إلى المنزل بعد استشفاء الشخص المؤمن بالخارج.']],
          ['منحة الولادة', ['في حالة ولادة مولود جديد، يجب على المستفيد إيداع الوثائق داخل أجل 90 يوما ابتداء من تاريخ الولادة للاستفادة من منحة قدرها 350 درهما.', 'إشعار أو شهادة الولادة.', 'نسخة أصلية من عقد الازدياد.', 'كشف التعريف البنكي للمنخرط.', 'نسخة من البطاقة الوطنية للتعريف للمنخرط.', 'نسخة من بطاقة الانخراط في FOS-Agri.']]
        ]
      },
      {
        title: 'النقل والمساعدة الجنائزية',
        icon: 'fa-ribbon',
        services: [
          ['النقل الجنائزي', ['نقل الشخص المؤمن المتوفى إلى مكان الدفن.', 'التكفل بالإجراءات التي تسمح بالنقل.', 'مرافقة الجثمان المعزول.']],
          ['المنحة الجنائزية', 'تواكب المنحة الجنائزية ذوي الحقوق حسب حالة الوفاة والوثائق المثبتة المطلوبة.']
        ]
      }
    ],
    funeralCards: [
      ['وفاة المنخرط', ['عقد الوفاة.', 'نسخة من عقد الزواج.', 'كشف التعريف البنكي للزوج أو الزوجة الباقية على قيد الحياة.', 'نسخة من البطاقة الوطنية ونسخة من بطاقة الانخراط.', 'في حالة غياب الزوج أو الزوجة: شهادة صلة القرابة بالمتوفى، رسم الإراثة وكشف التعريف البنكي للمستفيد.']],
      ['وفاة الزوج أو الزوجة', ['عقد الوفاة.', 'نسخة من عقد الزواج.', 'البطاقة الوطنية للزوج أو الزوجة الباقية على قيد الحياة.', 'كشف التعريف البنكي للزوج أو الزوجة الباقية على قيد الحياة.']],
      ['وفاة الطفل', ['عقد وفاة المتوفى.', 'عقد ازدياد المتوفى.', 'كشف التعريف البنكي للمستفيد.', 'نسخة من البطاقة الوطنية ونسخة من بطاقة الانخراط.']],
      ['المساهمة المالية', ['7 000 درهم في حالة وفاة المنخرط البالغ 75 سنة على الأكثر.', '2 500 درهم في حالة وفاة الزوج أو الزوجة.', '1 000 درهم في حالة وفاة طفل.']]
    ]
  };

  const amtsDetailZgh = {
    ...amtsDetailFr,
    title: 'ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ',
    subtitle: [
      'FOS-Agri ⵜⵜⴰⵍⵍⴰ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵜⵉⵣⵉ ⵉⵎⵇⵇⵓⵔⵏ ⵙ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⵙ Wafa IMA Assistance.',
      'ⵜⴰⵏⴼⵓⵙⵜ ⴰⴷ ⵜⴳⴰ ⵉⴳⵔⴰⵡⵏ ⵏ ⵜⴰⵍⵍⴰⵍⵜ ⴳ ⵉⵎⵓⵔⵙⵏ ⵉⵎⵥⵍⵉⵢⵏ: ⴰⵙⵙⵉⴹⵏ, ⴰⵎⵓⵔⵙ, ⵜⴰⵎⵜⵜⴰⵏⵜ, ⴰⵙⴰⴼⴰⵔ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ.'
    ],
    beneficiariesTitle: 'ⵉⵎⵏⴼⴰⵄⵏ',
    prestationsTitle: 'ⵜⵉⵏⴼⵓⵙⵉⵏ ⵉⵜⵜⵓⴹⵎⴰⵏⵏ',
    funeralTitle: 'ⴰⵙⴽⴰⵔ ⵏ ⵓⵙⵓⵜⵔ',
    contactTitle: 'ⵎⴰⵎⵏⴽ ⴰⴷ ⵜⵏⵢⵉⵍⵉ ⴷ Wafa IMA ?',
    contactIntro: 'ⴰⵙⴰⵜⵉ ⵏ ⵜⴰⵍⵍⴰⵍⵜ ⵉⵍⵍⴰ 24h/24 ⴷ 7j/7 ⵉ ⵓⵙⴽⵔ ⵏ ⵉⴼⵔⴰⵏ ⵉⵍⵍⴰⵏ ⴳ ⵓⵎⵙⴰⵡⴰⴹ.',
    contactInstruction: 'ⴰⵎⵏⵅⵔⴰⵟ ⴰⴷ ⵉⵙⵎⵓⵏ ⵉⵙⵎ, ⵉⵙⵎ ⵏ ⵜⵡⴰⵛⵓⵍⵜ, ⵓⵟⵟⵓⵏ ⵏ ⵓⵏⵅⵔⴰⵟ ⵏⵖ CIN.',
    beneficiaries: [
      ['01', 'ⴰⵎⵏⵅⵔⴰⵟ ⴷ ⵓⵙⵍⵉ ⵏⵏⵙ.'],
      ['02', 'ⵉⴼⵔⵅⴰⵏ ⵉⵜⵜⵓⵙⵙⵏⵖⵎⵙⵏ ⵉⵍⵍⴰⵏ ⴳ ⵓⵙⵔⵓⵜ ⵏ ⵓⵎⵏⵅⵔⴰⵟ, ⵓⵔ ⵙⵙⴰⵡⴹⵏ 21 ⵏⵖ ⴰⵔ 26 ⵎⴰ ⴰⴷ ⵙⵙⵎⴷⵏ ⵜⵉⵖⵔⵉ.'],
      ['03', 'ⵉⴼⵔⵅⴰⵏ ⴳ ⵓⵙⵔⵓⵜ ⵉⵎⵥⵍⵉ ⴱⵍⴰ ⵜⵉⵍⴰⵍ ⵏ ⵓⵙⴳⴳⵯⴰⵙ, ⴷ ⵉⵎⵏⴼⴰⵄⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⵉⵎⵎⵓⵜⵏ, ⵜⴰⵊⵊⴰⵍⵜ ⵏⵖ ⴰⵊⵊⴰⵍ.'],
      ['04', 'ⵉⵎⵖⴰⵔⵏ ⵉ ⴼⴽⴰ ⵓⵎⵏⵅⵔⴰⵟ 65 DH ⵉ Wafa IMA Assistance.']
    ],
    groups: [
      {
        title: 'ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴳ ⵍⵎⵖⵔⵉⴱ',
        icon: 'fa-house-medical',
        services: [
          ['ⴰⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⴳ ⵜⵎⴷⵉⵏⵜ', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⵖⵔ ⵓⵎⵎⴰⵙ ⴰⵙⵉⴱⵉⵜⴰⵍ ⴳ ⵢⴰⵜ ⵜⵎⴷⵉⵏⵜ ⵉⵅⵜⴰⵔ ⵓⵎⵏⵅⵔⴰⵟ.'],
          ['ⴰⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⴳⵔ ⵜⵎⴷⵉⵏⵉⵏ', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵉⵡⴹ ⵖⵔ ⵓⵎⵎⴰⵙ ⴰⵙⵉⴱⵉⵜⴰⵍ ⴰⵇⵔⴰⴱ ⴷ ⴰⵎⵙⴰⵔⵓ ⵉ ⵓⵎⵓⵔⵙ ⴰⵎⵥⵍⵉ, ⵙ ⵓⵎⵙⴰⵡⴰⴹ ⴳⵔ ⵓⵎⵙⵙⵉⵊⵊⵉ ⴷ ⵓⵎⵙⵙⵉⵊⵊⵉ ⵏ Wafa IMA.'],
          ['ⴰⵙⵉⵡⴹ ⵏ ⵓⵎⵏⵅⵔⴰⵟ ⵖⵔ ⵓⵎⵎⴰⵙ ⴰⵙⵉⴱⵉⵜⴰⵍ', 'ⵎⴰ ⵉⵙⵉⵡⴹ ⵓⵎⵏⵅⵔⴰⵟ ⵉⵎⴰⵏ ⵏⵏⵙ ⵖⵔ ⵓⵎⵎⴰⵙ, Wafa IMA ⵜⵣⵎⵔ ⴰⴷ ⵜⴰⵎⵓⴷⴷⵓ ⴰⵔⵔⴰ ⵖⵔ ⵜⴰⴷⴷⴰⵔⵜ ⵎⴰ ⵉⵜⵜⵓⵙⵙⵏⵖⵎⵙ ⴳ 5 ⵡⴰⵙⵙⵏ.'],
          ['ⴰⵙⵉⵡⴹ ⵉⵜⵜⵓⵄⴰⵡⴷⵏ ⵉ ⵙⵉⴰⵏⵚ ⵏ ⵜⵙⵙⵉⵊⵊⵉ', 'Wafa IMA Assistance ⵜⴰⵎⵓⴷⴷⵓ ⵉⵙⵉⵡⴹⵏ ⵉⵜⵜⵓⵄⴰⵡⴷⵏ ⵉ ⵜⵉⵙⵉⴰⵏⵚ ⵏ ⵜⵙⵙⵉⵊⵊⵉ ⵏ ⵓⵙⵎⵎⵓⵎ, ⵏ ⵜⵔⴰⴷⵢⵓⵜ, ⴷ ⵜⵓⵔⴰⴷⵢⵓⵜ ⵏⵖ ⵉⵎⵓⴷⴷⵓⵏ ⵉⵣⴷⵉⵏ ⴷ ⵓⵎⵓⵔⵙ ⵏ ⵓⴽⴰⵏⵙⵉⵔ, ⵎⴰ ⵉⵍⵍⴰ ⵓⵙⵖⵏⵎⵙ ⴰⴷⵓⵙⴰⵏ, ⴰⵔ 12 ⵜⵉⴽⴽⴰⵍ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
          ['ⴰⵙⵉⴱⵉⵜⴰⵍ ⴷ ⵓⵇⴱⴰⵍ', ['ⴰⵙⵍⴼ ⵉ ⵓⵇⴱⴰⵍ ⴳ ⵓⵎⵎⴰⵙ ⴰⵙⵉⴱⵉⵜⴰⵍ ⴳ ⵍⵎⵖⵔⵉⴱ ⴰⵔ 10 000 DH, ⴰⴷ ⵉⵜⵜⵓⵔⴰⵔⴰ ⵙⵖⵓⵔ ⵓⵎⵏⵅⵔⴰⵟ.', 'ⴰⵙⴽⵔ ⵏ ⵜⵉⵣⵉ ⵏ ⵜⵉⵔⵣⴰ ⴳ ⵓⵎⵎⴰⵙ ⴰⵙⵉⴱⵉⵜⴰⵍ ⴳ ⴼⵔⴰⵏⵙⴰ.']],
          ['ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴳ ⵜⴰⴷⴷⴰⵔⵜ', ['ⵜⵉⵔⵣⴰ ⵏ ⵓⵎⵙⵙⵉⵊⵊⵉ ⵖⵔ ⵜⴰⴷⴷⴰⵔⵜ 24h/24 ⴷ 7j/7 ⴳ 68 ⵜⵎⴷⵉⵏⵜ ⵙ 120 DH.', 'ⴰⵙⵉⵡⴹ ⵏ ⵉⴷⵡⴰⵢⵏ ⴹⴼⵕ ⵜⵉⵔⵣⴰ ⵜⴰⴷⵓⵙⴰⵏⵜ, ⵎⴰⵛⴰ ⵉⵙⵎⵏ ⵏ ⵉⴷⵡⴰⵢⵏ ⵅⴼ ⵓⵎⵏⵅⵔⴰⵟ.', 'ⵜⵉⵔⵣⴰ ⵏ ⵓⵎⵙⴰⴳⵏ, ⵉⵙⵎⵏ ⵏ ⵉⴷⵡⴰⵢⵏ ⴷ ⵓⵎⵙⴰⵔⵓ ⵅⴼ ⵓⵎⵏⵅⵔⴰⵟ.', 'ⴰⵙⴷⵓ ⵖⵔ ⵜⴰⴼⴰⵔⵎⴰⵙⵉⵜ ⵜⴰⵇⵔⴰⴱⵜ ⵉ ⵜⴰⴷⴷⴰⵔⵜ.']],
          ['ⴰⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⴷ ⵓⵙⴰⴼⴰⵔ', ['ⴰⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⵙⴳ ⵍⵎⵖⵔⵉⴱ ⵖⵔ ⴱⵕⵕⴰ ⵉ ⵉⵎⵓⵔⵙⵏ ⵓⵔ ⵉⵜⵜⵓⵙⵙⵉⵊⵊⴰⵏ ⴳ ⵍⵎⵖⵔⵉⴱ.', 'ⴰⴹⵎⴰⵏ ⵏ ⵉⵙⵎⵏ ⵏ ⵜⵙⵙⵉⵊⵊⵉ ⴳ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⴰⵔ 80 000 DH, ⴰⴷ ⵉⵜⵜⵓⵔⴰⵔⴰ ⵙⵖⵓⵔ ⵓⵎⵏⵅⵔⴰⵟ.', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵇⵔⵉⴱ ⴰⵎⵓⵏ ⵏⵖ ⵜⵉⵍⵉ ⵖⵔ ⵓⵎⵏⵅⵔⴰⵟ ⵉⵍⵍⴰⵏ ⴳ ⵓⵙⵉⴱⵉⵜⴰⵍ, ⵙ ⵓⵙⵓⵜⵔ ⴰⵎⵣⵡⴰⵔⵓ.', 'ⵜⵉⴽⵉⵜ ⵏ ⵓⵙⴰⴼⴰⵔ ⵔⴰⵢ ⴷ ⴰⵔⵔⴰ.', 'ⴳ ⵍⵎⵖⵔⵉⴱ: 500 DH ⵉ ⵢⵉⴹ ⴳ 8 ⵡⵓⵙⵙⴰⵏ.', 'ⴳ ⴱⵕⵕⴰ: 900 DH ⵉ ⵢⵉⴹ ⴳ 7 ⵡⵓⵙⵙⴰⵏ.']],
          ['ⴹⴼⵕ ⴰⵙⵉⴱⵉⵜⴰⵍ', ['ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵉⵡⴹ ⵉ ⵓⵙⵙⵓⴷⵙ ⴷ ⵓⵜⵜⴰⴱⴰⵄ ⴰⴷⵓⵙⴰⵏ ⴹⴼⵕ ⴰⵙⵉⴱⵉⵜⴰⵍ ⴳ ⵍⵎⵖⵔⵉⴱ, ⴰⵔ 2 ⵜⵉⴽⴽⴰⵍ ⴳ 24 ⴰⵢⵢⵓⵔ.', 'ⵉⵙⵎⵏ ⵏ ⵓⵙⵖⵔⵙ ⵏ ⵓⵙⵖⵉⵎ ⴹⴼⵕ ⴰⵙⵉⴱⵉⵜⴰⵍ: ⴳ ⵍⵎⵖⵔⵉⴱ 500 DH ⵉ ⵢⵉⴹ ⴰⵔ 8 ⵡⵓⵙⵙⴰⵏ, ⴳ ⴱⵕⵕⴰ 900 DH ⵉ ⵢⵉⴹ ⴰⵔ 7 ⵡⵓⵙⵙⴰⵏ.', 'ⴰⵔⵔⴰ ⵖⵔ ⵜⴰⴷⴷⴰⵔⵜ ⴹⴼⵕ ⴰⵙⵉⴱⵉⵜⴰⵍ ⴳ ⴱⵕⵕⴰ.']],
          ['ⵜⴰⵎⵓⵏⵜ ⵏ ⵓⵍⴰⵍ', ['ⵎⴰ ⵉⵍⵍⴰ ⵓⵍⴰⵍ ⵏ ⵓⴼⵔⵓⵅ ⴰⵎⴰⵢⵏⵓ, ⴰⵎⵏⴼⴰⵄ ⴰⴷ ⵉⴼⴽ ⵉⵙⵍⴽⴰⵎⵏ ⴳ 90 ⵡⴰⵙⵙⵏ ⵙⴳ ⵜⵉⵣⵉ ⵏ ⵓⵍⴰⵍ ⵉ 350 DH.', 'ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵓⵍⴰⵍ.', 'ⵏⵙⵅⴰ ⵜⴰⵙⵍⴽⵉⵏⵜ ⵜⴰⵙⵍⵉⵜ ⵏ ⵓⵍⴰⵍ.', 'RIB ⵏ ⵓⵎⵏⵅⵔⴰⵟ.', 'ⵏⵙⵅⴰ ⵏ CIN ⵏ ⵓⵎⵏⵅⵔⴰⵟ.', 'ⵏⵙⵅⴰ ⵏ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵏⵅⵔⴰⵟ ⵏ FOS-Agri.']]
        ]
      },
      {
        title: 'ⴰⵙⵉⵡⴹ ⴷ ⵜⴰⵍⵍⴰⵍⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ',
        icon: 'fa-ribbon',
        services: [
          ['ⴰⵙⵉⵡⴹ ⵏ ⵜⵎⵜⵜⴰⵏⵜ', ['ⴰⵙⵉⵡⴹ ⵏ ⵓⵎⵏⵅⵔⴰⵟ ⵉⵎⵎⵓⵜ ⵖⵔ ⵓⵎⴹⴰⵍ ⵏ ⵓⵎⴹⴰⵍ.', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵉⵙⴽⴰⵔⵏ ⵉ ⵓⵙⵉⵡⴹ.', 'ⴰⵎⵓⵏ ⵏ ⵓⴳⴹⵉⴹ ⵉⵎⵍⵉ.']],
          ['ⵜⴰⵎⵓⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ', 'ⵜⴰⵎⵓⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ ⵜⵜⴰⵍⵍⴰ ⵉ ⵉⵎⵏⴼⴰⵄⵏ ⵙ ⵓⴳⴰⵎⴰ ⵏ ⵜⵎⵜⵜⴰⵏⵜ ⴷ ⵉⵙⵍⴽⴰⵎⵏ ⵉⵜⵜⵓⵙⵓⵜⵔⵏ.']
        ]
      }
    ],
    funeralCards: [
      ['ⵜⴰⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵎⵏⵅⵔⴰⵟ', ['ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ.', 'ⵏⵙⵅⴰ ⵏ ⵓⵎⵙⵍⴰⵢ ⵏ ⵓⵣⵡⴰⵊ.', 'RIB ⵏ ⵓⵙⵍⵉ ⵉⴷⴷⵔⵏ.', 'ⵏⵙⵅⴰ ⵏ CIN ⴷ ⵏⵙⵅⴰ ⵏ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵏⵅⵔⴰⵟ.', 'ⵎⴰ ⵓⵔ ⵉⵍⵍⵉ ⵓⵙⵍⵉ: ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵓⵣⴷⴰⵢ ⵏ ⵜⵡⴰⵛⵓⵍⵜ, ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵔⵉⴽⴰ ⴷ RIB ⵏ ⵓⵎⵏⴼⴰⵄ.']],
      ['ⵜⴰⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵙⵍⵉ', ['ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ.', 'ⵏⵙⵅⴰ ⵏ ⵓⵎⵙⵍⴰⵢ ⵏ ⵓⵣⵡⴰⵊ.', 'CIN ⵏ ⵓⵙⵍⵉ ⵉⴷⴷⵔⵏ.', 'RIB ⵏ ⵓⵙⵍⵉ ⵉⴷⴷⵔⵏ.']],
      ['ⵜⴰⵎⵜⵜⴰⵏⵜ ⵏ ⵓⴼⵔⵓⵅ', ['ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵎⵎⵓⵜ.', 'ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵓⵍⴰⵍ ⵏ ⵓⵎⵎⵓⵜ.', 'RIB ⵏ ⵓⵎⵏⴼⴰⵄ.', 'ⵏⵙⵅⴰ ⵏ CIN ⴷ ⵏⵙⵅⴰ ⵏ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵏⵅⵔⴰⵟ.']],
      ['ⵜⴰⵎⵓⵏⵜ ⵜⴰⴷⵔⵉⵎⵜ', ['7 000 DH ⴳ ⵜⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵎⵏⵅⵔⴰⵟ ⴰⵔ 75 ⵓⵙⴳⴳⵯⴰⵙ.', '2 500 DH ⴳ ⵜⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵙⵍⵉ.', '1 000 DH ⴳ ⵜⵎⵜⵜⴰⵏⵜ ⵏ ⵓⴼⵔⵓⵅ.']]
    ]
  };

  const prevoyanceExtraFr = [
    {
      navIndex: 3,
      badge: 'FORFAIT FUNERAIRE',
      title: 'FORFAIT FUNERAIRE',
      intro: 'La prise en charge des forfaits funéraires par la FOS-Agri au profit des retraités âgés de plus de 75 ans constituerait une avancée sociale significative en faveur de cette catégorie de bénéficiaires. Cette intervention vient compléter le dispositif existant et renforcer la vocation solidaire, tout en garantissant un accompagnement adapté à l’ensemble de ses bénéficiaires, quel que soit leur âge.',
      beneficiariesTitle: 'Bénéficiaires',
      beneficiaries: [{ number: '01', text: 'Adhérents âgés de plus de 75 ans.' }, { number: '02', text: 'Ayants droit : conjoints et enfants.' }],
      blocks: [
        {
          title: 'Forfait funéraire de plus de 75 ans',
          icon: 'fa-file-signature',
          intro: 'Tout dossier transmis à la Fondation pour bénéficier de cette aide financière doit contenir, selon le cas, les documents justificatifs suivants. La copie de la CIN et de la carte FOS-Agri de l’adhérent principal est obligatoire dans tous les cas.',
          items: [
            { title: 'Décès de l’adhérent principal avec conjoint', icon: 'fa-user-shield', bullets: ['Acte de décès.', 'Copie d’acte de mariage.', 'RIB du conjoint survivant.', 'Acte d’hérédité.'] },
            { title: 'Décès de l’adhérent sans conjoint', icon: 'fa-user', bullets: ['Acte de décès.', 'Attestation de lien de parenté avec le défunt.', 'Acte d’hérédité.', 'RIB du bénéficiaire.'] },
            { title: 'Décès du conjoint', icon: 'fa-people-arrows', bullets: ['Acte de décès.', 'Attestation de lien de parenté avec le défunt.', 'RIB du bénéficiaire.'] },
            { title: 'Décès d’un adhérent célibataire', icon: 'fa-person', body: 'Bénéficiaires : parents.', bullets: ['Acte de décès.', 'Attestation de lien de parenté avec le défunt.', 'RIB du bénéficiaire.'] },
            { title: 'Décès de l’enfant', icon: 'fa-child', body: 'Concerne l’enfant de moins de 21 ans, ou de moins de 26 ans s’il poursuit ses études au Maroc, ou s’il est scolarisé à l’étranger lors d’un séjour au Maroc.', bullets: ['Acte de décès du défunt.', 'Acte de naissance du défunt.', 'RIB du bénéficiaire.'] }
          ]
        },
        {
          title: 'Contribution financière',
          icon: 'fa-hand-holding-dollar',
          mode: 'cards',
          items: [
            { amount: '7 000 DH', label: 'Adhérent principal.' },
            { amount: '2 500 DH', label: 'Conjoint.' },
            { amount: '1 000 DH', label: 'Enfant.' }
          ]
        }
      ]
    },
    {
      navIndex: 4,
      badge: 'CENTRE MEDICO-SOCIAL',
      title: 'CENTRE MEDICO-SOCIAL',
      intro: ['La FOS-Agri assure via son centre médico-social les consultations données par une équipe médicale spécialisée et performante.', 'Le centre assure également l’accompagnement et le suivi des adhérents en situation de pré ou post hospitalisation, ainsi que le conseil et l’orientation des adhérents.'],
      beneficiariesTitle: 'Bénéficiaires',
      beneficiaries: [{ number: '01', text: 'L’adhérent.' }, { number: '02', text: 'Le ou les conjoints de l’adhérent.' }, { number: '03', text: 'Leurs enfants.' }],
      blocks: [
        {
          title: 'Spécialités au niveau central',
          icon: 'fa-stethoscope',
          items: [
            { title: 'Médecine interne', icon: 'fa-user-doctor', rows: [['Lieu', 'Bureau médico-social'], ['Jour', 'Lundi'], ['Heure', '8h30'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'Cardiologie', icon: 'fa-heart-pulse', rows: [['Lieu', 'Bureau médico-social'], ['Jour', 'Jeudi'], ['Heure', '10h'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ORL', icon: 'fa-ear-listen', rows: [['Lieu', 'Cabinet du médecin'], ['Créneaux', 'Lundi 12h, Mardi, Jeudi, Vendredi'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'Urologie', icon: 'fa-notes-medical', rows: [['Lieu', 'Cabinet du médecin'], ['Créneaux', 'Lundi 11h, Mardi, Mercredi, Jeudi, Vendredi'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'Gynécologie', icon: 'fa-venus', rows: [['Lieu', 'Bureau médico-social'], ['Jour', 'Mercredi'], ['Heure', '09h30'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'Dermatologie', icon: 'fa-hand-sparkles', rows: [['Lieu', 'Bureau médico-social'], ['Jour', 'Jeudi'], ['Heure', '08h30'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'Endocrinologie', icon: 'fa-vial-circle-check', rows: [['Lieu', 'Cabinet du médecin'], ['Jour', 'Jeudi'], ['Heure', '10h'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'Gastro-entérologie', icon: 'fa-pills', rows: [['Lieu', 'Bureau médico-social'], ['Jour', 'Mardi'], ['Heure', '09h'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'Allergo-phtisiologie', icon: 'fa-lungs', rows: [['Lieu', 'Bureau médico-social'], ['Jour', 'Mercredi'], ['Heure', '08h30'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'Traumatologie', icon: 'fa-bone', rows: [['Lieu', 'Cabinet du médecin'], ['Jour', 'Vendredi'], ['Heure', '09h'], ['Téléphone', '05 37 10 35 14 / 06 57 83 15 17']] }
          ]
        },
        {
          title: 'Spécialités au niveau régional',
          icon: 'fa-map-location-dot',
          items: [
            { title: 'Région de Laâyoune - Sakia El Hamra', icon: 'fa-location-dot', rows: [['Médecin', 'Docteur LAJOUAD BAIHI'], ['Adresse', 'Av Hassan II, Phosboukraâ, LAAYOUNE'], ['Prise de RDV', '0661 26 99 97'], ['Relais régional', 'MOUSSAOUI MOHAMED ALI'], ['Téléphone du relais', '0657 83 20 46']] },
            { title: 'Région de Dakhla - Oued Eddahab', icon: 'fa-location-dot', rows: [['Médecin', 'Docteur SADIK YOUNESS'], ['Adresse', 'App N°4, N° 17/1105, rue mosquée, Hay Massira, Dakhla'], ['Prise de RDV', '0667 98 08 77'], ['Relais régional', 'MINA SAAD ALLAH'], ['Téléphone du relais', '0657 83 17 87']] },
            { title: 'Région de Guelmim - Oued Noun', icon: 'fa-location-dot', rows: [['Médecin', 'Docteur HAIDAR KHAIR'], ['Adresse', 'Imm Assafae, 3ème étage, App N°9, Bir Inzarane, Guelmim'], ['Prise de RDV', '0528 87 34 61'], ['Relais régional', 'LATIF AIDA'], ['Téléphone du relais', '0657 83 15 04']] },
            { title: 'Région de Drâa - Tafilalet', icon: 'fa-location-dot', rows: [['Médecin', 'Docteur GHANEME ABDELAZIZ'], ['Adresse', '14, Rue de la mosquée, Errachidia'], ['Prise de RDV', '0535 57 27 76'], ['Relais régional', 'BRITEL ABDESSAMAD'], ['Téléphone du relais', '06 68 90 90 84']] },
            { title: 'Région de Béni Mellal - Khénifra', icon: 'fa-location-dot', rows: [['Médecin', 'Docteur MALKY ABDELHAMID'], ['Adresse', 'Avenue 2 Mars, Sidi Abdelhalim, Béni Mellal'], ['Prise de RDV', '—'], ['Relais régional', 'MALIHY AMAL'], ['Téléphone du relais', '06 57 83 18 94']] },
            { title: 'Région de Casablanca - Settat', icon: 'fa-location-dot', rows: [['Médecin', 'Docteur MOUFTADI ABDELFATTAH'], ['Adresse', 'Avenue Bir Anzarane N° 16, El Jadida'], ['Prise de RDV', '0523 39 42 03'], ['Relais régional', 'GUADDA MOHAMED'], ['Téléphone du relais', '36 16 83 57 06']] },
            { title: 'Région de Fès - Meknès', icon: 'fa-location-dot', rows: [['Médecin', 'Docteur DBAB Mohamed'], ['Adresse', '4, Rue Omar Ben Chamsi, Hamria, Meknès'], ['Prise de RDV', '0661 15 93 56'], ['Relais régional', 'SAID AIT BERRI'], ['Téléphone du relais', '0657 83 20 37']] },
            { title: 'Région de Marrakech - Safi', icon: 'fa-location-dot', rows: [['Médecin', 'BELAHNECH ABDOULMOUTTALIB'], ['Adresse', '49, Bd Rabat, Safi'], ['Prise de RDV', '05 24 46 37 97'], ['Relais régional', 'SERFATI CHOUAIB'], ['Téléphone du relais', '06 57 83 17 37']] },
            { title: 'Région de Rabat - Salé - Kénitra', icon: 'fa-location-dot', rows: [['Médecin', 'Docteur IBNABDALLAH MOHAMED'], ['Adresse', '15, Rue Jabel El Ayachi, Centre Khmisset'], ['Prise de RDV', '0537 55 05 00'], ['Relais régional', 'EL BERIRI SAMIRA'], ['Téléphone du relais', '06 57 83 16 63']] }
          ]
        }
      ]
    },
    {
      navIndex: 5,
      badge: 'AIDES AUX PERSONNES AUX BESOINS SPECIFIQUES',
      title: 'AIDES AUX PERSONNES AUX BESOINS SPECIFIQUES',
      intro: 'La FOS-Agri a mis en place un programme d’aide aux enfants des adhérents en situations d’handicap présentant des besoins spécifiques, en contribuant à la prise en charge de leurs besoins particuliers à travers une aide d’un montant de 5 000 DH.',
      beneficiariesTitle: 'Bénéficiaires',
      beneficiaries: [{ number: '01', text: 'Tous les enfants des adhérents de la FOS-Agri en situation d’handicap moteur ou mental, justifiée par une attestation délivrée par les autorités publiques compétentes, et n’exerçant aucune activité génératrice de revenu.' }],
      blocks: [
        { title: 'Inscription et modalités', icon: 'fa-clipboard-check', items: [{ title: 'Modalités', icon: 'fa-list-check', bullets: ['Inscription en ligne.', 'Toutes les demandes respectant les conditions sont acceptées.'] }] },
        { title: 'Pièces à fournir', icon: 'fa-folder-open', items: [{ title: 'Dossier justificatif', icon: 'fa-file-medical', bullets: ['Copie du dossier médical de l’intéressé.', 'Copie du formulaire relatif au type d’handicap portant l’avis de la commission médicale provinciale.', 'Pour continuer à bénéficier de l’aide, les adhérents concernés doivent fournir chaque année un certificat de vie.', 'Pour les enfants dont l’handicap n’est pas définitif, un nouveau dossier médical doit être fourni chaque année.'] }] }
      ]
    },
    {
      navIndex: 6,
      type: 'medicalPartners',
      badge: 'CONVENTIONS ET PARTENARIATS MEDICALES',
      title: 'Conventions et partenariats médicaux',
      intro: 'Carte régionale interactive et section séparée pour les conventions au niveau central.'
    }
  ];

  const prevoyanceExtraAr = [
    {
      navIndex: 3,
      badge: 'منحة الوفاة',
      title: 'منحة الوفاة',
      intro: 'يشكل التكفل بمنحة الوفاة من طرف FOS-Agri لفائدة المتقاعدين الذين تتجاوز أعمارهم 75 سنة خطوة اجتماعية مهمة لفائدة هذه الفئة من المستفيدين. وتأتي هذه المبادرة لتكمل المنظومة القائمة وتعزز البعد التضامني، مع ضمان مواكبة ملائمة لجميع المستفيدين مهما كان سنهم.',
      beneficiariesTitle: 'المستفيدون',
      beneficiaries: [{ number: '01', text: 'المنخرطون الذين تتجاوز أعمارهم 75 سنة.' }, { number: '02', text: 'ذوو الحقوق: الأزواج والأبناء.' }],
      blocks: [
        {
          title: 'منحة الوفاة لأكثر من 75 سنة',
          icon: 'fa-file-signature',
          intro: 'كل ملف يوجه إلى المؤسسة للاستفادة من هذه المساعدة المالية يجب أن يتضمن، حسب الحالة، الوثائق المثبتة التالية. نسخة البطاقة الوطنية ونسخة بطاقة FOS-Agri للمنخرط الرئيسي إلزاميتان في جميع الحالات.',
          items: [
            { title: 'وفاة المنخرط الرئيسي مع وجود الزوج أو الزوجة', icon: 'fa-user-shield', bullets: ['عقد الوفاة.', 'نسخة من عقد الزواج.', 'كشف التعريف البنكي للزوج أو الزوجة الباقية على قيد الحياة.', 'رسم الإراثة.'] },
            { title: 'وفاة المنخرط في غياب الزوج أو الزوجة', icon: 'fa-user', bullets: ['عقد الوفاة.', 'شهادة صلة القرابة بالمتوفى.', 'رسم الإراثة.', 'كشف التعريف البنكي للمستفيد.'] },
            { title: 'وفاة الزوج أو الزوجة', icon: 'fa-people-arrows', bullets: ['عقد الوفاة.', 'شهادة صلة القرابة بالمتوفى.', 'كشف التعريف البنكي للمستفيد.'] },
            { title: 'وفاة منخرط أعزب', icon: 'fa-person', body: 'المستفيدون: الوالدان.', bullets: ['عقد الوفاة.', 'شهادة صلة القرابة بالمتوفى.', 'كشف التعريف البنكي للمستفيد.'] },
            { title: 'وفاة الطفل', icon: 'fa-child', body: 'تهم الطفل الأقل من 21 سنة، أو الأقل من 26 سنة إذا كان يتابع دراسته بالمغرب، أو كان متمدرسا بالخارج أثناء مقامه بالمغرب.', bullets: ['عقد وفاة المتوفى.', 'عقد ازدياد المتوفى.', 'كشف التعريف البنكي للمستفيد.'] }
          ]
        },
        { title: 'المساهمة المالية', icon: 'fa-hand-holding-dollar', mode: 'cards', items: [{ amount: '7 000 DH', label: 'المنخرط الرئيسي.' }, { amount: '2 500 DH', label: 'الزوج أو الزوجة.' }, { amount: '1 000 DH', label: 'الطفل.' }] }
      ]
    },
    {
      navIndex: 4,
      badge: 'المركز الطبي الاجتماعي',
      title: 'المركز الطبي الاجتماعي',
      intro: ['تضمن FOS-Agri عبر مركزها الطبي الاجتماعي استشارات تقدمها فرق طبية متخصصة وذات كفاءة.', 'كما يؤمن المركز المواكبة وتتبع المنخرطين قبل أو بعد الاستشفاء، إضافة إلى النصح والتوجيه.'],
      beneficiariesTitle: 'المستفيدون',
      beneficiaries: [{ number: '01', text: 'المنخرط.' }, { number: '02', text: 'زوج أو أزواج المنخرط.' }, { number: '03', text: 'أبناؤهم.' }],
      blocks: [
        {
          title: 'التخصصات على المستوى المركزي',
          icon: 'fa-stethoscope',
          items: [
            { title: 'الطب الباطني', icon: 'fa-user-doctor', rows: [['المكان', 'المكتب الطبي الاجتماعي'], ['اليوم', 'الاثنين'], ['الساعة', '8h30'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'أمراض القلب', icon: 'fa-heart-pulse', rows: [['المكان', 'المكتب الطبي الاجتماعي'], ['اليوم', 'الخميس'], ['الساعة', '10h'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'الأنف والأذن والحنجرة', icon: 'fa-ear-listen', rows: [['المكان', 'عيادة الطبيب'], ['المواعيد', 'الاثنين 12h، الثلاثاء، الخميس، الجمعة'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'المسالك البولية', icon: 'fa-notes-medical', rows: [['المكان', 'عيادة الطبيب'], ['المواعيد', 'الاثنين 11h، الثلاثاء، الأربعاء، الخميس، الجمعة'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'أمراض النساء', icon: 'fa-venus', rows: [['المكان', 'المكتب الطبي الاجتماعي'], ['اليوم', 'الأربعاء'], ['الساعة', '09h30'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'الأمراض الجلدية', icon: 'fa-hand-sparkles', rows: [['المكان', 'المكتب الطبي الاجتماعي'], ['اليوم', 'الخميس'], ['الساعة', '08h30'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'أمراض الغدد', icon: 'fa-vial-circle-check', rows: [['المكان', 'عيادة الطبيب'], ['اليوم', 'الخميس'], ['الساعة', '10h'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'أمراض الجهاز الهضمي', icon: 'fa-pills', rows: [['المكان', 'المكتب الطبي الاجتماعي'], ['اليوم', 'الثلاثاء'], ['الساعة', '09h'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'الحساسية والأمراض الصدرية', icon: 'fa-lungs', rows: [['المكان', 'المكتب الطبي الاجتماعي'], ['اليوم', 'الأربعاء'], ['الساعة', '08h30'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'جراحة العظام والرضوض', icon: 'fa-bone', rows: [['المكان', 'عيادة الطبيب'], ['اليوم', 'الجمعة'], ['الساعة', '09h'], ['الهاتف', '05 37 10 35 14 / 06 57 83 15 17']] }
          ]
        },
        {
          title: 'التخصصات على المستوى الجهوي',
          icon: 'fa-map-location-dot',
          items: [
            { title: 'جهة العيون - الساقية الحمراء', icon: 'fa-location-dot', rows: [['الطبيب', 'Docteur LAJOUAD BAIHI'], ['العنوان', 'Av Hassan II, Phosboukraâ, LAAYOUNE'], ['أخذ الموعد', '0661 26 99 97'], ['المنسق الجهوي', 'MOUSSAOUI MOHAMED ALI'], ['هاتف المنسق', '0657 83 20 46']] },
            { title: 'جهة الداخلة - وادي الذهب', icon: 'fa-location-dot', rows: [['الطبيب', 'Docteur SADIK YOUNESS'], ['العنوان', 'App N°4, N° 17/1105, rue mosquée, Hay Massira, Dakhla'], ['أخذ الموعد', '0667 98 08 77'], ['المنسق الجهوي', 'MINA SAAD ALLAH'], ['هاتف المنسق', '0657 83 17 87']] },
            { title: 'جهة كلميم - واد نون', icon: 'fa-location-dot', rows: [['الطبيب', 'Docteur HAIDAR KHAIR'], ['العنوان', 'Imm Assafae, 3ème étage, App N°9, Bir Inzarane, Guelmim'], ['أخذ الموعد', '0528 87 34 61'], ['المنسق الجهوي', 'LATIF AIDA'], ['هاتف المنسق', '0657 83 15 04']] },
            { title: 'جهة درعة - تافيلالت', icon: 'fa-location-dot', rows: [['الطبيب', 'Docteur GHANEME ABDELAZIZ'], ['العنوان', '14, Rue de la mosquée, Errachidia'], ['أخذ الموعد', '0535 57 27 76'], ['المنسق الجهوي', 'BRITEL ABDESSAMAD'], ['هاتف المنسق', '06 68 90 90 84']] },
            { title: 'جهة بني ملال - خنيفرة', icon: 'fa-location-dot', rows: [['الطبيب', 'Docteur MALKY ABDELHAMID'], ['العنوان', 'Avenue 2 Mars, Sidi Abdelhalim, Béni Mellal'], ['أخذ الموعد', '—'], ['المنسق الجهوي', 'MALIHY AMAL'], ['هاتف المنسق', '06 57 83 18 94']] },
            { title: 'جهة الدار البيضاء - سطات', icon: 'fa-location-dot', rows: [['الطبيب', 'Docteur MOUFTADI ABDELFATTAH'], ['العنوان', 'Avenue Bir Anzarane N° 16, El Jadida'], ['أخذ الموعد', '0523 39 42 03'], ['المنسق الجهوي', 'GUADDA MOHAMED'], ['هاتف المنسق', '36 16 83 57 06']] },
            { title: 'جهة فاس - مكناس', icon: 'fa-location-dot', rows: [['الطبيب', 'Docteur DBAB Mohamed'], ['العنوان', '4, Rue Omar Ben Chamsi, Hamria, Meknès'], ['أخذ الموعد', '0661 15 93 56'], ['المنسق الجهوي', 'SAID AIT BERRI'], ['هاتف المنسق', '0657 83 20 37']] },
            { title: 'جهة مراكش - آسفي', icon: 'fa-location-dot', rows: [['الطبيب', 'BELAHNECH ABDOULMOUTTALIB'], ['العنوان', '49, Bd Rabat, Safi'], ['أخذ الموعد', '05 24 46 37 97'], ['المنسق الجهوي', 'SERFATI CHOUAIB'], ['هاتف المنسق', '06 57 83 17 37']] },
            { title: 'جهة الرباط - سلا - القنيطرة', icon: 'fa-location-dot', rows: [['الطبيب', 'Docteur IBNABDALLAH MOHAMED'], ['العنوان', '15, Rue Jabel El Ayachi, Centre Khmisset'], ['أخذ الموعد', '0537 55 05 00'], ['المنسق الجهوي', 'EL BERIRI SAMIRA'], ['هاتف المنسق', '06 57 83 16 63']] }
          ]
        }
      ]
    },
    {
      navIndex: 5,
      badge: 'دعم الأشخاص ذوي الاحتياجات الخاصة',
      title: 'دعم الأشخاص ذوي الاحتياجات الخاصة',
      intro: 'وضعت FOS-Agri برنامجا لمساعدة أبناء المنخرطين في وضعية إعاقة ولديهم احتياجات خاصة، عبر المساهمة في التكفل باحتياجاتهم الخاصة بمنحة قدرها 5 000 درهم.',
      beneficiariesTitle: 'المستفيدون',
      beneficiaries: [{ number: '01', text: 'جميع أبناء منخرطي FOS-Agri الموجودين في وضعية إعاقة حركية أو ذهنية، مثبتة بشهادة إعاقة صادرة عن السلطات العمومية المختصة، والذين لا يمارسون أي نشاط مدر للدخل.' }],
      blocks: [
        { title: 'التسجيل والكيفيات', icon: 'fa-clipboard-check', items: [{ title: 'الكيفيات', icon: 'fa-list-check', bullets: ['التسجيل عبر الإنترنت.', 'تقبل جميع الطلبات التي تستوفي الشروط.'] }] },
        { title: 'الوثائق المطلوبة', icon: 'fa-folder-open', items: [{ title: 'الملف المثبت', icon: 'fa-file-medical', bullets: ['نسخة من الملف الطبي للمعني بالأمر.', 'نسخة من الاستمارة المتعلقة بنوع الإعاقة، تحمل رأي اللجنة الطبية الإقليمية.', 'لمواصلة الاستفادة، يجب على المنخرطين المعنيين الإدلاء كل سنة بشهادة الحياة.', 'بالنسبة للأطفال الذين ليست إعاقتهم نهائية، يجب الإدلاء كل سنة بملف طبي جديد.'] }] }
      ]
    },
    {
      navIndex: 6,
      type: 'medicalPartners',
      badge: 'الاتفاقيات والشراكات الطبية',
      title: 'الاتفاقيات والشراكات الطبية',
      intro: 'خريطة جهوية تفاعلية وقسم مستقل لاتفاقيات المستوى المركزي.'
    }
  ];

  const prevoyanceExtraZgh = [
    {
      navIndex: 3,
      badge: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵎⵜⵜⴰⵏⵜ',
      title: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵎⵜⵜⴰⵏⵜ',
      intro: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵎⵜⵜⴰⵏⵜ ⵙ FOS-Agri ⵉ ⵉⵎⴰⵖⴰⵔⵏ ⵉⵣⵔⵉⵏ 75 ⵏ ⵓⵙⴳⴳⵯⴰⵙ ⵉⴳⴰ ⴰⵙⵓⵔⵉⴼ ⴰⵏⴰⵎⵓⵏ ⴰⵎⵇⵔⴰⵏ. ⵜⴰⵏⴼⵓⵙⵜ ⴰⴷ ⵜⵙⵎⴷ ⴰⵙⵎⵓⵜⵜⴳ ⵉⵍⵍⴰⵏ ⴷ ⵜⵙⵙⴷⵓⵙ ⵜⵉⵡⵉⵙⵉ ⴷ ⵓⵎⵓⴷⴷⵓ ⵉⵍⴰⵇⵏ ⵉ ⵎⴰⵕⵕⴰ ⵉⵎⵏⴼⴰⵄⵏ.',
      beneficiariesTitle: 'ⵉⵎⵏⴼⴰⵄⵏ',
      beneficiaries: [{ number: '01', text: 'ⵉⵎⵏⵅⵔⴰⵟⵏ ⵉⵣⵔⵉⵏ 75 ⵏ ⵓⵙⴳⴳⵯⴰⵙ.' }, { number: '02', text: 'ⵉⵎⵏⴼⴰⵄⵏ: ⵉⵙⵍⵉⵜⵏ ⴷ ⵉⴼⵔⵅⴰⵏ.' }],
      blocks: [
        {
          title: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵎⵜⵜⴰⵏⵜ ⵉ ⵉⵣⵔⵉⵏ 75',
          icon: 'fa-file-signature',
          intro: 'ⴽⵓ ⴰⴼⴰⵢⵍⵓ ⵉⵜⵜⵓⵙⵙⴼⴽⵏ ⵉ FOS-Agri ⵉ ⵓⵙⵎⵔⵙ ⵏ ⵜⵉⵡⵉⵙⵉ ⵉⵎⴰⵍⵉⵢⵏ ⴰⴷ ⵉⵙⵎⵓⵏ ⵉⵙⵍⴽⴰⵎⵏ ⵉⵍⴰⵇⵏ. ⵏⵙⵅⴰ ⵏ CIN ⴷ ⵜⴽⴰⵕⴹⴰ ⵏ FOS-Agri ⵏ ⵓⵎⵏⵅⵔⴰⵟ ⴰⵎⵣⵡⴰⵔⵓ ⵉⵍⴰⵇⵏ ⴳ ⵎⴰⵕⵕⴰ ⵜⵉⵎⵙⴰⵍ.',
          items: [
            { title: 'ⵜⴰⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵎⵏⵅⵔⴰⵟ ⴰⵎⵣⵡⴰⵔⵓ ⵎⴰ ⵉⵍⵍⴰ ⵓⵙⵍⵉ', icon: 'fa-user-shield', bullets: ['ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ.', 'ⵏⵙⵅⴰ ⵏ ⵓⵎⵙⵍⴰⵢ ⵏ ⵓⵣⵡⴰⵊ.', 'RIB ⵏ ⵓⵙⵍⵉ ⵉⴷⴷⵔⵏ.', 'ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵔⵉⴽⴰ.'] },
            { title: 'ⵜⴰⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵎⵏⵅⵔⴰⵟ ⵎⴰ ⵓⵔ ⵉⵍⵍⵉ ⵓⵙⵍⵉ', icon: 'fa-user', bullets: ['ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ.', 'ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵓⵣⴷⴰⵢ ⵏ ⵜⵡⴰⵛⵓⵍⵜ ⴷ ⵓⵎⵎⵓⵜ.', 'ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵔⵉⴽⴰ.', 'RIB ⵏ ⵓⵎⵏⴼⴰⵄ.'] },
            { title: 'ⵜⴰⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵙⵍⵉ', icon: 'fa-people-arrows', bullets: ['ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ.', 'ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵓⵣⴷⴰⵢ ⵏ ⵜⵡⴰⵛⵓⵍⵜ ⴷ ⵓⵎⵎⵓⵜ.', 'RIB ⵏ ⵓⵎⵏⴼⴰⵄ.'] },
            { title: 'ⵜⴰⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵎⵏⵅⵔⴰⵟ ⵓⵔ ⵉⵣⵡⵉⵊⵏ', icon: 'fa-person', body: 'ⵉⵎⵏⴼⴰⵄⵏ: ⵉⵎⵖⴰⵔⵏ.', bullets: ['ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ.', 'ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵓⵣⴷⴰⵢ ⵏ ⵜⵡⴰⵛⵓⵍⵜ ⴷ ⵓⵎⵎⵓⵜ.', 'RIB ⵏ ⵓⵎⵏⴼⴰⵄ.'] },
            { title: 'ⵜⴰⵎⵜⵜⴰⵏⵜ ⵏ ⵓⴼⵔⵓⵅ', icon: 'fa-child', body: 'ⵜⵙⵎⵓⵏ ⴰⴼⵔⵓⵅ ⴷⴷⴰⵡ 21 ⵏⵖ ⴷⴷⴰⵡ 26 ⵎⴰ ⵉⵙⵙⵎⴷ ⵜⵉⵖⵔⵉ ⴳ ⵍⵎⵖⵔⵉⴱ, ⵏⵖ ⵉⵍⵍⴰ ⴳ ⵓⵙⵍⵎⴷ ⴱⵕⵕⴰ ⴰⵙⵙ ⵏ ⵜⵉⵔⵣⴰ ⴳ ⵍⵎⵖⵔⵉⴱ.', bullets: ['ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵎⵜⵜⴰⵏⵜ ⵏ ⵓⵎⵎⵓⵜ.', 'ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵓⵍⴰⵍ ⵏ ⵓⵎⵎⵓⵜ.', 'RIB ⵏ ⵓⵎⵏⴼⴰⵄ.'] }
          ]
        },
        { title: 'ⵜⵉⵡⵉⵙⵉ ⵉⵎⴰⵍⵉⵢⵏ', icon: 'fa-hand-holding-dollar', mode: 'cards', items: [{ amount: '7 000 DH', label: 'ⴰⵎⵏⵅⵔⴰⵟ ⴰⵎⵣⵡⴰⵔⵓ.' }, { amount: '2 500 DH', label: 'ⴰⵙⵍⵉ.' }, { amount: '1 000 DH', label: 'ⴰⴼⵔⵓⵅ.' }] }
      ]
    },
    {
      navIndex: 4,
      badge: 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ',
      title: 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ',
      intro: ['FOS-Agri ⵜⴰⵎⵓⴷⴷⵓ ⵙ ⵓⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ ⵜⵉⵔⵣⴰ ⵏ ⵢⴰⵜ ⵜⴰⵔⴱⴰⵄⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⵜⵉⵎⵥⵍⵉⵢⵜ.', 'ⴰⵎⵎⴰⵙ ⵉⵜⵜⴰⵡⵙ ⴳ ⵓⵎⵓⴷⴷⵓ ⴷ ⵓⵜⵜⴰⴱⴰⵄ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷⴰⵜ ⵏⵖ ⴹⴼⵕ ⴰⵙⵉⴱⵉⵜⴰⵍ, ⴷ ⵓⵙⴷⵓ ⴷ ⵜⵎⵙⵍⵉⵡⵜ.'],
      beneficiariesTitle: 'ⵉⵎⵏⴼⴰⵄⵏ',
      beneficiaries: [{ number: '01', text: 'ⴰⵎⵏⵅⵔⴰⵟ.' }, { number: '02', text: 'ⴰⵙⵍⵉ ⵏ ⵓⵎⵏⵅⵔⴰⵟ.' }, { number: '03', text: 'ⵉⴼⵔⵅⴰⵏ ⵏⵏⵙⵏ.' }],
      blocks: [
        {
          title: 'ⵜⵉⵎⵥⵍⵉⵢⵉⵏ ⴳ ⵓⵎⵎⴰⵙ',
          icon: 'fa-stethoscope',
          items: [
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵜⴰⴳⵏⵙⴰⵏⵜ', icon: 'fa-user-doctor', rows: [['ⴰⴷⵖⴰⵔ', 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ'], ['ⴰⵙⵙ', 'ⴰⵢⵏⴰⵙ'], ['ⵜⴰⵙⵔⴰⴳⵜ', '8h30'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵓⵍ', icon: 'fa-heart-pulse', rows: [['ⴰⴷⵖⴰⵔ', 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ'], ['ⴰⵙⵙ', 'ⴰⴽⵡⴰⵙ'], ['ⵜⴰⵙⵔⴰⴳⵜ', '10h'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ORL', icon: 'fa-ear-listen', rows: [['ⴰⴷⵖⴰⵔ', 'ⵜⵉⵔⵣⴰ ⵏ ⵓⵎⵙⵙⵉⵊⵊⵉ'], ['ⵜⵉⵣⵉ', 'ⴰⵢⵏⴰⵙ 12h, ⴰⵙⵉⵏⴰⵙ, ⴰⴽⵡⴰⵙ, ⴰⵙⵉⵎⵡⴰⵙ'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵓⵙⵔⴰⴼ', icon: 'fa-notes-medical', rows: [['ⴰⴷⵖⴰⵔ', 'ⵜⵉⵔⵣⴰ ⵏ ⵓⵎⵙⵙⵉⵊⵊⵉ'], ['ⵜⵉⵣⵉ', 'ⴰⵢⵏⴰⵙ 11h, ⴰⵙⵉⵏⴰⵙ, ⴰⴽⵕⴰⵙ, ⴰⴽⵡⴰⵙ, ⴰⵙⵉⵎⵡⴰⵙ'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵜⵎⵖⴰⵔⵜ', icon: 'fa-venus', rows: [['ⴰⴷⵖⴰⵔ', 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ'], ['ⴰⵙⵙ', 'ⴰⴽⵕⴰⵙ'], ['ⵜⴰⵙⵔⴰⴳⵜ', '09h30'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵉⴳⵍⵎⴰⵎⵏ', icon: 'fa-hand-sparkles', rows: [['ⴰⴷⵖⴰⵔ', 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ'], ['ⴰⵙⵙ', 'ⴰⴽⵡⴰⵙ'], ['ⵜⴰⵙⵔⴰⴳⵜ', '08h30'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵉⵙⵓⴷⴰⵔ', icon: 'fa-vial-circle-check', rows: [['ⴰⴷⵖⴰⵔ', 'ⵜⵉⵔⵣⴰ ⵏ ⵓⵎⵙⵙⵉⵊⵊⵉ'], ['ⴰⵙⵙ', 'ⴰⴽⵡⴰⵙ'], ['ⵜⴰⵙⵔⴰⴳⵜ', '10h'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵓⵙⴳⵍ', icon: 'fa-pills', rows: [['ⴰⴷⵖⴰⵔ', 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ'], ['ⴰⵙⵙ', 'ⴰⵙⵉⵏⴰⵙ'], ['ⵜⴰⵙⵔⴰⴳⵜ', '09h'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵓⵙⵎⵎⵓⴹ ⴷ ⵓⴼⴼⵓⵙ', icon: 'fa-lungs', rows: [['ⴰⴷⵖⴰⵔ', 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ'], ['ⴰⵙⵙ', 'ⴰⴽⵕⴰⵙ'], ['ⵜⴰⵙⵔⴰⴳⵜ', '08h30'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] },
            { title: 'ⵜⴰⴷⵓⵙⵉ ⵏ ⵉⵖⵙⴰⵏ', icon: 'fa-bone', rows: [['ⴰⴷⵖⴰⵔ', 'ⵜⵉⵔⵣⴰ ⵏ ⵓⵎⵙⵙⵉⵊⵊⵉ'], ['ⴰⵙⵙ', 'ⴰⵙⵉⵎⵡⴰⵙ'], ['ⵜⴰⵙⵔⴰⴳⵜ', '09h'], ['ⵜⵉⵍⵉⴼⵓⵏ', '05 37 10 35 14 / 06 57 83 15 17']] }
          ]
        },
        {
          title: 'ⵜⵉⵎⵥⵍⵉⵢⵉⵏ ⴳ ⵜⵎⵏⴰⴹⵉⵏ',
          icon: 'fa-map-location-dot',
          items: prevoyanceExtraFr[1].blocks[1].items.map((entry) => ({
            title: entry.title.replace('Région de ', 'ⵜⴰⵎⵏⴰⴹⵜ ⵏ '),
            icon: 'fa-location-dot',
            rows: entry.rows.map(([label, value]) => [{
              'Médecin': 'ⴰⵎⵙⵙⵉⵊⵊⵉ',
              'Adresse': 'ⵜⴰⵏⵙⴰ',
              'Prise de RDV': 'ⵜⵉⵣⵉ ⵏ ⵜⵉⵔⵣⴰ',
              'Relais régional': 'ⴰⵎⵙⵏⴰⵡ ⵏ ⵜⵎⵏⴰⴹⵜ',
              'Téléphone du relais': 'ⵜⵉⵍⵉⴼⵓⵏ ⵏ ⵓⵎⵙⵏⴰⵡ'
            }[label] || label, value])
          }))
        }
      ]
    },
    {
      navIndex: 5,
      badge: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵎⵓⵔⴰⵏ ⵉⵎⵥⵍⵉⵢⵏ',
      title: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵎⵓⵔⴰⵏ ⵉⵎⵥⵍⵉⵢⵏ',
      intro: 'FOS-Agri ⵜⵙⵎⵓⵜⵜⴳ ⵢⴰⵜ ⵜⴰⵏⴼⵓⵙⵜ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵓⵙⵔⵓⵜ ⵉⵎⵥⵍⵉ, ⵙ ⵓⵎⵓⴷⴷⵓ ⵏ 5 000 DH ⵉ ⵓⵙⵎⵔⵙ ⵏ ⵉⵙⵡⵉⵔⵏ ⵏⵏⵙⵏ.',
      beneficiariesTitle: 'ⵉⵎⵏⴼⴰⵄⵏ',
      beneficiaries: [{ number: '01', text: 'ⵎⴰⵕⵕⴰ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⵏ FOS-Agri ⵉⵍⵍⴰⵏ ⴳ ⵓⵙⵔⵓⵜ ⵉⵎⵥⵍⵉ, ⵙ ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵓⵙⵔⵓⵜ ⵙⵖⵓⵔ ⵜⵎⵙⵙⵓⵜⵉⵏ ⵉⵎⵣⴰⵔⴰⵢⵏ, ⴷ ⵓⵔ ⵉⵙⴽⴰⵔⵏ ⴽⵔⴰ ⵏ ⵜⵡⵓⵔⵉ ⵜⴰⵙⵙⵏⴼⴰⵍⵜ.' }],
      blocks: [
        { title: 'ⴰⵙⵙⴼⵜⵔ ⴷ ⵜⵎⴰⵎⴽⵜ', icon: 'fa-clipboard-check', items: [{ title: 'ⵜⵎⴰⵎⴽⵜ', icon: 'fa-list-check', bullets: ['ⴰⵙⵙⴼⵜⵔ ⵙ ⵉⵏⵜⵉⵔⵏⵉⵜ.', 'ⵎⴰⵕⵕⴰ ⵉⵙⵓⵜⴰⵔ ⵉⵙⵎⴷⵏ ⵜⵉⵡⵜⵉⵍⵉⵏ ⵜⵜⵓⵙⵇⴱⴰⵍⵏ.'] }] },
        { title: 'ⵉⵙⵍⴽⴰⵎⵏ ⵉⵍⴰⵇⵏ', icon: 'fa-folder-open', items: [{ title: 'ⴰⴼⴰⵢⵍⵓ', icon: 'fa-file-medical', bullets: ['ⵏⵙⵅⴰ ⵏ ⵓⴼⴰⵢⵍⵓ ⴰⴷⵓⵙⴰⵏ ⵏ ⵓⵎⵙⵍⴰⵢ.', 'ⵏⵙⵅⴰ ⵏ ⵓⴼⵓⵔⵎⵓⵍⵉⵔ ⵏ ⵓⵏⴰⵡ ⵏ ⵓⵙⵔⵓⵜ ⵙ ⵓⵔⴰⵢ ⵏ ⵜⴽⵎⵉⵙⵢⵓⵏ ⵜⴰⴷⵓⵙⴰⵏⵜ ⵜⴰⵎⵏⴰⴹⵜ.', 'ⵉ ⵓⵙⵙⵎⴷ ⵏ ⵓⵙⵎⵔⵙ, ⵉⵎⵏⵅⵔⴰⵟⵏ ⴰⴷ ⴼⴽⵏ ⴽⵓ ⴰⵙⴳⴳⵯⴰⵙ ⵜⴰⵙⵍⴽⵉⵏⵜ ⵏ ⵜⵓⴷⵔⵜ.', 'ⵉ ⵉⴼⵔⵅⴰⵏ ⵓⵔ ⵉⵙⵙⴷⵓⵙⵏ ⵓⵙⵔⵓⵜ ⵏⵏⵙⵏ, ⵉⵍⴰⵇ ⴽⵓ ⴰⵙⴳⴳⵯⴰⵙ ⴰⴼⴰⵢⵍⵓ ⴰⴷⵓⵙⴰⵏ ⴰⵎⴰⵢⵏⵓ.'] }] }
      ]
    },
    {
      navIndex: 6,
      type: 'medicalPartners',
      badge: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏⵏ',
      title: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏⵏ',
      intro: 'ⵜⴰⴽⴰⵕⴹⴰ ⵏ ⵜⵎⵏⴰⴹⵉⵏ ⴷ ⵜⵙⴳⴰ ⵏ ⵓⵙⵡⵉⵔ ⴰⵎⵎⴰⵙ.'
    }
  ];

  const services = {
    prevoyance: {
      href: 'services/prevoyance.html',
      fr: {
        title: 'Prévoyance médico-sociale',
        meta: 'Santé, protection sociale et bien-être',
        summary: 'Un dispositif de santé et de protection sociale pour accompagner les adhérents et leurs familles face aux aléas médicaux, aux urgences et aux besoins spécifiques.',
        stats: [['100%', 'du ticket modérateur AMC selon contrat'], ['1 MDH', 'de plafond général annuel par personne'], ['5 000 DH', 'd’aide aux enfants en situation de handicap']],
        overview: 'La FOS-Agri a érigé le volet santé en priorité avec l’assurance maladie complémentaire, l’accompagnement médico-social, l’assistance médicale et le transport sanitaire, ainsi qu’un réseau de conventions médicales au niveau régional.',
        highlights: ['Remboursement ou prise en charge complémentaire en lien avec l’AMO/CNOPS.', 'Assistance médicale et transport sanitaire via Wafa IMA Assistance.', 'Aide de 5 000 DH pour les enfants des adhérents en situation de handicap.', 'Conventions avec laboratoires, cliniques, médecins, opticiens, pharmacies et centres de soins.'],
        amcDetail: amcDetailFr,
        amtsDetail: amtsDetailFr,
        features: [
          ['A PROPOS', 'Accompagnement, orientation et écoute autour des besoins de santé et de bien-être des adhérents.'],
          ['Assurance Maladie Complémentaire', 'Sanlam Maroc rembourse ou prend en charge tout ou partie du reste à charge selon les taux, bases et plafonds contractuels.'],
          ['Assistance Médicale et Transport Sanitaire', 'Wafa IMA Assistance couvre les situations urgentes, les transports sanitaires, l’assistance à domicile et l’évacuation sanitaire selon conditions.'],
          ['AIDES AUX PERSONNES AUX BESOINS SPECIFIQUES', 'Contribution à la prise en charge des besoins particuliers des enfants des adhérents.'],
          ['CONVENTIONS ET PARTENARIATS MEDICALES', 'Réseau de prestataires répartis dans plusieurs régions du Royaume avec la contribution des relais régionaux.']
        ],
        centerMedical: {
          badge: 'A PROPOS',
          title: 'Accompagnement médico-social',
          intro: 'La FOS-Agri a érigé le volet santé en une place de choix à travers la mise en place d’un dispositif de santé composé de l’assurance maladie complémentaire, de l’accompagnement médico-social, de l’assistance médicale et transport sanitaire et d’une série de conventions avec des praticiens de renom dans le domaine médical au niveau de plusieurs régions du Royaume avec la précieuse collaboration des relais régionaux.',
          items: [
            {
              icon: 'fa-shield-heart',
              title: 'AMC',
              body: [
                'La FOS-Agri soutient ses adhérents face aux aléas de la santé à travers l’Assurance Maladie Complémentaire permettant le bénéfice d’une large couverture familiale des soins de santé.',
                'La convention conclue avec la compagnie SAHAM Assurance garantit aux adhérents :'
              ],
              bullets: [
                'Le remboursement ou la prise en charge de santé de 100% du ticket modérateur, et ce, en complément des régimes de base (AMO/Mutuelle).',
                'Le remboursement à hauteur d’un plafond général d’un million de dirhams par personne et par an, sauf pour les cas de greffes d’organes qui demeurent plafonnés à 250 000 dirhams.'
              ]
            },
            {
              icon: 'fa-truck-medical',
              navIndex: 2,
              title: 'AMTS',
              body: [
                'La FOS-Agri soutient ses adhérents pendant les moments difficiles à travers le service d’Assistance Médicale et Transport Sanitaire contracté avec la compagnie Wafa IMA Assistance.',
                'Cette assistance porte sur une large gamme de garanties, en cas d’événements imprévisibles et urgents (accident, maladie, décès…) et également dans le cas de voyages à l’étranger à travers notamment l’évacuation sanitaire pour les pathologies non traitables au Maroc ainsi que la conciergerie médicale.'
              ]
            },
            {
              icon: 'fa-hands-holding-child',
              navIndex: 5,
              title: 'AIDES AUX PERSONNES AUX BESOINS SPECIFIQUES',
              body: [
                'La FOS-Agri a mis en place un programme d’aide aux enfants des adhérents en situations d’handicap présentant des besoins spécifiques, et ce en contribuant à la prise en charge de leurs besoins particuliers à travers une aide d’un montant de 5000 dhs.'
              ]
            },
            {
              icon: 'fa-file-contract',
              navIndex: 6,
              title: 'CONVENTIONS ET PARTENARIATS MEDICALES',
              body: [
                'TABLEAU CONVENTIONS (LABO, MEDECINS, CABINETS)'
              ]
            }
          ]
        },
        extraSections: prevoyanceExtraFr,
        partners: ['Laboratoires d’analyses', 'Cliniques et radiologie', 'Médecins à tarifs préférentiels', 'Opticiens', 'Pharmacies', 'Centres dentaires'],
        steps: [['Orientation', 'Identifier la prestation ou le partenaire médical adapté.'], ['Dossier', 'Préparer les pièces justificatives et les références d’adhésion.'], ['Prise en charge', 'Suivre les modalités AMC, AMTS ou convention médicale.'], ['Relais régional', 'S’appuyer sur les relais pour les conventions de proximité.']]
      },
      ar: {
        title: 'الوقاية الطبية والاجتماعية',
        meta: 'الصحة والحماية الاجتماعية والرفاه',
        summary: 'منظومة لمواكبة المنخرطين وأسرهم في الصحة والحماية الاجتماعية والحالات المستعجلة والاحتياجات الخاصة.',
        stats: [['100%', 'من الباقي على عاتق المنخرط حسب العقد'], ['1 مليون درهم', 'كسقف عام سنوي لكل شخص'], ['5 000 درهم', 'دعم للأطفال في وضعية إعاقة']],
        overview: 'تضع FOS-Agri الصحة ضمن أولوياتها عبر التأمين الصحي التكميلي والمواكبة الطبية الاجتماعية والمساعدة الطبية والنقل الصحي وشبكة اتفاقيات طبية جهوية.',
        highlights: ['تعويض أو تحمل تكميلي بتنسيق مع AMO/CNOPS.', 'مساعدة طبية ونقل صحي عبر Wafa IMA Assistance.', 'دعم قدره 5 000 درهم للأطفال في وضعية إعاقة.', 'اتفاقيات مع مختبرات ومصحات وأطباء ونظارات وصيدليات ومراكز علاج.'],
        amcDetail: amcDetailAr,
        amtsDetail: amtsDetailAr,
        features: [['حول الخدمة', 'استقبال وتوجيه ومواكبة حول حاجيات الصحة والرفاه.'], ['التأمين الصحي التكميلي', 'تعويض أو تحمل الباقي وفق الضمانات والأسقف التعاقدية.'], ['المساعدة الطبية والنقل الصحي', 'تغطية الحالات المستعجلة والنقل الصحي والمساعدة المنزلية والإجلاء الصحي وفق الشروط.'], ['دعم الأشخاص ذوي الاحتياجات الخاصة', 'مساهمة في التكفل بالحاجيات الخاصة لأبناء المنخرطين.'], ['الاتفاقيات والشراكات الطبية', 'شبكة مقدمي خدمات بعدة جهات بتنسيق مع المنسقين الجهويين.']],
        centerMedical: {
          badge: 'حول الخدمة',
          title: 'المواكبة الطبية الاجتماعية',
          intro: 'جعلت FOS-Agri محور الصحة في صلب أولوياتها من خلال إرساء منظومة صحية تضم التأمين الصحي التكميلي، والمواكبة الطبية الاجتماعية، والمساعدة الطبية والنقل الصحي، وسلسلة من الاتفاقيات مع ممارسين مرموقين في المجال الطبي على مستوى عدة جهات من المملكة، بتعاون ثمين مع المنسقين الجهويين.',
          items: [
            {
              icon: 'fa-shield-heart',
              title: 'AMC',
              body: [
                'تدعم FOS-Agri منخرطيها في مواجهة تقلبات الوضع الصحي عبر التأمين الصحي التكميلي، بما يتيح الاستفادة من تغطية عائلية واسعة للعلاجات الصحية.',
                'تضمن الاتفاقية المبرمة مع شركة SAHAM Assurance للمنخرطين:'
              ],
              bullets: [
                'تعويض أو تحمل صحي بنسبة 100% من التذكرة التعديلية، وذلك تكميلا لأنظمة التغطية الأساسية (AMO/Mutuelle).',
                'تعويض في حدود سقف عام قدره مليون درهم لكل شخص في السنة، باستثناء حالات زرع الأعضاء التي تظل محددة في سقف 250 000 درهم.'
              ]
            },
            {
              icon: 'fa-truck-medical',
              navIndex: 2,
              title: 'AMTS',
              body: [
                'تدعم FOS-Agri منخرطيها في اللحظات الصعبة من خلال خدمة المساعدة الطبية والنقل الصحي المتعاقد بشأنها مع شركة Wafa IMA Assistance.',
                'تشمل هذه المساعدة مجموعة واسعة من الضمانات في حالة الأحداث غير المتوقعة والمستعجلة (حادث، مرض، وفاة...)، وكذلك أثناء السفر إلى الخارج، ولا سيما الإجلاء الصحي بالنسبة للحالات المرضية غير القابلة للعلاج بالمغرب وخدمة المواكبة الطبية.'
              ]
            },
            {
              icon: 'fa-hands-holding-child',
              navIndex: 5,
              title: 'دعم الأشخاص ذوي الاحتياجات الخاصة',
              body: [
                'أطلقت FOS-Agri برنامج دعم لفائدة أطفال المنخرطين في وضعية إعاقة ممن لديهم احتياجات خاصة، وذلك بالمساهمة في التكفل باحتياجاتهم الخاصة عبر منحة قدرها 5000 درهم.'
              ]
            },
            {
              icon: 'fa-file-contract',
              navIndex: 6,
              title: 'الاتفاقيات والشراكات الطبية',
              body: [
                'جدول الاتفاقيات (مختبرات، أطباء، عيادات)'
              ]
            }
          ]
        },
        extraSections: prevoyanceExtraAr,
        partners: ['مختبرات التحاليل', 'مصحات وأشعة', 'أطباء بتعريفات تفضيلية', 'نظارات', 'صيدليات', 'مراكز الأسنان'],
        steps: [['التوجيه', 'تحديد الخدمة أو الشريك الطبي المناسب.'], ['الملف', 'تحضير الوثائق ومعطيات الانخراط.'], ['التكفل', 'اتباع مساطر AMC أو AMTS أو الاتفاقية.'], ['المنسق الجهوي', 'الاستفادة من القرب الجهوي.']]
      },
      zgh: {
        title: 'ⵜⴰⴷⵓⵙⵉ ⵜⴰⵎⴰⴷⴰⵏⵜ',
        meta: 'ⵜⴰⴷⵓⵙⵉ, ⴰⵎⵎⵓⵜⵜⵉ ⴷ ⵜⵓⴷⵔⵜ',
        summary: 'ⵜⴰⵏⴼⵓⵙⵜ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵜ ⴳ ⵜⴰⴷⵓⵙⵉ ⴷ ⵜⵉⵎⵓⵔⴰ.',
        stats: [['100%', 'AMC ⵙ ⵎⴽ ⵉⵍⵍⴰ ⴳ ⵓⵎⵙⴰⵡⴰⴹ'], ['1 MDH', 'ⴰⵙⵡⵉⵔ ⴰⴳⵔⴰⵡ ⵉ ⴽⵓ ⵢⴰⵏ'], ['5 000 DH', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵓⵙⵔⵓⵜ']],
        overview: 'FOS-Agri ⵜⵙⵙⵎⵓⵔⵙ ⵜⴰⴷⵓⵙⵉ ⵙ AMC, AMTS, ⴰⵎⵓⴷⴷⵓ ⴰⴷⴰⵡⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏⵏ ⴳ ⵜⵎⵓⵔⴰ.',
        highlights: ['ⴰⵔⴰⵔⵓ ⵏ ⵓⴼⵔⴰⴳ ⵉⴱⵇⵇⴰⵏ ⵅⴼ ⵓⵎⵏⵅⵔⴰⵟ ⵙ AMO/CNOPS.', 'AMTS ⵙ Wafa IMA Assistance.', '5 000 DH ⵉ ⵉⴼⵔⵅⴰⵏ ⴳ ⵓⵙⵔⵓⵜ ⵉⵎⵥⵍⵉ.', 'ⵉⵣⴷⴰⵢⵏ ⴷ ⵉⵎⵣⵣⴰⵔⵏ, ⵉⵙⵉⴱⵉⵜⴰⵍⵏ, ⵉⵎⵙⵙⵉⵊⵊⵉⵏ ⴷ ⵉⵎⵙⵡⴰⵍⵏ ⵏ ⵜⵉⵟⵟ.'],
        amcDetail: amcDetailZgh,
        amtsDetail: amtsDetailZgh,
        features: [['ⵅⴼ ⵜⴰⵏⴼⵓⵜ', 'ⴰⵎⵓⴷⴷⵓ, ⴰⵙⴷⵓ ⴷ ⵜⵎⵙⵍⵉⵡⵜ.'], ['AMC', 'ⴰⵔⴰⵔⵓ ⵙ ⵎⴽ ⵉⵍⵍⴰ ⴳ ⵓⵎⵙⴰⵡⴰⴹ.'], ['AMTS', 'ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ.'], ['ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵙⵡⵉⵔⵏ ⵉⵎⵥⵍⵉⵢⵏ', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.'], ['ⵉⵎⵙⴰⵡⴰⴹⵏ ⵉⴷⵓⵙⴰⵏⵏ', 'ⵉⵣⴷⴰⵢⵏ ⴳ ⵜⵎⵓⵔⴰ ⵎⴰⵔⵔⴰ.']],
        centerMedical: {
          badge: 'ⵅⴼ ⵜⴰⵏⴼⵓⵜ',
          title: 'ⴰⵎⵓⴷⴷⵓ ⴰⴷⴰⵡⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ',
          intro: 'FOS-Agri ⵜⵙⵙⵓⴼⵖ ⵜⴰⴷⵓⵙⵉ ⴷ ⴰⵙⵓⵔⵉⴼ ⴰⵎⵇⵔⴰⵏ ⵙ ⵓⵙⵎⵓⵜⵜⴳ ⵏ ⵜⵎⵓⵔⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⵉⵙⵎⵓⵏⵏ AMC, ⴰⵎⵓⴷⴷⵓ ⴰⴷⴰⵡⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ, AMTS ⴷ ⵉⵎⵙⴰⵡⴰⴹⵏ ⵉⴷⵓⵙⴰⵏⵏ ⴳ ⵜⵎⵓⵔⴰ ⵎⴰⵔⵔⴰ ⵙ ⵜⵉⵡⵉⵙⵉ ⵏ ⵉⵎⵙⵏⴰⵡⵏ ⵉⵏⵏⴰⵡⵏ.',
          items: [
            {
              icon: 'fa-shield-heart',
              title: 'AMC',
              body: [
                'FOS-Agri ⵜⴻⵜⵜⴰⵍⵍⴰⵍ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵉⵎⵓⵔⴰⵏ ⵏ ⵜⴰⴷⵓⵙⵉ ⵙ AMC ⵉ ⵓⵙⵖⵉⵎ ⵏ ⵜⴳⵯⵎⵉ ⵜⴰⴷⵓⵙⴰⵏⵜ ⵏ ⵜⵡⴰⵛⵓⵍⵜ.',
                'ⴰⵎⵙⴰⵡⴰⴹ ⴷ SAHAM Assurance ⵉⵜⵜⴰⵡⵙ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ:'
              ],
              bullets: [
                'ⴰⵔⴰⵔⵓ ⵏ 100% ⵏ ⵓⴼⵔⴰⴳ ⵉⵜⵜⴳⴰⵏ ⵅⴼ ⵓⵎⵏⵅⵔⴰⵟ ⵙ ⵓⵙⵎⵔⵙ ⵏ AMO/Mutuelle.',
                'ⴰⵔⴰⵔⵓ ⴰⴳⵔⴰⵡ ⵏ 1 MDH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ, ⵎⴰⵛⴰ ⵜⵉⵣⵣⵓⵍⴰ ⵏ ⵉⴳⴰⵏⵏ ⴰⵔ 250 000 DH.'
              ]
            },
            {
              icon: 'fa-truck-medical',
              navIndex: 2,
              title: 'AMTS',
              body: [
                'FOS-Agri ⵜⴻⵜⵜⴰⵍⵍⴰⵍ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵉⵎⵓⵔⴰⵏ ⵉⵙⵙⴷⴰⵔⵏ ⵙ AMTS ⴷ Wafa IMA Assistance.',
                'ⵜⴰⵍⵍⴰⵍⵜ ⴰⴷ ⵜⵙⵎⵓⵏ ⵉⴳⵔⴰⵏ ⵏ ⵓⵙⵙⵉⴹⵏ, ⵓⵎⵓⵔⵙ, ⵜⵎⵜⵜⴰⵏⵜ, ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⵖⵔ ⴱⵕⵕⴰ ⵉ ⵉⵎⵓⵔⴰⵏ ⵓⵔ ⵉⵜⵜⵓⵙⵙⵓⵊⵊⴰⵏ ⴳ ⵍⵎⵖⵔⵉⴱ.'
              ]
            },
            {
              icon: 'fa-hands-holding-child',
              navIndex: 5,
              title: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵙⵡⵉⵔⵏ ⵉⵎⵥⵍⵉⵢⵏ',
              body: [
                'FOS-Agri ⵜⵙⵎⵓⵜⵜⴳ ⵢⴰⵜ ⵜⴰⵏⴼⵓⵙⵜ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵓⵙⵔⵓⵜ, ⵙ ⵓⵎⵓⴷⴷⵓ ⵏ 5000 DH.'
              ]
            },
            {
              icon: 'fa-file-contract',
              navIndex: 6,
              title: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏⵏ',
              body: [
                'ⵜⴰⴱⵍⵓⵜ ⵏ ⵉⵎⵙⴰⵡⴰⴹⵏ (ⵉⵎⵣⵣⴰⵔⵏ, ⵉⵎⵙⵙⵉⵊⵊⵉⵏ, ⵜⵉⵔⵣⴰ)'
              ]
            }
          ]
        },
        extraSections: prevoyanceExtraZgh,
        partners: ['ⵉⵎⵣⵣⴰⵔⵏ', 'ⵉⵙⵉⴱⵉⵜⴰⵍⵏ', 'ⵉⵎⵙⵙⵉⵊⵊⵉⵏ', 'ⵉⵎⵙⵡⴰⵍⵏ ⵏ ⵜⵉⵟⵟ', 'ⵜⵉⴼⴰⵔⵎⴰⵙⵉⵜⵉⵏ', 'ⵉⵎⵎⴰⵙⵏ ⵏ ⵓⵅⵙⴰⵏ'],
        steps: [['ⴰⵙⴷⵓ', 'ⵙⵙⵏ ⵜⴰⵏⴼⵓⵙⵜ.'], ['ⴰⴼⴰⵢⵍⵓ', 'ⵙⵎⵓⵏ ⵜⵉⴽⴰⵔⴹⵉⵡⵉⵏ.'], ['ⴰⵎⵓⴷⴷⵓ', 'ⴹⴼⵕ AMC/AMTS.'], ['ⴰⵎⵙⵏⴰⵡ', 'ⵎⵢⴰⵡⴰⵍ ⴷ ⵓⵎⵙⵏⴰⵡ.']]
      }
    },
    culture: {
      href: 'services/culture-loisirs-voyages.html',
      fr: {
        title: 'Culture, loisirs, et voyages',
        meta: 'Détente, partage et découverte',
        summary: 'Des programmes pour créer des moments de détente, de découverte culturelle et d’évasion au profit des adhérents et de leurs familles.',
        stats: [['6', 'sous-rubriques'], ['Familles', 'activités intergénérationnelles'], ['Partenaires', 'offres et conventions loisirs']],
        chips: ['Loisirs et voyages', 'Colonies de vacances', 'Omra', 'Pèlerinage', 'Cérémonies', 'Conventions et partenariats'],
        overview: 'Cette rubrique réunit les actions culturelles, les activités de loisirs, les voyages et les opérations à forte dimension humaine dans une ambiance conviviale et enrichissante.',
        highlights: ['Voyages organisés, vacances d’hiver, excursions et estivage.', 'Colonies de vacances et activités pour enfants.', 'Opérations Omra, pèlerinage et accompagnement des bénéficiaires.', 'Conventions avec partenaires pour faciliter l’accès aux loisirs.'],
        features: [['Loisirs et voyages', 'Sorties, découvertes, séjours et activités de détente.'], ['Colonies de vacances', 'Programmes collectifs pour les enfants des adhérents.'], ['Omra', 'Opérations sociales encadrées selon le calendrier validé.'], ['Pèlerinage', 'Information et orientation des bénéficiaires concernés.'], ['Cérémonies', 'Moments de reconnaissance, partage et solidarité.'], ['Conventions et partenariats', 'Tarifs, offres et accès préférentiels selon conventions.']],
        partners: ['Voyages organisés', 'Vacances hiver', 'Excursions', 'Estivage', 'SIAM', 'Salon du cheval'],
        steps: [['Programme', 'Consulter les opérations ouvertes.'], ['Éligibilité', 'Vérifier les conditions et délais.'], ['Inscription', 'Préparer le dossier demandé.'], ['Participation', 'Suivre les informations pratiques communiquées.']]
      },
      ar: {
        title: 'الثقافة والترفيه والأسفار',
        meta: 'راحة، مشاركة واكتشاف',
        summary: 'برامج لخلق لحظات للراحة والاكتشاف الثقافي والسفر لفائدة المنخرطين وأسرهم.',
        stats: [['6', 'خدمات فرعية'], ['الأسر', 'أنشطة بين الأجيال'], ['الشركاء', 'عروض واتفاقيات للترفيه']],
        chips: ['الترفيه والأسفار', 'مخيمات الاصطياف', 'العمرة', 'الحج', 'الحفلات', 'الاتفاقيات والشراكات'],
        overview: 'تجمع هذه الخانة الأنشطة الثقافية والترفيهية والأسفار والعمليات ذات البعد الإنساني في أجواء ودية ومفيدة.',
        highlights: ['أسفار منظمة، عطلة الشتاء، رحلات واصطياف.', 'مخيمات وأنشطة لفائدة أبناء المنخرطين.', 'عمليات العمرة والحج ومواكبة المستفيدين.', 'اتفاقيات مع شركاء لتسهيل الولوج إلى الترفيه.'],
        features: [['الترفيه والأسفار', 'خرجات، اكتشافات، إقامات وأنشطة للراحة.'], ['مخيمات الاصطياف', 'برامج جماعية لفائدة أبناء المنخرطين.'], ['العمرة', 'عمليات اجتماعية مؤطرة حسب البرنامج المصادق عليه.'], ['الحج', 'إخبار وتوجيه المستفيدين المعنيين.'], ['الحفلات', 'لحظات للاعتراف والمشاركة والتضامن.'], ['الاتفاقيات والشراكات', 'تعريفات وعروض وولوج تفضيلي حسب الاتفاقيات.']],
        partners: ['أسفار منظمة', 'عطلة الشتاء', 'رحلات', 'اصطياف', 'المعرض الدولي للفلاحة', 'معرض الفرس'],
        steps: [['البرنامج', 'الاطلاع على العمليات المفتوحة.'], ['الأهلية', 'التحقق من الشروط والآجال.'], ['التسجيل', 'تحضير الملف المطلوب.'], ['المشاركة', 'تتبع المعلومات العملية المعلن عنها.']]
      },
      zgh: {
        title: 'ⵜⴰⴷⵍⵙⴰ, ⵜⵉⵔⴰⵔⵉⵏ ⴷ ⵉⵙⴰⴼⴰⵔⵏ',
        meta: 'ⴰⵙⴳⵓⵏⴼⵓ, ⵜⵉⵡⵉⵙⵉ ⴷ ⵓⵙⵙⵏ',
        summary: 'ⵜⵉⵏⴼⵓⵙⵉⵏ ⵉ ⵓⵙⴽⵔ ⵏ ⵜⵉⵣⵉ ⵏ ⵓⵙⴳⵓⵏⴼⵓ, ⵓⵙⵙⵏ ⴰⴷⵍⵙⴰⵏ ⴷ ⵓⵙⴰⴼⴰⵔ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵜ.',
        stats: [['6', 'ⵜⵉⵙⴳⴰⵔ'], ['ⵜⵉⵡⴰⵛⵓⵍⵉⵏ', 'ⵜⵉⵔⵎⴰⴷ ⴳⵔ ⵉⵎⵓⴽⵔⵉⵙⵏ'], ['ⵉⵣⴷⴰⵢⵏ', 'ⵜⵉⵡⵉⵙⵉⵏ ⴷ ⵉⵎⵙⴰⵡⴰⴹⵏ']],
        chips: ['ⵜⵉⵔⴰⵔⵉⵏ ⴷ ⵉⵙⴰⴼⴰⵔⵏ', 'ⵜⵉⵎⵥⵍⵉⵢⵉⵏ ⵏ ⵓⵙⴳⵓⵏⴼⵓ', 'ⵓⵎⵔⴰ', 'ⴰⵃⴰⵊⵊ', 'ⵜⵉⵎⵍⵉⵍⵉⵏ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ'],
        overview: 'ⵜⴰⵙⴳⴰ ⴰⴷ ⵜⵙⵎⵓⵏ ⵜⵉⵔⵎⴰⴷ ⵜⵉⴷⵍⵙⴰⵏⵉⵏ, ⵜⵉⵔⴰⵔⵉⵏ, ⵉⵙⴰⴼⴰⵔⵏ ⴷ ⵜⵎⴰⵎⴽⵉⵏ ⵉⵙⵎⵓⵏⵏ ⵉⵎⴰⵏⵏ.',
        highlights: ['ⵉⵙⴰⴼⴰⵔⵏ ⵉⵜⵜⵓⵙⵓⴷⵙⵏ, ⴰⵙⴳⵓⵏⴼⵓ ⵏ ⵜⴳⵔⵙⵜ, ⵜⵉⵔⵣⴰ ⴷ ⵓⵙⴳⵓⵏⴼⵓ.', 'ⵜⵉⵎⵥⵍⵉⵢⵉⵏ ⵏ ⵓⵙⴳⵓⵏⴼⵓ ⵉ ⵉⴼⵔⵅⴰⵏ.', 'ⵜⵉⵎⴰⵎⴽⵉⵏ ⵏ ⵓⵎⵔⴰ ⴷ ⴰⵃⴰⵊⵊ.', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉ ⵓⵙⵙⵓⴼⵖ ⵏ ⵜⵉⵔⴰⵔⵉⵏ.'],
        features: [['ⵜⵉⵔⴰⵔⵉⵏ ⴷ ⵉⵙⴰⴼⴰⵔⵏ', 'ⵜⵉⵔⵣⴰ, ⵓⵙⵙⵏ, ⵜⵉⵖⵔⵎⵉⵏ ⴷ ⵜⵉⵔⵎⴰⴷ ⵏ ⵓⵙⴳⵓⵏⴼⵓ.'], ['ⵜⵉⵎⵥⵍⵉⵢⵉⵏ ⵏ ⵓⵙⴳⵓⵏⴼⵓ', 'ⵜⵉⵏⴼⵓⵙⵉⵏ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.'], ['ⵓⵎⵔⴰ', 'ⵜⵉⵎⴰⵎⴽⵉⵏ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ ⵙ ⵓⵙⴷⵓ.'], ['ⴰⵃⴰⵊⵊ', 'ⵜⵉⵏⵖⵎⵉⵙⵉⵏ ⴷ ⵓⵙⴷⵓ ⵉ ⵉⵎⵏⴼⴰⵄⵏ.'], ['ⵜⵉⵎⵍⵉⵍⵉⵏ', 'ⵜⵉⵣⵉ ⵏ ⵓⵙⵎⵓⵏ ⴷ ⵜⵉⵡⵉⵙⵉ.'], ['ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ', 'ⵜⵉⵙⵏⵙⵉⵡⵉⵏ ⴷ ⵓⵍⵓⴳ ⵉⵎⵥⵍⵉ.']],
        partners: ['ⵉⵙⴰⴼⴰⵔⵏ ⵉⵜⵜⵓⵙⵓⴷⵙⵏ', 'ⴰⵙⴳⵓⵏⴼⵓ ⵏ ⵜⴳⵔⵙⵜ', 'ⵜⵉⵔⵣⴰ', 'ⴰⵙⴳⵓⵏⴼⵓ', 'SIAM', 'ⴰⵙⴰⵔⴰⴳ ⵏ ⴰⵢⵢⵉⵙ'],
        steps: [['ⴰⵙⵎⴰⵔ', 'ⵥⵕ ⵜⵉⵎⴰⵎⴽⵉⵏ ⵉⵍⵍⴰⵏ.'], ['ⵜⵉⵡⵜⵉⵍⵉⵏ', 'ⵙⵙⵏ ⵜⵉⵡⵜⵉⵍⵉⵏ ⴷ ⵜⵉⵣⵉ.'], ['ⴰⵙⵙⴼⵜⵔ', 'ⵙⵎⵓⵏ ⴰⴼⴰⵢⵍⵓ.'], ['ⵜⵉⵡⵉⵙⵉ', 'ⴹⴼⵕ ⵜⵉⵏⵖⵎⵉⵙⵉⵏ ⵉⵜⵜⵓⵙⴼⴽⵏ.']]
      }
    },
    formation: {
      href: 'services/formation-scolarisation.html',
      fr: {
        title: 'Appui à la Scolarisation et Formation',
        meta: 'Réussite scolaire et accompagnement parental',
        summary: 'Des dispositifs pour soutenir les enfants des adhérents dans leur parcours scolaire et encourager l’excellence.',
        stats: [['Coaching', 'scolaire et parental'], ['Bourses', 'excellence et bourses sociales'], ['Rentrée', 'primes et conventions éducatives']],
        chips: ['Coaching scolaire et parental', 'Bourses d’excellence et bourses sociales', 'Primes de rentrée scolaire', 'Conventions éducatives'],
        overview: 'Cette rubrique accompagne les familles dans les étapes importantes de la scolarité, de l’orientation et de la formation.',
        highlights: ['Coaching scolaire et parental.', 'Bourses d’excellence et bourses sociales.', 'Primes de rentrée scolaire.', 'Conventions avec établissements et partenaires éducatifs.'],
        features: [['Coaching scolaire et parental', 'Ateliers et accompagnement pour mieux orienter les enfants et soutenir les parents.'], ['Bourses d’excellence et bourses sociales', 'Valorisation des parcours scolaires remarquables et appui social aux familles éligibles.'], ['Primes de rentrée scolaire', 'Appui aux familles au moment de la rentrée.'], ['Conventions éducatives', 'Accès à des partenaires éducatifs selon les conventions validées.']],
        partners: ['Rentrée scolaire', 'Préparation aux grandes écoles', 'Coaching parental', 'Coaching', 'Bourse'],
        steps: [['Annonce', 'Suivre le calendrier de chaque opération.'], ['Conditions', 'Vérifier l’éligibilité et les justificatifs.'], ['Dépôt', 'Transmettre le dossier complet.'], ['Suivi', 'Consulter les résultats ou orientations.']]
      },
      ar: {
        title: 'دعم التمدرس والتكوين',
        meta: 'نجاح دراسي ومواكبة أسرية',
        summary: 'آليات لدعم أبناء المنخرطين في مسارهم الدراسي وتشجيع التميز.',
        stats: [['المواكبة', 'الدراسية والأسرية'], ['المنح', 'التميز والمنح الاجتماعية'], ['الدخول المدرسي', 'منح واتفاقيات تربوية']],
        chips: ['المواكبة الدراسية والأسرية', 'منح التميز والمنح الاجتماعية', 'منح الدخول المدرسي', 'الاتفاقيات التربوية'],
        overview: 'تواكب هذه الخانة الأسر في المراحل الأساسية للتمدرس والتوجيه والتكوين.',
        highlights: ['المواكبة الدراسية والأسرية.', 'منح التميز والمنح الاجتماعية.', 'منح الدخول المدرسي.', 'اتفاقيات مع مؤسسات وشركاء تربويين.'],
        features: [['المواكبة الدراسية والأسرية', 'ورشات ومواكبة لتوجيه الأبناء ودعم الآباء.'], ['منح التميز والمنح الاجتماعية', 'تثمين المسارات الدراسية المتميزة ودعم الأسر المؤهلة.'], ['منح الدخول المدرسي', 'دعم الأسر خلال فترة الدخول المدرسي.'], ['الاتفاقيات التربوية', 'ولوج إلى شركاء تربويين حسب الاتفاقيات المصادق عليها.']],
        partners: ['الدخول المدرسي', 'التحضير للمدارس العليا', 'المواكبة الأسرية', 'المواكبة', 'المنح'],
        steps: [['الإعلان', 'تتبع برنامج كل عملية.'], ['الشروط', 'التحقق من الأهلية والوثائق.'], ['الإيداع', 'إرسال الملف كاملا.'], ['التتبع', 'الاطلاع على النتائج أو التوجيهات.']]
      },
      zgh: {
        title: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵓⵙⵍⵎⴷ ⴷ ⵓⵙⵙⵉⵍⵖ',
        meta: 'ⴰⵙⵎⵔⵙ ⴰⵙⵍⵎⴰⴷ ⴷ ⵓⵎⵓⴷⴷⵓ ⵏ ⵜⵡⴰⵛⵓⵍⵜ',
        summary: 'ⵜⵉⵏⴼⵓⵙⵉⵏ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵓⴱⵔⵉⴷ ⵏ ⵓⵙⵍⵎⴷ.',
        stats: [['ⴰⵎⵓⴷⴷⵓ', 'ⴰⵙⵍⵎⴰⴷ ⴷ ⵏ ⵜⵡⴰⵛⵓⵍⵜ'], ['ⵜⵉⵎⵓⴷⴰ', 'ⵜⵉⵎⵓⴷⴰ ⵏ ⵜⵎⵥⵉ ⴷ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ'], ['ⵜⴰⵣⵡⴰⵔⵜ', 'ⵜⵉⵎⵓⴷⴰ ⴷ ⵉⵎⵙⴰⵡⴰⴹⵏ']],
        chips: ['ⴰⵎⵓⴷⴷⵓ ⴰⵙⵍⵎⴰⴷ ⴷ ⵏ ⵜⵡⴰⵛⵓⵍⵜ', 'ⵜⵉⵎⵓⴷⴰ ⵏ ⵜⵎⵥⵉ ⴷ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ', 'ⵜⵉⵎⵓⴷⴰ ⵏ ⵜⴰⵣⵡⴰⵔⵜ ⵏ ⵓⵙⵍⵎⴷ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⵏ ⵓⵙⵍⵎⴷ'],
        overview: 'ⵜⴰⵙⴳⴰ ⴰⴷ ⵜⴻⵜⵜⴰⵡⵙ ⵜⵉⵡⴰⵛⵓⵍⵉⵏ ⴳ ⵜⵉⵣⵉ ⵏ ⵓⵙⵍⵎⴷ, ⵓⵙⴷⵓ ⴷ ⵓⵙⵙⵉⵍⵖ.',
        highlights: ['ⴰⵎⵓⴷⴷⵓ ⴰⵙⵍⵎⴰⴷ ⴷ ⵏ ⵜⵡⴰⵛⵓⵍⵜ.', 'ⵜⵉⵎⵓⴷⴰ ⵏ ⵜⵎⵥⵉ ⴷ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ.', 'ⵜⵉⵎⵓⴷⴰ ⵏ ⵜⴰⵣⵡⴰⵔⵜ ⵏ ⵓⵙⵍⵎⴷ.', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵏ ⵓⵙⵍⵎⴷ.'],
        features: [['ⴰⵎⵓⴷⴷⵓ ⴰⵙⵍⵎⴰⴷ ⴷ ⵏ ⵜⵡⴰⵛⵓⵍⵜ', 'ⵜⵉⵔⵎⴰⴷ ⴷ ⵓⵎⵓⴷⴷⵓ ⵉ ⵓⵙⴷⵓ ⵏ ⵉⴼⵔⵅⴰⵏ.'], ['ⵜⵉⵎⵓⴷⴰ ⵏ ⵜⵎⵥⵉ ⴷ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ', 'ⴰⵙⵎⵔⵙ ⵏ ⵉⴱⵔⵉⴷⵏ ⵉⵎⵥⵉⵢⵏ ⴷ ⵓⵎⵓⴷⴷⵓ ⴰⵏⴰⵎⵓⵏ.'], ['ⵜⵉⵎⵓⴷⴰ ⵏ ⵜⴰⵣⵡⴰⵔⵜ', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵜⵡⴰⵛⵓⵍⵉⵏ ⴳ ⵜⵉⵣⵉ ⵏ ⵜⴰⵣⵡⴰⵔⵜ.'], ['ⵉⵎⵙⴰⵡⴰⴹⵏ ⵏ ⵓⵙⵍⵎⴷ', 'ⵓⵍⵓⴳ ⵖⵔ ⵉⵣⴷⴰⵢⵏ ⵏ ⵓⵙⵍⵎⴷ.']],
        partners: ['ⵜⴰⵣⵡⴰⵔⵜ ⵏ ⵓⵙⵍⵎⴷ', 'ⴰⵙⵎⵓⵜⵜⴳ ⵉ ⵜⵎⴰⵣⵉⵔⵉⵏ ⵏ ⵓⵙⵍⵎⴷ', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵡⴰⵛⵓⵍⵜ', 'ⴰⵎⵓⴷⴷⵓ', 'ⵜⵉⵎⵓⴷⴰ'],
        steps: [['ⴰⵙⵎⴰⵔ', 'ⴹⴼⵕ ⵜⵉⵣⵉ ⵏ ⴽⵓ ⵜⴰⵎⴰⵎⴽⵜ.'], ['ⵜⵉⵡⵜⵉⵍⵉⵏ', 'ⵙⵙⵏ ⵜⵉⵡⵜⵉⵍⵉⵏ ⴷ ⵉⵙⵍⴽⴰⵎⵏ.'], ['ⴰⵙⵙⴼⴽ', 'ⴼⴽ ⴰⴼⴰⵢⵍⵓ ⴰⴽⵎⴰⵎ.'], ['ⵓⵜⵜⴰⴱⴰⵄ', 'ⵥⵕ ⵜⵉⵏⵎⵍ ⵏ ⵓⵙⴷⵓ.']]
      }
    },
    logement: {
      href: 'services/acces-logement.html',
      fr: {
        title: 'Accès au logement',
        meta: 'Logement, banques et projets immobiliers',
        summary: 'Un accompagnement pour faciliter l’accès au logement à travers l’aide au logement, les offres bancaires préférentielles et les partenariats immobiliers.',
        stats: [['9', 'offres immobilières recensées'], ['76 ans', 'âge indiqué pour Al Barid Bank sur le site'], ['Banques', 'crédits préférentiels logement']],
        chips: ['Aide au logement', 'Offres bancaires à des taux de crédits préférentiels', 'Promoteurs immobiliers', 'Mise en place des projets logement par la FOS-Agri'],
        overview: 'Les fichiers transmis recensent les offres de crédit immobilier et les conventions bancaires associées au logement, avec des établissements confirmés et des avis à maintenir à jour.',
        highlights: ['Aide au logement et accompagnement des adhérents.', 'Offres bancaires à taux de crédits préférentiels.', 'Promoteurs immobiliers et projets logement par FOS-Agri.', 'Suivi des offres Banque Populaire, BMCI, Crédit du Maroc, CFG Bank, Crédit Agricole du Maroc, Wafa Immobilier, Al Barid Bank, Bank Assafa et autres partenaires.'],
        features: [['Aide au logement', 'Orientation des adhérents vers les dispositifs et partenaires disponibles.'], ['Offres bancaires préférentielles', 'Crédits immobiliers négociés avec des banques partenaires.'], ['Promoteurs immobiliers', 'Mise en relation avec les offres immobilières validées.'], ['Projets logement FOS-Agri', 'Suivi des projets logement mis en place par la Fondation.']],
        partners: ['Banque Populaire', 'Al Barid Bank', 'Wafa Immobilier', 'BMCI', 'Crédit du Maroc', 'CFG Bank', 'Crédit Agricole du Maroc', 'Attijari Wafa Bank', 'Bank Assafa'],
        steps: [['Besoin', 'Définir le type de logement ou financement.'], ['Offre', 'Comparer les partenaires et âges limites de crédit.'], ['Dossier', 'Préparer les justificatifs bancaires et administratifs.'], ['Suivi', 'Confirmer l’offre active auprès de la Fondation.']]
      },
      ar: {
        title: 'الولوج إلى السكن',
        meta: 'السكن، الأبناك والمشاريع العقارية',
        summary: 'مواكبة لتسهيل الولوج إلى السكن عبر الدعم السكني والعروض البنكية التفضيلية والشراكات العقارية.',
        stats: [['9', 'عروض عقارية محصاة'], ['76 سنة', 'السن المشار إليه لبريد بنك'], ['الأبناك', 'قروض سكنية تفضيلية']],
        chips: ['المساعدة على السكن', 'عروض بنكية بنسب قروض تفضيلية', 'المنعشون العقاريون', 'إحداث مشاريع سكنية من طرف FOS-Agri'],
        overview: 'تضم الملفات المتوصل بها عروض القروض العقارية والاتفاقيات البنكية المرتبطة بالسكن، مع مؤسسات مؤكدة ومعطيات يجب تحيينها باستمرار.',
        highlights: ['دعم السكن ومواكبة المنخرطين.', 'عروض بنكية بنسب قروض تفضيلية.', 'منعشون عقاريون ومشاريع سكنية عبر FOS-Agri.', 'تتبع عروض الشركاء البنكيين والعقاريين.'],
        features: [['المساعدة على السكن', 'توجيه المنخرطين نحو الآليات والشركاء المتاحين.'], ['العروض البنكية التفضيلية', 'قروض عقارية متفاوض بشأنها مع أبناك شريكة.'], ['المنعشون العقاريون', 'ربط المنخرطين بالعروض العقارية المصادق عليها.'], ['مشاريع السكن FOS-Agri', 'تتبع المشاريع السكنية التي تضعها المؤسسة.']],
        partners: ['Banque Populaire', 'Al Barid Bank', 'Wafa Immobilier', 'BMCI', 'Crédit du Maroc', 'CFG Bank', 'Crédit Agricole du Maroc', 'Attijari Wafa Bank', 'Bank Assafa'],
        steps: [['الحاجة', 'تحديد نوع السكن أو التمويل.'], ['العرض', 'مقارنة الشركاء وحدود السن للقرض.'], ['الملف', 'تحضير الوثائق البنكية والإدارية.'], ['التتبع', 'تأكيد العرض النشط لدى المؤسسة.']]
      },
      zgh: {
        title: 'ⵓⵍⵓⴳ ⵖⵔ ⵓⵙⵖⵉⵎ',
        meta: 'ⴰⵙⵖⵉⵎ, ⵉⴱⴰⵏⴽⵏ ⴷ ⵉⵙⵏⴼⴰⵔⵏ ⵏ ⵓⵙⵖⵉⵎ',
        summary: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵓⵙⵙⵓⴼⵖ ⵏ ⵓⵍⵓⴳ ⵖⵔ ⵓⵙⵖⵉⵎ ⵙ ⵜⵉⵡⵉⵙⵉⵏ, ⵉⴼⵔⴰⵏ ⵏ ⵉⴱⴰⵏⴽⵏ ⴷ ⵉⵣⴷⴰⵢⵏ.',
        stats: [['9', 'ⵜⵉⵡⵉⵙⵉⵏ ⵏ ⵓⵙⵖⵉⵎ'], ['76 ⵓⵙⴳⴳⵯⴰⵙ', 'ⵜⵉⵍⴰⵍ ⵏ Al Barid Bank'], ['ⵉⴱⴰⵏⴽⵏ', 'ⵉⴼⵔⴰⵏ ⵏ ⵓⴽⵔⵉⴹⵉ ⵏ ⵓⵙⵖⵉⵎ']],
        chips: ['ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵖⵉⵎ', 'ⵉⴼⵔⴰⵏ ⵏ ⵉⴱⴰⵏⴽⵏ', 'ⵉⵎⵙⵏⴼⴰⵔⵏ ⵏ ⵓⵙⵖⵉⵎ', 'ⵉⵙⵏⴼⴰⵔⵏ ⵏ ⵓⵙⵖⵉⵎ ⵙ FOS-Agri'],
        overview: 'ⵜⵉⴼⴰⵢⵍⵉⵡⵉⵏ ⵉⵜⵜⵓⵙⴼⴽⵏⵉⵏ ⵙⵎⵓⵏⵏⵜ ⵉⴼⵔⴰⵏ ⵏ ⵓⴽⵔⵉⴹⵉ ⵏ ⵓⵙⵖⵉⵎ ⴷ ⵉⵎⵙⴰⵡⴰⴹⵏ ⵏ ⵉⴱⴰⵏⴽⵏ.',
        highlights: ['ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵖⵉⵎ ⴷ ⵓⵙⴷⵓ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.', 'ⵉⴼⵔⴰⵏ ⵏ ⵉⴱⴰⵏⴽⵏ ⵙ ⵜⵎⴰⵏⴰⵡⵜ ⵉⵎⵥⵍⵉⵢⵏ.', 'ⵉⵎⵙⵏⴼⴰⵔⵏ ⴷ ⵉⵙⵏⴼⴰⵔⵏ ⵏ FOS-Agri.', 'ⵓⵜⵜⴰⴱⴰⵄ ⵏ ⵉⴼⵔⴰⵏ ⵏ ⵉⵣⴷⴰⵢⵏ.'],
        features: [['ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵖⵉⵎ', 'ⴰⵙⴷⵓ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⵖⵔ ⵉⴼⵔⴰⵏ ⴷ ⵉⵣⴷⴰⵢⵏ.'], ['ⵉⴼⵔⴰⵏ ⵏ ⵉⴱⴰⵏⴽⵏ', 'ⴰⴽⵔⵉⴹⵉ ⵏ ⵓⵙⵖⵉⵎ ⵙ ⵉⴱⴰⵏⴽⵏ ⵉⵣⴷⵉⵏ.'], ['ⵉⵎⵙⵏⴼⴰⵔⵏ ⵏ ⵓⵙⵖⵉⵎ', 'ⴰⵣⴷⴰⵢ ⴷ ⵉⴼⵔⴰⵏ ⵏ ⵓⵙⵖⵉⵎ ⵉⵜⵜⵓⵙⵎⴷⵏ.'], ['ⵉⵙⵏⴼⴰⵔⵏ FOS-Agri', 'ⵓⵜⵜⴰⴱⴰⵄ ⵏ ⵉⵙⵏⴼⴰⵔⵏ ⵏ ⵓⵙⵖⵉⵎ.']],
        partners: ['Banque Populaire', 'Al Barid Bank', 'Wafa Immobilier', 'BMCI', 'Crédit du Maroc', 'CFG Bank', 'Crédit Agricole du Maroc', 'Attijari Wafa Bank', 'Bank Assafa'],
        steps: [['ⴰⵙⵔⵓⵜ', 'ⵙⵙⵏ ⴰⵏⴰⵡ ⵏ ⵓⵙⵖⵉⵎ ⵏⵖ ⵓⵎⵓⴷⴷⵓ.'], ['ⴰⴼⵔⴰⵏ', 'ⵙⵙⵎⵓⵜⵜⴳ ⵉⵣⴷⴰⵢⵏ ⴷ ⵜⵉⵍⴰⵍ ⵏ ⵓⴽⵔⵉⴹⵉ.'], ['ⴰⴼⴰⵢⵍⵓ', 'ⵙⵎⵓⵏ ⵜⵉⵡⵔⵉⵇⵉⵏ ⵏ ⵉⴱⴰⵏⴽⵏ ⴷ ⵜⴷⴱⵉⵔⵜ.'], ['ⵓⵜⵜⴰⴱⴰⵄ', 'ⵙⵙⵏⵜⵎ ⴰⴼⵔⴰⵏ ⴷ FOS-Agri.']]
      }
    },
    projets: {
      href: 'services/projets-personnels.html',
      fr: {
        title: 'Appui aux projets personnels',
        meta: 'Crédits sociaux et partenariats préférentiels',
        summary: 'Des conventions financières et partenariats pour soutenir les projets personnels des adhérents à des conditions préférentielles.',
        stats: [['Crédits', 'sociaux et consommation'], ['Institutions', 'financières partenaires'], ['Tarifs', 'préférentiels et subventionnés']],
        chips: ['Crédits sociaux', 'Conventions avec les institutions financières', 'Partenariats subventionnés', 'Partenariats à des tarifs préférentiel'],
        overview: 'Cette rubrique rassemble les solutions d’appui financier, les conventions avec les institutions et les offres partenaires destinées à faciliter les projets personnels.',
        highlights: ['Crédits sociaux et offres de consommation.', 'Conventions avec les institutions financières.', 'Partenariats subventionnés.', 'Partenariats à tarifs préférentiels.'],
        features: [['Crédits sociaux', 'Solutions de financement orientées vers les besoins personnels des adhérents.'], ['Conventions avec les institutions financières', 'Conventions avec banques et organismes partenaires.'], ['Partenariats subventionnés', 'Offres appuyées pour réduire le coût d’accès.'], ['Partenariats à des tarifs préférentiel', 'Conditions négociées au bénéfice des adhérents.']],
        partners: ['Attijari Wafa Bank', 'Banque Populaire', 'CFG Bank', 'Crédit du Maroc', 'Eqdom', 'Salafin', 'Wafa Salaf'],
        steps: [['Projet', 'Identifier la nature du besoin personnel.'], ['Partenaire', 'Choisir l’institution ou la convention adaptée.'], ['Conditions', 'Vérifier les taux, délais et pièces demandées.'], ['Dépôt', 'Finaliser la demande auprès du partenaire.']]
      },
      ar: {
        title: 'دعم المشاريع الشخصية',
        meta: 'قروض اجتماعية وشراكات تفضيلية',
        summary: 'اتفاقيات مالية وشراكات لدعم المشاريع الشخصية للمنخرطين بشروط تفضيلية.',
        stats: [['القروض', 'اجتماعية واستهلاكية'], ['المؤسسات', 'مالية شريكة'], ['التعريفات', 'تفضيلية ومدعمة']],
        chips: ['القروض الاجتماعية', 'اتفاقيات مع المؤسسات المالية', 'شراكات مدعمة', 'شراكات بتعريفات تفضيلية'],
        overview: 'تجمع هذه الخانة حلول الدعم المالي والاتفاقيات مع المؤسسات والعروض الشريكة الموجهة لتسهيل المشاريع الشخصية.',
        highlights: ['قروض اجتماعية وعروض استهلاكية.', 'اتفاقيات مع المؤسسات المالية.', 'شراكات مدعمة.', 'شراكات بتعريفات تفضيلية.'],
        features: [['القروض الاجتماعية', 'حلول تمويل موجهة للحاجيات الشخصية للمنخرطين.'], ['اتفاقيات مع المؤسسات المالية', 'اتفاقيات مع أبناك وهيئات شريكة.'], ['شراكات مدعمة', 'عروض مدعمة لتقليص كلفة الولوج.'], ['شراكات بتعريفات تفضيلية', 'شروط متفاوض بشأنها لفائدة المنخرطين.']],
        partners: ['Attijari Wafa Bank', 'Banque Populaire', 'CFG Bank', 'Crédit du Maroc', 'Eqdom', 'Salafin', 'Wafa Salaf'],
        steps: [['المشروع', 'تحديد طبيعة الحاجة الشخصية.'], ['الشريك', 'اختيار المؤسسة أو الاتفاقية المناسبة.'], ['الشروط', 'التحقق من النسب والآجال والوثائق المطلوبة.'], ['الإيداع', 'استكمال الطلب لدى الشريك.']]
      },
      zgh: {
        title: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵙⵏⴼⴰⵔⵏ ⵉⵎⵥⵍⵉⵢⵏ',
        meta: 'ⵉⴽⵔⵉⴹⵉⵜⵏ ⵉⵏⴰⵎⵓⵏⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⵎⵥⵍⵉⵢⵏ',
        summary: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⵉⵎⴰⵍⵉⵢⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⵙⵏⴼⴰⵔⵏ ⵉⵎⵥⵍⵉⵢⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.',
        stats: [['ⵉⴽⵔⵉⴹⵉⵜⵏ', 'ⵉⵏⴰⵎⵓⵏⵏ ⴷ ⵏ ⵓⵙⴽⴰⵔ'], ['ⵜⵉⵎⵙⵙⵉⵡⵉⵏ', 'ⵜⵉⵎⴰⵍⵉⵢⵉⵏ ⵉⵣⴷⵉⵏ'], ['ⵜⵉⵙⵏⵙⵉⵡⵉⵏ', 'ⵉⵎⵥⵍⵉⵢⵏ ⴷ ⵉⵜⵜⵓⴷⵄⵎⵏ']],
        chips: ['ⵉⴽⵔⵉⴹⵉⵜⵏ ⵉⵏⴰⵎⵓⵏⵏ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⵎⵙⵙⵉⵡⵉⵏ ⵜⵉⵎⴰⵍⵉⵢⵉⵏ', 'ⵉⵣⴷⴰⵢⵏ ⵉⵜⵜⵓⴷⵄⵎⵏ', 'ⵉⵣⴷⴰⵢⵏ ⵙ ⵜⵉⵙⵏⵙⵉⵡⵉⵏ ⵉⵎⵥⵍⵉⵢⵏ'],
        overview: 'ⵜⴰⵙⴳⴰ ⴰⴷ ⵜⵙⵎⵓⵏ ⵉⴼⵔⴰⵏ ⵏ ⵓⵎⵓⴷⴷⵓ ⴰⵎⴰⵍⵉ, ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⵎⵙⵙⵉⵡⵉⵏ ⴷ ⵉⴼⵔⴰⵏ ⵏ ⵉⵣⴷⴰⵢⵏ.',
        highlights: ['ⵉⴽⵔⵉⴹⵉⵜⵏ ⵉⵏⴰⵎⵓⵏⵏ ⴷ ⵉⴼⵔⴰⵏ ⵏ ⵓⵙⴽⴰⵔ.', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⵎⵙⵙⵉⵡⵉⵏ ⵜⵉⵎⴰⵍⵉⵢⵉⵏ.', 'ⵉⵣⴷⴰⵢⵏ ⵉⵜⵜⵓⴷⵄⵎⵏ.', 'ⵉⵣⴷⴰⵢⵏ ⵙ ⵜⵉⵙⵏⵙⵉⵡⵉⵏ ⵉⵎⵥⵍⵉⵢⵏ.'],
        features: [['ⵉⴽⵔⵉⴹⵉⵜⵏ ⵉⵏⴰⵎⵓⵏⵏ', 'ⵉⴼⵔⴰⵏ ⵏ ⵓⵎⵓⴷⴷⵓ ⵉ ⵉⵙⵡⵉⵔⵏ ⵉⵎⵥⵍⵉⵢⵏ.'], ['ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⵎⵙⵙⵉⵡⵉⵏ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⴱⴰⵏⴽⵏ ⴷ ⵉⵣⴷⴰⵢⵏ.'], ['ⵉⵣⴷⴰⵢⵏ ⵉⵜⵜⵓⴷⵄⵎⵏ', 'ⵉⴼⵔⴰⵏ ⵉⵜⵜⵓⴷⵄⵎⵏ ⵉ ⵓⵙⵙⵓⴼⵖ ⵏ ⵓⵣⵡⴰⵔ.'], ['ⵉⵣⴷⴰⵢⵏ ⵙ ⵜⵉⵙⵏⵙⵉⵡⵉⵏ', 'ⵜⵉⵡⵜⵉⵍⵉⵏ ⵉⵜⵜⵓⵙⴰⵡⴰⴹⵏ ⵉ ⵓⵎⵏⵅⵔⴰⵟ.']],
        partners: ['Attijari Wafa Bank', 'Banque Populaire', 'CFG Bank', 'Crédit du Maroc', 'Eqdom', 'Salafin', 'Wafa Salaf'],
        steps: [['ⴰⵙⵏⴼⴰⵔ', 'ⵙⵙⵏ ⴰⵏⴰⵡ ⵏ ⵓⵙⵔⵓⵜ ⴰⵎⵥⵍⵉ.'], ['ⴰⵣⴷⴰⵢ', 'ⴼⵔⵏ ⵜⴰⵎⵙⵙⵉⵡⵜ ⵏⵖ ⴰⵎⵙⴰⵡⴰⴹ ⵉⵍⴰⵇⵏ.'], ['ⵜⵉⵡⵜⵉⵍⵉⵏ', 'ⵙⵙⵏ ⵜⵉⵙⵏⵙⵉⵡⵉⵏ, ⵜⵉⵣⵉ ⴷ ⵉⵙⵍⴽⴰⵎⵏ.'], ['ⴰⵙⵙⴼⴽ', 'ⵙⵎⴷ ⴰⵙⵓⵜⵔ ⴷ ⵓⵣⴷⴰⵢ.']]
      }
    }
  };

  const controlledTranslations = {
    prevoyance: {
      zgh: {
        title: 'ⵜⴰⴷⵓⵙⵉ ⵜⴰⵎⴰⴷⴰⵏⵜ',
        meta: 'ⵜⴰⴷⵓⵙⵉ, ⴰⵎⵎⵓⵜⵜⵉ ⴷ ⵜⵓⴷⵔⵜ',
        summary: 'ⵜⴰⵏⴼⵓⵙⵜ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵜ ⴳ ⵜⴰⴷⵓⵙⵉ ⴷ ⵓⴹⵎⴰⵏ ⴰⵏⴰⵎⵓⵏ.',
        stats: [['100%', 'ⵏ ⵓⵙⵏⴰⵎ ⵉⵎⵎⵔⵏ ⵙ ⵓⵎⵙⴰⵡⴰⴹ'], ['1 MDH', 'ⴰⵙⵡⵉⵔ ⴰⴳⵔⴰⵡ ⵉ ⴽⵓ ⵢⴰⵏ'], ['5 000 DH', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⴳ ⵓⵙⵔⵓⵜ']],
        overview: 'FOS-Agri ⵜⵙⵙⵎⵓⵔⵙ ⵜⴰⴷⵓⵙⵉ ⵙ ⵓⵙⵉⴽⵍ ⴰⴷⵓⵙⴰⵏ ⴰⵎⵙⵎⴰⴷ, ⵜⴰⵍⵍⴰⵍⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ, ⴷ ⵉⵣⴷⴰⵢⵏ ⴳ ⵜⵎⵓⵔⴰ.',
        highlights: ['ⴰⵔⴰⵔⵓ ⵏ ⵓⵙⵏⴰⵎ ⵉⵎⵎⵔⵏ ⵙ ⵓⵎⵙⴰⵡⴰⴹ.', 'ⵜⴰⵍⵍⴰⵍⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⵙ ⵓⵣⴷⴰⵢ.', '5 000 DH ⵉ ⵉⴼⵔⵅⴰⵏ ⴳ ⵓⵙⵔⵓⵜ.', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵎⵙⵙⵓⵔⴰ ⵉⴷⵓⵙⴰⵏ.'],
        features: [['ⴰⵎⵎⴰⵙ ⴰⵎⴰⴷⴰⵏ ⴰⵏⴰⵎⵓⵏ', 'ⴰⵙⴷⵓ, ⴰⵙⵏⵎⵍ ⴷ ⵜⵎⵙⵍⵉⵡⵜ ⴳ ⵜⴰⴷⵓⵙⵉ.'], ['ⴰⵙⵉⴽⵍ ⴰⴷⵓⵙⴰⵏ ⴰⵎⵙⵎⴰⴷ', 'ⴰⵔⴰⵔⵓ ⵙ ⵎⴽ ⵉⵍⵍⴰ ⴳ ⵓⵎⵙⴰⵡⴰⴹ.'], ['ⵜⴰⵍⵍⴰⵍⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ', 'ⵜⴰⵍⵍⴰⵍⵜ ⵉ ⵜⵉⵎⵓⵔⴰ ⵜⵉⵎⵥⵍⴰⵢⵉⵏ ⴷ ⵓⵙⵉⵡⴹ.'], ['ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵓⵙⵔⵓⵜ ⵏ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.'], ['ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏ', 'ⵉⵣⴷⴰⵢⵏ ⴳ ⵜⵎⵓⵔⴰ ⵎⴰⵔⵔⴰ.']],
        partners: ['ⵉⵎⴰⵙⵙⵏ ⵏ ⵓⵙⵏⴼⵍ', 'ⵉⵎⵎⴰⵙⵏ ⵉⴷⵓⵙⴰⵏ', 'ⵉⵎⴰⴷⴰⵏⵏ', 'ⵉⵎⵙⵡⴰⵍⵏ ⵏ ⵜⵉⵟⵟ', 'ⵜⵉⵙⵉⴼⵔⵉⵏ', 'ⵉⵎⵎⴰⵙⵏ ⵏ ⵜⵓⵖⵎⴰⵙ'],
        steps: [['ⴰⵙⴷⵓ', 'ⵙⵙⵏ ⵜⴰⵏⴼⵓⵙⵜ ⵏⵖ ⴰⵣⴷⴰⵢ ⴰⵏⵎⴰⵍⴰⵏ.'], ['ⴰⴼⴰⵢⵍⵓ', 'ⵙⵎⵓⵏ ⵜⵉⴽⴰⵔⴹⵉⵡⵉⵏ.'], ['ⴰⵎⵓⴷⴷⵓ', 'ⴹⴼⵕ ⵉⵙⵓⵜⵔⵏ ⵏ ⵜⴰⵏⴼⵓⵙⵜ.'], ['ⴰⵎⵙⵏⴰⵡ', 'ⵎⵢⴰⵡⴰⵍ ⴷ ⵓⵎⵙⵏⴰⵡ ⴰⵎⵓⵔⴰⵏ.']]
      }
    },
    culture: {
      ar: {
        title: 'الثقافة والترفيه والأسفار',
        meta: 'الراحة والمشاركة والاكتشاف',
        summary: 'برامج تخلق لحظات للراحة والاكتشاف الثقافي والسفر لفائدة المنخرطين وأسرهم.',
        stats: [['6', 'خدمات فرعية'], ['الأسر', 'أنشطة بين الأجيال'], ['الشركاء', 'عروض واتفاقيات للترفيه']],
        chips: ['الترفيه والأسفار', 'مخيمات العطلة', 'العمرة', 'الحج', 'الحفلات', 'الاتفاقيات والشراكات'],
        overview: 'تجمع هذه الخانة الأنشطة الثقافية والترفيهية والأسفار والعمليات ذات البعد الإنساني في أجواء ودية ومفيدة.',
        highlights: ['أسفار منظمة ورحلات وأنشطة اصطياف.', 'مخيمات عطلة وأنشطة للأطفال.', 'عمليات العمرة والحج ومواكبة المستفيدين.', 'اتفاقيات لتيسير الولوج إلى الترفيه.'],
        features: [['الترفيه والأسفار', 'خرجات واكتشافات وإقامات وأنشطة للراحة.'], ['مخيمات العطلة', 'برامج جماعية لأبناء المنخرطين.'], ['العمرة', 'عمليات اجتماعية مؤطرة حسب البرنامج المعتمد.'], ['الحج', 'إعلام وتوجيه للمستفيدين المعنيين.'], ['الحفلات', 'لحظات اعتراف وتقاسم وتضامن.'], ['الاتفاقيات والشراكات', 'تعريفات وعروض وولوج تفضيلي حسب الاتفاقيات.']],
        partners: ['أسفار منظمة', 'عطل الشتاء', 'رحلات', 'اصطياف', 'المعارض والصالونات', 'أنشطة ثقافية'],
        steps: [['البرنامج', 'الاطلاع على العمليات المفتوحة.'], ['الأهلية', 'التحقق من الشروط والآجال.'], ['التسجيل', 'تحضير الملف المطلوب.'], ['المشاركة', 'تتبع المعلومات العملية المعلنة.']]
      },
      zgh: {
        title: 'ⵜⴰⴷⵍⵙⴰ, ⴰⵙⴰⵢⴰⵕ ⴷ ⵉⵙⵉⴽⵍⵏ',
        meta: 'ⴰⵙⴰⵢⴰⵕ, ⵜⵉⵔⵎⵉⵜ ⴷ ⵓⵙⵙⵏ',
        summary: 'ⵜⵉⵏⴼⴰⵙ ⵉ ⵓⵙⴰⵢⴰⵕ, ⴰⵙⵙⵏ ⵏ ⵜⴷⵍⵙⴰ ⴷ ⵉⵙⵉⴽⵍⵏ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵜ.',
        stats: [['6', 'ⵜⵉⵙⴳⴰⵔ ⵜⵉⵎⵥⵥⵉⵢⵏ'], ['ⵜⵉⵡⴰⵛⵓⵍⵉⵏ', 'ⵜⵉⵔⵎⴰⴷ ⵏ ⵉⵎⵏⵉⴷⵏ'], ['ⵉⵣⴷⴰⵢⵏ', 'ⵜⵉⵏⴼⴰⵙ ⵏ ⵓⵙⴰⵢⴰⵕ']],
        chips: ['ⴰⵙⴰⵢⴰⵕ ⴷ ⵉⵙⵉⴽⵍⵏ', 'ⵜⵉⵎⵅⵉⵎⵉⵏ ⵏ ⵓⵙⴳⵓⵔⵉ', 'ⵄⵓⵎⵔⴰ', 'ⴰⵃⴰⵊⵊ', 'ⵜⵉⵎⵖⵔⵉⵡⵉⵏ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ'],
        overview: 'ⵜⴰⵙⴳⴰ ⴰⴷ ⵜⵙⵎⵓⵏ ⵜⵉⵔⵎⴰⴷ ⵏ ⵜⴷⵍⵙⴰ, ⴰⵙⴰⵢⴰⵕ, ⵉⵙⵉⴽⵍⵏ ⴷ ⵜⵉⵔⵎⵉⵜ ⵏ ⵜⵉⵔⵔⵓⴳⵣⴰ.',
        highlights: ['ⵉⵙⵉⴽⵍⵏ ⵉⵙⵎⵓⵜⵜⴳⵏ ⴷ ⵜⵉⵔⵎⴰⴷ ⵏ ⵓⵙⴰⵢⴰⵕ.', 'ⵜⵉⵎⵅⵉⵎⵉⵏ ⵏ ⵓⵙⴳⵓⵔⵉ ⵉ ⵉⴼⵔⵅⴰⵏ.', 'ⵄⵓⵎⵔⴰ ⴷ ⴰⵃⴰⵊⵊ ⵙ ⵓⵙⴷⵓ.', 'ⵉⵣⴷⴰⵢⵏ ⵉ ⵓⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⴰⵢⴰⵕ.'],
        features: [['ⴰⵙⴰⵢⴰⵕ ⴷ ⵉⵙⵉⴽⵍⵏ', 'ⵜⵉⵔⵎⴰⴷ, ⵉⵙⵉⴽⵍⵏ ⴷ ⵓⵙⵙⵏ.'], ['ⵜⵉⵎⵅⵉⵎⵉⵏ ⵏ ⵓⵙⴳⵓⵔⵉ', 'ⵜⵉⵏⴼⴰⵙ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.'], ['ⵄⵓⵎⵔⴰ', 'ⵜⵉⵏⴼⴰⵙ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ ⵙ ⵓⵙⴷⵓ.'], ['ⴰⵃⴰⵊⵊ', 'ⵉⵙⴰⵍⵏ ⴷ ⵓⵙⵏⵎⵍ ⵉ ⵉⵙⵜⴼⴰⴷⴰⵏ.'], ['ⵜⵉⵎⵖⵔⵉⵡⵉⵏ', 'ⵜⵉⵔⵎⵉⵜ ⵏ ⵜⵉⵔⵔⵓⴳⵣⴰ ⴷ ⵜⵉⵎⵓⵏⵉ.'], ['ⵉⵣⴷⴰⵢⵏ', 'ⵜⵉⵏⴼⴰⵙ ⵙ ⵓⵣⴷⴰⵢ ⵏ ⵓⵎⵙⴰⵡⴰⴹ.']],
        partners: ['ⵉⵙⵉⴽⵍⵏ ⵉⵙⵎⵓⵜⵜⴳⵏ', 'ⵜⵉⵎⵍⵍⵉⵜ ⵏ ⵜⴳⵔⵙⵜ', 'ⵜⵉⵔⵎⴰⴷ', 'ⴰⵙⵡⵉⵔ ⵏ ⵓⵙⴰⵢⴰⵕ', 'ⵉⵎⵣⵍⴰ ⵏ ⵜⴷⵍⵙⴰ'],
        steps: [['ⴰⵙⵏⴰⵎⴰⵍ', 'ⵥⵕ ⵜⵉⵏⴼⴰⵙ ⵉⵍⵍⴰⵏ.'], ['ⵜⵉⵡⵜⵜⴰⵙ', 'ⵥⵕ ⵉⵙⵎⵓⵏⵏ ⴷ ⵉⵎⴰⵍⴰⵙⵏ.'], ['ⴰⵙⵓⴳⵔ', 'ⵙⵎⵓⵜⵜⴳ ⴰⴼⴰⵢⵍⵓ.'], ['ⵜⵉⵔⵎⵉⵜ', 'ⴹⴼⵕ ⵉⵙⴰⵍⵏ ⵉⵎⵙⵍⴽⵎⵏ.']]
      }
    },
    formation: {
      ar: {
        title: 'دعم التمدرس والتكوين',
        meta: 'النجاح الدراسي ومواكبة الأسر',
        summary: 'آليات لدعم أبناء المنخرطين في مسارهم الدراسي وتشجيع التفوق.',
        stats: [['المواكبة', 'الدراسية والأسرية'], ['المنح', 'منح التميز والمنح الاجتماعية'], ['الدخول المدرسي', 'منح واتفاقيات تربوية']],
        chips: ['المواكبة الدراسية والأسرية', 'منح التميز والمنح الاجتماعية', 'منح الدخول المدرسي', 'الاتفاقيات التربوية'],
        overview: 'تواكب هذه الخانة الأسر في مراحل الدراسة والتوجيه والتكوين.',
        highlights: ['مواكبة دراسية وأسرية.', 'منح التميز والمنح الاجتماعية.', 'منح الدخول المدرسي.', 'اتفاقيات مع مؤسسات وشركاء تربويين.'],
        features: [['المواكبة الدراسية والأسرية', 'ورشات ومواكبة لتوجيه الأطفال ومساندة الآباء.'], ['منح التميز والمنح الاجتماعية', 'تثمين المسارات الدراسية المتميزة ودعم اجتماعي للأسر المؤهلة.'], ['منح الدخول المدرسي', 'دعم للأسر عند بداية السنة الدراسية.'], ['الاتفاقيات التربوية', 'ولوج إلى شركاء تربويين حسب الاتفاقيات المعتمدة.']],
        partners: ['الدخول المدرسي', 'التحضير للمدارس العليا', 'المواكبة الأسرية', 'المواكبة', 'المنح'],
        steps: [['الإعلان', 'تتبع برنامج كل عملية.'], ['الشروط', 'التحقق من الأهلية والوثائق.'], ['الإيداع', 'إرسال الملف كاملا.'], ['التتبع', 'الاطلاع على النتائج أو التوجيهات.']]
      },
      zgh: {
        title: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵓⵙⵍⵎⴷ ⴷ ⵓⵙⴼⵔⴽ',
        meta: 'ⴰⵙⵍⵎⴷ ⴷ ⵓⵎⵓⴷⴷⵓ ⵏ ⵜⵡⴰⵛⵓⵍⵜ',
        summary: 'ⵜⵉⵏⴼⴰⵙ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵓⴱⵔⵉⴷ ⵏ ⵓⵙⵍⵎⴷ.',
        stats: [['ⴰⵙⴷⵓ', 'ⴰⵙⵍⵎⴷ ⴷ ⵜⵡⴰⵛⵓⵍⵜ'], ['ⵜⵉⵏⴱⴰⴹⵉⵏ', 'ⵜⵉⵏⴱⴰⴹⵉⵏ ⵏ ⵓⴼⵓⵍⴽⵉ'], ['ⴰⵙⴳⴳⵯⴰⵙ', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⴷⴰⵡ']],
        chips: ['ⴰⵙⴷⵓ ⴰⵙⵍⵎⴷⴰⵏ ⴷ ⵓⵙⴷⵓ ⵏ ⵜⵡⴰⵛⵓⵍⵜ', 'ⵜⵉⵏⴱⴰⴹⵉⵏ ⵏ ⵓⴼⵓⵍⴽⵉ ⴷ ⵜⵉⵏⴱⴰⴹⵉⵏ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⵍⵎⴷ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⵉⵙⵍⵎⴷⴰⵏⵏ'],
        overview: 'ⵜⴰⵙⴳⴰ ⴰⴷ ⵜⵙⵙⴷⵓ ⵜⵉⵡⴰⵛⵓⵍⵉⵏ ⴳ ⵓⵙⵍⵎⴷ, ⴰⵙⵏⵎⵍ ⴷ ⵓⵙⴼⵔⴽ.',
        highlights: ['ⴰⵙⴷⵓ ⴰⵙⵍⵎⴷⴰⵏ ⴷ ⵓⵙⴷⵓ ⵏ ⵜⵡⴰⵛⵓⵍⵜ.', 'ⵜⵉⵏⴱⴰⴹⵉⵏ ⵏ ⵓⴼⵓⵍⴽⵉ.', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⵍⵎⴷ.', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵎⵙⵙⵓⵔⴰ ⵉⵙⵍⵎⴷⴰⵏⵏ.'],
        features: [['ⴰⵙⴷⵓ ⴰⵙⵍⵎⴷⴰⵏ', 'ⵜⵉⵔⵎⴰⴷ ⴷ ⵓⵙⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⴷ ⵉⵎⴰⵔⴰⵡⵏ.'], ['ⵜⵉⵏⴱⴰⴹⵉⵏ', 'ⴰⵙⵙⵏⵖⵎⵙ ⵏ ⵓⴼⵓⵍⴽⵉ ⴷ ⵓⵎⵓⴷⴷⵓ ⴰⵏⴰⵎⵓⵏ.'], ['ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⴽⵛⵛⵓⵎ', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵜⵡⴰⵛⵓⵍⵉⵏ ⴳ ⵓⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⵍⵎⴷ.'], ['ⵉⵎⵙⴰⵡⴰⴹⵏ ⵉⵙⵍⵎⴷⴰⵏⵏ', 'ⴰⴽⵛⵛⵓⵎ ⵖⵔ ⵉⵣⴷⴰⵢⵏ ⵙ ⵓⵎⵙⴰⵡⴰⴹ.']],
        partners: ['ⴰⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⵍⵎⴷ', 'ⴰⵙⵎⵓⵜⵜⴳ ⵉ ⵉⵎⵎⴰⵙⵏ ⵉⵏⵎⴰⵍⴰⵏ', 'ⴰⵙⴷⵓ ⵏ ⵜⵡⴰⵛⵓⵍⵜ', 'ⴰⵙⴷⵓ', 'ⵜⵉⵏⴱⴰⴹⵉⵏ'],
        steps: [['ⴰⵙⵏⴰⵎ', 'ⴹⴼⵕ ⵉⵎⴰⵍⴰⵙⵏ ⵏ ⴽⵓ ⵜⴰⵏⴼⵓⵙⵜ.'], ['ⵜⵉⵡⵜⵜⴰⵙ', 'ⵥⵕ ⴰⵙⵜⴼⴰⴷⴰ ⴷ ⵜⵉⴽⴰⵔⴹⵉⵡⵉⵏ.'], ['ⴰⵙⴽⵏ', 'ⵙⴽⵏ ⴰⴼⴰⵢⵍⵓ ⴰⵎⴷⵢⴰⵏ.'], ['ⴰⴹⴼⴰⵕ', 'ⵥⵕ ⵜⵉⵎⴰⴹⴰⵍ ⵏⵖ ⵉⵙⴷⵓⵜⵏ.']]
      }
    },
    logement: {
      ar: {
        title: 'الولوج إلى السكن',
        meta: 'السكن والبنوك والمشاريع العقارية',
        summary: 'مواكبة لتيسير الولوج إلى السكن عبر الدعم السكني والعروض البنكية التفضيلية والشراكات العقارية.',
        stats: [['9', 'عروض عقارية محصاة'], ['76 سنة', 'سن مرجعي لبعض عروض التمويل'], ['البنوك', 'قروض سكنية تفضيلية']],
        chips: ['دعم السكن', 'عروض بنكية بنسب قروض تفضيلية', 'المنعشون العقاريون', 'إحداث مشاريع السكن من طرف FOS-Agri'],
        overview: 'تجمع هذه الخانة عروض التمويل العقاري والاتفاقيات البنكية المرتبطة بالسكن مع شركاء معتمدين ومعلومات قابلة للتحيين.',
        highlights: ['دعم السكن ومواكبة المنخرطين.', 'عروض بنكية بنسب قروض تفضيلية.', 'منعشون عقاريون ومشاريع سكنية من طرف المؤسسة.', 'تتبع عروض البنوك والشركاء العقاريين.'],
        features: [['دعم السكن', 'توجيه المنخرطين نحو الآليات والشركاء المتاحين.'], ['العروض البنكية التفضيلية', 'قروض عقارية بشروط متفاوض عليها مع البنوك الشريكة.'], ['المنعشون العقاريون', 'ربط المنخرطين بالعروض العقارية المعتمدة.'], ['مشاريع السكن FOS-Agri', 'تتبع مشاريع السكن التي تضعها المؤسسة.']],
        partners: ['البنك الشعبي', 'البريد بنك', 'وفا إيموبيلييه', 'BMCI', 'Crédit du Maroc', 'CFG Bank', 'القرض الفلاحي للمغرب', 'Attijari Wafa Bank', 'Bank Assafa'],
        steps: [['الحاجة', 'تحديد نوع السكن أو التمويل.'], ['العرض', 'مقارنة الشركاء والشروط.'], ['الملف', 'تحضير الوثائق البنكية والإدارية.'], ['التتبع', 'تأكيد العرض النشط لدى المؤسسة.']]
      },
      zgh: {
        title: 'ⴰⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⵖⵉⵎ',
        meta: 'ⴰⵙⵖⵉⵎ, ⵜⴱⴰⵏⴽⵉⵡⵉⵏ ⴷ ⵉⵙⵏⴼⴰⵔⵏ',
        summary: 'ⴰⵙⴷⵓ ⵉ ⵓⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⵖⵉⵎ ⵙ ⵓⵎⵓⴷⴷⵓ, ⵉⵣⴷⴰⵢⵏ ⵏ ⵜⴱⴰⵏⴽⵉⵡⵉⵏ ⴷ ⵉⵙⵏⴼⴰⵔⵏ.',
        stats: [['9', 'ⵜⵉⵏⴼⴰⵙ ⵏ ⵓⵙⵖⵉⵎ'], ['76', 'ⴰⵡⵜⴰⵢ ⵏ ⵓⵙⵔⴹ'], ['ⵜⴱⴰⵏⴽⵉⵡⵉⵏ', 'ⵉⵙⵔⴹⴰⵏ ⵏ ⵓⵙⵖⵉⵎ']],
        chips: ['ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵖⵉⵎ', 'ⵜⵉⵏⴼⴰⵙ ⵏ ⵜⴱⴰⵏⴽⵉⵡⵉⵏ', 'ⵉⵎⵙⵙⵓⵔⴰ ⵏ ⵓⵙⵖⵉⵎ', 'ⵉⵙⵏⴼⴰⵔⵏ ⵏ ⵓⵙⵖⵉⵎ ⵙ FOS-Agri'],
        overview: 'ⵜⴰⵙⴳⴰ ⴰⴷ ⵜⵙⵎⵓⵏ ⵜⵉⵏⴼⴰⵙ ⵏ ⵓⵙⵔⴹ ⵏ ⵓⵙⵖⵉⵎ ⴷ ⵉⵎⵙⴰⵡⴰⴹⵏ ⵏ ⵜⴱⴰⵏⴽⵉⵡⵉⵏ.',
        highlights: ['ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵖⵉⵎ ⴷ ⵓⵙⴷⵓ.', 'ⵜⵉⵏⴼⴰⵙ ⵏ ⵜⴱⴰⵏⴽⵉⵡⵉⵏ ⵙ ⵉⵙⵔⴹⴰⵏ ⵉⵎⵥⵍⴰⵢⵏ.', 'ⵉⵎⵙⵙⵓⵔⴰ ⵏ ⵓⵙⵖⵉⵎ ⴷ ⵉⵙⵏⴼⴰⵔⵏ.', 'ⴰⴹⴼⴰⵕ ⵏ ⵉⵣⴷⴰⵢⵏ ⴷ ⵉⵎⵙⵙⵓⵔⴰ.'],
        features: [['ⴰⵎⵓⴷⴷⵓ ⵏ ⵓⵙⵖⵉⵎ', 'ⴰⵙⵏⵎⵍ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⵖⵔ ⵉⵣⴷⴰⵢⵏ.'], ['ⵜⵉⵏⴼⴰⵙ ⵏ ⵜⴱⴰⵏⴽⵉⵡⵉⵏ', 'ⵉⵙⵔⴹⴰⵏ ⵏ ⵓⵙⵖⵉⵎ ⵙ ⵉⵙⵎⵓⵏⵏ ⵉⵎⵥⵍⴰⵢⵏ.'], ['ⵉⵎⵙⵙⵓⵔⴰ ⵏ ⵓⵙⵖⵉⵎ', 'ⴰⵣⴷⴰⵢ ⴷ ⵜⵉⵏⴼⴰⵙ ⵜⵉⵎⵙⴰⴷⴰⴳⵉⵏ.'], ['ⵉⵙⵏⴼⴰⵔⵏ FOS-Agri', 'ⴰⴹⴼⴰⵕ ⵏ ⵉⵙⵏⴼⴰⵔⵏ ⵏ ⵓⵙⵖⵉⵎ.']],
        partners: ['Banque Populaire', 'Al Barid Bank', 'Wafa Immobilier', 'BMCI', 'Crédit du Maroc', 'CFG Bank', 'Crédit Agricole du Maroc', 'Attijari Wafa Bank', 'Bank Assafa'],
        steps: [['ⴰⵙⵔⵓⵜ', 'ⵙⵙⵏ ⴰⵏⴰⵡ ⵏ ⵓⵙⵖⵉⵎ ⵏⵖ ⵓⵙⵔⴹ.'], ['ⵜⴰⵏⴼⵓⵙⵜ', 'ⵙⵏⵎⵍ ⵉⵣⴷⴰⵢⵏ ⴷ ⵜⵉⵡⵜⵜⴰⵙ.'], ['ⴰⴼⴰⵢⵍⵓ', 'ⵙⵎⵓⵜⵜⴳ ⵜⵉⴽⴰⵔⴹⵉⵡⵉⵏ.'], ['ⴰⴹⴼⴰⵕ', 'ⵙⵙⵏ ⵜⴰⵏⴼⵓⵙⵜ ⵉⵍⵍⴰⵏ.']]
      }
    },
    projets: {
      ar: {
        title: 'دعم المشاريع الشخصية',
        meta: 'قروض اجتماعية وشراكات تفضيلية',
        summary: 'اتفاقيات مالية وشراكات لدعم المشاريع الشخصية للمنخرطين بشروط تفضيلية.',
        stats: [['قروض', 'اجتماعية واستهلاكية'], ['مؤسسات', 'مالية شريكة'], ['تعريفات', 'تفضيلية ومدعمة']],
        chips: ['القروض الاجتماعية', 'اتفاقيات مع المؤسسات المالية', 'شراكات مدعمة', 'شراكات بتعريفات تفضيلية'],
        overview: 'تجمع هذه الخانة حلول الدعم المالي والاتفاقيات مع المؤسسات والعروض الشريكة لتيسير المشاريع الشخصية.',
        highlights: ['قروض اجتماعية وعروض استهلاكية.', 'اتفاقيات مع المؤسسات المالية.', 'شراكات مدعمة.', 'شراكات بتعريفات تفضيلية.'],
        features: [['القروض الاجتماعية', 'حلول تمويل موجهة للحاجيات الشخصية للمنخرطين.'], ['اتفاقيات مع المؤسسات المالية', 'اتفاقيات مع بنوك وهيئات شريكة.'], ['شراكات مدعمة', 'عروض مدعمة لتقليص كلفة الولوج.'], ['شراكات بتعريفات تفضيلية', 'شروط متفاوض عليها لفائدة المنخرطين.']],
        partners: ['Attijari Wafa Bank', 'Banque Populaire', 'CFG Bank', 'Crédit du Maroc', 'Eqdom', 'Salafin', 'Wafa Salaf'],
        steps: [['المشروع', 'تحديد طبيعة الحاجة الشخصية.'], ['الشريك', 'اختيار المؤسسة أو الاتفاقية المناسبة.'], ['الشروط', 'التحقق من النسب والآجال والوثائق المطلوبة.'], ['الإيداع', 'إتمام الطلب لدى الشريك.']]
      },
      zgh: {
        title: 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵎⵙⴰⵍⵏ ⵉⵎⴰⵏⴰⵏ',
        meta: 'ⵉⵙⵔⴹⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ ⴷ ⵉⵣⴷⴰⵢⵏ',
        summary: 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⵉⵎⴰⵍⵉⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⵎⵙⴰⵍⵏ ⵉⵎⴰⵏⴰⵏ.',
        stats: [['ⵉⵙⵔⴹⴰⵏ', 'ⵉⵏⴰⵎⵓⵏⵏ'], ['ⵜⵉⵙⴷⴰⵡⵉⵢⵉⵏ', 'ⵜⵉⵎⴰⵍⵉⵏ'], ['ⵜⵉⵏⴼⴰⵙ', 'ⵙ ⵜⵉⵡⵜⵜⴰⵙ ⵜⵉⵎⵥⵍⴰⵢⵉⵏ']],
        chips: ['ⵉⵙⵔⴹⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⵉⵙⴷⴰⵡⵉⵢⵉⵏ ⵜⵉⵎⴰⵍⵉⵏ', 'ⵉⵣⴷⴰⵢⵏ ⵉⵜⵜⵓⵎⴷⴷⵓⵏ', 'ⵉⵣⴷⴰⵢⵏ ⵙ ⵜⵉⵡⵜⵜⴰⵙ ⵜⵉⵎⵥⵍⴰⵢⵉⵏ'],
        overview: 'ⵜⴰⵙⴳⴰ ⴰⴷ ⵜⵙⵎⵓⵏ ⵉⵙⵔⴹⴰⵏ, ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⵉⵏⴼⴰⵙ ⵏ ⵉⵣⴷⴰⵢⵏ ⵉ ⵉⵎⵙⴰⵍⵏ ⵉⵎⴰⵏⴰⵏ.',
        highlights: ['ⵉⵙⵔⴹⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ.', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⵉⵙⴷⴰⵡⵉⵢⵉⵏ ⵜⵉⵎⴰⵍⵉⵏ.', 'ⵉⵣⴷⴰⵢⵏ ⵉⵜⵜⵓⵎⴷⴷⵓⵏ.', 'ⵉⵣⴷⴰⵢⵏ ⵙ ⵜⵉⵡⵜⵜⴰⵙ ⵜⵉⵎⵥⵍⴰⵢⵉⵏ.'],
        features: [['ⵉⵙⵔⴹⴰⵏ ⵉⵏⴰⵎⵓⵏⵏ', 'ⵉⵙⵔⴹⴰⵏ ⵉ ⵓⵙⵔⵓⵜ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.'], ['ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⵉⵙⴷⴰⵡⵉⵢⵉⵏ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵜⴱⴰⵏⴽⵉⵡⵉⵏ ⴷ ⵉⵎⵙⵙⵓⵔⴰ.'], ['ⵉⵣⴷⴰⵢⵏ ⵉⵜⵜⵓⵎⴷⴷⵓⵏ', 'ⵜⵉⵏⴼⴰⵙ ⵉ ⵓⵙⵙⵉⴷⴼ ⵏ ⵜⴽⵍⴼⵜ.'], ['ⵉⵣⴷⴰⵢⵏ ⵙ ⵜⵉⵡⵜⵜⴰⵙ', 'ⵉⵙⵎⵓⵏⵏ ⵉⵎⵥⵍⴰⵢⵏ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ.']],
        partners: ['Attijari Wafa Bank', 'Banque Populaire', 'CFG Bank', 'Crédit du Maroc', 'Eqdom', 'Salafin', 'Wafa Salaf'],
        steps: [['ⴰⵙⵏⴼⴰⵔ', 'ⵙⵙⵏ ⴰⵏⴰⵡ ⵏ ⵓⵙⵔⵓⵜ.'], ['ⴰⵣⴷⴰⵢ', 'ⴼⵔⵏ ⵜⴰⵙⴷⴰⵡⵉⵜ ⵏⵖ ⴰⵎⵙⴰⵡⴰⴹ.'], ['ⵜⵉⵡⵜⵜⴰⵙ', 'ⵥⵕ ⵉⵙⵎⵓⵏⵏ ⴷ ⵜⵉⴽⴰⵔⴹⵉⵡⵉⵏ.'], ['ⴰⵙⴽⵏ', 'ⵙⵎⵎⴷ ⵜⵓⵜⵜⵔⴰ ⵖⵔ ⵓⵣⴷⴰⵢ.']]
      }
    }
  };

  function cloneFallbacks() {
    ['culture', 'formation', 'logement', 'projets'].forEach((key) => {
      services[key].ar = services[key].ar || translateCompact(services[key].fr, 'ar', key);
      services[key].zgh = services[key].zgh || translateCompact(services[key].fr, 'zgh', key);
    });
  }

  function applyControlledTranslations() {
    Object.entries(controlledTranslations).forEach(([key, translations]) => {
      Object.entries(translations).forEach(([target, value]) => {
        services[key][target] = {
          ...services[key].fr,
          ...(services[key][target] || {}),
          ...value
        };
      });
    });
  }

  function translateCompact(fr, target, key) {
    const titles = {
      ar: {
        culture: ['الثقافة والترفيه والأسفار', 'الراحة والمشاركة والاكتشاف'],
        formation: ['دعم التمدرس والتكوين', 'النجاح الدراسي ومواكبة الأسر'],
        logement: ['الولوج إلى السكن', 'السكن والبنوك والمشاريع العقارية'],
        projets: ['دعم المشاريع الشخصية', 'قروض اجتماعية وشراكات تفضيلية']
      },
      zgh: {
        culture: ['ⵜⴰⴷⵍⵙⴰ, ⴰⵙⴰⵢⴰⵕ ⴷ ⵉⵙⵉⴽⵍ', 'ⴰⵙⴰⵢⴰⵕ ⴷ ⵜⵉⵔⵎⵉⵜ'],
        formation: ['ⴰⵎⵓⴷⴷⵓ ⵉ ⵓⵙⵍⵎⴷ ⴷ ⵓⵙⴼⵔⴽ', 'ⴰⵙⵍⵎⴷ ⴷ ⵓⵎⵓⴷⴷⵓ'],
        logement: ['ⴰⴽⵛⵛⵓⵎ ⵖⵔ ⵓⵙⵖⵉⵎ', 'ⴰⵙⵖⵉⵎ ⴷ ⵜⴱⴰⵏⴽⵉⵡⵉⵏ'],
        projets: ['ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵎⵙⴰⵍⵏ ⵉⵎⴰⵏⴰⵏ', 'ⵉⵙⵔⴹⴰⵏ ⴷ ⵉⵣⴷⴰⵢⵏ']
      }
    };
    const generic = {
      ar: {
        summary: 'خدمات ومواكبة اجتماعية لفائدة المنخرطين وأسرهم، مع عرض الشروط والشركاء والمعلومات العملية.',
        overview: 'تعرض هذه الصفحة الخدمات الفرعية والشركاء والمسار العملي للاستفادة من الخدمة.',
        highlights: ['خدمات منظمة حسب الخانات الرسمية.', 'معلومات عملية للمنخرطين والأسر.', 'شراكات واتفاقيات حسب الملفات المعتمدة.', 'توجيه عبر فرق FOS-Agri والمنسقين.'],
        steps: [['الحاجة', 'تحديد نوع الخدمة المطلوبة.'], ['الشروط', 'الاطلاع على المعايير والوثائق.'], ['الملف', 'إعداد الطلب والوثائق.'], ['التتبع', 'التواصل مع المؤسسة أو الشريك.']]
      },
      zgh: {
        summary: 'ⵜⵉⵏⴼⴰⵙ ⴷ ⵓⵎⵓⴷⴷⵓ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵜ.',
        overview: 'ⵜⴰⵙⵏⴰ ⵜⵙⵙⴽⴰⵏ ⵜⵉⵙⴳⴰⵔ, ⵉⵣⴷⴰⵢⵏ ⴷ ⴰⴱⵔⵉⴷ ⵏ ⵓⵙⵜⴼⴰⴷⴰ.',
        highlights: ['ⵜⵉⵏⴼⴰⵙ ⵙ ⵜⵙⴳⴰⵔ.', 'ⵉⵙⴰⵍⵏ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ.', 'ⵉⵣⴷⴰⵢⵏ ⴷ ⵉⵎⵙⵙⵓⵔⴰ.', 'ⴰⵙⴷⵓ ⵙ FOS-Agri.'],
        steps: [['ⴰⵙⵔⵓⵜ', 'ⵙⵙⵏ ⵎⴰ ⵜⵔⵉⴷ.'], ['ⵜⵉⵡⵜⵜⴰⵙ', 'ⵥⵕ ⵉⵙⵎⵓⵏⵏ.'], ['ⴰⴼⴰⵢⵍⵓ', 'ⵙⵎⵓⵜⵜⴳ ⵜⵉⴽⴰⵔⴹⵉⵡⵉⵏ.'], ['ⴰⵎⵓⴷⴷⵓ', 'ⵎⵢⴰⵡⴰⵍ ⴷ FOS-Agri.']]
      }
    };
    return {
      ...fr,
      title: titles[target][key][0],
      meta: titles[target][key][1],
      summary: generic[target].summary,
      overview: generic[target].overview,
      highlights: generic[target].highlights,
      steps: generic[target].steps
    };
  }

  function t(key) {
    return labels[lang]?.[key] || labels.fr[key] || key;
  }

  function localizedPrevoyanceMenu(targetLang = lang) {
    return prevoyanceMenuItems.map((item) => ({
      id: item.id,
      icon: item.icon,
      label: item.labels[targetLang] || item.labels.fr
    }));
  }

  function serviceText(key) {
    const text = services[key]?.[lang] || services[key]?.fr;
    if (key !== 'prevoyance' || !text) return text;
    const menuItems = localizedPrevoyanceMenu(lang);
    return {
      ...text,
      menuItems,
      chips: menuItems.map((item) => item.label)
    };
  }

  function asset(path) {
    if (path.startsWith('assets/')) return `../${path}`;
    return `${base}${path}`;
  }

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function subrubriqueId(index) {
    return `subrubrique-${index + 1}`;
  }

  function textArray(value) {
    return [].concat(value || []).filter(Boolean);
  }

  function renderParagraphs(value) {
    return textArray(value).map((paragraph) => `<p>${esc(paragraph)}</p>`).join('');
  }

  function renderBulletList(items) {
    if (!items?.length) return '';
    return `<ul>${items.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul>`;
  }

  function renderCenterMedicalSection(item) {
    if (!item.centerMedical) return '';
    const center = item.centerMedical;
    return `
      <section class="section page-section-soft prestation-center-section" id="${subrubriqueId(0)}">
        <div class="container">
          <div class="prestation-section-head">
            <span class="section-tag"><i class="fa-solid fa-house-medical" aria-hidden="true"></i> ${esc(center.badge)}</span>
            <h2>${esc(center.title)}</h2>
            <p>${esc(center.intro)}</p>
          </div>
          <div class="prestation-accordion" data-prestation-accordion>
            ${center.items.map((entry, index) => `
              <article class="prestation-accordion-item" id="${subrubriqueId(Number.isInteger(entry.navIndex) ? entry.navIndex : index + 1)}">
                <button class="prestation-accordion-trigger" type="button" aria-expanded="false">
                  <span class="prestation-accordion-title">
                    <i class="fa-solid ${esc(entry.icon)}" aria-hidden="true"></i>
                    <span>${esc(entry.title)}</span>
                  </span>
                  <i class="fa-solid fa-plus prestation-accordion-toggle" aria-hidden="true"></i>
                </button>
                <div class="prestation-accordion-content" hidden>
                  ${renderParagraphs(entry.body)}
                  ${renderBulletList(entry.bullets)}
                </div>
              </article>`).join('')}
          </div>
        </div>
      </section>`;
  }

  function renderAmcDispositionCard(card, index, detail) {
    const copyId = `amc-disposition-copy-${index}`;
    return `
      <article class="prestation-amc-card" data-amc-info-card data-amc-card-index="${index}">
        <div class="prestation-amc-card-head">
          <span class="prestation-amc-card-icon"><i class="fa-solid ${esc(card.icon || 'fa-shield-heart')}" aria-hidden="true"></i></span>
          <h3>${esc(card.title)}</h3>
        </div>
        <div class="prestation-amc-card-copy" id="${copyId}">
          ${renderParagraphs(card.body)}
          ${renderBulletList(card.bullets)}
        </div>
        <button class="prestation-amc-card-toggle" type="button" data-amc-card-toggle aria-expanded="false" aria-controls="${copyId}" aria-label="${esc(detail.expandLabel)} : ${esc(card.title)}">
          <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>
      </article>`;
  }

  function renderAmcGuarantee(guarantee, index, detail) {
    return `
      <article class="prestation-amc-guarantee ${index === 0 ? 'is-open' : ''}">
        <button class="prestation-amc-guarantee-trigger" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
          <span>
            <small>${String(index + 1).padStart(2, '0')}</small>
            <strong>${esc(guarantee.title)}</strong>
          </span>
          <i class="fa-solid ${index === 0 ? 'fa-minus' : 'fa-plus'}" aria-hidden="true"></i>
        </button>
        <div class="prestation-amc-guarantee-content" ${index === 0 ? '' : 'hidden'}>
          <div class="prestation-amc-guarantee-grid">
            <div>
              <span class="prestation-amc-label">${esc(detail.assuredLabel)}</span>
              <p>${esc(guarantee.assured)}</p>
            </div>
            <div>
              <span class="prestation-amc-label">${esc(detail.benefitsLabel)}</span>
              ${renderBulletList(guarantee.benefits)}
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderAmcCaseCard(entry) {
    const [icon, title, body] = entry;
    return `
      <article class="prestation-amc-case-card">
        <span><i class="fa-solid ${esc(icon)}" aria-hidden="true"></i></span>
        <h4>${esc(title)}</h4>
        <p>${esc(body)}</p>
      </article>`;
  }

  function renderAmcOption(option, index, detail) {
    return `
      <section class="prestation-amc-option-panel" data-amc-option-panel="${index}" ${index === 0 ? '' : 'hidden'}>
        <div class="prestation-amc-option-head">
          <span>${esc(option.title)}</span>
          <p>${esc(option.kicker)}</p>
        </div>
        <div class="prestation-amc-guarantee-list" data-amc-guarantees>
          ${option.guarantees.map((guarantee, guaranteeIndex) => renderAmcGuarantee(guarantee, guaranteeIndex, detail)).join('')}
        </div>
        <div class="prestation-amc-cases">
          <div class="prestation-amc-subhead">
            <span class="section-tag"><i class="fa-solid fa-notes-medical" aria-hidden="true"></i> ${esc(detail.casesTitle)} — ${esc(option.title)}</span>
          </div>
          <div class="prestation-amc-case-grid">
            ${option.cases.map(renderAmcCaseCard).join('')}
          </div>
        </div>
      </section>`;
  }

  function renderAmcDetailSection(item) {
    const detail = item.amcDetail;
    if (!detail) return '';
    return `
      <section class="section page-section-soft prestation-amc-section" id="assurance-maladie-complementaire" data-prestation-amc-panel hidden>
        <div class="container">
          <div class="prestation-amc-hero">
            <span class="section-tag"><i class="fa-solid fa-shield-heart" aria-hidden="true"></i> AMC</span>
            <h2>${esc(detail.title)}</h2>
            <p>${esc(detail.subtitle)}</p>
          </div>

          <div class="prestation-amc-block">
            <div class="prestation-amc-block-head">
              <span class="section-tag"><i class="fa-solid fa-file-contract" aria-hidden="true"></i> ${esc(detail.dispositionsTitle)}</span>
            </div>
            <div class="prestation-amc-card-grid" data-amc-card-carousel>
              ${detail.dispositions.map((card, index) => renderAmcDispositionCard(card, index, detail)).join('')}
            </div>
            <div class="prestation-amc-card-dots" aria-label="${esc(detail.paginationLabel)}">
              ${detail.dispositions.map((card, index) => `
                <button class="${index === 0 ? 'is-active' : ''}" type="button" data-amc-card-dot="${index}" aria-label="${esc(card.title)}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('')}
            </div>
          </div>

          <div class="prestation-amc-block">
            <div class="prestation-amc-block-head is-split">
              <div>
                <span class="section-tag"><i class="fa-solid fa-list-check" aria-hidden="true"></i> ${esc(detail.prestationsTitle)}</span>
                <h3>${esc(detail.title)}</h3>
              </div>
              <div class="prestation-amc-option-tabs" role="tablist" aria-label="${esc(detail.prestationsTitle)}">
                ${detail.options.map((option, index) => `
                  <button class="${index === 0 ? 'is-active' : ''}" type="button" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}" data-amc-option="${index}">
                    ${esc(option.title)}
                  </button>`).join('')}
              </div>
            </div>
            <div class="prestation-amc-options">
              ${detail.options.map((option, index) => renderAmcOption(option, index, detail)).join('')}
            </div>
          </div>

          <aside class="prestation-amc-note">
            <span><i class="fa-solid fa-circle-info" aria-hidden="true"></i></span>
            <div>
              <h3>${esc(detail.noteTitle)}</h3>
              <p>${esc(detail.note)}</p>
            </div>
          </aside>
        </div>
      </section>`;
  }

  function renderAmtsService(entry, index) {
    const [title, content] = entry;
    const isOpen = index === 0;
    return `
      <article class="prestation-accordion-item prestation-amts-service ${isOpen ? 'is-open' : ''}">
        <button class="prestation-accordion-trigger" type="button" aria-expanded="${isOpen ? 'true' : 'false'}">
          <span class="prestation-accordion-title">
            <i class="fa-solid fa-circle-plus" aria-hidden="true"></i>
            <span>${esc(title)}</span>
          </span>
          <i class="fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} prestation-accordion-toggle" aria-hidden="true"></i>
        </button>
        <div class="prestation-accordion-content" ${isOpen ? '' : 'hidden'}>
          ${Array.isArray(content) ? renderBulletList(content) : renderParagraphs(content)}
        </div>
      </article>`;
  }

  function renderAmtsDetailSection(item) {
    const detail = item.amtsDetail;
    if (!detail) return '';
    return `
      <section class="section page-section-soft prestation-amts-section" id="assistance-medicale-transport-sanitaire" data-prestation-amts-panel hidden>
        <div class="container">
          <div class="prestation-amc-hero prestation-amts-hero">
            <span class="section-tag"><i class="fa-solid fa-truck-medical" aria-hidden="true"></i> ${esc(detail.badge)}</span>
            <h2>${esc(detail.title)}</h2>
            ${renderParagraphs(detail.subtitle)}
          </div>

          <div class="prestation-amts-beneficiaries">
            <div class="prestation-amc-block-head">
              <span class="section-tag"><i class="fa-solid fa-people-roof" aria-hidden="true"></i> ${esc(detail.beneficiariesTitle)}</span>
            </div>
            <div class="prestation-amts-beneficiary-grid">
              ${detail.beneficiaries.map(([number, text]) => `
                <article class="prestation-amts-beneficiary-card">
                  <strong>${esc(number)}</strong>
                  <p>${esc(text)}</p>
                </article>`).join('')}
            </div>
          </div>

          <div class="prestation-amc-block">
            <div class="prestation-amc-block-head">
              <span class="section-tag"><i class="fa-solid fa-list-check" aria-hidden="true"></i> ${esc(detail.prestationsTitle)}</span>
            </div>
            <div class="prestation-amts-group-list">
              ${detail.groups.map((group) => `
                <article class="prestation-amts-group">
                  <div class="prestation-amts-group-head">
                    <span><i class="fa-solid ${esc(group.icon)}" aria-hidden="true"></i></span>
                    <h3>${esc(group.title)}</h3>
                  </div>
                  <div class="prestation-accordion prestation-amts-accordion" data-prestation-accordion>
                    ${group.services.map(renderAmtsService).join('')}
                  </div>
                </article>`).join('')}
            </div>
          </div>

          <div class="prestation-amc-block">
            <div class="prestation-amc-block-head">
              <span class="section-tag"><i class="fa-solid fa-file-signature" aria-hidden="true"></i> ${esc(detail.funeralTitle)}</span>
            </div>
            <div class="prestation-amts-funeral-grid">
              ${detail.funeralCards.map(([title, bullets]) => `
                <article class="prestation-amts-funeral-card">
                  <h3>${esc(title)}</h3>
                  ${renderBulletList(bullets)}
                </article>`).join('')}
            </div>
          </div>

          <aside class="prestation-amts-contact">
            <span><i class="fa-solid fa-headset" aria-hidden="true"></i></span>
            <div>
              <h3>${esc(detail.contactTitle)}</h3>
              <p>${esc(detail.contactIntro)}</p>
              <p>${esc(detail.contactInstruction)}</p>
              <a href="tel:+212529075100">${esc(detail.phone)}</a>
            </div>
          </aside>
        </div>
      </section>`;
  }

  function renderExtraKeyRows(rows) {
    if (!rows?.length) return '';
    return `
      <dl class="prestation-extra-keyrows">
        ${rows.map(([label, value]) => `
          <div>
            <dt>${esc(label)}</dt>
            <dd>${esc(value || '—')}</dd>
          </div>`).join('')}
      </dl>`;
  }

  function renderExtraMiniCards(items) {
    if (!items?.length) return '';
    return `
      <div class="prestation-extra-mini-grid">
        ${items.map((item) => `
          <article class="prestation-extra-mini-card">
            <span>${esc(item.number || '')}</span>
            <p>${esc(item.text || item)}</p>
          </article>`).join('')}
      </div>`;
  }

  function renderExtraAccordionItem(entry, index) {
    const isOpen = index === 0;
    return `
      <article class="prestation-accordion-item prestation-extra-accordion-item ${isOpen ? 'is-open' : ''}">
        <button class="prestation-accordion-trigger" type="button" aria-expanded="${isOpen ? 'true' : 'false'}">
          <span class="prestation-accordion-title">
            <i class="fa-solid ${esc(entry.icon || 'fa-circle-info')}" aria-hidden="true"></i>
            <span>${esc(entry.title)}</span>
          </span>
          <i class="fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} prestation-accordion-toggle" aria-hidden="true"></i>
        </button>
        <div class="prestation-accordion-content" ${isOpen ? '' : 'hidden'}>
          ${renderParagraphs(entry.body)}
          ${renderBulletList(entry.bullets)}
          ${renderExtraKeyRows(entry.rows)}
        </div>
      </article>`;
  }

  function renderExtraSectionBlock(block) {
    if (!block) return '';
    const entries = block.items || [];
    return `
      <div class="prestation-extra-block">
        <div class="prestation-amc-block-head">
          <span class="section-tag"><i class="fa-solid ${esc(block.icon || 'fa-list-check')}" aria-hidden="true"></i> ${esc(block.title)}</span>
          ${block.intro ? `<p>${esc(block.intro)}</p>` : ''}
        </div>
        ${block.mode === 'cards' ? `
          <div class="prestation-extra-contribution-grid">
            ${entries.map((entry) => `
              <article class="prestation-extra-contribution-card">
                <strong>${esc(entry.amount || entry.title)}</strong>
                <span>${esc(entry.label || entry.text || '')}</span>
              </article>`).join('')}
          </div>` : `
          <div class="prestation-accordion prestation-extra-accordion" data-prestation-accordion>
            ${entries.map(renderExtraAccordionItem).join('')}
          </div>`}
      </div>`;
  }

  const medicalRegionMeta = [
    { id: 'tanger-tetouan-al-hoceima', source: 'RÉGION DE TANGER -TÉTOUAN -AL HOCEIMA', x: 56, y: 14, target: { x: 455, y: 70 }, labels: { fr: 'Tanger - Tétouan - Al Hoceima', ar: 'طنجة - تطوان - الحسيمة', zgh: 'ⵟⵏⵊⴰ - ⵜⵉⵟⵟⴰⵡⵉⵏ - ⵍⵃⵓⵙⵉⵎⴰ' } },
    { id: 'oriental', source: "RÉGION DE L'ORIENTAL", x: 72, y: 22, target: { x: 585, y: 175 }, labels: { fr: "L'Oriental", ar: 'الشرق', zgh: 'ⵓⵛⵛⵔⵇ' } },
    { id: 'rabat-sale-kenitra', source: 'RÉGION DE RABAT SALÉ KÉNITRA', x: 54, y: 27, target: { x: 388, y: 118 }, labels: { fr: 'Rabat - Salé - Kénitra', ar: 'الرباط - سلا - القنيطرة', zgh: 'ⵕⴱⴰⵟ - ⵙⵍⴰ - ⵇⵏⵉⵟⵔⴰ' } },
    { id: 'fes-meknes', source: 'RÉGION DE FÈS -MEKNÈS', x: 62, y: 34, target: { x: 505, y: 165 }, labels: { fr: 'Fès - Meknès', ar: 'فاس - مكناس', zgh: 'ⴼⴰⵙ - ⵎⴽⵏⴰⵙ' } },
    { id: 'casablanca-settat', source: 'RÉGION DE CASABLANCA -SETTAT', x: 49, y: 39, target: { x: 350, y: 180 }, labels: { fr: 'Casablanca - Settat', ar: 'الدار البيضاء - سطات', zgh: 'ⴰⵏⴼⴰ - ⵙⵟⴰⵜ' } },
    { id: 'beni-mellal-khenifra', source: 'RÉGION DE BÉNI MELLAL -KHÉNIFRA', x: 57, y: 43, target: { x: 450, y: 250 }, labels: { fr: 'Béni Mellal - Khénifra', ar: 'بني ملال - خنيفرة', zgh: 'ⴱⵏⵉ ⵎⵍⵍⴰⵍ - ⵅⵏⵉⴼⵔⴰ' } },
    { id: 'marrakech-safi', source: 'RÉGION DE MARRAKECH -SAFI', x: 45, y: 50, target: { x: 390, y: 295 }, labels: { fr: 'Marrakech - Safi', ar: 'مراكش - آسفي', zgh: 'ⵎⵕⵕⴰⴽⵛ - ⴰⵙⴼⵉ' } },
    { id: 'draa-tafilalet', source: 'RÉGION DE DRÂA-TAFILALET', x: 57, y: 58, target: { x: 515, y: 305 }, labels: { fr: 'Drâa - Tafilalet', ar: 'درعة - تافيلالت', zgh: 'ⴷⵔⴰⵄⴰ - ⵜⴰⴼⵉⵍⴰⵍⵜ' } },
    { id: 'souss-massa', source: 'RÉGION DE SOUSS -MASSA -AGADIR', x: 38, y: 61, target: { x: 340, y: 360 }, labels: { fr: 'Souss - Massa', ar: 'سوس - ماسة', zgh: 'ⵙⵓⵙ - ⵎⴰⵙⴰ' } },
    { id: 'guelmim-oued-noun', source: 'RÉGION DE GUELMIM -OUED NOUN', x: 34, y: 70, target: { x: 275, y: 430 }, labels: { fr: 'Guelmim - Oued Noun', ar: 'كلميم - واد نون', zgh: 'ⴳⵯⵍⵎⵉⵎ - ⴰⵙⵉⴼ ⵏⵓⵏ' } },
    { id: 'laayoune-sakia-el-hamra', source: 'RÉGION DE LAÂYOUNE -SAKIA EL HAMRA', x: 28, y: 80, target: { x: 220, y: 505 }, labels: { fr: 'Laâyoune - Sakia El Hamra', ar: 'العيون - الساقية الحمراء', zgh: 'ⵍⵄⵢⵓⵏ - ⵙⴰⵇⵢⴰ ⵍⵃⴰⵎⵔⴰ' } },
    { id: 'dakhla-oued-ed-dahab', source: 'RÉGION DE DAKHLA -OUED ED DAHAB', x: 21, y: 90, target: { x: 123.7455, y: 609.5922 }, labels: { fr: 'Dakhla - Oued Eddahab', ar: 'الداخلة - وادي الذهب', zgh: 'ⴷⴰⵅⵍⴰ - ⴰⵙⵉⴼ ⴷⴰⵀⴰⴱ' } }
  ];

  const medicalMapRegionAliases = {
    'laayoune-sakia-el-hamra': 'tanger-tetouan-al-hoceima',
    'oriental': 'oriental',
    'beni-mellal-khenifra': 'draa-tafilalet',
    'marrakech-safi': 'souss-massa',
    'souss-massa': 'guelmim-oued-noun',
    'rabat-sale-kenitra': 'casablanca-settat',
    'casablanca-settat': 'marrakech-safi',
    'guelmim-oued-noun': 'laayoune-sakia-el-hamra',
    'dakhla-oued-ed-dahab': 'dakhla-oued-ed-dahab',
    'tanger-tetouan-al-hoceima': 'rabat-sale-kenitra',
    'draa-tafilalet': 'fes-meknes',
    'fes-meknes': 'beni-mellal-khenifra'
  };

  const medicalCategoryLabels = {
    "LABORATOIRES D’ANALYSES": { ar: 'مختبرات التحاليل', zgh: 'ⵉⵎⵣⵣⴰⵔⵏ ⵏ ⵜⵙⵍⵉⴹⵜ' },
    'CENTRES DE RADIOLOGIE': { ar: 'مراكز الأشعة', zgh: 'ⵉⵎⵎⴰⵙⵏ ⵏ ⵕⴰⴷⵢⵓ' },
    'CENTRES DE SOINS DENTAIRE': { ar: 'مراكز علاج الأسنان', zgh: 'ⵉⵎⵎⴰⵙⵏ ⵏ ⵓⵅⵙⴰⵏ' },
    'PHARMACIES': { ar: 'صيدليات', zgh: 'ⵜⵉⴼⴰⵔⵎⴰⵙⵉⵜⵉⵏ' },
    'CLINIQUES': { ar: 'مصحات', zgh: 'ⵉⵙⵉⴱⵉⵜⴰⵍⵏ' },
    'CLINIQUE': { ar: 'مصحة', zgh: 'ⴰⵙⵉⴱⵉⵜⴰⵍ' },
    'OPTICIENS': { ar: 'نظاراتيون', zgh: 'ⵉⵎⵙⵡⴰⵍⵏ ⵏ ⵜⵉⵟⵟ' },
    'MÉDECINS À TARIF PRÉFÉRENTIELS': { ar: 'أطباء بتعرفة تفضيلية', zgh: 'ⵉⵎⵙⵙⵉⵊⵊⵉⵏ ⵙ ⵓⵙⵙⵓⵎ ⵉⵎⵥⵍⵉ' },
    'CABINETS DE KINÉSITHÉRAPIE': { ar: 'عيادات الترويض الطبي', zgh: 'ⵜⵉⵔⵣⴰ ⵏ ⴽⵉⵏⵉⵣⵉⵜⵉⵔⴰⴱⵉ' },
    'MATÉRIEL MÉDICO-CHIRURGICAL ET PARAMÉDICAL': { ar: 'معدات طبية وجراحية وشبه طبية', zgh: 'ⴰⵙⵍⵓⴳⵏ ⴰⴷⵓⵙⴰⵏ ⴷ ⴰⵊⵉⵔⵓⵔⵊⵉ' }
  };

  const medicalStatusLabels = {
    'Confirmé': { ar: 'مؤكد', zgh: 'ⵉⵜⵜⵓⵙⴷⵓⵙ' },
    'Confirmé – avis manquant': { ar: 'مؤكد - الإشعار غير متوفر', zgh: 'ⵉⵜⵜⵓⵙⴷⵓⵙ - ⴰⵙⴰⵍⵉ ⵓⵔ ⵉⵍⵍⵉ' },
    'Résilier': { ar: 'ملغى', zgh: 'ⵉⵜⵜⵓⵙⴼⵙⵔ' },
    'À voir avec Mme Lehmami': { ar: 'قيد التحقق مع السيدة لهمامي', zgh: 'ⵉⵇⵇⴰⵏ ⴰⵙⵏⵉⵔⵎ ⴷ Mme Lehmami' }
  };

  function medicalCopy() {
    return labels[lang]?.medicalPartners || labels.fr.medicalPartners;
  }

  function normalizeMedicalValue(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/œ/g, 'oe')
      .replace(/Œ/g, 'OE')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function medicalRegionFromName(regionName) {
    const normalized = normalizeMedicalValue(regionName);
    return medicalRegionMeta.find((region) => normalizeMedicalValue(region.source) === normalized) || null;
  }

  function medicalRegionLabel(region) {
    return region?.labels?.[lang] || region?.labels?.fr || region?.source || '';
  }

  function translateMedicalCategory(category) {
    return lang === 'fr' ? category : (medicalCategoryLabels[category]?.[lang] || category);
  }

  function translateMedicalStatus(status) {
    if (!status) return '';
    return lang === 'fr' ? status : (medicalStatusLabels[status]?.[lang] || status);
  }

  function medicalNoticeActions(entry) {
    const copy = medicalCopy();
    const avis = String(entry.avis || '');
    const normalized = normalizeMedicalValue(avis);
    const hasContact = /contact\s*:/i.test(avis);
    const hasAvis = /\bavis\b/.test(normalized) || /telecharger ici/.test(normalized.replace(/contact\s*telecharger ici/g, ''));
    const actions = [];
    if (hasAvis) actions.push(copy.downloadNotice);
    if (hasContact) actions.push(copy.downloadContact);
    return actions;
  }

  function renderMedicalFilter(scope, includeRegion = false) {
    const copy = medicalCopy();
    return `
      <div class="medical-partner-filters" data-medical-filter="${scope}">
        <label>
          <span>${esc(copy.search)}</span>
          <input type="search" data-medical-search placeholder="${esc(copy.searchPlaceholder)}" autocomplete="off">
        </label>
        ${includeRegion ? `
          <label>
            <span>${esc(copy.region)}</span>
            <select data-medical-region-select>
              ${medicalRegionMeta.map((region) => `<option value="${esc(region.id)}">${esc(medicalRegionLabel(region))}</option>`).join('')}
            </select>
          </label>` : ''}
        <label>
          <span>${esc(copy.city)}</span>
          <select data-medical-city-select><option value="">${esc(copy.allCities)}</option></select>
        </label>
        <label>
          <span>${esc(copy.category)}</span>
          <select data-medical-category-select><option value="">${esc(copy.allCategories)}</option></select>
        </label>
      </div>`;
  }

  function renderMedicalPartnersSection(section, navIndex) {
    const copy = medicalCopy();
    const data = Array.isArray(window.medicalPartnersData) ? window.medicalPartnersData : [];
    const regional = data.filter((entry) => entry.section === 'regional');
    const central = data.filter((entry) => entry.section === 'central');
    const firstRegion = medicalRegionMeta.find((region) => regional.some((entry) => medicalRegionFromName(entry.region)?.id === region.id)) || medicalRegionMeta[0];
    return `
      <section class="section page-section-soft prestation-extra-section medical-partners-section" id="${subrubriqueId(navIndex)}" data-prestation-extra-panel data-prestation-extra-index="${navIndex}" hidden>
        <div class="container" data-medical-partners data-default-region="${esc(firstRegion.id)}">
          <article class="prestation-extra-card medical-partners-intro">
            <span class="section-tag"><i class="fa-solid fa-file-contract" aria-hidden="true"></i> ${esc(section.badge || copy.badge)}</span>
            <p>${esc(section.intro || copy.intro)}</p>
          </article>

          <div class="medical-partner-layout">
            <section class="medical-partner-panel medical-partner-central is-open" aria-label="${esc(copy.centralTitle)}" data-medical-panel="central">
              <button class="medical-partner-panel-head" type="button" data-medical-panel-toggle="central" aria-expanded="true">
                <div>
                  <span class="section-tag"><i class="fa-solid fa-hospital" aria-hidden="true"></i> ${esc(copy.centralTitle)}</span>
                  <p>${esc(copy.centralIntro)}</p>
                </div>
                <span class="medical-panel-meta">
                  <strong data-medical-count="central">${central.length} ${esc(copy.results)}</strong>
                  <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </span>
              </button>
              <div class="medical-partner-panel-body" data-medical-panel-body="central">
                ${renderMedicalFilter('central')}
                <div class="medical-partner-results" data-medical-results="central"></div>
                <div class="medical-pagination" data-medical-pagination="central"></div>
              </div>
            </section>

            <section class="medical-partner-panel medical-partner-regional is-open" aria-label="${esc(copy.regionalTitle)}" data-medical-panel="regional">
              <button class="medical-partner-panel-head" type="button" data-medical-panel-toggle="regional" aria-expanded="true">
                <div>
                  <span class="section-tag"><i class="fa-solid fa-map-location-dot" aria-hidden="true"></i> ${esc(copy.regionalTitle)}</span>
                  <p>${esc(copy.regionalIntro)}</p>
                </div>
                <span class="medical-panel-meta">
                  <strong data-medical-count="regional">0 ${esc(copy.results)}</strong>
                  <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </span>
              </button>
              <div class="medical-partner-panel-body" data-medical-panel-body="regional">
                ${renderMedicalFilter('regional', false)}
                <div class="medical-map-layout">
                  <div class="medical-map-card medical-region-map" aria-label="${esc(copy.mapLabel)}" data-medical-map-svg></div>
                </div>
                <div class="medical-selected-region">
                  <span>${esc(copy.selectedRegion)}</span>
                  <strong data-medical-selected-region>${esc(medicalRegionLabel(firstRegion))}</strong>
                </div>
                <div class="medical-partner-results" data-medical-results="regional"></div>
                <div class="medical-pagination" data-medical-pagination="regional"></div>
              </div>
            </section>
          </div>
        </div>
      </section>`;
  }

  function renderExtraPrestationSections(item) {
    if (!item.extraSections?.length || !item.chips?.length) return '';
    return item.extraSections.map((section, index) => {
      const firstIndex = item.chips.length - item.extraSections.length;
      const navIndex = Number.isInteger(section.navIndex) ? section.navIndex : firstIndex + index;
      if (section.type === 'medicalPartners') return renderMedicalPartnersSection(section, navIndex);
      return `
      <section class="section page-section-soft prestation-extra-section" id="${subrubriqueId(navIndex)}" data-prestation-extra-panel data-prestation-extra-index="${navIndex}" hidden>
        <div class="container">
          <article class="prestation-extra-card">
            <span class="section-tag"><i class="fa-solid ${subIcons.prevoyance?.[navIndex] || section.icon || 'fa-circle-check'}" aria-hidden="true"></i> ${esc(section.badge)}</span>
            <h2>${esc(section.title)}</h2>
            ${renderParagraphs(section.intro)}
          </article>
          ${section.beneficiaries?.length ? `
            <div class="prestation-extra-block">
              <div class="prestation-amc-block-head">
                <span class="section-tag"><i class="fa-solid fa-people-roof" aria-hidden="true"></i> ${esc(section.beneficiariesTitle)}</span>
              </div>
              ${renderExtraMiniCards(section.beneficiaries)}
            </div>` : ''}
          ${section.blocks?.map(renderExtraSectionBlock).join('') || ''}
        </div>
      </section>`;
    }).join('');
  }

  function setPanelVisibility(panel, visible) {
    if (!panel) return;
    panel.hidden = !visible;
    panel.classList.toggle('is-tab-active', visible);
  }

  function prefersReducedMotion() {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }

  function visibleStickyHeight(element) {
    if (!element) return 0;
    const styles = window.getComputedStyle(element);
    if (!['fixed', 'sticky'].includes(styles.position)) return 0;
    const rect = element.getBoundingClientRect();
    if (rect.height <= 0 || rect.bottom <= 0) return 0;
    return rect.height;
  }

  function revealScrollTarget(target) {
    if (!target || prefersReducedMotion()) return;
    target.classList.remove('is-service-scroll-reveal');
    void target.offsetWidth;
    target.classList.add('is-service-scroll-reveal');
  }

  function scrollToServiceTarget(target, scope) {
    if (!target) return;
    const header = document.querySelector('.site-header');
    const serviceNav = scope?.querySelector?.('.prestation-nav');
    const offset = visibleStickyHeight(header) + visibleStickyHeight(serviceNav) + 28;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
    revealScrollTarget(target);
  }

  function bindPrestationAccordions(scope) {
    scope.querySelectorAll('[data-prestation-accordion]').forEach((accordion) => {
      accordion.querySelectorAll('.prestation-accordion-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const item = trigger.closest('.prestation-accordion-item');
          const content = item?.querySelector('.prestation-accordion-content');
          const toggleIcon = trigger.querySelector('.prestation-accordion-toggle');
          if (!item || !content) return;
          const shouldOpen = !item.classList.contains('is-open');
          accordion.querySelectorAll('.prestation-accordion-item').forEach((sibling) => {
            const siblingTrigger = sibling.querySelector('.prestation-accordion-trigger');
            const siblingContent = sibling.querySelector('.prestation-accordion-content');
            const siblingIcon = sibling.querySelector('.prestation-accordion-toggle');
            sibling.classList.remove('is-open');
            if (siblingTrigger) siblingTrigger.setAttribute('aria-expanded', 'false');
            if (siblingContent) siblingContent.hidden = true;
            if (siblingIcon) {
              siblingIcon.classList.add('fa-plus');
              siblingIcon.classList.remove('fa-minus');
            }
          });
          const isOpen = shouldOpen;
          item.classList.toggle('is-open', isOpen);
          trigger.setAttribute('aria-expanded', String(isOpen));
          content.hidden = !isOpen;
          if (toggleIcon) {
            toggleIcon.classList.toggle('fa-plus', !isOpen);
            toggleIcon.classList.toggle('fa-minus', isOpen);
          }
        });
      });
    });
  }

  function bindAmcDetail(scope) {
    scope.querySelectorAll('[data-amc-info-card]').forEach((card) => {
      const toggle = card.querySelector('[data-amc-card-toggle]');
      const icon = toggle?.querySelector('.fa-solid');
      const title = card.querySelector('h3')?.textContent?.trim() || '';
      const detail = serviceText('prevoyance')?.amcDetail || amcDetailFr;
      toggle?.addEventListener('click', () => {
        const expanded = !card.classList.contains('is-expanded');
        card.classList.toggle('is-expanded', expanded);
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        toggle.setAttribute('aria-label', `${expanded ? detail.collapseLabel : detail.expandLabel} : ${title}`);
        if (icon) {
          icon.classList.toggle('fa-chevron-down', !expanded);
          icon.classList.toggle('fa-chevron-up', expanded);
        }
      });
    });

    scope.querySelectorAll('[data-amc-card-carousel]').forEach((carousel) => {
      const cards = Array.from(carousel.querySelectorAll('[data-amc-info-card]'));
      const dots = Array.from(carousel.parentElement?.querySelectorAll('[data-amc-card-dot]') || []);
      let dragging = false;
      let startX = 0;
      let startScroll = 0;

      const updateDots = () => {
        if (!cards.length || !dots.length) return;
        const activeIndex = cards.reduce((bestIndex, card, index) => {
          const distance = Math.abs(card.offsetLeft - carousel.scrollLeft);
          const bestDistance = Math.abs(cards[bestIndex].offsetLeft - carousel.scrollLeft);
          return distance < bestDistance ? index : bestIndex;
        }, 0);
        dots.forEach((dot, index) => {
          const active = index === activeIndex;
          dot.classList.toggle('is-active', active);
          dot.setAttribute('aria-current', active ? 'true' : 'false');
        });
      };

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          cards[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });
      });

      carousel.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateDots);
      }, { passive: true });

      carousel.addEventListener('pointerdown', (event) => {
        if (!window.matchMedia('(max-width: 680px)').matches) return;
        dragging = true;
        startX = event.clientX;
        startScroll = carousel.scrollLeft;
        carousel.classList.add('is-dragging');
      });

      carousel.addEventListener('pointermove', (event) => {
        if (!dragging) return;
        carousel.scrollLeft = startScroll - (event.clientX - startX);
      });

      ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => {
        carousel.addEventListener(eventName, () => {
          dragging = false;
          carousel.classList.remove('is-dragging');
          updateDots();
        });
      });

      updateDots();
    });

    scope.querySelectorAll('.prestation-amc-option-tabs').forEach((tabs) => {
      const section = tabs.closest('.prestation-amc-section');
      const buttons = tabs.querySelectorAll('[data-amc-option]');
      const panels = section?.querySelectorAll('[data-amc-option-panel]') || [];
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const option = button.getAttribute('data-amc-option');
          buttons.forEach((item) => {
            const active = item === button;
            item.classList.toggle('is-active', active);
            item.setAttribute('aria-selected', active ? 'true' : 'false');
          });
          panels.forEach((panel) => {
            const active = panel.getAttribute('data-amc-option-panel') === option;
            panel.hidden = !active;
            panel.classList.toggle('is-active', active);
          });
        });
      });
    });

    scope.querySelectorAll('[data-amc-guarantees]').forEach((accordion) => {
      accordion.querySelectorAll('.prestation-amc-guarantee-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const item = trigger.closest('.prestation-amc-guarantee');
          const content = item?.querySelector('.prestation-amc-guarantee-content');
          const icon = trigger.querySelector('.fa-solid');
          if (!item || !content) return;
          const shouldOpen = !item.classList.contains('is-open');
          item.classList.toggle('is-open', shouldOpen);
          trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
          content.hidden = !shouldOpen;
          if (icon) {
            icon.classList.toggle('fa-plus', !shouldOpen);
            icon.classList.toggle('fa-minus', shouldOpen);
          }
        });
      });
    });
  }

  function renderCatalog() {
    const grid = document.getElementById('prestations-catalog');
    if (!grid) return;
    grid.innerHTML = Object.keys(services).map((key) => {
      const item = serviceText(key);
      return `
        <article class="prestation-card">
          <div class="prestation-card-media" style="--image: url('${esc(asset(image[key]))}')">
            <span class="prestation-card-icon"><i class="fa-solid ${icons[key]}" aria-hidden="true"></i></span>
          </div>
          <div class="prestation-card-body">
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.summary)}</p>
            <ul class="prestation-chip-list">
              ${item.chips.slice(0, 4).map((chip) => `<li>${esc(chip)}</li>`).join('')}
            </ul>
            <a class="service-link" href="${esc(services[key].href)}">${esc(t('discover'))} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
          </div>
        </article>`;
    }).join('');
  }

  function renderCatalogChrome() {
    const map = {
      'prestations-kicker': t('kicker'),
      'prestations-title': t('catalogueTitle'),
      'prestations-body': t('catalogueBody'),
      'prestations-flow-title': t('flowTitle'),
      'prestations-flow-body': t('flowBody'),
      'prestations-cta-title': t('ctaTitle'),
      'prestations-cta-body': t('ctaBody'),
      'prestations-explore': t('explore'),
      'prestations-contact': t('contact')
    };
    Object.entries(map).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });
    const stats = [['5', t('rubriques')], ['3', 'FR / AR / ⵜⵎⵣⵉⵖⵜ'], ['Icônes', t('icons2d')]];
    renderNavigator();
  }

  function renderNavigator() {
    const nav = document.getElementById('prestations-category-nav');
    const panel = document.getElementById('prestations-category-panel');
    if (!nav || !panel) return;

    const keys = Object.keys(services);
    if (!services[selectedService]) selectedService = keys[0];

    nav.innerHTML = keys.map((key) => {
      const item = serviceText(key);
      const active = key === selectedService;
      return `
        <button class="prestations-category-button ${active ? 'is-active' : ''}" type="button" data-prestation-key="${esc(key)}" aria-pressed="${active ? 'true' : 'false'}">
          <span class="prestations-category-icon"><i class="fa-solid ${icons[key]}" aria-hidden="true"></i></span>
          <span>
            <strong>${esc(item.title)}</strong>
            <small>${esc(item.meta)}</small>
          </span>
        </button>`;
    }).join('');

    panel.innerHTML = keys.map((key) => {
      const item = serviceText(key);
      const active = key === selectedService;
      return `
        <section class="prestations-category-detail" data-prestation-panel="${esc(key)}" style="--image: url('${esc(asset(image[key]))}')" ${active ? '' : 'hidden'}>
          <div class="prestations-panel-body">
            <span class="section-tag"><i class="fa-solid ${icons[key]}" aria-hidden="true"></i> ${esc(item.meta)}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.summary)}</p>
            <ul class="prestations-subcategory-list">
              ${item.chips.map((chip) => `<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i>${esc(chip)}</li>`).join('')}
            </ul>
            <a class="btn btn-primary" href="${esc(services[key].href)}">${esc(t('discover'))}</a>
          </div>
        </section>`;
    }).join('');

    nav.querySelectorAll('[data-prestation-key]').forEach((button) => {
      button.addEventListener('click', () => {
        selectNavigatorService(button.getAttribute('data-prestation-key'));
      });
    });
    selectNavigatorService(selectedService);
  }

  function selectNavigatorService(key) {
    const nav = document.getElementById('prestations-category-nav');
    const panel = document.getElementById('prestations-category-panel');
    if (!nav || !panel || !services[key]) return;
    selectedService = key;
    nav.querySelectorAll('[data-prestation-key]').forEach((button) => {
      const active = button.getAttribute('data-prestation-key') === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    panel.querySelectorAll('[data-prestation-panel]').forEach((section) => {
      section.hidden = section.getAttribute('data-prestation-panel') !== key;
    });
  }

  function renderMedicalPartnerCard(entry) {
    const copy = medicalCopy();
    const title = entry.organisme || entry.medecin || translateMedicalCategory(entry.categorie) || copy.organization;
    const noticeActions = medicalNoticeActions(entry);
    return `
      <article class="medical-partner-card">
        <div class="medical-partner-card-top">
          <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${esc(entry.ville || '—')}</span>
          <span>${esc(translateMedicalCategory(entry.categorie || ''))}</span>
        </div>
        <h3>${esc(title)}</h3>
        ${entry.medecin ? `<p class="medical-partner-doctor"><strong>${esc(copy.doctor)} :</strong> ${esc(entry.medecin)}</p>` : ''}
        <dl>
          ${entry.adresse ? `<div><dt>${esc(copy.address)}</dt><dd>${esc(entry.adresse)}</dd></div>` : ''}
          ${entry.telephone ? `<div><dt>${esc(copy.phone)}</dt><dd>${esc(entry.telephone)}</dd></div>` : ''}
        </dl>
        ${noticeActions.length ? `<div class="medical-notice-actions">${noticeActions.map((label) => `<button class="medical-notice-button" type="button" disabled>${esc(label)}</button>`).join('')}</div>` : ''}
      </article>`;
  }

  function uniqueMedicalValues(entries, key) {
    return [...new Set(entries.map((entry) => entry[key]).filter(Boolean))]
      .sort((a, b) => String(a).localeCompare(String(b), 'fr'));
  }

  function setMedicalSelectOptions(select, values, allLabel, formatter = (value) => value) {
    if (!select) return;
    const current = select.value;
    select.innerHTML = `<option value="">${esc(allLabel)}</option>${values.map((value) => `<option value="${esc(value)}">${esc(formatter(value))}</option>`).join('')}`;
    if (values.includes(current)) select.value = current;
  }

  function getMedicalMapPathCenter(path) {
    if (!path?.getBBox) return null;
    const box = path.getBBox();
    return {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2
    };
  }

  function findMedicalMapPath(mapMount, regionId) {
    return [...(mapMount?.querySelectorAll('[data-region]') || [])].find((path) => path.getAttribute('data-region') === regionId) || null;
  }

  function paintMedicalMapLabel(mapMount, regionId, regionPath = null) {
    const svgRoot = mapMount?.querySelector('svg');
    if (!svgRoot) return;
    let overlayLayer = svgRoot.querySelector('#medical-map-overlays');
    if (!overlayLayer) {
      overlayLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      overlayLayer.id = 'medical-map-overlays';
      overlayLayer.style.pointerEvents = 'none';
      svgRoot.appendChild(overlayLayer);
    }
    overlayLayer.innerHTML = '';

    const region = medicalRegionMeta.find((entry) => entry.id === regionId);
    if (!region?.target) return;
    const pathCenter = getMedicalMapPathCenter(regionPath || findMedicalMapPath(mapMount, regionId));
    const target = pathCenter || region.target;
    const label = medicalRegionLabel(region);
    const textY = Math.max(24, target.y - 12);
    const textX = Math.min(560, Math.max(120, target.x));
    const fontSize = label.length > 24 ? 16 : 18;

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', target.x);
    circle.setAttribute('cy', target.y);
    circle.setAttribute('r', '5.5');
    circle.setAttribute('fill', '#1f6a43');
    circle.setAttribute('stroke', '#fff');
    circle.setAttribute('stroke-width', '2');
    overlayLayer.appendChild(circle);

    ['halo', 'label'].forEach((type) => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', textX);
      text.setAttribute('y', textY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', String(fontSize));
      text.setAttribute('font-weight', '800');
      text.setAttribute('font-family', 'Inter, Outfit, sans-serif');
      if (type === 'halo') {
        text.setAttribute('fill', 'none');
        text.setAttribute('stroke', '#ffffff');
        text.setAttribute('stroke-width', '3.5');
        text.setAttribute('stroke-linejoin', 'round');
      } else {
        text.setAttribute('fill', '#1f6a43');
      }
      text.textContent = label;
      overlayLayer.appendChild(text);
    });
  }

  function bindMedicalPartners(rootNode) {
    const widget = rootNode.querySelector('[data-medical-partners]');
    if (!widget || widget.dataset.medicalBound === 'true') return;
    widget.dataset.medicalBound = 'true';
    const copy = medicalCopy();
    const data = Array.isArray(window.medicalPartnersData) ? window.medicalPartnersData : [];
    const bySection = {
      regional: data.filter((entry) => entry.section === 'regional'),
      central: data.filter((entry) => entry.section === 'central')
    };
    let selectedRegion = widget.dataset.defaultRegion || medicalRegionMeta[0]?.id;
    const mapMount = widget.querySelector('[data-medical-map-svg]');
    if (mapMount && window.medicalRegionsMapSvg) {
      mapMount.innerHTML = window.medicalRegionsMapSvg;
      mapMount.querySelectorAll('[data-region]').forEach((path) => {
        const medicalRegionId = medicalMapRegionAliases[path.getAttribute('data-region')] || path.getAttribute('data-region');
        const region = medicalRegionMeta.find((entry) => entry.id === medicalRegionId);
        path.dataset.region = medicalRegionId;
        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', medicalRegionLabel(region));
      });
    }

    const getControls = (scope) => {
      const filter = widget.querySelector(`[data-medical-filter="${scope}"]`);
      return {
        filter,
        search: filter?.querySelector('[data-medical-search]'),
        region: filter?.querySelector('[data-medical-region-select]'),
        city: filter?.querySelector('[data-medical-city-select]'),
        category: filter?.querySelector('[data-medical-category-select]'),
        results: widget.querySelector(`[data-medical-results="${scope}"]`),
        count: widget.querySelector(`[data-medical-count="${scope}"]`),
        pagination: widget.querySelector(`[data-medical-pagination="${scope}"]`)
      };
    };

    let activeMapPath = null;
    const pageSize = 4;
    const pages = { regional: 1, central: 1 };
    const getRegionId = (entry) => medicalRegionFromName(entry.region)?.id || '';
    const getRegionalEntries = () => (
      selectedRegion === 'rabat-sale-kenitra'
        ? bySection.central
        : bySection.regional.filter((entry) => getRegionId(entry) === selectedRegion)
    );
    const applyFilters = (scope) => {
      const controls = getControls(scope);
      const query = normalizeMedicalValue(controls.search?.value || '');
      const city = controls.city?.value || '';
      const category = controls.category?.value || '';
      const source = scope === 'regional' ? getRegionalEntries() : bySection[scope];
      return source.filter((entry) => {
        if (city && entry.ville !== city) return false;
        if (category && entry.categorie !== category) return false;
        if (!query) return true;
        return normalizeMedicalValue([entry.medecin, entry.organisme, entry.categorie, entry.adresse, entry.ville].join(' ')).includes(query);
      });
    };

    const renderPagination = (controls, scope, totalPages) => {
      if (!controls.pagination) return;
      if (totalPages <= 1) {
        controls.pagination.innerHTML = '';
        return;
      }
      const currentPage = pages[scope];
      const pageButtons = Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return `<button type="button" class="${page === currentPage ? 'is-active' : ''}" data-medical-page="${scope}:${page}" aria-label="${esc(copy.pageLabel)} ${page}" aria-current="${page === currentPage ? 'page' : 'false'}">${page}</button>`;
      }).join('');
      controls.pagination.innerHTML = `
        <button type="button" data-medical-page="${scope}:${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? 'disabled' : ''}>
          ${esc(copy.previousPage)}
        </button>
        ${pageButtons}
        <button type="button" data-medical-page="${scope}:${Math.min(totalPages, currentPage + 1)}" ${currentPage === totalPages ? 'disabled' : ''}>
          ${esc(copy.nextPage)}
        </button>`;
    };

    const syncRegionUi = () => {
      const region = medicalRegionMeta.find((entry) => entry.id === selectedRegion) || medicalRegionMeta[0];
      widget.querySelectorAll('.medical-region-map [data-region]').forEach((path) => {
        const active = activeMapPath ? path === activeMapPath : path.getAttribute('data-region') === selectedRegion;
        path.classList.toggle('is-active', active);
        path.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      paintMedicalMapLabel(mapMount, selectedRegion, activeMapPath);
      const regionSelect = getControls('regional').region;
      if (regionSelect) regionSelect.value = selectedRegion;
      const selected = widget.querySelector('[data-medical-selected-region]');
      if (selected) selected.textContent = medicalRegionLabel(region);
    };

    const renderScope = (scope) => {
      const controls = getControls(scope);
      const base = scope === 'regional' ? getRegionalEntries() : bySection[scope];
      setMedicalSelectOptions(controls.city, uniqueMedicalValues(base, 'ville'), copy.allCities);
      setMedicalSelectOptions(controls.category, uniqueMedicalValues(base, 'categorie'), copy.allCategories, translateMedicalCategory);
      const entries = applyFilters(scope);
      const totalPages = Math.max(1, Math.ceil(entries.length / pageSize));
      pages[scope] = Math.min(Math.max(1, pages[scope]), totalPages);
      const visibleEntries = entries.slice((pages[scope] - 1) * pageSize, pages[scope] * pageSize);
      if (controls.count) controls.count.textContent = `${entries.length} ${copy.results}`;
      if (!controls.results) return;
      if (!entries.length) {
        controls.results.innerHTML = `<p class="medical-partner-empty">${esc(scope === 'regional' ? copy.noRegional : copy.noResults)}</p>`;
        renderPagination(controls, scope, 1);
        return;
      }
      controls.results.innerHTML = visibleEntries.map(renderMedicalPartnerCard).join('');
      renderPagination(controls, scope, totalPages);
    };

    const renderAll = () => {
      syncRegionUi();
      renderScope('regional');
      renderScope('central');
    };

    const toggleMedicalPanel = (scope) => {
      const panel = widget.querySelector(`[data-medical-panel="${scope}"]`);
      if (!panel) return;
      const body = panel.querySelector('[data-medical-panel-body]');
      const toggle = panel.querySelector('[data-medical-panel-toggle]');
      const open = panel.classList.contains('is-collapsed');
      panel.classList.toggle('is-collapsed', !open);
      panel.classList.toggle('is-open', open);
      if (body) body.hidden = !open;
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    widget.querySelectorAll('[data-medical-panel-toggle]').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        toggleMedicalPanel(toggle.getAttribute('data-medical-panel-toggle'));
      });
    });

    widget.querySelectorAll('.medical-region-map [data-region]').forEach((path) => {
      const selectPathRegion = () => {
        selectedRegion = path.getAttribute('data-region') || selectedRegion;
        activeMapPath = path;
        pages.regional = 1;
        renderAll();
      };
      path.addEventListener('mouseenter', () => paintMedicalMapLabel(mapMount, path.getAttribute('data-region') || selectedRegion, path));
      path.addEventListener('mouseleave', () => paintMedicalMapLabel(mapMount, selectedRegion, activeMapPath));
      path.addEventListener('click', selectPathRegion);
      path.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        selectedRegion = path.getAttribute('data-region') || selectedRegion;
        activeMapPath = path;
        pages.regional = 1;
        renderAll();
      });
    });

    ['regional', 'central'].forEach((scope) => {
      const controls = getControls(scope);
      [controls.search, controls.city, controls.category].forEach((control) => {
        control?.addEventListener('input', () => {
          pages[scope] = 1;
          renderScope(scope);
        });
        control?.addEventListener('change', () => {
          pages[scope] = 1;
          renderScope(scope);
        });
      });
      controls.region?.addEventListener('change', () => {
        selectedRegion = controls.region.value || selectedRegion;
        activeMapPath = null;
        pages.regional = 1;
        renderAll();
      });
    });

    widget.addEventListener('click', (event) => {
      const button = event.target.closest('[data-medical-page]');
      if (!button || button.disabled || !widget.contains(button)) return;
      const [scope, page] = button.getAttribute('data-medical-page').split(':');
      if (!pages[scope]) return;
      pages[scope] = Number(page) || 1;
      renderScope(scope);
    });

    renderAll();
  }

  function renderDetail() {
    const mount = document.getElementById('prestation-detail-root');
    const key = body.dataset.service;
    if (!mount || !services[key]) return;
    const item = serviceText(key);
    const journeyIcons = ['fa-compass', 'fa-folder-open', 'fa-hand-holding-medical', 'fa-map-location-dot'];
    const detailMenuItems = item.menuItems || item.chips.map((chip, index) => ({
      id: `subrubrique-${index + 1}`,
      icon: subIcons[key]?.[index] || 'fa-circle-check',
      label: chip
    }));
    document.title = `FOS-Agri | ${item.title}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', item.summary);
    mount.innerHTML = `
      <section class="prestation-detail-hero" style="--hero-image: url('${esc(asset(image[key]))}')">
        <div class="container">
          <span class="page-kicker"><i class="fa-solid ${icons[key]}" aria-hidden="true"></i> ${esc(item.meta)}</span>
          <h1>${esc(item.title)}</h1>
          <p>${esc(item.summary)}</p>
          <div class="prestation-hero-actions">
            <a class="btn btn-primary" href="#${item.centerMedical ? subrubriqueId(0) : 'overview'}">${esc(t('details'))}</a>
            <a class="btn btn-secondary" href="../prestations.html">${esc(t('back'))}</a>
          </div>
        </div>
        <div class="prestation-floating-icons" aria-hidden="true">
          ${detailMenuItems.slice(0, 3).map((_, index) => `<span><i class="fa-solid ${['fa-hand-holding-heart', 'fa-shield-heart', 'fa-people-group'][index]}" aria-hidden="true"></i></span>`).join('')}
        </div>
      </section>
      <section class="prestation-nav">
        <div class="container prestation-nav-inner ${detailMenuItems.length > 5 ? 'is-split-nav' : ''}">
          ${/*
            Prévoyance menu checklist:
            - 7 items must be rendered for every language.
            - All labels come from translation/data file.
            - No hardcoded menu labels.
            - No sub-menu for these 7 items.
          */''}
          ${detailMenuItems.map((navItem, index) => `
            <a class="prestation-nav-chip" href="#${subrubriqueId(index)}" data-nav-id="${esc(navItem.id)}">
              <i class="fa-solid ${esc(navItem.icon)}" aria-hidden="true"></i>
              <span>${esc(navItem.label)}</span>
            </a>`).join('')}
        </div>
      </section>
      ${item.centerMedical ? '' : `
      <section class="section" id="overview">
        <div class="container prestation-content-grid ${item.centerMedical ? 'is-single' : ''}">
          <article class="prestation-panel">
            <span class="section-tag"><i class="fa-solid ${icons[key]}" aria-hidden="true"></i> ${esc(item.meta)}</span>
            <h2>${esc(t('details'))}</h2>
            <p>${esc(item.overview)}</p>
          </article>
          ${item.centerMedical ? '' : `
          <aside class="prestation-panel">
            <h3>${esc(t('highlights'))}</h3>
            <ul class="prestation-highlight-list">
              ${item.highlights.map((entry) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>${esc(entry)}</span></li>`).join('')}
            </ul>
          </aside>`}
        </div>
      </section>`}
      ${renderCenterMedicalSection(item)}
      ${renderAmcDetailSection(item)}
      ${renderAmtsDetailSection(item)}
      ${renderExtraPrestationSections(item)}
      ${item.centerMedical ? '' : `
      <section class="section page-section-soft" id="subrubriques">
        <div class="container">
          <div class="prestation-section-head centered">
            <h2>${esc(t('subrubriques'))}</h2>
            <p>${esc(item.summary)}</p>
          </div>
          <div class="prestation-feature-grid">
            ${item.features.slice(item.centerMedical ? 1 : 0).map(([title, body], index) => {
              const realIndex = item.centerMedical ? index + 1 : index;
              return `
              <article class="prestation-feature-card" id="${subrubriqueId(realIndex)}">
                <span class="page-card-icon"><i class="fa-solid ${subIcons[key]?.[realIndex] || 'fa-circle-check'}" aria-hidden="true"></i></span>
                <h3>${esc(title)}</h3>
                <p>${esc(body)}</p>
              </article>`;
            }).join('')}
          </div>
        </div>
      </section>`}
      ${item.centerMedical ? '' : `
      <section class="section" id="partners">
        <div class="container">
          <div class="prestation-section-head">
            <h2>${esc(t('partners'))}</h2>
            <p>${esc(item.meta)}</p>
          </div>
          <div class="prestation-partner-grid">
            ${item.partners.map((partner) => `<article class="prestation-partner-card"><h3>${esc(partner)}</h3></article>`).join('')}
          </div>
        </div>
      </section>`}
      <section class="section page-section-soft prestation-journey-section" id="steps">
        <div class="container">
          <div class="prestation-section-head prestation-journey-head">
            <span class="section-tag"><i class="fa-solid fa-route" aria-hidden="true"></i> ${esc(item.meta)}</span>
            <h2>${esc(t('steps'))}</h2>
            <p>${esc(t('flowBody'))}</p>
          </div>
          <div class="prestation-timeline prestation-journey-grid">
            ${item.steps.map(([title, body], index) => `
              <article class="prestation-timeline-item prestation-journey-card">
                <div class="prestation-journey-card-top">
                  <span class="prestation-journey-icon"><i class="fa-solid ${journeyIcons[index] || 'fa-circle-check'}" aria-hidden="true"></i></span>
                  <span class="prestation-journey-number">${String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>${esc(title)}</h3>
                <p>${esc(body)}</p>
              </article>`).join('')}
          </div>
          ${item.centerMedical ? `
          <aside class="prestation-center-keypoints prestation-keypoints-panel">
            <div class="prestation-keypoints-head">
              <span><i class="fa-solid fa-list-check" aria-hidden="true"></i></span>
              <div>
                <small>${esc(item.centerMedical.badge)}</small>
                <h3>${esc(t('highlights'))}</h3>
              </div>
            </div>
            <ul class="prestation-highlight-list">
              ${item.highlights.map((entry) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>${esc(entry)}</span></li>`).join('')}
            </ul>
          </aside>` : ''}
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="prestation-cta-panel">
            <div>
              <h2>${esc(t('ctaTitle'))}</h2>
              <p>${esc(t('ctaBody'))}</p>
            </div>
            <a class="btn btn-primary" href="../contact.html">${esc(t('contact'))}</a>
          </div>
        </div>
      </section>`;

    const navLinks = mount.querySelectorAll('.prestation-nav-chip');
    const centerPanel = mount.querySelector('.prestation-center-section');
    const amcPanel = mount.querySelector('[data-prestation-amc-panel]');
    const amtsPanel = mount.querySelector('[data-prestation-amts-panel]');
    const extraPanels = Array.from(mount.querySelectorAll('[data-prestation-extra-panel]'));
    const showTabContent = (index, link, shouldScroll = true) => {
      const isAmc = index === 1 && !!amcPanel;
      const isAmts = index === 2 && !!amtsPanel;
      const extraPanel = extraPanels.find((panel) => Number(panel.dataset.prestationExtraIndex) === index);
      const isExtra = !!extraPanel;
      navLinks.forEach((item) => item.classList.remove('is-active'));
      if (link) link.classList.add('is-active');
      setPanelVisibility(centerPanel, !isAmc && !isAmts && !isExtra);
      setPanelVisibility(amcPanel, isAmc);
      setPanelVisibility(amtsPanel, isAmts);
      extraPanels.forEach((panel) => setPanelVisibility(panel, panel === extraPanel));
      const scrollTarget = isAmc ? amcPanel : (isAmts ? amtsPanel : (isExtra ? extraPanel : (index === 0 ? centerPanel : document.getElementById(subrubriqueId(index)))));
      if (!isAmc && !isAmts && !isExtra && index > 1) {
        const trigger = scrollTarget?.querySelector?.('.prestation-accordion-trigger');
        if (trigger && trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
      }
      if (window.history?.pushState) {
        const hash = isAmc ? subrubriqueId(index) : (scrollTarget?.id || subrubriqueId(index));
        window.history.pushState(null, '', `#${hash}`);
      }
      if (shouldScroll && scrollTarget) {
        scrollToServiceTarget(scrollTarget, mount);
      } else {
        revealScrollTarget(scrollTarget);
      }
    };
    navLinks.forEach((link, index) => {
      link.classList.toggle('is-active', index === 0);
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showTabContent(index, link, true);
      });
    });
    bindPrestationAccordions(mount);
    bindAmcDetail(mount);
    bindMedicalPartners(mount);
    if (window.__fosPrestationHashHandler) {
      window.removeEventListener('hashchange', window.__fosPrestationHashHandler);
    }
    window.__fosPrestationHashHandler = () => {
      const hashIndex = Array.from(navLinks).findIndex((link) => link.hash === window.location.hash);
      if (hashIndex > -1) {
        showTabContent(hashIndex, navLinks[hashIndex], false);
      }
    };
    window.addEventListener('hashchange', window.__fosPrestationHashHandler);
    const hashIndex = Array.from(navLinks).findIndex((link) => link.hash === window.location.hash);
    if (hashIndex > 0) {
      showTabContent(hashIndex, navLinks[hashIndex], false);
    }
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('.prestations-category-button[data-prestation-key]');
    const nav = document.getElementById('prestations-category-nav');
    if (!button || !nav || !nav.contains(button)) return;
    event.preventDefault();
    selectNavigatorService(button.getAttribute('data-prestation-key'));
  }, true);

  function applyLanguage() {
    let stored = null;
    try {
      stored = localStorage.getItem('fosagri-lang');
    } catch (_) {
      stored = null;
    }
    lang = supported.includes(stored) ? stored : lang;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    body.dataset.lang = lang;
    renderCatalogChrome();
    renderCatalog();
    renderDetail();
  }

  cloneFallbacks();
  applyControlledTranslations();
  applyLanguage();
  window.addEventListener('fosagri:lang-change', (event) => {
    if (supported.includes(event.detail?.lang)) lang = event.detail.lang;
    applyLanguage();
  });
})();
