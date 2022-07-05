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