(function () {
  const root = document.getElementById('adhesion-root');
  if (!root) return;

  const body = document.body;
  const html = document.documentElement;
  const supported = ['fr', 'ar', 'zgh'];
  const base = body.dataset.base || '';
  const overviewHeroImage = 'assets/images/adhesion-hero.png';
  let lang = getLang();

  const copy = {
    fr: {
      kicker: 'Adhésion',
      title: 'Adhérents, bénéficiaires et procédures',
      body: "Conditions d'adhésion, pièces à fournir et cotisations de la Fondation.",
      explore: 'Voir les rubriques',
      contact: 'Nous contacter',
      discover: 'Découvrir',
      back: 'Toutes les rubriques',
      details: 'Détails',
      overviewTitle: 'Choisir une rubrique',
      overviewBody: "Chaque rubrique dispose désormais de sa page dédiée, avec le contenu, les pièces et les informations associées.",
      documents: 'Documents à télécharger',
      download: 'Télécharger',
      monthly: 'Mensuel',
      orientationTitle: 'Besoin d’une orientation ?',
      orientationBody: 'Les relais régionaux et les équipes FOS-Agri peuvent orienter chaque adhérent selon sa situation.',
      orientationCta: 'Demander une orientation',
      relays: 'Relais régionaux'
    },
    ar: {
      kicker: 'الانخراط',
      title: 'المنخرطون والمستفيدون والمساطر',
      body: 'شروط الانخراط، الوثائق المطلوبة، والاشتراكات الخاصة بالمؤسسة.',
      explore: 'عرض المحاور',
      contact: 'اتصل بنا',
      discover: 'اكتشف',
      back: 'كل المحاور',
      details: 'التفاصيل',
      overviewTitle: 'اختيار محور',
      overviewBody: 'لكل محور صفحة مخصصة تتضمن المحتوى والوثائق والمعلومات المرتبطة به.',
      documents: 'الوثائق للتحميل',
      download: 'تحميل',
      monthly: 'شهريا',
      orientationTitle: 'تحتاج إلى توجيه؟',
      orientationBody: 'يمكن للمنسقين الجهويين وفرق FOS-Agri توجيه كل منخرط حسب وضعيته.',
      orientationCta: 'طلب التوجيه',
      relays: 'المنسقون الجهويون'
    },
    zgh: {
      kicker: 'ⴰⵎⵓⵏ',
      title: 'ⵉⵎⵓⵏⵏ, ⵉⵎⵙⴼⵔⴽⵏ ⴷ ⵜⵎⵙⵙⴰⵔⵉⵏ',
      body: 'ⵜⵉⵡⵜⵜⴰⵙ ⵏ ⵓⵎⵓⵏ, ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵉⵍⴰⵇⵏ, ⴷ ⵜⵉⵡⵙⵉⵡⵉⵏ ⵏ ⵜⵙⴷⴰⵡⵉⵜ.',
      explore: 'ⵥⵕ ⵜⵉⵙⴳⴰⵔ',
      contact: 'ⵎⵢⴰⵡⴰⵍ',
      discover: 'ⵙⵙⵏ',
      back: 'ⴽⵓ ⵜⵉⵙⴳⴰⵔ',
      details: 'ⵜⴰⵍⵇⴰⵢⵜ',
      overviewTitle: 'ⴼⵔⵏ ⵜⴰⵙⴳⴰ',
      overviewBody: 'ⴽⵓ ⵜⴰⵙⴳⴰ ⵜⴰⵍⵍⴰ ⴷⴰⵔⵙ ⵜⴰⵙⵏⴰ ⵏⵏⵙ ⵙ ⵓⴳⴱⵓⵔ, ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⴷ ⵉⵙⴰⵍⵍⵏ.',
      documents: 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⴰⴷⴰⵔ',
      download: 'ⵙⴰⴷⴰⵔ',
      monthly: 'ⴽⵓ ⴰⵢⵢⵓⵔ',
      orientationTitle: 'ⵜⴻⵔⵉⴷ ⴰⵙⵎⵓⵜⵜⴳ?',
      orientationBody: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ ⴷ ⵜⵔⴱⴰⵜⵉⵏ ⵏ FOS-Agri ⵣⵎⵔⵏ ⴰⴷ ⵙⵎⵓⵜⵜⴳⵏ ⴽⵓ ⴰⵎⵓⵏ ⵙ ⵜⵎⵙⵍⴰ ⵏⵏⵙ.',
      orientationCta: 'ⵙⵙⵓⵜⵔ ⴰⵙⵎⵓⵜⵜⴳ',
      relays: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ'
    }
  };

  const sections = [
    {
      id: 'adherents-beneficiaires',
      page: 'adhesion/adherents-beneficiaires.html',
      icon: 'fa-users',
      heroIcon: 'fa-hand-holding-heart',
      image: 'assets/images/adhesion-adherents-beneficiaires.png',
      title: {
        fr: 'Nos adhérents & bénéficiaires',
        ar: 'المنخرطون والمستفيدون',
        zgh: 'ⵉⵎⵓⵏⵏ ⴷ ⵉⵎⵙⴼⵔⴽⵏ'
      },
      eyebrow: {
        fr: 'Bénéficiaires',
        ar: 'المستفيدون',
        zgh: 'ⵉⵎⵙⴼⵔⴽⵏ'
      },
      summary: {
        fr: "Trois situations d'adhésion sont prévues : personnel en activité, organismes sous tutelle et retraités.",
        ar: 'تغطي وضعيات الانخراط الموظفين العاملين، المؤسسات تحت الوصاية، والمتقاعدين.',
        zgh: 'ⵍⵍⴰⵏⵜ ⴽⵕⴰⴹⵜ ⵜⵎⵙⵍⴰⵜⵉⵏ: ⵉⵎⵙⵡⵓⵔⵉⵢⵏ, ⵜⵉⵎⵙⵙⵉⵡⵉⵏ ⴷⴷⴰⵡ ⵓⵙⵏⴼⵍ, ⴷ ⵉⵎⴷⴽⴽⵯⴰⵍⵏ.'
      },
      cards: [
        card('active', 'fa-user-check', 'Personnel en activité', 'الموظفون العاملون', 'ⵉⵎⵙⵡⵓⵔⵉⵢⵏ',
          "Adhérent d'office : tout le personnel actif du Département de l'Agriculture, ainsi que leurs conjoints et enfants.",
          'منخرطون تلقائيا: كل موظفي قطاع الفلاحة العاملين، إضافة إلى الأزواج والأبناء.',
          'ⴰⵎⵓⵏ ⴰⵡⵔⵎⴰⵏ: ⴽⵓ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵏ ⵓⴳⵣⵣⵓⵎ ⵏ ⵜⴼⵍⴰⵃⵜ, ⴷ ⵉⵙⵍⴰⵏ ⴷ ⵜⴰⵔⵡⴰ ⵏⵏⵙⵏ.'),
        card('tutelle', 'fa-building-user', 'Organismes sous tutelle', 'المؤسسات تحت الوصاية', 'ⵜⵉⵎⵙⵙⵉⵡⵉⵏ ⴷⴷⴰⵡ ⵓⵙⵏⴼⵍ',
          "Adhésion au choix et sur demande pour le personnel des établissements sous tutelle du Département, leurs conjoints et enfants, après signature d'une convention entre la FOS-Agri et l'administration de l'établissement.",
          'انخراط اختياري وبطلب لموظفي المؤسسات الخاضعة لوصاية القطاع، وأزواجهم وأبنائهم، بعد توقيع اتفاقية بين FOS-Agri وإدارة المؤسسة المعنية.',
          'ⴰⵎⵓⵏ ⵙ ⵓⴼⵔⴰⵏ ⴷ ⵓⵙⵙⵓⵜⵔ ⵉ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵏ ⵜⵎⵙⵙⵉⵡⵉⵏ ⴷⴷⴰⵡ ⵓⵙⵏⴼⵍ, ⴷ ⵉⵙⵍⴰⵏ ⴷ ⵜⴰⵔⵡⴰ ⵏⵏⵙⵏ.'),
        card('retraites', 'fa-person-cane', 'Retraités', 'المتقاعدون', 'ⵉⵎⴷⴽⴽⵯⴰⵍⵏ',
          'Adhésion au choix pour les retraités du Département, après validation du montant de prélèvement mensuel auprès de la CMR.',
          'انخراط اختياري لمتقاعدي القطاع، بعد المصادقة على مبلغ الاقتطاع الشهري لدى الصندوق المغربي للتقاعد CMR.',
          'ⴰⵎⵓⵏ ⵙ ⵓⴼⵔⴰⵏ ⵉ ⵉⵎⴷⴽⴽⵯⴰⵍⵏ ⵏ ⵓⴳⵣⵣⵓⵎ, ⵎⴱⴰⵄⴷ ⴰⵙⵙⵔⵙ ⵏ ⵓⵎⵟⵟⵓⵏ ⵏ ⵓⵙⵉⵣⴷⴳ ⴰⵢⵢⵓⵔⴰⵏ ⴷⴰⵔ CMR.')
      ]
    },
    {
      id: 'procedure-adhesion',
      page: 'adhesion/procedure-adhesion.html',
      icon: 'fa-file-signature',
      heroIcon: 'fa-folder-open',
      image: 'assets/images/adhesion-procedure.png',
      title: {
        fr: "Procédure d'adhésion",
        ar: 'مسطرة الانخراط',
        zgh: 'ⵜⴰⵎⵙⵙⴰⵔⵜ ⵏ ⵓⵎⵓⵏ'
      },
      eyebrow: {
        fr: 'Pièces à fournir',
        ar: 'الوثائق المطلوبة',
        zgh: 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵉⵍⴰⵇⵏ'
      },
      summary: {
        fr: 'Les pièces à fournir dépendent de votre situation.',
        ar: 'تختلف الوثائق المطلوبة حسب وضعيتكم.',
        zgh: 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵉⵍⴰⵇⵏ ⴱⴷⴷⵍⵏⵜ ⵙ ⵜⵎⵙⵍⴰ ⵏⵏⵓⵏ.'
      },
      groups: [
        {
          id: 'active',
          icon: 'fa-user-check',
          title: { fr: 'Personnel en activité', ar: 'الموظفون العاملون', zgh: 'ⵉⵎⵙⵡⵓⵔⵉⵢⵏ' },
          intro: {
            fr: "Le personnel en activité est adhérent d'office. Il doit fournir les pièces suivantes pour l'activation de son adhésion :",
            ar: 'الموظف العامل منخرط تلقائيا. يجب عليه تقديم الوثائق التالية لتفعيل انخراطه:',
            zgh: 'ⴰⵎⵙⵡⵓⵔⵉ ⴰⵎⵓⵏ ⴰⵡⵔⵎⴰⵏ. ⵉⵍⴰⵇ ⴰⴷ ⵉⵙⵙⵓⴼⵖ ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⴰⴷ ⴰⴼⴰⴷ ⴰⴷ ⵉⵙⵙⵏⴽⵔ ⴰⵎⵓⵏ ⵏⵏⵙ:'
          },
          items: [
            item("Fiche d'adhésion", 'بطاقة الانخراط', 'ⵜⴰⴼⵔⴽⵜ ⵏ ⵓⵎⵓⵏ', 'assets/adhesion/procedure/fiche-adhesion.pdf'),
            item("Bulletin individuel d'adhésion", 'النشرة الفردية للانخراط', 'ⴰⴱⵓⵍⵜⵉⵏ ⴰⴼⵔⴷⴰⵏ ⵏ ⵓⵎⵓⵏ', 'assets/adhesion/procedure/bulletin-individuel-adhesion.pdf'),
            item('Chèque barré ou RIB', 'شيك مسطر أو RIB', 'ⵛⵉⴽ ⴰⵙⵟⵟⴰⵔ ⵏⵖ RIB'),
            item("Pièces justificatives des enfants et conjoints (copie du livret de famille ou de l'acte de mariage, actes de naissance des enfants)", 'وثائق إثبات الأبناء والأزواج (نسخة من دفتر العائلة أو عقد الزواج، وعقود ازدياد الأبناء)', 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵙⵏⴼⵍ ⵏ ⵜⴰⵔⵡⴰ ⴷ ⵉⵙⵍⴰⵏ')
          ]
        },
        {
          id: 'tutelle',
          icon: 'fa-building-user',
          title: { fr: 'Organismes sous tutelle', ar: 'المؤسسات تحت الوصاية', zgh: 'ⵜⵉⵎⵙⵙⵉⵡⵉⵏ ⴷⴷⴰⵡ ⵓⵙⵏⴼⵍ' },
          intro: {
            fr: "Procédure définie et arrêtée en concertation avec l'administration des établissements sous tutelle concernés.",
            ar: 'مسطرة محددة ومتفق عليها بتنسيق مع إدارة المؤسسات المعنية الخاضعة للوصاية.',
            zgh: 'ⵜⴰⵎⵙⵙⴰⵔⵜ ⵜⵜⵓⵙⵙⴽⴰⵔ ⴷ ⵜⵜⵓⵙⵙⴼⵔⴰ ⵙ ⵓⵎⵙⴰⵡⴰⵍ ⴷ ⵜⵏⴱⴰⴹⵜ ⵏ ⵜⵎⵙⵙⵉⵡⵉⵏ.'
          },
          cta: true,
          items: []
        },
        {
          id: 'prolongation',
          icon: 'fa-clock-rotate-left',
          title: { fr: "Prolongation d'adhésion pour futurs retraités", ar: 'تمديد الانخراط للمقبلين على التقاعد', zgh: 'ⴰⵙⵉⵖⵣⴼ ⵏ ⵓⵎⵓⵏ ⵉ ⵉⵎⴷⴽⴽⵯⴰⵍⵏ ⵉⴷⴷⵓⵙⵏ' },
          items: [
            item("Demande de prolongation d'adhésion après la mise en retraite, précisant le numéro de téléphone et les adresses email et postale", 'طلب تمديد الانخراط بعد الإحالة على التقاعد، مع تحديد رقم الهاتف والعنوان الإلكتروني والبريدي', 'ⴰⵙⵙⵓⵜⵔ ⵏ ⵓⵙⵉⵖⵣⴼ ⵏ ⵓⵎⵓⵏ ⵎⴱⴰⵄⴷ ⵜⴰⴽⵛⵛⵓⵎⵜ ⵖⵔ ⵜⵎⴷⴽⴽⵯⴰⵍⵜ'),
            item("Autorisation de précompte légalisée, en deux copies, à transmettre via l'administration (bordereau) 3 mois avant la date d'effet de la sortie de service", 'إذن بالاقتطاع مصادق عليه، في نسختين، يرسل عبر الإدارة (بيان إرسال) 3 أشهر قبل تاريخ سريان مغادرة الخدمة', 'ⵜⴰⵙⵔⴰⴳⵜ ⵏ ⵓⵙⵉⵣⴷⴳ ⵜⵜⵓⵙⵙⴷⵖⵔⵜ, ⵙ ⵙⵉⵏ ⵉⵙⵓⵖⴰⵍ, ⴰⴷ ⵜⵜⵓⵣⵏ ⵙ ⵜⵏⴱⴰⴹⵜ 3 ⵉⵢⵢⵓⵔⵏ ⴷⴰⵜ ⵡⴰⵙⵙ ⵏ ⵓⴼⵓⵖ', 'assets/adhesion/procedure/autorisation-precompte.pdf')
          ]
        },
        {
          id: 'retraites',
          icon: 'fa-person-cane',
          title: { fr: 'Retraités', ar: 'المتقاعدون', zgh: 'ⵉⵎⴷⴽⴽⵯⴰⵍⵏ' },
          items: [
            item("Demande d'adhésion à la FOS-Agri", 'طلب الانخراط في FOS-Agri', 'ⴰⵙⵙⵓⵜⵔ ⵏ ⵓⵎⵓⵏ ⴳ FOS-Agri'),
            item("Fiche de demande d'adhésion, précisant le numéro de téléphone et l'adresse email et postale", 'بطاقة طلب الانخراط، مع تحديد رقم الهاتف والعنوان الإلكتروني والبريدي', 'ⵜⴰⴼⵔⴽⵜ ⵏ ⵓⵙⵙⵓⵜⵔ ⵏ ⵓⵎⵓⵏ', 'assets/adhesion/procedure/fiche-adhesion-retraite.pdf'),
            item('Chèque barré ou attestation de RIB', 'شيك مسطر أو شهادة RIB', 'ⵛⵉⴽ ⴰⵙⵟⵟⴰⵔ ⵏⵖ ⵜⴰⵙⴽⵉⵏⵜ ⵏ RIB'),
            item('Attestation de pension', 'شهادة التقاعد', 'ⵜⴰⵙⴽⵉⵏⵜ ⵏ ⵜⵎⴷⴽⴽⵯⴰⵍⵜ'),
            item('Autorisation de précompte, en deux copies', 'إذن بالاقتطاع، في نسختين', 'ⵜⴰⵙⵔⴰⴳⵜ ⵏ ⵓⵙⵉⵣⴷⴳ, ⵙ ⵙⵉⵏ ⵉⵙⵓⵖⴰⵍ'),
            item("Pièces justificatives des enfants et conjoints (copie du livret de famille ou de l'acte de mariage, actes de naissance des enfants)", 'وثائق إثبات الأبناء والأزواج (نسخة من دفتر العائلة أو عقد الزواج، وعقود ازدياد الأبناء)', 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵙⵏⴼⵍ ⵏ ⵜⴰⵔⵡⴰ ⴷ ⵉⵙⵍⴰⵏ')
          ]
        }
      ]
    },
    {
      id: 'cotisations',
      page: 'adhesion/cotisations.html',
      icon: 'fa-coins',
      heroIcon: 'fa-scale-balanced',
      image: 'assets/images/adhesion-cotisations.png',
      title: { fr: 'Cotisations', ar: 'الاشتراكات', zgh: 'ⵜⵉⵡⵙⵉⵡⵉⵏ' },
      eyebrow: { fr: 'Contribution mensuelle', ar: 'المساهمة الشهرية', zgh: 'ⵜⴰⵡⵙⵉⵡⵜ ⵜⴰⵢⵢⵓⵔⴰⵏⵜ' },
      summary: {
        fr: "Le montant de la cotisation mensuelle dépend de l'échelle ou du grade de l'adhérent.",
        ar: 'يعتمد مبلغ الاشتراك الشهري على السلم أو الدرجة الخاصة بالمنخرط.',
        zgh: 'ⴰⵎⵟⵟⵓⵏ ⵏ ⵜⴰⵡⵙⵉⵡⵜ ⵜⴰⵢⵢⵓⵔⴰⵏⵜ ⵉⵜⵜⵓⵙⵏ ⵙ ⵓⵙⴽⴰⵍⴰ ⵏⵖ ⵜⴰⴷⵔⴰⴷⵜ ⵏ ⵓⵎⵓⵏ.'
      },
      fees: [
        fee('Catégorie 1 : Échelles 6 et 7', 'الفئة 1: السلمان 6 و7', 'ⵜⴰⴳⴳⴰⵢⵜ 1: ⵉⵙⴽⴰⵍⴰⵏ 6 ⴷ 7', '20.00 DH'),
        fee('Catégorie 2 : Échelles 8 et 9', 'الفئة 2: السلمان 8 و9', 'ⵜⴰⴳⴳⴰⵢⵜ 2: ⵉⵙⴽⴰⵍⴰⵏ 8 ⴷ 9', '30.00 DH'),
        fee('Catégorie 3 : Échelle 10', 'الفئة 3: السلم 10', 'ⵜⴰⴳⴳⴰⵢⵜ 3: ⴰⵙⴽⴰⵍⴰ 10', '45.00 DH'),
        fee('Catégorie 4 : Échelle 11', 'الفئة 4: السلم 11', 'ⵜⴰⴳⴳⴰⵢⵜ 4: ⴰⵙⴽⴰⵍⴰ 11', '70.00 DH'),
        fee('Catégorie 5 : Hors Échelle Premier Grade', 'الفئة 5: خارج السلم الدرجة الأولى', 'ⵜⴰⴳⴳⴰⵢⵜ 5: ⴱⵕⵕⴰ ⵏ ⵓⵙⴽⴰⵍⴰ ⵜⴰⴷⵔⴰⴷⵜ ⵜⴰⵎⵣⵡⴰⵔⵓⵜ', '100.00 DH'),
        fee('Catégorie 6 : Hors Échelle Grade Principal', 'الفئة 6: خارج السلم الدرجة الرئيسية', 'ⵜⴰⴳⴳⴰⵢⵜ 6: ⴱⵕⵕⴰ ⵏ ⵓⵙⴽⴰⵍⴰ ⵜⴰⴷⵔⴰⴷⵜ ⵜⴰⵎⵇⵔⴰⵏⵜ', '120.00 DH')
      ]
    }
  ];

  function card(id, icon, frTitle, arTitle, zghTitle, frBody, arBody, zghBody) {
    return {
      id,
      icon,
      title: { fr: frTitle, ar: arTitle, zgh: zghTitle },
      body: { fr: frBody, ar: arBody, zgh: zghBody }
    };
  }

  function item(fr, ar, zgh, href) {
    return { label: { fr, ar, zgh }, href };
  }

  function fee(fr, ar, zgh, amount) {
    return { label: { fr, ar, zgh }, amount };
  }

  function getLang() {
    let stored = null;
    try { stored = localStorage.getItem('fosagri-lang'); } catch (_) { stored = null; }
    return supported.includes(stored) ? stored : (supported.includes(html.lang) ? html.lang : 'fr');
  }

  function tr(value) {
    return value?.[lang] || value?.fr || '';
  }

  function t(key) {
    return copy[lang]?.[key] || copy.fr[key] || '';
  }

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function url(path) {
    return `${base}${path}`;
  }

  function imageUrl(section) {
    return url(section.image);
  }

  function heroBackgroundUrl(section, detail) {
    const path = detail ? section.image : overviewHeroImage;
    return base ? url(path) : `../${path}`;
  }

  function currentSection() {
    const id = body.dataset.adhesionSection;
    return sections.find((section) => section.id === id) || sections[0];
  }

  function applyChrome(section) {
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    body.dataset.lang = lang;
    document.title = `FOS-Agri | ${tr(section?.title) || t('kicker')}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', section ? tr(section.summary) : t('body'));
  }

  function hero(section, detail = false) {
    const active = section || sections[0];
    const heroBg = heroBackgroundUrl(active, detail);
    return `
      <section class="adhesion-detail-hero${detail ? ' is-detail' : ''}" style="--hero-image: url('${esc(heroBg)}')">
        <div class="container">
          <span class="page-kicker"><i class="fa-solid ${esc(active.heroIcon || 'fa-id-card')}" aria-hidden="true"></i> ${esc(detail ? tr(active.eyebrow) : t('kicker'))}</span>
          <h1>${esc(detail ? tr(active.title) : t('title'))}</h1>
          <p>${esc(detail ? tr(active.summary) : t('body'))}</p>
          <div class="adhesion-hero-actions">
            <a class="btn btn-primary" href="${detail ? '#adhesion-detail-content' : '#adhesion-catalog'}">${esc(detail ? t('details') : t('explore'))}</a>
            <a class="btn btn-secondary" href="${detail ? url('adhesion.html') : 'contact.html'}">${esc(detail ? t('back') : t('contact'))}</a>
          </div>
        </div>
        <div class="adhesion-floating-icons" aria-hidden="true">
          ${sections.map((item) => `<span><i class="fa-solid ${esc(item.icon)}"></i></span>`).join('')}
        </div>
      </section>`;
  }

  function catalogCard(section) {
    return `
      <article class="adhesion-catalog-card">
        <a href="${esc(section.page)}">
          <span class="adhesion-catalog-media" style="--image: url('${esc(imageUrl(section))}')">
            <img src="${esc(imageUrl(section))}" alt="${esc(tr(section.title))}" loading="lazy" decoding="async" />
            <span><i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i></span>
          </span>
          <span class="adhesion-catalog-body">
            <small>${esc(tr(section.eyebrow))}</small>
            <strong>${esc(tr(section.title))}</strong>
            <span>${esc(tr(section.summary))}</span>
            <em>${esc(t('discover'))} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></em>
          </span>
        </a>
      </article>`;
  }

  function renderCatalog() {
    applyChrome(null);
    root.innerHTML = `
      ${hero(null, false)}
      <section class="section page-section-soft" id="adhesion-catalog">
        <div class="container">
          <div class="adhesion-section-head centered">
            <span class="section-tag"><i class="fa-solid fa-compass" aria-hidden="true"></i> FOS-Agri</span>
            <h2>${esc(t('overviewTitle'))}</h2>
            <p>${esc(t('overviewBody'))}</p>
          </div>
          <div class="adhesion-catalog-grid">
            ${sections.map(catalogCard).join('')}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="adhesion-cta-panel">
            <div>
              <h2>${esc(t('orientationTitle'))}</h2>
              <p>${esc(t('orientationBody'))}</p>
            </div>
            <a class="btn btn-primary" href="contact.html">${esc(t('orientationCta'))}</a>
          </div>
        </div>
      </section>`;
  }

  function detailNav(active) {
    return `
      <section class="adhesion-detail-nav" aria-label="${esc(t('overviewTitle'))}">
        <div class="container adhesion-detail-nav-inner">
          ${sections.map((section) => `
            <a class="adhesion-nav-chip${section.id === active.id ? ' is-active' : ''}" href="${esc(url(section.page))}" ${section.id === active.id ? 'aria-current="page"' : ''}>
              <i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i>
              <span>${esc(tr(section.title))}</span>
            </a>`).join('')}
        </div>
      </section>`;
  }

  function renderAdherents(section) {
    return `
      <section class="section page-section-soft" id="adhesion-detail-content">
        <div class="container">
          <div class="adhesion-section-head">
            <span class="section-tag"><i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i> ${esc(tr(section.eyebrow))}</span>
            <h2>${esc(tr(section.title))}</h2>
            <p>${esc(tr(section.summary))}</p>
          </div>
          <div class="adhesion-feature-grid">
            ${section.cards.map((entry) => `
              <article class="adhesion-feature-card" id="${esc(entry.id)}">
                <span class="adhesion-card-icon"><i class="fa-solid ${esc(entry.icon)}" aria-hidden="true"></i></span>
                <h3>${esc(tr(entry.title))}</h3>
                <p>${esc(tr(entry.body))}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>`;
  }

  function renderDocRow(entry) {
    return `
      <li>
        <span>${esc(tr(entry.label))}</span>
        ${entry.href ? `<a class="adhesion-download" href="${esc(url(entry.href))}" download><i class="fa-solid fa-download" aria-hidden="true"></i>${esc(t('download'))}</a>` : ''}
      </li>`;
  }

  function renderProcedure(section) {
    return `
      <section class="section page-section-soft" id="adhesion-detail-content">
        <div class="container">
          <div class="adhesion-section-head">
            <span class="section-tag"><i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i> ${esc(tr(section.eyebrow))}</span>
            <h2>${esc(tr(section.title))}</h2>
            <p>${esc(tr(section.summary))}</p>
          </div>
          <div class="adhesion-procedure-grid">
            ${section.groups.map((group) => `
              <article class="adhesion-procedure-card" id="${esc(group.id)}">
                <span class="adhesion-card-icon"><i class="fa-solid ${esc(group.icon)}" aria-hidden="true"></i></span>
                <h3>${esc(tr(group.title))}</h3>
                ${group.intro ? `<p>${esc(tr(group.intro))}</p>` : ''}
                ${group.items.length ? `<ul class="adhesion-doc-list">${group.items.map(renderDocRow).join('')}</ul>` : ''}
                ${group.cta ? `<div class="adhesion-card-actions"><a class="btn btn-primary" href="${esc(url('contact.html'))}">${esc(t('orientationCta'))}</a></div>` : ''}
              </article>`).join('')}
          </div>
        </div>
      </section>`;
  }

  function renderCotisations(section) {
    return `
      <section class="section page-section-soft" id="adhesion-detail-content">
        <div class="container">
          <div class="adhesion-section-head">
            <span class="section-tag"><i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i> ${esc(tr(section.eyebrow))}</span>
            <h2>${esc(tr(section.title))}</h2>
            <p>${esc(tr(section.summary))}</p>
          </div>
          <div class="adhesion-fee-grid">
            ${section.fees.map((entry) => `
              <article class="adhesion-fee-card">
                <h3>${esc(tr(entry.label))}</h3>
                <div class="adhesion-fee-amount">
                  <small>${esc(t('monthly'))}</small>
                  <strong>${esc(entry.amount)}</strong>
                </div>
              </article>`).join('')}
          </div>
          <div class="adhesion-cta-panel">
            <div>
              <h2>${esc(t('orientationTitle'))}</h2>
              <p>${esc(t('orientationBody'))}</p>
            </div>
            <a class="btn btn-primary" href="${esc(url('contact.html#relais-regionaux'))}">${esc(t('relays'))}</a>
          </div>
        </div>
      </section>`;
  }

  function renderDetail() {
    const section = currentSection();
    applyChrome(section);
    const bodyHtml = section.cards ? renderAdherents(section) : (section.groups ? renderProcedure(section) : renderCotisations(section));
    root.innerHTML = `${hero(section, true)}${detailNav(section)}${bodyHtml}`;
  }

  function render() {
    lang = getLang();
    if (body.dataset.adhesionSection) renderDetail();
    else renderCatalog();
  }

  window.addEventListener('fosagri:lang-change', render);
  render();
})();
