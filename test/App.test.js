const expect = require('chai').expect;
let request = require('request')


describe('End point status code', () => {
    
    it('Checking Status Code', function () {
        request('http://localhost:3001/searchTest', function(error, response, body){
            expect(response.statusCode).to.equal(200);
        })
    })
})



