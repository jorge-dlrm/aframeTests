window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: 4.694047,
                lng: -74.065458
            },
            source: './assets/magnemite/scene.gltf',
            scale: '0.5 0.5 0.5'
        },
        {
            name: 'Chocolate',
            location: {
                lat: 4.692978,
                lng: -74.064948
            },
            source: './assets/halloween/chocolate.glb',
            scale: '0.05 0.05 0.05'
        },
        {
            name: 'Articuno',
            location: {
                lat: 4.693688,
                lng: -74.065302
            },
            source: './assets/articuno/scene.gltf',
            scale: '0.2 0.2 0.2'
        }
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
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