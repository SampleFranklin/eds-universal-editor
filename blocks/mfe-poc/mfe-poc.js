function loadScript(url){
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.type = "text/javascript";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadStylesheet(url){
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet";
        link.type = "text/css";
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
    });
}

async function fetchData() {
    const endpoint = 'https://api.preprod.developersatmarutisuzuki.in/auth/consumers/gettoken';
    const body = {
        clientId: '2cq5is6643ojh60sej6na0030g',
        clientSecret: '89hrprllq8ivjp1tj983vclkncr4proudr7uvb3uiv1q88nspbm'
    };
    try {
        const response = await fetch(endpoint,
        {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        localStorage.setItem("apimToken",data);
        console.log('Data from API:', data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default function decorate(block) {
    const refreshTokenInterval = 60 * 60 * 1000; // 1 hour
    fetchData();
    setInterval(fetchData, refreshTokenInterval);

    loadScript("https://d16wjdn485ugym.cloudfront.net/dealer-locator/1.0.0/common-dealer-locator.js "),
    loadStylesheet("https://d16wjdn485ugym.cloudfront.net/dealer-locator/1.0.0/common-dealer-locator.css")

    const component = document.createElement('common-dealer-locator');
    const apimToken = localStorage.apimToken;
    component.inpAuthConfig = {
        apimAuthKey: '3Oa87EBtBK9k4QQa87eYDaTB2CcLnbp7aqd00kqH',
        apimToken: apimToken,
        mapMyIndiaToken: "b8287d26a87b590b66877b85e7cf7075",
        mayMyIndiaAuthKey: "b8287d26a87b590b66877b85e7cf7075"
    };

    component.inpAuthConfig = JSON.stringify(component.inpAuthConfig);
    component.inpMapConfig = '{"mapType":"M2","listPosition":"left", "hideRadiusOptions": true, "hideContinuebutton": true, "hideSearchOption": true}';
    component.inpNearestDealersParams = '{"longitude":77.2194,"latitude":28.633,"radius":5000}';
    component.inpSourceConfig = '{"sourceName":"Adobe_Arena"}';
    component.inpIsAuthObjectReady = true;

    const myElement = document.querySelector("common-dealer-locator");
        myElement?.addEventListener("common-dealer-locator", (event) => {
        console.log("abcvdfgdfgdfgdfg")
    });

    block.innerHTML = '';
    block.appendChild(component)
}