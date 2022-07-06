//modal
const $overlay = $('.overlay');
const $modal = $('.modal');
function openModal(status) {
    $overlay.fadeIn(400);
    $modal.fadeIn(400, function () {
        if (status) {
            $('.modal__text').html('Отправка удалась');
        } else {
            $('.modal__text').html('Произошла ошибка');
        };
    });
    $('body').addClass('lock');
};
function closeModal() {
    $overlay.fadeOut(400, () => $('body').removeClass('lock'));
    $modal.fadeOut(400, () => $('.modal__text').html('&nbsp;'));
};
$('.overlay, .modal').on('click', closeModal);