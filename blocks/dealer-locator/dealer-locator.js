export default function decorate(block) {
  function getDealerLocator() {
    const [
      imageEl,
      pretitleEl,
      descriptionEl,
      ...ctaEls
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

  // Create the HTML structure using template literals
  const dealerLocatorHtml = `
    <div class="dealer-locator__container">
      <div class="section">
        <div class="image-container">
          <img src="${dealerLocator.imgSrc}" alt="${dealerLocator.altText}">
          <div class ="overlay">
            <div class="dealer-locator__content">
              <p class="pre-title">${dealerLocator.pretitle}</p>
            </div>
            <div class="dealer-locator__description">${dealerLocator.description}</div>
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
          </div>
        </div>
      </div>
    </div>
  `;

  // Set the generated HTML to the block
  block.innerHTML = `
  <div class ="dealer-locator__container right-seperator">
  ${dealerLocatorHtml}
  </div>
  `;
  const ctaElements = document.querySelectorAll('.dealer-locator__container .dealer-locator__action .cta-text');
  const scrollBar = document.querySelector('.dealer-locator__container .scroll-bar');

  if (ctaElements.length > 0) {
    window.addEventListener('scroll', highlightCTAs);
  }

  function highlightCTAs() {
    const scrollPosition = window.scrollY + window.innerHeight * 0.5;

    let highlightedIndex = -1;

    ctaElements.forEach((cta, index) => {
      const ctaPosition = cta.getBoundingClientRect().top + window.scrollY;

      if (scrollPosition >= ctaPosition) {
        highlightedIndex = index;
      }
    });

    ctaElements.forEach((cta, index) => {
      if (index === highlightedIndex) {
        cta.classList.add('highlight');
        cta.style.fontSize = '35px'; // Increase font size for highlighted CTA
      } else {
        cta.classList.remove('highlight');
        cta.style.fontSize = '24px'; // Reset font size for normal CTAs
      }
    });

    if (highlightedIndex !== -1) {
      const ctaHeight = ctaElements[highlightedIndex].offsetHeight;
      const ctaOffsetTop = ctaElements[highlightedIndex].offsetTop;
      scrollBar.style.height = `${ctaHeight}px`;
      scrollBar.style.top = `${ctaOffsetTop}px`;
      scrollBar.classList.add('highlight');
    } else {
      scrollBar.classList.remove('highlight');
    }
  }
}