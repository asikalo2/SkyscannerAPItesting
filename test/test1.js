//Contains the test-cases 

const mocha = require('mocha');
const should = require('should');
const supertest = require('supertest');
const apiEndPointHelper = require('../api/api.js');
const apiUtils = require('../api/utils.js');
const schema = require('../api/schema.js');

var validate = require('commonjs-utils/lib/json-schema').validate;

let baseUrl = apiEndPointHelper.baseUrl;
let apiEndPoint = apiEndPointHelper.getListApiEndPoint;
let apiEndPointQuotes = apiEndPointHelper.getQuotesApiEndPoint;
let jsonSchema = schema.jsonSchema;

describe('Skyscanner API test', function () {
    describe('Check if API is reachable', function () {
        it('Should get 200 OK', async function () {
	    let queryString = "UK/GBP/en-GB/" + "?query=Stockholm"
            let res = await apiUtils.sendGETRequest(baseUrl, apiEndPoint + queryString);
            //console.log(res.body);
            res.status.should.equal(200);
        });
    });
    
    describe('Check if api returns array of 5', function () {
        it('Should get 5', async function () {
            let queryString = "UK/GBP/en-GB/" + "?query=Stockholm"
            let res = await apiUtils.sendGETRequest(baseUrl, apiEndPoint + queryString);
            let places = res.body.Places;
	    //console.log(places.length);
            places.length.should.equal(5);
        });
    });
    
    describe('Check if api returns proper objects', function () {
        it('Should get all required attributes', async function () {
            let queryString = "UK/GBP/en-GB/" + "?query=Stockholm"
            let res = await apiUtils.sendGETRequest(baseUrl, apiEndPoint + queryString);
            let place = res.body.Places[0];
            //console.log(place);
            place.PlaceId.should.equal("STOC-sky");
            place.PlaceName.should.equal("Stockholm");
            place.CountryId.should.equal("SE-sky");
	    place.RegionId.should.equal("");
	    place.CityId.should.equal("STOC-sky");
	    place.CountryName.should.equal("Sweden");
        });
    });

    describe('Check if API result is by schema', function () {
        it('Should be validated', async function () {
            let queryString = "UK/GBP/en-GB/" + "?query=Stockholm"
            let res = await apiUtils.sendGETRequest(baseUrl, apiEndPoint + queryString);
	    let validation = validate(res.body, jsonSchema);
            //console.log(validation.valid);
            validation.valid.should.equal(true);
        });
    });

    describe('Chaining API calls', function () {
        it('Should get routes', async function () {
            let queryString1 = "UK/GBP/en-GB/" + "?query=Stockholm"
            let res1 = await apiUtils.sendGETRequest(baseUrl, apiEndPoint + queryString1);
            let placesStockholm = res1.body.Places[0].PlaceId;
            //console.log(placesStockholm);
	    let queryString2 = "UK/GBP/en-GB/" + "?query=London"
            let res2 = await apiUtils.sendGETRequest(baseUrl, apiEndPoint + queryString2);
	    let placesLondon = res2.body.Places[0].PlaceId;
	    //console.log(placesLondon);

	    let queryString3 = "UK/GBP/en-GB/" + placesStockholm + "/" + placesLondon + "/" + "2020-09-01" + 
						"?inboundpartialdate=2020-12-01"
            let res3 = await apiUtils.sendGETRequest(baseUrl, apiEndPointQuotes + queryString3);
	    //console.log(res3.body.Places);
	    //res3.body.Quotes.length.should.greaterThan(0);
	    let ids = [];
            res3.body.Places.forEach(function(obj) { ids.push(obj.CityId) });
	    //res3.body.Places.should.deepContain("Stockholm");
	    ids.should.containEql("STOC");

        });
    });
    
});
