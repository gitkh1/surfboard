const $sections = $('section');
const $display = $('.maincontent'); //require transition in css
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const $sideMenu = $('.fixed-menu');
const $menuList = $('.fixed-menu__list');
let $menuItems = $('.fixed-menu__item');
const isMobile = mobileDetect.mobile();
let inScroll = false;

//create elements in paginator
for (let i = $menuItems.length; i < $sections.length; i++) {
    let $paginatorListFirst = $menuItems.first().clone();
    $menuList.append($paginatorListFirst);
};

//init
$sections.first().addClass('active');
$menuItems.first().addClass('fixed-menu__item--active');
$menuItems = $('.fixed-menu__item');

const countSectionPosition = (sectionEq) => {
    const position = sectionEq * -100;
    if (isNaN(position)) {
        return 0;
    }
    return position;
};

const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = $sections.eq(sectionEq);
    const sectionTheme = currentSection.attr('data-section-theme');
    const activeClass = 'fixed-menu--dark';

    if (sectionTheme === 'light') {
        $sideMenu.addClass(activeClass);
    } else {
        $sideMenu.removeClass(activeClass);
    }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = (sectionEq) => {
    if (inScroll) return;
    const transitionOver = 1000;
    const mouseInertiaOver = 300;
    inScroll = true;
    const position = countSectionPosition(sectionEq);
    changeMenuThemeForSection(sectionEq);
    $display.css({
        transform: `translateY(${position}%)`,
    });
    resetActiveClassForItem($sections, sectionEq, 'active');
    resetActiveClassForItem($menuItems, sectionEq, 'fixed-menu__item--active');
    setTimeout(() => {
        inScroll = false;
    }, transitionOver + mouseInertiaOver);
};

//viewport scroller
const viewportScroller = () => {
    const activeSection = $sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index());
            }
        },
    };
};

//scroll on wheeel
$(window).on('wheel', (e) => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next();
    }
    if (deltaY < 0) {
        scroller.prev();
    }
});

//scroll on keydown
$(window).on('keydown', (e) => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === 'input' || tagName === 'textarea';
    const scroller = viewportScroller();

    if (userTypingInInputs) return;
    switch (e.keyCode) {
        case 38:
            scroller.prev();
            break;
        case 40:
            scroller.next();
            break;
    }
});

//touchmove on wrapper
$('.wrapper').on('touchmove', (e) => e.preventDefault());

//paginator clickabe items
$menuItems.on('click', function (event) {
    event.preventDefault();
    const clickTargetLiIndex = $menuItems.index($(this));
    performTransition(clickTargetLiIndex);
});

//scroll on mobile platforms
if (isMobile) {
    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $('body').swipe({
        swipe: function (event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = '';
            if (direction === 'up') scrollDirection = 'next';
            if (direction === 'down') scrollDirection = 'prev';
            scroller[scrollDirection]();
        }
    });
};