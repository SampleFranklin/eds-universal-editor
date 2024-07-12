import ctaUtils from '../../utility/ctaUtils.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
    const [
        logoImageEl,
        primaryCtaTextEl,
        primaryCtaLinkEl,
        primaryCtaTargetEl,
        secondaryCtaTextEl,
        secondaryCtaLinkEl,
        secondaryCtaTargetEl,
        ...headerItems
    ] = block.children;

    let headerItemsHtml = '';

    headerItems.forEach((element) => {
        const [
          titleEl,
          scrollClassEl
        ] = element.children;
        const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
        const scrollCLass = scrollClassEl?.textContent?.trim();
        let headerItemHtml = `  <div class="brand-header__header-item">
                                ${(title) ? `<div class="brand-header__title">${title.outerHTML}</div>`  : ''}
                                ${(scrollCLass) ? `<div class="brand-header__scrollClass"><p>${scrollCLass}</p></div>`  : ''}
                            </div>
                            `;
        headerItemsHtml += headerItemHtml;
    });
    const primaryCta = ctaUtils.getLink(primaryCtaLinkEl, primaryCtaTextEl, primaryCtaTargetEl, 'button-primary-light');
    const secondaryCta = ctaUtils.getLink(secondaryCtaLinkEl, secondaryCtaTextEl, secondaryCtaTargetEl, 'button-secondary-light');

    const image = logoImageEl?.querySelector('picture');
    const img = image.querySelector('img');
    img.removeAttribute('width');
    img.removeAttribute('height');
    
    let ctaHtml = '';
    if (primaryCta || secondaryCta) {
      ctaHtml = `
                     <div class="brand-header__actions">
                       ${(primaryCta) ? primaryCta.outerHTML : ''}
                       ${(secondaryCta) ? secondaryCta.outerHTML : ''}
                     </div>
                   `;
    }

block.innerHTML = '';
block.insertAdjacentHTML(
  'beforeend',
  utility.sanitizeHtml(`
                   <div class="brand-header">
                       ${(image) ? `<div class="brand-header__logo">${image.outerHTML}</div>` : ''}
                       <div class="brand-header__content">
                            <div class="brand-header__items">
                                ${headerItemsHtml}
                            </div>
                       ${ctaHtml}
                       </div>
                   </div>
             `),
);
}

