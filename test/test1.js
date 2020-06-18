//Contains the test-cases 

const mocha = require('mocha');
const should = require('should');
const supertest = require('supertest');
const apiEndPointHelper = require('../api/api.js');
const apiUtils = require('../api/utils.js');

let baseUrl = apiEndPointHelper.baseUrl;
let apiEndPoint = apiEndPointHelper.superheroApiEndPoint;

describe('Skyscanner API test', function () {
    describe('GET Request', function () {
        it('Should Get 200 OK', async function () {
	    let queryString = "UK/GBP/en-GB/" + "?query=Stockholm"
            let res = await apiUtils.sendGETRequest(baseUrl, apiEndPoint + queryString);
            //console.log(res.body);
            res.status.should.equal(200);
        });
    });
    
});
