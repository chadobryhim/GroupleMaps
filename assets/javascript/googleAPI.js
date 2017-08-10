var testObject = {//a test groupon oject that will be how all the api needs to follow
  pos: {
          "lat": 39.0853,
          "lng": -94.5856},
  name: "Fun info"
  }
var markersArray = [];





//places a marker
  function placeMarker(object){
    var uluru = {lat: object.pos.lat, lng: object.pos.lng};
    var name = object.name;

    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
    //Creates the content window to be filled in by the object
    var infowindow = new google.maps.InfoWindow({
      content: name
    });
    //pushes the marker into an array so we can remove markers latter
    markersArray.push(marker);
    marker.addListener('click', function() { //this opens the info window on click
    infowindow.open(map,marker);


    });
  }
  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(map);
    }
  }
  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }


  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }
