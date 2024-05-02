jQuery(document).ready(function($) {
  let time = 380;
  setTimeout(function() {
    $("h1.responsive-headline").fitText(1, { minFontSize: "40px", maxFontSize: "90px" });
    $(".smoothscroll").on("click", function(e) {
      e.preventDefault();
      let target = this.hash,
        $target = $(target);

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top
          },
          800,
          "swing",
          function() {
            window.location.hash = target;
          }
        );
    });

    let sections = $("section");
    let navigation_links = $("#nav-wrap a");

    sections.waypoint({
      handler: function(event, direction) {
        let active_section;
        active_section = $(this);
        if (direction === "up") active_section = active_section.prev();

        let active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
      },
      offset: "35%"
    });

    $("header").css({ height: $(window).height() });
    $(window).on("resize", function() {
      $("header").css({ height: $(window).height() });
      $("body").css({ width: $(window).width() });
    });

    $(window).on("scroll", function() {
      let h = $("header").height();
      let y = $(window).scrollTop();
      let nav = $("#nav-wrap");

      if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
        nav.fadeOut("fast");
      } else {
        if (y < h * 0.2) {
          nav.removeClass("opaque").fadeIn("fast");
        } else {
          nav.addClass("opaque").fadeIn("fast");
        }
      }
    });

    $(".flexslider").flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: "slide",
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false
    });

    $("form#contactForm button.submit").click(function() {
      $("#image-loader").fadeIn();

      let contactName = $("#contactForm #contactName").val();
      let contactEmail = $("#contactForm #contactEmail").val();
      let contactSubject = $("#contactForm #contactSubject").val();
      let contactMessage = $("#contactForm #contactMessage").val();
      let data =
        "&contactName=" +
        contactName +
        "&contactEmail=" +
        contactEmail +
        "&contactSubject=" +
        contactSubject +
        "&contactMessage=" +
        contactMessage;

      $.ajax({
        type: "POST",
        url: "https://mylittlebug.netlify.app/",
        data: data,
        success: function(msg) {
          if (msg == "OK") {
            $("#image-loader").fadeOut();
            $("#message-warning").hide();
            $("#contactForm").fadeOut();
            $("#message-success").fadeIn();
          } else {
            $("#image-loader").fadeOut();
            $("#message-warning").html(msg);
            $("#message-warning").fadeIn();
          }
        }
      });
      return false;
    });
  }, time);
});