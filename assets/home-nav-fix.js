/* Homepage header menu links only. Does not touch hero, slider, video, agenda, maps, or home layout. */
(function () {
  if ((document.body.dataset.page || 'home') !== 'home') return;

  var labels = {
    fr: {
      home: 'Accueil', foundation: 'La Fondation', services: 'Prestations', adhesion: 'Adhesion', news: 'Actualites', events: 'Agenda solidaire', mediatheque: 'Mediatheque', contact: 'Contact', member: 'Espace adherent',
      minister: 'Mot du Ministre', president: 'Mot du President', history: 'Histoire, mission et valeurs', governance: 'Gouvernance',
      prevoyance: 'Prevoyance medico-sociale', culture: 'Culture, loisirs et voyages', scolarisation: 'Scolarisation et formation', logement: 'Acces au logement', projets: 'Projets personnels', education: 'Education et culture',
      adherents: 'Nos adherents et beneficiaires', procedure: 'Procedure adhesion', cotisations: 'Cotisations',
      media2017: 'Galerie 2017', media2018: 'Galerie 2018', media2019: 'Galerie 2019', media2020: 'Galerie 2020',
      coordinates: 'Coordonnees', regional: 'Relais regionaux', social: 'Reseaux sociaux'
    }
  };
  labels.ar = labels.fr;
  labels.zgh = labels.fr;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function lang() {
    var saved = localStorage.getItem('fosagri-lang') || document.documentElement.lang || 'fr';
    return labels[saved] ? saved : 'fr';
  }

  function t(key) {
    return (labels[lang()] && labels[lang()][key]) || labels.fr[key] || '';
  }

  function injectCss() {
    if (document.querySelector('link[data-home-nav-submenu]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/nav-submenu.css';
    link.setAttribute('data-home-nav-submenu', 'true');
    document.head.appendChild(link);
  }

  function navLink(key, href, active) {
    return '<a href="' + href + '"' + (active ? ' class="is-active" aria-current="page"' : '') + '>' + t(key) + '</a>';
  }

  function submenu(key, href, entries) {
    return '<div class="nav-item has-submenu">' +
      '<a href="' + href + '">' + t(key) + '</a>' +
      '<button class="submenu-toggle" type="button" aria-label="' + t(key) + ' submenu" aria-expanded="false"><i class="fa-solid fa-chevron-down"></i></button>' +
      '<div class="nav-submenu">' + entries.map(function (entry) {
        return '<a href="' + entry.href + '">' + t(entry.key) + '</a>';
      }).join('') + '</div>' +
    '</div>';
  }

  function renderHomeMenu() {
    injectCss();
    var menu = document.querySelector('.site-nav');
    if (!menu) return;
    menu.id = menu.id || 'site-nav';
    menu.innerHTML = [
      navLink('home', 'index.html', true),
      submenu('foundation', 'fondation.html', [
        { href: 'fondation.html#mot-ministre', key: 'minister' },
        { href: 'fondation.html#mot-president', key: 'president' },
        { href: 'fondation.html#histoire-mission-valeurs', key: 'history' },
        { href: 'fondation.html#gouvernance', key: 'governance' }
      ]),
      submenu('services', 'prestations.html', [
        { href: 'services/prevoyance.html', key: 'prevoyance' },
        { href: 'services/culture-loisirs-voyages.html', key: 'culture' },
        { href: 'services/formation-scolarisation.html', key: 'scolarisation' },
        { href: 'services/acces-logement.html', key: 'logement' },
        { href: 'services/projets-personnels.html', key: 'projets' },
        { href: 'services/education-culture.html', key: 'education' }
      ]),
      submenu('adhesion', 'adhesion.html', [
        { href: 'adhesion.html#adherents-beneficiaires', key: 'adherents' },
        { href: 'adhesion.html#procedure-adhesion', key: 'procedure' },
        { href: 'adhesion.html#cotisations', key: 'cotisations' }
      ]),
      navLink('news', 'actualites.html', false),
      navLink('events', 'agenda-solidaire.html', false),
      submenu('mediatheque', 'mediatheque.html', [
        { href: 'mediatheque.html#galerie-2017', key: 'media2017' },
        { href: 'mediatheque.html#galerie-2018', key: 'media2018' },
        { href: 'mediatheque.html#galerie-2019', key: 'media2019' },
        { href: 'mediatheque.html#galerie-2020', key: 'media2020' }
      ]),
      submenu('contact', 'contact.html', [
        { href: 'contact.html#coordonnees', key: 'coordinates' },
        { href: 'contact.html#relais-regionaux', key: 'regional' },
        { href: 'contact.html#reseaux-sociaux', key: 'social' }
      ]),
      '<a class="member-link mobile-only" href="espace-adherent.html">' + t('member') + '</a>',
      '<div class="lang-toggle mobile-nav-lang" role="group" aria-label="Choix de langue"><button class="lang-btn" type="button" data-lang="fr">FR</button><button class="lang-btn" type="button" data-lang="ar">AR</button><button class="lang-btn" type="button" data-lang="zgh">Amazigh</button></div>'
    ].join('');
    bindHeaderMenu();
  }

  function bindHeaderMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.site-nav');
    if (toggle && menu) {
      toggle.onclick = function () {
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('is-open', !expanded);
        document.body.classList.toggle('nav-open', !expanded);
      };
    }

    document.querySelectorAll('.submenu-toggle').forEach(function (button) {
      button.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var item = button.closest('.nav-item');
        var isOpen = item && item.classList.contains('is-open');
        document.querySelectorAll('.nav-item.is-open').forEach(function (openItem) { openItem.classList.remove('is-open'); });
        document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(function (openButton) { openButton.setAttribute('aria-expanded', 'false'); });
        if (!isOpen && item) {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
        }
      };
    });

    document.querySelectorAll('.site-nav .lang-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.lang === lang());
      btn.onclick = function () {
        localStorage.setItem('fosagri-lang', btn.dataset.lang || 'fr');
        renderHomeMenu();
      };
    });
  }

  ready(function () {
    renderHomeMenu();
    setTimeout(renderHomeMenu, 250);
    setTimeout(renderHomeMenu, 1000);
  });
})();
