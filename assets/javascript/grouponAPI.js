var dealReturn = [];

$(window).on('load', function() {
    userInputEntered();
});

$(document).on('click', '#user-input-button', function() {
    userInputEntered();
});

function userInputEntered() {
    // This will be the variable used to pass on to the api url f
    var userLocation = $('#user-location').val();
    console.log(userLocation);
    console.log(userLocation !== '');
    // Temporary variable to use as a location until we can get a location returned
    var testLocation = userPos;

    // These are a finite list of terms defined by groupon
    var dealCategory = $('#deal-category').val();

    // How many deals are returned from the api call, currently hardcoded
    var dealLimit = 10;
    var url;

    if (userLocation !== '') {
        if ($('#deal-category').val() !== '') {
            url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&lat=' + testLocation.lat + '&long=' + testLocation.lng + '&limit=' + dealLimit;
        } else {
            url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&lat=' + testLocation.lat + '&long=' + testLocation.lng + '&limit=' + dealLimit;
        };
    } else {
        if ($('#deal-category').val() !== '') {
            url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&limit=' + dealLimit;
        } else {
            url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&limit=' + dealLimit;
        };
    }



    $.ajax({
        url: url,
        // dataType set to "jsonp" is required for some reason
        dataType: "jsonp"
    }).done(function(response) {
        console.log(response);
        var k = 0;
        dealReturn = [];
        //Creating the array with the info to be passed to the google api
        //Currently the array pulls info on just the first deal
        for (var i = response.deals.length - 1; i >= 0; i--) {
            var deal = response.deals[i];
            dealReturn.push({
                pos: {
                    lat: deal.division.lat,
                    lng: deal.division.lng
                },
                content: {
                    adTitle: deal.title,
                    shortTitle: deal.announcementTitle,
                    image: deal.grid4ImageUrl,
                    indDeals: []
                },
                contact: {
                    merchantName: deal.merchant.name,
                    websiteUrl: deal.merchant.websiteUrl,
                    dealUrl: deal.dealUrl,
                    phoneNumber: deal.options[0].redemptionLocations[0].phoneNumber,
                    streetAddress: deal.options[0].redemptionLocations[0].streetAddress1,
                    city: deal.options[0].redemptionLocations[0].city,
                    state: deal.options[0].redemptionLocations[0].state,
                    zipCode:  deal.options[0].redemptionLocations[0].postalCode
                }
            });
            for (var j = 0; j < response.deals[i].options.length; j++) {
                dealReturn[k].content.indDeals.push({
                    content: {
                        description: deal.options[j].details[0],
                        specificTitle: deal.options[j].title
                    },
                    price: {
                        regular: deal.options[j].value.amount,
                        discount: deal.options[j].discount.amount,
                        newPrice: deal.options[j].price.amount
                    }
                });
            }
            k++
        }
        console.log(dealReturn);
    });
}
