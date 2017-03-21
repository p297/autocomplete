
//var row = {"sku":43900,"name":"Duracell - AAA Batteries (4-Pack)","type":"HardGood","price":5.49,"upc":"041333424019","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208002","name":"Alkaline Batteries"}],"shipping":5.49,"description":"Compatible with select electronic devices; AAA size; DURALOCK Power Preserve technology; 4-pack","manufacturer":"Duracell","model":"MN2400B4Z","url":"http://www.bestbuy.com/site/duracell-aaa-batteries-4-pack/43900.p?id=1051384074145&skuId=43900&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg"};
var fs = require('fs');
var productlist = JSON.parse(fs.readFileSync('products.json'));

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'coolautocomplete';

// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});

// The kind for the new entity
const kind = 'products';
// The name/ID for the new entity

var saveProduct = function(payl) {
	// Saves the entity
	datastore.save(payl).then(function() {
		console.log('Saved successfully');
	}, function(err) {
		console.log('Unable to save : ' + err);
	});
};

var payload = [];
for(var i=0; i < productlist.length ; i++){
	console.log('Working with row = ' + i);
	var row = productlist[i];
	var name = row.sku;
	// The Cloud Datastore key for the new entity
	var productKey = datastore.key({
		namespace: 'autocomplete_app_db',
		path:[kind, name]
	});

	// Prepares the new entity
	payload.push({
	  key: productKey,
	  data: row
	  //method: 'insert'
	});

	if (i%500 === 0) {
		saveProduct(payload);
		payload = [];
	}
	
}
//saveProduct(payload);





