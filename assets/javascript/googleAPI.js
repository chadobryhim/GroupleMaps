var testObject = {//a test groupon oject that will be how all the api needs to follow
  pos: {
          "lat": 39.01214,
          "lng": - 94.39042},
  content: {
    description: "For your weirdos",
    adTitle:"Lions for your militarty",
    shortTitle: "We got Weird Shit",
    image: ""
  },
  price: {
    regular: "One MILLLION DOLLARS",
    discount: "5000%",
    newPrice: "You First Born"
  },
  contact: {
    websiteUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    dealUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }

  }
var markersArray = [];




//places a marker
  function placeMarker(object){
    var latLng = {lat: object.loc.lat, lng: object.loc.lng};
    var infoWindow = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' +object.content.shortTitle+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b>The Deal: </b> '+ object.content.adTitle+'</p>' +
            '<p><b>The Fine Print: </b>'+ object.content.description + '</p>' +
          //  '<p><b>Price: </b><s>'+ object.price.regular + '</s> '+object.price.newPrice + ' '+ "<b> A Discount of "+object.price.discount+ '</p>' +
            '<p><b>URL: </b><a href="'+ object.contact.websiteUrl+'">'+ 'Company URL</a> <a href="'+object.contact.dealUrl +'"> Deal URL</a></p>'+
            '</div>'+
            '</div>';

    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    //Creates the content window to be filled in by the object
    var infowindow = new google.maps.InfoWindow({
      content: infoWindow
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

  function placeAllMarkers(){
    for (var i = 0; i < dealReturn.length; i++) {
      var thisDeal = dealReturn[i];
      var newMarker = {
        loc: {
              "lat":  thisDeal.loc.lat,
              "lng":  thisDeal.loc.lng},
        content: {
            description: thisDeal.options[i].details[i],
            adTitle: thisDeal.title,
            shortTitle: thisDeal.announcementTitle,
            image: thisDeal.grid4ImageUrl
        },
        price: {
            regular: thisDeal.options[i].value.amount,
            discount: thisDeal.options[i].discount.amount,
            newPrice: thisDeal.options[i].price.amount
        },
        contact: {
          websiteUrl: thisDeal.merchant.websiteUrl,
          dealUrl: thisDeal.dealUrl
        }
      }

    }
  }
