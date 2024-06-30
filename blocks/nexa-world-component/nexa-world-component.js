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
      iconEl,  // Assuming this element contains the icon path
      ...linkEls // Get the rest of the elements as link elements
    ] = block.children;

    const pretitle = pretitleEl?.textContent?.trim() || '';
    const title = titleEl?.textContent?.trim() || '';
    const description = Array.from(descriptionEl.querySelectorAll('p')).map(p => p.outerHTML).join('');
    const cta = (ctaLinkEl) ? {
      href: ctaLinkEl.querySelector('a')?.href || '#',
      title: ctaLinkEl.querySelector('a')?.title || '',
      target: ctaLinkEl.querySelector('a')?.target || '_self',
      textContent: ctaTextEl?.textContent?.trim() || ''
    } : null;
    
    const iconPath = iconEl?.textContent?.trim() || '';  // Extract icon path from authoring

    const links = Array.from(linkEls).map(linkEl => ({
      text: linkEl.textContent.trim(),
      href: linkEl.querySelector('a')?.href || '#',
      target: ctaLinkEl.querySelector('a')?.target || '_self',
      iconSrc: linkEl.querySelector('a')?.getAttribute('data-icon-src') || ''  // Use the extracted icon path
    }));

    return {
      pretitle,
      title,
      description,
      cta,
      links,
      iconSrc: iconPath  // Include icon path in the return object
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
      <div class="nexa-world__icon">
        <img src="${nexaWorldContent.iconSrc}" />
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

    const iconElement = document.createElement('icon');
    iconElement.src = link.iconSrc; // Use the dynamically extracted icon path
    iconElement.alt = "Icon";
    anchor.appendChild(iconElement); // Add the icon to the link

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

  // Add event listeners to links to change the icon on hover
  const linksList = block.querySelectorAll('.nexa-world__links li');
  const iconElement = block.querySelector('.nexa-world__icon icon');

  linksList.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const iconSrc = link.querySelector('img').getAttribute('src');
      iconElement.setAttribute('src', iconSrc);
    });

    link.addEventListener('mouseleave', () => {
      iconElement.setAttribute('src', nexaWorldContent.iconSrc);
    });
  });
}

// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});
