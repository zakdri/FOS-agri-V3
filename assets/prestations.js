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

  const subIcons = {
    prevoyance: ['fa-circle-info', 'fa-shield-heart', 'fa-truck-medical', 'fa-ribbon', 'fa-house-medical', 'fa-hands-holding-child', 'fa-file-contract'],
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
      steps: 'Parcours adhérent'
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
      steps: 'مسار المنخرط'
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
      steps: 'ⴰⴱⵔⵉⴷ ⵏ ⵓⵎⵏⵅⵔⴰⵟ'
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
          ['fa-hospital-user', 'Césarienne', 'ⴰⵔ 100% ⵏ ticket modérateur ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ.'],
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

  const services = {
    prevoyance: {
      href: 'services/prevoyance.html',
      fr: {
        title: 'Prévoyance médico-sociale',
        meta: 'Santé, protection sociale et bien-être',
        summary: 'Un dispositif de santé et de protection sociale pour accompagner les adhérents et leurs familles face aux aléas médicaux, aux urgences et aux besoins spécifiques.',
        stats: [['100%', 'du ticket modérateur AMC selon contrat'], ['1 MDH', 'de plafond général annuel par personne'], ['5 000 DH', 'd’aide aux enfants en situation de handicap']],
        chips: ['A PROPOS', 'ASSURANCE MALADIE COMPLÉMENTAIRE', 'ASSISTANCE MÉDICALE ET TRANSPORT SANITAIRE', 'FORFAIT FUNERAIRE', 'CENTRE MEDICO-SOCIAL', 'AIDES AUX PERSONNES AUX BESOINS SPECIFIQUES', 'CONVENTIONS ET PARTENARIATS MEDICALES'],
        overview: 'La FOS-Agri a érigé le volet santé en priorité avec l’assurance maladie complémentaire, l’accompagnement médico-social, l’assistance médicale et le transport sanitaire, ainsi qu’un réseau de conventions médicales au niveau régional.',
        highlights: ['Remboursement ou prise en charge complémentaire en lien avec l’AMO/CNOPS.', 'Assistance médicale et transport sanitaire via Wafa IMA Assistance.', 'Aide de 5 000 DH pour les enfants des adhérents en situation de handicap.', 'Conventions avec laboratoires, cliniques, médecins, opticiens, pharmacies et centres de soins.'],
        amcDetail: amcDetailFr,
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
        extraSections: [
          {
            navIndex: 3,
            badge: 'FORFAIT FUNERAIRE',
            title: 'FORFAIT FUNERAIRE',
            intro: 'Cette page est réservée à la présentation du forfait funéraire destiné aux adhérents concernés.',
            points: ['Conditions d’éligibilité à confirmer avec la Fondation.', 'Pièces justificatives et modalités de dépôt à intégrer après validation du contenu.', 'Orientation vers le relais régional ou le service compétent pour le suivi du dossier.']
          },
          {
            navIndex: 4,
            badge: 'CENTRE MEDICO-SOCIAL',
            title: 'CENTRE MEDICO-SOCIAL',
            intro: 'Cette page regroupe les informations liées au centre médico-social et à l’accompagnement de proximité des adhérents.',
            points: ['Orientation et écoute autour des besoins de santé et de bien-être.', 'Information sur les prestations médico-sociales disponibles.', 'Coordination avec les équipes FOS-Agri et les relais régionaux.']
          }
        ],
        partners: ['Laboratoires d’analyses', 'Cliniques et radiologie', 'Médecins à tarifs préférentiels', 'Opticiens', 'Pharmacies', 'Centres dentaires'],
        steps: [['Orientation', 'Identifier la prestation ou le partenaire médical adapté.'], ['Dossier', 'Préparer les pièces justificatives et les références d’adhésion.'], ['Prise en charge', 'Suivre les modalités AMC, AMTS ou convention médicale.'], ['Relais régional', 'S’appuyer sur les relais pour les conventions de proximité.']]
      },
      ar: {
        title: 'الوقاية الطبية والاجتماعية',
        meta: 'الصحة والحماية الاجتماعية والرفاه',
        summary: 'منظومة لمواكبة المنخرطين وأسرهم في الصحة والحماية الاجتماعية والحالات المستعجلة والاحتياجات الخاصة.',
        stats: [['100%', 'من الباقي على عاتق المنخرط حسب العقد'], ['1 مليون درهم', 'كسقف عام سنوي لكل شخص'], ['5 000 درهم', 'دعم للأطفال في وضعية إعاقة']],
        chips: ['حول الخدمة', 'التأمين الصحي التكميلي', 'المساعدة والنقل الصحي', 'منحة الوفاة', 'المركز الطبي الاجتماعي', 'دعم الأشخاص ذوي الاحتياجات الخاصة', 'الاتفاقيات والشراكات الطبية'],
        overview: 'تضع FOS-Agri الصحة ضمن أولوياتها عبر التأمين الصحي التكميلي والمواكبة الطبية الاجتماعية والمساعدة الطبية والنقل الصحي وشبكة اتفاقيات طبية جهوية.',
        highlights: ['تعويض أو تحمل تكميلي بتنسيق مع AMO/CNOPS.', 'مساعدة طبية ونقل صحي عبر Wafa IMA Assistance.', 'دعم قدره 5 000 درهم للأطفال في وضعية إعاقة.', 'اتفاقيات مع مختبرات ومصحات وأطباء ونظارات وصيدليات ومراكز علاج.'],
        amcDetail: amcDetailAr,
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
        extraSections: [
          {
            navIndex: 3,
            badge: 'منحة الوفاة',
            title: 'منحة الوفاة',
            intro: 'هذه الصفحة مخصصة لتقديم معطيات منحة الوفاة لفائدة المنخرطين المعنيين.',
            points: ['شروط الاستفادة يتم تأكيدها مع المؤسسة.', 'الوثائق المطلوبة وكيفيات الإيداع ستضاف بعد المصادقة على المحتوى.', 'توجيه نحو المنسق الجهوي أو المصلحة المختصة لتتبع الملف.']
          },
          {
            navIndex: 4,
            badge: 'المركز الطبي الاجتماعي',
            title: 'المركز الطبي الاجتماعي',
            intro: 'تجمع هذه الصفحة المعلومات المرتبطة بالمركز الطبي الاجتماعي والمواكبة القريبة للمنخرطين.',
            points: ['توجيه وإنصات حول حاجيات الصحة والرفاه.', 'معلومات حول الخدمات الطبية الاجتماعية المتاحة.', 'تنسيق مع فرق FOS-Agri والمنسقين الجهويين.']
          }
        ],
        partners: ['مختبرات التحاليل', 'مصحات وأشعة', 'أطباء بتعريفات تفضيلية', 'نظارات', 'صيدليات', 'مراكز الأسنان'],
        steps: [['التوجيه', 'تحديد الخدمة أو الشريك الطبي المناسب.'], ['الملف', 'تحضير الوثائق ومعطيات الانخراط.'], ['التكفل', 'اتباع مساطر AMC أو AMTS أو الاتفاقية.'], ['المنسق الجهوي', 'الاستفادة من القرب الجهوي.']]
      },
      zgh: {
        title: 'ⵜⴰⴷⵓⵙⵉ ⵜⴰⵎⴰⴷⴰⵏⵜ',
        meta: 'ⵜⴰⴷⵓⵙⵉ, ⴰⵎⵎⵓⵜⵜⵉ ⴷ ⵜⵓⴷⵔⵜ',
        summary: 'ⵜⴰⵏⴼⵓⵙⵜ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵜ ⴳ ⵜⴰⴷⵓⵙⵉ ⴷ ⵜⵉⵎⵓⵔⴰ.',
        stats: [['100%', 'AMC ⵙ ⵎⴽ ⵉⵍⵍⴰ ⴳ ⵓⵎⵙⴰⵡⴰⴹ'], ['1 MDH', 'ⴰⵙⵡⵉⵔ ⴰⴳⵔⴰⵡ ⵉ ⴽⵓ ⵢⴰⵏ'], ['5 000 DH', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵓⵙⵔⵓⵜ']],
        chips: ['ⵅⴼ ⵜⴰⵏⴼⵓⵜ', 'ⴰⵙⵙⵓⵔⴰⵏⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵎⵔⵏⴰⵡ', 'ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ', 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵎⵜⵜⴰⵏⵜ', 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ ⵙ ⵉⵙⵡⵉⵔⵏ ⵉⵎⵥⵍⵉⵢⵏ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏⵏ'],
        overview: 'FOS-Agri ⵜⵙⵙⵎⵓⵔⵙ ⵜⴰⴷⵓⵙⵉ ⵙ AMC, AMTS, ⴰⵎⵓⴷⴷⵓ médico-social ⴷ ⵉⵣⴷⴰⵢⵏ médicaux ⴳ ⵜⵎⵓⵔⴰ.',
        highlights: ['ⴰⵔⴰⵔⵓ ⵏ reste à charge ⵙ AMO/CNOPS.', 'AMTS ⵙ Wafa IMA Assistance.', '5 000 DH ⵉ ⵉⴼⵔⵅⴰⵏ ⴳ handicap.', 'ⵉⵣⴷⴰⵢⵏ ⴷ laboratoires, cliniques, médecins, opticiens.'],
        amcDetail: amcDetailZgh,
        features: [['ⵅⴼ ⵜⴰⵏⴼⵓⵜ', 'ⴰⵎⵓⴷⴷⵓ, ⴰⵙⴷⵓ ⴷ ⵜⵎⵙⵍⵉⵡⵜ.'], ['AMC', 'ⴰⵔⴰⵔⵓ ⵙ ⵎⴽ ⵉⵍⵍⴰ ⴳ ⵓⵎⵙⴰⵡⴰⴹ.'], ['AMTS', 'ⴰⵎⵓⴷⴷⵓ ⴰⵎⴰⴷⴰⵏ ⴷ transport sanitaire.'], ['ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⵙⵡⵉⵔⵏ ⵉⵎⵥⵍⵉⵢⵏ', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.'], ['ⵉⵎⵙⴰⵡⴰⴹⵏ médicaux', 'ⵉⵣⴷⴰⵢⵏ ⴳ ⵜⵎⵓⵔⴰ ⵎⴰⵔⵔⴰ.']],
        centerMedical: {
          badge: 'ⵅⴼ ⵜⴰⵏⴼⵓⵜ',
          title: 'ⴰⵎⵓⴷⴷⵓ ⴰⴷⴰⵡⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ',
          intro: 'FOS-Agri ⵜⵙⵙⵓⴼⵖ ⵜⴰⴷⵓⵙⵉ ⴷ ⴰⵙⵓⵔⵉⴼ ⴰⵎⵇⵔⴰⵏ ⵙ ⵓⵙⵎⵓⵜⵜⴳ ⵏ ⵜⵎⵓⵔⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ ⵉⵙⵎⵓⵏⵏ AMC, ⴰⵎⵓⴷⴷⵓ médico-social, AMTS ⴷ ⵉⵎⵙⴰⵡⴰⴹⵏ ⵉⴷⵓⵙⴰⵏⵏ ⴳ ⵜⵎⵓⵔⴰ ⵎⴰⵔⵔⴰ ⵙ ⵜⵉⵡⵉⵙⵉ ⵏ ⵉⵎⵙⵏⴰⵡⵏ ⵉⵏⵏⴰⵡⵏ.',
          items: [
            {
              icon: 'fa-shield-heart',
              title: 'AMC',
              body: [
                'FOS-Agri ⵜⴻⵜⵜⴰⵍⵍⴰⵍ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵉⵎⵓⵔⴰⵏ ⵏ ⵜⴰⴷⵓⵙⵉ ⵙ AMC ⵉ ⵓⵙⵖⵉⵎ ⵏ ⵜⴳⵯⵎⵉ ⵜⴰⴷⵓⵙⴰⵏⵜ ⵏ ⵜⵡⴰⵛⵓⵍⵜ.',
                'ⴰⵎⵙⴰⵡⴰⴹ ⴷ SAHAM Assurance ⵉⵜⵜⴰⵡⵙ ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ:'
              ],
              bullets: [
                'ⴰⵔⴰⵔⵓ ⵏ 100% ⵏ ticket modérateur ⵙ ⵓⵙⵎⵔⵙ ⵏ AMO/Mutuelle.',
                'ⴰⵔⴰⵔⵓ ⴰⴳⵔⴰⵡ ⵏ 1 MDH ⵉ ⴽⵓ ⵢⴰⵏ ⴳ ⵓⵙⴳⴳⵯⴰⵙ, ⵎⴰⵛⴰ greffes d’organes ⴰⵔ 250 000 DH.'
              ]
            },
            {
              icon: 'fa-truck-medical',
              navIndex: 2,
              title: 'AMTS',
              body: [
                'FOS-Agri ⵜⴻⵜⵜⴰⵍⵍⴰⵍ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴳ ⵉⵎⵓⵔⴰⵏ ⵉⵙⵙⴷⴰⵔⵏ ⵙ AMTS ⴷ Wafa IMA Assistance.',
                'ⵜⴰⵍⵍⴰⵍⵜ ⴰⴷ ⵜⵙⵎⵓⵏ ⵉⴳⵔⴰⵏ ⵏ accident, maladie, décès, ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ ⵖⵔ ⴱⵕⵕⴰ ⵉ ⵉⵎⵓⵔⴰⵏ ⵓⵔ ⵉⵜⵜⵓⵙⵙⵓⵊⵊⴰⵏ ⴳ ⵍⵎⵖⵔⵉⴱ.'
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
                'ⵜⴰⴱⵍⵓⵜ ⵏ ⵉⵎⵙⴰⵡⴰⴹⵏ (laboratoires, médecins, cabinets)'
              ]
            }
          ]
        },
        extraSections: [
          {
            navIndex: 3,
            badge: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵎⵜⵜⴰⵏⵜ',
            title: 'ⴰⵎⵓⴷⴷⵓ ⵏ ⵜⵎⵜⵜⴰⵏⵜ',
            intro: 'ⵜⴰⵙⵏⴰ ⴰⴷ ⵜⵇⵇⵏ ⵙ ⵜⵎⴰⵎⴽⵜ ⵏ forfait funéraire ⵉ ⵉⵎⵏⵅⵔⴰⵟⵏ.',
            points: ['ⵜⵉⵡⵜⵉⵍⵉⵏ ⵏ ⵓⵙⵎⵔⵙ ⴰⴷ ⵜⵜⵓⵙⵎⴷⵏⵜ ⵙ FOS-Agri.', 'ⵜⵉⵡⵔⵉⵇⵉⵏ ⴷ ⵜⵎⴰⵎⴽⵜ ⵏ ⵓⵙⵎⵓⵜⵜⴳ ⴰⴷ ⵜⵜⵓⵔⵏⴰⵏⵜ ⵎⴰⵢⴰⴷ ⵜⵜⵓⵙⵙⵏⵜ.', 'ⴰⵙⴷⵓ ⵖⵔ ⵓⵎⵙⵏⴰⵡ ⵏ ⵜⵎⵏⴰⴹⵜ ⵏⵖ ⴰⵙⵔⵓⵙ ⵉⵎⵥⵍⵉ.']
          },
          {
            navIndex: 4,
            badge: 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ',
            title: 'ⴰⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⴰⵏⴰⵎⵓⵏ',
            intro: 'ⵜⴰⵙⵏⴰ ⴰⴷ ⵜⵙⵎⵓⵏ ⵜⵉⵏⵖⵎⵉⵙⵉⵏ ⵏ centre médico-social ⴷ ⵓⵎⵓⴷⴷⵓ ⴰⵎⵇⵔⴰⵏ.',
            points: ['ⴰⵙⴷⵓ ⴷ ⵜⵎⵙⵍⵉⵡⵜ ⴳ ⵉⵙⵡⵉⵔⵏ ⵏ ⵜⴰⴷⵓⵙⵉ.', 'ⵜⵉⵏⵖⵎⵉⵙⵉⵏ ⵅⴼ ⵜⵏⴼⵓⵜⵉⵏ médico-sociales.', 'ⴰⵎⵢⴰⵡⴰⴹ ⴷ FOS-Agri ⴷ ⵉⵎⵙⵏⴰⵡⵏ ⵏ ⵜⵎⵏⴰⴹⵜ.']
          }
        ],
        partners: ['Laboratoires', 'Cliniques', 'Médecins', 'Opticiens', 'Pharmacies', 'Centres dentaires'],
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
      ar: null,
      zgh: null
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
      ar: null,
      zgh: null
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
      ar: null,
      zgh: null
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
      ar: null,
      zgh: null
    }
  };

  const controlledTranslations = {
    prevoyance: {
      zgh: {
        title: 'ⵜⴰⴷⵓⵙⵉ ⵜⴰⵎⴰⴷⴰⵏⵜ',
        meta: 'ⵜⴰⴷⵓⵙⵉ, ⴰⵎⵎⵓⵜⵜⵉ ⴷ ⵜⵓⴷⵔⵜ',
        summary: 'ⵜⴰⵏⴼⵓⵙⵜ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵜ ⴳ ⵜⴰⴷⵓⵙⵉ ⴷ ⵓⴹⵎⴰⵏ ⴰⵏⴰⵎⵓⵏ.',
        stats: [['100%', 'ⵏ ⵓⵙⵏⴰⵎ ⵉⵎⵎⵔⵏ ⵙ ⵓⵎⵙⴰⵡⴰⴹ'], ['1 MDH', 'ⴰⵙⵡⵉⵔ ⴰⴳⵔⴰⵡ ⵉ ⴽⵓ ⵢⴰⵏ'], ['5 000 DH', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⴳ ⵓⵙⵔⵓⵜ']],
        chips: ['ⴰⵎⵎⴰⵙ ⴰⵎⴰⴷⴰⵏ ⴰⵏⴰⵎⵓⵏ', 'ⴰⵙⵉⴽⵍ ⴰⴷⵓⵙⴰⵏ ⴰⵎⵙⵎⴰⴷ', 'ⵜⴰⵍⵍⴰⵍⵜ ⴷ ⵓⵙⵉⵡⴹ ⴰⴷⵓⵙⴰⵏ', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⴳ ⵓⵙⵔⵓⵜ', 'ⵉⵎⵙⴰⵡⴰⴹⵏ ⴷ ⵉⵣⴷⴰⵢⵏ ⵉⴷⵓⵙⴰⵏ'],
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

  function serviceText(key) {
    return services[key]?.[lang] || services[key]?.fr;
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

  function renderExtraPrestationSections(item) {
    if (!item.extraSections?.length || !item.chips?.length) return '';
    return item.extraSections.map((section, index) => {
      const firstIndex = item.chips.length - item.extraSections.length;
      const navIndex = Number.isInteger(section.navIndex) ? section.navIndex : firstIndex + index;
      return `
      <section class="section page-section-soft prestation-extra-section" id="${subrubriqueId(navIndex)}" data-prestation-extra-panel data-prestation-extra-index="${navIndex}" hidden>
        <div class="container">
          <article class="prestation-extra-card">
            <span class="section-tag"><i class="fa-solid ${subIcons.prevoyance?.[navIndex] || 'fa-circle-check'}" aria-hidden="true"></i> ${esc(section.badge)}</span>
            <h2>${esc(section.title)}</h2>
            <p>${esc(section.intro)}</p>
            ${section.points?.length ? `
            <ul class="prestation-extra-list">
              ${section.points.map((point) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>${esc(point)}</span></li>`).join('')}
            </ul>` : ''}
          </article>
        </div>
      </section>`;
    }).join('');
  }

  function setPanelVisibility(panel, visible) {
    if (!panel) return;
    panel.hidden = !visible;
    panel.classList.toggle('is-tab-active', visible);
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

  function renderDetail() {
    const mount = document.getElementById('prestation-detail-root');
    const key = body.dataset.service;
    if (!mount || !services[key]) return;
    const item = serviceText(key);
    const journeyIcons = ['fa-compass', 'fa-folder-open', 'fa-hand-holding-medical', 'fa-map-location-dot'];
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
          ${item.chips.slice(0, 3).map((_, index) => `<span><i class="fa-solid ${['fa-hand-holding-heart', 'fa-shield-heart', 'fa-people-group'][index]}" aria-hidden="true"></i></span>`).join('')}
        </div>
      </section>
      <section class="prestation-nav">
        <div class="container prestation-nav-inner ${item.chips.length > 5 ? 'is-split-nav' : ''}">
          ${item.chips.map((chip, index) => `
            <a class="prestation-nav-chip" href="#${subrubriqueId(index)}">
              <i class="fa-solid ${subIcons[key]?.[index] || 'fa-circle-check'}" aria-hidden="true"></i>
              <span>${esc(chip)}</span>
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
    const extraPanels = Array.from(mount.querySelectorAll('[data-prestation-extra-panel]'));
    const showTabContent = (index, link, shouldScroll = true) => {
      const isAmc = index === 1 && !!amcPanel;
      const extraPanel = extraPanels.find((panel) => Number(panel.dataset.prestationExtraIndex) === index);
      const isExtra = !!extraPanel;
      navLinks.forEach((item) => item.classList.remove('is-active'));
      if (link) link.classList.add('is-active');
      setPanelVisibility(centerPanel, !isAmc && !isExtra);
      setPanelVisibility(amcPanel, isAmc);
      extraPanels.forEach((panel) => setPanelVisibility(panel, panel === extraPanel));
      const scrollTarget = isAmc ? amcPanel : (isExtra ? extraPanel : (index === 0 ? centerPanel : document.getElementById(subrubriqueId(index))));
      if (!isAmc && !isExtra && index > 1) {
        const trigger = scrollTarget?.querySelector?.('.prestation-accordion-trigger');
        if (trigger && trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
      }
      if (window.history?.pushState) {
        const hash = isAmc ? subrubriqueId(index) : (scrollTarget?.id || subrubriqueId(index));
        window.history.pushState(null, '', `#${hash}`);
      }
      if (shouldScroll && scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
