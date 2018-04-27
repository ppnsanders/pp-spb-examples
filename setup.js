const prompt = require('prompt')
const exec = require('child-process-promise').exec

prompt.start()

prompt.get(['client_id', 'client_secret', 'email', 'payerId', 'brandName', 'environment', 'username', 'password', 'signature'], (err, result) => {
	let sandbox = '{ \"client_id\": \"' + result.client_id + '\", \"client_secret\": \"' + result.client_secret + '\", \"email\": \"' + result.email + '\", \"payerId\": \"' + result.payerId + '\", \"brandName\": \"' + result.brandName + '\", \"environment\": \"' + result.environment + '\", \"username\": \"' + result.username + '\", \"password\": \"' + result.password + '\", \"signature\": \"' + result.signature + '\" }'
	exec('mkdir paypal')
	exec("echo '" + sandbox + "' > paypal/config.json;")
		.then((result) => {
			console.log('the directory "paypal" was created')
			console.log('the file "config.json" was created')
			console.log('/paypal/config.json contains the following: ')
			console.log(sandbox)
		})
		.catch((err) => {
			console.log('-- An ERROR occured while creating paypal/config.json --')
			console.log(err)
		})
})