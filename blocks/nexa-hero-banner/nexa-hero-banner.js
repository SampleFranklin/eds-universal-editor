import { fetchPlaceholders } from '../../scripts/aem.js';

export default function decorate(block) {
  const [showCtaEl, ctaTextEl, ...bannerItemsEl] = block.children;
  const ctaVisibility = showCtaEl?.textContent?.trim();
  const ctaText = ctaTextEl?.textContent?.trim();
  let ctaHtml = '';
  if (ctaVisibility === 'true' && ctaText) {
    ctaHtml = `<p>${ctaText}</p>`;
  }
  const carouselDots = [];
  const videoUrls = [];
  const bannerItems = bannerItemsEl?.map((itemEl, index) => {
    const [videoEl, imageEl, altTextEl, titleEl, subTitleEl, subTextEl] = itemEl.children;
    const videoUrl = videoEl?.querySelector('a')?.textContent?.trim();
    const image = imageEl?.querySelector('picture');
    const altText = altTextEl?.textContent?.trim() || 'Image';
    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    const subTitle = subTitleEl?.textContent?.trim();
    const subText = subTextEl?.textContent?.trim();
    let assetHtml = '';
    if (videoUrl) {
      assetHtml = `
        <div class="hero-banner__video-container">
        </div>
      `;
      videoUrls.push(videoUrl);
    } else if (image) {
      const img = image.querySelector('img');
      img?.removeAttribute('width');
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
    carouselDots.push(`<div class="carousel-dot">${index}</div>`);
    return itemEl.outerHTML;
  }).join('');

  block.innerHTML = `
    <div class="hero-banner__container">
      <div class="hero-banner__items">
          ${bannerItems}
      </div>
      ${ctaHtml}
      ${carouselDots.join('')}
    </div>
  `;

  fetchPlaceholders().then((res) => {
    const { publishDomain } = res;
    block.querySelectorAll('.hero-banner__video-container').forEach((item, index) => {
      const video = document.createElement('video');
      video.classList.add('hero-banner__video');
      video.src = publishDomain + videoUrls[index];
      video.autoplay = true;
      video.playsInline = true;
      video.muted = true;
      item.append(video);
    });
  });
}
