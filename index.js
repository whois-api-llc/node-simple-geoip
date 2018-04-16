"use strict";

const backoff = require("backoff");
const request = require("request");
const VERSION = require("./package.json").version;


const RETRIES = 5;
const LOOKUP_URI = "https://geoipify.whoisxmlapi.com/api/v1";


/**
 * Class representing a Verifier object. This object allows you to verify email
 * addresses.
 */
class GeoIP {

  /**
   * Create a GeoIP lookup instance.
   *
   * @param {string} apiKey - The API key for your emailverification.whoisxmlapi.com account.
   * @param {object} opts - An object that contains all Verifier options.
   */
  constructor(apiKey, opts) {
    this.apiKey = apiKey;
    this.opts = opts || {};

    this.verifyOptions();
  }

  /**
   * Verifies the constructor's options to ensure all parameters are valid.
   *
   * @throws {error} Throws an error if any of the Verifier's parameters are
   *    invalid.
   */
  verifyOptions() {
    if (!this.apiKey) {
      throw new Error("API key required");
    } else if (typeof this.apiKey !== "string") {
      throw new Error("API key must be a string");
    } else if (this.opts.retries && typeof this.opts.retries !== "number") {
      throw new Error("opts.retries must be a number");
    }
  }

  /**
   * Looks up geographical information for an IP address using the geoipify.whoisxmlapi.com service.
   *
   * @param {string} ip - The IP address to verify.
   * @param {callback} cb - The callback to run after the lookup has finished.
   */
  lookup(ip, cb) {
    let call = backoff.call(request, {
      uri: LOOKUP_URI,
      headers: { "User-Agent": "node-simple-geoip/" + VERSION },
      qs: {
        apiKey: this.apiKey,
        ipAddress: ip
      }
    }, (err, resp, body) => {
      if (err) {
        return cb(err);
      }

      if (resp.statusCode !== 200) {
        return cb(new Error("There was an error when making the API request. Please try again."));
      }

      if (body === "Access restricted") {
        return cb(new Error("Invalid API key supplied."));
      }

      try {
        let json = JSON.parse(body);

        cb(null, json);
      } catch(err) {
        cb(err);
      }
    });

    call.retryIf(err => { return err });
    call.setStrategy(new backoff.ExponentialStrategy);
    call.failAfter(this.opts.retries || RETRIES);
    call.start();
  }
}

module.exports = GeoIP;
