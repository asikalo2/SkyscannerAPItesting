export default {
    "Retrieve API (GET)": function (client) {
        var apiUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Stockholm';
        client.apiGet(apiUrl, function (response) {
        console.log(response.body);
        var data = JSON.parse(response.body);
        console.log(data.status);
  
        client.assert.equal(response.statusCode, 200, "200 OK");
  
        client.end();
      });
  
    }
  
  };