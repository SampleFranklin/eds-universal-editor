import teaser from '../../utility/teaserUtils.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  function getDealerLocator() {
    const [
      imageEl,
      pretitleEl,
      descriptionEl,
      ...ctasEl
    ] = block.children;

    const image = imageEl?.querySelector('picture');
    let altText = 'image'; // Default alt text

    if (image) {
      const img = image.querySelector('img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      altText = img?.alt || altText;
      img.setAttribute('alt', altText);
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
      ctaElements,
    };
  }

  const dealerLocator = getDealerLocator();
  const teaserEl = block.children[8];
  let teaserObj;

  if (teaserEl?.innerHTML) {
    teaserObj = teaser.getTeaser(teaserEl);
    teaserObj.classList.add('teaser-wrapper');
  }

  const dealerLocatorHtml = `
    <div class="dealer-locator__container">
      ${(dealerLocator.image) ? dealerLocator.image.outerHTML : ''}
      <div class="dealerLocator__content">
        ${(dealerLocator.pretitle) ? `<p>${dealerLocator.pretitle}</p>` : ''}
        ${(dealerLocator.description) ? `${dealerLocator.description}` : ''}
      </div>
    </div>
  `;

  block.innerHTML = `
    <div class="dealerLocator__wrapper right-seperator">
      ${dealerLocatorHtml}
      ${(teaserObj?.innerHTML) ? teaserObj.outerHTML : ''}
      <div class="buttons-container">
        ${dealerLocator.ctaElements}
      </div>
    </div>
  `;

  const dealerLocatorButtons = block.querySelectorAll('.dealer-button');
  setupDealerButtons(dealerLocatorButtons);
}
