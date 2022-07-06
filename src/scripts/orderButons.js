$('a.btn').not('.mobile-menu a').on('click', function (e) {
    e.preventDefault();
    const $order = $('.order');
    const sectionOrderIndex = $('.section').index($order);
    performTransition(sectionOrderIndex);//require one page scroll paginator
});