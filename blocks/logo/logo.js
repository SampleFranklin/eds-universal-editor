export default function decorate(block) {
    var link =  block.querySelector(':scope > div > div > p > a');
    var imgTag =  block.querySelector(':scope > div > div > picture');
    var pTag = document.createElement('p');
    var anchorTag = document.createElement('a');
    
    anchorTag.href = link;
    anchorTag.appendChild(imgTag);

    pTag.appendChild(anchorTag);

    var navBlockDiv = block.parentNode;
    navBlockDiv.replaceWith(pTag);
}

