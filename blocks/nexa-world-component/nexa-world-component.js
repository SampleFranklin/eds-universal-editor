import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';
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
      ctaTargetEl,
      ...linkEls // Get the rest of the elements as link elements
    ] = block.children;
    const image = imageEl?.querySelector('picture');
    if (image) {
      initImage(image, altTextEl);
    }

    const pretitle = pretitleEl?.textContent?.trim() || '';
    const title = titleEl?.textContent?.trim() || '';
    const description = Array.from(descriptionEl.querySelectorAll('p')).map(p => p.outerHTML).join('');
    const cta = (ctaLinkEl) ? {
      href: ctaLinkEl.querySelector('a')?.href || '#',
      title: ctaLinkEl.querySelector('a')?.title || '',
      target: ctaLinkEl.querySelector('a')?.target || '_self',
      textContent: ctaTextEl?.textContent?.trim() || ''
      
    } : null;
    

    const links = Array.from(linkEls).map(linkEl => ({
      text: linkEl.textContent.trim(),
      href: linkEl.querySelector('a')?.href || '#',
      target: ctaLinkEl.querySelector('a')?.target || '',
      imgSrc: linkEl.getAttribute('data-img-src') || '', 
      imgAlt: linkEl.getAttribute('data-img-alt') || '', 
      
    }));
   

    return {
      pretitle,
      title,
      description,
      cta,
      links,
    };
  }

  // Get Nexa World content from the block
  const nexaWorldContent = getNexaWorldContent();

  // Construct CTA with icon
  const ctaWithIconHtml = `
    <div class="nexa-world__action">
      <a href="${nexaWorldContent.cta?.href || '#'}" title="${nexaWorldContent.cta?.title || ''}" class="button btn-title" target="${nexaWorldContent.cta?.target || '_self'}">
        <p>${nexaWorldContent.cta?.textContent}</p>
        <span class="location-icon"><img src="/content/dam/nexa-world/north_east.svg" alt="Image arrow"></span>
      </a>
    </div>`;

  // Construct Nexa World HTML structure
  const nexaWorldHtml = `
    <div class="nexa-world__content">
      <div class="nexa-world__title">
        ${nexaWorldContent.pretitle ? `<p class="pre-title">${nexaWorldContent.pretitle}</p>` : ''}
        ${nexaWorldContent.title ? `<p class="title">${nexaWorldContent.title}</p>` : ''}
      </div>
      ${nexaWorldContent.description ? `<p class="description">${nexaWorldContent.description}</p>` : ''}
      ${ctaWithIconHtml}
      <div class="nexa-world__img">
      <img src="${nexaWorldContent.imgSrc}" alt="${nexaWorldContent.imgAlt}" />
    </div>
    </div>`;

  // Create the links HTML structure
  const ul = document.createElement('ul');
  ul.classList.add("list-container");
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

  // Add event listeners to links to change the image on hover
  const linksList = block.querySelectorAll('.nexa-world__links li');
  const imgElement = block.querySelectorAll('.nexa-world__img img');

  linksList.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const imgSrc = link.querySelectorAll('img').getAttribute('src');
      imgElement.setAttribute('src', imgSrc);
    });

    link.addEventListener('mouseleave', () => {
      imgElement.setAttribute('src', nexaWorldContent.imgSrc);
    });
  });
}

// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});
