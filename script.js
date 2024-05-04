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
  
    // Add scroll event listener
    window.addEventListener("scroll", function() {
      // Get the scroll position
      var scrollPosition = window.scrollY || window.pageYOffset;
  
      // Check if the scroll position is greater than the height of the top container
      if (scrollPosition > topContainerHeight) {
        // If it is, hide the navbar visually
        navbar.style.visibility = "hidden";
      } else {
        // Otherwise, show the navbar
        navbar.style.visibility = "visible";
      }
    });

  });