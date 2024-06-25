import utility from '../../utility/utility.js';
import ctaUtils from '../../utility/ctaUtils.js';

export default function decorate(block) {
  function getNexaWorld() {
    const [
      // imageEl,
      // altTextEl,
      pretitleEl,
      titleEl,
      descriptionEl,
      ctaTextEl,
      ctaLinkEl,
      ctaTargetEl,
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
    const title = titleEl?.textContent?.trim();
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
    const cta = (ctaLinkEl) ? ctaUtils.getLink(ctaLinkEl, ctaTextEl, ctaTargetEl) : null;

    return {
      image,
      pretitle,
      title,
      description,
      cta,
    };
  }

  // const nexaWorld = getNexaWorld(block);
  // const teaserEl = block.children[8];
  // let teaserObj;
  // if (teaserEl?.innerHTML) {
  //   teaserObj = teaser.getTeaser(teaserEl);
  //   teaserObj.classList.add('teaser-wrapper');
  // }
  nexaWorld.cta?.classList.add('btn-title');
  const nexaWorldHtml = utility.sanitizeHtml(`
        ${(nexaWorld.image) ? immersiveTeaser.image.outerHTML : ''}
         <div class="immersive__content">
           ${(nexaWorld.pretitle) ? `<p>${nexaWorld.pretitle}</p>` : ''}
           ${(nexaWorld.title) ? `<h2>${nexaWorld.title}</h2>` : ''}
           ${(nexaWorld.description) ? `${nexaWorld.description}` : ''}
           ${(nexaWorld.cta) ? `<div class="immersive__action">${nexaWorld.cta.outerHTML}</div>` : ''}
          </div>
    `);

  block.innerHTML = `
        <div class="immersive__wrapper right-seperator">
            ${nexaWorldHtml}
           
        </div>
    `;
}
