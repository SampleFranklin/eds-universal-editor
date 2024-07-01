import { fetchPlaceholders } from '../../scripts/aem.js';
import carouselUtils from '../../utility/carouselUtils.js';

export default async function decorate(block) {
  const [showCtaEl, ctaTextEl, ...bannerItemsEl] = block.children;
  const ctaVisibility = showCtaEl?.textContent?.trim();
  const ctaText = ctaTextEl?.textContent?.trim();
  let ctaHtml = '';
  if (ctaVisibility === 'true' && ctaText) {
    ctaHtml = `
    <div class="hero-banner__cta-container">
      <p>${ctaText}</p>
      <span class="hero-banner__primary-btn"></span>
    </div>
    `;
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
        <div class="hero-banner__asset hero-banner__video-container">
          <video src="${publishDomain + videoUrl}" muted="muted" width="100%" autoplay loop></video>
        </div>
      `;
    } else if (image) {
      const img = image.querySelector('img');
      img?.setAttribute('width', '100%');
      img?.removeAttribute('height');
      img?.setAttribute('alt', altText);
      assetHtml = `
        <div class="hero-banner__asset hero-banner__image-container>
          ${image.outerHTML}
        </div>
      `;
    }
    itemEl.innerHTML = `
      <div class="hero-banner__content">
        ${assetHtml}
        <div class="hero-banner__info">
          <div class="hero-banner__top-section">
              ${(title) ? title.outerHTML : ''}
              ${(subTitle) ? `<p class="hero-banner__subtitle">${subTitle}</p>` : ''}
          </div>
          <div class="hero-banner__bottom-section">
            ${(videoUrl) ? `<div class="hero-banner__mute-btn"></div>` : ''}
            ${(subText) ? `<p class="hero-banner__subtext">${subText}</p>` : ''}
          </div>
        </div>
      </div>
    `;
    return itemEl.outerHTML;
  });

  block.innerHTML = `
    <div class="hero-banner__container">
      <div class="hero-banner__carousel">
        <div class="hero-banner__slides">
          ${bannerItems.join('')}
        </div>
      </div>
      ${ctaHtml}
    </div>
  `;

  carouselUtils.init(
    block.querySelector('.hero-banner__carousel'), 'hero-banner__slides', (currentSlide, targetSlide) => {
      currentSlide.querySelector('video')?.pause();
      targetSlide.querySelector('video')?.play();
    }
  );

  block.querySelectorAll('.hero-banner__mute-btn').forEach((el) => {
    const video = el.closest('.hero-banner__content')?.querySelector('video');
    el.addEventListener('click', (e) => {
      video.muted = !video.muted
    });
  });
}
