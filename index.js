var fetch = require("node-fetch");

function extractAddress(address) {
    var city = '';
    var state = '';
    var country = '';
    var cityShort = '';
    var stateShort = '';
    var countryShort = '';

    if (address.results.length) {
        var arrComponents = address.results[0].address_components;
        arrComponents.forEach(component => {
            var type = component.types[0];
            if (city == "" && (type == "sublocality_level_1" || type == "locality" || type == "administrative_area_level_2")) {
                city = component.long_name.trim();
                cityShort = component.short_name.trim();
            }

            if (state == "" && type == "administrative_area_level_1") {
                state = component.long_name.trim();
                stateShort = component.short_name.trim();
            }

            if (country == "" && type == "country") {
                country = component.long_name.trim();
                countryShort = component.short_name.trim();

            }

            if (city != "" && state != "" && country != "") {
                //we're done
                return;
            }

        })
    }
    return {
        city: {
            long: city,
            short: cityShort
        },
        state: {
            long: state,
            short: stateShort
        },
        country: {
            long: country,
            short: countryShort
        },
        formatted_address: address.results[0].formatted_address,
        location: address.results[0].geometry.location
    }

}

module.exports = function getAddress(zip, key, callback) {
    if (!zip) {
        throw Error('Zip is required')
    }
    if (!key) {
        throw Error('Key is required')
    }
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&sensor=true&key=${key}`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    callback(null, extractAddress(data));
                });
            }
        )
        .catch(function(err) {
	  callback(err);
        });


}
