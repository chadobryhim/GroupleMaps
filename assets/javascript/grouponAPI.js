$(document).on('click', '#user-input-button', function() {

    var location = $('#user-location').val();
    console.log(location);

    var testLocation = {
        "location": {
            "lat": 38.8099811,
            "lng": -94.7260154
        },
        "accuracy": 1200.4
    };

    console.log(testLocation.location.lat);

    var dealCategory = $('#deal-category').val();
    console.log(dealCategory);

    var url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&lat=' + testLocation.location.lat + '&long=' + testLocation.location.lng;

    $.ajax({
        url: url,
        dataType: "jsonp"
    }).done(function(response) {
        console.log(response);
    });

    // var xhr = $.get('https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&lat=' + testLocation.location.lat + '&long=' + testLocation.location.lng);
    //
    // xhr.done(function(result) {
    //     console.log(result);
    // });
});