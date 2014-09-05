var express = require('express');
var router = express.Router();
var connection = require('../model/model.js');
var opportunity = require('../model/opportunity'); 
var moment = require('moment');
var datatable = require ('../model/datatable');
var currentdatetime =  moment().format("YYYY-MM-DD h:mm:ss");
var csv = require('express-csv')


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'HOME' , classname : "submitopportunity" });
});

/* GET home page. */
router.get('/submit-opportunity', function(req, res) {
  res.render('submitopportunity', { title: 'Submit Opportunity', classname : "submit-opportunity" });
});

/* GET home page. */
router.get('/explore-opportunity', function(req, res) {
  res.render('exploreopportunity', { title: 'Explore Opportunities',classname : "explore-opportunity" });
});

/* Post Data*/
router.post('/postform', function(req, res) {
	var data = {
		created_date : currentdatetime
	};

	for(var k in req.body){

		data[k] = (typeof(req.body[k]) == "object")?JSON.stringify(req.body[k]):req.body[k];
	}
   
	opportunity.save(data, function(err, data){
   
		if(!err){
			res.json({
				success : true,
				msg : err,
				data : data
			});
		}else{
			res.json({
				success : false,
				msg : err,
				data : null
			});
		}
	})
  	
});

/* Datatable*/
router.get('/datatables', function(request, res){
  	datatable.server(res, request.query);
})

/* Post Data*/
router.get('/export', function(request, res){ 
    var csvdata = []; 
    opportunity.getFields(function(err, columns){
        if(!err){
          csvdata.push(columns);
          opportunity.getAll(function(err, results){
            if(!err){  
              for(var i in results){
                csvdata.push(results[i]);
              } 
              res.csv(csvdata);
            }else{
              console.log(err);
            }
          })
        }
        
    })
    
});
router.get('/import', function  (req, res) {
  res.render('import', { title: 'Submit Opportunity', classname : "importfile" });

  /*var input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"';
  parse(input, {comment: '#'}, function(err, output){
    output.should.eql([ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]);
  });*/
})
/* VIEW Model*/
router.get('/view/id/:id', function  (req, res) {
  //console.log(req.param);

    opportunity.getById(req.params.id, function(err, results){
      //console.log(results[0]);
      if(!err){         
        res.render('modal', { data: results[0]});
      }else{
        //console.log(err);
        res.end();
      }
    })
})
module.exports = router;
