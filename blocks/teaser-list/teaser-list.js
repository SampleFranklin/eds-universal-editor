export default function decorate(block) {
    console.log(block.cloneNode(true));
    const commonTitle = block.querySelector('.teaser-list > div:first-child > div > p').innerText;
    let newHtml = `<h1>${commonTitle}</h1><div style="display: flex;">`;

    const cards = block.querySelectorAll('.teaser-list > div:not(:first-child)');

    cards.forEach(card => {
        const imgSrc = card.querySelector('img').src;
        const preTitle = card.querySelector('div:nth-of-type(2) > p').innerText;
        const title = card.querySelector('div:nth-of-type(3) > p').innerText;
        const description = Array.from(card.querySelectorAll('div:nth-of-type(4) > p:not(.button-container)')).map(p => p.innerText).join(' ');

        const ctaElements = card.querySelectorAll('div:nth-of-type(4) > p.button-container > a');
        const cta1 = ctaElements[0] ? ctaElements[0].outerHTML : '';
        const cta2 = ctaElements[1] ? ctaElements[1].outerHTML : '';

        newHtml += `
                <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                    <img src="${imgSrc}" alt="" style="max-width: 100%;">
                    <p>${preTitle}</p>
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <div>${cta1}</div>
                    <div>${cta2}</div>
                </div>
            `;
    });

    newHtml += `</div>`;
    block.innerHTML = newHtml;
}