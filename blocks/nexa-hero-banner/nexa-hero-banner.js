import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const [showCtaEl, ctaTextEl, ...bannerItemsEl] = block.children;
  const ctaVisibility = showCtaEl?.textContent?.trim();
  const ctaText = ctaTextEl?.textContent?.trim();
  let ctaHtml = '';
  if (ctaVisibility === 'true' && ctaText) {
    ctaHtml = `<p>${ctaText}</p>`;
  }
  const { publishDomain } = await fetchPlaceholders();
  const carouselDots = [];
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
    carouselDots.push(`<span class="carousel-dot data-target-index=${index}"></span>`);
    itemEl.classList.add(`hero-banner__slide`, `hero-banner__slide-${index}`);
    itemEl.dataset.slideIndex = index;
    if(index === 0) {
      itemEl.classList.add('hero-banner__slide--active');
    }
    return itemEl.outerHTML;
  }).join('');

  block.innerHTML = `
    <div class="hero-banner__container">
      <div class="hero-banner__carousel">
        <div class="hero-banner__slides">
          ${bannerItems}
        </div>
        <div class="hero-banner__nav-btn">
          <button class="hero-banner__prev-btn">Prev</button>
          <button class="hero-banner__next-btn">Next</button>
        </div>
        <div class="hero-banner__indicators">
          ${carouselDots.join('')}
        </div>
      </div>
      ${ctaHtml}
    </div>
  `;

  const activateSlide = (position) => {
    const slides = block.querySelectorAll('.hero-banner__slide');
    const currentSlide = block.querySelector('.hero-banner__slide--active');
    const currentIndex = parseInt(currentSlide.dataset.slideIndex, 10);
    let activeSlide;
    if(position === 1 && currentIndex + 1 < slides.length) {
      activeSlide = slides[currentIndex + 1];
    } else if(position === -1 && currentIndex - 1 >= 0) {
      activeSlide = slides[currentIndex - 1];
    }
    if(activeSlide) {
      block.querySelector('.hero-banner__slides').scrollTo({
        top: 0,
        left: activeSlide.offsetLeft,
        behaviour: 'smooth'
      });
      currentSlide.classList.remove('hero-banner__slide--active');
      activeSlide.classList.add('hero-banner__slide--active');
    }
  };

  block.querySelector('.hero-banner__prev-btn').addEventListener('click', (e) => {
    activateSlide(-1);
  });
  block.querySelector('.hero-banner__next-btn').addEventListener('click', (e) => {
    activateSlide(1);
  });
}
