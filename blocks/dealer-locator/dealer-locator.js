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
      const description = descriptionEl?.textContent?.trim() || "";
  
      const imgElement = heroImageEl.querySelector("img");
      const heroImage = imgElement?.getAttribute("src")?.trim() || "";
  
      const imageAltText = imageAltTextEl?.textContent?.trim() || "";
  
      const ctaLink = ctaLinkEl?.textContent?.trim() || "";
      const ctaText = ctaTextEl?.textContent?.trim() || "";
  
      return {
        pretitle,
        description,
        heroImage,
        imageAltText,
        ctaLink,
        ctaText,
      };
    }
  
    const dealerLocator = getDealerLocator();
  
    // Create the HTML structure using template literals
    const dealerLocatorHtml = `
      <div class="hero-image" style="background-image: url('${dealerLocator.heroImage}');">
        <div class="pretitle">${dealerLocator.pretitle}</div>
        <div class="description">${dealerLocator.description}</div>
        <img src="${dealerLocator.heroImage}" alt="${dealerLocator.imageAltText}" class="hero-image"/>
        <div class="cta-container">
          <a href="${dealerLocator.ctaLink}" class="cta-text" id="cta1">${dealerLocator.ctaText}</a>
          <a href="${dealerLocator.ctaLink}" class="cta-text" id="cta2">${dealerLocator.ctaText}</a>
        </div>
      </div>
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
  