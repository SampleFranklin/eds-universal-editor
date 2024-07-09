import { fetchPlaceholders } from '../../scripts/aem.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  console.log(block);
  const [
    titleEl,
    exShowroomLabelEl,
    exShowroomTextEl,
    taglineEl,
    engineLabelEl,
    powerLabelEl,
    mileageLabelEl,
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
  const exShowroomText = exShowroomTextEl?.textContent?.trim();
  const engineLabel = engineLabelEl?.textContent?.trim();
  const powerLabel = powerLabelEl?.textContent?.trim();
  const mileageLabel = mileageLabelEl?.textContent?.trim();
  const tagline = taglineEl?.textContent?.trim();
  const carModelPath = carModelPathEl.querySelector('a')?.textContent?.trim();
  const termsAndConditionsText = termsAndConditionsTextEl?.textContent?.trim() || '';

  const primaryCtaText = primaryTextEl?.textContent?.trim() || '';
  const primaryLink = primaryLinkEl?.querySelector('.button-container a')?.href;
  const primaryTarget = primaryTargetEl?.textContent?.trim() || '_self';

  const secondaryCtaText = secondaryTextEl?.textContent?.trim() || '';
  const secondaryLink = secondaryLinkEl?.querySelector('.button-container a')?.href;
  const secondaryTarget = secondaryTargetEl?.textContent?.trim() || '_self';

  const getVideoHtml = (videoUrl) => `
          <div class="hero__image-container fadeIn">
            <video src="${videoUrl}" muted="muted" width="100%" autoplay></video>
          </div>
        `;

  // const getVideoUrl = (el) => {
  //     const url = el?.querySelector('a')?.textContent?.trim();
  //     if (url) {
  //         return publishDomain + url;
  //     } else {
  //         return '';
  //     }
  // }
  const getAssetHtml = (videoUrl) => {
    if (videoUrl) {
      return getVideoHtml(videoUrl);
    }
    return '';
  };
  const getVariantHtml = (variant) => {
    const assetHtml = window.matchMedia('(min-width: 999px)').matches ? getAssetHtml(variant.variantVideo._publishUrl) : getAssetHtml(variant.variantMobileVideo._publishUrl);
    return `
        ${assetHtml}
        <div class="hero__legends-container">
            <div class="hero__legends">
                <div class="legend-item">
                    <p class="legend-title">${variant.engine}</p>
                    <p class="legend-desc">${engineLabel}</p>
                </div>
                <div role="separator"></div>
                <div class="legend-item">
                    <p class="legend-title">${variant.power}</p>
                    <p class="legend-desc">${powerLabel}</p>
                </div>
                <div role="separator"></div>
                <div class="legend-item">
                    <p class="legend-title">${variant.mileage}</p>
                    <p class="legend-desc">${mileageLabel}</p>
                </div>
            </div>
        </div>
        <div class="hero__disclaimer-container">
            <p>${variant.variantName} ${termsAndConditionsText}</p>
        </div>
        `;
  };

  // const bannerItems = bannerItemsEl.map((element) => {
  //     const [videoEl, allowMobileVideoEl, mobileVideoEl, variantNameTCEl] = element.children;
  //     const desktopVideoUrl = getVideoUrl(videoEl);
  //     const isAllowMobileVideo = allowMobileVideoEl?.textContent?.trim() || "false";
  //     const mobileVideoUrl = (isAllowMobileVideo === "true") ? (getVideoUrl(mobileVideoEl) || desktopVideoUrl) : desktopVideoUrl;
  //     const variantNameTC = variantNameTCEl?.textContent?.trim();
  //     let assetHtml = '';
  //     if (window.matchMedia('(min-width: 999px)').matches) {
  //         assetHtml = getAssetHtml(desktopVideoUrl);
  //     } else {
  //         assetHtml = getAssetHtml(mobileVideoUrl);
  //     }

  //     element.innerHTML = `
  //         ${assetHtml}
  //         <div class="hero__disclaimer-container">
  //             <p>${variantNameTC}</p>
  //         </div>
  //     `;
  //     moveInstrumentation(element, element.firstElementChild);
  //     return element.innerHTML;
  // }).join('');

  const { publishDomain } = await fetchPlaceholders();

  const graphQlEndpoint = `${publishDomain}/graphql/execute.json/msil-platform/VariantList;modelId=${carModelPath}?w`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(graphQlEndpoint, requestOptions);
  const { data } = await response.json();
  const cars = data.variantList.items;
  if (!Array.isArray(cars) || cars.length === 0) {
    console.error('No car varaint data found in the GraphQL response.');
    return null;
  }
  let newHtml = '';
  cars.forEach((variant) => {
    // console.log("Variant Name", variant.variantName);
    // console.log("index-----------",index);
    // console.log(getVariantHtml(variant));
    // let variantHtml = '';
    // variantHtml += getVariantHtml(variant);
    // console.log(getVariantHtml(variant));
    // console.log("variantHtml",variantHtml)
    newHtml
        += `
        <div class="hero-banner__slides">
            <div class="hero__top-container">
                <div class="hero__top-left">
                    ${(title) ? `${title.outerHTML}` : ''}
                    <h3 class="vehicle-tagline">${tagline}</h3>
                </div>
                <div class="hero__top-right">
                    <div class="price-details">
                        <p class="ex-showroom-label">${exShowroomLabel}</p>
                        <div role="separator"></div>
                        <p class="ex-showroom-price"></p>
                    </div>
                    <div class="hero__ctas">
                        <div class="cta__primary">
                            <a href="${primaryLink}" target="${primaryTarget}">${primaryCtaText}</a>
                        </div>
                        <div class="cta__secondary">
                            <a href="${secondaryLink}" target="${secondaryTarget}">${secondaryCtaText}</a>
                        </div>
                    </div>
                </div>
            </div>
            ${getVariantHtml(variant)}
        </div>
    `;
    block.innerHTML = `
        <div class="hero-banner__carousel">
            ${newHtml}
        </div>
    `;
    // console.log("index --------",index, newHtml)
  });

  // function setLocalStorage(key, value) {
  //     localStorage.setItem(key, value);
  // }

  // function getLocalStorage(key) {
  //     return localStorage.getItem(key);
  // }

  // console.log("bannerItemsEl",bannerItemsEl)

  // console.log("carModelPath",carModelPath)

  // let newHTMLContainer = '';

  // const appendNewHTMLContainer = (newHTMLContainer) => {
  //     // console.log(newHtml)
  //     if (newHTMLContainer) {
  //         block.appendChild(newHTMLContainer);
  //     } else {
  //         console.error('Failed to fetch car data or build HTML container.');
  //     }
  // }

  // const variantItem = "variant"+index+";"

  // block.innerHTML = newHtml
}
