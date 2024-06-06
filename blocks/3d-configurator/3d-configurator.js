export default function decorate(block) {
    console.log("inside configurator");
    console.log(block);
    const pTagArray = block.getElementsByTagName('p')
   
    // document.addEventListener("DOMContentLoaded", function() {
        console.log("Any luck")
            var script  = document.createElement('script')
            script.setAttribute("data-loadfunction","onload");
            script.src = pTagArray[0].innerText + "one3d/project/" + pTagArray[2].innerText + "/player/one3d_functions.min.js"
            console.log("Actual url", script.src)
            script.type = "text/javascript";
            script.onload = function() {
                console.log("Yahan aaya?")
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

        // })
        document.getElementsByTagName("head")[0].appendChild(script);
        console.log("P tags",pTagArray)

        // Create the h1 element
            const h1 = document.createElement('h1');
            h1.textContent = '3D Configurator';

            // Create the p element
            const p = document.createElement('p');
            p.textContent = 'View';

            // Create the button elements
            const buttons = ['Exterior', 'Interior', 'Back Seat', 'Front Seat'].map(text => {
            const button = document.createElement('button');
            button.textContent = text;
            // Add event handler for click event
            button.addEventListener('click', () => {
                alert(`You clicked on ${text}`);
            });
            return button;
            });

            // Append elements to the block
            block.appendChild(h1);
            block.appendChild(p);
            buttons.forEach(button => block.appendChild(button));
}