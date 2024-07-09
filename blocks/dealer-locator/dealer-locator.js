import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';


export default function decorate(block) {
  function getDealerLocator() {
    const [
      imageEl,
      altTextEl,
      pretitleEl,
      descriptionEl,
      
    ] = block.children;
    const image = imageEl?.querySelector('picture');
    if (image) {
      const img = image.querySelector('img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      const alt = altTextEl?.textContent?.trim() || 'image';
      img.setAttribute('alt', alt);
    }

    const pretitle = pretitleEl?.textContent?.trim();
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
    // const cta = (ctaLinkEl) ? ctaUtils.getLink(ctaLinkEl, ctaTextEl, ctaTargetEl) : null;

    return {
      image,
      pretitle,
      description,
      
    };
  }

  const dealerLocator = getDealerLocator(block);
  const teaserEl = block.children[8];
  let teaserObj;
  if (teaserEl?.innerHTML) {
    teaserObj = teaser.getTeaser(teaserEl);
    teaserObj.classList.add('teaser-wrapper');
  }
  
  const dealerLocatorHtml = utility.sanitizeHtml(`
        ${(dealerLocator.image) ? dealerLocator.image.outerHTML : ''}
         <div class="dealerLocator__content">
           ${(dealerLocator.pretitle) ? `<p>${dealerLocator.pretitle}</p>` : ''}
            ${(dealerLocator.description) ? `${dealerLocator.description}` : ''}
           
          </div>
    `);

  block.innerHTML = `
        <div class="immersive__wrapper right-seperator">
            ${dealerLocatorHtml}
            ${(teaserObj?.innerHTML) ? teaserObj.outerHTML : ''}
        </div>
    `;
}
