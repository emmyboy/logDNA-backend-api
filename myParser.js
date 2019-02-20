

module.exports = function(strInput) {
    var jsout = {},
        results;

    var terms = strInput.split('"');

    if (terms.length == 3) {
       if ((terms[0] === '') && (terms[2] === '')) {
           jsout['$quoted'] = terms[1];
           return jsout;
       } else {
           var newTerms = strInput.split(' '),
               les;
           for (var i=0;i<terms.length;i++) {
               var ior = terms[i].indexOf(' OR ');
               if (ior < 0) {
                   les = les + terms[i];
               } else {
                   lesArr.push(les);
                   lesArr.push(terms[i].replace(' OR ',''));
                   jsout['$or'] = process(lesArr);
                   break;
               }         
           }
           return jsout;
       } 
    }
    
    else if (terms.length == 1) {
       var term = terms[0].split(' ');
       if (term.length == 1) {
          var out = evalStr(term[0]);
          if ((typeof out) === "string") {
              jsout['$quoted'] = out;
              return jsout;
          } else return out;
       }
       if (term.length > 1) {
          if (term.indexOf('OR')>=0) {
             var ior = term.indexOf('OR');
             term.splice(ior, 1);
             jsout['$or'] = process(term);
             return jsout;
          } else {
             if (term.indexOf('AND')>=0) {
                var iand = term.indexOf('AND');
                term.splice(iand, 1);
             }
             jsout['$and'] = process(term);
             return jsout;
          }
       }
    }
    else if ((terms.length%2) == 0) {
       return err;
    }
    else {
       return jsout;
    }
};

//Process an array that resulted from the original input string to be parsed
function process(jsArr) {
    for (var i=0;i<jsArr.length;i++) {
        jsArr.splice(i, 1, evalStr(jsArr[i]));
    }
    return jsArr;
}

//Evaluate a string and return appropriate JSON based on operators found within
function evalStr(ajs) {
        var newJson = {};
        if (ajs.startsWith('=')) {
           newJson['$eq'] = evalStr(ajs.substring(1));
        } else if (ajs.startsWith('>')) {
           newJson['$gt'] = evalStr(ajs.substring(1));
        } else if (ajs.startsWith('<')) {
           newJson['$lt'] = evalStr(ajs.substring(1));
        } else if (ajs.startsWith('!')) {
           newJson['$not'] = evalStr(ajs.substring(1));
        } else if (ajs.startsWith('len(')) {
           newJson['$len'] = parseInt(ajs.slice(4,-1));
        } else if (ajs === 'false') {
           return false;
        } else if (ajs === 'true') {
           return true;
        } else {
           return ajs;
        }
        return newJson;
}
