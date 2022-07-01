//modal
const $overlay = $('.overlay');
const $modal = $('.modal')
function openModal(status) {
    $overlay.fadeIn(300);
    $modal.fadeIn(300, function () {
        if (status) {
            $('.modal__text').html('Отправка удалась');
        } else {
            $('.modal__text').html('Произошла ошибка');
        }
    });
    $('body').addClass('lock');
};
function closeModal() {
    $overlay.fadeOut(300, () => $('body').removeClass('lock'));
    $modal.fadeOut(300, () => $('.modal__text').html('&nbsp;'));
};
$('.overlay, .modal').on('click', closeModal);