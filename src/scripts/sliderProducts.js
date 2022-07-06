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