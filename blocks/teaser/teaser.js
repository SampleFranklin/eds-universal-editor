import { getContent } from '../../scripts/scripts.js';

export default function decorate(block) {
    const image = block.querySelector('picture');

    const altTextElement = block.querySelector('div:nth-child(2)');
    const altText = altTextElement.textContent.trim();

    let imageHtml = '';
    if (image) {
        const img = image.querySelector('img');
        img.removeAttribute('width');
        img.removeAttribute('height');
        img.setAttribute('alt', altText);
        imageHtml = `
            <div class="teaser-image">
                <picture>
                    ${image.innerHTML}
                </picture>
            </div>
        `;
    }

    const pretitleHtml = `<div class="teaser-pretitle"><p>${getContent(block, 'div:nth-child(3)')}</p></div>`;
    const titleHtml = `<div class="teaser-title"><h1>${getContent(block, 'div:nth-child(4)')}</h1></div>`;
    const descriptionHtml = `<div class="teaser-description">${getContent(block, 'div:nth-child(5) div')}</div>`;

    const ctaContainer = block.querySelector('div:nth-child(6)');
    const target = ctaContainer.textContent.trim();
    const ctaLink = block.querySelector('div:nth-child(6) div .button-container');
    let ctaHtml = '';
    if (ctaLink) {
        ctaLink.querySelector('a').setAttribute('target', target);
        ctaHtml = ctaLink.innerHTML;
        ctaLink.remove();
    }

    const ctaActionsHtml = ctaHtml ? `<div class="teaser-actions">${ctaHtml}</div>` : '';

    block.innerHTML = `
        <div class="teaser-card">
            ${imageHtml}
            <div class="teaser-content">
                <div>
                    ${pretitleHtml}
                    ${titleHtml}
                    ${descriptionHtml}
                </div>
                ${ctaActionsHtml}
            </div>
        </div>
    `;
}
