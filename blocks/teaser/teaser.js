export default function decorate(block) {
  const [imageEl, altTextEl, pretitleEl, titleEl, descriptionEl, targetEl] = block.children;
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

  block.innerHTML = `
        <div class="teaser-card">
            ${(image) ? `<div class="teaser-image">${image.outerHTML}</div>` : ''}
            <div class="teaser-content">
                <div>
                    ${(pretitle) ? `<div class="teaser-pretitle"><p>${pretitle}</p></div>` : ''}
                    ${(title) ? `<div class="teaser-title"><h3>${title}</h3></div>` : ''}
                    ${(description) ? `<div class="teaser-description">${description}</div>` : ''}
                </div>
                ${(cta) ? `<div class="teaser-actions">${cta.outerHTML}</div>` : ''}
            </div>
        </div>
    `;
}
