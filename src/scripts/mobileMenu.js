//mobileMenu
const $openMenuButton = $('#mobile-menu-open');
const $closeMenuButton = $('#mobile-menu-close');
const $mobileMenu = $('.mobile-menu');
const $mobileMenuList = $('.mobile-menu__list');
$openMenuButton.on('click', e => {
    e.preventDefault();
    $mobileMenu.fadeIn(400);
});
$closeMenuButton.on('click', e => {
    e.preventDefault();
    $mobileMenu.fadeOut(400);
});
$mobileMenuList.children().on('click', function (e) {
    e.preventDefault();
    const clickTargetLiIndex = $mobileMenuList.children().index($(this));
    const sectionOrderIndex = clickTargetLiIndex + 1;
    $mobileMenu.fadeOut(400, performTransition(sectionOrderIndex));//require one page scroll paginator
});