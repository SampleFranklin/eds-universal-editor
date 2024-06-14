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
  const description = block.querySelector('div:nth-child(5) div');
  const target = block.querySelector('div:nth-child(6)')?.textContent?.trim() || '_self';
  const ctaLink = description.querySelector('.button-container');

  let ctaHtml = '';
  if (ctaLink) {
    ctaLink.querySelector('a').setAttribute('target', target);
    ctaHtml = ctaLink.innerHTML;
    ctaLink.remove();
  }

  block.innerHTML = `
        <div class="teaser-card">
            ${imageHtml}
            <div class="teaser-content">
                <div>
                    ${(pretitle) ? `<div class="teaser-pretitle"><p>${pretitle}</p></div>` : ''}
                    ${(title) ? `<div class="teaser-title"><h3>${title}</h3></div>` : ''}
                    ${(description?.innerHTML) ? `<div class="teaser-description">${description.innerHTML}</div>` : ''}
                </div>
                ${(ctaHtml) ? `<div class="teaser-actions">${ctaHtml}</div>` : ''}
            </div>
        </div>
    `;
}