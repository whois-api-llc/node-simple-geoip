# node-simple-geoip

[![NPM Version](https://img.shields.io/npm/v/simple-geoip.svg?style=flat)](https://npmjs.org/package/simple-geoip)
[![NPM Downloads](http://img.shields.io/npm/dm/simple-geoip.svg?style=flat)](https://npmjs.org/package/simple-geoip)
[![Build Status](https://img.shields.io/travis/whois-api-llc/node-simple-geoip.svg?style=flat)](https://travis-ci.org/whois-api-llc/node-simple-geoip)

*The simplest possible way to get IP geolocation information in Node.*

![Email Verifier Icon](https://github.com/whois-api-llc/node-simple-geoip/raw/master/images/geoip.png)


## Meta

- Author: Randall Degges
- Email: r@rdegges.com
- Twitter: [@rdegges](https://twitter.com/rdegges)
- Site: https://www.rdegges.com
- Status: production ready


## Prerequisites

To use this library, you'll need to create a free GeoIPify account:
https://geoipify.whoisxmlapi.com/

If you haven't done this yet, please do so now.


## Installation

To install `simple-geoip` using [npm](https://www.npmjs.org/), simply run:

```console
$ npm install simple-geoip
```

In the root of your project directory.


## Usage

Once you have `simple-geoip` installed, you can use it to easily find the
physical location of a given IP address.

This library gives you access to all sorts of geographical location data that
you can use in your application in any number of ways.

```javascript
const GeoIP = require("simple-geoip");

let geoIP = new GeoIP("your-api-key");
geoIP.lookup("8.8.8.8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

Here's the sort of data you might get back when performing a geoip lookup
request:

```json
{
  "ip": "8.8.8.8",
  "location": {
    "country": "US",
    "region": "California",
    "city": "Mountain View",
    "lat": 37.40599,
    "lng": -122.078514,
    "postalCode": "94043",
    "timezone": "-08:00"
  }
}
```

By default, this library handles retrying failed HTTP requests for you. For
instance: if the geoip API service is currently down or having issues,
your request will be retried up to five consecutive times before failing.

This can add more request time, and may not be what you want in all cases.

If you'd prefer to lower the amount of retries that this library will perform on
your behalf, you can pass in a `retries` option like so:

```javascript
const GeoIP = require("simple-geoip");

let geoIP = new GeoIP("your-api-key", { retries: 2 });
```


## Changelog

0.1.1: *05-06-2018*

- Updating dependencies to handle `hoek` vulnerability.

0.1.0: *04-16-2018*

- First release!
