(function () {
  'use strict';

  const supported = ['fr', 'ar', 'zgh'];
  const stored = localStorage.getItem('fosagri-lang');
  let lang = supported.includes(stored) ? stored : (supported.includes(document.documentElement.lang) ? document.documentElement.lang : 'fr');

  const labels = {
    fr: {
      kicker: 'Espace adhérent',
      title: 'Espace adhérent',
      body: 'Connectez-vous pour suivre vos démarches, consulter vos prestations et échanger avec la Fondation.',

      loginHeading: 'Connexion',
      loginSub: 'Accédez à votre espace personnel à l’aide de votre identifiant.',
      labelId: 'Identifiant (matricule ou CIN)',
      placeholderId: 'Ex. 123456 ou AB12345',
      labelPassword: 'Mot de passe',
      placeholderPassword: '••••••••',
      showPassword: 'Afficher le mot de passe',
      hidePassword: 'Masquer le mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotLink: 'Mot de passe oublié ?',
      submitLogin: 'Se connecter',
      dividerOr: 'ou',
      noAccount: 'Pas encore de compte ?',
      noAccountBody: 'Contactez votre gestionnaire RH ou la Fondation pour activer votre accès.',
      noAccountLink: 'Nous contacter',
      errorRequired: 'Ce champ est requis.',
      errorIdMin: 'Veuillez saisir un identifiant valide (3 caractères minimum).',
      errorPasswordMin: 'Le mot de passe doit contenir au moins 6 caractères.',
      loginAlert: 'Cet espace sera relié à la plateforme sécurisée des adhérents. Nos équipes vous contacteront pour finaliser votre accès.',
      loginAlertCta: 'Contacter la Fondation',

      forgotHeading: 'Mot de passe oublié',
      forgotSub: 'Saisissez votre identifiant ou votre email pour recevoir un lien de réinitialisation.',
      labelIdOrEmail: 'Identifiant ou email',
      placeholderIdOrEmail: 'Identifiant, CIN ou email',
      errorIdOrEmail: 'Veuillez saisir un identifiant ou un email valide.',
      submitForgot: 'Envoyer le lien',
      backToLogin: 'Retour à la connexion',
      forgotAlert: 'Si un compte correspond à cet identifiant, un lien de réinitialisation sera envoyé dès l’activation de cette fonctionnalité.',

      infoTitle: 'Pourquoi un espace adhérent ?',
      infoBody: 'Un accès dédié pour simplifier vos démarches auprès de la Fondation.',
      benefit1: 'Suivre l’état de vos demandes et dossiers.',
      benefit2: 'Télécharger vos attestations et documents utiles.',
      benefit3: 'Consulter les prestations auxquelles vous avez droit.',
      benefit4: 'Échanger directement avec les équipes de la Fondation.',
      helpTitle: 'Besoin d’aide ?',
      helpBody: 'Notre équipe reste à votre disposition pour toute question liée à votre accès.',
      helpContact: 'Voir la page contact'
    },
    ar: {
      kicker: 'فضاء المنخرط',
      title: 'فضاء المنخرط',
      body: 'سجّلوا الدخول لتتبع مساطركم، والاطلاع على الخدمات، والتواصل مع المؤسسة.',

      loginHeading: 'تسجيل الدخول',
      loginSub: 'لوجوا إلى فضائكم الشخصي باستخدام معرّفكم.',
      labelId: 'المعرف (رقم التأجير أو البطاقة الوطنية)',
      placeholderId: 'مثال: 123456 أو AB12345',
      labelPassword: 'كلمة السر',
      placeholderPassword: '••••••••',
      showPassword: 'إظهار كلمة السر',
      hidePassword: 'إخفاء كلمة السر',
      rememberMe: 'تذكرني',
      forgotLink: 'نسيت كلمة السر؟',
      submitLogin: 'تسجيل الدخول',
      dividerOr: 'أو',
      noAccount: 'ليس لديكم حساب بعد؟',
      noAccountBody: 'تواصلوا مع مسؤول الموارد البشرية أو مع المؤسسة لتفعيل ولوجكم.',
      noAccountLink: 'اتصلوا بنا',
      errorRequired: 'هذا الحقل إلزامي.',
      errorIdMin: 'يرجى إدخال معرف صحيح (3 أحرف على الأقل).',
      errorPasswordMin: 'يجب أن تتكون كلمة السر من 6 أحرف على الأقل.',
      loginAlert: 'سيتم ربط هذا الفضاء بمنصة آمنة خاصة بالمنخرطين. ستتواصل معكم فرقنا لإتمام تفعيل الولوج.',
      loginAlertCta: 'اتصلوا بالمؤسسة',

      forgotHeading: 'نسيت كلمة السر',
      forgotSub: 'أدخلوا معرفكم أو بريدكم الإلكتروني لتلقي رابط إعادة التعيين.',
      labelIdOrEmail: 'المعرف أو البريد الإلكتروني',
      placeholderIdOrEmail: 'المعرف أو البطاقة الوطنية أو البريد الإلكتروني',
      errorIdOrEmail: 'يرجى إدخال معرف أو بريد إلكتروني صحيح.',
      submitForgot: 'إرسال الرابط',
      backToLogin: 'العودة لتسجيل الدخول',
      forgotAlert: 'إذا كان هناك حساب مطابق لهذا المعرف، سيُرسل رابط إعادة التعيين فور تفعيل هذه الخدمة.',

      infoTitle: 'لماذا فضاء المنخرط؟',
      infoBody: 'ولوج خاص لتبسيط مساطركم لدى المؤسسة.',
      benefit1: 'تتبع حالة طلباتكم وملفاتكم.',
      benefit2: 'تحميل شهاداتكم ووثائقكم المفيدة.',
      benefit3: 'الاطلاع على الخدمات التي تستفيدون منها.',
      benefit4: 'التواصل مباشرة مع فرق المؤسسة.',
      helpTitle: 'تحتاجون مساعدة؟',
      helpBody: 'فريقنا رهن إشارتكم لأي سؤال يتعلق بولوجكم.',
      helpContact: 'زيارة صفحة الاتصال'
    },
    zgh: {
      kicker: 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵓⵏ',
      title: 'ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵓⵏ',
      body: 'ⵇⵇⵏ ⵉ ⵓⵙⴽⵜⵉ ⵏ ⵜⵎⵓⵔⵉⵏ ⵏⵏⴽ, ⴰⴼ ⵜⵉⵏⴼⴰ ⴷ ⵓⵎⵢⴰⵡⴰⴹ ⴷ ⵜⵎⵙⵙⵓⵔⵜ.',

      loginHeading: 'ⴰⴽⵛⵛⵓⵎ',
      loginSub: 'ⴽⵛⵎ ⵖⵔ ⵓⵎⵙⴽⴰⵔ ⵏⵏⴽ ⵙ ⵓⵙⵎⵢⴰⵏⵏ ⵏⵏⴽ.',
      labelId: 'ⴰⵙⵎⵢⴰⵏⵏ (ⵓⵟⵟⵓⵏ ⵏⵖ CIN)',
      placeholderId: 'ⴰⵎⴷⵢⴰ: 123456 ⵏⵖ AB12345',
      labelPassword: 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵙⵜⵔ',
      placeholderPassword: '••••••••',
      showPassword: 'ⵙⴽⵏ ⴰⵡⴰⵍ ⵏ ⵓⵙⵙⵜⵔ',
      hidePassword: 'ⴼⴼⵔ ⴰⵡⴰⵍ ⵏ ⵓⵙⵙⵜⵔ',
      rememberMe: 'ⵙⵎⴽⵜⵉ ⵢⵉ',
      forgotLink: 'ⵜⵜⵓⵖ ⴰⵡⴰⵍ ⵏ ⵓⵙⵙⵜⵔ?',
      submitLogin: 'ⴽⵛⵎ',
      dividerOr: 'ⵏⵖ',
      noAccount: 'ⵓⵔ ⵜⵓⵙⵉⴷ ⴰⵎⵉⴹⴰⵏ?',
      noAccountBody: 'ⵏⵎⵎⴰⵍ ⴷ ⵓⵎⴰⵡⴰⵙ ⵏ ⵉⵄⵓⵏⵏ ⵉⵏⴰⴼⴳⴰⵏⵏ ⵏⵖ ⵜⴰⵎⵙⵙⵓⵔⵜ ⵉ ⵓⵙⵎⵓⵜⵜⵉ ⵏ ⵓⴽⵛⵛⵓⵎ ⵏⵏⴽ.',
      noAccountLink: 'ⵏⵎⵎⴰⵍ ⴷⵉⴷⵏⵖ',
      errorRequired: 'ⴰⵢⴰ ⵢⵜⵜⵓⵙⵜⴰⵏ.',
      errorIdMin: 'ⵙⵉⴷⵔ ⴰⵙⵎⵢⴰⵏⵏ ⵢⵎⵥⵢⴰⵏ (ⴽⵕⴰⴹ ⵏ ⵉⵙⴻⵎⴹⴰⵍ ⵖⴼ ⵓⴹⴹⴰⵕ).',
      errorPasswordMin: 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵙⵜⵔ ⵉⵅⵚⵚⴰ ⴰⴷ ⵢⵉⵍⵉ ⵙ 6 ⵏ ⵉⵙⴻⵎⴹⴰⵍ ⵖⴼ ⵓⴹⴹⴰⵕ.',
      loginAlert: 'ⴰⵎⵙⴽⴰⵔ ⴰⴷ ⴰⴷ ⵢⵜⵜⵓⵇⵇⴰⵏ ⵖⵔ ⵜⴼⵍⴰⵜⴼⵓⵔⵎⵜ ⵜⴰⵄⴰⵙⵙⴰⵙⵜ ⵏ ⵉⵎⵓⵏⵏ. ⵜⵉⵔⴰⴱⴱⵓⵜⵉⵏ ⵏⵏⵖ ⴰⴷ ⴽⵏ ⵏⵎⵎⴰⵍⵏ ⵉ ⵓⵙⵎⵓⵜⵜⵉ ⵏ ⵓⴽⵛⵛⵓⵎ ⵏⵏⴽ.',
      loginAlertCta: 'ⵏⵎⵎⴰⵍ ⴷ ⵜⵎⵙⵙⵓⵔⵜ',

      forgotHeading: 'ⵜⵜⵓⵖ ⴰⵡⴰⵍ ⵏ ⵓⵙⵙⵜⵔ',
      forgotSub: 'ⵙⵉⴷⵔ ⴰⵙⵎⵢⴰⵏⵏ ⵏⵏⴽ ⵏⵖ ⵉⵎⴰⵢⵍ ⵏⵏⴽ ⵉ ⵓⴽⵙⵉ ⵏ ⵓⵣⴹⴰⵎ ⵏ ⵓⵙⴳⴳⵎ.',
      labelIdOrEmail: 'ⴰⵙⵎⵢⴰⵏⵏ ⵏⵖ ⵉⵎⴰⵢⵍ',
      placeholderIdOrEmail: 'ⴰⵙⵎⵢⴰⵏⵏ, CIN ⵏⵖ ⵉⵎⴰⵢⵍ',
      errorIdOrEmail: 'ⵙⵉⴷⵔ ⴰⵙⵎⵢⴰⵏⵏ ⵏⵖ ⵉⵎⴰⵢⵍ ⵢⵎⵥⵢⴰⵏ.',
      submitForgot: 'ⴰⵣⵏ ⴰⵣⴹⴰⵎ',
      backToLogin: 'ⴰⵖⵓⵍ ⵖⵔ ⵓⴽⵛⵛⵓⵎ',
      forgotAlert: 'ⵎⴽ ⵢⵍⵍⴰ ⵓⵎⵉⴹⴰⵏ ⵢⵎⵙⴰⵙⴰⵏ ⴷ ⴰⵙⵎⵢⴰⵏⵏ ⴰⴷ, ⴰⵣⴹⴰⵎ ⵏ ⵓⵙⴳⴳⵎ ⴰⴷ ⵢⵜⵜⵓⵣⵏ ⵎⵉ ⵢⵜⵜⵓⵙⵎⵓⵜⵜⵉ ⵓⵎⴹⵢⴰ ⴰⴷ.',

      infoTitle: 'ⵎⴰⵢⵎⵎⵉ ⴰⵎⵙⴽⴰⵔ ⵏ ⵓⵎⵓⵏ?',
      infoBody: 'ⴰⴽⵛⵛⵓⵎ ⵢⵎⵥⵢⴰⵏ ⵉ ⵓⵙⵀⵍ ⵏ ⵜⵎⵓⵔⵉⵏ ⵏⵏⴽ ⴷⴷⵓ ⵜⵎⵙⵙⵓⵔⵜ.',
      benefit1: 'ⵟⵟⴼ ⴰⴷⴷⴰⴷ ⵏ ⵉⵙⵓⵜⵔⵏ ⴷ ⵉⴼⵉⵛⵉⵢⵏ ⵏⵏⴽ.',
      benefit2: 'ⴰⴳⵎ ⵜⵉⴽⵓⵜⵉⵏ ⴷ ⵉⵙⴻⵎⴹⴰⵍ ⵏⵏⴽ.',
      benefit3: 'ⵥⵕ ⵜⵉⵏⴼⴰ ⵉ ⵜⵍⵍⵉⴷ ⵜⵥⴹⴰⵕⴷ.',
      benefit4: 'ⵏⵎⵎⴰⵍ ⵙ ⵓⵣⵣⵍ ⴷ ⵜⵉⵔⴰⴱⴱⵓⵜⵉⵏ ⵏ ⵜⵎⵙⵙⵓⵔⵜ.',
      helpTitle: 'ⵜⵅⵚⵚⴰⴷ ⵜⵉⵡⵉⵙⵉ?',
      helpBody: 'ⵜⴰⵔⴰⴱⴱⵓⵜ ⵏⵏⵖ ⵜⵍⵍⴰ ⵉ ⵓⵙⴻⵔⵙ ⵏⵏⴽ ⵉ ⵢⴰⵜ ⵜⵓⵜⵔⴰ ⵖⴼ ⵓⴽⵛⵛⵓⵎ ⵏⵏⴽ.',
      helpContact: 'ⵥⵕ ⵜⴰⵙⵏⴰ ⵏ ⵓⵎⵢⴰⵡⴰⴹ'
    }
  };

  function t(key) {
    return labels[lang]?.[key] || labels.fr[key] || key;
  }

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-espace-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.espaceI18n);
    });

    document.querySelectorAll('[data-espace-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', t(el.dataset.espaceI18nPlaceholder));
    });

    document.querySelectorAll('[data-espace-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.espaceI18nAria));
    });

    document.querySelectorAll('.espace-toggle-visibility').forEach((btn) => {
      const isHidden = btn.dataset.state !== 'visible';
      btn.setAttribute('aria-label', t(isHidden ? 'showPassword' : 'hidePassword'));
    });
  }

  function setFieldError(field, message) {
    if (!field) return;
    field.classList.add('has-error');
    const err = field.querySelector('.espace-field-error span');
    if (err) err.textContent = message;
  }

  function clearFieldError(field) {
    if (!field) return;
    field.classList.remove('has-error');
  }

  function showAlert(alertEl) {
    if (!alertEl) return;
    alertEl.classList.add('is-visible');
    alertEl.setAttribute('tabindex', '-1');
    alertEl.focus({ preventScroll: false });
  }

  function hideAlert(alertEl) {
    if (!alertEl) return;
    alertEl.classList.remove('is-visible');
  }

  function initPasswordToggle() {
    document.querySelectorAll('.espace-toggle-visibility').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wrap = btn.closest('.espace-input-wrap');
        const input = wrap?.querySelector('input');
        if (!input) return;
        const nowVisible = input.type === 'password';
        input.type = nowVisible ? 'text' : 'password';
        btn.dataset.state = nowVisible ? 'visible' : 'hidden';
        btn.querySelector('i').className = nowVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        btn.setAttribute('aria-label', t(nowVisible ? 'hidePassword' : 'showPassword'));
      });
    });
  }

  function initViewSwitch() {
    const loginView = document.getElementById('espace-view-login');
    const forgotView = document.getElementById('espace-view-forgot');
    if (!loginView || !forgotView) return;

    function showView(view) {
      const showForgot = view === 'forgot';
      loginView.hidden = showForgot;
      forgotView.hidden = !showForgot;
      const target = showForgot ? forgotView : loginView;
      target.querySelector('input')?.focus();
    }

    document.querySelectorAll('[data-espace-view]').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        showView(trigger.dataset.espaceView);
      });
    });
  }

  function initLoginForm() {
    const form = document.getElementById('espace-login-form');
    if (!form) return;
    const idField = document.getElementById('espace-login-id-field');
    const passField = document.getElementById('espace-login-password-field');
    const idInput = document.getElementById('espace-login-id');
    const passInput = document.getElementById('espace-login-password');
    const alertEl = document.getElementById('espace-login-alert');

    idInput.addEventListener('input', () => clearFieldError(idField));
    passInput.addEventListener('input', () => clearFieldError(passField));

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      hideAlert(alertEl);
      let valid = true;

      if (idInput.value.trim().length < 3) {
        setFieldError(idField, t(idInput.value.trim() ? 'errorIdMin' : 'errorRequired'));
        valid = false;
      } else {
        clearFieldError(idField);
      }

      if (passInput.value.length < 6) {
        setFieldError(passField, t(passInput.value ? 'errorPasswordMin' : 'errorRequired'));
        valid = false;
      } else {
        clearFieldError(passField);
      }

      if (!valid) {
        form.querySelector('.has-error input')?.focus();
        return;
      }

      showAlert(alertEl);
    });
  }

  function initForgotForm() {
    const form = document.getElementById('espace-forgot-form');
    if (!form) return;
    const field = document.getElementById('espace-forgot-id-field');
    const input = document.getElementById('espace-forgot-id');
    const alertEl = document.getElementById('espace-forgot-alert');

    input.addEventListener('input', () => clearFieldError(field));

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      hideAlert(alertEl);

      if (input.value.trim().length < 3) {
        setFieldError(field, t(input.value.trim() ? 'errorIdOrEmail' : 'errorRequired'));
        field.querySelector('input')?.focus();
        return;
      }

      clearFieldError(field);
      showAlert(alertEl);
    });
  }

  function init() {
    applyLanguage();
    initPasswordToggle();
    initViewSwitch();
    initLoginForm();
    initForgotForm();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'lang')) {
        const next = document.documentElement.lang;
        if (supported.includes(next) && next !== lang) {
          lang = next;
          localStorage.setItem('fosagri-lang', lang);
          applyLanguage();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
