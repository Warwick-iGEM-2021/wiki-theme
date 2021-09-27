// Show a loading screen until all assets are loaded
$(document).ready(function () { // Require all js to load
    // Require all images to load
    // (this should be the big one for most page loading tbh)
    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        setTimeout(function(){
            $('body').addClass('loaded');
        }, 1500); //TODO: Work out what works for this delay on the actual site
    });
});

// Expand the read more section on click
$('.read_more').find('a[href="#"]').on('click', function (e) {
    // Don't follow the hyperlink
    e.preventDefault();
    // Show the read more
    $(this).closest('.read_more').find('.read_more_small').toggleClass('read_more_small read_more_big');
    // Adjust the height that was set inline on the read more small, and not
    // deleted on toggle
    $(this).closest('.read_more').find(".read_more_big").css("height", "auto");
    // Hide the read more message
    $(this).css("display", "none");
});


$(function () {
    var siteSticky = function () {
        $(".js-sticky-header").sticky({ topSpacing: 0 });
    };
    siteSticky();

    var siteMenuClone = function () {
        $('.js-clone-nav').each(function () {
            var $this = $(this);
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
        });

        setTimeout(function () {
            var counter = 0;
            $('.site-mobile-menu .has-children').each(function () {
                var $this = $(this);
                $this.prepend('<span class="arrow-collapse collapsed">');
                $this.find('.arrow-collapse').attr({
                    'data-toggle': 'collapse',
                    'data-target': '#collapseItem' + counter,
                });
                $this.find('> ul').attr({
                    'class': 'collapse',
                    'id': 'collapseItem' + counter,
                });
                counter++;
            });
        }, 1000);

        $('body').on('click', '.arrow-collapse', function (e) {
            var $this = $(this);
            if ($this.closest('li').find('.collapse').hasClass('show')) {
                $this.removeClass('active');
            } else {
                $this.addClass('active');
            }
            e.preventDefault();
        });

        $(window).resize(function () {
            var $this = $(this),
                w = $this.width();
            if (w > 768) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        })

        $('body').on('click', '.js-menu-toggle', function (e) {
            var $this = $(this);
            e.preventDefault();
            if ($('body').hasClass('offcanvas-menu')) {
                $('body').removeClass('offcanvas-menu');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-menu');
                $this.addClass('active');
            }
        })

        // click outisde offcanvas
        $(document).mouseup(function (e) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });
    };
    siteMenuClone();

});
