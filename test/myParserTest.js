var assert = require('assert'),
    myParser = require('../myParser');

describe('myParser', function() {
  var quotedJs = { '$quoted' : 'testdata' },
      quoted2Js = { '$quoted' : 'TEST DATA' },
      orJs = { '$or': [ 'error', 'info' ] },
      andJs = { '$and' : [ 'test', 'error', 'data', 'info' ] },
      and2Js = { '$and' : [{'$gt':'400'},{'$lt':'500'}]},
      notJs = { '$not' : false },
      not2Js = { '$not' : 'int' },
      lenJs = { '$len' : 28 },
      nestedJs = { '$and': [ { '$eq': 'testdata' }, { '$lt': { '$len' : 325 } } ] },
      nested2Js = { '$or': [ { '$eq': { '$quoted' : 'Test Data' } }, { '$gt': { '$len' : 9 } } ] };

  describe('parser API', function() {
     it('should return quoted json when the input string only has one term', function(){
        assert.deepEqual(myParser('testdata'), quotedJs);
     });
     it('should return quoted json when the input string is quoted', function(){
        assert.deepEqual(myParser('"TEST DATA"'), quoted2Js);
     });
     it('should return ANDd json when the input string contains multiple terms', function(){
        assert.deepEqual(myParser('test error data info'), andJs);
     });
     it('should return ORd json for input string \"error OR info\"', function(){
        assert.deepEqual(myParser('error OR info'), orJs);
     });
     it('should return NOT json when the input string is negated, such as \"!int\"', function(){
        assert.deepEqual(myParser('!int'), not2Js);
     });
     it('should return NOT json when a boolean is negated, such as \"!false\"', function(){
        assert.deepEqual(myParser('!false'), notJs);
     });
     it('should return nested ANDed json when the input string is \">400 <500\"', function(){
        assert.deepEqual(myParser('>400 <500'), and2Js);
     });
     it('should return len json when the input string specifies the length to be matched', function(){
        assert.deepEqual(myParser('len(28)'), lenJs);
     });
     it('should return nested json when the input string is \"=testdata AND <len(325)\"', function(){
        assert.deepEqual(myParser('=testdata AND <len(325)'), nestedJs);
     });
     it('should return nested json when the input string is \"="Test Data" OR >len(9)\"', function(){
        assert.deepEqual(myParser('="Test Data" OR >len(9)'), nested2Js);
     });
  });
});

