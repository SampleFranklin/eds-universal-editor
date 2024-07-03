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
    const description = Array.from(descriptionEl.querySelectorAll('p')).map(p => p.textContent.trim()).join('');
    console.log(description);
    
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
          <p class="cta-text">${nexaWorldContent.cta?.textContent}</p>
        </a>
      </div>
      
      <div class="nexa-world__img">
        <img src="${nexaWorldContent.links.length > 0 ? nexaWorldContent.links[1].imgSrc : ''}" alt="${nexaWorldContent.links.length > 0 ? nexaWorldContent.links[0].imgAlt : ''}" />
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
    console.log(link.imgSrc);
    imgElement.src = link.imgSrc;
    imgElement.alt = link.imgAlt;
    if(link.imgSrc===''){
      console.log('i am here');
      imgElement.src=nexaWorldContent.links[1].imgSrc;
      imgElement.alt = nexaWorldContent.links[1].imgAlt;
    }    
    
    anchor.appendChild(imgElement);
    listItem.appendChild(anchor);
    ul.appendChild(listItem);

  

    // Add event listener to change main image on hover
    anchor.addEventListener('mouseover', () => {
      document.querySelector('.nexa-world__img img').src = link.imgSrc;
      document.querySelector('.nexa-world__img img').alt = link.imgAlt;
    });

    //Reset main image on mouseout (optional)
    // anchor.addEventListener('mouseout', () => {
    //   const mainImg = document.querySelector('.nexa-world__img img');
    //   mainImg.src = nexaWorldContent.links.length > 0 ? nexaWorldContent.links[0].imgSrc : '';
    //   mainImg.alt = nexaWorldContent.links.length > 0 ? nexaWorldContent.links[0].imgAlt : '';
    // });
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

  // Function to handle hover effects
  function updateHoverEffects() {
    const links = document.querySelectorAll('.nexa-world__links a');
    const teaser = document.querySelector('.nexa-world__teaser');
    const container = document.querySelector('.nexa-world__container');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    links.forEach(link => {
      link.addEventListener('mouseover', function() {
        const imgSrc = this.querySelector('img').src;
        console.log('Line 141'+imgSrc);
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

  // Initialize hover effects
  document.addEventListener('DOMContentLoaded', () => {
    updateHoverEffects();
    window.addEventListener('resize', updateHoverEffects);
  });
}

// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});
