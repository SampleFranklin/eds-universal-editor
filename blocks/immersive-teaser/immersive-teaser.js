import { sanitizeHtml } from '../../scripts/utils.js';
import { getTeaser } from '../teaser/teaser.js';

function getImmersiveTeaser(block) {
  const [
    imageEl,
    altTextEl,
    pretitleEl,
    titleEl,
    descriptionEl,
    ctaTextEl,
    ctaLinkEl,
    ctaTargetEl,
  ] = block.children;
  const image = imageEl?.querySelector('picture');
  if (image) {
    const img = image.querySelector('img');
    img.removeAttribute('width');
    img.removeAttribute('height');
    const alt = altTextEl?.textContent?.trim() || 'image';
    img.setAttribute('alt', alt);
  }

  const pretitle = pretitleEl?.textContent?.trim();
  const title = titleEl?.textContent?.trim();
  const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
  const cta = ctaLinkEl?.querySelector('.button-container a');
  if (cta) {
    const ctaText = ctaTextEl?.textContent?.trim() || '';
    const target = ctaTargetEl?.textContent?.trim() || '_self';
    cta.setAttribute('target', target);
    cta.textContent = ctaText;
  }

  return {
    image,
    pretitle,
    title,
    description,
    cta,
  };
}

export default function decorate(block) {
  const immersiveTeaser = getImmersiveTeaser(block);
  const teaserEl = block.children[8];
  let teaser;
  if (teaserEl?.innerHTML) {
    teaser = getTeaser(teaserEl);
    teaser.classList.add('teaser-wrapper');
  }
  immersiveTeaser.cta?.classList.add('btn-title');
  const immersiveTeaserHtml = sanitizeHtml(`
        ${(immersiveTeaser.image) ? immersiveTeaser.image.outerHTML : ''}
        <div class="banner-content">
            ${(immersiveTeaser.pretitle) ? `<p>${immersiveTeaser.pretitle}</p>` : ''}
            ${(immersiveTeaser.title) ? `<h2>${immersiveTeaser.title}</h2>` : ''}
            ${(immersiveTeaser.description) ? `${immersiveTeaser.description}` : ''}
            ${(immersiveTeaser.cta) ? `<div class="action-btn">${immersiveTeaser.cta.outerHTML}</div>` : ''}
        </div>
    `);

  block.innerHTML = `
        <div class="banner-container">
            ${immersiveTeaserHtml}
            ${(teaser?.innerHTML) ? teaser.outerHTML : ''}
        </div>
    `;
}
