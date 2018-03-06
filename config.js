var path = require("path")
var fs = require('fs')

module.exports = function(){

	var configJSON = fs.readFileSync("./config.json");

	config = JSON.parse(configJSON.toString());

	return config;

}