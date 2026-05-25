window.addEventListener("load", () => {
  
  // Register GSAP ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);

  /* ==========================================================================
     HEADER SCROLL EFFECT
     ========================================================================== */
  const header = document.querySelector(".header-container");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ==========================================================================
     MOBILE DRAWER TOGGLE
     ========================================================================== */
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  const openDrawer = () => {
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // disable scroll when open
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("active");
    document.body.style.overflow = ""; // enable scroll
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener("click", openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  // Close drawer when clicking a link
  const drawerLinks = document.querySelectorAll(".drawer-link");
  drawerLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  /* ==========================================================================
     HERO ENTRANCE ANIMATIONS
     ========================================================================== */
  gsap.from(".layer-ferris img", {
    y: 150,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.5)",
    delay: 0.2
  });

  gsap.from(".layer-text img", {
    y: -50,
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.5)",
    delay: 0.4
  });

  /* ==========================================================================
     GSAP PARALLAX HERO EFFECT
     ========================================================================== */

  // Umbrella floating up and left with slight rotation
  gsap.to(".layer-umbrella img", {
    xPercent: -30,
    yPercent: -180,
    rotation: 20,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Beach Ball floating up faster with more spin
  gsap.to(".layer-ball img", {
    xPercent: 10,
    yPercent: -250,
    rotation: 120,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Shovel floating up slower with wide rotation
  gsap.to(".layer-shovel img", {
    xPercent: 40,
    yPercent: -120,
    rotation: -45,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  /* ==========================================================================
     MEET FERRIS CAROUSEL SLIDER
     ========================================================================== */
  const meetCarousel = document.getElementById("meetCarousel");
  const track = document.getElementById("meetCarouselTrack");
  const prevBtn = document.getElementById("sliderPrevBtn");
  const nextBtn = document.getElementById("sliderNextBtn");
  
  let currentScroll = 0;
  
  const updateButtons = () => {
    const maxScroll = track.scrollWidth - meetCarousel.clientWidth;
    prevBtn.disabled = currentScroll <= 0;
    nextBtn.disabled = currentScroll >= maxScroll - 5; // offset buffer
  };

  const slideTo = (amount) => {
    const maxScroll = track.scrollWidth - meetCarousel.clientWidth;
    currentScroll = Math.max(0, Math.min(maxScroll, currentScroll + amount));
    track.style.transform = `translateX(-${currentScroll}px)`;
    updateButtons();
  };

  // Button clicks
  prevBtn.addEventListener("click", () => slideTo(-320));
  nextBtn.addEventListener("click", () => slideTo(320));

  // Handle resizing to keep button states accurate
  window.addEventListener("resize", updateButtons);
  
  // Set initial button states (with small timeout to let elements render)
  setTimeout(updateButtons, 200);

  // Swipe / Drag Support for Carousel
  let isDragging = false;
  let startX = 0;
  let scrollLeftStart = 0;

  meetCarousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeftStart = currentScroll;
    meetCarousel.style.cursor = "grabbing";
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      meetCarousel.style.cursor = "grab";
      // Snap currentScroll
      const maxScroll = track.scrollWidth - meetCarousel.clientWidth;
      currentScroll = Math.max(0, Math.min(maxScroll, currentScroll));
      updateButtons();
    }
  });

  meetCarousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const xDiff = e.pageX - startX;
    currentScroll = scrollLeftStart - xDiff;
    track.style.transform = `translateX(-${currentScroll}px)`;
  });

  // Touch swipe support
  meetCarousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollLeftStart = currentScroll;
  });

  meetCarousel.addEventListener("touchend", () => {
    isDragging = false;
    const maxScroll = track.scrollWidth - meetCarousel.clientWidth;
    currentScroll = Math.max(0, Math.min(maxScroll, currentScroll));
    updateButtons();
  });

  meetCarousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const xDiff = e.touches[0].pageX - startX;
    currentScroll = scrollLeftStart - xDiff;
    track.style.transform = `translateX(-${currentScroll}px)`;
  });

  /* ==========================================================================
     GSAP ENTRANCE ANIMATIONS (SCROLL TRIGGER)
     ========================================================================== */
  // Meet Ferris Title and Description
  gsap.from(".meet-text-content .section-title", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".meet-section",
      start: "top 80%"
    }
  });

  gsap.from(".meet-text-content .section-paragraph", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2,
    scrollTrigger: {
      trigger: ".meet-section",
      start: "top 80%"
    }
  });

  // Meet Ferris slides cascading entrance
  gsap.from(".carousel-slide", {
    opacity: 0,
    scale: 0.8,
    y: 60,
    stagger: 0.15,
    duration: 0.8,
    delay: 0.4,
    scrollTrigger: {
      trigger: ".meet-section",
      start: "top 70%"
    }
  });

  // Ferris Army title and subtitle
  gsap.from(".army-header .section-title", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".army-section",
      start: "top 80%"
    }
  });

  gsap.from(".army-header .section-paragraph", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2,
    scrollTrigger: {
      trigger: ".army-section",
      start: "top 80%"
    }
  });

  // Ferris Army Grid Cards
  gsap.fromTo(".main-army-card", 
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay: 0.3,
      clearProps: "transform",
      scrollTrigger: {
        trigger: ".army-grid",
        start: "top 75%"
      }
    }
  );

  gsap.fromTo(".helmet-card", 
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay: 0.4,
      clearProps: "transform",
      scrollTrigger: {
        trigger: ".army-grid",
        start: "top 75%"
      }
    }
  );

  gsap.fromTo(".sub-social-card", 
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
      delay: 0.6,
      clearProps: "transform",
      scrollTrigger: {
        trigger: ".army-grid",
        start: "top 75%"
      }
    }
  );

  /* ==========================================================================
     GSAP SEAMLESS CAROUSEL MARQUEE LOOP
     ========================================================================== */
  const marqueeTrack = document.getElementById("marqueeTrack");
  
  // Speed setting
  const marqueeWidth = marqueeTrack.scrollWidth / 2; // dividing by 2 because we have duplicated items
  
  gsap.to(marqueeTrack, {
    x: -marqueeWidth,
    ease: "none",
    duration: 25, // speed: seconds to slide half of track
    repeat: -1,
    modifiers: {
      // safe wrap modifier just in case
      x: gsap.utils.unitize(x => parseFloat(x) % marqueeWidth)
    }
  });

  // Pause marquee on hover
  const marqueeContainer = document.querySelector(".marquee-slider-container");
  marqueeContainer.addEventListener("mouseenter", () => {
    gsap.getTweensOf(marqueeTrack).forEach(t => t.pause());
  });
  marqueeContainer.addEventListener("mouseleave", () => {
    gsap.getTweensOf(marqueeTrack).forEach(t => t.play());
  });

  // Hide loading overlays for media cards
  const mediaImages = document.querySelectorAll(".card-media");
  mediaImages.forEach(img => {
    if (img.complete) {
      img.previousElementSibling.style.display = "none";
    } else {
      img.addEventListener("load", () => {
        img.previousElementSibling.style.display = "none";
      });
    }
  });
});
