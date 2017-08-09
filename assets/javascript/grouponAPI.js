$(document).on('click', '#user-input-button', function() {

    var location = $('#user-location').val();
    console.log(location);

    var dealCategory = $('#deal-category').val();
    console.log(dealCategory);

    var searchAttributeThree = $('searchAttributeThreeIDorClassHere').val();
    var searchAttributeFour = $('searchAttributeFourIDorClassHere').val();
    var searchAttributeFive = $('searchAttributeFiveIDorClassHere').val();
    var searchAttributeSix = $('searchAttributeSixIDorClassHere').val();

    var xhr = $.get('https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_201236_212556_0&filters=category:' + dealCategory);

    xhr.done(function(result) {
        console.log(result);
    });
});