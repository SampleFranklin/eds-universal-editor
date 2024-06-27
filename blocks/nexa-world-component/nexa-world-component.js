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

  // Get Nexa World content from the block
  const nexaWorldContent = getNexaWorldContent();

  // Add 'btn-title' class to CTA element if it exists
  if (nexaWorldContent.cta) {
    nexaWorldContent.cta.classList.add('btn-title');
  }

  // Construct CTA with icon
  const ctaWithIconHtml = `
    <div class="nexa-world__action">
      <a href="${nexaWorldContent.cta?.href || '#'}" title="${nexaWorldContent.cta?.title || ''}" class="button btn-title" target="${nexaWorldContent.cta?.target || '_self'}">
        <p>${nexaWorldContent.cta?.textContent || 'Discover NEXA World'}</p>
        <span class="location-icon"><svg class="fas fa-map-marker-alt"><"img src ="/content/dam/nexa-world/north_east.svg" alt ="image arrow"></span>
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

  // Links data with image paths
  const links = [
    { text: 'NEXA Blue', href: '#', img: '/content/dam/nexa-world/Group%201321315474.png' },
    { text: 'Lifestyle', href: '#', img: '/path/to/lifestyle-image.jpg' },
    { text: 'Music', href: '#', img: '/path/to/music-image.jpg' },
    { text: 'Socials', href: '#', img: '/path/to/socials-image.jpg' }
  ];

  // Create links
  const linksHtml = links.map(link => `
    <li data-img="${link.img}">
      <a href="${link.href}">${link.text}</a>
    </li>
  `).join('');

  // Create the teaser HTML structure
  const nexaWorldTeaser = `
    <div class="nexa-world__teaser">
      <div class="nexa-world__links">
        <ul>
          ${linksHtml}
        </ul>
      </div>
      <div class="nexa-world__img">
        <img src="/content/dam/nexa-world/Group%201321315474.png" alt="image text" /> <!-- Replace with the default image path -->
      </div>
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
  const linksList = block.querySelectorAll('.nexa-world__links li');
  const imgElement = block.querySelector('.nexa-world__img img');

  linksList.forEach(link => {
    link.addEventListener('mouseover', () => {
      const imgSrc = link.getAttribute('data-img');
      imgElement.setAttribute('src', imgSrc);
    });
    link.addEventListener('mouseout', () => {
      imgElement.setAttribute('src', '/content/dam/nexa-world/Group%201321315474.png'); // Set back to the default image
    });
  });
}

// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});
