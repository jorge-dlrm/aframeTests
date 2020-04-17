window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function locate() {
    
}

function staticLoadPlaces() {
    let actualLat = 0.0;
    let actualLong = 0.0;
    if (navigator.geolocation) {
        console.log('Geo Supported');
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('The Position: ', position);
            actualLat = position.coords.latitude;
            actualLong = position.coords.longitude;
            console.log('Lat: ', actualLat , '--- Long: ', actualLong);
        }, err => {
            console.log(err);
        });
    }
    return [
        {
            name: 'Magnemite',
            location: {
                //lat: 4.694047,
                lat: actualLat + Math.floor((Math.random() * 10)/100000),
                //lng: -74.065458
                lng: actualLong + Math.floor((Math.random() * 10)/100000)
            },
            source: './assets/magnemite/scene.gltf',
            scale: '0.3 0.3 0.3'
        },
        {
            name: 'Chocolate',
            location: {
                lat: 4.692978,
                lat: actualLat + Math.floor((Math.random() * 10)/100000),
                //lng: -74.064948
                lng: actualLong + Math.floor((Math.random() * 10)/100000)
            },
            source: './assets/halloween/chocolate.glb',
            scale: '0.05 0.05 0.05'
        }
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        console.log('The place object: ', place);
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', place.source);
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', place.scale);

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}