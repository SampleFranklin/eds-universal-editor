export default function decorate(block) {
  const commonTitle = block.querySelector('.teaser-list > div:first-child > div > p').innerText;
  const teasers = Array.from(block.querySelectorAll('.teaser-list > div:not(:first-child)')).map((card) => {
    const imgSrc = card.querySelector('img')?.src;
    const altText = card.querySelector('div:nth-of-type(2) > p')?.innerText;
    const preTitle = card.querySelector('div:nth-of-type(3) > p')?.innerText;
    const title = card.querySelector('div:nth-of-type(4) > p')?.innerText;
    const description = Array.from(card.querySelectorAll('div:nth-of-type(5) p:not(.button-container)')).map((p) => p.innerText).join(' ');

    const ctaElements = card.querySelectorAll('div:nth-of-type(5) p.button-container a');
    const ctas = Array.from(ctaElements).map((cta) => cta.outerHTML);

    card.innerHTML = `
            <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                ${(imgSrc) ? `<div class="image-container"><img src="${imgSrc}" alt="${altText || title}" width="750" height="422" loading="lazy"></div>` : ''}
                <div class="teaser-content">
                  ${(preTitle) ? `<div class="teaser-pretitle"><p>${preTitle}</p></div>` : ''}
                  ${(title) ? `<div class="teaser-title"><h3>${title}</h3></div>` : ''}
                  ${(description) ? `<div class="teaser-description"><p>${description}</p></div>` : ''}
                  ${ctas.map((cta, index) => `<div class="teaser-action teaser-action-${index}">${cta}</div>`).join('')}
                </div>
            </div>
        `;
    return card.outerHTML;
  });

  const newHtml = `
        <div>
            <h1>${commonTitle}</h1>
        </div>
        <div style="display: flex;">
            ${teasers.join('')}
        </div>
    `;

  block.innerHTML = newHtml;
}
