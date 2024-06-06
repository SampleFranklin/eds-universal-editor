const  configuratorLoad = (pTagArray) => {
    var script  = document.createElement('script')
    script.src = pTagArray[0].innerText + "one3d/project/" + pTagArray[2].innerText + "/player/one3d_functions.min.js"
    script.type = "text/javascript";
    script.onload = function() {
        ONE3D.init("one3d", pTagArray[0].innerText + "one3d/", pTagArray[2].innerText, pTagArray[3].innerText, {
        showDefaultLoader: true,
        color: pTagArray[1].innerText,
        onProgress: (e) => { console.log(e);}
        }).then((SuccessData) => {
            console.log("Success!!", SuccessData)
        }).catch((error) => {
            console.log(error)
        });
        }
        document.getElementsByTagName("head")[0].appendChild(script);
}

export default function decorate(block) {
    const pTagArray = block.getElementsByTagName('p')
    configuratorLoad(pTagArray)

    const body = document.querySelector('body')
    body.style.overflow = 'auto'

    const div = document.createElement('div');
    div.id = 'one3d';
    div.style.marginTop = "-100px"
    const h1 = document.createElement('h1');
            h1.textContent = '3D Configurator';
            div.appendChild(h1)

            // Create the p element
            const p = document.createElement('p');
            p.textContent = 'View';
            div.appendChild(p)

            // Create the button elements
            const buttons = ['Exterior', 'Interior', 'Back Seat', 'Front Seat'].map(text => {
            const button = document.createElement('button');
            button.textContent = text;
            button.style.fontSize = "15px"
            button.style.top= "100px";
            button.style.position = 'relative'
            button.style.background = 'transparent'
            // Add event handler for click event
            button.addEventListener('click', () => {
               switch(text){
                case "Exterior":
                    ONE3D.exteriorView();
                    break
                    case "Interior":
                    ONE3D.interiorView();
                    break
                    case "Back Seat":
                    ONE3D.backseatView();
                    break
                    case "Front Seat":
                    ONE3D.frontseatView();  
                    break
                default:
                    break
               }
            });
            return button;
            });
            buttons.forEach(button => div.appendChild(button));
            body.appendChild(div);
            block.appendChild(body)
}