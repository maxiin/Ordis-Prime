var url = 'http://warframe.wikia.com/api.php?action=opensearch&search=';
var http = require('https');
var finalStr;

module.exports = {

    callWiki: function(data, callback){

        let search = data.substring(5, data.length);

        let wordsArray = search.slice(" ");

        wordsArray.forEach(element => {
            url += capitalizeFirstLetter(element);
        });

        download(url,(response) => {
            if(response[1].length > 0){
                response[1].forEach(element => {
                    finalStr += `[${element}](http://warframe.wikia.com/${element})`;
                });
            }else{
                finalStr = `No resuls found`;
            }
            callback(finalStr);
        });

    }

}

function download(captalizedUrl,func){
    //http connection
		http.get(captalizedUrl, function(res){
    		var body = '';

            //receiving data
            res.on('data', function(chunk){
                body += chunk;
            });

            //after the end of the stream
            res.on('end', function(){
                //calls function in the argument
                func(JSON.parse(body));
            });

        //log an error
		}).on('error', function(e){
      		console.log("Got an error: ", e);
		});
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}