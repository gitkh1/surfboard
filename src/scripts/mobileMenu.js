//mobileMenu
const $openMenuButton = $('#mobile-menu-open');
const $closeMenuButton = $('#mobile-menu-close');
const $mobileMenu = $('.mobile-menu');
$openMenuButton.on('click', e => {
    e.preventDefault();
    $mobileMenu.addClass("is-active");
});
$closeMenuButton.on('click', e => {
    e.preventDefault();
    $mobileMenu.removeClass("is-active");
});