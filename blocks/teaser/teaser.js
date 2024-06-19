// teaser.js
import CTA from '../utility/cta.js';
import { sanitizeHtml } from '../../scripts/utils.js';

export class Teaser {
  constructor(block) {
    this.block = block;
    this.cta = null;
  }

  getTeaser() {
    const [
      imageEl,
      altTextEl,
      pretitleEl,
      titleEl,
      descriptionEl,
      primaryCtaTextEl,
      primaryCtaLinkEl,
      primaryCtaTargetEl,
      secondaryCtaTextEl,
      secondaryCtaLinkEl,
      secondaryCtaTargetEl,
      styleEl
    ] = this.block.children;

    const image = imageEl?.querySelector('picture');
    if (image) {
      this.initImage(image, altTextEl);
    }

    const pretitle = pretitleEl?.textContent?.trim();
    const title = titleEl?.textContent?.trim();
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
    const styleText = styleEl?.textContent?.trim();
    let style = [];
    if (styleText) {
      style = styleText.split(',');
    } else {
      style = ['light-teaser', 'buyers-guide-teaser'];
    }

    const primaryCta = CTA.getLink(primaryCtaLinkEl, primaryCtaTextEl, primaryCtaTargetEl, 'primary__btn');
    const secondaryCta = CTA.getLink(secondaryCtaLinkEl, secondaryCtaTextEl, secondaryCtaTargetEl, 'secondary__btn');

    let ctaHtml = '';
    if (primaryCta || secondaryCta) {
      ctaHtml = `
        <div class="teaser__actions">
          ${(primaryCta) ? primaryCta.outerHTML : ''}
          ${(secondaryCta) ? secondaryCta.outerHTML : ''}
        </div>
      `;
    }

    this.block.classList.add(...style);
    this.block.innerHTML = '';
    this.block.insertAdjacentHTML('beforeend', sanitizeHtml(`
      <div class="teaser__card">
        ${(image) ? `<div class="teaser__image">${image.outerHTML}</div>` : ''}
        <div class="teaser__content">
          <div class="teaser__info">
            ${(pretitle) ? `<div class="teaser__pretitle"><p>${pretitle}</p></div>` : ''}
            ${(title) ? `<div class="teaser__title"><h3>${title}</h3></div>` : ''}
            ${(description) ? `<div class="teaser__description">${description}</div>` : ''}
          </div>
          ${ctaHtml}
        </div>
      </div>
    `));

    return this.block;
  }

  initImage(image, altTextEl) {
    const img = image.querySelector('img');
    img.removeAttribute('width');
    img.removeAttribute('height');
    const alt = altTextEl?.textContent?.trim() || 'image';
    img.setAttribute('alt', alt);
  }
}

export default function decorate(block) {
  const teaser = new Teaser(block);
  teaser.getTeaser();
}
