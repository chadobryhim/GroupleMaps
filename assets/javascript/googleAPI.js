var testObject = {
  pos: {
          "lat": 39.0853,
          "lng": -94.5856},
  name: "Fun info"
  }
var markersArray = [];





  function placeMarker(object){
    var uluru = {lat: object.pos.lat, lng: object.pos.lng};
    var name = object.name;

    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
    var infowindow = new google.maps.InfoWindow({
      content: name
    });
    marker.addListener('click', function() {
    infowindow.open(map,marker);

});
  }
  function removeMarker(object){
    function clearOverlays() {
      for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
      }
      markersArray.length = 0;
    }
  }
