export default function decorate(block) {
    function getDealerLocator() {
      const [
        pretitleEl,
        descriptionEl,
        heroImageEl,
        imageAltTextEl,
        ctaLinkEl,
        ctaTextEl,
      ] = block.children;
  
      const pretitle = pretitleEl?.textContent?.trim() || "";
      const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
  
      const heroImage = heroImageEl?.querySelector('picture');
      if (heroImage) {
        const img = heroImage.querySelector('img');
        img.removeAttribute('width');
        img.removeAttribute('height');
        const alt = imageAltTextEl?.textContent?.trim() || 'heroImage';
        img.setAttribute('alt', alt);
      }
  
      const cta = (ctaLinkEl) ? ctaUtils.getLink(ctaLinkEl, ctaTextEl,) : null;
  
      return {
        pretitle,
        description,
        heroImage,
        imageAltText,
        ctaLink,
        ctaText,
        cta, // Ensure the CTA object is returned
      };
    }
  
    const dealerLocator = getDealerLocator();
  
    // Create the HTML structure using template literals
    const dealerLocatorHtml = `
      <div class="hero-image" style="background-image: url('${dealerLocator.heroImage}');">
      <div class="pretitle">${dealerLocator.pretitle}</div>
      <div class="description">${dealerLocator.description}</div>
      ${(dealerLocator.cta) ? `<div class="cta-text" id="cta1">${dealerLocator.cta.outerHTML}</div>` : ''}
      ${(dealerLocator.cta) ? `<div class="cta-text" id="cta2">${dealerLocator.cta.outerHTML}</div>` : ''}
    `;
  
    // Set the generated HTML to the block
    block.innerHTML = `
      <div class="dealer-locator__container">
        ${dealerLocatorHtml}
      </div>`;
  
    // Add scroll event listener for highlighting CTAs
    document.addEventListener('scroll', () => {
      const cta1 = document.getElementById('cta1');
      const cta2 = document.getElementById('cta2');
      const cta1Rect = cta1.getBoundingClientRect();
      const cta2Rect = cta2.getBoundingClientRect();
  
      const viewportHeight = window.innerHeight;
  
      if (cta1Rect.top >= 0 && cta1Rect.bottom <= viewportHeight) {
        cta1.classList.add('highlight');
      } else {
        cta1.classList.remove('highlight');
      }
  
      if (cta2Rect.top >= 0 && cta2Rect.bottom <= viewportHeight) {
        cta2.classList.add('highlight');
      } else {
        cta2.classList.remove('highlight');
      }
    });
  }
  