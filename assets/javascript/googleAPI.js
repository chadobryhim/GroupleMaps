var testObject = {//a test groupon oject that will be how all the api needs to follow
  pos: {
          "lat": 38.899794,
          "lng": -94.726138},
  dealName: "Fun info",
  company: "clowInc",
  deal: "a deal",
  grouponURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  dealDate: "10/17/1993"
  }
var markersArray = [];
var grouponSearcher = 10;





//places a marker
  function placeMarker(object){
    var latLng = {lat: object.pos.lat, lng: object.pos.lng};
    var name = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' +object.dealName+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b> Company:</b> '+ object.company+'</b></p>' +
            '<p><b>The Deal: </b>'+ object.deal + '</p>'
            '<p><b> Coupon Dates: </b>'+ object.dealDate +'</p>'+
            '<p><b>URL: </b><a href="'+ object.grouponURL+'">'+ 'To Groupon we go</a></p>'+
            '</div>'+
            '</div>';

    var marker = new google.maps.Marker({
      position: latLng,
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

  function placeAllMarkers(GrouponObject){
    for (var i = 0; i < grouponSearcher; i++) {
      var thisDeal = GrouponObject[i];
      var newMarker = {
        pos: {
              "lat": "",
              "lng": ""},
      dealName: "",
      company: "",
      deal: "",
      grouponURL: "",
      dealDate: ""
      }
      newMarker.pos.lat = thisDeal.rando;
      newMarker.pos.lng = thisDeal.rando;
      newMarker.dealName = thisDeal.rando;
      newMarker.company = thisDeal.rando;
      newMarker.deal = thisDeal.rando;
      newMarker.grouponURL = thisDeal.rando;
      newMarker.dealDate = thisDeal.rando;
      placeMarker(newMarker);
    }
  }
