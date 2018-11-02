var parser = require('xml2json');


function parse (xml) {
	var json = parser.toJson(xml);
	let handlerjson = JSON.parse(json).xml.block.value;  
	return toHandleList(handlerjson);
}

function toHandleList(handlerlistjson) {
	var i;
	var handlerList = [];
	for (i=0; i<handlerlistjson.length ;i++){
		let handler = toHandler(handlerlistjson[i]);
		handlerList[i] = handler;
	}
	return handlerList;
	
}
function toHandler (handlerJson) {
	var intent = handlerJson.block.value[0].block.field.$t;
	var say = handlerJson.block.value[1].block.field.$t;
	return {intent: intent , say: say};	
}