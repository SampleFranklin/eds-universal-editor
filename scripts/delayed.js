// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
// var chatbotScript = `<script src="//unity-plugin.iamdave.ai/conversation-plugin/build/2.0/dave-libs.js" id="dave-settings" data-environment="staging" data-asserts="//unity-plugin.iamdave.ai/conversation-plugin" data-loadfunction='onload' data-component="babylon-avatar-conversation,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.js,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.css"></script>`

// const chatbotDiv = document.createElement('div');
// chatbotDiv.innerHTML = chatbotScript;

var chatScript = document.createElement('script');
chatScript.src = "//unity-plugin.iamdave.ai/conversation-plugin/build/2.0/dave-libs.js";
chatScript.id = "dave-settings";
chatScript.setAttribute("data-environment","staging");
chatScript.setAttribute("data-loadfunction","onload");
chatScript.setAttribute("data-component","babylon-avatar-conversation,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.js,//d3nxn5bl526zn7.cloudfront.net/maruti_brands/new_swift/3.0/web.css")
chatScript.setAttribute("data-asserts","//unity-plugin.iamdave.ai/conversation-plugin");
chatScript.type = "text/javascript";

document.getElementsByTagName('body')[0].appendChild(chatScript);

