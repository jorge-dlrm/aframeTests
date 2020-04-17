window.onload = () => {
    staticLoadPlaces();
};

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

            let places = [
                {
                    name: 'Magnemite',
                    location: {
                        lat: actualLat,
                        lng: actualLong
                    },
                    source: './assets/magnemite/scene.gltf',
                    scale: '0.3 0.3 0.3'
                },
                {
                    name: 'Chocolate',
                    location: {
                        lat: actualLat,
                        lng: actualLong
                    },
                    source: './assets/halloween/chocolate.glb',
                    scale: '0.02 0.02 0.02'
                }
            ];

            for (let i = 0; i < places.length; i++) {
                let asset = places[i];
                let randomSignLat = Math.round(Math.random());
                let randomSignLong = Math.round(Math.random());
                console.log('The Sign randoms for ' + asset.name + ": Lat-> ", randomSignLat + " -- Long-> ", randomSignLong);

                //The random for the lat with te sign and everything
                if (randomSignLat == 1) {
                    asset.location.lat += Math.floor(Math.random() * 100)/100000;
                } else {
                    asset.location.lat += ((-1) * (Math.floor(Math.random() * 100)/100000));
                }

                //The random for the long with te sign and everything
                if (randomSignLat == 1) {
                    asset.location.lng += Math.floor(Math.random() * 100)/100000;
                } else {
                    asset.location.lng += ((-1) * (Math.floor(Math.random() * 100)/100000));
                }
            }

            renderPlaces(places);
        }, err => {
            console.log(err);
        });
    }
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