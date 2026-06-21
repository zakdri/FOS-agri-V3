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
    prevoyance: ['fa-house-medical', 'fa-shield-heart', 'fa-truck-medical', 'fa-hands-holding-child', 'fa-file-contract'],
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

  const services = {
    prevoyance: {
      href: 'services/prevoyance.html',
      fr: {
        title: 'Prévoyance médico-sociale',
        meta: 'Santé, protection sociale et bien-être',
        summary: 'Un dispositif de santé et de protection sociale pour accompagner les adhérents et leurs familles face aux aléas médicaux, aux urgences et aux besoins spécifiques.',
        stats: [['100%', 'du ticket modérateur AMC selon contrat'], ['1 MDH', 'de plafond général annuel par personne'], ['5 000 DH', 'd’aide aux enfants en situation de handicap']],
        chips: ['Centre médico-social', 'Assurance Maladie Complémentaire', 'Assistance Médicale et Transport Sanitaire', 'Aide aux enfants des adhérents en situations d’handicap', 'Conventions et partenariats médicaux'],
        overview: 'La FOS-Agri a érigé le volet santé en priorité avec l’assurance maladie complémentaire, l’accompagnement médico-social, l’assistance médicale et le transport sanitaire, ainsi qu’un réseau de conventions médicales au niveau régional.',
        highlights: ['Remboursement ou prise en charge complémentaire en lien avec l’AMO/CNOPS.', 'Assistance médicale et transport sanitaire via Wafa IMA Assistance.', 'Aide de 5 000 DH pour les enfants des adhérents en situation de handicap.', 'Conventions avec laboratoires, cliniques, médecins, opticiens, pharmacies et centres de soins.'],
        features: [
          ['Centre médico-social', 'Accompagnement, orientation et écoute autour des besoins de santé et de bien-être des adhérents.'],
          ['Assurance Maladie Complémentaire', 'Sanlam Maroc rembourse ou prend en charge tout ou partie du reste à charge selon les taux, bases et plafonds contractuels.'],
          ['Assistance Médicale et Transport Sanitaire', 'Wafa IMA Assistance couvre les situations urgentes, les transports sanitaires, l’assistance à domicile et l’évacuation sanitaire selon conditions.'],
          ['Aide aux enfants en situation de handicap', 'Contribution à la prise en charge des besoins particuliers des enfants des adhérents.'],
          ['Conventions et partenariats médicaux', 'Réseau de prestataires répartis dans plusieurs régions du Royaume avec la contribution des relais régionaux.']
        ],
        partners: ['Laboratoires d’analyses', 'Cliniques et radiologie', 'Médecins à tarifs préférentiels', 'Opticiens', 'Pharmacies', 'Centres dentaires'],
        steps: [['Orientation', 'Identifier la prestation ou le partenaire médical adapté.'], ['Dossier', 'Préparer les pièces justificatives et les références d’adhésion.'], ['Prise en charge', 'Suivre les modalités AMC, AMTS ou convention médicale.'], ['Relais régional', 'S’appuyer sur les relais pour les conventions de proximité.']]
      },
      ar: {
        title: 'الوقاية الطبية والاجتماعية',
        meta: 'الصحة والحماية الاجتماعية والرفاه',
        summary: 'منظومة لمواكبة المنخرطين وأسرهم في الصحة والحماية الاجتماعية والحالات المستعجلة والاحتياجات الخاصة.',
        stats: [['100%', 'من الباقي على عاتق المنخرط حسب العقد'], ['1 مليون درهم', 'كسقف عام سنوي لكل شخص'], ['5 000 درهم', 'دعم للأطفال في وضعية إعاقة']],
        chips: ['المركز الطبي الاجتماعي', 'التأمين الصحي التكميلي', 'المساعدة والنقل الصحي', 'دعم الإعاقة', 'الشراكات الطبية'],
        overview: 'تضع FOS-Agri الصحة ضمن أولوياتها عبر التأمين الصحي التكميلي والمواكبة الطبية الاجتماعية والمساعدة الطبية والنقل الصحي وشبكة اتفاقيات طبية جهوية.',
        highlights: ['تعويض أو تحمل تكميلي بتنسيق مع AMO/CNOPS.', 'مساعدة طبية ونقل صحي عبر Wafa IMA Assistance.', 'دعم قدره 5 000 درهم للأطفال في وضعية إعاقة.', 'اتفاقيات مع مختبرات ومصحات وأطباء ونظارات وصيدليات ومراكز علاج.'],
        features: [['المركز الطبي الاجتماعي', 'استقبال وتوجيه ومواكبة حول حاجيات الصحة والرفاه.'], ['التأمين الصحي التكميلي', 'تعويض أو تحمل الباقي وفق الضمانات والأسقف التعاقدية.'], ['المساعدة الطبية والنقل الصحي', 'تغطية الحالات المستعجلة والنقل الصحي والمساعدة المنزلية والإجلاء الصحي وفق الشروط.'], ['دعم الأطفال في وضعية إعاقة', 'مساهمة في التكفل بالحاجيات الخاصة لأبناء المنخرطين.'], ['اتفاقيات طبية', 'شبكة مقدمي خدمات بعدة جهات بتنسيق مع المنسقين الجهويين.']],
        partners: ['مختبرات التحاليل', 'مصحات وأشعة', 'أطباء بتعريفات تفضيلية', 'نظارات', 'صيدليات', 'مراكز الأسنان'],
        steps: [['التوجيه', 'تحديد الخدمة أو الشريك الطبي المناسب.'], ['الملف', 'تحضير الوثائق ومعطيات الانخراط.'], ['التكفل', 'اتباع مساطر AMC أو AMTS أو الاتفاقية.'], ['المنسق الجهوي', 'الاستفادة من القرب الجهوي.']]
      },
      zgh: {
        title: 'ⵜⴰⴷⵓⵙⵉ ⵜⴰⵎⴰⴷⴰⵏⵜ',
        meta: 'ⵜⴰⴷⵓⵙⵉ, ⴰⵎⵎⵓⵜⵜⵉ ⴷ ⵜⵓⴷⵔⵜ',
        summary: 'ⵜⴰⵏⴼⵓⵙⵜ ⵉ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵜ ⴳ ⵜⴰⴷⵓⵙⵉ ⴷ ⵜⵉⵎⵓⵔⴰ.',
        stats: [['100%', 'AMC ⵙ ⵎⴽ ⵉⵍⵍⴰ ⴳ ⵓⵎⵙⴰⵡⴰⴹ'], ['1 MDH', 'ⴰⵙⵡⵉⵔ ⴰⴳⵔⴰⵡ ⵉ ⴽⵓ ⵢⴰⵏ'], ['5 000 DH', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵓⵙⵔⵓⵜ']],
        chips: ['Centre médico-social', 'AMC', 'AMTS', 'ⴰⵎⵓⴷⴷⵓ handicap', 'ⵉⵣⴷⴰⵢⵏ médicaux'],
        overview: 'FOS-Agri ⵜⵙⵙⵎⵓⵔⵙ ⵜⴰⴷⵓⵙⵉ ⵙ AMC, AMTS, ⴰⵎⵓⴷⴷⵓ médico-social ⴷ ⵉⵣⴷⴰⵢⵏ médicaux ⴳ ⵜⵎⵓⵔⴰ.',
        highlights: ['ⴰⵔⴰⵔⵓ ⵏ reste à charge ⵙ AMO/CNOPS.', 'AMTS ⵙ Wafa IMA Assistance.', '5 000 DH ⵉ ⵉⴼⵔⵅⴰⵏ ⴳ handicap.', 'ⵉⵣⴷⴰⵢⵏ ⴷ laboratoires, cliniques, médecins, opticiens.'],
        features: [['Centre médico-social', 'ⴰⵎⵓⴷⴷⵓ, ⴰⵙⴷⵓ ⴷ ⵜⵎⵙⵍⵉⵡⵜ.'], ['AMC', 'ⴰⵔⴰⵔⵓ ⵙ ⵎⴽ ⵉⵍⵍⴰ ⴳ ⵓⵎⵙⴰⵡⴰⴹ.'], ['AMTS', 'ⴰⵎⵓⴷⴷⵓ ⴰⵎⴰⴷⴰⵏ ⴷ transport sanitaire.'], ['ⴰⵎⵓⴷⴷⵓ handicap', 'ⴰⵎⵓⴷⴷⵓ ⵉ ⵉⴼⵔⵅⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.'], ['ⵉⵣⴷⴰⵢⵏ médicaux', 'ⵉⵣⴷⴰⵢⵏ ⴳ ⵜⵎⵓⵔⴰ ⵎⴰⵔⵔⴰ.']],
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
            <a class="btn btn-primary" href="#overview">${esc(t('details'))}</a>
            <a class="btn btn-secondary" href="../prestations.html">${esc(t('back'))}</a>
          </div>
        </div>
        <div class="prestation-floating-icons" aria-hidden="true">
          ${item.chips.slice(0, 3).map((_, index) => `<span><i class="fa-solid ${['fa-hand-holding-heart', 'fa-shield-heart', 'fa-people-group'][index]}" aria-hidden="true"></i></span>`).join('')}
        </div>
      </section>
      <section class="prestation-nav">
        <div class="container prestation-nav-inner">
          ${item.chips.map((chip, index) => `
            <a class="prestation-nav-chip" href="#${subrubriqueId(index)}">
              <i class="fa-solid ${subIcons[key]?.[index] || 'fa-circle-check'}" aria-hidden="true"></i>
              <span>${esc(chip)}</span>
            </a>`).join('')}
        </div>
      </section>
      <section class="section" id="overview">
        <div class="container prestation-content-grid">
          <article class="prestation-panel">
            <span class="section-tag"><i class="fa-solid ${icons[key]}" aria-hidden="true"></i> ${esc(item.meta)}</span>
            <h2>${esc(t('details'))}</h2>
            <p>${esc(item.overview)}</p>
          </article>
          <aside class="prestation-panel">
            <h3>${esc(t('highlights'))}</h3>
            <ul class="prestation-highlight-list">
              ${item.highlights.map((entry) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>${esc(entry)}</span></li>`).join('')}
            </ul>
          </aside>
        </div>
      </section>
      <section class="section page-section-soft" id="subrubriques">
        <div class="container">
          <div class="prestation-section-head centered">
            <h2>${esc(t('subrubriques'))}</h2>
            <p>${esc(item.summary)}</p>
          </div>
          <div class="prestation-feature-grid">
            ${item.features.map(([title, body], index) => `
              <article class="prestation-feature-card" id="${subrubriqueId(index)}">
                <span class="page-card-icon"><i class="fa-solid ${subIcons[key]?.[index] || 'fa-circle-check'}" aria-hidden="true"></i></span>
                <h3>${esc(title)}</h3>
                <p>${esc(body)}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>
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
      </section>
      <section class="section page-section-soft" id="steps">
        <div class="container">
          <div class="prestation-section-head">
            <h2>${esc(t('steps'))}</h2>
            <p>${esc(t('flowBody'))}</p>
          </div>
          <div class="prestation-timeline">
            ${item.steps.map(([title, body]) => `<article class="prestation-timeline-item"><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`).join('')}
          </div>
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
    navLinks.forEach((link, index) => {
      link.classList.toggle('is-active', index === 0);
      link.addEventListener('click', () => {
        navLinks.forEach((item) => item.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    });
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
