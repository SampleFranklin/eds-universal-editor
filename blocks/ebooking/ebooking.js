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


  loadScript('https://d1lzjb5dkpjvo6.cloudfront.net/martech-ebook.js');
  loadStylesheet('https://d1lzjb5dkpjvo6.cloudfront.net/styles.css');

  let div = document.createElement("div");
  let martechEbook = document.createElement("martech-ebook");
  martechEbook.setAttribute("channel", "NRM");

  div.appendChild(martechEbook);

  console.log("Ebook Component Loaded");
  block.innerHTML = '';
  block.appendChild(div);

  const component = document.querySelector("martech-ebook");
  component.inpCarDetail = '{"modelCode": "VZ","variantCode": "VZRCCV1","colorCode": "Z7Q"}';
  component.inpSourceDetail = '{"sourceName":"Hyperlocal-Arena","sourceUrl": "https://scstage-arena-cd.azurewebsites.net/e-booking/microsite" }';

  //Listen To Events
  const myElement = document.querySelector("martech-ebook");
      myElement?.addEventListener("martech-ebook-ga-event", (event) => {
        const eventData = event.detail.data;
        const tableName = event.detail.tableName;
        const type = event.detail.type; // values: event-data, form-data;
        // Call GA track event
      });
}