import ctaUtils from '../../utility/ctaUtils.js';
import utility from '../../utility/utility.js';


export default function decorate(block) {
    const [
          imageEl,
          titleEl,
          descriptionEl,
          ctaTextEl,
          ctaLinkEl,
          ctaTargetEl,
          featureTypeEl,
    ] = block.children;

    const image = imageEl?.querySelector('picture');
    if (image) {
        const img = image.querySelector('img');
        img.removeAttribute('width');
        img.removeAttribute('height');
    }

    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
    const cta = ctaUtils.getLink(ctaLinkEl, ctaTextEl, ctaTargetEl, '');
    const featureType = featureTypeEl?.textContent?.trim();

    let ctaHtml = '';
    if (cta) {
      ctaHtml = `
                     <div class="cta__actions">
                       ${(cta) ? cta.outerHTML : ''}
                     </div>
                   `;
    }

    if(featureType) {
      block.classList.add(featureType);
    }

    block.innerHTML = '';
    block.insertAdjacentHTML(
          'beforeend',
          utility.sanitizeHtml(`
                           <div class="feature__card">
                               ${(image) ? `<div class="feature__image">${image.outerHTML}</div>` : ''}
                               <div class="feature__content">
                                   <div class="feature__info">
                                       ${(title) ? `<div class="feature__title">${title.outerHTML}</div>` : ''}
                                       ${(description) ? `<div class="feature__description">${description}</div>` : ''}
                                   </div>
                                   ${ctaHtml}
                               </div>
                           </div>
                     `),
        );


}