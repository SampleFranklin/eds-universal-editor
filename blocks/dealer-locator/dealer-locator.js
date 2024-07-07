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
  

      // const imgElement = imageEl?.querySelector('img');
      // const imageUrl = imgElement?.getAttribute('src')?.trim() || "";

      const pretitle = pretitleEl?.textContent?.trim() || "";
      const description = descriptionEl?.textContent?.trim() || "";

      const ctas = ctaEls.map(ctaEl => {
          const link = ctaEl.querySelector('a');
          const text = ctaText?.querySelector('li')?.textContent?.trim() || "";
          const href = link?.getAttribute('href') || "#";
          return { ctaText, ctaLink };
      });

      return {
          imageUrl,
          pretitle,
          description,
          ctas
      };
  }

  const dealerLocator = getDealerLocator();

  // Create the HTML structure using template literals
  const dealerLocatorHtml = `
    <div class="dealer-locator__container">
        <div class="image"></div>
        <div class="overlay">
            <div class="dealer-locator__content">
                <p class="pre-title">${dealerLocator.pretitle}</p>
                <p class="description">${dealerLocator.description}</p>
            </div>
            <div class="dealer-locator__action">
                <ul>
                    ${dealerLocator.ctas.map(cta => `
                        <a href="${cta.ctaLink}">
                            <li class="cta-text">${cta.ctaText}</li>
                        </a>
                    `).join('')}
                </ul>
            </div>
        </div>
    </div>
  `;

  // Set the generated HTML to the block
  block.innerHTML = dealerLocatorHtml;

  // Set the background image
  const imageElement = document.querySelector('.dealer-locator__container .image');
  imageElement.style.backgroundImage = `url(${dealerLocator.imageUrl})`;

  // Add scroll event listener for highlighting CTAs
  const ctaElements = document.querySelectorAll('.dealer-locator__container .dealer-locator__action .cta-text');
  if (ctaElements.length > 0) {
      window.addEventListener('scroll', function() {
          const scrollPosition = window.scrollY + window.innerHeight;

          ctaElements.forEach(function(cta) {
              const ctaPosition = cta.getBoundingClientRect().top + window.scrollY;

              if (scrollPosition >= ctaPosition) {
                  cta.classList.add('highlight');
              } else {
                  cta.classList.remove('highlight');
              }
          });
      });
  }

}
