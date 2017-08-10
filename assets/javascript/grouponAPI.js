var testLocationReturn = [];

$(document).on('click', '#user-input-button', function() {
    userInputEntered();
});

function userInputEntered() {
    // This will be the variable used to pass on to the api url f
    var location = $('#user-location').val();
    console.log(location);

    // Temporary variable to use as a location until we can get a location returned
    var testLocation = {
        "location": {
            "lat": 38.8099811,
            "lng": -94.7260154
        },
        "accuracy": 1200.4
    };

    // These are a finite list of terms defined by groupon
    var dealCategory = $('#deal-category').val();

    // How many deals are returned from the api call, currently hardcoded
    var dealLimit = 10;

    var url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&lat=' + testLocation.location.lat + '&long=' + testLocation.location.lng + '&limit=' + dealLimit;

    $.ajax({
        url: url,
        // dataType set to "jsonp" is required for some reason
        dataType: "jsonp"
    }).done(function(response) {
        console.log(response);

        //Creating the array with the info to be passed to the google api
        //Currently the array pulls info on just the first deal
        for (var i = response.deals.length - 1; i >= 0; i--) {
            testLocationReturn.push({
                loc: {
                    lat: response.deals[i].division.lat,
                    lng: response.deals[i].division.lng
                },
                content: {
                    description: response.deals[i].options[0].details[0],
                    adTitle: response.deals[i].title,
                    image: response.deals[i].grid4ImageUrl
                },
                price: {
                    regular: response.deals[i].options[0].value.amount,
                    discount: response.deals[i].options[0].discount.amount,
                    newPrice: response.deals[i].options[0].price.amount
                },
                contact: {
                    websiteUrl: response.deals[i].merchant.websiteUrl,
                    dealUrl: response.deals[i].dealUrl
                }
            });
        };
    });
};