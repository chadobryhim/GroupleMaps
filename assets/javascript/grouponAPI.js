$(document).on('click', '#user-input-button', function() {

    var location = $('#user-location').val();
    console.log(location);

    var testLocation = {
        "location": {
            "lat": 51.0,
            "lng": -0.1
        },
        "accuracy": 1200.4
    };

    console.log(testLocation.location.lat);

    var dealCategory = $('#deal-category').val();
    console.log(dealCategory);

    var xhr = $.get('https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_201236_212556_0&filters=category:' + dealCategory + '&lat=' + testLocation.location.lat + '&long=' + testLocation.location.lng);

    xhr.done(function(result) {
        console.log(result);
    });
});