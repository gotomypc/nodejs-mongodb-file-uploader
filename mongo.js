var mongodb = require('mongodb');

MongoConnector = function(host, port) {
	//this.db = new mongodb.Db('test', new mongodb.Server(host, port, {auto_reconnect: false}, {strict:true}));
	this.db = new mongodb.Db('test', new mongodb.Server(host, port, {auto_reconnect: false}, {strict:false}));
	this.db.open(function(){});
};

MongoConnector.prototype.getCollection = function(callback) {
	this.db.collection('users', function(error, users_collection) {
		if (error) {
			callback(error);
		}
		else {
			callback(null, users_collection);
		}
	});
};

MongoConnector.prototype.findUser = function(email, callback) {
	this.getCollection(function(error, user_collection) {
		if( error ) {
			callback(error);
		}
		else {
			console.log('finding user');
			user_collection.findOne({email: email}, function(error, result) {
				if (error) {
					console.log(error);
					callback(error);
				}
				else {
					console.log('found user');
					console.log(result);
					callback(null, result);
				}
			});
		}
	});
};



var connector = new MongoConnector('localhost', 27017);
var result = connector.findUser('neoice@neoice.net');
console.log(result);

// this call fails because the open() hasn't completed yet.
// I <3 nodejs /s
