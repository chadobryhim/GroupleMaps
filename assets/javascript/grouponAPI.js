var dealReturn = [];
// These are a finite list of terms defined by groupon
var dealCategory = $('#deal-category').val();

// How many deals are returned from the api call, currently hardcoded
var dealLimit = 10;
var url;

$(window).on('load', function() {
    userInputEntered();
});

$(document).on('click', '#user-input-button', function() {
    userInputEntered();
    console.log('hello');
});

function userInputEntered() {
    userPos = '';
    // This will be the variable used to pass on to the api url f
    var userLocation = $('#user-location').val();
        if(userLocation !== '') {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': userLocation}, function (results, status) {
                console.log(status);
                console.log(results);
                if (status == google.maps.GeocoderStatus.OK) {
                    userPos = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()

                    };
                    if (userPos !== '') {
                        if ($('#deal-category').val() !== '') {
                            console.log(userPos + 'this works?');
                            url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&lat=' + userPos.lat + '&long=' + userPos.lng + '&limit=' + dealLimit;
                        } else {
                            url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&lat=' + userPos.lat + '&long=' + userPos.lng + '&limit=' + dealLimit;
                        }
                        ;
                    } else {
                        if ($('#deal-category').val() !== '') {
                            url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&limit=' + dealLimit;
                        } else {
                            url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&limit=' + dealLimit;
                        }
                        ;
                    }

                    console.log(url);


                    $.ajax({
                        url: url,
                        // dataType set to "jsonp" is required for some reason
                        dataType: "jsonp"
                    }).done(function (response) {
                        console.log(response);
                        var k = 0;
                        dealReturn = [];
                        //Creating the array with the info to be passed to the google api
                        //Currently the array pulls info on just the first deal
                        for (var i = response.deals.length - 1; i >= 0; i--) {
                            var deal = response.deals[i];
                            if (deal.options[0].redemptionLocations[0] === undefined) {
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
                                    }
                                });
                            } else {
                                dealReturn.push({
                                    pos: {
                                        lat: deal.options[0].redemptionLocations[0].lat,
                                        lng: deal.options[0].redemptionLocations[0].lng
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
                                        zipCode: deal.options[0].redemptionLocations[0].postalCode
                                    }
                                })
                            }
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
                        setMapOnAll(map);
                    });
                } else {
                    alert("Something got wrong " + status);
                }
            });
        } else {
            if (userPos !== '') {
                if ($('#deal-category').val() !== '') {
                    console.log(userPos + 'this works?');
                    url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&radius=5&filters=category:' + dealCategory + '&lat=' + userPos.lat + '&long=' + userPos.lng + '&limit=' + dealLimit;
                } else {
                    url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&radius=5&lat=' + userPos.lat + '&long=' + userPos.lng + '&limit=' + dealLimit;
                }
                ;
            } else {
                if ($('#deal-category').val() !== '') {
                    url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&&radius=5filters=category:' + dealCategory + '&limit=' + dealLimit;
                } else {
                    url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&radius=5&limit=' + dealLimit;
                }
                ;
            }

            console.log(url);


            $.ajax({
                url: url,
                // dataType set to "jsonp" is required for some reason
                dataType: "jsonp"
            }).done(function (response) {
                console.log(response);
                var k = 0;
                dealReturn = [];
                //Creating the array with the info to be passed to the google api
                //Currently the array pulls info on just the first deal
                for (var i = response.deals.length - 1; i >= 0; i--) {
                    var deal = response.deals[i];
                    if (deal.options[0].redemptionLocations[0] === null) {
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
                                zipCode: deal.options[0].redemptionLocations[0].postalCode
                            }
                        });
                    } else {
                        dealReturn.push({
                            pos: {
                                lat: deal.options[0].redemptionLocations[0].lat,
                                lng: deal.options[0].redemptionLocations[0].lng
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
                                zipCode: deal.options[0].redemptionLocations[0].postalCode
                            }
                        })
                    }
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
                setMapOnAll();
            });
        }
    // Temporary variable to use as a location until we can get a location returned



    // if (userPos !== '') {
    //     if ($('#deal-category').val() !== '') {
    //         console.log(userPos + 'this works?');
    //         url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&lat=' + userPos.lat + '&long=' + userPos.lng + '&limit=' + dealLimit;
    //     } else {
    //         url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&lat=' + userPos.lat + '&long=' + userPos.lng + '&limit=' + dealLimit;
    //     };
    // } else {
    //     if ($('#deal-category').val() !== '') {
    //         url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&filters=category:' + dealCategory + '&limit=' + dealLimit;
    //     } else {
    //         url = 'https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_987654_123456_0&limit=' + dealLimit;
    //     };
    // }
    //
    // console.log(url);
    //
    //
    //
    // $.ajax({
    //     url: url,
    //     // dataType set to "jsonp" is required for some reason
    //     dataType: "jsonp"
    // }).done(function(response) {
    //     console.log(response);
    //     var k = 0;
    //     dealReturn = [];
    //     //Creating the array with the info to be passed to the google api
    //     //Currently the array pulls info on just the first deal
    //     for (var i = response.deals.length - 1; i >= 0; i--) {
    //         var deal = response.deals[i];
    //         dealReturn.push({
    //             pos: {
    //                 lat: deal.options[0].redemptionLocations[0].lat,
    //                 lng: deal.options[0].redemptionLocations[0].lng
    //             },
    //             content: {
    //                 adTitle: deal.title,
    //                 shortTitle: deal.announcementTitle,
    //                 image: deal.grid4ImageUrl,
    //                 indDeals: []
    //             },
    //             contact: {
    //                 merchantName: deal.merchant.name,
    //                 websiteUrl: deal.merchant.websiteUrl,
    //                 dealUrl: deal.dealUrl,
    //                 phoneNumber: deal.options[0].redemptionLocations[0].phoneNumber,
    //                 streetAddress: deal.options[0].redemptionLocations[0].streetAddress1,
    //                 city: deal.options[0].redemptionLocations[0].city,
    //                 state: deal.options[0].redemptionLocations[0].state,
    //                 zipCode:  deal.options[0].redemptionLocations[0].postalCode
    //             }
    //         });
    //         for (var j = 0; j < response.deals[i].options.length; j++) {
    //             dealReturn[k].content.indDeals.push({
    //                 content: {
    //                     description: deal.options[j].details[0],
    //                     specificTitle: deal.options[j].title
    //                 },
    //                 price: {
    //                     regular: deal.options[j].value.amount,
    //                     discount: deal.options[j].discount.amount,
    //                     newPrice: deal.options[j].price.amount
    //                 }
    //             });
    //         }
    //         k++
    //     }
    //     console.log(dealReturn);
    // });
}
