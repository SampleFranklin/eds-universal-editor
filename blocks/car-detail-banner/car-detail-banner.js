import { fetchPlaceholders } from "../../scripts/aem.js";
import ctaUtils from '../../utility/ctaUtils.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
    const { publishDomain } = await fetchPlaceholders();
    const graphQlEndpoint = `${publishDomain}/graphql/execute.json/msil-platform/carDetailBanner;modelId=BZ`;
    const [
        modelIdEl,
        startingPriceTextEl,
        testDriveTextEl,
        scrollMoreTextEl,
        primaryCtaTextEl,
        primaryCtaLinkEl,
        primaryCtaTargetEl,
        secondaryCtaTextEl,
        secondaryCtaLinkEl,
        secondaryCtaTargetEl
    ] = block.children;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(graphQlEndpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => { })
        .catch();

    const modelId = modelIdEl?.textContent?.trim();
    const startingPriceText = startingPriceTextEl?.textContent?.trim();
    const testDriveText = testDriveTextEl?.textContent?.trim();
    const scrollMoreText = scrollMoreTextEl?.textContent?.trim();
    const primaryCta = ctaUtils.getLink(primaryCtaLinkEl, primaryCtaTextEl, primaryCtaTargetEl, 'button-primary-light');
    const secondaryCta = ctaUtils.getLink(secondaryCtaLinkEl, secondaryCtaTextEl, secondaryCtaTargetEl, 'button-secondary-light');

block.innerHTML = '';
block.insertAdjacentHTML(
  'beforeend',
  utility.sanitizeHtml(`
                   <div class="Banner">
                       ${(image) ? `<div class="teaser__image">${image.outerHTML}</div>` : ''}
                       <div class="teaser__content">
                           <div class="teaser__info">
                               ${(pretitle) ? `<div class="teaser__pretitle"><p>${pretitle}</p></div>` : ''}
                               ${(title) ? `<div class="teaser__title">${title.outerHTML}</div>` : ''}
                               ${(description) ? `<div class="teaser__description">${description}</div>` : ''}
                           </div>
                           ${ctaHtml}
                       </div>
                   </div>
             `),
);
}