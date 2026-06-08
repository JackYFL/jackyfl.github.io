/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){
   // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  // FitVids init
  $("#main").fitVids();

  // init sticky sidebar
  $(".sticky").Stickyfill();

  var stickySideBar = function(){
    var show = $(".author__urls-wrapper button").length === 0 ? $(window).width() > 925 : !$(".author__urls-wrapper button").is(":visible");
    // console.log("has button: " + $(".author__urls-wrapper button").length === 0);
    // console.log("Window Width: " + windowWidth);
    // console.log("show: " + show);
    //old code was if($(window).width() > 1024)
    if (show) {
      // fix
      Stickyfill.rebuild();
      Stickyfill.init();
      $(".author__urls").show();
    } else {
      // unfix
      Stickyfill.stop();
      $(".author__urls").hide();
    }
  };

  stickySideBar();

  $(window).resize(function(){
    stickySideBar();
  });

  // Follow menu drop down

  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").fadeToggle("fast", function() {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // init smooth scroll
  $("a").smoothScroll({offset: -20});

  var getImagePreviewSrc = function(href) {
    if (!href) {
      return null;
    }

    var imagePath = href.split(/[?#]/)[0];
    var githubImage = imagePath.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/(?:blob|tree)\/([^\/]+)\/(.+)$/i);

    if (githubImage && /\.(jpe?g|png|gif|webp)$/i.test(githubImage[4])) {
      return "https://raw.githubusercontent.com/" + githubImage[1] + "/" + githubImage[2] + "/" + githubImage[3] + "/" + githubImage[4];
    }

    if (/\.(jpe?g|png|gif|webp)$/i.test(imagePath)) {
      return href;
    }

    return null;
  };

  // add lightbox class to all image links, including GitHub-hosted poster links
  $("a").each(function() {
    var previewSrc = getImagePreviewSrc($(this).attr("href"));

    if (previewSrc) {
      $(this).addClass("image-popup").attr("data-mfp-src", previewSrc);
    }
  });

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // open publication preview images directly, even when they are not links
  $(".paper-box-image").on("click", "> div", function(event) {
    event.preventDefault();
    event.stopPropagation();

    var $images = $(".paper-box-image img");
    var $clickedImage = $(this).find("img").first();
    var currentIndex = $images.index($clickedImage);
    var items = $images.map(function() {
      var $image = $(this);

      return {
        src: $image.attr("src"),
        title: $image.closest(".paper-box").find(".paper-box-text a:first").text().trim() || $image.attr("alt") || ""
      };
    }).get();

    $.magnificPopup.open({
      items: items,
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1]
      },
      image: {
        tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
        titleSrc: "title"
      },
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-zoom-in",
      removalDelay: 200,
      callbacks: {
        beforeOpen: function() {
          this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim");
        }
      }
    }, currentIndex);
  });

});
