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