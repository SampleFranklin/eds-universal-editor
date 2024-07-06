
export default function decorate(block) {
    function getDealerLocator() {
      const [
        imageEl,
        pretitleEl,
        descriptionEl,
        // ctaTextEl,
        // ctaLinkEl,
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
    
    const pretitle = pretitleEl?.textContent?.trim() || "";
    const description = descriptionEl?.textContent?.trim() || "";
    console.log("vineetha");
    // const cta = ctaLinkEl? { 
    //       href: ctaLinkEl.querySelector("a")?.href || "#",
    //       textContent: ctaTextEl?.textContent?.trim() || "",
    //     }
    //   : null;
  
      return {
      image,
      pretitle,
      description,
      //cta, // Ensure the CTA object is returned
      };
    }
  
    const dealerLocator = getDealerLocator();
  
    // Create the HTML structure using template literals
    const dealerLocatorHtml = `
      <div class="dealer-locator__container">
      <div class= "image"> <img src="${dealerLocator.image}"/>
      </div>
        <p class="pre-title">${dealerLocator.pretitle}</p>
        <p class="description">${dealerLocator.description}</p>
        
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
  