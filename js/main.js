$(function(){
    var isMobile = true;

    var previousScroll = 10;

    var menuBar = $(".navigation-bar");
    var menu = $('.main-nav-menu');
    var toggleMenuInput =  $("#menuToggle input[type='checkbox']");
    var horizontalBox = $(".horizontal-box").find(".card");

    var mobileMenuValue = 1024;

    var LINES_NUM = 4;
    var MOB_LINES_NUM = 2;

    var fixIphoneBugValue = 15;


    function generateSlides(){
        var slideSpeed = 1000;

        var showCurrentSlide = function(number, applyTo){
            $(applyTo).text(number);
        };

        $('#slides-vertical').slidesjs({
            width: 381,
            height: 579,
            navigation: false,
            pagination: false,
            callback: {
                loaded: function(number) {
                    showCurrentSlide(number, '.slider-number-vertical');
                },
                start: function(number) {},
                complete: function(number) {
                    showCurrentSlide(number, '.slider-number-vertical');
                }
            },
            effect: {
                slide: {
                    speed: slideSpeed
                },
                fade: {
                    speed: slideSpeed,
                    crossfade: true
                }
            }
        });

        $('#slides-horizontal').slidesjs({
            width: 572,
            height: 381,
            navigation: false,
            pagination: false,
            callback: {
                loaded: function(number) {
                    showCurrentSlide(number, '.slider-number-horizontal');
                },
                start: function(number) {
                    $('#slides-horizontal .slidesjs-navigation').hide();
                    $('#slides-horizontal .card-content').addClass("card-content-1");
                },
                complete: function(number) {
                    $('#slides-horizontal .slidesjs-navigation').show();
                    showCurrentSlide(number, '.slider-number-horizontal');
                }
            },
            effect: {
                slide: {
                    speed: slideSpeed
                },
                fade: {
                    speed: slideSpeed,
                    crossfade: true
                }
            }
        });

        var IMG_NUM = 3;

        $('#slides-horizontal-1').slidesjs({
            width: 969,
            height: 500,
            navigation: false,
            pagination: false,
            callback: {
                loaded: function(number) {
                    showCurrentSlide(number * IMG_NUM, '.slider-number-horizontal-1');
                },
                start: function(number) {

                },
                complete: function(number) {
                    showCurrentSlide(number * IMG_NUM, '.slider-number-horizontal-1');
                    $('.top-navigation').css("lest", "0");
                }
            },
            effect: {
                slide: {
                    speed: slideSpeed + 250
                },
                fade: {
                    speed: slideSpeed + 250,
                    crossfade: false
                }
            }
        });

        $('.all-vertical-num').text($('#slides-vertical .card').length);
        $('.all-horizontal-num').text($('#slides-horizontal .card').length);
        $('.all-horizontal-num-1').text($('#slides-horizontal-1 .get-num').length * IMG_NUM);
    }

    function lines(){
        var linesConteiner = $('.lines');
        var line = linesConteiner.find("div");

        var linesWidth = $('#skrollr-body .mobile').width();
        var linesHeight = $('#skrollr-body').height();

        linesConteiner.width(linesWidth);
        linesConteiner.height(linesHeight);

        if(!isMobile)
            line.width(linesWidth / LINES_NUM - 1.1);
        else
            line.width(linesWidth / MOB_LINES_NUM - 1.1);
        line.height(linesHeight);
    }

    function hideNav() {
        $("[data-nav-status='toggle']").removeClass("is-visible").addClass("is-hidden");
    }
    function showNav() {
        $("[data-nav-status='toggle']").removeClass("is-hidden").addClass("is-visible");
    }

    function hideOpenNavOnScroll(){
        if(isMobile) {
            toggleMenuInput.prop('checked', false);
            menu.hide();
        }
    }

    function toggleMenuWhenResize(){
        //$('.play-img').height($('.video-block img').height()); for video

        if($(window).width() <= mobileMenuValue){
            horizontalBox.removeClass("horizontal");
            isMobile = true;
            menu.hide();
        }
        else {
            horizontalBox.addClass("horizontal");
            isMobile = false;
            menu.show();
        }
        menuOpacity();
        lines();
    }

    function menuOpacity(){
        var currentScroll = $(this).scrollTop();
        if(currentScroll <= fixIphoneBugValue && isMobile){
            menuBar.removeClass("desctop-menu").removeClass("scroll-menu").addClass("mobile-menu-top");
        }
        else if(currentScroll <= fixIphoneBugValue && !isMobile){
            menuBar.removeClass("mobile-menu-top").removeClass("scroll-menu").addClass("desctop-menu");
        }
        else {
            menuBar.removeClass("desctop-menu").removeClass("mobile-menu-top").addClass("scroll-menu");
        }
    }
    function menuBehaviorOnScroll(){
        var currentScroll = $(this).scrollTop();
        if (currentScroll >= previousScroll && currentScroll > fixIphoneBugValue){
            hideNav();
            hideOpenNavOnScroll();
        } else {
            showNav();
        }
        menuOpacity();
        previousScroll = currentScroll;

    }

    function animation(){
        var animation = new Animation();
        animation.init();
    }



    $('.modal').modal(
        {
            dismissible: true,
            opacity: .5,
            inDuration: 400,
            outDuration: 400
        }
    );

    toggleMenuInput.change(function(){
        if(toggleMenuInput.is(':checked')) {
            menu.fadeIn();
            menuBar.addClass("scroll-menu");
        }
        else {
            menu.fadeOut();
            menuOpacity();
        }

    });


    $('.show-modal').click(hideOpenNavOnScroll);

    $(window).resize(toggleMenuWhenResize);
    $(window).scroll(menuBehaviorOnScroll);

    toggleMenuWhenResize();
    generateSlides();
    lines();
    animation();
});


var Animation = function(){

    this.init = function(){
        mainPage();
    };

    var mainPage = function(){
        var options = [
            {selector: '.content-parallax-1', offset: 50, callback: function(){
                $(".content-parallax-1 .caption-text").addClass("title-animation");
            } },
            {selector: '.content-parallax-2', offset: 50, callback: function(){
                $(".content-parallax-2 .description").addClass("text-animation");
            } },
            {selector: '.content-parallax-2', offset: 150, callback: function(){
                $(".content-parallax-2 .team-img").addClass("team-animation");
            } },
            {selector: '.content-parallax-2', offset: 350, callback: function(){
                $(".content-parallax-2 .vertical-box").addClass("box-animation")
            } },
            {selector: '.content-parallax-2', offset: 450, callback: function(){
                $(".content-parallax-2 .horizontal-box").addClass("box-animation")
            } },
            {selector: '.content-parallax-2', offset: 250, callback: function(){
                $(".content-parallax-2 .quotes").addClass("qclose-animation")
            } },
            {selector: '.content-parallax-2', offset: 550, callback: function(){
                $(".content-parallax-2 .quotes-2").addClass("qopen-animation")
            } },
            {selector: '.content-parallax-3', offset: -150, callback: function(){
                $(".content-parallax-3 .description").addClass("textnext-animation");
            } },
            {selector: '.content-parallax-4', offset: 100, callback: function(){
                $(".content-parallax-4 .begin-position-img").addClass("eye-animation");
            } },
            {selector: '.content-parallax-4', offset: 150, callback: function(){
                $(".content-parallax-4 .begin-position-vac-text").addClass("vac-text-animation");
            } },
            {selector: '.content-parallax-4', offset: 350, callback: function(){
                $(".content-parallax-4 .begin-position-triangle").addClass("triangle-animation");
            } },
            {selector: '.content-parallax-4', offset: 400, callback: function(){
                $(".content-parallax-4 .begin-position-vacSubtitble").addClass("vacSubtitble-animation");
            } },



            {selector: '.review', offset: 50, callback: function(){
                $(".review .title-section").addClass("title-animation");
            } },
            {selector: '.cards-review', offset: 50, callback: function(){
                $(".cards-review .krasnogor").removeClass("begin-position-cards").addClass("cards-animation");
            } },
            {selector: '.cards-review', offset: 50, callback: function(){
                $(".cards-review .troian").removeClass("begin-position-cards").addClass("cards-animation");
            } },
            {selector: '.cards-review', offset: 900, callback: function(){
                $(".cards-review .logvinova").removeClass("begin-position-cards").addClass("cards-animation");
            } },
            {selector: '.cards-review', offset: 1100, callback: function(){
                $(".cards-review .gonchar").removeClass("begin-position-cards").addClass("cards-animation");
            } },
            {selector: '.cards-review', offset: 50, callback: function(){
                $(".cards-review .rv-quotes").removeClass("begin-position-rvqclose").addClass("rv-qclose-animation");
            } },
            {selector: '.cards-review', offset: 1100, callback: function(){
                $(".cards-review .rv-quotes-2").removeClass("begin-position-rvqopen").addClass("rv-qopen-animation");
            } },


            {selector: '.contacts', offset: 50, callback: function(){
                $(".contacts .title-section").addClass("title-animation");
            } },
            {selector: '.contacts', offset: 50, callback: function(){
                $(".contacts .img-fly-position").addClass("img-plain-animation");
            } },
            {selector: '.contacts', offset: 1200, callback: function(){
                $(".contacts .subtext").addClass("subtext-animation");
            } },


            {selector: '.vacancy', offset: 50, callback: function(){
                $(".base-section .title").addClass("title-animation");
            } },
            {selector: '.vacancy', offset: 50, callback: function(){
                $(".text-block .line").addClass("line-animation");
            } },
            {selector: '.vacancy', offset: 50, callback: function(){
                $(".vacancy .subtitle").addClass("baseintro-animation");
                $(".vacancy .intro").addClass("baseintro-animation");
            } },
            {selector: '.vacancy', offset: 250, callback: function(){
                $(".first-section .subtext").addClass("subtext-animation");
            } },
            {selector: '.vacancies-section', offset: 350, callback: function(){
                $(".vacancies-section .cards").addClass("cards-animation");
            } },
            {selector: '.candidat-section', offset: 550, callback: function(){
                $(".candidat-section .text").addClass("text-animation");
            } },
            {selector: '.to-us-section', offset: 250, callback: function(){
                $(".to-us-section .title").addClass("title-animation");
                $(".to-us-section .subtitle").addClass("title-animation");
                $(".to-us-section .subtext").addClass("title-animation");
            } }
        ];
        Materialize.scrollFire(options);
    };

};