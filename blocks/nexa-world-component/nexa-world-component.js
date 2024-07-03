import utility from '../../utility/utility.js';
import ctaUtils from '../../utility/ctaUtils.js';

export default function decorate(block) {
  // Function to extract Nexa World content from the block
 
  function getNexaWorldContent() {
    const [
      pretitleEl,
      titleEl,
      descriptionEl,
      ctaTextEl,
      ctaLinkEl,
      ...linkEls // Get the rest of the elements as link elements
    ] = block.children;

    const pretitle = pretitleEl?.textContent?.trim() || '';
    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    title?.classList?.add('title');
    const description = descriptionEl?.textContent?.trim() || '';
    
    const cta = (ctaLinkEl) ? {
      href: ctaLinkEl.querySelector('a')?.href || '#',
      title: ctaLinkEl.querySelector('a')?.title || '',
      target: ctaLinkEl.querySelector('a')?.target || '_self',
      textContent: ctaTextEl?.textContent?.trim() || ''
    } : null;

    const links = Array.from(linkEls).map(linkEl => {
      const [linkImageEl, linkAltTextEl, linkTextEl, linkAnchorEl, linkTargetEl] = linkEl.children;

      const image = linkImageEl?.querySelector('picture');
      if (image) {
        const img = image?.querySelector('img');
        if (img) {
          img.removeAttribute('width');
          img.removeAttribute('height');
        }
      }

      const linkAltText = linkAltTextEl?.textContent?.trim() || '';
      const linkText = linkTextEl?.textContent?.trim() || '';
      const linkAnchor = linkAnchorEl?.querySelector('a')?.href || '#';
      const linkTarget = linkTargetEl?.querySelector('a')?.target || '_self';

      return {
        imgSrc: linkImageEl?.querySelector('img')?.src || '',
        imgAlt: linkAltText,
        text: linkText,
        href: linkAnchor,
        target: linkTarget
      };
    });

    return {
      pretitle,
      title,
      description,
      cta,
      links
    };
  }
// Get Nexa World content from the block
  const nexaWorldContent = getNexaWorldContent();

 

  // Construct Nexa World HTML structure
  const nexaWorldHtml = `
    <div class="nexa-world__content">
      <div class="nexa-world__title">
        ${nexaWorldContent.pretitle ? `<p class="pre-title">${nexaWorldContent.pretitle}</p>` : ''}
        ${nexaWorldContent.title ? `${nexaWorldContent.title.outerHTML}` : ''}
      </div>
      ${nexaWorldContent.description ? `<p class="description">${nexaWorldContent.description}</p>` : ''}
      
  
      <div class="nexa-world__action">
    <a href="${nexaWorldContent.cta?.href || '#'}" title="${nexaWorldContent.cta?.title || ''}" class="button btn-title" target="${nexaWorldContent.cta?.target || '_self'}">
      <span class="cta-text">${nexaWorldContent.cta?.textContent}</span>
      <span class="location-icon"><img src="/content/dam/nexa-world/north_east.svg" alt="Image arrow"></span>
    </a>
  </div>;
  <div class="nexa-world__img">
        <img src="${nexaWorldContent.links.length > 0 ? nexaWorldContent.links[0].imgSrc : ''}" alt="${nexaWorldContent.links.length > 0 ? nexaWorldContent.links[0].imgAlt : ''}" />
      </div>
  </div>`;
      
    

   

  // Create the links HTML structure
  const ul = document.createElement('ul');
  ul.classList.add('list-container');
  nexaWorldContent.links.forEach(link => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.text;

    const imgElement = document.createElement('img');
    imgElement.src = link.imgSrc;
    imgElement.alt = link.imgAlt;
    anchor.appendChild(imgElement);
    listItem.appendChild(anchor);
    ul.appendChild(listItem);
  });

  const nexaWorldTeaser = `
    <div class="nexa-world__teaser">
      <div class="nexa-world__links">
        ${ul.outerHTML}
      </div>
    </div>`;

  // Replace the block's HTML with the constructed Nexa World HTML and teaser if present
  block.innerHTML = `
    <div class="nexa-world__container">
      ${nexaWorldHtml}
      ${nexaWorldTeaser}
    </div>`;

    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('.nexa-world__links a');
        const teaser = document.querySelector('.nexa-world__teaser');
        const container = document.querySelector('.nexa-world__container');
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
      
        links.forEach(link => {
          link.addEventListener('mouseover', function() {
            const imgSrc = this.querySelector('img').src;
            if (isMobile) {
              teaser.style.backgroundImage = `url(${imgSrc})`;
            } else {
              container.style.backgroundImage = `url(${imgSrc})`;
            }
          });
      
          link.addEventListener('mouseout', function() {
            if (isMobile) {
              teaser.style.backgroundImage = 'none';
            } else {
              container.style.backgroundImage = 'none';
            }
          });
        });
      });
      
        document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('.nexa-world__links a');
        const teaser = document.querySelector('.nexa-world__teaser');
        const container = document.querySelector('.nexa-world__container');
      
        function updateHoverEffects() {
          const isMobile = window.matchMedia("(max-width: 768px)").matches;
      
          links.forEach(link => {
            link.addEventListener('mouseover', function() {
              const imgSrc = this.querySelector('img').src;
              if (isMobile) {
                teaser.style.backgroundImage = `url(${imgSrc})`;
              } else {
                container.style.backgroundImage = `url(${imgSrc})`;
              }
            });
      
            link.addEventListener('mouseout', function() {
              if (isMobile) {
                teaser.style.backgroundImage = 'none';
              } else {
                container.style.backgroundImage = 'none';
              }
            });
          });
        }
    
        updateHoverEffects();
        window.addEventListener('resize', updateHoverEffects);
      });
    }
      //Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});

//   // Add event listeners to links and CTA text to change the image on hover
//   const links = block.querySelectorAll('.nexa-world__links a');
//   const ctaText = block.querySelector('.cta-text');
//   const imgElement = block.querySelector('.nexa-world__img img');

//   // Store the original src property value of the img element
//   const originalImgSrc = imgElement.src;

//   // Function to handle mouse enter and leave for changing images
//   const handleMouseEnter = (event) => {
//     const linkImg = event.currentTarget.querySelector('img');
//     if (linkImg) {
//       imgElement.src = linkImg.src;
//     }
//   };

//   const handleMouseLeave = () => {
//     imgElement.src = originalImgSrc;
//   };




  // Add event listeners to each link
//   links.forEach(link => {
//     link.addEventListener('mouseenter', handleMouseEnter);
//     link.addEventListener('mouseleave', handleMouseLeave);
//   });

//   // Add event listeners to the CTA text
//   ctaText.addEventListener('mouseenter', handleMouseEnter);
//   ctaText.addEventListener('mouseleave', handleMouseLeave);
// }

// // Call the function to decorate the block
// document.addEventListener('DOMContentLoaded', () => {
//   const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
//   blocks.forEach(decorate);
// });
