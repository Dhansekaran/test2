const path = require('path');
const databaseConfig = require(path.join(__dirname, 'config/database_config.json'));
const MongoClient = require('mongodb').MongoClient;
/*module.exports = async function getDatabaseConnection(MongoClient) {
	return connection = await MongoClient.connect("mongodb://"+databaseConfig.user+':'+databaseConfig.password+'@'+databaseConfig.host+'/'+databaseConfig.databaseName, function(err, db) {
		if (err) {
			console.log(err);
		}else{
			console.log(db.db(databaseConfig.databaseName));
			return db;
	  	}
	});
}*/
module.exports =  function getDatabaseConnection() {
	return new Promise(function(resolve, reject) {
		MongoClient.connect("mongodb://"+databaseConfig.user+':'+databaseConfig.password+'@'+databaseConfig.host+'/'+databaseConfig.databaseName, { useUnifiedTopology: true }, function(err, client) {
		if (err) {
			console.log(err);
		}else{
			MongoClient.db = client.db(databaseConfig.databaseName);
			resolve(MongoClient);
	  	}
	});
	});
}