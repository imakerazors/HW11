var http = require('http');
var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  
  if (request.url != "/"){
        response.end();
        return;
  }
  
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://mongo:27017/test';
  
  MongoClient.connect(url, function(err, db) {
	response.write('<html>');
	response.write('<body>');
	response.write('<h1>Hello World! HW11 - Colin Dickerson</h1>');
	
	if (err != null){
		response.write('<p>');
		response.write(err.toString());
		response.write('</p>');
		response.end();
	}
	else{
        var document = {action:"Hit", title:"New Hit Recorded"};
        var collection = db.collection("hitcounter_collection_no_safe");
		
		collection.insert(document, {w: 1}, function(ierr, records){
            collection.count({}, function (error, count) {
                response.write('<p>Connected to Mongo Database! Current Hit Count:<b>');
                response.write(count.toString());
                response.write('</b></p></body></html>');
                response.end();
                db.close();
            });
		});
	}
   });
};

var www = http.createServer(handleRequest);
www.listen(8080);