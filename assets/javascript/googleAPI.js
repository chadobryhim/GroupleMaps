var markersArray = [];

//places a marker
  function placeMarker(object){
    var infoWindow = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' +object.content.shortTitle+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b>The Deal: </b> '+ object.content.adTitle+'</p>' +
          //  '<p><b>The Fine Print: </b>'+ object.content.finePrint + '</p>' +
          //'<p><b>Price: </b><s>'+ object.price.regular + '</s> '+object.price.newPrice + ' '+ "<b> A Discount of "+object.price.discount+ '</p>' +
            '<p><b>URL: </b><a href="'+ object.contact.websiteUrl+'">'+ 'Company URL</a> <a href="'+object.contact.dealUrl +'"> Deal URL</a></p>'+
            '<button class="ui primary basic button" id="save"><a href="#myAccount" target="_blank">Save</a></button>' +
            '</div>'+
            '</div>';
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(object.pos.lat, object.pos.lng),
      map: map
    });
    //Creates the content window to be filled in by the object
    var infowindow = new google.maps.InfoWindow({
      content: infoWindow
    });
    markersArray.push(marker)
    marker.addListener('click', function() { //this opens the info window on click
    infowindow.open(map,marker);
    });
  }

  //puts the top results in the bottom bar
  function resultsPlacer(n, object) {
    var result = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' +object.content.shortTitle+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b>The Deal: </b> '+ object.content.adTitle+'</p>' +
          //  '<p><b>The Fine Print: </b>'+ object.content.finePrint + '</p>' +
          //'<p><b>Price: </b><s>'+ object.price.regular + '</s> '+object.price.newPrice + ' '+ "<b> A Discount of "+object.price.discount+ '</p>' +
            '<p><b>URL: </b><a href="'+ object.contact.websiteUrl+'">'+ 'Company URL</a> <a href="'+object.contact.dealUrl +'"> Deal URL</a></p>'+
            '<button class="ui primary basic button" id="save"><a href="#myAccount" target="_blank">Save</a></button>' +
            '</div>'+
            '</div>';
      $("#result-" + n).html(result);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < dealReturn.length; i++) {
      placeMarker(dealReturn[i]);
      if (i<3) {
        resultsPlacer(i, dealReturn[i]);
      }
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    for (var i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);

    }
    markersArray = [];
    dealReturn = [];
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markersArray = [];
  }
  //artifact functions for the purposes of testing
  function checkArray(){
    for (var i = 0; i < markersArray.length; i++) {
    }
  }
