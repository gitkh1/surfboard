//slideshow__reviews
const $avatarsList = $('.reviews__switcher');
const $reviewsList = $('.reviews__display');
const $avatarClassActive = 'interactive-avatar--active';
const $reviewClassActive = 'reviews__display-inner--active';
$avatarsList.find('a').on('click', function (e) {
    e.preventDefault();
    const $clickTarget = $(this).parent();
    function switchReview(elem) {
        const $ndx = elem.index();
        $avatarsList.children().removeClass($avatarClassActive);
        $reviewsList.children().removeClass($reviewClassActive);
        $avatarsList.children().eq($ndx).addClass($avatarClassActive);
        $reviewsList.children().eq($ndx).addClass($reviewClassActive);
    }
    if (!$clickTarget.hasClass($avatarClassActive)) {
        switchReview($clickTarget);
    };
});