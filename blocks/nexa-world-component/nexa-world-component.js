import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';
import ctaUtils from '../../utility/ctaUtils.js';

export default function decorate(block) {
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
    const description = descriptionEl?.textContent?.trim() || '';
    const cta = (ctaLinkEl) ? {
      href: ctaLinkEl.querySelector('a')?.href || '#',
      title: ctaTextEl.querySelector('a')?.title || '',
      target: ctaTargetEl?.textContent?.trim() || '_self',
      textContent: ctaTextEl?.textContent?.trim() || ''
    } : null;
    return {
      pretitle,
      title,
      description,
      cta,
    };
  }

  function getCtaElements(ctasEl) {
    return ctasEl.map((element) => {
      const [imageEl, altTextEl, ctaTextEl, linkEl, targetEl] = element.children;
      const imgSrc = imageEl?.querySelector('img')?.src || '';
      const altText = altTextEl?.textContent?.trim() || 'icon';
      const ctaText = ctaTextEl?.textContent?.trim() || '';
      const link = linkEl?.querySelector('a')?.href || '#';
      const target = targetEl?.textContent?.trim() || '_self';
      element.innerHTML = `
        <a href="${link}" target="${target}" class="nexa-world__link" title="${ctaText}">
          <img src="${imgSrc}" alt="${altText}" loading="lazy">
          <p>${ctaText}</p>
        </a>
      `;
      moveInstrumentation(element, element.firstElementChild);
      return element.innerHTML;
    }).join('');
  }

  // Get Nexa World content from the block
  const nexaWorldContent = getNexaWorldContent();

  // Construct CTA with icon
  const ctaHtml = `
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
      ${ctaHtml}
    </div>`;

  // Get and format CTA elements
  const ctasEl = block.querySelectorAll('.cta-element'); // Replace with actual selector
  const ctaElements = getCtaElements(ctasEl);

  // Replace the block's HTML with the constructed Nexa World HTML and CTA elements
  block.innerHTML = `
    <div class="nexa-world__container">
      ${nexaWorldHtml}
      <div class="nexa-world__links">
        ${ctaElements}
      </div>
    </div>`;
}

// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});
