var express = require('express');
var app = express();
app.use(express.static('./dist/'));

var Datastore = require('@google-cloud/datastore');
const projectId = 'coolautocomplete';

// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});

app.get('/', function (req, res) {
  res.render('index.html', {root:'dist'});
})

app.get('/search',function(req,res){
	console.log(req.query.q);
	var query = datastore.createQuery('autocomplete_app_db', 'products');
	query.filter('name', '>=', req.query.q); 
	query.filter('name', '<', req.query.q + '\ufffd');//substring query google datastore
	query.limit(5);
	query.run(function(err, entities, info) {
	  // entities = An array of records.
	  //console.log(entities);
	  res.send(entities);
	  // Access the Key object for an entity.
	  //var firstEntityKey = entities[0][datastore.KEY];
	});
	
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});