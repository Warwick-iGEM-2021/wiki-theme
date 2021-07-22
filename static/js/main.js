
// Capture scroll any percentage
const $scrollLine = $('#scroll-line');
$(window).scroll(function(){
    var wintop = $(window).scrollTop(), docheight =
        $(document).height(), winheight = $(window).height();
        var scrolled = (wintop/(docheight-winheight))*100;
        $scrollLine.css('width', (scrolled + '%'));
});
