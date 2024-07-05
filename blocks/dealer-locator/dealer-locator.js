
export default function decorate(block) {
    function getDealerLocator() {
      const [
        imageEl,
        altTextEl,
        pretitleEl,
        descriptionEl,
        ctaTextEl,
        ctaLinkEl,
       ] = block.children;
    // const image = imageEl?.querySelector('picture');
    // if (image) {
    //   const img = image.querySelector('img');
    //   img.removeAttribute('width');
    //   img.removeAttribute('height');
    //   const alt = altTextEl?.textContent?.trim() || 'image';
    //   img.setAttribute('alt', alt);
    // }
    const imgElement = imageEl.querySelector("img");
    const image = imgElement?.getAttribute("src")?.trim() || "";
    const altText = altTextEl?.textContent?.trim() || "";
    const pretitle = pretitleEl?.textContent?.trim() || "";
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
    console.log("vineetha");
    const cta = ctaLinkEl? { 
          href: ctaLinkEl.querySelector("a")?.href || "#",
          textContent: ctaTextEl?.textContent?.trim() || "",
        }
      : null;
  
      return {
      image,
      altText,
      pretitle,
      description,
      cta, // Ensure the CTA object is returned
      };
    }
  
    const dealerLocator = getDealerLocator();
  
    // Create the HTML structure using template literals
    const dealerLocatorHtml = `
      <div class="dealer-locator__container" style="image: url('${dealerLocator.image}');">
        <p class="pre-title">${dealerLocator.pretitle}</p>
        <p class="description">${dealerLocator.description}</p>
        <a href="${dealerLocator.cta?.href || "#"}" class="cta-text"><p>${dealerLocator.cta?.textContent}</p></a>
    </div>
  `;
      
    
  
    // Set the generated HTML to the block
    block.innerHTML = dealerLocatorHtml;
      
  console.log("sri");
    // Add scroll event listener for highlighting CTAs
    // document.addEventListener('scroll', () => {
    //   const cta1 = document.getElementById('cta1');
    //   const cta2 = document.getElementById('cta2');
    //   const cta1Rect = cta1.getBoundingClientRect();
    //   const cta2Rect = cta2.getBoundingClientRect();
  
    //   const viewportHeight = window.innerHeight;
    //  console.log(description);
    //   if (cta1Rect.top >= 0 && cta1Rect.bottom <= viewportHeight) {
    //     cta1.classList.add('highlight');
    //   } else {
    //     cta1.classList.remove('highlight');
    //   }
  
    //   if (cta2Rect.top >= 0 && cta2Rect.bottom <= viewportHeight) {
    //     cta2.classList.add('highlight');
    //   } else {
    //     cta2.classList.remove('highlight');
    //   }
    // });
  }
  