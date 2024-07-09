
import { moveInstrumentation } from '../../scripts/scripts.js';
export default function decorate(block) {
  function getDealerLocator() {
      const [
          imageEl,
          pretitleEl,
          descriptionEl,
          ...ctasEl
      ] = block.children;

      const image = imageEl?.querySelector('picture img');
      let imgSrc = '';
      let altText = 'image';
      if (image) {
          imgSrc = image.getAttribute('src');
          image.removeAttribute('width');
          image.removeAttribute('height');
          const altTextEl = imageEl?.querySelector('figcaption');
          altText = altTextEl?.textContent?.trim() || 'image';
      }
      const pretitle = pretitleEl?.textContent?.trim() || "";
      const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
      const ctaElements = ctasEl.map((element, index) => {
        const [ctaTextEl, ctaLinkEl] = element.children;
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = ctaLinkEl?.querySelector('.button-container a')?.href;

        const newButton = document.createElement('a');
        newButton.href = link;
        newButton.innerHTML = `<p>${ctaText}</p>`;

        if (index === 0) {
            newButton.classList.add('dealer-button', 'active');
        } else {
            newButton.classList.add('dealer-button');
        }

        element.innerHTML = '';
        element.appendChild(newButton);

        moveInstrumentation(element, newButton);

        return element.innerHTML;
    }).join('');
    return {
      image,
      altText,
      pretitle,
      description,

    }
  }
  

  const dealerLocator = getDealerLocator();

  const dealerLocatorHtml = `
  <div class="dealer-locator__container">
        ${(dealerLocator.image) ? dealerLocator.image.outerHTML : ''}
         <div class="dealerLocator__content">
           ${(dealerLocator.pretitle) ? `<p>${dealerLocator.pretitle}</p>` : ''}
           
           ${(dealerLocator.description) ? `${dealerLocator.description}` : ''}
           
          </div>
          </div>
    `;
          
     
  

  
  block.innerHTML = dealerLocatorHtml;

  <div class="dealerLocator__wrapper right-seperator">
            ${dealerLocatorHtml}
            <div class="buttons-container">
            ${ctaElements}
        </div>
            </div>
            const dealerLocatorbuttons = block.querySelectorAll('.dealer-button');
            setupDealerButtons(dealerLocatorbuttons);
}



  
 