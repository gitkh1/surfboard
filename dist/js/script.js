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
    myMap.behaviors.disable('drag');
};

ymaps.ready(init);
$(document).ready(function () {
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
        const elemToScroll = $('.section')[clickTargetLiIndex + 1];
        const scrollTo = function() {
            $('.maincontent').animate({
                scrollTop: $(elemToScroll).offset().top
            }, 400);
        };
        $mobileMenu.fadeOut(400, scrollTo());
    });
});
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
        const elemToScroll = $sections[clickTargetLiIndex];
        elemToScroll.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
$(document).ready(function() {
    $buttonToOrder = $('a.btn').not('.mobile-menu a').on('click', function(e) {
        e.preventDefault();
        const $order = $('.order');
        $('.maincontent').animate({
            scrollTop: $order.offset().top
        }, 400);
    });
});
$(document).ready(() => {
    const player = $('.player__video')[0];
    const $playButton = $('.player__start');
    let durationSec;

    //init player eventlisteners
    player.addEventListener('canplay', (e) => {
        let interval;
        if (typeof durationSec === 'undefined') {durationSec = player.duration};
        if (typeof interval !== "undefined") { clearInterval(interval); };
        interval = setInterval(() => {
            const completedSec = player.currentTime;
            const completedPercent = Math.round((completedSec / durationSec) * 100);
            const currentVolume = player.volume;
            const currentVolumePercent = Math.round(currentVolume * 100);
            $('.player__playback input').css({ 'background-size': `${completedPercent}% 100%` });
            $('.player__playback input').val(completedPercent);
            $('.volume__scale input').css({ 'background-size': `${currentVolumePercent}% 100%` });
            $('.volume__scale input').val(currentVolume);
        }, 1000);
    });
    player.addEventListener('playing', () => {
        $('.player__splash').hide();
        $playButton.addClass('paused');
        $(player).on('click', () => player.pause());
    });
    player.addEventListener('pause', () => {
        $playButton.removeClass('paused');
        $(player).on('click', () => player.play());
    });

    //init controls events
    $playButton.on('click', e => {
        e.preventDefault();
        const btn = $(e.currentTarget);
        if (btn.hasClass('paused')) {
            player.pause();
        } else {
            player.play();
        }
    });

    $('.player__splash').on('click', e => player.play());

    $('.player__playback input').on('input', function(e) {
        e.preventDefault();
        if (typeof durationSec === 'undefined') {durationSec = player.duration};
        const newTimePercent = $(this).val();
        const newPlayerTimeSec = Math.round(durationSec * newTimePercent / 100);

        player.currentTime = newPlayerTimeSec;
        $('.player__playback input').css({ 'background-size': `${newTimePercent}% 100%` });
    });

    $('.volume__scale input').on('input', function(e) {
        e.preventDefault();
        const newVolume = $(this).val();
        const newVolumePercent = newVolume * 100;

        player.volume = newVolume;
        $('.volume__scale input').css({ 'background-size': `${newVolumePercent}% 100%` });
    });

    $('.volume__speaker').on('click', function(e) {
        const btn = $(e.currentTarget);
        if (btn.hasClass('volume__speaker--active')) {
            btn.removeClass('volume__speaker--active');
            player.muted = true;
        } else {
            btn.addClass('volume__speaker--active');
            player.muted = false;
        };
    });
});
$(document).ready(function () {
    //accordion slider
    const closeElement = elem => {
        elem.removeClass('accordion__descr--active');
        $('.accordion__title').removeClass('accordion__title--opened');
        elem.parent().addClass('accordion__item--closed');
        if ($('.accordion__item--closed').length === $('.accordion__item').length) {
            $('.accordion__item--closed').removeClass('accordion__item--closed');
        }
    };
    const openElement = elem => {
        closeElement($('.accordion__list .accordion__descr').not(elem));
        elem.addClass('accordion__descr--active');
        $('.accordion__title').addClass('accordion__title--opened');
        elem.parent().removeClass('accordion__item--closed');
    };
    $('.accordion__name').on('click', function(event) {
        event.preventDefault();
        const $clickTarget = $(this).siblings('.accordion__descr');
        if ($clickTarget.hasClass('accordion__descr--active')) {
            closeElement($clickTarget);
        } else {
            openElement($clickTarget);
        };
    });
    $('.accordion__title').on('click', function(event) {
        event.preventDefault();
        closeElement($('.accordion__list .accordion__descr'));
    });
    $('.accordion__descr').on('click', function(event) {
        event.preventDefault();
        closeElement($('.accordion__list .accordion__descr'));
    }); 
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
        $first.animate({ 'margin-left': `-` + $sliderWidth + `px` }, 400, () => {
            $sliderList.append($first);
            $first.css({ 'margin-left': 0 });
        });
    });
    $sliderControlLeft.on('click', (e) => {
        e.preventDefault();
        const $last = $sliderList.children().last();
        $sliderList.prepend($last);
        $last.css({ 'margin-left': `-` + $sliderWidth + `px` });
        $last.animate({ 'margin-left': 0 }, 400);
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