"use strict";

const assert = require("assert");
const GeoIP = require("..");


const API_KEY = process.env.API_KEY;


describe("GeoIP", () => {
  describe("#verifyOptions()", () => {
    it("should throw an error if no API key is supplied", () => {
      assert.throws(() => { new GeoIP(); }, "API key required");
    });

    it("should throw an error if a bad API key is supplied", () => {
      assert.throws(() => { new GeoIP(123); }, "API key must be a string");
    });

    it("should throw an error if bad opts.retries is supplied", () => {
      assert.throws(() => { new GeoIP("api key", { retries: "retries" }); }, "opts.retries must be a number");
    });
  });

  describe("#verify()", () => {
    it("should return an error if API key is invalid", (done) => {
      let geoIP = new GeoIP("as;ljfdsagsag");

      geoIP.lookup("8.8.8.8", (err, resp) => {
        assert(typeof err.message === "string");
        done();
      });
    });

    it("should return a response", (done) => {
      let geoIP = new GeoIP(API_KEY);

      geoIP.lookup("8.8.8.8", (err, resp) => {
        assert.ifError(err);
        assert.equal(resp.ip, "8.8.8.8");
        done();
      });
    });
  });
});

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}
