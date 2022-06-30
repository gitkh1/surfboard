$(document).ready(function () {
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

    //team__slider
    function closeElement(elem) {
        elem.removeClass('team__name--active');
        elem.siblings('.team__content').removeClass('team__content--active');
        elem.siblings('.team__photo').removeClass('team__photo--active');
    }
    function openElement(elem) {
        elem.addClass('team__name--active');
        elem.siblings('.team__content').addClass('team__content--active');
        elem.siblings('.team__photo').addClass('team__photo--active');
        closeElement($('.team__item .team__name').not(elem));
    }
    //    $('.team__content').hide();
    $('.team__name').on('click', function (event) {
        event.preventDefault();
        const $clickTarget = $(this);
        if ($clickTarget.hasClass('team__name--active')) {
            closeElement($clickTarget);
        } else {
            openElement($clickTarget);
        };
    });

    //slider__products
    const $sliderControlLeft = $('#slider-control-left');
    const $sliderControlRight = $('#slider-control-right');
    const $sliderList = $('.slider__list');
    let $sliderWidth = $sliderList.outerWidth();
    $sliderControlRight.on('click', (e) => {
        e.preventDefault();
        const $first = $sliderList.children().first();
        $first.animate({ 'margin-left': `-` + $sliderWidth + `px` }, 300, () => {
            $sliderList.append($first);
            $first.css({ 'margin-left': 0 });
        });
    });
    $sliderControlLeft.on('click', (e) => {
        e.preventDefault();
        const $last = $sliderList.children().last();
        $sliderList.prepend($last);
        $last.css({ 'margin-left': `-` + $sliderWidth + `px` });
        $last.animate({ 'margin-left': 0 }, 300);
    });

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

    //modal
    const $overlay = $('.overlay');
    const $modal = $('.modal')
    function openModal(status) {
        $overlay.fadeIn(300);
        $modal.fadeIn(300, function() {
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

    //ajax form
    const $myForm = $('.form');
    const $sendButton = $('.submit');
    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
    }
    function validateForm(form) {
        let valid = true;
        if (!validateField($('input[name=name]', form).get(0))) {
            valid = false;
        }
        if (!validateField($('input[name=phone]', form).get(0))) {
            valid = false;
        }
        if (!validateField($('textarea[name=comment]', form).get(0))) {
            valid = false;
        }
        return valid;
    };
    $sendButton.on('click', function (e) {
        e.preventDefault();
        if (validateForm($myForm)) {
            const $address = [];
            $('input[name^=address]', $myForm).each(() => $address.push($(this).val()));
            const data = {
                name: $('input[name=name]', $myForm).eq(0).val(),
                phone: $('input[name=phone]', $myForm).eq(0).val(),
                //address: $address,
                comment: $('textarea[name=comment]', $myForm).eq(0).val(),
                //pay: $('input[name=option]:checked').siblings('.radio__title').html(),
                //callback: $('input[name=callback]:checked').siblings('.radio__title').html()
                to : "mail@mail.ru" //на ленинге нет поля с email, хотя сервер ждет его
            }
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            xhr.addEventListener('load', () => {
                openModal(xhr.response.status);
                if (xhr.response.status) {$myForm[0].reset()};
            });
        };
    });
});