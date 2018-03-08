let dealReturn = [];
const dealLimit = 20;
let url;
let dealCategory;
let k = 0;


function addIndDeals(response, i) {
  const deal = response.deals[i];
  for (let j = 0; j < response.deals[i].options.length; j++) {
    dealReturn[k].content.indDeals.push({
      content: {
        description: deal.options[j].details[0],
        specificTitle: deal.options[j].title,
      },
      price: {
        regular: deal.options[j].value.amount,
        discount: deal.options[j].discount.amount,
        newPrice: deal.options[j].price.amount,
      },
    });
  }
  k++;
}

function addDeals(response) {
  for (let i = response.deals.length - 1; i >= 0; i--) {
    const deal = response.deals[i];
    if (deal.options[0].redemptionLocations[0] === null || deal.options[0].redemptionLocations[0] === undefined) {
      dealReturn.push({
        pos: {
          lat: deal.division.lat,
          lng: deal.division.lng,
        },
        content: {
          adTitle: deal.title,
          shortTitle: deal.announcementTitle,
          image: deal.grid4ImageUrl,
          indDeals: [],
        },
        contact: {
          merchantName: deal.merchant.name,
          websiteUrl: deal.merchant.websiteUrl,
          dealUrl: deal.dealUrl,
        },
      });
    } else {
      dealReturn.push({
        pos: {
          lat: deal.options[0].redemptionLocations[0].lat,
          lng: deal.options[0].redemptionLocations[0].lng,
        },
        content: {
          adTitle: deal.title,
          shortTitle: deal.announcementTitle,
          image: deal.grid4ImageUrl,
          indDeals: [],
        },
        contact: {
          merchantName: deal.merchant.name,
          websiteUrl: deal.merchant.websiteUrl,
          dealUrl: deal.dealUrl,
          phoneNumber: deal.options[0].redemptionLocations[0].phoneNumber,
          streetAddress: deal.options[0].redemptionLocations[0].streetAddress1,
          city: deal.options[0].redemptionLocations[0].city,
          state: deal.options[0].redemptionLocations[0].state,
          zipCode: deal.options[0].redemptionLocations[0].postalCode,
        },
      });
    }
    addIndDeals(response, i);
  }
}

function buildUrl() {
  if (userPos !== '') {
    if (dealCategory !== '') {
      url = `https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&radius=5&filters=category:${dealCategory}&lat=${userPos.lat}&lng=${userPos.lng}&limit=${dealLimit}`;
    } else {
      url = `https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&radius=5&lat=${userPos.lat}&lng=${userPos.lng}&limit=${dealLimit}`;
    }
  } else if (dealCategory !== '') {
    url = `https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&radius=5&filters=category:${dealCategory}&limit=${dealLimit}`;
  } else {
    url = `https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&radius=5&limit=${dealLimit}`;
  }
}

function userInputEntered() {
  userPos = '';
  dealCategory = $('#deal-category').val();
  // This will be the variable used to pass on to the api url f
  const userLocation = $('#user-location').val();
  if (userLocation !== '') {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: userLocation }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        userPos = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        buildUrl();
        $.ajax({
          url,
          // dataType set to "jsonp" is required for some reason
          dataType: 'jsonp',
        }).done((response) => {
          console.log(response);
          k = 0;
          dealReturn = [];
          addDeals(response);
          setMapOnAll();
        });
      } else {
        alert(`Something got wrong ${status}`);
      }
    });
  } else {
    buildUrl();
    $.ajax({
      url,
      // dataType set to "jsonp" is required for some reason
      dataType: 'jsonp',
    }).done((response) => {
      k = 0;
      dealReturn = [];
      // Creating the array with the info to be passed to the google api
      // Currently the array pulls info on just the first deal
      addDeals(response);
      setMapOnAll();
    });
  }
}
