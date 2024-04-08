
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
let mapToken = mapAccessToken;
console.log(mapToken)
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

const marker = new mapboxgl.Marker({color: 'red'})
.setLngLat(coordinates)
.addTo(map);