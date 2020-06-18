const supertest = require('supertest');

var headers = {
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "46c46664d0msh7b10032871f857cp198ff8jsn05907c297b0f",
		"useQueryString": true
};

exports.sendGETRequest = async (baseUrl, apiEndPoint) => {
    try {
        let res = await supertest(baseUrl).get(apiEndPoint).retry(2)
	    .set(headers)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        return res;
    } catch (err) {
        console.log('Error in sending GET Request: ', err);
    }
};
