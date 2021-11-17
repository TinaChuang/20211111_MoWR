;(function($){
  setBannerImg();
  // $('.owl-carousel.banner-carousel').owlCarousel({
  //   animateIn: 'fadeIn',
  //   animateOut: 'fadeOut',
  //   loop: true,
  //   items: 1,
  //   nav: false,
  //   dots: false,
  //   stagePadding: 30,
  //   smartSpeed: 450,
  //   autoplay: 1000
  // });

  $('.flexslider').flexslider({
    animation: "fade",
    slideshowSpeed: 3000,
    animationDuration: 3000,
    directionNav: false,
    randomize: true,
    animationLoop: true,
    controlNav: false
  });

  $('.owl-carousel.article-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsive:{
      0:{
        items: 1
      },
      960:{
        items: 2
      },
      1200:{
        items: 3
      }
    }
  });

  $(".cardFlip-card").click(function(){
    ($(this).hasClass("active"))?
      $(this).removeClass("active"):
      $(this).addClass("active");
  });

  $(window).resize(function() {
    setBannerImg()
  });

  function setBannerImg(){
    let $window = $(window);
    if($window.width() > $window.height()){
      $(".bv-img").map((index, item)=>{
        $(item).css({
          'min-width': '100vw',
          'min-height': '100vh'
        });
      });
    }else{
      $(".bv-img").map((index, item)=>{
        $(item).css({
          'min-width': '100vw',
          'min-height': '100vh'
        });
      });
    };
    if($(window).width() < 500){
      $(".bv-img").map((index, item)=>{
        $(item).attr("src", $(item).data("mb"));
      })
    }else{
      $(".bv-img").map((index, item)=>{
        $(item).attr("src", $(item).data("pc"));
      })
    }
  };

})($);
