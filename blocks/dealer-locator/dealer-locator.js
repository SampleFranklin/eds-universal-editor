import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';

export default function decorate(block) {
  function getDealerLocator() {
    const [
      imageEl,
      altTextEl,
      pretitleEl,
      descriptionEl,
      ...ctaElements
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

    const ctas = [];
    ctaElements.forEach((ctaEl, index) => {
      if (index % 2 === 0) {
        const ctaLinkEl = ctaEl;
        const ctaTextEl = ctaElements[index + 1];
        if (ctaLinkEl && ctaTextEl) {
          const cta = {
            link: ctaLinkEl.querySelector('a')?.getAttribute('href') || '#',
            text: ctaTextEl.textContent?.trim() || ''
          };
          ctas.push(cta);
        }
      }
    });

    return {
      image,
      pretitle,
      description,
      ctas
    };
  }

  const dealerLocator = getDealerLocator(block);
  const teaserEl = block.children;
  let teaserObj;
  if (teaserEl?.innerHTML) {
    teaserObj = teaser.getTeaser(teaserEl);
    teaserObj.classList.add('teaser-wrapper');
  }
  
  const dealerLocatorHtml = utility.sanitizeHtml(`
    ${(dealerLocator.image) ? dealerLocator.image.outerHTML : ''}
    <div class="dealerLocator__content">
      ${(dealerLocator.pretitle) ? `<p>${dealerLocator.pretitle}</p>` : ''}
      ${(dealerLocator.description) ? `<div>${dealerLocator.description}</div>` : ''}
      ${dealerLocator.ctas.map(cta => `
        <div class="cta-container">
          <a href="${cta.ctaLink}" class="cta">${cta.ctaText}</a>
        </div>
      `).join('')}
    </div>
  `);

  block.innerHTML = `
    <div class="dealerLocator__wrapper right-seperator">
      ${dealerLocatorHtml}
      ${(teaserObj?.innerHTML) ? teaserObj.outerHTML : ''}
    </div>
  `;
}
