import teaser from '../../utility/teaserUtils.js';
import utility from '../../utility/utility.js';
export default function decorate(block) {
  function getDealerLocator() {
    const [
      imageEl,
      pretitleEl,
      descriptionEl,
      ...ctaEls
    ] = block.children;

    const image = imageEl?.querySelector('picture');
    if (image) {
      const img = image.querySelector('img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      const alt = altTextEl?.textContent?.trim() || 'image';
      img.setAttribute('alt', alt);
    }

    const pretitle = pretitleEl?.textContent?.trim() || "";
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');

    const ctas = ctaEls.map(ctaEl => {
      const ctaTextEl = ctaEl.querySelector('p');
      const ctaLinkEl = ctaEl.querySelector('a');
      const ctaText = ctaTextEl?.textContent?.trim() || '';
      const ctaLink = ctaLinkEl?.href || '#';
      return { ctaText, ctaLink };
    });

    return {
      imgSrc,
      altText,
      pretitle,
      description,
      ctas
    };
  }

  const dealerLocator = getDealerLocator();
  const teaserEl = block.children;
  let teaserObj;
  if (teaserEl?.innerHTML) {
    teaserObj = teaser.getTeaser(teaserEl);
    teaserObj.classList.add('teaser-wrapper');
  }
  const dealerLocatorHtml = utility.sanitizeHtml(`
<div class="dealer-locator__container">
   <div class ="image-container"> ${(dealerLocator.image) ? dealerLocator.image.outerHTML : ''}</div>
   <div class="dealer-locator__content">
          <p class="pre-title"> ${dealerLocator.pretitle} </p>
          <p class="description">${dealerLocator.description}</p>
          </div>
           <div class="dealer-locator__action">
              <div class="scroll-bar"></div>
              <ul>
                ${dealerLocator.ctas.map((cta, index) => `
                  <li class="cta-text" data-index="${index}">
                    <a href="${cta.ctaLink}">${cta.ctaText}</a>
                  </li>
                `).join('')}
              </ul>
            </div>
           
  </div>`);

  
  

  // Set the generated HTML to the block
 
  block.innerHTML = `
        <div class="dealerLocator__wrapper right-seperator">
            ${dealerLocatorHtml}
            ${(teaserObj?.innerHTML) ? teaserObj.outerHTML : ''}
        </div>
    `;

  // Add scroll event listener for highlighting CTAs
  const ctaElements = document.querySelectorAll('.dealer-locator__container .dealer-locator__action .cta-text');
  const scrollBar = document.querySelector('.dealer-locator__container .scroll-bar');

  if (ctaElements.length > 0) {
    window.addEventListener('scroll', highlightCTAs);
  }

  function highlightCTAs() {
    const scrollPosition = window.scrollY + window.innerHeight;

    ctaElements.forEach(function(cta) {
      const ctaPosition = cta.getBoundingClientRect().top + window.scrollY;
      const index = cta.dataset.index;
      const isHighlighted = scrollPosition >= ctaPosition;

      if (isHighlighted) {
        cta.classList.add('highlight');
      } else {
        cta.classList.remove('highlight');
      }
    });
  }
}
