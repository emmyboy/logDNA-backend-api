const express = require('express');
const bodyParser = require('body-parser');

var myparser = require('./myParser');

var app = express();

//Using the Router middleware to handle api request paths
var router = express.Router();
router.use(bodyParser.json());

router.route('/')
    .get(function(req, res){
	res.send('Please use /api endpoint for this service');
    });

router.route('/api/:_resource')
    //.get(getResource)
    .get(function (req, res, err){
	 if(err) {
            res.status(404);
         }
	 res.status(200).json(myparser(req.params["_resource"]));
    })

app.use('/', router).listen(3000, function() {
     console.log('API now serving on Port 3000...')
});
