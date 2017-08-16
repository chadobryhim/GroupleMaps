// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate
var map, infoWindow;
var userPos;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
                "lat": 38.8984667,
                "lng": -94.70188999999999},
        zoom: 13
    });
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log('pos is' + pos + 'lat is ' + position.coords.latitude);
            userPos = pos;
            infoWindow.setPosition(pos);
            infoWindow.setContent('You!');
            infoWindow.open(map);
            map.setCenter(pos);
            zoom: 13;
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    };
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};


$(".submit").on("click", function() {
  userInputEntered();
  setMapOnAll(map);
})

$(".save").on("click", function() {

})
