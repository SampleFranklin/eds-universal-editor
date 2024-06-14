export default function decorate(block) {
  const image = block.querySelector('div:nth-child(1) picture');
  const altText = block.querySelector('div:nth-child(2)')?.textContent?.trim() || 'image';
  let imageHtml = '';
  if (image) {
    const img = image.querySelector('img');
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.setAttribute('alt', altText);
    imageHtml = `
            <div class="teaser-image">
                ${image.outerHTML}
            </div>
        `;
  }

  const pretitle = block.querySelector('div:nth-child(3)')?.textContent?.trim();
  const title = block.querySelector('div:nth-child(4)')?.textContent?.trim();
  const description = Array.from(block.querySelectorAll('div:nth-of-type(5) p:not(.button-container)')).map((p) => p.innerText).join(' ');
  const ctaLink = block.querySelector('div:nth-of-type(5) .button-container a');
  const target = block.querySelector('div:nth-child(6)')?.textContent?.trim() || '_self';

  if (ctaLink) {
    ctaLink.setAttribute('target', target);
  }

  block.innerHTML = `
        <div class="teaser-card">
            ${imageHtml}
            <div class="teaser-content">
                <div>
                    ${(pretitle) ? `<div class="teaser-pretitle"><p>${pretitle}</p></div>` : ''}
                    ${(title) ? `<div class="teaser-title"><h3>${title}</h3></div>` : ''}
                    ${(description) ? `<div class="teaser-description"><p>${description}</p></div>` : ''}
                </div>
                ${(ctaLink) ? `<div class="teaser-actions">${ctaLink.outerHTML}</div>` : ''}
            </div>
        </div>
    `;
}