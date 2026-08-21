document.addEventListener("DOMContentLoaded", function () {

  // Page Update ---------------------------------------------------------------------------------------------

  const updateModalOverlay = document.getElementById('updateModalOverlay');
  const updateModalOkBtn = document.getElementById('updateModalOkBtn');

  updateModalOkBtn.addEventListener('click', () => {
    updateModalOverlay.classList.add('hidden');
    sessionStorage.setItem('updateNoticeSeen', 'true');
  });

  // Video click event listeners ---------------------------------------------------------------------------------------------
  const videoLinks = {
    ".color_flim_video": "https://www.instagram.com/p/CxdPxCiST7_/",
    ".mount_video": "https://www.instagram.com/p/Cuw7gtkgLLC/",
    ".dj_video": "https://www.instagram.com/reel/CoCyW-hDQb4/",
    ".gym_video": "https://www.instagram.com/reel/CqQb8U6DkY8/",
    ".drinks2_video": "https://www.instagram.com/reel/CsN3ShbggKC/",
    ".rewind_video": "https://www.instagram.com/reel/C1e2B47S4h9/"
  };

  Object.keys(videoLinks).forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener("click", () => {
        window.open(videoLinks[selector], "_blank");
      });
    }
  });

  // Navbar's Dynamic Hight

  const navbarForMobile = document.querySelector("nav");

  function updateNavbarHeight() {
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navbarForMobile.offsetHeight}px`
    );
  }

  updateNavbarHeight();
  window.addEventListener("resize", updateNavbarHeight);

  // Navbar opacity on scroll ------------------------------------------------------------------------------------------------
  const navbar = document.querySelector("nav");
  const topContainer = document.querySelector(".top-container");

  const mediaQuery = window.matchMedia("(min-width: 768px)");

  function handleScroll() {
    if (!mediaQuery.matches) return;

    const topContainerHeight = topContainer.offsetHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;
    const opacity = 1 - (scrollPosition / topContainerHeight);

    navbar.style.opacity = Math.max(0, opacity).toFixed(2);
  }

  window.addEventListener("scroll", handleScroll);

  // Burger menu toggle --------------------------------------------------------------------------------------------------------
  const primaryNav = document.querySelector('.primary-navigation');
  const navToggle = document.querySelector('.nav_toggle');
  const backButton = document.querySelector('.back-butt');
  const overlay = document.querySelector('.nav-overlay');

  function openNav() {
    primaryNav.classList.add('open');
    navToggle.classList.add('active');
    overlay.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    primaryNav.classList.remove('open');
    navToggle.classList.remove('active');
    overlay.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });

  if (backButton) {
    backButton.addEventListener('click', closeNav);
  }

  overlay.addEventListener('click', closeNav);

  document.querySelectorAll('.primary-navigation a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Loader -------------------------------------------------------------------------------------------------------------------------------
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });

  // smoothscroll for mobile burger menu -------------------------------------------------------------------------------------------------------------------------------

  document.querySelectorAll('#aboutMeButton, #contactMeButton').forEach(btn => {
    btn.addEventListener('click', function () {
      primaryNav.setAttribute('data-visible', false);
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // Scroll to top button functionality ----------------------------------------------------------------------------------------------------
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const footer = document.getElementById("footer");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });
  }, {
    root: null,
    threshold: 0.1
  });

  observer.observe(footer);

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Play only the most-visible section's videos ----------------------------------------------------------------------------------------------
  const videoSections = document.querySelectorAll('.top-container, .a_mid_container, #reels, .b_mid_container');
  const sectionRatios = new Map();

  function buildThresholdList(steps = 20) {
    const thresholds = [];
    for (let i = 0; i <= steps; i++) thresholds.push(i / steps);
    return thresholds;
  }

  function updateActiveSection() {
    let maxRatio = 0;
    let activeSection = null;

    sectionRatios.forEach((ratio, section) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        activeSection = section;
      }
    });

    videoSections.forEach(section => {
      const videos = section.querySelectorAll('video');
      if (section === activeSection) {
        videos.forEach(video => {
          if (video.paused) video.play().catch(() => { });
        });
      } else {
        videos.forEach(video => {
          if (!video.paused) video.pause();
        });
      }
    });
  }

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => sectionRatios.set(entry.target, entry.intersectionRatio));
    updateActiveSection();
  }, {
    root: null,
    threshold: buildThresholdList()
  });

  videoSections.forEach(section => sectionObserver.observe(section));


  // Lightbox image or video preview section ---------------------------------------------------------------------------------------------

  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  function openLightbox(src, type) {
    lightboxContent.innerHTML = '';

    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      lightboxContent.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      lightboxContent.appendChild(img);
    }

    lightboxOverlay.classList.add('open');
    document.body.classList.add('lightbox-locked');
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('open');
    document.body.classList.remove('lightbox-locked');

    const video = lightboxContent.querySelector('video');
    if (video) video.pause();

    setTimeout(() => {
      lightboxContent.innerHTML = '';
    }, 300);
  }

  triggers.forEach(el => {
    el.addEventListener('click', () => {
      openLightbox(el.dataset.src, el.dataset.type);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('open')) {
      closeLightbox();
    }
  });

});
