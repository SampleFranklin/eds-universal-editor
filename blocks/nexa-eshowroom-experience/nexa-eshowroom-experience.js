import {
  fetchPlaceholders
} from "../../scripts/aem.js";
import carouselUtils from "../../utility/carouselUtils.js";

export default async function decorate(block) {

  const getFwdVideoHtml = (videoUrl) => {
      if (!videoUrl) {
          return ''
      }
      return `
          <video id="video1" class="e-showroom__video active-video" muted>
              <source src="${videoUrl}" type="video/mp4">
          </video>
      `;
  };

  const getReverseVideoHtml = (videoUrl) => {
      if (!videoUrl) {
          return ''
      }
      return `
          <video id="video2" class="e-showroom__video-rev" muted>
              <source src="${videoUrl}" type="video/mp4">
          </video>
      `;
  };

  const {
      publishDomain,
      apiKey
  } = await fetchPlaceholders();
  //const url = `${publishDomain}/content/nexa/services/token`
  const url = "https://publish-p135331-e1341966.adobeaemcloud.com/content/nexa/services/token";
  const auth = await fetch(url);
  const authorization = await auth.text();

  const [componentIds, priceTextE1, secondaryBtnTextE1, secondaryBtnCtaE1] = block.children;

  const componentId = componentIds?.textContent?.trim();
  const priceText = priceTextE1?.textContent?.trim();
  const secondaryBtnText = secondaryBtnTextE1?.textContent.trim();
  const secondaryBtnCta = secondaryBtnCtaE1?.querySelector("a")?.textContent?.trim();

  const forCode = '48';

  const parentDiv = document.querySelector(".nexa-eshowroom-experience-container");
  parentDiv.setAttribute("id", componentId);

  const graphQlEndpoint = `${publishDomain}/graphql/execute.json/msil-platform/CarModelListByPath`;

  const requestOptions = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  };

  const response = await fetch(graphQlEndpoint, requestOptions);
  const data = await response.json();
  await carModelInfo(data);

  async function carModelInfo(result) {
      const cars = result.data.carModelList.items;

      if (!Array.isArray(cars) || cars.length === 0) {
          console.error("No car data found in the GraphQL response.");
          return;
      }

      const carItemsPromises = cars.map(async (itemEl, index) => {
          const car = cars[index];
          const carName = car.carName;
          const modelId = car.modelId;
          const carDescription = car.carDescription;
          const exShowRoomPrice = car.exShowroomPrice;
          const eshowroomDescription = car.eshowroomDescription;
          const eshowroomPrimaryCtaText = car.eshowroomPrimaryCtaText;
          const carDetailsPagePath = car.carDetailsPagePath ? car.carDetailsPagePath._path : "#";
          const eshowroomDesktopFwdVideo = car.eshowroomDesktopFwdVideo ? car.eshowroomDesktopFwdVideo._publishUrl : "";
          const eshowroomDesktopReverseVideo = car.eshowroomDesktopReverseVideo ? car.eshowroomDesktopReverseVideo._publishUrl : "";
          const eshowroomMobileFwdVideo = car.eshowroomMobileFwdVideo ? car.eshowroomMobileFwdVideo._publishUrl : "";
          const eshowroomMobileReverseVideo = car.eshowroomMobileReverseVideo ? car.eshowroomMobileReverseVideo._publishUrl : "";

          let assetFwdHtml = "";
          let assetReverseHtml = "";
          if (window.matchMedia("(min-width: 999px)").matches) {
              assetFwdHtml = getFwdVideoHtml(eshowroomDesktopFwdVideo);
              assetReverseHtml = getReverseVideoHtml(eshowroomDesktopReverseVideo);
          } else {
              assetFwdHtml = getFwdVideoHtml(eshowroomMobileFwdVideo);
              assetReverseHtml = getReverseVideoHtml(eshowroomMobileReverseVideo);
          }

          if (!(assetFwdHtml && assetReverseHtml)) {
              return ""
          }

          const carPrice = await fetchPrice(modelId, exShowRoomPrice);
          const formattedCarPrice = await formatCurrency(carPrice);

          return `
              <div>
                  <div class="e-showroom__info-container">
                      <div>
                          <h2 class="text-heading-primary">${carDescription}</h2>
                          <div class="e-showroom__price-text">${priceText}
                              <span class="e-showroom__price">Rs ${formattedCarPrice}</span>
                          </div>
                      </div>
                      <div>
                          <div class="e-showroom__subtitle">${eshowroomDescription}</div>
                          <div class="e-showroom__action">
                           <div class="cta cta__primary">
                              <a target="_blank" href="${carDetailsPagePath}" title="${eshowroomPrimaryCtaText}" target="_self">${eshowroomPrimaryCtaText}</a>
                              </div>
                               <div class="cta cta__secondary">
                              <a target="_blank" href="${secondaryBtnCta}?${modelId}" title="${secondaryBtnText}" target="_self">${secondaryBtnText}</a>
                              </div>
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
      });

      const carItems = await Promise.all(carItemsPromises);

      block.innerHTML = `
          <div class="e-showroom__container">
              <div class="e-showroom-carousel">
                  <div class="e-showroom__slides">
                      ${carItems.join("")}
                  </div>
              </div>
          </div>`;

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
            if (targetSlide) {
              currentSlide.querySelector(".e-showroom__video")?.play();
              return false;
            }
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

  async function formatCurrency(value) {
      // Remove the currency symbol
      let numericValue = String(value).replace(/[^\d.]/g, '');

      numericValue = numericValue.split('.')[0];

      // Start with the last three digits
      let lastThree = numericValue.slice(-3);
      let otherNumbers = numericValue.slice(0, -3);

      // Add spaces after every two digits for the other numbers part
      if (otherNumbers !== '') {
          lastThree = ' ' + lastThree;
      }
      let formattedValue = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ' ') + lastThree;

      return formattedValue;
  }

  async function getLocalStorage(key) {
      return localStorage.getItem(key);
  }

  async function fetchPrice(modelCode, exShowRoomPrice) {
      const storedPrices = await getLocalStorage('modelPrice') ? JSON.parse(await getLocalStorage('modelPrice')) : {};
      if (storedPrices[modelCode] && storedPrices[modelCode].price[forCode]) {
          return storedPrices[modelCode].price[forCode];
      } else {
          const channel = 'EXC';
          const apiUrl = 'https://api.preprod.developersatmarutisuzuki.in/pricing/v2/common/pricing/ex-showroom-detail';

          const params = {
              forCode,
              channel
          };

          const headers = {
              'x-api-key': apiKey,
              //Authorization: "eyJraWQiOiJQK0wyTlZKNWFWNTRreEhnRWxQcUpNTHlZRDl5OE1PS1J4T25KWktOdGJjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhOGQ4OWI3ZC03OGMwLTRlYWUtYmZkNC01Zjc1OWQ3ODcyMjgiLCJzZGs6dXNlclBvb2xJZCI6ImFwLXNvdXRoLTFfNGUxVUFqQnhKIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfNGUxVUFqQnhKIiwiZ3JvdXBzIjoiTVNJTC1EZXZlbG9wZXJQb3J0YWwtU2FsZXMtR3JvdXB8TVNJTC1EZXZlbG9wZXJQb3J0YWwtQ3VzdG9tZXItR3JvdXB8TVNJTC1EZXZlbG9wZXJQb3J0YWwtR2VuZXJhbC1Hcm91cHxNU0lMLURldmVsb3BlclBvcnRhbC1QcmVzYWxlcy1Hcm91cHxNU0lMLURldmVsb3BlclBvcnRhbC1PcGVyYXRpb25zLUdyb3VwfE1TSUwtRGV2ZWxvcGVyUG9ydGFsLVBhcnRuZXItR3JvdXB8TVNJTC1EZXZlbG9wZXJQb3J0YWwtT0NSLUdyb3VwfE1TSUwtRGV2ZWxvcGVyUG9ydGFsLVBhcmtpbmdNYW5hZ2VtZW50LUdyb3VwfE1TSUwtRGV2ZWxvcGVyUG9ydGFsLUludGVybmFsQVBJcy1Hcm91cCIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImMxYzE4YTZhLWIyNDEtNDIyMy1iNmJiLTEzZjUxNzAyNDA1NCIsInNkazphdXRoZW50aWNhdGlvbkZsb3dUeXBlIjoiVVNFUl9TUlBfQVVUSCIsIm9yaWdpbl9qdGkiOiI3NWZkYmEwOC1jM2E4LTRlZGQtYjkzMi00MTJhMTMyNWNlNzgiLCJhdWQiOiI2YmJhZzNzajNoa3R0M2Frb2dycHI5NzBjZyIsInNkazp1c2VyUG9vbFdlYkNsaWVudElkIjoiNmJiYWczc2ozaGt0dDNha29ncnByOTcwY2ciLCJzZGs6Z2F0ZXdheVVybCI6Imh0dHBzOlwvXC9kMXgzdXVjejAybG9oeS5jbG91ZGZyb250Lm5ldFwvIiwiZXZlbnRfaWQiOiIzZjA0Mzg1NC0xMDQ4LTRhZTAtYjUyMi0zNjJkZTQ4ZGU5ZDAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyMDc2MDI4MCwibmFtZSI6IlZpa2FzIiwicGhvbmVfbnVtYmVyIjoiKzkxODEzMDQyMDE1MCIsInNkazpyZWdpb24iOiJhcC1zb3V0aC0xIiwic2RrOmF1dGhTZXJ2ZXJVcmwiOiJodHRwczpcL1wvZDF4M3V1Y3owMmxvaHkuY2xvdWRmcm9udC5uZXRcLyIsImV4cCI6MTcyMDc2Mzg4MCwiaWF0IjoxNzIwNzYwMjgwLCJqdGkiOiJkNjgzZjY3Ni1lNTkxLTRkNjItYmEwMS1kMTNkZTI1MTFkN2EiLCJlbWFpbCI6InZpa2FzLmNoYXVkaGFyeTAxQG5hZ2Fycm8uY29tIn0.TxWt9oR0HJth8Ska0-k9-uNwUy067uslZ9D7iULx48jYSgb2fXIsJl5kflUMkJUpC7PKRhwMid6rGE_PWcmWLNk2kUNbEptmeEMeKOMHy-eS8JtKhjrZnqOg8xFJqv4jq8LGFBrVRZhJuubvCRFNTYAiBDTU0IzdAXS_z_DX9iwMyl41d5Nd2snZ5PhjlZPwGPEEMffkVg6-iV2AZMcUFktUKHdqm2Bk5dHksC0uMuT38l253aIeiPCM2u311Quj-Ex-UmMARUOPYpYEpAjh3TTHAjMA8pU0mtz7W9tOHgBNK2-ShDBB8njfOSuS25fMYaOTCkWHt0DvXqm7mcOWWw"
              Authorization: authorization
          };

          const url = new URL(apiUrl);
          Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

          const response = await fetch(url, {
              method: 'GET',
              headers
          });
          const data = await response.json();

          try {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              if (data.error === false && data.data) {
                  const storedModelPrices = {};
                  const timestamp = new Date().getTime() + (1 * 24 * 60 * 60 * 1000); // 1 day from now
                  data.data.models.forEach((item) => {
                      const {
                          modelCd
                      } = item;
                      const lowestExShowroomPrice = item.lowestExShowroomPrice;

                      storedModelPrices[modelCd] = {
                          price: {
                              [forCode]: lowestExShowroomPrice,
                          },
                          timestamp,
                      };
                  });
                  localStorage.setItem('modelPrice', JSON.stringify(storedModelPrices));
                  return storedModelPrices[modelCode].price[forCode];
              } else {
                  return exShowRoomPrice;
              }
          } catch (error) {
              console.error('Error fetching price:', error);
              return exShowRoomPrice;
          }
      }
  }
}