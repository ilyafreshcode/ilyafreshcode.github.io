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

    function init(){
        toggleMenuWhenResize();
        generateSlides();
        lines();
        animation();
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

    init();
});






var Animation = function(){

    this.init = function(){
        mainPage();
    };

    var mainPage = function(){
        var options = [
            {selector: '.main-caption-content', offset: 50, callback: function(){
                $(".main-caption-content .caption-text").addClass("title-animation");
            } },
            {selector: '.main-team-content', offset: 50, callback: function(){
                $(".main-team-content .description").addClass("text-animation");
            } },
            {selector: '.main-team-content', offset: 150, callback: function(){
                $(".main-team-content .team-img").addClass("team-animation");
            } },
            {selector: '.main-team-content', offset: 350, callback: function(){
                $(".main-team-content .vertical-box").addClass("box-animation");
            } },
            {selector: '.main-team-content', offset: 450, callback: function(){
                $(".main-team-content .horizontal-box").addClass("box-animation");
            } },
            {selector: '.main-team-content', offset: 250, callback: function(){
                $(".main-team-content .quotes").addClass("qclose-animation");
            } },
            {selector: '.main-team-content', offset: 550, callback: function(){
                $(".main-team-content .quotes-2").addClass("qopen-animation");
            } },
            {selector: '.main-vacancy-content', offset: -150, callback: function(){
                $(".main-vacancy-content .description").addClass("textnext-animation");
            } },
            {selector: '.main-whysection-content', offset: 100, callback: function(){
                $(".main-whysection-content .begin-position-img").addClass("eye-animation");
                $(".main-whysection-content .begin-position-vac-text").addClass("vac-text-animation");
            } },
            {selector: '.main-whysection-content', offset: 350, callback: function(){
                $(".main-whysection-content .begin-position-triangle").addClass("triangle-animation");
                $(".main-whysection-content .begin-position-vacSubtitble").addClass("vacSubtitble-animation");
            } },
            {selector: '.slider-card-img', offset: 50, callback: function(){
                $(".slider-card-img").addClass("slider-card-img-animation");
            } },



            {selector: '.review', offset: 50, callback: function(){
                $(".review .title-section").addClass("title-animation");
            } },
            {selector: '.cards-review', offset: 50, callback: function(){
                $(".cards-review .krasnogor").removeClass("begin-position-cards").addClass("cards-animation");
                $(".cards-review .troian").removeClass("begin-position-cards").addClass("cards-animation");
                $(".cards-review .rv-quotes").removeClass("begin-position-rvqclose").addClass("rv-qclose-animation");
            } },
            {selector: '.cards-review', offset: 900, callback: function(){
                $(".cards-review .logvinova").removeClass("begin-position-cards").addClass("cards-animation");
            } },
            {selector: '.cards-review', offset: 1100, callback: function(){
                $(".cards-review .gonchar").removeClass("begin-position-cards").addClass("cards-animation");
                $(".cards-review .rv-quotes-2").removeClass("begin-position-rvqopen").addClass("rv-qopen-animation");
            } },


            {selector: '.contacts', offset: 50, callback: function(){
                $(".contacts .title-section").addClass("title-animation");
                $(".contacts .img-fly-position").addClass("img-plain-animation");
            } },
            {selector: '.contacts', offset: 1200, callback: function(){
                $(".contacts .subtext").addClass("subtext-animation");
            } },


            {selector: '.vacancy', offset: 50, callback: function(){
                $(".base-section .title").addClass("title-animation");
                $(".text-block .line").addClass("line-animation");
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
            } },


            {selector: '.about', offset: 50, callback: function(){
                $(".about .about-title").addClass("about-title-animation");
                $(".about .about-bg-img").addClass("about-bg-img-animation");
            } },
            {selector: '.about', offset: 900, callback: function(){
                $(".about .left-text").addClass("left-text-animation");
                $(".about .about-arrow").addClass("about-arrow-animation");
            } },
            {selector: '.about-f-section', offset: 1000, callback: function(){
                $(".about .next").addClass("next-animation");
                $(".about .block .text-block").addClass("text-block-animation");
                $(".about .about-arrow-big").addClass("about-arrow-animation");
            } },
            {selector: '.about-why-section', offset: 150, callback: function(){
                $(".about .about-why-section").addClass("about-why-section-animation");
            } },
            {selector: '.target-section', offset: 150, callback: function(){
                $(".about .target-img").addClass("target-img-animation");
                $(".about .target-block").addClass("target-block-animation");
                $(".about .target-section .subtext").addClass("subtext-animation");
            } },
            {selector: '.progress-section', offset: 150, callback: function(){
                $(".about .progress-img-current").addClass("progress-img-animation");
            } },
            {selector: '.troianova-block', offset: 250, callback: function(){
                $(".about .white-block .text").addClass("white-block-text-animation");
                $(".about .about-triangle").addClass("about-triangle-animation");
            } },



            {selector: '.vacancy-job', offset: 50, callback: function(){
                $(".vacancy-job").addClass("job-animation");
            } },
            {selector: '.vacancy-plus', offset: 250, callback: function(){
                $(".vacancy-plus").addClass("job-animation");
            } },
            {selector: '.vacancy-offer', offset: 250, callback: function(){
                $(".vacancy-offer").addClass("job-animation");
            } },
            {selector: '.vacancy-form', offset: 250, callback: function(){
                $(".vacancy-form").addClass("vacancy-form-animatino");
            } }
        ];
        Materialize.scrollFire(options);
    };

};