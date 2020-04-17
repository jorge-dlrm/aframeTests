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
            let random1 = Math.floor((Math.random() * 10)/100000);
            let random2 = Math.floor((Math.random() * 10)/100000);
            let random3 = Math.floor((Math.random() * 10)/100000);
            let random4 = Math.floor((Math.random() * 10)/100000);

            console.log('the randoms--------')
            console.log('1. random1= ', random1)
            console.log('2. random2= ', random2)
            console.log('3. random3= ', random3)
            console.log('4. random4= ', random4)
            console.log('END randoms--------')

            let places = [
                {
                    name: 'Magnemite',
                    location: {
                        //lat: 4.694047,
                        lat: actualLat + random1,
                        //lng: -74.065458
                        lng: actualLong + random2
                    },
                    source: './assets/magnemite/scene.gltf',
                    scale: '0.3 0.3 0.3'
                },
                {
                    name: 'Chocolate',
                    location: {
                        lat: 4.692978,
                        lat: actualLat + random3,
                        //lng: -74.064948
                        lng: actualLong + random4
                    },
                    source: './assets/halloween/chocolate.glb',
                    scale: '0.05 0.05 0.05'
                }
            ];
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