const mysql 		= require('mysql');
const util 			= require('util');
const fs			= require('fs');
const path			= require('path');
const config 		= JSON.parse(fs.readFileSync('./config.json'));
let mysqllib 		= {};

mysqllib.check = async () => {
	// Create a MySQL connection
	const connection = mysql.createConnection({
		host: config.dbhost,
		user: config.dbuser,
		password: config.dbpassword,
	});

	const asyncQuery = util.promisify(connection.query).bind(connection);

	try {
		console.log('==================> CHECKING DATABASE')
		await util.promisify(connection.connect).bind(connection)();

		const queryResult = await asyncQuery('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', [config.dbname]);

		if (queryResult.error) {
			throw queryResult.error;
		}

		if (queryResult.length === 0) {
			var runScript = await executeSetupScript();
			if(runScript == 'ERROR'){
				throw runScript;
			}
			await mysqllib.check(); // Recursively call check after executing setup script
			return;
		}
		return "CONNECTED";
	} catch (error) {
		console.error(error);
		return "DISCONNECTED";
	} finally {
		if (connection) {
			connection.end();
		} // Close the connection
	}
};

mysqllib.runQuery = async (req, res, next, pQuery, pQueryParams)=>{
	// Create a MySQL connection
	const connection = mysql.createConnection({
		host: config.dbhost,
		user: config.dbuser,
		password: config.dbpassword,
		database: config.dbname,
	});

	const asyncQuery = util.promisify(connection.query).bind(connection);
	
	try {
		await util.promisify(connection.connect).bind(connection)();

		var queryResult =  await asyncQuery(pQuery,pQueryParams);

		if(queryResult.error) throw queryResult.error;

		return queryResult;
	} catch (error) {
		console.log(error);
		return {error};
	} finally{
		if (connection) {
			connection.end();
		}
	}

};

async function executeSetupScript() {
	// Read the setup script file
	const connection = mysql.createConnection({
		host: config.dbhost,
		user: config.dbuser,
		password: config.dbpassword,
		multipleStatements: true
	});
	try {
		console.log('==================> CREATING DATABASE')

		const asyncQuery = util.promisify(connection.query).bind(connection);

		const scriptContents = fs.readFileSync(path.join(__dirname,'setup.sql'),  { encoding: 'utf8' });
		console.log(scriptContents);
		let queryRes = await asyncQuery(scriptContents);

		if(queryRes.error) throw queryRes.error;
		return 'CREATED';
	} catch (error) {
		console.error(error);
		return 'ERROR'
	}finally{
		if (connection) {
			connection.end();
		}
	}
}

module.exports = mysqllib;