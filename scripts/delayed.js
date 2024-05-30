// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
var chatbotScript = `<script src="https://unity-plugin.iamdave.ai/conversation-plugin/build/2.0/dave-libs.js" id="dave-settings" data-environment="staging" data-asserts="//unity-plugin.iamdave.ai/conversation-plugin" data-loadfunction='onload' data-component="babylon-avatar-conversation,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.js,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.css"></script>`

const chatbotDiv = document.createElement('div');
chatbotDiv.innerHTML = chatbotScript;
chatbotDiv.firstChild.type = "text/javascript";
chatbotDiv.firstChild.onload = function(){
    console.log("Chatbot loaded");
}
document.getElementsByTagName('body')[0].appendChild(chatbotDiv.firstChild);

