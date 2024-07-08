import { fetchPlaceholders } from '../../scripts/aem.js'
import carouselUtils from '../../utility/carouselUtils.js'

export default async function decorate(block) {
  const [titleEl, subTitleEl, descriptionEl, thumbnailEl, ...videosEl] = block.children
  const { publishDomain } = await fetchPlaceholders();

  const title = titleEl.querySelector(':is(h1,h2,h3,h4,h5,h6');
  const subTitle = subTitleEl.textContent?.trim();
  const description = Array.from(descriptionEl.querySelectorAll('p')).map((el) => el.outerHTML).join('');
  const thumbnail = thumbnailEl.querySelector('img')?.src;
  const videos = videosEl.map((videoEl) => {
    const path = videoEl?.querySelector('a')?.textContent?.trim();
    videoEl.classList?.add('brand-film__video-container');
    videoEl.innerHTML = `
      <video class="brand-film__video" src="${publishDomain + path}" poster=${thumbnail} width="80%">
      </video>
    `;
    return videoEl.outerHTML;
  });

  block.innerHTML = `
    <div class="brand-film__container">
      ${(description) ? `<div class="brand-film__description">${description}</div>` : ''}
      <div class="brand-film__wrapper">
        <div class="brand-film__actions">
          <button class="brand-film__fullscreen-btn">Full Screen</button>
          <button class="brand-film__pip-btn">Pip</button>
        </div>
        <button class="brand-film__close-btn">Close</button>
        <div class="brand-film__slides">
          ${videos.join('')}
        </div>
      </div>
      <div class="brand-film__content">
        ${(title) ? title.outerHTML : ''}
        ${(subTitle) ? `<p class="brand-film__subtitle">${subTitle}</p>` : ''}
      </div>
    </div>
  `;

  const controller = carouselUtils.init(
    block.querySelector('.brand-film__container'),
    'brand-film__slides',
    'fade',
    (currentSlide, targetSlide) => {
      currentSlide.querySelector('video').pause();
      const targetVideo = targetSlide.querySelector('video');
      targetVideo?.play();
      targetVideo?.addEventListener('ended', () => {
        carouselUtils.next(block.querySelector('.brand-film__container'));
      });
    },
    {
      arrows: false,
      dots: true,
      dotsInteractive: false
    },
  );

  block.querySelector('video')?.addEventListener('ended', () => {
    controller.next();
  });

  block.querySelectorAll('video').forEach((video) => {
    video.addEventListener('click', () => {
      if(video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });

  block.querySelector('.brand-film__fullscreen-btn')?.addEventListener('click', () => {
    const el = block.querySelector('.brand-film__wrapper');
    el?.classList?.add('brand-film__wrapper--fullscreen');
    el?.requestFullscreen({
      navigationUI: "hide"
    });
  });

  document.addEventListener('fullscreenchange', () => {
    if(!document.fullscreenElement) {
      const el = block.querySelector('.brand-film__wrapper--fullscreen');
      el?.classList?.remove('brand-film__wrapper--fullscreen');
    }
  });

  block.querySelector('.brand-film__close-btn')?.addEventListener('click', () => {
    if(document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      block.querySelector('.brand-film__wrapper--pip')?.classList?.remove('brand-film__wrapper--pip');
    }
  });

  block.querySelector('.brand-film__pip-btn')?.addEventListener('click', () => {
    block.querySelector('.brand-film__wrapper')?.classList?.add('brand-film__wrapper--pip');
  });
}