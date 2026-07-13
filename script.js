/* ============================================================
   ARRESAI — script.js
   Handles: year nav highlighting, ALL section population,
            active year tracking on scroll
   ============================================================ */

// ── DATA ──────────────────────────────────────────────────────
// All show/engagement data in one place.
// Edit entries here; the ALL section auto-populates from this.
const DATA = [
  {
    id: "upcoming",
    label: "Upcoming",
    entries: [
      { title: "Shanghai", meta: "", image: "", blurb: "IMA Low Residency Summer Exhibit, West Bund Art Center, Shanghai." }
    ]
  },
  {
    id: "current",
    label: "Current",
    entries: [
      { title: "IMA Low Residency Masters @ Tisch, NYU", meta: "", image: "ima-sound-lab.png", blurb: "Graduate residency at Tisch School of the Arts, NYU." },
      { title: "Laoshugan", meta: "", image: "1.png", imgPosition: "top", blurb: "" }
    ]
  },
  {
    id: "y2026",
    label: "2026",
    entries: [
      { title: "Friday Gallery, Frieze Week February", meta: "February", image: "", blurb: "\"Fever Dream\" — solo exhibition, Los Angeles." },
      { title: "January Berlin Winter Show", meta: "January", image: "a-woman-3.png", blurb: "IMA Winter Exhibition, Berlin." }
    ]
  },
  {
    id: "y2025",
    label: "2025",
    entries: [
      { title: "Bass Bath", meta: "", image: "bassbath-final.png", blurb: "Audio installation and performance work, Tera House, Joshua Tree." },
      { title: "Summer IMA Show, New York", meta: "Summer", image: "shecouldbeshy.png", blurb: "IMA Summer Exhibition, New York." },
      { title: "Regenerative Blueprint of an AI System", meta: "", image: "regenerative-blueprint-ai.png", blurb: "" },
      { title: "Coaxial Arts Group Show", meta: "", image: "coaxial-arts.png", blurb: "" },
      { title: "Winter ITP Show, Grant Recipient", meta: "Winter", image: "deepsee.png", blurb: "seaSonic3000 — interactive AI and deep-sea senses installation, ITP, NYU." },
      { title: "Lording", meta: "", image: "lording-lamb.png", blurb: "" },
      { title: "Immer Topanga Tower", meta: "", image: "immer-four.png", blurb: "\"Immer\" — Salt Tower, Los Angeles." },
      { title: "How to Have a Pet Funeral", meta: "", image: "pet-funeral.png", blurb: "" },
      { title: "techConnect", meta: "", image: "techconnect.png", blurb: "" }
    ]
  },
  {
    id: "y2024",
    label: "2024",
    entries: [
      { title: "Dreamscapes", meta: "", image: "dreamscape-four.png", blurb: "" }
    ]
  },
  {
    id: "y2023",
    label: "2023",
    entries: [
    ]
  },
  {
    id: "y2022",
    label: "2022",
    entries: [
      { title: "Sound Garden Ground Floor Junction", meta: "July", image: "sound-garden.png", blurb: "Sound installation, Ground Floor Junction." },
      { title: 'Minnow Arts "Arrival Window" Group Show', meta: "", image: "arrival-window-seven.png", flip: true, blurb: "Group exhibition, Minnow Arts." }
    ]
  },
  {
    id: "y2021",
    label: "2021",
    entries: [
      { title: '"And the Darkness Burned Away" Group Show', meta: "December", image: "her-hips.png", blurb: "Her — immersive sonic installation, Saunter Home Wellness Club, Joshua Tree." }
    ]
  },
  {
    id: "y2020",
    label: "2020",
    entries: [
      { title: "FE1", meta: "", image: "FEone-three.png", blurb: "" },
      { title: "White Rock Series", meta: "", image: "lew-three.png", blurb: "Six works made during volunteer work at a local horse rescue during the pandemic." }
    ]
  },
  {
    id: "y2019",
    label: "2019",
    entries: [
      { title: "On the Wings", meta: "", image: "new-years-phallic-purge.png", blurb: "" }
    ]
  },
  {
    id: "y2018",
    label: "2018",
    entries: [
      { title: '"Chrome" Group Show', meta: "December", image: "tumor-all-page.png", blurb: "Blood Box / Spirit Vein and The Most Pertinent Tumor — sculpture and interactive sound." },
      { title: '"Here" Group Show', meta: "September", image: "dissemination-replacement.png", blurb: "Dissemination I & II — acrylic, hydro-beads, steel, misting system." },
      { title: "Moment of Impact", meta: "", image: "impact.png", blurb: "Wax, cardboard, frame, varnish." },
      { title: "Techno Box", meta: "", image: "techno-box-03_V2.png", blurb: "Steel, neon, wood, black onyx, tourmaline, silver, resin, recycled glass, transformer." }
    ]
  },
  {
    id: "partnerships",
    label: "Partnerships & Collaborations",
    entries: [
      { title: "Saguaro Hotel Partnership", meta: "2024", image: "saguaro-two.png", blurb: "Site-specific collaboration, Saguaro Hotel." },
      { title: "Gracie Jiu Jitsu Partnership", meta: "2024", image: "gjjp3.png", blurb: "Creative collaboration with Gracie Jiu Jitsu." },
      { title: "ADMS Guest Speaker", meta: "2024", image: "adms-two.png", blurb: "Guest lecture, Austin." },
      { title: "ADMS Guest Speaker", meta: "2025", image: "adms.JPG", blurb: "Guest lecture, Austin." },
      { title: "Saguaro Hotel Partnership", meta: "2023", image: "", blurb: "Site-specific collaboration, Saguaro Hotel." },
      { title: "AI Studios Collab", meta: "2023", image: "ai-collab-two.png", blurb: "" },
      { title: "Major Moon Private Piece", meta: "2023", image: "major-moon.png", blurb: "Private commissioned work." },
      { title: "Saguaro Hotel Partnership", meta: "2022", image: "saguaro-one.png", blurb: "Site-specific collaboration, Saguaro Hotel." },
      { title: "Nusi Quero Collaboration", meta: "2022", image: "nusi-commission.png", blurb: "Collaborative work with designer Nusi Quero." }
    ]
  },
  {
    id: "performance",
    label: "Performance Works",
    entries: [
      { title: "A Woman Saying No", meta: "2026", image: "a-woman-saying-no.png", blurb: "Sonic composition and performance · Dock11, Berlin." },
      { title: "Paper Magazine — Performance Series", meta: "2024–25", image: "", blurb: "Written and performed in 5-day cycles." },
      { title: "Joshua Tree Music Festival", meta: "2024", image: "", blurb: "Sonic performance · narration by JD Rudometkin." },
      { title: "Echo Park Rising", meta: "2023", image: "", blurb: "Live performance · Los Angeles." },
      { title: "WFNM (We Found New Music)", meta: "2022", image: "", blurb: "Live performance · Los Angeles." }
    ]
  },
  {
    id: "video-works",
    label: "Video Works",
    entries: [
      { title: "Techno Box", meta: "", image: "techno-box-landscape.png", blurb: "Video documentation of the Techno Box work." },
      { title: "Lording", meta: "", image: "lording-lamb.png", blurb: "" },
      { title: "Hollywood Party Girl", meta: "", image: "hollywood-party-girl.png", blurb: "" },
      { title: "Nowhere", meta: "", image: "forever-enough.png", blurb: "" },
      { title: "Venice Walker", meta: "", image: "venice.png", blurb: "" }
    ]
  }
];


// ── POPULATE ALL SECTION ──────────────────────────────────────
function buildAllSection() {
  const container = document.querySelector(".all-entries");
  if (!container) return;

  container.innerHTML = ""; // clear

  const makeCard = (entry, yearLabel) => {
    const card = document.createElement("div");
    card.className = "all-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "all-card__img-wrap";
    if (entry.image) {
      const img = document.createElement("img");
      img.src = entry.image;
      img.alt = entry.title;
      img.className = "all-card__img";
      if (entry.flip) img.style.transform = "scaleX(-1)";
      if (entry.imgPosition) img.style.objectPosition = entry.imgPosition;
      imgWrap.appendChild(img);
    } else {
      imgWrap.classList.add("all-card__img-wrap--empty");
    }
    card.appendChild(imgWrap);

    const year = document.createElement("div");
    year.className = "all-card__year";
    year.textContent = yearLabel.toUpperCase();
    card.appendChild(year);

    const title = document.createElement("div");
    title.className = "all-card__title";
    title.textContent = entry.title.toUpperCase();
    card.appendChild(title);

    if (entry.blurb) {
      const blurb = document.createElement("div");
      blurb.className = "all-card__blurb";
      blurb.textContent = entry.blurb;
      card.appendChild(blurb);
    }

    return card;
  };

  // Detail overlay helpers
  const openAllDetail = (entry, yearLabel) => {
    const overlay = document.getElementById('allDetailOverlay');
    const media = document.getElementById('allDetailMedia');
    const title = document.getElementById('allDetailTitle');
    const subtitle = document.getElementById('allDetailSubtitle');
    const desc = document.getElementById('allDetailDesc');

    // clear
    media.innerHTML = '';
    title.textContent = '';
    subtitle.textContent = '';
    desc.textContent = '';

    // media: prefer video if entry.videoSrc else image
    if (entry.videoSrc) {
      const vid = document.createElement('video');
      vid.src = entry.videoSrc;
      vid.controls = true;
      vid.autoplay = true;
      vid.loop = false;
      media.appendChild(vid);
    } else if (entry.image) {
      const img = document.createElement('img');
      img.src = entry.image;
      img.alt = entry.title;
      media.appendChild(img);
    }

    title.textContent = entry.title;
    subtitle.textContent = yearLabel || '';
    desc.textContent = entry.blurb || '';

    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
  };

  const closeAllDetail = () => {
    const overlay = document.getElementById('allDetailOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    const media = document.getElementById('allDetailMedia');
    if (media) media.innerHTML = '';
  };

  // wire overlay close controls once
  const _overlay = document.getElementById('allDetailOverlay');
  const _closeBtn = document.getElementById('allDetailClose');
  if (_closeBtn && !_closeBtn.dataset.bound) {
    _closeBtn.addEventListener('click', closeAllDetail);
    _closeBtn.dataset.bound = 'true';
  }
  if (_overlay && !_overlay.dataset.bound) {
    _overlay.addEventListener('click', (e) => {
      if (e.target === _overlay) closeAllDetail();
    });
    _overlay.dataset.bound = 'true';
  }
  // ESC to close
  if (!document._allDetailEscBound) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllDetail();
    });
    document._allDetailEscBound = true;
  }

  // Render all non-video, non-partnership, non-research entries first
  DATA.forEach(yearGroup => {
    if (yearGroup.id === "all" || yearGroup.id === "video-works" || yearGroup.id === "partnerships" || yearGroup.id === "research") return;
    yearGroup.entries.forEach(entry => {
      const card = makeCard(entry, yearGroup.label);
      // open detail when clicking the card or title
      card.addEventListener('click', () => openAllDetail(entry, yearGroup.label));
      container.appendChild(card);
    });
  });

  // Full-width divider row
  const divider = document.createElement("div");
  divider.className = "all-video-divider";
  divider.textContent = "VIDEO WORKS";
  container.appendChild(divider);

  // Video entries at the bottom
  const videoGroup = DATA.find(g => g.id === "video-works");
  if (videoGroup) {
    videoGroup.entries.forEach(entry => {
      const card = makeCard(entry, videoGroup.label);
      card.addEventListener('click', () => openAllDetail(entry, videoGroup.label));
      container.appendChild(card);
    });
  }

  // Partnerships divider + entries
  const partnerDivider = document.createElement("div");
  partnerDivider.className = "all-video-divider";
  partnerDivider.textContent = "PARTNERSHIPS & COLLABORATIONS";
  container.appendChild(partnerDivider);

  const partnerGroup = DATA.find(g => g.id === "partnerships");
  if (partnerGroup) {
    partnerGroup.entries.forEach(entry => {
      const card = makeCard(entry, entry.meta || partnerGroup.label);
      card.addEventListener('click', () => openAllDetail(entry, entry.meta || partnerGroup.label));
      container.appendChild(card);
    });
  }

  // Research divider + entries
  const researchDivider = document.createElement("div");
  researchDivider.className = "all-video-divider";
  researchDivider.textContent = "RESEARCH";
  container.appendChild(researchDivider);

  const researchGroup = DATA.find(g => g.id === "research");
  if (researchGroup) {
    researchGroup.entries.forEach(entry => {
      const card = makeCard(entry, entry.meta || researchGroup.label);
      card.addEventListener('click', () => openAllDetail(entry, entry.meta || researchGroup.label));
      container.appendChild(card);
    });
  }
}


// ── ACTIVE YEAR NAV ON SCROLL ─────────────────────────────────
function initScrollSpy() {
  const yearLinks = document.querySelectorAll(".year-link");
  const sections = Array.from(yearLinks)
    .map(link => {
      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      return { link, target };
    })
    .filter(item => item.target);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active from all
          yearLinks.forEach(l => l.classList.remove("active"));
          // Add to matching
          const matched = sections.find(s => s.target === entry.target);
          if (matched) matched.link.classList.add("active");
        }
      });
    },
    { root: document.querySelector('.content-col'), rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach(({ target }) => observer.observe(target));
}


// ── FILTER BY YEAR ───────────────────────────────────────────
function setYearFilter(targetId) {
  const allBlocks = document.querySelectorAll(".year-block");

  allBlocks.forEach(block => {
    if (targetId === "all") {
      // Show only the ALL card grid, hide all year sections
      block.classList.toggle("is-hidden", block.id !== "all");
      return;
    }

    const shouldShow = block.id === targetId;
    block.classList.toggle("is-hidden", !shouldShow);
  });
}

function initYearFiltering() {
  const yearLinks = document.querySelectorAll(".year-link");
  const allLink = document.querySelector(".all-link");
  const sectionLinks = document.querySelectorAll('.section-link');

  yearLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");

      // If the user selected the performance section from the left nav, ensure we build it
      if (targetId === 'performance' && document.getElementById('performanceList')) {
        buildPerformancePage();
      }

      setYearFilter(targetId);
      yearLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const target = document.getElementById(targetId);
      if (target) scrollToAlign(target);
    });
  });

  if (allLink) {
    allLink.addEventListener("click", event => {
      event.preventDefault();
      setYearFilter("all");
      yearLinks.forEach(l => l.classList.remove("active"));

      const target = document.getElementById("all");
      if (target) scrollToAlign(target);
    });
  }

  // Logo click returns to the curated featured landing page
  const logoHomeLink = document.getElementById('logo-home-link');
  if (logoHomeLink) {
    logoHomeLink.addEventListener('click', event => {
      event.preventDefault();
      setYearFilter('featured');
      yearLinks.forEach(l => l.classList.remove('active'));
      sectionLinks.forEach(l => l.classList.remove('active'));

      const target = document.getElementById('featured');
      if (target) scrollToAlign(target);
    });
  }

  // section links behave like year links (filter content)
  if (sectionLinks) {
    sectionLinks.forEach(s => {
      s.addEventListener('click', e => {
        e.preventDefault();
        const targetId = s.getAttribute('href').replace('#','');
        setYearFilter(targetId);
        // clear active on year links and section links
        yearLinks.forEach(l => l.classList.remove('active'));
        sectionLinks.forEach(l => l.classList.remove('active'));
        s.classList.add('active');
        // build performance list if needed
        if (targetId === 'performance' && document.getElementById('performanceList')) buildPerformancePage();
        const target = document.getElementById(targetId);
        if (target) scrollToAlign(target);
      });
    });
  }

// Scroll helper: align the top of `target` so it appears at the same viewport position
// as the top of the content column (which is already aligned with the left nav / logo).
// .content-col is now an independently-scrolling panel, so we scroll it directly
// instead of the window.
function scrollToAlign(target) {
  if (!target) return;

  const contentCol = document.querySelector('.content-col');
  if (!contentCol) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // Use scrollTop 0 as the measurement baseline (rather than the current, possibly
  // mid-animation, scrollTop) to avoid compounding errors from a previous smooth
  // scroll that hasn't finished yet — this was causing the first thumbnail/title
  // to be scrolled slightly past the top edge and appear cropped.
  const containerRect = contentCol.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const targetOffsetWithinContainer = (targetRect.top - containerRect.top) + contentCol.scrollTop;
  // Leave a small buffer so the target's top padding/title is never flush against
  // (or scrolled past) the container's edge.
  const topBuffer = 16;
  const scrollTop = Math.max(0, Math.round(targetOffsetWithinContainer - topBuffer));
  contentCol.scrollTo({ top: scrollTop, behavior: 'auto' });
}
}


// ── LOGO: swap if default placeholder ─────────────────────────
// If you set a real logo src, the fallback text hides via CSS.
// You can also call swapLogo("path/to/logo.png") from console.
function swapLogo(src) {
  const img = document.getElementById("site-logo");
  if (img) img.src = src;
}


// ── TECHN0 BOX PANEL ─────────────────────────────────────────
function initMediaPanels() {
  const panels = document.querySelectorAll(".techno-box-panel, .video-panel");
  const triggers = document.querySelectorAll("[data-panel-target]");
  let activeTrigger = null;

  const hideAllPanels = () => {
    panels.forEach(panel => {
      panel.classList.remove("is-visible");
      panel.setAttribute("aria-hidden", "true");
    });
  };

  const setPanelPosition = trigger => {
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const normalizedTop = Math.min(Math.max(rect.top / viewportHeight, 0.20), 0.85);
    const targetTop = 0.55 + (normalizedTop - 0.5) * 0.35;
    document.documentElement.style.setProperty(
      "--media-panel-top",
      `${Math.min(Math.max(targetTop, 0.3), 0.8) * 100}%`
    );
  };

  triggers.forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.preventDefault();
      const targetId = trigger.dataset.panelTarget;
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const isVisible = panel.classList.contains("is-visible");
      hideAllPanels();
      if (!isVisible) {
        activeTrigger = trigger;
        setPanelPosition(activeTrigger);
        panel.classList.add("is-visible");
        panel.setAttribute("aria-hidden", "false");
      } else {
        activeTrigger = null;
      }
    });
  });

  // .content-col now scrolls independently (the page itself no longer scrolls),
  // so listen there instead of on window.
  const scrollContainer = document.querySelector('.content-col') || window;
  scrollContainer.addEventListener("scroll", () => {
    if (activeTrigger) {
      setPanelPosition(activeTrigger);
    }
  }, { passive: true });
}


// ── CUSTOM AUDIO PLAYER ─────────────────────────────────────
function initAudioPlayers() {
  const players = document.querySelectorAll("[data-audio-player]");

  players.forEach(player => {
    const media = player.querySelector(".audio-player__media");
    const toggle = player.querySelector("[data-audio-toggle]");
    const track = player.querySelector("[data-audio-track]");
    const progress = player.querySelector("[data-audio-progress]");
    const time = player.querySelector("[data-audio-time]");

    if (!media || !toggle || !track || !progress || !time) return;

    const formatTime = seconds => {
      if (!Number.isFinite(seconds)) return "0:00";
      const minutes = Math.floor(seconds / 60);
      const remainder = Math.floor(seconds % 60);
      return `${minutes}:${remainder.toString().padStart(2, "0")}`;
    };

    const updateProgress = () => {
      const percent = media.duration ? (media.currentTime / media.duration) * 100 : 0;
      progress.style.width = `${percent}%`;
      time.textContent = formatTime(media.currentTime);
    };

    toggle.addEventListener("click", () => {
      if (media.paused) {
        media.play();
      } else {
        media.pause();
      }
    });

    media.addEventListener("play", () => {
      toggle.textContent = "❚❚";
      toggle.setAttribute("aria-label", "Pause");
    });

    media.addEventListener("pause", () => {
      toggle.textContent = "▶";
      toggle.setAttribute("aria-label", "Play");
    });

    media.addEventListener("timeupdate", updateProgress);
    media.addEventListener("loadedmetadata", updateProgress);
    media.addEventListener("ended", () => {
      toggle.textContent = "▶";
      toggle.setAttribute("aria-label", "Play");
    });

    track.addEventListener("click", event => {
      const rect = track.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      if (media.duration) {
        media.currentTime = Math.max(0, Math.min(1, percent)) * media.duration;
      }
    });
  });
}


// ── MINI PLAY BUTTON (simple black play/pause for year-items) ──────
function initMiniAudioPlayers() {
  const buttons = document.querySelectorAll("[data-mini-audio-toggle]");

  buttons.forEach(button => {
    const wrap = button.closest(".year-item__audio");
    const media = wrap ? wrap.querySelector("[data-mini-audio-media]") : null;
    if (!media) return;

    button.addEventListener("click", event => {
      // Prevent this click from bubbling up to the work-detail overlay handler
      event.stopPropagation();
      event.preventDefault();

      if (!media.currentSrc && !media.querySelector("source[src]")?.getAttribute("src")) {
        // No audio source set yet — nothing to play.
        return;
      }

      // Pause any other mini players currently playing
      document.querySelectorAll(".year-item__media").forEach(other => {
        if (other !== media && !other.paused) {
          other.pause();
        }
      });

      if (media.paused) {
        media.play();
      } else {
        media.pause();
      }
    });

    media.addEventListener("play", () => {
      button.textContent = "❚❚";
      button.setAttribute("aria-label", "Pause");
    });

    media.addEventListener("pause", () => {
      button.textContent = "▶";
      button.setAttribute("aria-label", "Play");
    });

    media.addEventListener("ended", () => {
      button.textContent = "▶";
      button.setAttribute("aria-label", "Play");
    });
  });
}


// ---------- WORK DETAIL OVERLAY HANDLER ----------
function openWorkDetail({ title = '', meta = '', image = '', desc = '' } = {}) {
  const overlay = document.getElementById('workDetailOverlay');
  const media = document.getElementById('workDetailMedia');
  const titleEl = document.getElementById('workDetailTitle');
  const metaEl = document.getElementById('workDetailMeta');
  const descEl = document.getElementById('workDetailDesc');
  if (!overlay) return;

  media.innerHTML = '';
  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = title || '';
    media.appendChild(img);
  }

  titleEl.textContent = title || '';
  metaEl.textContent = meta || '';
  descEl.textContent = desc || '';

  overlay.classList.add('is-visible');
  overlay.setAttribute('aria-hidden', 'false');

  const closeBtn = document.getElementById('workDetailClose');
  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('is-visible');
      overlay.setAttribute('aria-hidden', 'true');
    });
    closeBtn.dataset.bound = 'true';
  }

  // close on backdrop click
  if (!overlay.dataset.backdropBound) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('is-visible');
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
    overlay.dataset.backdropBound = 'true';
  }

  // ESC key close
  if (!document._workDetailEscBound) {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        overlay.classList.remove('is-visible');
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
    document._workDetailEscBound = true;
  }
}

// Delegated handler: if any element with data-work-title is clicked, open overlay with attributes
document.addEventListener('click', e => {
  const el = e.target.closest('[data-work-title]');
  if (!el) return;
  e.preventDefault();
  const title = el.getAttribute('data-work-title') || '';
  const meta = el.getAttribute('data-work-meta') || '';
  const image = el.getAttribute('data-work-image') || '';
  const desc = el.getAttribute('data-work-desc') || '';
  openWorkDetail({ title, meta, image, desc });
});


// ── INIT ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildAllSection();
  initScrollSpy();
  initYearFiltering();
  initMediaPanels();
  initAudioPlayers();
  initMiniAudioPlayers();
  // Default landing view: curated featured works page. All year/section
  // blocks stay hidden until the user clicks a year or section link.
  setYearFilter('featured');
  // performance page builder
  if (document.getElementById('performanceList')) {
    buildPerformancePage();
  }
  // logo scroll effect removed per user request
  // compute initial left-col top offset and re-compute on resize
  updateLeftColTopFromLogo();
  window.addEventListener('resize', updateLeftColTopFromLogo);
  const logoImg = document.getElementById('site-logo');
  if (logoImg) logoImg.addEventListener('load', updateLeftColTopFromLogo);
});


// Build the performance listing page from DATA
function buildPerformancePage() {
  const perfGroup = DATA.find(g => g.id === 'performance');
  if (!perfGroup) return;

  const list = document.getElementById('performanceList');
  const detail = document.getElementById('performanceDetail');
  const detailContent = document.getElementById('performanceDetailContent');
  const closeBtn = document.getElementById('performanceDetailClose');

  list.innerHTML = '';

  perfGroup.entries.forEach(entry => {
    const row = document.createElement('div');
    row.className = 'performance-item';
    const title = document.createElement('div');
    title.className = 'performance-item__title';
    title.textContent = entry.title;
    const meta = document.createElement('div');
    meta.className = 'performance-item__meta';
    meta.textContent = entry.meta || '';
    row.appendChild(title);
    row.appendChild(meta);

    row.addEventListener('click', () => {
      detail.setAttribute('aria-hidden', 'false');
      detail.classList.remove('is-hidden');
      detailContent.innerHTML = `
        <h3>${entry.title}</h3>
        <p class="performance-item__meta">${entry.meta || ''}</p>
        <p>${entry.blurb || ''}</p>
      `;
    });

    list.appendChild(row);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      detail.setAttribute('aria-hidden', 'true');
      detail.classList.add('is-hidden');
    });
  }
}

// LOGO: evolve distortion with scroll
function initLogoScrollEffect() {
  const logo = document.getElementById('site-logo');
  if (!logo) return;

  let lastScroll = window.scrollY;
  let ticking = false;

  const update = () => {
    const s = window.scrollY;
    // map scroll to small ranges for transform
    const t = Math.min(1, s / 600);
    const rot = -4 - t * 6;      // -4deg to -10deg
    const skew = -6 - t * 8;     // -6deg to -14deg
    const scale = 1.02 + t * 0.03; // 1.02 to 1.05
    const contrast = 1.05 + t * 0.1;
    const saturate = 1.2 + t * 0.15;
    const hue = -6 - t * 6;      // -6deg to -12deg

    logo.style.setProperty('--logo-rot', rot + 'deg');
    logo.style.setProperty('--logo-skew', skew + 'deg');
    logo.style.setProperty('--logo-scale', scale);
    logo.style.setProperty('--logo-contrast', contrast);
    logo.style.setProperty('--logo-saturate', saturate);
    logo.style.setProperty('--logo-hue', hue + 'deg');

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

// compute and set --left-col-top from the bottom of the logo + a fixed gap.
// (Simplified: the previous formula tried to match an internal nav gap but produced
// unreliable, sometimes too-small values, causing the left-col/content-col to sit
// too close to the logo or even overlap it.)
function updateLeftColBottomFromLogo() {
  const logo = document.getElementById('site-logo');
  if (!logo) return;
  const rect = logo.getBoundingClientRect();
  const gap = 24; // px gap between the bottom of the logo and the top of the nav/content
  const topPx = Math.max(40, Math.round(rect.bottom + gap));
  // set the CSS variable on root
  document.documentElement.style.setProperty('--left-col-top', topPx + 'px');
}

// Stable wrapper used by init listeners; calls the detailed computation above.
function updateLeftColTopFromLogo() {
  if (typeof updateLeftColBottomFromLogo === 'function') {
    updateLeftColBottomFromLogo();
    return;
  }
  // fallback: set a reasonable default
  document.documentElement.style.setProperty('--left-col-top', '72px');
}
