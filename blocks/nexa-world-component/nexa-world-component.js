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
    const pretitle = pretitleEl?.textContent?.trim() || '';
    const title = titleEl?.textContent?.trim() || '';
    const description = descriptionEl?.textContent?.trim();
    const cta = (ctaLinkEl) ? {
      href: ctaLinkEl.querySelector('a')?.href || '#',
      title: ctaLinkEl.querySelector('a')?.title || '',
      target: ctaLinkEl.querySelector('a')?.target || '_self',
      textContent: ctaTextEl?.textContent?.trim() || ''
    } : null;
    const links = Array.from(linkEls).map(linkEl => ({
      text: linkEl.textContent.trim(),
      href: linkEl.querySelector('a')?.href || '#',
      target: linkEl.textContent?.trim() || '_self',
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
 // Select all link elements within .nexa-world__links
const links = block.querySelectorAll('.nexa-world__links a');

// Select the img element within .nexa-world__img
const imgElement = block.querySelector('.nexa-world__img img');

// Store the original src property value of the img element
const originalImgSrc = imgElement.src;

// Iterate over each link and add event listeners
links.forEach(link => {
  const linkImg = link.querySelector('img');

  // Store the original src property value of the link's img element
  const originalLinkImgSrc = linkImg.src;

  link.addEventListener('mouseenter', () => {
    // Change the src property of the img element to the link's img src property
    imgElement.src = linkImg.src;
  });

  link.addEventListener('mouseleave', () => {
    // Reset the src property of the img element to the original src property value
    imgElement.src = originalImgSrc;
  });
});
}
// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});