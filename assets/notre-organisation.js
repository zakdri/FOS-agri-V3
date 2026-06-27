/* ============================================================
 *  Notre organisation — data + renderer
 *  ------------------------------------------------------------
 *  Static (Phase 1, no backend) but designed to plug into a
 *  dashboard / CMS later:
 *
 *    1. Override at load time:
 *         window.FOSAGRI_ORG_DATA = { leadership: [...], directions: [...] }
 *       BEFORE this file runs (or before DOMContentLoaded).
 *
 *    2. Wire a real API: replace `loadOrgData()` below with a
 *       fetch('/api/organization') call. The renderer already
 *       handles loading / empty / error states.
 *
 *    3. Each node uses translation keys (titleKey, nameKey…) so
 *       the dashboard only stores stable IDs while the actual
 *       strings live in the I18N dictionary below — the same
 *       data is immediately multilingual.
 * ============================================================ */
(function () {
  'use strict';

  /* ----- Supported languages (mirror of secondary-pages.js) ----- */
  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  function currentLang() {
    const html = document.documentElement.lang;
    if (SUPPORTED.includes(html)) return html;
    const stored = localStorage.getItem('fosagri-lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  /* ============================================================
   * I18N — missing keys fall back to French, then to the key.
   * ============================================================ */
  const I18N = {
    fr: {
      'page.title': 'Notre organisation',
      'breadcrumb.label': "Fil d'Ariane",
      'breadcrumb.home': 'Accueil',
      'breadcrumb.foundation': 'La Fondation',
      'breadcrumb.organization': 'Notre organisation',

      'hero.kicker': 'Gouvernance & organisation',
      'hero.lead': "Découvrez la structure de la Fondation FOS-Agri : présidence, secrétariat général, directions opérationnelles et services dédiés à nos adhérents.",

      'sections.chart.tag': 'Organigramme',
      'sections.chart.title': 'Notre organisation',
      'sections.chart.intro': "Une organisation pensée pour la proximité, la performance et la qualité de service.",
      'sections.chart.ariaChart': 'Organigramme FOS-Agri',

      'status.loading': "Chargement de l'organigramme…",
      'status.empty': "Aucune donnée d'organisation disponible.",
      'status.error': "Impossible de charger l'organigramme.",
      'status.vacant': 'Poste vacant',
      'status.noServices': 'Aucun service à afficher.',

      'cta.title': 'Une question sur notre organisation ?',
      'cta.subtitle': 'Notre équipe est à votre écoute pour toute demande.',
      'cta.button': 'Nous contacter',

      /* Leadership */
      'org.president.title': 'Président de la Fondation',
      'org.president.name': 'M. ADIL EL OUAARI',
      'org.committee.title': 'Comité de direction',
      'org.audit.title': "Service de l'audit & contrôle de gestion",
      'org.sg.title': 'Secrétaire générale',
      'org.sg.name': 'Mme Neilya AMARA',
      'org.communication.title': 'Service de la communication',

      /* Directions */
      'org.dir.prestations.title': 'Direction des prestations',
      'org.dir.prestations.manager': 'Mme Sanae LEHMAMI',
      'org.dir.adherents.title': 'Direction des affaires des adhérents',
      'org.dir.adherents.manager': 'Mme Hanane EL KOULALI',
      'org.dir.adminFinance.title': 'Direction administrative et financière',
      'org.dir.adminFinance.manager': 'M. Ali KHODARI',

      /* Services — prestations */
      'org.svc.projectHousing.title': 'Service de projet logement',
      'org.svc.projectHousing.manager': 'M. YOUSSEF AAKKI',
      'org.svc.projectHousing.position': 'Chargé de service',
      'org.svc.prevoyance.title': "Service de prévoyance des aides financières et assistance médicale et sociale",
      'org.svc.prevoyance.manager': 'Mme SEKAINA EL YAZIDI',
      'org.svc.prevoyance.position': 'Chargée de service',
      'org.svc.estivage.title': "Service de l'estivage, culture, restauration et loisirs",
      'org.svc.estivage.manager': 'M. HAMZA EL MANI',

      /* Services — adhérents */
      'org.svc.adhesionsContentieux.title': 'Service du suivi des adhésions et du contentieux',
      'org.svc.cooperation.title': 'Service de la coopération et partenariat',
      'org.svc.cooperation.manager': 'Mme SOUAD OUAKRIM',
      'org.svc.cooperation.position': 'Chargée de service',
      'org.svc.systemInfo.title': "Service du système d'information",
      'org.svc.systemInfo.manager': 'M. AYOUB ELOTMANI',
      'org.svc.systemInfo.position': 'Chargé de service',

      /* Services — admin / financière */
      'org.svc.finance.title': 'Service de la gestion financière et de la comptabilité',
      'org.svc.finance.manager': 'Mme NAWAL EL MAJDOUB',
      'org.svc.finance.position': 'Chargée de service',
      'org.svc.purchases.title': 'Service des achats et moyens généraux',
      'org.svc.purchases.manager': 'M. YOUSSEF SAMRANI',
      'org.svc.purchases.position': 'Chargé de service',
      'org.svc.adminLegal.title': 'Service de la gestion administrative et juridique'
    },

    ar: {
      'page.title': 'تنظيمنا',
      'breadcrumb.label': 'مسار التصفح',
      'breadcrumb.home': 'الرئيسية',
      'breadcrumb.foundation': 'المؤسسة',
      'breadcrumb.organization': 'تنظيمنا',

      'hero.kicker': 'الحكامة والتنظيم',
      'hero.lead': 'اكتشفوا هيكلة مؤسسة FOS-Agri: الرئاسة، الكتابة العامة، المديريات العملية والمصالح المخصصة لمنخرطينا.',

      'sections.chart.tag': 'الهيكل التنظيمي',
      'sections.chart.title': 'تنظيمنا',
      'sections.chart.intro': 'تنظيم يضع القرب والأداء وجودة الخدمة في صلب أولوياته.',
      'sections.chart.ariaChart': 'الهيكل التنظيمي لـ FOS-Agri',

      'status.loading': 'جارٍ تحميل الهيكل التنظيمي…',
      'status.empty': 'لا توجد بيانات تنظيمية متاحة.',
      'status.error': 'تعذّر تحميل الهيكل التنظيمي.',
      'status.vacant': 'منصب شاغر',
      'status.noServices': 'لا توجد مصالح للعرض.',

      'cta.title': 'هل لديكم سؤال حول تنظيمنا؟',
      'cta.subtitle': 'فريقنا في خدمتكم للإجابة على كل الاستفسارات.',
      'cta.button': 'اتصلوا بنا',

      'org.president.title': 'رئيس المؤسسة',
      'org.president.name': 'السيد عادل العواري',
      'org.committee.title': 'لجنة الإدارة',
      'org.audit.title': 'مصلحة التدقيق ومراقبة التسيير',
      'org.sg.title': 'الكاتبة العامة',
      'org.sg.name': 'السيدة نيلية أمارا',
      'org.communication.title': 'مصلحة التواصل',

      'org.dir.prestations.title': 'مديرية الخدمات',
      'org.dir.prestations.manager': 'السيدة سناء الحمامي',
      'org.dir.adherents.title': 'مديرية شؤون المنخرطين',
      'org.dir.adherents.manager': 'السيدة حنان الكلالي',
      'org.dir.adminFinance.title': 'المديرية الإدارية والمالية',
      'org.dir.adminFinance.manager': 'السيد علي خضاري',

      'org.svc.projectHousing.title': 'مصلحة مشروع السكن',
      'org.svc.projectHousing.manager': 'السيد يوسف عقي',
      'org.svc.projectHousing.position': 'مكلف بالمصلحة',
      'org.svc.prevoyance.title': 'مصلحة المساعدات المالية والمساعدة الطبية والاجتماعية',
      'org.svc.prevoyance.manager': 'السيدة سكينة اليزيدي',
      'org.svc.prevoyance.position': 'مكلفة بالمصلحة',
      'org.svc.estivage.title': 'مصلحة المخيمات والثقافة والإطعام والترفيه',
      'org.svc.estivage.manager': 'السيد حمزة المني',

      'org.svc.adhesionsContentieux.title': 'مصلحة تتبع الانخراط والمنازعات',
      'org.svc.cooperation.title': 'مصلحة التعاون والشراكة',
      'org.svc.cooperation.manager': 'السيدة سعاد وكريم',
      'org.svc.cooperation.position': 'مكلفة بالمصلحة',
      'org.svc.systemInfo.title': 'مصلحة نظام المعلومات',
      'org.svc.systemInfo.manager': 'السيد أيوب العثماني',
      'org.svc.systemInfo.position': 'مكلف بالمصلحة',

      'org.svc.finance.title': 'مصلحة التدبير المالي والمحاسبة',
      'org.svc.finance.manager': 'السيدة نوال المجدوب',
      'org.svc.finance.position': 'مكلفة بالمصلحة',
      'org.svc.purchases.title': 'مصلحة المشتريات والوسائل العامة',
      'org.svc.purchases.manager': 'السيد يوسف صامراني',
      'org.svc.purchases.position': 'مكلف بالمصلحة',
      'org.svc.adminLegal.title': 'مصلحة التدبير الإداري والقانوني'
    },

    zgh: {
      'page.title': 'ⵜⴰⵙⵏⵙⵙⵓⴷⵙⵜ ⵏⵏⵖ',
      'breadcrumb.label': 'ⴰⴱⵔⵉⴷ ⵏ ⵜⵉⴽⴽⵍⵉⵡⵉⵏ',
      'breadcrumb.home': 'ⴰⵙⵏⵓⴱⴳ',
      'breadcrumb.foundation': 'ⵜⴰⵎⵙⵙⵓⵔⵜ',
      'breadcrumb.organization': 'ⵜⴰⵙⵏⵙⵙⵓⴷⵙⵜ ⵏⵏⵖ',

      'hero.kicker': 'ⵜⴰⴳⵓⵔⵉ ⴷ ⵜⵙⵏⵙⵙⵓⴷⵙⵜ',
      'hero.lead': 'ⵙⵙⵏ ⴰⵙⴱⴷⴰⴷ ⵏ ⵜⵎⵙⵙⵓⵔⵜ FOS-Agri.',

      'sections.chart.tag': 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵜⵙⵏⵙⵙⵓⴷⵙⵜ',
      'sections.chart.title': 'ⵜⴰⵙⵏⵙⵙⵓⴷⵙⵜ ⵏⵏⵖ',
      'sections.chart.intro': 'ⵜⴰⵙⵏⵙⵙⵓⴷⵙⵜ ⵉ ⵓⵎⵣⵡⴰⵔⵓ ⴷ ⵜⴰⵙⴽⴰ ⵏ ⵜⵏⴼⴰⵙ.',
      'sections.chart.ariaChart': 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵜⵙⵏⵙⵙⵓⴷⵙⵜ ⵏ FOS-Agri',

      'status.loading': 'ⴰⵙⴰⵍⵉ ⵏ ⵓⵎⵙⴽⴰⵔ…',
      'status.empty': 'ⵓⵔ ⵍⵍⴰⵏ ⵉⵙⴼⴽⴰ.',
      'status.error': 'ⵓⵔ ⵉⵣⵎⵉⵔ ⵓⵙⴰⵍⵉ.',
      'status.vacant': 'ⴰⵏⵙⴰ ⵉⵍⴽⵎ',
      'status.noServices': 'ⵓⵔ ⵍⵍⵉⵏ ⵉⵙⵏⵉⵏⵏ.',

      'cta.title': 'ⵉⵙ ⵜⵓⵔ ⵜⵏⵉ ⵍⴰⵙⵇⵙⵉ ⵅⴼ ⵜⵙⵏⵙⵙⵓⴷⵙⵜ ⵏⵏⵖ?',
      'cta.subtitle': 'ⵜⴰⵔⴱⵉⵄⵜ ⵏⵏⵖ ⵜⵍⵍⴰ ⴷⴰ ⵉ ⵉⵙⵇⵙⵉⵜⵏ ⵏⵏⵓⵏ.',
      'cta.button': 'ⴰⵏⴰⵔⵎⵙ ⵏⵏⵖ',

      'org.president.title': 'ⴰⵙⵍⵡⴰⵢ ⵏ ⵜⵎⵙⵙⵓⵔⵜ',
      'org.president.name': 'ⵎⵙ. ADIL EL OUAARI',
      'org.committee.title': 'ⵜⴰⵙⵇⵇⵉⵎⵜ ⵏ ⵜⴰⵏⴱⴰⴹⵜ',
      'org.audit.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵓⵎⵙⵏⵏⴹ ⴷ ⵓⵙⵏⵇⴹ ⵏ ⵜⵏⴱⴰⴹⵜ',
      'org.sg.title': 'ⵜⴰⵎⴰⵔⴰⵜ ⵜⴰⵎⴰⵜⴰⵢⵜ',
      'org.sg.name': 'ⵎⵎ. Neilya AMARA',
      'org.communication.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵓⵎⵢⴰⵡⴰⴹ',

      'org.dir.prestations.title': 'ⵜⴰⵎⵙⵉⵔⵜ ⵏ ⵜⵏⴼⴰⵙ',
      'org.dir.prestations.manager': 'ⵎⵎ. Sanae LEHMAMI',
      'org.dir.adherents.title': 'ⵜⴰⵎⵙⵉⵔⵜ ⵏ ⵜⵎⵙⴰⵍ ⵏ ⵉⵎⵎⵓⵏⵏ',
      'org.dir.adherents.manager': 'ⵎⵎ. Hanane EL KOULALI',
      'org.dir.adminFinance.title': 'ⵜⴰⵎⵙⵉⵔⵜ ⵜⴰⵏⴱⴰⴹⴰⵏⵜ ⴷ ⵜⴰⴷⵔⵉⵎⴰⵏⵜ',
      'org.dir.adminFinance.manager': 'ⵎⵙ. Ali KHODARI',

      'org.svc.projectHousing.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵓⵙⵏⴼⴰⵔ ⵏ ⵜⴰⴷⴷⴰⵔⵜ',
      'org.svc.projectHousing.manager': 'ⵎⵙ. YOUSSEF AAKKI',
      'org.svc.projectHousing.position': 'ⴰⵎⴽⵍⴼ ⵙ ⵓⵙⵏⵉⵏ',
      'org.svc.prevoyance.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵜⵏⴰⴼⵓⵜ ⵜⴰⴷⵔⵉⵎⴰⵏⵜ ⴷ ⵓⴷⵓⵙ ⴰⴷⴰⵡⵙⴰⵏ ⴷ ⴰⵏⴰⵎⵓⵏ',
      'org.svc.prevoyance.manager': 'ⵎⵎ. SEKAINA EL YAZIDI',
      'org.svc.prevoyance.position': 'ⵜⴰⵎⴽⵍⴼⵜ ⵙ ⵓⵙⵏⵉⵏ',
      'org.svc.estivage.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵓⵏⵎⵉⵍⵉ, ⵜⴰⴷⵍⵙⴰ, ⵓⵙⴽⵉⵏ ⴷ ⴰⵙⴰⵢⵔⴰⵔ',
      'org.svc.estivage.manager': 'ⵎⵙ. HAMZA EL MANI',

      'org.svc.adhesionsContentieux.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵓⴹⴼⴰⵕ ⵏ ⵉⵎⵓⵏⵏ ⴷ ⵉⵎⵏⵖⵉⵜⵏ',
      'org.svc.cooperation.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵓⵎⵢⴰⴷⴰⵙ ⴷ ⵓⵎⵎⴰⵏⴽ',
      'org.svc.cooperation.manager': 'ⵎⵎ. SOUAD OUAKRIM',
      'org.svc.cooperation.position': 'ⵜⴰⵎⴽⵍⴼⵜ ⵙ ⵓⵙⵏⵉⵏ',
      'org.svc.systemInfo.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵓⵏⴳⵔⴰⵡ ⵏ ⵜⵉⵏⴼⴰⵙ',
      'org.svc.systemInfo.manager': 'ⵎⵙ. AYOUB ELOTMANI',
      'org.svc.systemInfo.position': 'ⴰⵎⴽⵍⴼ ⵙ ⵓⵙⵏⵉⵏ',

      'org.svc.finance.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵜⵏⴱⴰⴹⵜ ⵜⴰⴷⵔⵉⵎⴰⵏⵜ ⴷ ⵜⵎⵉⵙⵙⵉⵜ',
      'org.svc.finance.manager': 'ⵎⵎ. NAWAL EL MAJDOUB',
      'org.svc.finance.position': 'ⵜⴰⵎⴽⵍⴼⵜ ⵙ ⵓⵙⵏⵉⵏ',
      'org.svc.purchases.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵉⵙⵖⵉⵡⵏ ⴷ ⵉⵎⴰⵙⵙⴰⵏ ⵉⵎⴰⵜⴰⵢⵏ',
      'org.svc.purchases.manager': 'ⵎⵙ. YOUSSEF SAMRANI',
      'org.svc.purchases.position': 'ⴰⵎⴽⵍⴼ ⵙ ⵓⵙⵏⵉⵏ',
      'org.svc.adminLegal.title': 'ⴰⵙⵏⵉⵏ ⵏ ⵜⵏⴱⴰⴹⵜ ⵜⴰⵎⵙⵙⵓⴷⵙⴰⵏⵜ ⴷ ⵜⴰⵣⵔⴼⴰⵏⵜ'
    }
  };

  function t(key, lang) {
    const l = lang || currentLang();
    return (I18N[l] && I18N[l][key]) || I18N[DEFAULT_LANG][key] || key;
  }

  /* ============================================================
   * DEFAULT DATA — replace by overriding window.FOSAGRI_ORG_DATA
   * before this script runs, or by adapting loadOrgData() into a
   * fetch() call.
   *
   * SHAPE (each node):
   *   {
   *     id:           string  — stable identifier (CMS primary key)
   *     order:        number  — ascending sort order
   *     isActive:     boolean — false skips the entry
   *     titleKey:     string  — i18n key for the role / department
   *     nameKey:      string? — i18n key for the holder's name (optional → vacant)
   *     positionKey:  string? — i18n key for an extra position label
   *     colorVariant: 'gold' | 'teal' | 'green' | 'support' | 'service'
   *     supports:     Node[]  — lateral support boxes (optional)
   *     children:     Node[]  — nested leadership levels (optional)
   *     services:     Node[]  — only on `directions` entries
   *   }
   * ============================================================ */
  const DEFAULT_DATA = {
    leadership: [
      {
        id: 'president', order: 1, isActive: true,
        title: 'Président de la FOS',
        titleAr: 'رئيس المؤسسة',
        titleZgh: 'ⴰⵙⵍⵡⴰⵢ ⵏ FOS',
        name: 'M. ADIL EL OUFIR',
        nameAr: 'السيد عادل العوفير',
        nameZgh: 'ADIL EL OUFIR',
        colorVariant: 'gold',
        supports: [
          {
            id: 'committee', order: 1, isActive: true,
            title: 'Comité directeur',
            titleAr: 'اللجنة المديرية',
            titleZgh: 'ⵜⴰⵎⵙⵎⵓⵏⵜ ⵜⴰⵎⵏⵀⴰⴹⵜ',
            colorVariant: 'support',
            icon: 'fa-solid fa-clipboard-list'
          },
          {
            id: 'audit', order: 2, isActive: true,
            title: "Service de l'audit et du contrôle de gestion",
            titleAr: 'مصلحة التدقيق ومراقبة التسيير',
            titleZgh: 'ⴰⵙⵏⵓⴱⴳ ⴷ ⵓⵙⴼⵔⴽ ⵏ ⵜⵎⵀⵍⴰ',
            name: 'Mme NADA MOUNIRI',
            nameAr: 'السيدة ندى منيري',
            nameZgh: 'NADA MOUNIRI',
            colorVariant: 'support',
            icon: 'fa-solid fa-shield-halved'
          }
        ],
        children: [
          {
            id: 'secretary-general', order: 1, isActive: true,
            title: 'Secrétaire générale',
            titleAr: 'الكاتبة العامة',
            titleZgh: 'ⵜⴰⵎⴰⵔⴰⵜ ⵜⴰⵎⴰⵜⴰⵢⵜ',
            name: 'Mme NAJYA AMARA',
            nameAr: 'السيدة نجية عمارة',
            nameZgh: 'NAJYA AMARA',
            colorVariant: 'teal',
            supports: [
              {
                id: 'communication', order: 1, isActive: true,
                title: 'Service de la communication',
                titleAr: 'مصلحة التواصل',
                titleZgh: 'ⴰⵙⵏⵓⴱⴳ ⵏ ⵜⵎⵢⴰⵡⴰⴹⵜ',
                name: 'Mme FAIZA JABIRI',
                nameAr: 'السيدة فائزة جابري',
                nameZgh: 'FAIZA JABIRI',
                colorVariant: 'support',
                icon: 'fa-solid fa-bullhorn'
              }
            ]
          }
        ]
      }
    ],
    directions: [
      {
        id: 'prestations', order: 1, isActive: true,
        title: 'Directrice des prestations',
        titleAr: 'مديرة الخدمات',
        titleZgh: 'ⵜⴰⵎⵙⴼⵔⴰⴽⵜ ⵏ ⵉⵎⵣⵍⴰ',
        managerName: 'Mme SANAE LEHMAMI',
        managerNameAr: 'السيدة سناء الحمامي',
        managerNameZgh: 'SANAE LEHMAMI',
        colorVariant: 'green',
        icon: 'fa-solid fa-hand-holding-heart',
        services: [
          {
            id: 'svc-project-housing', order: 1, isActive: true,
            title: 'Chef de service du projet logement',
            titleAr: 'رئيس مصلحة تتبع مشاريع السكن',
            titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⵙⵏⴼⴰⵔ ⵏ ⵜⴷⴷⴰⵔⵜ',
            managerName: 'M. YOUSSEF AKKI',
            managerNameAr: 'السيد يوسف عكي',
            managerNameZgh: 'YOUSSEF AKKI'
          },
          {
            id: 'svc-prevoyance', order: 2, isActive: true,
            title: 'Chef de service de la prévoyance, des aides financières et de l’assistance médicale et sociale',
            titleAr: 'رئيس مصلحة الاحتياط والدعم المالي والمساعدة الصحية والاجتماعية',
            titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⴹⵎⴰⵏ ⴷ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⵎⵥⵍⴰⵢⵜ ⴷ ⵜⴰⵏⴰⵎⵓⵏⵜ'
          },
          {
            id: 'svc-estivage', order: 3, isActive: true,
            title: "Chef de service de l’estivage, de la culture, de la restauration et des loisirs",
            titleAr: 'رئيس مصلحة الاصطياف والأنشطة والإطعام والترفيه',
            titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⵙⵉⵡⴹ ⴷ ⵜⴷⵍⵙⴰ ⴷ ⵓⵙⵓⵔⴼ',
            managerName: 'M. HATIM EL HANCHI',
            managerNameAr: 'السيد حاتم الحنشي',
            managerNameZgh: 'HATIM EL HANCHI'
          }
        ]
      },
      {
        id: 'adherents', order: 2, isActive: true,
        title: 'Directrice des affaires des adhérents',
        titleAr: 'مديرة شؤون المنخرطين',
        titleZgh: 'ⵜⴰⵎⵙⴼⵔⴰⴽⵜ ⵏ ⵓⵎⵓⵔ ⵏ ⵉⵎⵥⵍⴰⵢⵏ',
        managerName: 'Mme HANANE EL KOULALI',
        managerNameAr: 'السيدة حنان الكولالي',
        managerNameZgh: 'HANANE EL KOULALI',
        colorVariant: 'green',
        icon: 'fa-solid fa-users',
        services: [
          {
            id: 'svc-adhesions-contentieux', order: 1, isActive: true,
            title: 'Cheffe de service du suivi des adhésions et du contentieux',
            titleAr: 'رئيسة مصلحة تتبع الانخراطات والمنازعات',
            titleZgh: 'ⵜⴰⵎⴰⵙⴰⵢⵜ ⵏ ⵓⵙⴼⴰⵔ ⵏ ⵓⵙⵏⵓⴱⴳ ⴷ ⵉⵎⵙⵓⴳⴰⵔ',
            managerName: 'Mme SEKAINA EL-MJID',
            managerNameAr: 'السيدة سكينة المجيد',
            managerNameZgh: 'SEKAINA EL-MJID'
          },
          {
            id: 'svc-cooperation', order: 2, isActive: true,
            title: 'Cheffe de service de la coopération et du partenariat',
            titleAr: 'رئيسة مصلحة الشراكة والتعاون',
            titleZgh: 'ⵜⴰⵎⴰⵙⴰⵢⵜ ⵏ ⵜⵎⵙⵙⴰⵡⵉⵜ ⴷ ⵓⵎⵛⵛⴰⵔⴽ',
            managerName: 'Mme SOUAD OUAKRIM',
            managerNameAr: 'السيدة سعاد واعكريم',
            managerNameZgh: 'SOUAD OUAKRIM'
          },
          {
            id: 'svc-system-info', order: 3, isActive: true,
            title: "Chef de service du système d’information",
            titleAr: 'رئيس مصلحة نظم المعلومات',
            titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⵏⴰⴳⵔⴰⵡ ⵏ ⵉⵙⴼⴽⴰ',
            managerName: 'M. AYOUB EL OTMANI',
            managerNameAr: 'السيد أيوب العثماني',
            managerNameZgh: 'AYOUB EL OTMANI'
          }
        ]
      },
      {
        id: 'admin-finance', order: 3, isActive: true,
        title: 'Directeur administratif et financier',
        titleAr: 'المدير الإداري والمالي',
        titleZgh: 'ⴰⵎⵙⴼⵔⴰⴽ ⴰⴷⴱⵍⴰⵏ ⴷ ⵓⵎⴰⵍⵉ',
        managerName: 'M. ALI KHODARI',
        managerNameAr: 'السيد علي خضاري',
        managerNameZgh: 'ALI KHODARI',
        colorVariant: 'green',
        icon: 'fa-solid fa-building-columns',
        services: [
          {
            id: 'svc-finance', order: 1, isActive: true,
            title: 'Cheffe de service de la gestion financière et de la comptabilité',
            titleAr: 'رئيسة مصلحة التدبير المالي والمحاسبة',
            titleZgh: 'ⵜⴰⵎⴰⵙⴰⵢⵜ ⵏ ⵓⵙⴼⵔⴽ ⴰⵎⴰⵍⵉ ⴷ ⵓⵎⵉⴹⴰⵏ',
            managerName: 'Mme MANAL EL MATLOBI',
            managerNameAr: 'السيدة منال المطلبي',
            managerNameZgh: 'MANAL EL MATLOBI'
          },
          {
            id: 'svc-purchases', order: 2, isActive: true,
            title: 'Chef de service des achats et des moyens généraux',
            titleAr: 'رئيس مصلحة المشتريات والوسائل العامة',
            titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵉⵙⵖⴰⵏ ⴷ ⵉⵎⴰⵙⵙⵏ ⵉⵎⴰⵜⴰⵢⵏ',
            managerName: 'M. YOUSSEF MAMRANI',
            managerNameAr: 'السيد يوسف المراني',
            managerNameZgh: 'YOUSSEF MAMRANI'
          },
          {
            id: 'svc-admin-legal', order: 3, isActive: true,
            title: 'Chef de service de la gestion administrative et juridique',
            titleAr: 'رئيس مصلحة التدبير الإداري والقانوني',
            titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⵙⴼⵔⴽ ⴰⴷⴱⵍⴰⵏ ⴷ ⵓⵙⴹⵓⴼ',
            managerName: 'M. AHMED NACIRI',
            managerNameAr: 'السيد أحمد الناصري',
            managerNameZgh: 'AHMED NACIRI'
          }
        ]
      }
    ]
  };

  /* ----- Data loader (swap for a fetch() to plug a CMS/API) ----- */
  async function loadOrgData() {
    // TODO: dashboard hook — replace with:
    //   const res = await fetch('/api/organization');
    //   return res.json();
    if (window.FOSAGRI_ORG_DATA && typeof window.FOSAGRI_ORG_DATA === 'object') {
      return window.FOSAGRI_ORG_DATA;
    }
    return DEFAULT_DATA;
  }

  /* ============================================================
   * RENDERERS — small, composable building blocks.
   * ============================================================ */
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function variantClass(v) {
    switch (v) {
      case 'gold':    return 'is-gold';
      case 'teal':    return 'is-teal';
      case 'green':   return 'is-green';
      case 'support': return 'is-support';
      case 'service': return 'is-service';
      default:        return '';
    }
  }

  function sortedActive(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter((n) => n && n.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  /* Format inline style for the stagger reveal animation (CSS handles the rest). */
  function revealStyle(idx) {
    return `--reveal-index:${idx}`;
  }

  function localizedField(node, field, keyField, lang) {
    if (!node) return '';
    const suffix = lang === 'ar' ? 'Ar' : (lang === 'zgh' ? 'Zgh' : '');
    if (suffix && node[`${field}${suffix}`]) return node[`${field}${suffix}`];
    if (node[field]) return node[field];
    return node[keyField] ? t(node[keyField], lang) : '';
  }

  function localizedName(node, field, keyField, lang) {
    if (!node) return '';
    const suffix = lang === 'ar' ? 'Ar' : (lang === 'zgh' ? 'Zgh' : '');
    if (suffix && node[`${field}${suffix}`]) return node[`${field}${suffix}`];
    if (node[field]) return node[field];
    return node[keyField] ? t(node[keyField], lang) : '';
  }

  function textLine(value, className) {
    if (!value) return '';
    return `<p class="${className}">${escapeHtml(value)}</p>`;
  }

  function langAttrs(lang) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    return ` lang="${escapeHtml(lang)}" dir="${dir}"`;
  }

  /* Generic leadership / support node (centered card).
     `idx` controls stagger order in the reveal animation. */
  function renderNode(node, lang, idx, extraClass) {
    if (!node) return '';
    const title = localizedField(node, 'title', 'titleKey', lang);
    const name = localizedName(node, 'name', 'nameKey', lang);

    const iconHtml = node.icon
      ? `<span class="org-node-icon" aria-hidden="true"><i class="${escapeHtml(node.icon)}"></i></span>`
      : '';

    const titleHtml = textLine(title, 'org-node-title');
    const nameHtml = name
      ? textLine(name, 'org-node-name')
      : ((node.colorVariant === 'gold' || node.colorVariant === 'teal')
          ? `<p class="org-node-name"><span class="org-node-vacant">${escapeHtml(t('status.vacant', lang))}</span></p>`
          : '');
    const positionHtml = node.positionKey ? `<p class="org-node-position">${escapeHtml(t(node.positionKey, lang))}</p>` : '';

    const cls = ['org-node', variantClass(node.colorVariant), extraClass || ''].filter(Boolean).join(' ');

    return `<article class="${cls}" data-id="${escapeHtml(node.id)}" style="${revealStyle(idx)}"${langAttrs(lang)}>${iconHtml}${titleHtml}${nameHtml}${positionHtml}</article>`;
  }

  /* Service row under a direction (compact). */
  function renderService(svc, lang, idx) {
    const title = localizedField(svc, 'title', 'titleKey', lang);
    const name = localizedName(svc, 'managerName', 'managerNameKey', lang);
    const titleHtml = textLine(title, 'org-node-title');
    const nameHtml = name ? textLine(name, 'org-node-name') : '';
    const positionHtml = svc.positionKey ? `<p class="org-node-position">${escapeHtml(t(svc.positionKey, lang))}</p>` : '';
    return `<article class="org-node is-service org-service" data-id="${escapeHtml(svc.id)}" style="${revealStyle(idx)}"${langAttrs(lang)}>${titleHtml}${nameHtml}${positionHtml}</article>`;
  }

  /* Tier 1 — president + lateral supports */
  function renderPresidentTier(president, lang) {
    const supports = sortedActive(president.supports);
    const left  = supports[0] ? `<div class="org-support-left">${renderNode(supports[0], lang, 1)}</div>`  : '<div></div>';
    const right = supports[1] ? `<div class="org-support-right">${renderNode(supports[1], lang, 2)}</div>` : '<div></div>';
    return `
      <div class="org-tier org-tier-president">
        ${left}
        ${renderNode(president, lang, 0)}
        ${right}
      </div>`;
  }

  /* Tier 2 — secretary general + lateral support */
  function renderSGTier(sg, lang) {
    const supports = sortedActive(sg.supports);
    const right = supports[0] ? `<div class="org-support-right">${renderNode(supports[0], lang, 4)}</div>` : '<div></div>';
    return `
      <div class="org-tier org-tier-sg">
        <div></div>
        ${renderNode(sg, lang, 3)}
        ${right}
      </div>`;
  }

  /* Tier 3 — directions row, each direction gets a number badge (01/02/…) */
  function renderDirections(directions, lang) {
    const items = sortedActive(directions);
    if (items.length === 0) return '';
    return `
      <div class="org-tier org-tier-directions">
        ${items.map((d, i) => {
          const services = sortedActive(d.services);
          const num = String(i + 1).padStart(2, '0');
          const title = localizedField(d, 'title', 'titleKey', lang);
          const managerName = localizedName(d, 'managerName', 'managerNameKey', lang);
          const iconHtml = d.icon ? `<span class="org-node-icon" aria-hidden="true"><i class="${escapeHtml(d.icon)}"></i></span>` : '';
          const head = `
            <article class="org-direction-head" data-id="${escapeHtml(d.id)}" data-num="${num}" style="${revealStyle(5 + i * 3)}"${langAttrs(lang)}>
              ${iconHtml}
              ${textLine(title, 'org-node-title')}
              ${managerName
                ? textLine(managerName, 'org-node-name')
                : `<p class="org-node-name"><span class="org-node-vacant">${escapeHtml(t('status.vacant', lang))}</span></p>`}
            </article>`;
          const svcHtml = services.length === 0
            ? `<p class="org-service-empty">${escapeHtml(t('status.noServices', lang))}</p>`
            : services.map((s, j) => renderService(s, lang, 6 + i * 3 + j)).join('');
          return `
            <div class="org-direction" style="${revealStyle(5 + i * 3)}">
              ${head}
              <div class="org-services" role="list">${svcHtml}</div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function renderChart(data, lang) {
    const root = document.getElementById('org-chart');
    if (!root) return;

    if (!data || (!data.leadership && !data.directions)) {
      root.dataset.state = 'empty';
      root.innerHTML = `<div class="org-status" data-org-state="empty">${escapeHtml(t('status.empty', lang))}</div>`;
      return;
    }

    const leadership = sortedActive(data.leadership);
    const president = leadership[0];
    const sg = president && Array.isArray(president.children) ? sortedActive(president.children)[0] : null;
    const directionsHtml = renderDirections(data.directions, lang);

    if (!president && !directionsHtml) {
      root.dataset.state = 'empty';
      root.innerHTML = `<div class="org-status" data-org-state="empty">${escapeHtml(t('status.empty', lang))}</div>`;
      return;
    }

    root.dataset.state = 'ready';
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    root.innerHTML = [
      president ? renderPresidentTier(president, lang) : '',
      sg ? renderSGTier(sg, lang) : '',
      directionsHtml
    ].filter(Boolean).join('');
  }

  /* ----- Static-text binding (data-org-i18n / data-org-i18n-aria) ----- */
  function applyStaticText(lang) {
    /* Only own the document title on the dedicated organisation page.
       On the gouvernance page (which also embeds this chart) we must not
       overwrite that page's own title. */
    if (document.body.dataset.page === 'notre-organisation') {
      document.title = `FOS-Agri | ${t('page.title', lang)}`;
    }
    document.querySelectorAll('[data-org-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.orgI18n, lang);
    });
    document.querySelectorAll('[data-org-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.orgI18nAria, lang));
    });
  }

  /* ============================================================
   * INIT
   * ============================================================ */
  let cached = null;

  function rerender() {
    const lang = currentLang();
    applyStaticText(lang);
    renderChart(cached, lang);
  }

  async function init() {
    const lang = currentLang();
    applyStaticText(lang);

    try {
      cached = await loadOrgData();
      renderChart(cached, currentLang());
    } catch (err) {
      const root = document.getElementById('org-chart');
      if (root) {
        root.dataset.state = 'error';
        root.innerHTML = `<div class="org-status" data-org-state="error">${escapeHtml(t('status.error'))}</div>`;
      }
      console.error('[FOS-Agri] organization load failed', err);
    }

    /* React to language changes — secondary-pages.js toggles <html lang>+<dir>;
       a MutationObserver keeps this page decoupled from its internals. */
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && (m.attributeName === 'lang' || m.attributeName === 'dir')) {
          rerender();
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

    window.addEventListener('fosagri:lang-change', rerender);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Public surface for dashboards / debug consoles */
  window.FOSAGRI_ORG = {
    rerender,
    setData(data) { cached = data; rerender(); },
    t
  };
})();
