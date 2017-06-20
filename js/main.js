$(function(){
    var isMobile = true;

    var previousScroll = 10;

    var menuBar = $(".navigation-bar");
    var menu = $('.main-nav-menu');
    var toggleMenuInput =  $("#menuToggle input[type='checkbox']");
    var horizontalBox = $(".horizontal-box").find(".card");

    var mobileMenuValue = 1100;

    var LINES_NUM = 4;
    var MOB_LINES_NUM = 2;

    var fixIphoneBugValue = 15;



    function generateSlides(){
        $('#slides-vertical').slidesjs({
            width: 381,
            height: 579,
            navigation: false,
            pagination: false,
            callback: {
                loaded: function(number) {
                    $('.slider-number-vertical').text(number);
                },
                start: function(number) {

                },
                complete: function(number) {
                    $('.slider-number-vertical').text(number);
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
                    $('.slider-number-horizontal').text(number);
                },
                start: function(number) {
                    $('#slides-horizontal .slidesjs-navigation').hide();
                    $('#slides-horizontal .card-content').addClass("card-content-1");
                },
                complete: function(number) {
                    $('#slides-horizontal .slidesjs-navigation').show();
                    $('.slider-number-horizontal').text(number);
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
                    $('.slider-number-horizontal-1').text(number * IMG_NUM);
                },
                start: function(number) {

                },
                complete: function(number) {
                    $('.slider-number-horizontal-1').text(number * IMG_NUM);
                    $('.top-navigation').css("lest", "0");
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
        var conteiner = $('.mobile');

        var linesWidth = conteiner.width();
        var linesHeight = conteiner.height() + 190;
        if(isMobile) linesHeight -= 90;
        linesHeight = fixLineHeight(linesHeight);

        linesConteiner.width(linesWidth);
        linesConteiner.height(linesHeight);

        if(!isMobile)
            line.width(linesWidth / LINES_NUM - 1.1);
        else
            line.width(linesWidth / MOB_LINES_NUM - 1.1);
        line.height(linesHeight);
    }

    function fixLineHeight(height){
        var newHeight = height;
        if($('.mobile').has('.contacts').length) newHeight += 250;
        if($('.mobile').has('.contacts').length && isMobile) newHeight -= 250;
        return newHeight;
    }

    function hideNav() {
        $("[data-nav-status='toggle']").removeClass("is-visible").addClass("is-hidden");
    }
    function showNav() {
        $("[data-nav-status='toggle']").removeClass("is-hidden").addClass("is-visible");
    }

    function toggleMenuWhenResize(){
        //$('.play-img').height($('.video-block img').height()); for video
        if ($(window).width() <= (mobileMenuValue + 36)){
            horizontalBox.removeClass("horizontal");
        }else {
            horizontalBox.addClass("horizontal");
        }

        if($(window).width() <= mobileMenuValue){

            isMobile = true;
            menu.hide();
        }
        else {
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
            if(isMobile) {
                toggleMenuInput.prop('checked', false);
                menu.hide();
            }
        } else {
            showNav();
        }
        menuOpacity(currentScroll);
        previousScroll = currentScroll;

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
            if($(this).scrollTop() < fixIphoneBugValue)
                menuBar.removeClass("scroll-menu");
        }
    });


    $(window).resize(toggleMenuWhenResize);
    $(window).scroll(menuBehaviorOnScroll);

    toggleMenuWhenResize();
    generateSlides();
    lines();
});