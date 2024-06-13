// export default function decorate(block) {
//     var link =  block.querySelector(':scope > div > div > p > a');
//     var imgTag =  block.querySelector(':scope > div > div > picture');
//     var pTag = document.createElement('p');
//     var anchorTag = document.createElement('a');
    
//     anchorTag.href = link;
//     anchorTag.target='_self';
//     anchorTag.appendChild(imgTag);

//     pTag.appendChild(anchorTag);
//     pTag.className='logo';

//     var navBlockDiv = block.parentNode;
//     navBlockDiv.replaceWith(pTag);
// }
export default function decorate(block) {
    var link =  block.querySelector(':scope > div > div > p > a');
    var altText =  block.querySelector(':scope > div > div > p');
    var imgTag =  block.querySelector(':scope > div > div > picture');
    var image =  block.querySelector(':scope > div > div > picture > img');
    var pTag = document.createElement('p');
    var anchorTag = document.createElement('a');

    image.setAttribute("alt",altText.innerHTML);

    anchorTag.href = link;
    anchorTag.appendChild(imgTag);
    anchorTag.classList.add('logo');

    pTag.appendChild(anchorTag);
    block.innerHTML = "";
    block.append(pTag);
}