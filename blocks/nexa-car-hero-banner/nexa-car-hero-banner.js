import { fetchPlaceholders } from '../../scripts/aem.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  const [
    titleEl,
    exShowroomLabelEl,
    lakhLabelEl,
    taglineEl,
    filterSelectEl,
    carModelPathEl,
    primaryTextEl,
    primaryLinkEl,
    primaryTargetEl,
    secondaryTextEl,
    secondaryLinkEl,
    secondaryTargetEl,
    termsAndConditionsTextEl,
  ] = block.children;
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
  title.removeAttribute('id');
  title.classList.add('vehicle-name');
  const exShowroomLabel = exShowroomLabelEl?.textContent?.trim();
  const lakhLabel = lakhLabelEl?.textContent?.trim();
  const filterList = filterSelectEl?.textContent?.trim();
  const tagline = taglineEl?.textContent?.trim();
  const carModelPath = carModelPathEl.querySelector('a')?.textContent?.trim();
  const termsAndConditionsText = termsAndConditionsTextEl?.textContent?.trim() || '';

  const primaryCtaText = primaryTextEl?.textContent?.trim() || '';
  const primaryLink = primaryLinkEl?.querySelector('.button-container a')?.href;
  const primaryTarget = primaryTargetEl?.textContent?.trim() || '_self';

  const secondaryCtaText = secondaryTextEl?.textContent?.trim() || '';
  const secondaryLink = secondaryLinkEl?.querySelector('.button-container a')?.href;
  const secondaryTarget = secondaryTargetEl?.textContent?.trim() || '_self';

  function fetchPrice(variantCode, defaultPrice) {
    return defaultPrice ? `${utility.formatToLakhs(defaultPrice)} ${lakhLabel}` : 'Not available';
  }

  function initCarousel(block) {
    const slides = block.querySelectorAll('.hero-banner__slides');
    let currentSlide = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        const video = slide.querySelector('video');
        if (video) {
          if (i === index) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    function handleOverlayBehavior(slide) {
      const video = slide.querySelector('video');
      const overlay = slide.querySelector('.hero__information-overlay');
      
      if (video && overlay) {
        let overlayShown = false;
  
        video.addEventListener('timeupdate', () => {
          const progress = (video.currentTime / video.duration) * 100;
          
          if (progress >= 50 && !overlayShown) {
            overlayShown = true;
            video.pause();
            overlay.style.opacity = '1';
            
            setTimeout(() => {
              overlay.style.opacity = '0';
              setTimeout(() => {
                video.play();
              }, 1000); // Wait for overlay fade-out before resuming video
            }, 3000);
          }
        });
  
        video.addEventListener('ended', () => {
          overlayShown = false; // Reset for next play
        });
      }
    }
  
    function setupVideo(video, slide) {
      video.addEventListener('loadedmetadata', () => {
        console.log(`Video duration:`, video.duration);
      });
  
      video.addEventListener('ended', () => {
        nextSlide();
      });
  
      handleOverlayBehavior(slide);
    }
  
    slides.forEach((slide) => {
      const video = slide.querySelector('video');
      if (video) {
        setupVideo(video, slide);
      }
    });
  
    // Initialize the first slide
    showSlide(currentSlide);
  }

  const filterTypes = filterList.split(',');

  const getVideoHtml = (videoUrl) => `
  <div class="hero__video-container">
    <video src="${videoUrl}" muted="muted" width="100%" autoplay></video>
  </div>
`;

  const getAssetHtml = (videoUrl) => {
    if (videoUrl) {
      return getVideoHtml(videoUrl);
    }
    return '';
  };

  const getTypesHtml = (variant) => {
    let typeHtml = '';
    filterTypes.forEach((type, index) => {
      const typeLabel = `${type}Label`;
      const typeValue = `${type}Value`;
      typeHtml
    += `<div class="legend-item">
        <p class="legend-title">${variant[`${typeValue}`]}</p>
        <p class="legend-desc">${variant[`${typeLabel}`]}</p>
      </div>
    ${index === filterTypes.length - 1 ? '' : '<div role="separator"></div>'}`;
    });
    return typeHtml;
  };

  const getVariantHtml = (variant) => {
    const assetHtml = window.matchMedia('(min-width: 999px)').matches ? getAssetHtml(variant.variantVideo._publishUrl) : getAssetHtml(variant.variantMobileVideo._publishUrl);
    return `
        ${assetHtml}
        <div class="hero__information-overlay" style="opacity: 0; transition: opacity 0.5s;">
          <div class="hero__top-container">
            <div class="hero__top-left">
              ${(title) ? `${title.outerHTML}` : ''}
              <h3 class="vehicle-tagline">${tagline}</h3>
            </div>
            <div class="hero__top-right">
              <div class="price-details">
                  <p class="ex-showroom-label">${exShowroomLabel}</p>
                  <div role="separator"></div>
                  <p class="ex-showroom-price">${fetchPrice(variant.variantId, variant.exShowroomPrice)}</p>
              </div>
              <div class="hero__ctas">
                  <div class="cta cta__primary">
                      <a href="${primaryLink}" target="${primaryTarget}">${primaryCtaText}</a>
                  </div>
                  <div class="cta cta__secondary">
                      <a href="${secondaryLink}" target="${secondaryTarget}">${secondaryCtaText}</a>
                  </div>
              </div>
            </div>
          </div>
          <div class="hero__bottom-container">
            <div class="hero__legends-container">
                <div class="hero__legends">
                  ${getTypesHtml(variant)}
                </div>
                <div class="hero__ctas">
                  <div class="cta cta__primary">
                      <a href="${primaryLink}" target="${primaryTarget}">${primaryCtaText}</a>
                  </div>
                  <div class="cta cta__secondary">
                      <a href="${secondaryLink}" target="${secondaryTarget}">${secondaryCtaText}</a>
                  </div>
              </div>
            </div>
            <div class="hero__disclaimer-container">
              <p>${variant.variantName} ${termsAndConditionsText}</p>
            </div>
          </div>
        </div>
        `;
  };

  const { publishDomain } = await fetchPlaceholders();

  const graphQlEndpoint = `${publishDomain}/graphql/execute.json/msil-platform/VariantList;modelId=${carModelPath}?k`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(graphQlEndpoint, requestOptions);
  const { data } = await response.json();
  const cars = data?.variantList?.items;
  console.log(cars, "cccc");
  let newHtml = '';
  cars.forEach((variant, index) => {
    newHtml
        += `
        <div class="hero-banner__slides ${index === 0 ? 'active' : ''}">
            ${getVariantHtml(variant)}
        </div>
    `;
  });
  block.innerHTML = `
        <div class="hero-banner__carousel">
            ${newHtml}
        </div>
    `;

    
    setTimeout(() => {
      initCarousel(block);
    }, 0);
  // function setLocalStorage(key, value) {
  //     localStorage.setItem(key, value);
  // }

  // function getLocalStorage(key) {
  //     return localStorage.getItem(key);
  // }
}
