import { fetchPlaceholders } from '../../scripts/aem.js';
import carouselUtils from '../../utility/carouselUtils.js';

export default async function decorate(block) {
  const [showCtaEl, ctaTextEl, ...bannerItemsEl] = block.children;
  const ctaVisibility = showCtaEl?.textContent?.trim();
  const ctaText = ctaTextEl?.textContent?.trim();
  let ctaHtml = '';
  if (ctaVisibility === 'true' && ctaText) {
    ctaHtml = `<p>${ctaText}</p>`;
  }
  const { publishDomain } = await fetchPlaceholders();
  const bannerItems = bannerItemsEl?.map((itemEl, index) => {
    const [videoEl, imageEl, altTextEl, titleEl, subTitleEl, subTextEl] = itemEl.children;
    const videoUrl = videoEl?.querySelector('a')?.textContent?.trim();
    const image = imageEl?.querySelector('picture');
    const altText = altTextEl?.textContent?.trim() || 'Image';
    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    title?.classList?.add('hero-banner__title');
    const subTitle = subTitleEl?.textContent?.trim();
    const subText = subTextEl?.textContent?.trim();
    let assetHtml = '';
    if (videoUrl) {
      assetHtml = `
        <div class="hero-banner__video-container">
          <video src="${publishDomain + videoUrl}" muted="muted" width="100%" autoplay loop></video>
          <button class="hero-banner__mute-btn">Mute</button>
        </div>
      `;
    } else if (image) {
      const img = image.querySelector('img');
      img?.setAttribute('width', '100%');
      img?.removeAttribute('height');
      img?.setAttribute('alt', altText);
      assetHtml = `
        <div class="hero-banner__image-container>
          ${image.outerHTML}
        </div>
      `;
    }
    itemEl.innerHTML = `
    <div class="hero-banner__asset-container">
      ${assetHtml}
      <div>
        <div>
          ${(title) ? title.outerHTML : ''}
          ${(subTitle) ? `<p>${subTitle}</p>` : ''}
        </div>
        ${(subText) ? `<p>${subText}</p>` : ''}
      </div>
    </div>
    `;
    return itemEl.outerHTML;
  }).join('');

  block.innerHTML = `
    <div class="hero-banner__container">
      <div class="hero-banner__carousel">
        <div class="hero-banner__slides">
          ${bannerItems}
        </div>
      </div>
      ${ctaHtml}
    </div>
  `;
  carouselUtils.init(block.querySelector('.hero-banner__carousel'), 'hero-banner__slides');
}
