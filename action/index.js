const clova = require('@line/clova-cek-sdk-nodejs');
const xmlToHandler = require('../app/xmlToHandler');

const launchAction = async responseHelper => {
  responseHelper.setSimpleSpeech(
    clova.SpeechBuilder.createSpeechText('ノックノック')
  );
  responseHelper.setSessionAttributes({})
};

const intentAction = async responseHelper => {
  let xml = await s3Manager.load(XML_FILE_NAME);
  let handlerList = xmlToHandler.parse(xml);
  const intent = responseHelper.getIntentName();
  const sessionId = responseHelper.getSessionId();
  const session = responseHelper.getSessionAttributes();
  var state;
  if(session['state'] === undefined){
	  state = 0;
  }
  else {
	  state = session['state'];
  }
  
  if(handlerList[state].intent==intent){
      responseHelper.setSimpleSpeech(
          clova.SpeechBuilder.createSpeechText(handlerList[state].say)
	  );
	  responseHelper.setSessionAttributes({
		  'state': state + 1
       });  
  }
  else {
	  responseHelper.setSimpleSpeech(
          clova.SpeechBuilder.createSpeechText('なんなん')
      );
  }
};

const sessionEndedAction = async responseHelper => {
};

module.exports = {
  launchAction: launchAction,
  intentAction: intentAction,
  sessionEndedAction: sessionEndedAction
}
