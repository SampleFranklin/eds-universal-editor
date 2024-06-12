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

    pTag.appendChild(anchorTag);
    block.innerHTML = "";
    block.append(pTag);

    console.log(block);
}

