(function () {
  "use strict";
  /* Running script only after DOM is fully loaded */
  document.addEventListener("DOMContentLoaded", function () {
    /* ========================================================================== */
    /*                              PRELOADER SCRIPT                              */
    /* ========================================================================== */
    setTimeout(function () {
      document.querySelector("body").classList.add("loaded");
    }, 10);

    /* ========================================================================== */
    /*                     ISOTOPE/PORTFOLIO FILTERING SCRIPT                     */
    /* ========================================================================== */
    /* variable */
    const elem = document.querySelector(".portfolio_body");
    const filtersElem = document.querySelector(".port_filter");
    /* only run isotope if elem exist */
    if (elem) {
      /* Adding a timeout to fix layout shifting */
      setTimeout(function () {
        //isotope layout script
        const portfolio = new Isotope(elem, {
          // options
          itemSelector: ".port_item",
          layoutMode: "masonry",
        });
        //only run isotope filtersElem exist
        if (filtersElem) {
          // isotope filtering script
          filtersElem.addEventListener("click", function (event) {
            if (!matchesSelector(event.target, "a")) {
              return;
            }
            const filterValue = event.target.getAttribute("data-filter");

            // use the data-filter attribute
            portfolio.arrange({
              filter: filterValue,
            });
            //adding is_active class for filter button
            filtersElem.querySelector(".active").classList.remove("active");
            event.target.classList.add("active");
            event.preventDefault();
          });
        }
      }, 100);
    }
  });

  /* ========================================================================== */
  /*                 ANIMATION SCRIPT FOR MOBILE NAVIGATION MENU                */
  /* ========================================================================== */
  let slideUp = (target, duration = 500) => {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.boxSizing = "border-box";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = "none";
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      //alert("!");
    }, duration);
  };

  let slideDown = (target, duration = 500) => {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;

    if (display === "none") display = "block";

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  };
  let slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === "none") {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
  };

  /* ========================================================================== */
  /*                             CLONING NAVIGATION                             */
  /* ========================================================================== */
  const rdn_nav = document.querySelector(".rdn_nav");
  if (rdn_nav) {
    const navElement = rdn_nav.cloneNode(true);
    document.querySelector(".cloned_nav").appendChild(navElement);
  }
  /* ========================================================================== */
  /*                              NAVIGATION SCRIPT                             */
  /* ========================================================================== */

  if (document.querySelector(".nav_header")) {
    const nav_menu = document
      .querySelector(".nav_header")
      .querySelectorAll(".has_child");

    for (var i = 0; i < nav_menu.length; i++) {
      nav_menu[i].addEventListener("mouseenter", function () {
        this.classList.add("active");
      });
      nav_menu[i].addEventListener("mouseleave", function () {
        this.classList.remove("active");
      });
    }
  }
  /* ========================================================================== */
  /*                            SCROLL TO TOP SCRIPT                            */
  /* ========================================================================== */
  const scrollToTopBtn = document.querySelector(".scrollToTopBtn");

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* ========================================================================== */
  /*                            TO TOP BUTTON SCRIPT                            */
  /* ========================================================================== */
  // When the user scrolls down 200px from the top of the document, show the button
  function scrollFunction() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      scrollToTopBtn.style.opacity = "1";
    } else {
      scrollToTopBtn.style.opacity = "0";
    }
  }

  /* ========================================================================== */
  /*                              CLONED MENU SHOWN                             */
  /* ========================================================================== */
  // When the user scrolls down 500px from the top, show the cloned menu
  const clonedMenu = document.querySelector(".cloned");

  function scrollCloned() {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      clonedMenu.classList.add("fixed_menu");
    } else {
      clonedMenu.classList.remove("fixed_menu");
    }
  }
  //scrolling effect
  window.onscroll = function () {
    //show the to top button
    if (scrollToTopBtn) {
      scrollFunction();
    }
    //clone the menu
    if (clonedMenu) {
      scrollCloned();
    }
  };

  /* ========================================================================== */
  /*                            OFFCANVAS MOBILE MENU                           */
  /* ========================================================================== */

  document.addEventListener("DOMContentLoaded", function () {
    var myOffcanvas = document.getElementById("mobilemenu");
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
    document.querySelectorAll(".mobile_menu_btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        bsOffcanvas.toggle();
      });
    });
  });

  if (document.querySelector(".mobile_menu")) {
    //adding icon for dropdown button in mobile menu
    const linkwithchild = document
      .querySelector(".mobile_menu")
      .querySelectorAll(".mdropdown");

    for (let index = 0; index < linkwithchild.length; index++) {
      const newContent = '<i class="mbtn_drop fa fa-angle-down"></i>';
      linkwithchild[index].insertAdjacentHTML("beforeend", newContent);
    }

    //add class for clicked icon
    const mb_menu = document
      .querySelector(".mobile_menu")
      .querySelectorAll(".mdropdown > i");

    for (var imb = 0; imb < mb_menu.length; imb++) {
      mb_menu[imb].addEventListener("click", function (e) {
        //toogle class active for the icon button
        this.parentNode.classList.toggle("active");
        //dropdown slide effect with 200ms transition
        slideToggle(this.parentNode.querySelector(".mdropdown_child"), 200);
        e.preventDefault();
      });
    }
  }

  /* ========================================================================== */
  /*                            SCROLLING NAVIGATION                            */
  /* ========================================================================== */
  //add smooth scrolling when clicking any anchor link with smoothscroll class
  document
    .querySelectorAll(
      '.smoothscroll a[href^="#"]:not([external-link], [href="#"], [href="#!"])'
    )
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  //prevent boostrap smoothscrolling on empty nav
  document
    .querySelectorAll('.smoothscroll a[href="#"]', '.smoothscroll a[href="#!"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });

  /* ========================================================================== */
  /*                                   SLIDER                                   */
  /* ========================================================================== */

  const home_one = new Swiper(".rdn_slider_bg", {
    speed: 800,
    loop: true,
    effect: "fade",
    simulateTouch: true,
    preventInteractionOnTransition: false,
    watchSlidesProgress: true,
    preloadImages: true,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".rdn_slider_bg .next_sl",
      prevEl: ".rdn_slider_bg .prev_sl",
    },
  });
  
  const service_dark = new Swiper(".service_slide", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    loop: false,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: ".outer_sv_slide .next_sv",
      prevEl: ".outer_sv_slide .prev_sv",
    },
  });

  const home_black_slider = new Swiper(".home_black_slider", {
    speed: 800,
    loop: false,
    spaceBetween: 30,
    slidesPerView: 2,
    centeredSlides: false,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".bw_nav_slider .next",
      prevEl: ".bw_nav_slider .prev",
    },
  });

  const animation_slider = new Swiper(".animation_slider", {
    speed: 700,
    loop: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: ["-100%", 0, -500],
      },
      next: {
        translate: ["100%", 0, -500],
      },
    },
    simulateTouch: true,
    preventInteractionOnTransition: false,
    watchSlidesProgress: true,
    preloadImages: true,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
  });

  const sv_image_slider = new Swiper(".sv_image_slider", {
    speed: 800,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    breakpoints: {
      991: {
        slidesPerView: 2,
      },
    },
  });
  


  /* ========================================================================== */
  /*                          SCROLLCUE SCRIPT TRIGGER                          */
  /* ========================================================================== */
  scrollCue.init();

  /* ========================================================================== */
  /*                            TOOLTIP IN PORTFOLIO                            */
  /* ========================================================================== */
  const tooltip = new iTooltip(".rdn_tooltip_link");
  tooltip.init({
    className: "rdn_tooltip",
  });

  /* ========================================================================== */
  /*                               LIGHTBOX SCRIPT                              */
  /* ========================================================================== */
  //For Video
  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
    selector: ".popup_video",
    zoomable: false,
    height: "auto",
    draggable: false,
  });
  //For Image
  const lightboxImg = GLightbox({
    touchNavigation: true,
    loop: true,
    selector: ".popup_img",
    zoomable: false,
    height: "auto",
    draggable: false,
  });

  /* ========================================================================== */
  /*                     TRIGGER FUNCTION IN VIEWPORT SCRIPT                    */
  /* ========================================================================== */

  /* counter effect script when on viewport*/

  //variable for the row section of the count element
  const counterSection = document.querySelectorAll(".stats_row");
  //run the counter effect when the element is on viewport
  counterSection.forEach(function (element) {
    var observer = new IntersectionObserver(
      function (entries) {
        // Check if the observed element is intersecting with the viewport
        if (entries[0].isIntersecting) {
          // Call the function when the element enters the viewport
          rdn_counter(".counter_text", 15);

          // Stop observing the element after the first intersection
          observer.unobserve(entries[0].target);
        }
      },
      { once: true }
    ); // Use the 'once' option to trigger only once

    // Start observing the current element
    observer.observe(element);
  });
})();
