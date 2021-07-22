
$('.dropdown').on('show.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});
$('.dropdown').on('hide.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});


// Capture scroll any percentage
const $scrollLine = $('#scroll-line');
$(window).scroll(function(){
    var wintop = $(window).scrollTop(), docheight =
        $(document).height(), winheight = $(window).height();
        var scrolled = (wintop/(docheight-winheight))*100;
        $scrollLine.css('width', (scrolled + '%'));
});
