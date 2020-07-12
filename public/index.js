//const icon = ('../parkIcon.svg');
mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bHhsIiwiYSI6ImNrOG5lZ3VqZDA5NzczZXFveHg1em1mNGwifQ.tmKbOLYZei4oGBdPg1bY_Q';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-82.4428345, 27.1678327],
    zoom: 10
});

// Retrieve parks from API
async function getParks() {

    const res = await fetch('/api/parks');
    const data = await res.json();

    const parks = data.data.map(park => {

        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [park.location.coordinates[0], park.location.coordinates[1]]
            },
            properties: {
                icon: 'park',
                description: `${park.name},
                            ${park.location.formattedAddress},
                            comments: ${park.comments},
                            is dog friendly: ${park.dogFriendly}`
                    // formattedAddress: park.formattedAddress,
                    // comments: park.comments,
                    // dogFriendly: park.dogFriendly
            },

        };
    });
    console.log(parks);
    loadMap(parks);
}

getParks();
// load map with parks 
function loadMap(parks) {
    map.on('load', function() {

        map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': parks
            }
        });

        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point',
            'layout': {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                // 'text-field': '{name}',
                //'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                //'text-offset': [0, 0.9],
                //'text-anchor': 'top'
            }
        });


    });
}