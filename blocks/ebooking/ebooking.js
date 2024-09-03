export default function decorate(block) {
  // load the Script
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // load the Stylesheet
  function loadStylesheet(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.href = url;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // function to fetch refreshed access token
//  async function fetchData() {
//    const endpoint = 'https://api.preprod.developersatmarutisuzuki.in/auth/consumers/gettoken';
//    const body = {
//      clientId: '2cq5is6643ojh60sej6na0030g',
//      clientSecret: '89hrprllq8ivjp1tj983vclkncr4proudr7uvb3uiv1q88nspbm',
//    };
//    try {
//      const response = await fetch(
//        endpoint,
//        {
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json',
//          },
//          body: JSON.stringify(body),
//        },
//      );
//      if (!response.ok) {
//        throw new Error('Network response was not ok');
//      }
//      // Store the access token to localstorage
//      const data = await response.json();
//      localStorage.setItem('apimToken', data);
//    } catch (error) {
//      throw new Error('Error Fetching data');
//    }
//  }

//  const refreshTokenInterval = 60 * 60 * 1000; // 1 hour
//  fetchData();
//  setInterval(fetchData, refreshTokenInterval);

  loadScript('https://d1lzjb5dkpjvo6.cloudfront.net/martech-ebook.js');
  loadStylesheet('https://d1lzjb5dkpjvo6.cloudfront.net/styles.css');
  // Create the div element
  let div = document.createElement("div");

  let martechEbook = document.createElement("martech-ebook");

  martechEbook.setAttribute("channel", "NRM");

  div.appendChild(martechEbook);


 console.log("Ebook Component Loaded");

  block.innerHTML = '';
  block.appendChild(div);
}