export default function decorate(block) {
  const [imageEl, altTextEl, pretitleEl, titleEl, descriptionEl, targetEl, styleEl] = block.children;
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
  const description = Array.from(descriptionEl.querySelectorAll('p:not(.button-container)')).map((p) => p.outerHTML).join('');
  const target = targetEl?.textContent?.trim() || '_self';
  const cta = descriptionEl?.querySelector('.button-container a');
  cta?.setAttribute('target', target);
  cta?.classList.add('guide__cta');
  const style = styleEl?.textContent?.trim() || 'default-teaser';

  if(cta && 'black-teaser' === style) {
    const ctaText = cta.textContent?.trim();
    cta.innerHTML = `
        <p>${ctaText}</p>
        <div class='arrow_icon'></div>
    `;
  }

  block.classList.add(style);
  block.innerHTML = `
        <div class="teaser__card">
            ${(image) ? `<div class="teaser__image">${image.outerHTML}</div>` : ''}
            <div class="teaser__content">
                <div>
                    ${(pretitle) ? `<div class="teaser__pretitle"><p>${pretitle}</p></div>` : ''}
                    ${(title) ? `<div class="teaser__title"><h3>${title}</h3></div>` : ''}
                    ${(description) ? `<div class="teaser__description">${description}</div>` : ''}
                </div>
                ${(cta) ? `<div class="teaser-actions">${cta.outerHTML}</div>` : ''}
            </div>
        </div>
    `;
}
