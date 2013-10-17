// 	                                       
//  geowatch.js - QnD web server for a very simple geopos API
//

var geoinfo = require ('./geoinfo');
var http    = require ('http');
var url     = require ('url');

console.log ("Starting geowatch");

// this one is global
gi = new geoinfo ();

// stuff some values into it
gi.updOrgUser ("haulage","truck1",49.1,59.1,1111111);
gi.updOrgUser ("firebrigade","firefighter1",53.0,-10.0,1111111);
gi.updOrgUser ("firebrigade","firefighter2",54.0,-11.0,2222222);
gi.updOrgUser ("triathlon","athlete1",52.1,9.1,1111111); 
gi.updOrgUser ("triathlon","athlete2",52.2,9.2,2222222); 
gi.updOrgUser ("triathlon","athlete3",52.3,9.3,3333333); 

gi.updOrg ("userless");		// just add an organization without any users


var LISTEN_PORT = 8888;

http.createServer(function(request, response) {

  if ("GET" == request.method) {
	var parts = url.parse(request.url).pathname.split ('/');
	if (3 == parts.length) {
		if ("groups" == parts[1]) {
		  response.writeHead(501, { 'Content-Type': 'application/json' });
		  response.end(gi.getOrgUsersJSON (parts[2]));
		}
		else {
		  response.writeHead(501, { 'Content-Type': 'application/json' });
		  response.end(JSON.stringify({ error: 'unknown reosurce '+parts[1] }));
		}
	}
	else {
		response.writeHead(501, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify({ error: 'invalid API call' }));
	}
  }
  else if ("PUT" == request.method) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("Method PUT");
  }
  else { 
	response.writeHead(501, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'method '+request.method+' not implemented' }));
  }
}).listen(LISTEN_PORT);

console.log('Server running on port: '+LISTEN_PORT);
