$(document).ready(function () {
    //ajax form
    const $myForm = $('.form');
    const $sendButton = $('.submit');
    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
    };
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
                to: "mail@mail.ru" //на ленинге нет поля с email, хотя сервер ждет его
            };
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            xhr.addEventListener('load', () => {
                openModal(xhr.response.status);
                if (xhr.response.status) { $myForm[0].reset() };
            });
        };
    });
});
let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.7520, 37.5761],
        zoom: 16,
        controls: []
    });

    const coords = [
        [55.752004, 37.576133],
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './img/content/marker.svg',
        iconImageSize: [44, 54],
        iconImageOffset: [-22, -54]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);
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
});
$(document).ready(function () {
    //modal
    const $overlay = $('.overlay');
    const $modal = $('.modal');
    function openModal(status) {
        $overlay.fadeIn(300);
        $modal.fadeIn(300, function () {
            if (status) {
                $('.modal__text').html('Отправка удалась');
            } else {
                $('.modal__text').html('Произошла ошибка');
            };
        });
        $('body').addClass('lock');
    };
    function closeModal() {
        $overlay.fadeOut(300, () => $('body').removeClass('lock'));
        $modal.fadeOut(300, () => $('.modal__text').html('&nbsp;'));
    };
    $('.overlay, .modal').on('click', closeModal);
});
$(document).ready(function () {
    //one page scroll paginator
    const $paginatorList = $('.fixed-menu__list');
    const $paginatorItemClassActive = 'fixed-menu__item--active';
    const $sections = $('.section');
    const sections = document.querySelectorAll('.section');


    //change paginator classes
    const changeClass = (ndx) => {
        $paginatorList.children().removeClass($paginatorItemClassActive);
        $paginatorList.children().eq(ndx).addClass($paginatorItemClassActive);
    };


    //create elements in paginator
    for (let i = $paginatorList.children().length; i < sections.length; i++) {
        const $paginatorListFirst = $paginatorList.children().first().clone();
        $paginatorList.append($paginatorListFirst);
    };


    //init observer
    const options = {
        threshold: 0.5
    };
    const callback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const ndx = $sections.index($(entry.target));
                changeClass(ndx);
            };
        });
    };
    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section) => {
        observer.observe(section);
    });

    //paginator clickabe items
    $paginatorList.children().on('click', function (event) {
        event.preventDefault();
        const clickTargetLiIndex = $paginatorList.children().index($(this));
        const elemToScroll = $sections[clickTargetLiIndex]
        elemToScroll.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
$(document).ready(() => {
    const player = $('.player__video')[0];

    //init playback
    player.oncanplay = function () {
        let interval;
        let durationSec = player.duration;

        if (typeof interval !== "undefined") {clearInterval(interval);};

        interval = setInterval(() => {
            const completedSec = player.currentTime;
            const completedPercent = (completedSec / durationSec) * 100;
            const completedPercentRight = 100 - completedPercent;

            const currentVolume = player.volume;
            const currentVolumePercent = currentVolume * 100;
            const currentVolumePercentRight = 100 - currentVolumePercent;

            $('.player__playback-button').css({left: `${completedPercent}%`});
            $('.player__playback-before').css({width: `${completedPercent}%`});
            $('.player__playback-after').css({width: `${completedPercentRight}%`});

            $('.volume__scale-button').css({left: `${currentVolumePercent}%`});
            $('.volume__scale-before').css({width: `${currentVolumePercent}%`});
            $('.volume__scale-after').css({width: `${currentVolumePercentRight}%`});
        }, 1000);

        //init events
        const playerButton = $('.player__start');

        playerButton.on('click', e => {
            e.preventDefault();
            const btn = $(e.currentTarget);
            if (btn.hasClass('paused')) {
                player.pause();
            } else {
                player.play();
            }
        });

        $('.player__playback').on('click', e => {
            const bar = $(e.currentTarget);
            const newButtonPosition = e.pageX - bar.offset().left;
            const buttonPosPercent = newButtonPosition / bar.width() * 100;
            const buttonPosPercentRight = 100 - buttonPosPercent;
            const newPlayerTimeSec = Math.round(durationSec * buttonPosPercent / 100);

            player.currentTime = newPlayerTimeSec;
            $('.player__playback-button').css({left: `${buttonPosPercent}%`});
            $('.player__playback-before').css({width: `${buttonPosPercent}%`});
            $('.player__playback-after').css({width: `${buttonPosPercentRight}%`});
        });

        $('.volume__scale').on('click', e => {
            const bar = $(e.currentTarget);
            const newButtonPosition = e.pageX - bar.offset().left;
            const buttonPosPercent = newButtonPosition / bar.width() * 100;
            const buttonPosPercentRight = 100 - buttonPosPercent;
            const newPlayerVolume = Math.round(buttonPosPercent) / 100;

            player.volume = newPlayerVolume;
            $('.volume__scale-button').css({left: `${buttonPosPercent}%`});
            $('.volume__scale-before').css({width: `${buttonPosPercent}%`});
            $('.volume__scale-after').css({width: `${buttonPosPercentRight}%`});
        });

        $('.volume__speaker').on('click', e => {
            e.preventDefault();
            const btn = $(e.currentTarget);
            if (btn.hasClass('volume__speaker--active')) {
                btn.removeClass('volume__speaker--active');
                player.muted = true;
            } else {
                btn.addClass('volume__speaker--active');
                player.muted = false;
            };
        });

        $('.player__splash').on('click', e => player.play());

        player.addEventListener('playing', () => {
            $('.player__wrapper').addClass('active');
            playerButton.addClass('paused');
        });
        player.addEventListener('pause', () => playerButton.removeClass('paused'));
    };
});
$(document).ready(function () {
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
});
$(document).ready(function () {
    //team__slider
    function closeElement(elem) {
        elem.removeClass('team__name--active');
        elem.siblings('.team__content').removeClass('team__content--active');
        elem.siblings('.team__photo').removeClass('team__photo--active');
    };
    function openElement(elem) {
        closeElement($('.team__item .team__name').not(elem));
        elem.addClass('team__name--active');
        elem.siblings('.team__content').addClass('team__content--active');
        elem.siblings('.team__photo').addClass('team__photo--active');
    };
    $('.team__name').on('click', function (event) {
        event.preventDefault();
        const $clickTarget = $(this);
        if ($clickTarget.hasClass('team__name--active')) {
            closeElement($clickTarget);
        } else {
            openElement($clickTarget);
        };
    });
});
$(document).ready(function () {
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
});