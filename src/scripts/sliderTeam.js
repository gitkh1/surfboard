//team__slider
function closeElementTeamSlider(elem) {
    elem.removeClass('team__name--active');
    elem.siblings('.team__content').removeClass('team__content--active');
    elem.siblings('.team__photo').removeClass('team__photo--active');
};
function openElementTeamSlider(elem) {
    closeElementTeamSlider($('.team__item .team__name').not(elem));
    elem.addClass('team__name--active');
    elem.siblings('.team__content').addClass('team__content--active');
    elem.siblings('.team__photo').addClass('team__photo--active');
};
$('.team__name').on('click', function (event) {
    event.preventDefault();
    const $clickTarget = $(this);
    if ($clickTarget.hasClass('team__name--active')) {
        closeElementTeamSlider($clickTarget);
    } else {
        openElementTeamSlider($clickTarget);
    };
});