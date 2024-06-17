import { sanitizeHtml } from "../../scripts/utils.js";

export default function decorate(block) {
  getTeaser(block);
}

export function getTeaser(block) {
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
  ] = block.children;
  const image = imageEl?.querySelector('picture');
  if (image) {
    initImage(image, altTextEl)
  }

  const pretitle = pretitleEl?.textContent?.trim();
  const title = titleEl?.textContent?.trim();
  const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
  const styleText = styleEl?.textContent?.trim();
  let style = [];
  if(styleText) {
    style = styleText.split(',');
  } else {
    style = ['light-teaser', 'buyers-guide-teaser'];
  }

  const primaryCta = getCta(primaryCtaLinkEl, primaryCtaTargetEl);
  const secondaryCta = getCta(secondaryCtaLinkEl, secondaryCtaTargetEl);

  if (primaryCta) {
    const primaryText = primaryCtaTextEl?.textContent?.trim() || '';
    primaryCta?.classList.add('primary__btn');
    primaryCta.innerHTML = '';
    primaryCta.insertAdjacentHTML('beforeend', sanitizeHtml(primaryText));
  }

  if (secondaryCta) {
    secondaryCta.innerHTML = ''
    secondaryCta.insertAdjacentHTML('beforeend', sanitizeHtml(secondaryCtaTextEl?.textContent?.trim() || ''));
    secondaryCta.classList.add('secondary__btn');
  }

  let ctaHtml = ``
  if (primaryCta || secondaryCta) {
    ctaHtml = `
      <div class="teaser__actions">
        ${(primaryCta) ? primaryCta.outerHTML : ''}
        ${(secondaryCta) ? secondaryCta.outerHTML : ''}
      </div>
    `
  }
  block.classList.add(...style);
  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend',
    sanitizeHtml(`
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
  return block;
}

function getCta(linkEl, targetEl) {
  const link = linkEl?.querySelector('.button-container a');
  const target = targetEl?.textContent?.trim() || '_self';
  link?.setAttribute('target', target);
  return link;
}

function initImage(image, altTextEl) {
  const img = image.querySelector('img');
  img.removeAttribute('width');
  img.removeAttribute('height');
  const alt = altTextEl?.textContent?.trim() || 'image';
  img.setAttribute('alt', alt);
}
