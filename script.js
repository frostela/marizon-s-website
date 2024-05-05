document.addEventListener("DOMContentLoaded", function() {
    var colorFlimVideo = document.querySelector(".color_flim_video"); 
    colorFlimVideo.addEventListener("click", function() {
      window.open("https://www.instagram.com/p/CxdPxCiST7_/", "_blank");
    });
  
    var mountVideo = document.querySelector(".mount_video"); 
    mountVideo.addEventListener("click", function() {
      window.open("https://www.instagram.com/p/Cuw7gtkgLLC/", "_blank");
    });
  
    var djVideo = document.querySelector(".dj_video"); 
    djVideo.addEventListener("click", function() {
      window.open("https://www.instagram.com/reel/CoCyW-hDQb4/", "_blank");
    });
  
    var gymVideo = document.querySelector(".gym_video"); 
    gymVideo.addEventListener("click", function() {
      window.open("https://www.instagram.com/reel/CqQb8U6DkY8/", "_blank");
    });
  
    var drinks2Video = document.querySelector(".drinks2_video"); 
    drinks2Video.addEventListener("click", function() {
      window.open("https://www.instagram.com/reel/CsN3ShbggKC/", "_blank");
    });

    var navbar = document.querySelector("nav");
    var topContainer = document.querySelector(".top-container");
    
    // Get the height of the top container
    var topContainerHeight = topContainer.offsetHeight;
    
    // Boolean flag to track if the navbar is already hidden
    var navbarHidden = false;
    
    // Add scroll event listener
    window.addEventListener("scroll", function() {
      // Get the scroll position
      var scrollPosition = window.scrollY || window.pageYOffset;
    
      // Calculate opacity based on scroll position
      var opacity = 1 - (scrollPosition / topContainerHeight);
    
      // Apply opacity to the navbar if it's not already hidden
      if (!navbarHidden) {
        navbar.style.opacity = opacity.toFixed(2); // Limit opacity to two decimal places
      }
    
      // Check if the navbar should be hidden
      if (scrollPosition > topContainerHeight && !navbarHidden) {
        // If it should be hidden, set the flag and hide the navbar
        navbarHidden = true;
        navbar.style.opacity = 0;
      } else if (scrollPosition <= topContainerHeight && navbarHidden) {
        // If it should be visible again, reset the flag and show the navbar
        navbarHidden = false;
        navbar.style.opacity = 1;
      }
    });

    const primaryNav = document.querySelector('.primary-navigation');
    const navToggle = document.querySelector('.nav_toggle');
    const backButton = document.querySelector('.back-butt');

    navToggle.addEventListener('click', () => {
      const visibility = primaryNav.getAttribute('data-visible');

      if (visibility === "false" || visibility === null) {
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
      } else {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
      }
    });

    backButton.addEventListener('click', () => {
      primaryNav.setAttribute('data-visible', false);
      navToggle.setAttribute('aria-expanded', false);
    });
    
  });