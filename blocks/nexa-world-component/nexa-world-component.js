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
    ] = block.children;

    const pretitle = pretitleEl?.textContent?.trim() || '';
    const title = titleEl?.textContent?.trim() || '';
    const description = Array.from(descriptionEl.querySelectorAll('p')).map(p => p.outerHTML).join('');
    const cta = (ctaLinkEl) ? ctaUtils.getLink(ctaLinkEl, ctaTextEl, ctaTargetEl) : null;

    return {
      pretitle,
      title,
      description,
      cta,
    };
  }

  // Function to extract links and their respective images
  function getLinksContent() {
    const linksEl = block.querySelector('.links');
    if (!linksEl) return [];

    return Array.from(linksEl.children).map(linkEl => {
      const text = linkEl.querySelector('.link-text')?.textContent?.trim() || '';
      const href = linkEl.querySelector('.link-href')?.textContent?.trim() || '#';
      const img = linkEl.querySelector('.link-img')?.textContent?.trim() || '/path/to/default-image.jpg';
      return { text, href, img };
    });
  }

  // Get Nexa World content from the block
  const nexaWorldContent = getNexaWorldContent();
  const linksContent = getLinksContent();

  // Add 'btn-title' class to CTA element if it exists
  if (nexaWorldContent.cta) {
    nexaWorldContent.cta.classList.add('btn-title');
  }

  // Construct CTA with icon
  const ctaWithIconHtml = `
    <div class="nexa-world__action">
      <a href="${nexaWorldContent.cta?.href || '#'}" title="${nexaWorldContent.cta?.title || ''}" class="button btn-title" target="${nexaWorldContent.cta?.target || '_self'}">
        <p>${nexaWorldContent.cta?.textContent }</p>
        <span class="location-icon"><img src="/content/dam/nexa-world/north_east.svg" alt="Image arrow"></span>
      </a>
    </div>
  `;

  // Construct Nexa World HTML structure
  const nexaWorldHtml = `
    <div class="nexa-world__content">
      <div class="nexa-world__title">
        ${nexaWorldContent.pretitle ? `<p class="pre-title">${nexaWorldContent.pretitle}</p>` : ''}
        ${nexaWorldContent.title ? `<p class="title">${nexaWorldContent.title}</p>` : ''}
      </div>
      ${nexaWorldContent.description ? `<p class="description">${nexaWorldContent.description}</p>` : ''}
      ${ctaWithIconHtml}
    </div>
  `;

  // Create links
  const linksHtml = linksContent.map(link => `
    <li data-img="${link.img}">
      <a href="${link.href}">${link.text}</a>
    </li>
  `).join('');

  // Create the teaser HTML structure
  const nexaWorldTeaser = `
    <div class="nexa-world__teaser">
      <div class="nexa-world__links">
        <ul class="list-container">
          ${linksHtml}
        </ul>
      </div>
    
  `;

  // Replace the block's HTML with the constructed Nexa World HTML and teaser if present
  block.innerHTML = `
    <div class="nexa-world__container">
      ${nexaWorldHtml}
      ${nexaWorldTeaser}
    </div>
  `;

  // Add event listeners to links to change the image on hover
  document.addEventListener('DOMContentLoaded', function() {
    const linksList = block.querySelectorAll('.nexa-world__links li');
    const imgElement = block.querySelector('.nexa-world__img img');
    const defaultImg = imgElement.src;

    linksList.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const imgSrc = link.getAttribute('data-img');
        imgElement.setAttribute('src', imgSrc);
      });

      link.addEventListener('mouseleave', () => {
        imgElement.setAttribute('src', defaultImg);
      });
    });
  });
}

// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});
