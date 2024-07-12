import { fetchPlaceholders } from "../../scripts/aem.js";
import carouselUtils from "../../utility/carouselUtils.js";

export default async function decorate(block) {
  const { publishDomain } = await fetchPlaceholders();
  const [
    componentIds,
    priceTextE1,
    secondaryBtnTextE1,
    secondaryBtnCtaE1,
  ] = block.children;

  const componentId = componentIds?.textContent?.trim();
  const priceText = priceTextE1?.textContent?.trim();
  const secondaryBtnText = secondaryBtnTextE1?.textContent.trim();
  const secondaryBtnCta = secondaryBtnCtaE1?.querySelector("a")?.textContent?.trim();

  const parentDiv = document.querySelector(".nexa-eshowroom-experience-container");
  parentDiv.setAttribute("id", componentId);

  const graphQlEndpoint = publishDomain + "/graphql/execute.json/msil-platform/CarModelListByPath";
  console.log(graphQlEndpoint);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(graphQlEndpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      carModelInfo(result);
    })
    .catch((error) => console.error(error));

  function carModelInfo(result) {
    const cars = result.data.carModelList.items;

    if (!Array.isArray(cars) || cars.length === 0) {
      console.error("No car data found in the GraphQL response.");
      return null;
    }

    const carItems = cars?.map((itemEl, index) => {
      const carName = cars[index].carName;
      const modelId = cars[index].modelId;
      const carDescription = cars[index].carDescription;
      const exShowRoomPrice = cars[index].exShowroomPrice;
      const eshowroomDescription = cars[index].eshowroomDescription;
      const eshowroomPrimaryCtaText = cars[index].eshowroomPrimaryCtaText;
      const carDetailsPagePath = cars[index].carDetailsPagePath == null? "#": cars[index].carDetailsPagePath._path;
      const eshowroomDesktopFwdVideo = cars[index].eshowroomDesktopFwdVideo == null? "": cars[index].eshowroomDesktopFwdVideo._publishUrl;
      const eshowroomDesktopReverseVideo = cars[index].eshowroomDesktopReverseVideo == null? "": cars[index].eshowroomDesktopReverseVideo._publishUrl;
      const eshowroomMobileFwdVideo = cars[index].eshowroomMobileFwdVideo == null? "" : cars[index].eshowroomMobileFwdVideo._publishUrl;
      const eshowroomMobileReverseVideo = cars[index].eshowroomMobileReverseVideo == null? "" : cars[index].eshowroomMobileReverseVideo._publishUrl;
      let assetFwdHtml = "";
      let assetReverseHtml = "";
      if (window.matchMedia("(min-width: 999px)").matches) {
        assetFwdHtml = getFwdVideoHtml(eshowroomDesktopFwdVideo);
        assetReverseHtml = getReverseVideoHtml(eshowroomDesktopReverseVideo);
      } else {
        assetFwdHtml = getFwdVideoHtml(eshowroomMobileFwdVideo);
        assetReverseHtml = getReverseVideoHtml(eshowroomMobileReverseVideo);
      }
      const carPrice = fetchPrice(modelId) != "" && fetchPrice(modelId) != null? fetchPrice(modelId) : exShowRoomPrice;
      const formattedCarPrice = carPrice? carPrice.toLocaleString('en-IN').replaceAll(',', ' ') : carPrice

      function fetchPrice(variantCode) {
        return null;
        const storedPrices = getLocalStorage("modelPrice")
          ? JSON.parse(getLocalStorage("modelPrice"))
          : {};
        /*if (storedPrices[variantCode] && storedPrices[variantCode].price[location]) {
                  const storedPrice = storedPrices[variantCode].price[location];
                  priceElement.textContent = priceText + " " + storedPrice;
              } else {
                  // Perform fetch only if price not already in localStorage
                  const apiKey = 'your_api_key_here';
                  const apiUrl = 'https://api.example.com/pricing';

                  const params = {
                      variantCode: variantCode,
                      location: location
                  };

                  const headers = {
                      'x-api-key': apiKey,
                      'Authorization': 'Bearer your_token_here'
                  };

                  const url = new URL(apiUrl);
                  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

                  fetch(url, {
                          method: 'GET',
                          headers: headers
                      })
                      .then(response => {
                          if (!response.ok) {
                              // throw new Error('Network response was not ok');
                          }
                          return response.json();
                      })
                      .then(data => {
                          if (data.error === false && data.data) {
                              const formattedPrice = data.data;

                              // Store price in localStorage with TTL of 1 day
                              storedPrices[variantCode] = storedPrices[variantCode] || {
                                  price: {},
                                  timestamp: 0
                              };
                              storedPrices[variantCode].price[location] = formattedPrice;
                              storedPrices[variantCode].timestamp = new Date().getTime() + (1 * 24 * 60 * 60 * 1000);

                              setLocalStorage('modelPrice', JSON.stringify(storedPrices));

                              priceElement.textContent = priceText + " " + formattedPrice;
                          } else {
                              const formattedPrice = defaultPrice ? priceFormatting(defaultPrice) : 'Not available';
                              priceElement.textContent = formattedPrice;
                              priceTextElement.textContent = priceText;
                          }
                      })
                      .catch(error => {
                          //console.error('There was a problem with the fetch operation:', error);
                          const formattedPrice = defaultPrice ? priceFormatting(defaultPrice) : 'Not available';
                          priceElement.textContent = formattedPrice;
                          priceTextElement.textContent = priceText;
                      });
              }*/
      }

      if(!(assetFwdHtml && assetReverseHtml)){
        return ""
      }
      

      itemEl.innerHTML = `
                <div>
                  <div class="e-showroom__info-container">
                    <div>
                      <h2 class="text-heading-primary">
                        ${carDescription}
                      </h2>
                      <div class="e-showroom__price-text">${priceText}
                        <span class="e-showroom__price">Rs ${formattedCarPrice}</span>
                      </div>
                    </div>
                    <div>
                      <div class="e-showroom__subtitle">
                        ${eshowroomDescription}
                      </div>
                      <div class="e-showroom__action">
                        <div class="cta cta__primary"><a target="_blank" href= "${carDetailsPagePath}" title=${eshowroomPrimaryCtaText} target="_self">${eshowroomPrimaryCtaText}</a></div>
                        <div class="cta cta__secondary"><a target="_blank" href= "${secondaryBtnCta}?${modelId}" title=${secondaryBtnText} target="_self">${secondaryBtnText}</a></div>
                      </div>
                    </div>
                    
                  </div>
                  <div class="e-showroom__video-carousel">
                    <div class="e-showroom__video-container">
                      ${assetFwdHtml}
                      ${assetReverseHtml}
                    </div>
                  </div>
                </div>`;

      return itemEl.innerHTML;
    });
    block.innerHTML = `
                        <div class="e-showroom__container">
                          <div class="e-showroom-carousel">
                            <div class="e-showroom__slides">
                              ${carItems.join("")}
                            </div>
                          </div>
                        </div>
                      `;

    const controller = carouselUtils.init(
      block.querySelector(".e-showroom-carousel"),
      "e-showroom__slides",
      "fade",
      {
        onChange: (currentSlide, targetSlide, direction) => {
          if (direction < 0) {
            targetSlide.querySelector(".e-showroom__video-rev")?.play();
          }
        },
        onNext: (currentSlide, targetSlide) => {
          currentSlide.querySelector(".e-showroom__video")?.play();
          return false;
        },
        onPrev: (currentSlide, targetSlide) => {
          targetSlide
            .querySelector(".e-showroom__video")
            .classList.remove("active-video");
          targetSlide
            .querySelector(".e-showroom__video-rev")
            .classList.add("active-video");
          return true;
        },
      }
    );

    block.querySelectorAll(".e-showroom__video").forEach((frdVideo) => {
      frdVideo.addEventListener("ended", () => {
        controller.next();
        frdVideo.load();
      });
    });

    block.querySelectorAll(".e-showroom__video-rev").forEach((revVideo) => {
      revVideo.addEventListener("ended", () => {
        const slide = revVideo.closest(".e-showroom__video-container");
        const nextVideo = slide.querySelector(".e-showroom__video");
        if (nextVideo) {
          revVideo.classList.remove("active-video");
          nextVideo.classList.add("active-video");
          revVideo.load();
        }
      });
    });
  }

  const getFwdVideoHtml = (videoUrl) => {
    console.log("video check", videoUrl);
    if(!videoUrl){
        return ''
    }
    return `
        <video id="video1" class="e-showroom__video active-video" muted>
          <source
            src= "${videoUrl}"
            type="video/mp4">
        </video>
      `;
  };

  const getReverseVideoHtml = (videoUrl) => {
    if(!videoUrl){
        return ''
    }
    return `
          <video id="video1-rev" class="e-showroom__video-rev" muted>
            <source
              src= "${videoUrl}"
              type="video/mp4">
          </video>
        `;
  };

  function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function getLocalStorage(key) {
    return localStorage.getItem(key);
  }
}
