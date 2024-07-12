import { moveInstrumentation } from '../../scripts/scripts.js';

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
      const altTextEl = imageEl.querySelector('figcaption');
      const alt = altTextEl?.textContent?.trim() || 'image';
      img.setAttribute('alt', alt);
      img.classList.add('image-container');
    }
    const pretitle = pretitleEl?.textContent?.trim() || "";
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
    const ctas = Array.from(ctaEls).map(ctaEl => {
      const [ctaTextEl, ctaLinkEl] = ctaEl.children;
      const ctaText = ctaTextEl?.textContent?.trim() || '';
      const ctaLink = ctaLinkEl?.querySelector('a')?.href || '#';
      return {
        text: ctaText,
        href: ctaLink,
        ctaEl: ctaEl
      };
    });

    return { image, pretitle, description, ctas };
  }

  const dealerLocator = getDealerLocator();

  // Create the links HTML structure
  const ul = document.createElement('ul');
  ul.classList.add('list-container');
  dealerLocator.ctas.forEach(cta => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = cta.href;
    anchor.textContent = cta.text;
    anchor.classList.add('cta-text'); // Added class for CTA text
    listItem.appendChild(anchor);
    moveInstrumentation(cta.ctaEl, listItem);
    ul.appendChild(listItem);
  });

  const dealerLocatorHtml = `
    <div class="dealer-locator__container">
      <div class="section">
        <div class="image-container">
          ${(dealerLocator.image) ? dealerLocator.image.outerHTML : ''}
          <div class="overlay">
            <div class="dealer-locator__content">
              <p class="pre-title">${dealerLocator.pretitle}</p>
            </div>
            <div class="dealer-locator__description">${dealerLocator.description}</div>
            <div class="dealer-locator__action">
              <div class="scroll-bar"></div>
              ${ul.outerHTML}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  block.innerHTML = `
    <div class="dealer-locator__container right-seperator">
      ${dealerLocatorHtml}
    </div>
  `;

  function setupScrollHighlight() {
    const ctaElements = document.querySelectorAll('.dealer-locator__action .cta-text');
    const scrollBar = document.querySelector('.dealer-locator__action .scroll-bar');

    // Initial highlight setup
    function highlightFirstCTA() {
      ctaElements[0].classList.add('highlight');
      ctaElements[0].style.fontSize = '35px'; // Increase font size for highlighted CTA

      const ctaHeight = ctaElements[0].offsetHeight;
      const ctaOffsetTop = ctaElements[0].offsetTop;
      scrollBar.style.height = `${ctaHeight}px`;
      scrollBar.style.top = `${ctaOffsetTop}px`;
      scrollBar.classList.add('highlight');
    }

    highlightFirstCTA(); // Highlight the first CTA initially

    // Add hover effects
    ctaElements.forEach((cta, index) => {
      cta.addEventListener('mouseover', () => {
        ctaElements.forEach(cta => {
          cta.classList.remove('highlight');
          cta.style.fontSize = '24px'; // Reset font size for normal CTAs
        });
        cta.classList.add('highlight');
        cta.style.fontSize = '35px'; // Increase font size for highlighted CTA

        const ctaHeight = cta.offsetHeight;
        const ctaOffsetTop = cta.offsetTop;
        scrollBar.style.height = `${ctaHeight}px`;
        scrollBar.style.top = `${ctaOffsetTop}px`;
      });
    });
  }

  // Call the function to set up scroll highlighting
  setupScrollHighlight();
}
