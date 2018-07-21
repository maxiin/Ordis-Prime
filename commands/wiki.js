var http = require('http');

module.exports = {

    callWiki: function(data, callback){

        var url = 'http://warframe.wikia.com/api.php?action=opensearch&search=';
        var finalStr = "";

        var startingPoint;

		//if after the command has an '@' that means that its on a group so the name will only start after /wiki@ordis-prime-bot
		if(data.substring(5).startsWith('@')){
			startingPoint = 21;
		//else it will start after /iscomponent
		}else{
			startingPoint = 5;
		}

        let search = data.substring(startingPoint, data.length);

        console.log(search + "aaaaaaaaaa" + data.substring(5));

        let wordsArray = search.split(" ");

        if(wordsArray)

        wordsArray.forEach(element => {
            url += capitalizeFirstLetter(element) + " ";
        });

        url += "&amp";

        console.log(url);

        download(url,(response) => {
            if(response[1].length > 0){
                finalStr += "Wiki results:\n";
                response[1].forEach(element => {
                    var newElement = element.replace(/[{)}]/g, "%29");// parentesis bug
                    finalStr += `[${element}](http://warframe.wikia.com/${newElement})\n`;
                });
            }else{
                finalStr = `No results found, ${tenno()}`;
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
                try {
                    var a = JSON.parse(body);
                    func(a);
                } catch(e) {
                    console.log(e + body);
                }
            });

        //log an error
		}).on('error', function(e){
      		console.log("Got an error: ", e);
		});
}

function capitalizeFirstLetter(string) {
    if(string.includes("and")){return string};
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function tenno(){
	return Math.random() >= 0.5?  "Operator":"Star-Child";
}