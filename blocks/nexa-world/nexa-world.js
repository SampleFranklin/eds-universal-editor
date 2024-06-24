import utility from './utility.js';
import ctaUtils from './ctaUtils.js';

export default function decorate(block) {
document.addEventListener('DOMContentLoaded', function() {
        const listItems = document.querySelectorAll('.list-container li');
        const images = document.querySelectorAll('.image-container img');
    
        listItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                images.forEach(img => img.classList.remove('active'));
                images[index].classList.add('active');
            });
    
            item.addEventListener('mouseleave', () => {
                images[index].classList.remove('active');
            });
        });
    });

/*function initImage(image, altTextEl) {
      const img = image.querySelector('img');
      if (img) {
        img.removeAttribute('width');
        img.removeAttribute('height');
        const alt = altTextEl?.textContent?.trim() || 'image';
        img.setAttribute('alt', alt);
      }
    }*/

    const [
      imageEl,
      altTextEl,
      pretitleEl,
      titleEl,
      descriptionEl,
      primaryCtaTextEl,
      primaryCtaLinkEl,
      primaryCtaTargetEl,
      styleEl,
    ] = block.children;

    /*const image = imageEl?.querySelector('picture');
    if (image) {
      initImage(image, altTextEl);
    }*/

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

    const primaryCta = ctaUtils.getLink(primaryCtaLinkEl, primaryCtaTextEl, primaryCtaTargetEl, 'button btn-title');

    let ctaHtml = '';
    if (primaryCta) {
      ctaHtml = `
        <div class="nexa-world__action">
          ${primaryCta}
        </div>
      `;
    }

    block.classList.add(...style);
    block.innerHTML = '';
    block.insertAdjacentHTML(
      'beforeend',
      utility.sanitizeHtml(`
        <div class="nexa-world__container">
          <div class="nexa-world__content">
            <div class="nexa-world__title">
              ${pretitle ? `<p class="pre-title">${pretitle}</p>` : ''}
              ${title ? `<p class="title">${title}</p>` : ''}
            </div>
            ${description ? `<p class="description">${description}</p>` : ''}
            ${ctaHtml}
          </div>
          <div class="nexa-world__teaser">
            <div class="nexa-world__links">
              <ul>
                <li>NEXA Blue</li>
                <li>Lifestyle</li>
                <li>Music</li>
                <li>Socials</li>
              </ul>
            </div>
            <div class="nexa-world__img">
              ${image ? image.outerHTML : ''}
            </div>
          </div>
        </div>
      `),
    );
    return block;
  }


