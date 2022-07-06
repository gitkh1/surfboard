//accordion slider
const closeElementAccordion = elem => {
    elem.removeClass('accordion__descr--active');
    $('.accordion__title').removeClass('accordion__title--opened');
    elem.parent().addClass('accordion__item--closed');
    if ($('.accordion__item--closed').length === $('.accordion__item').length) {
        $('.accordion__item--closed').removeClass('accordion__item--closed');
    }
};
const openElementAccordion = elem => {
    closeElementAccordion($('.accordion__list .accordion__descr').not(elem));
    elem.addClass('accordion__descr--active');
    $('.accordion__title').addClass('accordion__title--opened');
    elem.parent().removeClass('accordion__item--closed');
};
$('.accordion__name').on('click', function (event) {
    event.preventDefault();
    const $clickTarget = $(this).siblings('.accordion__descr');
    if ($clickTarget.hasClass('accordion__descr--active')) {
        closeElementAccordion($clickTarget);
    } else {
        openElementAccordion($clickTarget);
    };
});
$('.accordion__title').on('click', function (event) {
    event.preventDefault();
    closeElementAccordion($('.accordion__list .accordion__descr'));
});
$('.accordion__descr').on('click', function (event) {
    event.preventDefault();
    closeElementAccordion($('.accordion__list .accordion__descr'));
});