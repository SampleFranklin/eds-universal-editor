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
        <span class="location-icon fas fa-map-marker-alt"></span>
        ${nexaWorldContent.cta.outerHTML}
      </div>
    `;

  // Construct Nexa World HTML structure
  const nexaWorldHtml = `
    <div class="nexa-world__content">
      ${nexaWorldContent.pretitle ? `<p class="pre-title">${nexaWorldContent.pretitle}</p>` : ''}
      ${nexaWorldContent.title ? `<p class="title">${nexaWorldContent.title}</p>` : ''}
      ${nexaWorldContent.description ? `${nexaWorldContent.description}` : ''}
      ${nexaWorldContent.cta ? `<div class="nexa-world__action">${nexaWorldContent.cta.outerHTML}</div>` : ''}

    </div>
  `;
  // Links data
    const links = [
      { text: 'NEXA Blue', href: '#' },
      { text: 'Lifestyle', href: '#' },
      { text: 'Music', href: '#' },
      { text: 'Socials', href: '#' }
    ];

    // Create links with icons
    const linksHtml = links.map(link => `
      <li class="cta">
        <a href="${link.href}" class="cta-link">
          <span class="icon fas fa-map-marker-alt"></span>
          <span class="cta-text">${link.text}</span>
        </a>
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
          <img src="/" alt="image" />
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
  }