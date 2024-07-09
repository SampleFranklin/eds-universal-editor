import utility from '../../utility/utility.js';
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
        const [ctaTextEl, linkEl] = element.children;
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = linkEl?.querySelector('.button-container a')?.href;

        const newButton = document.createElement('a');
        newButton.href = link;
        newButton.innerHTML = `<p>${ctaText}</p>`;

        if (index === 0) {
            newButton.classList.add('nav-button', 'active');
        } else {
            newButton.classList.add('nav-button');
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
       const dealerLocatorHtml = utility.sanitizeHtml(`
        ${(dealerLocator.image) ? dealerLocator.image.outerHTML : ''}
         <div class="dealerLocator__content">
           ${(dealerLocator.pretitle) ? `<p>${dealerLocator.pretitle}</p>` : ''}
           
           ${(dealerLocator.description) ? `${dealerLocator.description}` : ''}
           <div class="buttons-container">
            ${ctaElements}
        </div>
          </div>
    `);
          
     
  

  
  block.innerHTML = dealerLocatorHtml;

  <div class="dealerLocator__wrapper right-seperator">
            ${dealerLocatorHtml}
            </div>
}



  
 