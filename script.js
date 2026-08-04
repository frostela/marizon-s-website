document.addEventListener("DOMContentLoaded", function () {

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

  // Navbar opacity on scroll ------------------------------------------------------------------------------------------------
  const navbar = document.querySelector("nav");
  const topContainer = document.querySelector(".top-container");
  const topContainerHeight = topContainer.offsetHeight;

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const opacity = 1 - (scrollPosition / topContainerHeight);
    navbar.style.opacity = opacity.toFixed(2);
  });

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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Contact Me button scroll ---------------------------------------------------------------------------------------------------------------
  const contactMeButton = document.getElementById('contactMeButton');
  contactMeButton.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    // Close the burger menu if open
    primaryNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
  });

  document.getElementById("currentYear").innerHTML = new Date().getFullYear();

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

  // Play only the most-visible section's videos --------------------------------------------------------------------
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

});
