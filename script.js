document.addEventListener("DOMContentLoaded", function () {

  const updateModalOverlay = document.getElementById('updateModalOverlay');
  const updateModalOkBtn = document.getElementById('updateModalOkBtn');

  // Show only once per browser (comment out the if-check below if you want it every visit)
  // if (!sessionStorage.getItem('updateNoticeSeen')) {
  //   updateModalOverlay.classList.remove('hidden');
  // } else {
  //   updateModalOverlay.classList.add('hidden');
  // }

  updateModalOkBtn.addEventListener('click', () => {
    updateModalOverlay.classList.add('hidden');
    sessionStorage.setItem('updateNoticeSeen', 'true');
  });

  // Video click event listeners
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

  // Navbar opacity on scroll
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

  // Contact Me button scroll
  const contactMeButton = document.getElementById('contactMeButton');
  contactMeButton.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    // Close the burger menu if open
    primaryNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
  });

  document.getElementById("currentYear").innerHTML = new Date().getFullYear();

  // Scroll to top button functionality
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

  // Video playback control for mobile and tablet
  const videos = document.querySelectorAll(".myVideo");

  function isMobileOrTablet() {
    return window.innerWidth <= 1024;
  }

  function handleVideoPlayback() {
    videos.forEach(video => {
      video.addEventListener("play", () => {
        if (isMobileOrTablet()) {
          videos.forEach(otherVideo => {
            if (otherVideo !== video) {
              otherVideo.pause();
            }
          });
        }
      });
    });
  }

  if (isMobileOrTablet()) {
    handleVideoPlayback();
  }

  window.addEventListener("resize", () => {
    if (isMobileOrTablet()) {
      handleVideoPlayback();
    }
  });

  // const container = document.querySelector('.container');
  // const slider = document.querySelector('.slider');

  // slider.addEventListener('input', (e) => {
  //   let value = e.target.value;
  //   if (value > 96) {
  //     value = 96; // Cap the value at 64%
  //   }
  //   container.style.setProperty('--position', `${value}%`);
  // });

  // const videoBefore = document.getElementById('videoBefore');
  // const videoAfter = document.getElementById('videoAfter');

  // // Function to sync the videos
  // function syncVideos() {
  //   if (Math.abs(videoBefore.currentTime - videoAfter.currentTime) > 0.1) {
  //     // If the difference is greater than 0.1 seconds, synchronize the videos
  //     videoAfter.currentTime = videoBefore.currentTime;
  //   }
  // }

  // // Event listener to sync videos on time update
  // videoBefore.addEventListener('timeupdate', syncVideos);
  // videoAfter.addEventListener('timeupdate', syncVideos);

  // // Optionally, sync them on loop
  // videoBefore.addEventListener('ended', () => {
  //   videoAfter.currentTime = 0;
  //   videoAfter.play();
  //   videoBefore.play();
  // });

  // videoAfter.addEventListener('ended', () => {
  //   videoBefore.currentTime = 0;
  //   videoBefore.play();
  //   videoAfter.play();
  // });

  // // Ensure videos are preloaded
  // videoBefore.preload = 'auto';
  // videoAfter.preload = 'auto';


  // Video Slider Section --------------------------------------------------------------------------------------------------------------

  (function () {
    const stage = document.getElementById('stage');
    const handle = document.getElementById('handle');
    const layerGraded = document.getElementById('layerGraded');
    const vidRaw = document.getElementById('vidRaw');
    const vidGraded = document.getElementById('vidGraded');
    const playBtn = document.getElementById('playBtn');

    const knob = handle.querySelector('.knob');

    /* ---------------- slider position ---------------- */
    function setSplit(pct) {
      pct = Math.min(100, Math.max(0, pct));
      layerGraded.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
      stage.setAttribute('aria-valuenow', Math.round(pct));
    }
    setSplit(50);

    function pctFromEvent(clientX) {
      const r = stage.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    }

    let dragging = false;
    function startDrag(e) {
      dragging = true;
      knob.setPointerCapture && e.pointerId != null && knob.setPointerCapture(e.pointerId);
      moveDrag(e);
      e.preventDefault();
    }
    function moveDrag(e) {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setSplit(pctFromEvent(x));
    }
    function endDrag() { dragging = false; }

    knob.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointermove', moveDrag);
    window.addEventListener('pointerup', endDrag);

    stage.addEventListener('keydown', (e) => {
      const current = parseFloat(stage.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft') { setSplit(current - 3); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setSplit(current + 3); e.preventDefault(); }
    });

    /* ---------------- playback sync ---------------- */

    const DRIFT_TOLERANCE = 0.045;

    let started = false;
    let loaded = false;
    let readyCount = 0;

    function loadRealSources(video) {
      video.querySelectorAll("source[data-src]").forEach(source => {
        source.src = source.dataset.src;
      });
      video.load();
    }

    // Debug
    [vidRaw, vidGraded].forEach(video => {

      video.addEventListener("error", () => {
        console.error(video.currentSrc, video.error);
      });

      video.addEventListener("loadeddata", () => {

        readyCount++;

        if (readyCount === 2) {
          playBtn.disabled = false;
        }

      });

    });

    // Don't allow clicking until videos are actually ready
    playBtn.disabled = true;

    // Lazy load before user reaches the section
    const observer = new IntersectionObserver(entries => {

      if (!entries[0].isIntersecting || loaded) return;

      loaded = true;

      loadRealSources(vidRaw);
      loadRealSources(vidGraded);

      observer.disconnect();

    }, {
      rootMargin: "300px"
    });

    observer.observe(stage);

    // Play immediately from the click.
    // This keeps the browser's user gesture intact.
    playBtn.addEventListener("click", async () => {

      try {

        vidRaw.currentTime = 0;
        vidGraded.currentTime = 0;

        await Promise.all([
          vidRaw.play(),
          vidGraded.play()
        ]);

        started = true;

        playBtn.classList.add("hidden");

      } catch (err) {

        console.error("Playback blocked:", err);

      }

    });

    // manual, synchronized loop restart
    vidRaw.addEventListener('ended', () => {
      vidRaw.currentTime = 0;
      vidGraded.currentTime = 0;
      Promise.all([vidRaw.play(), vidGraded.play()]);
    });

    // if the master stalls to buffer, hold the follower so it can't get ahead
    // vidRaw.addEventListener('waiting', () => { vidGraded.pause(); });
    // vidRaw.addEventListener("playing", () => {

    //   if (!started) return;

    //   vidGraded.play().catch(() => { });

    //   vidGraded.playbackRate = 1;

    // });

    // continuous drift correction, synced to the display's refresh rate
    function driftLoop() {

      if (started && !vidRaw.paused) {

        const diff = vidRaw.currentTime - vidGraded.currentTime;

        if (Math.abs(diff) > DRIFT_TOLERANCE) {

          vidGraded.currentTime = vidRaw.currentTime;

        } else {

          const rate = 1 + diff * 0.2;
          vidGraded.playbackRate = Math.max(0.98, Math.min(1.02, rate));
        }

      }

      requestAnimationFrame(driftLoop);

    }

    requestAnimationFrame(driftLoop);

    // resync hard if the tab was backgrounded and timers throttled
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && started) {
        vidGraded.currentTime = vidRaw.currentTime;
      }
    });

  })();



});
