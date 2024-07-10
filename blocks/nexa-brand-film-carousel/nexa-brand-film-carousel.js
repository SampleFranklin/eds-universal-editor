import { fetchPlaceholders } from '../../scripts/aem.js'
import carouselUtils from '../../utility/carouselUtils.js'

export default async function decorate(block) {
  const [titleEl, subTitleEl, descriptionEl, thumbnailEl, ...videosEl] = block.children
  const { publishDomain } = await fetchPlaceholders();

  const title = titleEl.querySelector(':is(h1,h2,h3,h4,h5,h6');
  title?.classList?.add("brand-film__title");
  const subTitle = subTitleEl.textContent?.trim();
  const description = Array.from(descriptionEl.querySelectorAll('p')).map((el) => {
    el.classList.add('brand-film__description-text');
    return el.outerHTML;
  }).join('');
  const thumbnail = thumbnailEl.querySelector('img')?.src;
  const videos = videosEl.map((videoEl) => {
    const path = videoEl?.querySelector('a')?.textContent?.trim();
    videoEl.classList?.add('brand-film__video-container', 'brand-film__video--paused');
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
        <div class="brand-film__asset">
          <div class="brand-film__actions">
            <button class="brand-film__fullscreen-btn">Full Screen</button>
            <button class="brand-film__pip-btn">Pip</button>
          </div>
          <button class="brand-film__close-btn">Close</button>
          <div class="brand-film__slides">
            ${videos.join('')}
          </div>
        </div>
      </div>
      <div class="brand-film__content">
        <div class="brand-film__info">
          ${(title) ? title.outerHTML : ''}
          ${(subTitle) ? `<p class="brand-film__subtitle">${subTitle}</p>` : ''}
        </div>
        <div class="brand-film__navigation-wrapper">
        </div>
      </div>
    </div>
  `;

  const controller = carouselUtils.init(
    block.querySelector('.brand-film__container'),
    'brand-film__slides',
    'fade',
    {
      onChange: (currentSlide, targetSlide) => {
        currentSlide.querySelector('video')?.pause();
        const video = targetSlide.querySelector('video');
        if(document.pictureInPictureElement) {
          video?.requestPictureInPicture();
        }
        video?.play();
      },
      onReset: (currentSlide, targetSlide) => {
        currentSlide.querySelector('video')?.pause();
        const video = targetSlide.querySelector('video');
        if(document.pictureInPictureElement) {
          video?.requestPictureInPicture();
        }
        video?.load();
      },
      showArrows: false,
      dotsInteractive: false,
      navigationContainerClassName: 'brand-film__navigation-wrapper'
    }
  );

  block.querySelectorAll('.brand-film__video-container')?.forEach((el) => {
    const video = el.querySelector('video');
    if(video) {
      el.addEventListener('click', () => {
        if(video.paused) {
          video.play();
        } else {
          video?.pause();
        }
      });
      video.addEventListener('ended', () => {
        if(!controller.next()) {
          controller.reset();
        }
      });
      video.addEventListener('playing', () => {
        el.classList.remove('brand-film__video--paused');
      });
      video.addEventListener('pause', () => {
        el.classList.add('brand-film__video--paused');
      });
    }
  })

  block.querySelector('.brand-film__fullscreen-btn')?.addEventListener('click', () => {
    const el = block.querySelector('.brand-film__wrapper');
    if(el) {
      el.classList.add('brand-film__wrapper--fullscreen');
      const options = { navigationUI: "hide" }
      if(el.requestFullscreen) {
        screen.orientation.lock('landscape-primary');
        el.requestFullscreen(options);
      }
    }
  });

  ['', 'moz', 'webkit', 'o', 'ms'].forEach((vendor) => {
    document.addEventListener(`${vendor}fullscreenchange`, () => {
      if(!document.fullscreenElement) {
        block.querySelector('.brand-film__wrapper--fullscreen')?.classList?.remove('brand-film__wrapper--fullscreen');
        screen.orientation.unlock();
      }
    });
  });

  block.querySelector('.brand-film__close-btn')?.addEventListener('click', () => {
    if(document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      block.querySelector('.brand-film__wrapper--pip')?.classList?.remove('brand-film__wrapper--pip');
    }
  });

  block.querySelector('.brand-film__pip-btn')?.addEventListener('click', async () => {
    if(document.pictureInPictureEnabled) {
      block.querySelector('.brand-film__slides .carousel__slide--active video').requestPictureInPicture();
    } else {
      block.querySelector('.brand-film__wrapper')?.classList?.add('brand-film__wrapper--pip');
    }
  });
}