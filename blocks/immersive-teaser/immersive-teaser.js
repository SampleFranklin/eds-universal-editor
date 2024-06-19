import { sanitizeHtml } from '../../scripts/utils.js';
import { Teaser } from '../teaser/teaser.js';
import CTA from '../utility/cta.js';

class ImmersiveTeaser {
  constructor(block) {
    this.block = block;
    this.teaser = null;
    this.teaserEl = block.children[8];
    this.immersiveData = this.getImmersiveTeaserData();
  }

  decorate() {
    if (this.teaserEl?.innerHTML) {
      this.teaser = new Teaser(this.teaserEl);
      this.teaser.getTeaser();
      this.teaser.block.classList.add('teaser-wrapper');
    }

    if (this.immersiveData.cta) {
      this.immersiveData.cta.classList.add('btn-title');
    }

    const immersiveTeaserHtml = sanitizeHtml(`
      ${(this.immersiveData.image)? this.immersiveData.image.outerHTML : ''}
      <div class="banner-content">
        ${(this.immersiveData.pretitle)? `<p>${this.immersiveData.pretitle}</p>` : ''}
        ${(this.immersiveData.title)? `<h2>${this.immersiveData.title}</h2>` : ''}
        ${(this.immersiveData.description)? `${this.immersiveData.description}` : ''}
        ${(this.immersiveData.cta)? `<div class="action-btn">${this.immersiveData.cta.outerHTML}</div>` : ''}
      </div>
    `);

    this.block.innerHTML = `
      <div class="banner-container">
        ${immersiveTeaserHtml}
        ${(this.teaser?.block?.innerHTML)? this.teaser.block.outerHTML : ''}
      </div>
    `;
  }

  getImmersiveTeaserData() {
    const [
      imageEl,
      altTextEl,
      pretitleEl,
      titleEl,
      descriptionEl,
      ctaTextEl,
      ctaLinkEl,
      ctaTargetEl,
    ] = this.block.children;

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
    cta ? new CTA(ctaLinkEl, ctaTextEl, ctaTargetEl).getLink() : null;

    return {
      image,
      pretitle,
      title,
      description,
      cta,
    };
  }
}

export default function decorate(block) {
  const immersiveTeaser = new ImmersiveTeaser(block);
  immersiveTeaser.decorate();
}
