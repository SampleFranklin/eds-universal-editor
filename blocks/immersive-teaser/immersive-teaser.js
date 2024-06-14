import { getTeaserHTML } from "../teaser/teaser.js";

export default function decorate(block) {
    console.log(block.cloneNode(true));

    const backgroundImage = getDiv(block, 1, 'picture');
    const altText = getDiv(block, 2, 'div');
    const pretitle = getDiv(block, 3, 'div');
    const title = getDiv(block, 4, 'div');
    const description = getDiv(block, 5, 'div');
    const cta = description.querySelector('.button-container');

    const teaser = getDiv(block, 7)
    teaser.innerHTML = getTeaserHTML(teaser);
    console.log(teaser);

    // block.innerHTML = `
    // <div>
    //     ${(backgroundImage) ? `<div class="image-container">${backgroundImage.outerHTML}</div>` : ''}
    //     <div class="">
    //     </div>
    // </div>
    // `;
}

function getDiv(block, position, childSelector) {
    return block.querySelector(`div:nth-child(${position}) ${childSelector || ""}`);
}