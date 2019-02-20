var assert = require('assert'),
    request = require('request');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Math', function() {
    it('should return 9 when 3*3 is calculated', function(){
	assert.equal(9, 3*3);
    });
    it('should return -8 when (3-4)*8 is calculated', function(){
	assert.equal(-8, (3-4)*8);
    });
});

describe('RoutePaths', function() {
  describe('Index path', function() {
    describe('GET /', function() {
      it('should return text response', function() {
         request('/', function(err, response, body) {
               //assert.equal(200, res.statusCode);
	       assert.equal('Please use', body);
         });
      });
    });
  });
});
