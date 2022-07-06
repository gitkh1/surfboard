$buttonToOrder = $('a.btn').not('.mobile-menu a').on('click', function (e) {
    e.preventDefault();
    const $order = $('.order');
    $('.maincontent').animate({
        scrollTop: $order.offset().top
    }, 400);
});