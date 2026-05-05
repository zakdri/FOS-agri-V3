const root = document.documentElement;
const body = document.body;
const page = body.dataset.page || "home";
const servicePageKey = body.dataset.service || "";
const siteData = window.siteData;
const savedLang = localStorage.getItem("fosagri-lang");
let currentLang = savedLang || "fr";
let heroSliderStarted = false;
let headerScrollInitialized = false;
const SUPPORTED_LANGS = new Set(["fr", "ar", "zgh"]);

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

function getLocalizedEntry(entry, lang = currentLang) {
  return entry?.[lang] || entry?.fr || entry?.ar || null;
}

function getTranslationValue(key, lang = currentLang) {
  const branches = [siteData.translations?.[lang], siteData.translations?.fr, siteData.translations?.ar];
  for (const branch of branches) {
    let value = branch;
    key.split(".").forEach((part) => {
      value = value?.[part];
    });
    if (typeof value === "string") {
      return value;
    }
  }
  if (lang !== "fr") {
    console.warn(`[i18n] Missing translation key "${key}" for lang="${lang}". Falling back to FR.`);
  }
  return null;
}

function syncLanguageControls() {
  qsa(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === currentLang);
  });

  // Sync custom dropdown label + selected state
  const labelEl = qs("#lang-dropdown-label");
  const options = qsa(".lang-dropdown-option");
  if (labelEl && options.length) {
    const activeOpt = options.find((o) => o.dataset.lang === currentLang);
    if (activeOpt) {
      // Show only the short code (FR / AR / ⵜⵎⵣⵉⵖⵜ) in the button
      labelEl.textContent = activeOpt.dataset.lang === "fr" ? "FR" :
                            activeOpt.dataset.lang === "ar" ? "AR" : "ⵜⵎⵣⵉⵖⵜ";
    }
    options.forEach((o) => o.classList.toggle("is-selected", o.dataset.lang === currentLang));
  }
}

function initScrollHeader() {
  if (headerScrollInitialized) return;

  const header = document.querySelector(".site-header");
  if (!header) return;

  headerScrollInitialized = true;

  const isHome = (document.body.dataset.page || "home") === "home";
  const topThreshold = 12;
  const directionThreshold = 6;
  const hideThreshold = 72;
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  let ticking = false;

  const showTransparent = () => {
    header.classList.remove("is-scrolled", "is-hidden");
    header.style.transform = "translateY(0)";
    header.style.opacity = "1";
    header.style.pointerEvents = "auto";
  };

  const showSolid = () => {
    header.classList.add("is-scrolled");
    header.classList.remove("is-hidden");
    header.style.transform = "translateY(0)";
    header.style.opacity = "1";
    header.style.pointerEvents = "auto";
  };

  const hideHeader = () => {
    header.classList.add("is-hidden");
    if (isHome) {
      header.classList.remove("is-scrolled");
    } else {
      header.classList.add("is-scrolled");
    }
    header.style.transform = "translateY(calc(-100% - 0.75rem))";
    header.style.opacity = "0";
    header.style.pointerEvents = "none";
  };

  const updateHeaderState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const delta = scrollTop - lastScrollTop;

    if (scrollTop <= topThreshold) {
      showTransparent();
      lastScrollTop = 0;
      ticking = false;
      return;
    }

    if (delta > directionThreshold && scrollTop > hideThreshold) {
      hideHeader();
    } else if (delta < -directionThreshold) {
      showSolid();
    } else if (!isHome && !header.classList.contains("is-hidden")) {
      showSolid();
    }

    lastScrollTop = Math.max(0, scrollTop);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeaderState);
    },
    { passive: true }
  );

  updateHeaderState();
}

function setLanguage(lang) {
  currentLang = SUPPORTED_LANGS.has(lang) ? lang : "fr";
  window.currentLang = currentLang;
  localStorage.setItem("fosagri-lang", currentLang);
  root.lang = currentLang;
  root.dir = currentLang === "ar" ? "rtl" : "ltr";
  body.dataset.lang = currentLang;

  qsa("[data-i18n]").forEach((node) => {
    const value = getTranslationValue(node.dataset.i18n, currentLang);
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  qsa("[data-i18n-html]").forEach((node) => {
    const value = getTranslationValue(node.dataset.i18nHtml, currentLang);
    if (typeof value === "string") {
      node.innerHTML = value;
    }
  });

  syncLanguageControls();
  renderPage();
}

function renderServices() {
  const container = qs("#services-grid");
  if (!container) return;
  container.innerHTML = siteData.services
    .map((service) => {
      const content = getLocalizedEntry(service);
      const href = service.href || "#services";
      const description = content?.description || content?.excerpt || "";
      return `
        <a href="${href}" class="service-card">
          <div class="service-icon" aria-hidden="true">
            <i class="fa-solid ${service.icon}"></i>
          </div>
          <h3>${content.title}</h3>
          <p>${description}</p>
          <span class="service-link">${getTranslationValue("services.more", currentLang) || ""}</span>
        </a>
      `;
    })
    .join("");
}

function renderNews() {
  const newsItems = siteData.news;
  if (!newsItems) return;

  const categories = {
    fr: [
      "Portee strategique",
      "Gouvernance",
      "Formation & Developpement",
      "Direction digitale",
      "Comite innovation",
      "Ressources humaines"
    ],
    ar: [
      "بعد استراتيجي",
      "الحكامة",
      "التكوين والتطوير",
      "التحول الرقمي",
      "لجنة الابتكار",
      "الموارد البشرية"
    ],
    zgh: [
      "ⴰⵙⵓⵍⴰⵏ ⴰⵎⵓⵙⵙⵓ",
      "ⴰⵏⴰⴹⴰⵎ",
      "ⴰⵙⴳⵎⵉ ⴷ ⵜⵏⴼⵍⵉⵜ",
      "ⴰⵙⵏⴼⵍ ⴰⵎⴰⵜⴰⵢ",
      "ⴰⵙⵇⵇⵉⵎ ⵏ ⵓⵙⵏⴽⴻⵔ",
      "ⵉⵎⴰⵍⴰⵙⵏ ⵉⵎⴷⴰⵏⵏ"
    ]
  };

  const localizeNewsDate = (dateStr) => {
    if (currentLang === "fr") return dateStr;
    const monthMap = currentLang === "ar"
      ? {
        Janvier: "يناير",
        Fevrier: "فبراير",
        Mars: "مارس",
        Avril: "أبريل",
        Mai: "ماي",
        Juin: "يونيو",
        Juillet: "يوليوز",
        Aout: "غشت",
        Septembre: "شتنبر",
        Octobre: "أكتوبر",
        Novembre: "نونبر",
        Decembre: "دجنبر"
      }
      : {
        Janvier: "ⵉⵏⵏⴰⵢⵔ",
        Fevrier: "ⴼⵓⵕⴰⵕ",
        Mars: "ⵎⴰⵕⵚ",
        Avril: "ⵉⴱⵔⵉⵔ",
        Mai: "ⵎⴰⵢⵢⵓ",
        Juin: "ⵢⵓⵏⵢⵓ",
        Juillet: "ⵢⵓⵍⵢⵓⵣ",
        Aout: "ⵖⵓⵛⵜ",
        Septembre: "ⵛⵓⵜⴰⵏⴱⵉⵔ",
        Octobre: "ⴽⵜⵓⴱⵔ",
        Novembre: "ⵏⵓⵡⴰⵏⴱⵉⵔ",
        Decembre: "ⴷⵓⵊⴰⵏⴱⵉⵔ"
      };
    const match = dateStr.match(/^(\d{1,2})\s+(.+)\s+(\d{4})$/);
    if (!match) return dateStr;
    const [, day, month, year] = match;
    return `${day} ${monthMap[month] || month} ${year}`;
  };

  const getMeta = (index, item) => {
    const activeCategories = categories[currentLang] || categories.fr;
    const cat = activeCategories[index % activeCategories.length];
    return `${cat} • ${localizeNewsDate(item.date)}`;
  };

  // --- DESKTOP RENDER ---
  const slider = qs("#news-slider-mini");
  const list = qs("#news-list-mini");
  if (slider && list) {
    const sliderItems = newsItems.slice(0, 3);

    slider.innerHTML = sliderItems
      .map((item, index) => {
        const content = getLocalizedEntry(item);
        const imageUrl = getNewsImageUrl(index, item);
        return `
          <a href="#" class="news-slide-mini ${index === 0 ? "active" : ""}" data-mini-index="${index}">
              <img src="${imageUrl}" alt="${content.title}">
              <div class="mini-overlay">
                  <div class="mini-news-title">${content.title}</div>
                  <div class="news-item-meta-mini" style="color: rgba(255,255,255,0.7)">
                    ${getMeta(index, item)}
                  </div>
              </div>
          </a>
        `;
      })
      .join("") + `<div class="carousel-indicators" id="mini-news-dots"></div>`;

    list.innerHTML = (newsItems.slice(3, 6).length > 0 ? newsItems.slice(3, 6) : newsItems.slice(0, 3))
      .map((item, index) => {
        const actualIndex = newsItems.indexOf(item);
        const content = getLocalizedEntry(item);
        const imageUrl = getNewsImageUrl(actualIndex);
        return `
          <a href="#" class="news-item-mini">
              <img src="${imageUrl}" alt="${content.title}">
              <div class="news-item-content-mini">
                  <div class="news-item-title-mini">${content.title}</div>
                  <div class="news-item-meta-mini">${getMeta(actualIndex, item)}</div>
              </div>
          </a>
        `;
      }).join("");

    renderMiniDots(sliderItems.length);
  }

  // --- MOBILE RENDER (Original Cards) ---
  const mobileContainer = qs("#news-grid");
  if (mobileContainer) {
    mobileContainer.innerHTML = newsItems
      .map((item, index) => {
        const content = getLocalizedEntry(item);
        const imageUrl = getNewsImageUrl(index, item);
        return `
          <article class="news-card" data-news-index="${index}">
            <div class="news-media" style="background-image: url('${imageUrl}')" aria-hidden="true"></div>
            <div class="news-body">
              <span class="news-date">${getMeta(index, item)}</span>
              <h3>${content.title}</h3>
              <p>${content.excerpt}</p>
            </div>
          </article>
        `;
      })
      .join("");
  }
}

function getNewsImageUrl(index, item) {
  if (item?.image) {
    return item.image.startsWith("./assets/") ? item.image.slice(2) : item.image.replace(/^\.\//, "assets/");
  }

  // Map index to existing news images or placeholders
  const images = [
    "assets/news-images/Programme de vacances et loisirs 2025.webp",
    "assets/news-images/convention-pathologie-bouregreg.jpg",
    "assets/news-images/operation-omra-2025.jpg",
    "assets/news-images/partenariat-activite-sportive.jpg",
    "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=900&q=80",
    "assets/news-images/Campagne d'information regionale.jpg"
  ];
  return images[index % images.length];
}

function renderMiniDots(count) {
  const dotsHost = qs("#mini-news-dots");
  if (!dotsHost) return;
  dotsHost.innerHTML = Array.from({ length: count }, (_, i) =>
    `<div class="carousel-dot ${i === 0 ? "active" : ""}" onclick="goToMiniSlide(${i})"></div>`
  ).join("");
}

window.goToMiniSlide = function (index) {
  const slides = qsa(".news-slide-mini");
  const dots = qsa("#mini-news-dots .carousel-dot");
  if (!slides.length) return;

  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));

  window.__miniNewsIndex = index;
};


/* =====================================================
   AGENDA - Interactive Calendar + Tabbed Events
   ===================================================== */
(function () {
  const MONTH_NAMES_FR = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
  const MONTH_NAMES_AR = ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"];
  const MONTH_NAMES_ZGH = ["ⵉⵏⵏⴰⵢⵔ", "ⴼⵓⵕⴰⵕ", "ⵎⴰⵕⵚ", "ⵉⴱⵔⵉⵔ", "ⵎⴰⵢⵢⵓ", "ⵢⵓⵏⵢⵓ", "ⵢⵓⵍⵢⵓⵣ", "ⵖⵓⵛⵜ", "ⵛⵓⵜⴰⵏⴱⵉⵔ", "ⴽⵜⵓⴱⵔ", "ⵏⵓⵡⴰⵏⴱⵉⵔ", "ⴷⵓⵊⴰⵏⴱⵉⵔ"];
  const WEEKDAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const WEEKDAYS_AR = ["الاث", "الثل", "الأر", "الخم", "الجم", "السب", "الأح"];
  const WEEKDAYS_ZGH = ["ⴰⵢⵏ", "ⴰⵙⵉ", "ⴰⴽⵕ", "ⴰⴽⵡ", "ⴰⵙⵉⵎ", "ⴰⵙⵉⴹ", "ⴰⵙⴰ"];

  let calYear, calMonth, activeTab = "upcoming", selectedDate = null;

  function parseDate(str) {
    // Format: DD/MM/YYYY
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

  function formatDateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function getEventDates() {
    const map = {};
    (siteData.events || []).forEach(ev => {
      const d = parseDate(ev.date);
      if (!d) return;
      const key = formatDateKey(d);
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }

  function renderCalendar() {
    const labelEl = document.getElementById("cal-month-label");
    const wdEl = document.getElementById("cal-weekdays");
    const daysEl = document.getElementById("cal-days");
    if (!labelEl || !wdEl || !daysEl) return;

    const lang = window.currentLang || "fr";
    const months = lang === "ar" ? MONTH_NAMES_AR : lang === "zgh" ? MONTH_NAMES_ZGH : MONTH_NAMES_FR;
    const weekdays = lang === "ar" ? WEEKDAYS_AR : lang === "zgh" ? WEEKDAYS_ZGH : WEEKDAYS_FR;

    labelEl.textContent = `${months[calMonth]} ${calYear}`;

    wdEl.innerHTML = weekdays.map(d => `<div class="cal-weekday">${d}</div>`).join("");

    const today = new Date();
    const todayKey = formatDateKey(today);
    const eventDates = getEventDates();

    // First day of month (0=Sun, 1=Mon...) -> offset to Mon-first
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const offset = (firstDay === 0) ? 6 : firstDay - 1;
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

    let html = "";
    for (let i = 0; i < offset; i++) {
      html += `<button class="cal-day is-empty" tabindex="-1" aria-hidden="true"></button>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(calYear, calMonth, d);
      const key = formatDateKey(dateObj);
      const isPast = dateObj < today && key !== todayKey;
      const hasEvent = !!eventDates[key];
      const isToday = key === todayKey;
      const isSelected = key === selectedDate;
      let cls = "cal-day";
      if (isPast) cls += " is-past";
      if (hasEvent) cls += " has-event";
      if (isToday) cls += " is-today";
      if (isSelected) cls += " is-selected";
      html += `<button class="${cls}" data-date="${key}" aria-label="${d} ${months[calMonth]} ${calYear}">${d}</button>`;
    }
    daysEl.innerHTML = html;

    // Click handlers on days
    daysEl.querySelectorAll(".cal-day:not(.is-empty)").forEach(btn => {
      btn.addEventListener("click", () => {
        const d = btn.dataset.date;
        if (selectedDate === d) {
          selectedDate = null;
        } else {
          selectedDate = d;
        }
        renderCalendar();
        renderAgendaList();
      });
    });
  }

  function renderAgendaList() {
    const listEl = document.getElementById("agenda-list");
    const filterLabel = document.getElementById("agenda-filter-label");
    if (!listEl) return;

    const lang = window.currentLang || "fr";
    const months = lang === "ar" ? MONTH_NAMES_AR : lang === "zgh" ? MONTH_NAMES_ZGH : MONTH_NAMES_FR;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const filterPrefix = lang === "ar" ? "تصفية :" : lang === "zgh" ? "ⴰⵙⵜⴰⵢ :" : "Filtre :";
    const emptyLabel = lang === "ar" ? "لا يوجد حدث لهذه الفترة" : lang === "zgh" ? "ⵓⵔ ⵉⵍⵉ ⵓⵙⴳⵔⴰⵡ ⵉ ⵜⵉⵣⵉ ⴰⴷ" : "Aucun evenement pour cette periode";
    const detailsLabel = lang === "ar" ? "عرض التفاصيل" : lang === "zgh" ? "ⵙⴽⵏ ⵉⴼⵔⴰⴹ" : "Voir details";

    let events = (siteData.events || []).map(ev => {
      const d = parseDate(ev.date);
      return { ...ev, _date: d };
    }).filter(ev => ev._date !== null);

    // Filter by tab
    if (activeTab === "upcoming") {
      events = events.filter(ev => ev._date >= today);
      events.sort((a, b) => a._date - b._date);
    } else {
      events = events.filter(ev => ev._date < today);
      events.sort((a, b) => b._date - a._date);
    }

    // Filter by selected date
    if (selectedDate) {
      events = events.filter(ev => formatDateKey(ev._date) === selectedDate);
      const [y, m, d] = selectedDate.split("-");
      const label = lang === "ar"
        ? `${d} ${months[+m - 1]} ${y}`
        : `${d} ${months[+m - 1]} ${y}`;
      filterLabel.textContent = `${filterPrefix} ${label}`;
    } else {
      filterLabel.textContent = "";
    }

    if (events.length === 0) {
      listEl.innerHTML = `<div class="agenda-empty">${emptyLabel}</div>`;
      return;
    }

    listEl.innerHTML = events.map(ev => {
      const content = getLocalizedEntry(ev, lang);
      const isPast = ev._date < today;
      const day = String(ev._date.getDate()).padStart(2, "0");
      const mon = months[ev._date.getMonth()].substring(0, 3).toUpperCase();
      const yr = ev._date.getFullYear();
      const iconBg = ev.iconBg || "#e8f5ee";
      const iconColor = ev.iconColor || "#1f6a43";
      const iconClass = ev.icon || "fa-calendar-day";
      const typeBg = ev.typeColor ? ev.typeColor + "18" : "#e8f5ee";
      const typeCol = ev.typeColor || "#1f6a43";
      const typeLabel = lang === "ar" ? (ev.typeAr || ev.type || "") : lang === "zgh" ? (ev.typeZgh || ev.type || "") : (ev.type || "");
      const loc = lang === "ar" ? (ev.locationAr || ev.location || "") : lang === "zgh" ? (ev.locationZgh || ev.location || "") : (ev.location || "");
      const time = ev.time || "";
      return `
        <article class="agenda-event-card${isPast ? " is-past" : ""}">
          <div class="event-date-block">
            <span class="edb-day">${day}</span>
            <span class="edb-month">${mon}</span>
            <span class="edb-year">${yr}</span>
          </div>
          <div class="event-icon-circle" style="background:${iconBg};color:${iconColor}">
            <i class="fa-solid ${iconClass}"></i>
          </div>
          <div class="event-body">
            <p class="event-title">${content.title}</p>
            <p class="event-excerpt">${content.excerpt}</p>
            <div class="event-meta">
              ${loc ? `<span><i class="fa-solid fa-location-dot"></i> ${loc}</span>` : ""}
              ${time ? `<span><i class="fa-regular fa-clock"></i> ${time}</span>` : ""}
            </div>
          </div>
          <div class="event-side">
            ${typeLabel ? `<span class="event-type-badge" style="background:${typeBg};color:${typeCol}">${typeLabel}</span>` : ""}
            <a href="#agenda-calendar" class="event-detail-link">${detailsLabel} <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>`;
    }).join("");
  }

  function initAgenda() {
    const today = new Date();
    calYear = today.getFullYear();
    calMonth = today.getMonth();

    const prevBtn = document.getElementById("cal-prev");
    const nextBtn = document.getElementById("cal-next");
    if (prevBtn) prevBtn.addEventListener("click", () => {
      calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; }
      renderCalendar();
    });
    if (nextBtn) nextBtn.addEventListener("click", () => {
      calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; }
      renderCalendar();
    });

    document.querySelectorAll(".agenda-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        activeTab = tab.dataset.tab;
        selectedDate = null;
        document.querySelectorAll(".agenda-tab").forEach(t => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        renderCalendar();
        renderAgendaList();
      });
    });

    renderCalendar();
    renderAgendaList();
  }

  window.__initAgenda = initAgenda;
  window.__rerenderAgenda = function () { renderCalendar(); renderAgendaList(); };
})();

function renderEvents() {
  // Agenda is now initialized via initAgenda after all data is ready
  if (window.__initAgenda) window.__initAgenda();
}


function renderStats() {
  const container = qs("#stats-grid");
  if (!container) return;

  container.innerHTML = siteData.stats
    .map(
      (item, index) => `
        <article class="stat-card">
          <div class="stat-icon" aria-hidden="true"><i class="fa-solid ${item.icon || ["fa-users", "fa-file-signature", "fa-map-location-dot", "fa-coins"][index] || "fa-chart-line"}"></i></div>
          <strong>${item.value}</strong>
          <span>${item[currentLang] || item.fr || item.ar || ""}</span>
        </article>
      `
    )
    .join("");

  const quote = qs("#testimonial-quote");
  const author = qs("#testimonial-author");
  if (quote && author && siteData.testimonials?.[currentLang]) {
    quote.textContent = siteData.testimonials[currentLang].quote;
    author.textContent = siteData.testimonials[currentLang].author;
  }
}

function renderRegions() {
  const card = qs("#region-card");
  const infoTitle = qs("#region-title");
  const infoText = qs("#region-text");
  const infoDot = qs("#region-dot");
  const mapMount = qs("#morocco-map-object");
  const mapPoints = qs("#map-points");
  if (!card || !mapMount) return;

  let activeRegionKey = mapMount.dataset.activeRegion || "tanger-tetouan-al-hoceima";
  let mapWidth = 680;
  let mapHeight = 680;

  const getRegion = (key) => siteData.regions.find((item) => item.key === key) || siteData.regions[0];

  const getMapDimensions = (svgRoot) => {
    const viewBox = svgRoot?.viewBox?.baseVal;
    if (viewBox && viewBox.width && viewBox.height) {
      return { width: viewBox.width, height: viewBox.height };
    }
    return { width: 680, height: 680 };
  };

  const setActiveRegion = (key) => {
    activeRegionKey = key;
    mapMount.dataset.activeRegion = key;
    updateRegionContent(key);
    paintMap();
  };

  const assignTargets = (entries, getX, getY) => {
    const remainingEntries = entries.map((entry) => ({ ...entry }));
    const remainingRegions = siteData.regions.map((region) => ({ ...region }));
    const matches = [];

    while (remainingEntries.length && remainingRegions.length) {
      let best = null;

      remainingEntries.forEach((entry, entryIndex) => {
        remainingRegions.forEach((region, regionIndex) => {
          const dx = getX(entry) - region.target.x;
          const dy = getY(entry) - region.target.y;
          const distance = Math.hypot(dx, dy);
          if (!best || distance < best.distance) {
            best = { distance, entryIndex, regionIndex };
          }
        });
      });

      const [pickedEntry] = remainingEntries.splice(best.entryIndex, 1);
      const [pickedRegion] = remainingRegions.splice(best.regionIndex, 1);
      matches.push({ key: pickedRegion.key, entry: pickedEntry });
    }

    return matches;
  };

  const updateRegionContent = (key) => {
    const region = getRegion(key);
    const content = getLocalizedEntry(region);
    card.innerHTML = `
      <h3>${content.name}</h3>
      <p class="region-subtitle">${content.delegate}</p>
      <p>${content.details}</p>
    `;
    if (infoTitle) infoTitle.textContent = content.name;
    if (infoText) infoText.textContent = content.details;
    if (infoDot) {
      infoDot.style.backgroundColor = "#c8a44d";
      infoDot.style.opacity = "1";
    }
  };

  const paintMap = (hoverKey = null) => {
    const pathMap = mapMount.__pathMap;
    if (!pathMap) return;

    const svgRoot = mapMount.querySelector("svg");
    if (!svgRoot) return;

    let overlayLayer = svgRoot.querySelector("#map-overlays");
    if (!overlayLayer) {
      overlayLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
      overlayLayer.id = "map-overlays";
      svgRoot.appendChild(overlayLayer);
    }
    overlayLayer.innerHTML = "";

    const goldColor = "#c8a44d";
    const defaultColor = "#266a63";

    pathMap.forEach((path, key) => {
      const region = getRegion(key);
      const isHover = hoverKey === key;
      const isActive = activeRegionKey === key;
      const isStateful = isHover || isActive;

      path.style.fill = isStateful ? goldColor : defaultColor;
      path.style.stroke = "#eef3ec";
      path.style.strokeWidth = "1.4";
      path.style.cursor = "pointer";
      path.style.transition = "fill 0.18s ease, opacity 0.18s ease";
      path.style.opacity = isStateful ? "1" : "0.98";

      if (isStateful) {
        const target = mapMount.__pathCenters?.get(key) || region.target;
        const content = getLocalizedEntry(region);

        // Draw dot
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", target.x);
        circle.setAttribute("cy", target.y);
        circle.setAttribute("r", "5.5");
        circle.setAttribute("fill", "#1f6a43");
        circle.setAttribute("stroke", "#fff");
        circle.setAttribute("stroke-width", "2");
        overlayLayer.appendChild(circle);

        // White halo behind text
        const textBg = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textBg.setAttribute("x", target.x);
        textBg.setAttribute("y", target.y - 12);
        textBg.setAttribute("text-anchor", "middle");
        textBg.setAttribute("fill", "none");
        textBg.setAttribute("stroke", "#ffffff");
        textBg.setAttribute("stroke-width", "3");
        textBg.setAttribute("stroke-linejoin", "round");
        textBg.setAttribute("font-size", "18");
        textBg.setAttribute("font-weight", "800");
        textBg.setAttribute("font-family", "Inter, Outfit, sans-serif");
        textBg.style.pointerEvents = "none";
        textBg.textContent = content.name;
        overlayLayer.appendChild(textBg);

        // Main label text
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", target.x);
        text.setAttribute("y", target.y - 12);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "#1f6a43");
        text.setAttribute("font-size", "18");
        text.setAttribute("font-weight", "800");
        text.setAttribute("font-family", "Inter, Outfit, sans-serif");
        text.style.pointerEvents = "none";
        text.textContent = content.name;
        overlayLayer.appendChild(text);
      }
    });
  };

  const assignRegionsToPaths = (paths) =>
    assignTargets(
      paths.map((path) => {
        const box = path.getBBox();
        return {
          path,
          cx: box.x + box.width / 2,
          cy: box.y + box.height / 2
        };
      }),
      (entry) => entry.cx,
      (entry) => entry.cy
    ).map(({ key, entry }) => ({ key, path: entry.path }));

  const bindInteractiveMap = () => {
    const svgRoot = mapMount.querySelector("svg");
    if (!svgRoot) return;
    const dimensions = getMapDimensions(svgRoot);
    mapWidth = dimensions.width;
    mapHeight = dimensions.height;

    const paths = [
      ...svgRoot.querySelectorAll(".region-shape"),
      ...svgRoot.querySelectorAll("#mapLayer path"),
      ...svgRoot.querySelectorAll("path.st0")
    ].filter((path, index, list) => list.indexOf(path) === index);
    if (paths.length < siteData.regions.length) return;
    svgRoot.querySelectorAll("circle").forEach((circle) => {
      circle.style.display = "none";
    });

    if (!mapMount.__pathMap) {
      mapMount.__pathMap = new Map();
      mapMount.__pathCenters = new Map();
      assignRegionsToPaths(paths).forEach(({ key, path }) => {
        mapMount.__pathMap.set(key, path);
        const box = path.getBBox();
        mapMount.__pathCenters.set(key, {
          x: box.x + box.width / 2,
          y: box.y + box.height / 2
        });
        path.dataset.region = key;
        path.addEventListener("mouseenter", () => {
          updateRegionContent(key);
          paintMap(key);
        });
        path.addEventListener("mouseleave", () => {
          updateRegionContent(activeRegionKey);
          paintMap();
        });
        path.addEventListener("click", () => setActiveRegion(key));
      });
    }

    if (mapPoints) mapPoints.innerHTML = "";
    updateRegionContent(activeRegionKey);
    paintMap();
  };

  if (!siteData.regions.some((region) => region.key === activeRegionKey)) {
    activeRegionKey = siteData.regions[0].key;
  }

  updateRegionContent(activeRegionKey);
  if (mapPoints) mapPoints.innerHTML = "";

  if (mapMount.querySelector("svg")) {
    mapMount.__svgLoaded = true;
    bindInteractiveMap();
  } else if (!mapMount.__svgLoaded) {
    fetch("assets/morocco-map.svg")
      .then((response) => response.text())
      .then((svgMarkup) => {
        mapMount.innerHTML = svgMarkup;
        const svgRoot = mapMount.querySelector("svg");
        if (svgRoot) {
          svgRoot.removeAttribute("width");
          svgRoot.removeAttribute("height");
          svgRoot.classList.add("morocco-map-svg");
        }
        bindInteractiveMap();
      })
      .catch(() => {
        mapMount.textContent = "Carte indisponible";
      });
    mapMount.__svgLoaded = true;
  } else {
    bindInteractiveMap();
  }
}

function renderPartners() {
  const container = qs("#partners-grid");
  if (!container) return;

  const logos = siteData.partners
    .map(
      (partner) => `
        <article class="partner-card">
          <img src="${partner.logo}" alt="${partner.name}" loading="lazy" />
        </article>
      `
    )
    .join("");

  // Duplicate logos for seamless infinite loop
  container.innerHTML = `
    <div class="partners-set">${logos}</div>
    <div class="partners-set" aria-hidden="true">${logos}</div>
  `;
}

function renderServicePage() {
  if (page !== "service") return;
  const service = siteData.services.find((item) => item.key === servicePageKey || item.id === servicePageKey);
  if (!service) return;

  const content = getLocalizedEntry(service);
  const title = qs("#service-title");
  const description = qs("#service-description");
  const detail = qs("#service-detail");
  const icon = qs("#service-icon");

  if (title) title.textContent = content.title;
  if (description) description.textContent = content.description || content.excerpt || "";
  if (detail) detail.textContent = content.detail || content.excerpt || "";
  if (icon) icon.className = `fa-solid ${service.icon}`;
}

function renderPage() {
  // Shared render cycle keeps home and service pages on the same data source.
  renderServices();
  renderNews();
  renderEvents();
  renderStats();
  renderRegions();
  renderPartners();
  renderServicePage();
  initRevealAnimations();
  initNewsSlider();
  initHeroSlider();
}

function initMenu() {
  const toggle = qs(".menu-toggle");
  const nav = qs(".site-nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
    document.body.classList.toggle("menu-open", !expanded);
  });

  // Close menu when any nav link is clicked
  qsa(".site-nav a", nav).forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside (empty space)
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)) {
      closeMenu();
    }
  });
}

function initLangButtons() {
  // Mobile buttons
  qsa(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  // Custom desktop dropdown
  const wrap = qs("#lang-dropdown-wrap");
  const btn  = qs("#lang-dropdown-btn");
  const panel = qs("#lang-dropdown-panel");
  if (!wrap || !btn || !panel) return;

  const openDropdown = () => {
    wrap.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    wrap.setAttribute("aria-expanded", "true");
    // Focus first option
    const first = panel.querySelector(".lang-dropdown-option");
    if (first) first.focus();
  };

  const closeDropdown = () => {
    wrap.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    wrap.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    wrap.classList.contains("is-open") ? closeDropdown() : openDropdown();
  });

  qsa(".lang-dropdown-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      setLanguage(opt.dataset.lang);
      closeDropdown();
      btn.focus();
    });
    opt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setLanguage(opt.dataset.lang);
        closeDropdown();
        btn.focus();
      } else if (e.key === "Escape") {
        closeDropdown();
        btn.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = opt.nextElementSibling;
        if (next) next.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = opt.previousElementSibling;
        if (prev) prev.focus();
      }
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) closeDropdown();
  });

  // Close on Escape globally
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });
}

function initForm() {
  const form = qs(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(getTranslationValue("formNotice", currentLang) || getTranslationValue("formNotice", "fr") || "");
    form.reset();
  });
}

function initHeroSlider() {
  if (heroSliderStarted) return;
  const slides = qsa(".hero-slide");
  const dotsHost = qs("#hero-dots");
  if (!slides.length || !dotsHost) return;

  slides.forEach((slide) => {
    const image = slide.dataset.image;
    if (image) {
      slide.style.backgroundImage = `url("${image}")`;
    }
  });

  let activeIndex = 0;
  dotsHost.innerHTML = slides
    .map(
      (_, index) => `
        <button
          class="hero-dot ${index === 0 ? "is-active" : ""}"
          type="button"
          data-slide-index="${index}"
          aria-label="Slide ${index + 1}"
        ></button>
      `
    )
    .join("");

  const dots = qsa(".hero-dot");
  let slideTimeout;

  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % slides.length;
    setActiveSlide(nextIndex);
  };

  const scheduleNext = () => {
    clearTimeout(slideTimeout);
    const currentSlide = slides[activeIndex];
    const video = currentSlide.querySelector("video");

    if (!video) {
      slideTimeout = setTimeout(nextSlide, 5000);
    }
  };

  const setActiveSlide = (index) => {
    activeIndex = index;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.classList.toggle("is-active", isActive);

      const video = slide.querySelector("video");
      if (video) {
        if (isActive) {
          video.loop = false;
          video.currentTime = 0;
          video.play().catch(() => { });
          video.onended = nextSlide;
        } else {
          video.pause();
          video.onended = null;
        }
      }
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    scheduleNext();
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setActiveSlide(Number(dot.dataset.slideIndex));
    });
  });

  // Initialize the first slide
  setActiveSlide(0);

  heroSliderStarted = true;
}

function initRevealAnimations() {
  const staggerSelector = ".service-card, .service-box, .news-card, .news-slide-mini, .news-item-mini, .timeline-item, .agenda-event-card, .stat-card, .partner-card, .contact-item, .member-card";
  const targets = qsa(
    ".section-head, .intro-grid > *, .service-card, .service-box, .service-summary, .news-card, .news-slide-mini, .news-item-mini, .timeline-item, .agenda-event-card, .stat-card, .testimonial-card, .region-card, .member-card, .partner-card, .contact-item, .footer-grid > div"
  );
  if (!targets.length) return;

  targets.forEach((item) => {
    item.classList.add("reveal-on-scroll");

    const siblings = item.parentElement
      ? [...item.parentElement.children].filter((child) => child.matches?.(staggerSelector))
      : [];

    if (siblings.length > 1 && item.matches?.(staggerSelector)) {
      const delay = Math.min(siblings.indexOf(item), 5) * 70;
      item.style.transitionDelay = `${delay}ms`;
    }
  });

  if (prefersReducedMotion?.matches || !("IntersectionObserver" in window)) {
    targets.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  targets.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      observer.observe(item);
    }
  });
}

function initNewsSlider() {
  // Desktop Slider
  initDesktopNewsSlider();
  // Mobile Slider
  initMobileNewsSlider();
}

function initDesktopNewsSlider() {
  const slider = qs("#news-slider-mini");
  if (!slider) return;

  const slides = qsa(".news-slide-mini");
  if (!slides.length) return;

  window.__miniNewsIndex = 0;

  const startAuto = () => {
    clearInterval(window.__miniNewsTimer);
    window.__miniNewsTimer = setInterval(() => {
      const nextIndex = (window.__miniNewsIndex + 1) % slides.length;
      goToMiniSlide(nextIndex);
    }, 5000);
  };

  startAuto();

  slider.onmouseenter = () => clearInterval(window.__miniNewsTimer);
  slider.onmouseleave = () => startAuto();
}

function initMobileNewsSlider() {
  const track = qs("#news-grid");
  const prev = qs("#news-prev");
  const next = qs("#news-next");
  const dotsHost = qs("#news-dots");
  if (!track || !prev || !next || !dotsHost) return;
  const viewport = track.closest(".news-viewport");

  const cards = qsa(".news-card");
  if (!cards.length) return;

  const perView = () => {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 980) return 2;
    return 3;
  };

  let currentIndex = 0;
  const maxIndex = () => Math.max(0, cards.length - perView());

  const renderDots = () => {
    dotsHost.innerHTML = Array.from({ length: maxIndex() + 1 }, (_, index) => {
      return `<button class="news-dot ${index === 0 ? "is-active" : ""}" type="button" data-news-dot="${index}" aria-label="Actualites ${index + 1}"></button>`;
    }).join("");

    qsa(".news-dot").forEach((dot) => {
      dot.onclick = () => {
        goTo(Number(dot.dataset.newsDot));
        startAuto();
      };
    });
  };

  const update = () => {
    const card = cards[0];
    if (!card) return;
    const gap = 24;
    const width = card.getBoundingClientRect().width + gap;
    const isRtl = document.documentElement.dir === "rtl";
    const x = isRtl ? currentIndex * width : -currentIndex * width;
    track.style.transform = `translateX(${x}px)`;
    qsa(".news-dot").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const goTo = (index) => {
    const last = maxIndex();
    if (index > last) currentIndex = 0;
    else if (index < 0) currentIndex = last;
    else currentIndex = index;
    update();
  };

  const startAuto = () => {
    clearInterval(window.__newsAutoTimer);
    window.__newsAutoTimer = setInterval(() => {
      goTo(currentIndex + 1);
    }, 4500);
  };

  const stopAuto = () => {
    clearInterval(window.__newsAutoTimer);
  };

  prev.onclick = () => {
    goTo(currentIndex - 1);
    startAuto();
  };
  next.onclick = () => {
    goTo(currentIndex + 1);
    startAuto();
  };

  window.addEventListener("resize", () => {
    currentIndex = 0;
    renderDots();
    update();
  });

  if (viewport) {
    viewport.onmouseenter = stopAuto;
    viewport.onmouseleave = startAuto;
  }

  renderDots();
  update();
  startAuto();
}

initMenu();
initLangButtons();
initForm();
initHeroSlider();
initScrollHeader();
setLanguage(currentLang);

function initFloatingSocialButton() {
  qs("#back-to-top")?.remove();
  if (qs(".floating-social")) return;

  const socialLinks = qsa(".footer-social-link")
    .filter((link) => link.getAttribute("href") && link.getAttribute("href") !== "#")
    .map((link) => ({
      href: link.href,
      label: link.getAttribute("aria-label") || "Social link",
      html: link.innerHTML
    }))
    .filter((link, index, list) => list.findIndex((item) => item.href === link.href) === index);

  if (!socialLinks.length) return;

  const host = document.createElement("div");
  host.className = "floating-social";
  host.innerHTML = `
    <div class="floating-social-links" aria-label="Liens sociaux rapides">
      ${socialLinks
        .map(
          (link) => `
            <a class="floating-social-link" href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
              ${link.html}
            </a>
          `
        )
        .join("")}
    </div>
    <button class="floating-social-main" type="button" aria-label="Ouvrir les liens sociaux">
      <i class="fa-solid fa-share-nodes"></i>
    </button>
  `;

  document.body.appendChild(host);

  const toggle = host.querySelector(".floating-social-main");
  const close = () => host.classList.remove("is-open");
  const toggleOpen = () => host.classList.toggle("is-open");

  toggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleOpen();
  });

  document.addEventListener("click", (event) => {
    if (!host.classList.contains("is-open")) return;
    if (!host.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

initFloatingSocialButton();

