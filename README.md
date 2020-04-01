# Need to get country, state , city and area on entering pincode value in js

## How to use
npm i extract-country-state-city-from-zip

```
var getAdderss = require('extract-country-state-city-from-zip');

getAdderss(248001, 'AIzaSyDqZ5w4dZlSKCEnARbMsSQH353P8KAHi54',
(err, res) => console.log(err, res))
```

## Result

```
{
  results: [
    {
      address_components: [Array],
      formatted_address: 'Uttarakhand 248001, India',
      geometry: [Object],
      place_id: 'ChIJAVAhzUYoCTkRmAQ1wWM_p1o',
      types: [Array]
    }
  ],
  status: 'OK'
}
null {
  city: { long: 'Dehradun', short: 'Dehradun' },
  state: { long: 'Uttarakhand', short: 'UK' },
  country: { long: 'India', short: 'IN' },
  formatted_address: 'Uttarakhand 248001, India',
  location: { lat: 30.3345816, lng: 78.0537813 }
}

```
