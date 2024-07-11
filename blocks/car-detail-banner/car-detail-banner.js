import { fetchPlaceholders } from "../../scripts/aem.js";
import ctaUtils from "../../utility/ctaUtils.js";
import utility from "../../utility/utility.js";

export default async function decorate(block) {
  let car = null;
  const { publishDomain } = await fetchPlaceholders();
  const [
    modelIdEl,
    bgImageEl,
    startingPriceTextEl,
    testDriveTextEl,
    scrollMoreTextEl,
    primaryCtaTextEl,
    primaryCtaLinkEl,
    primaryCtaTargetEl,
    secondaryCtaTextEl,
    secondaryCtaLinkEl,
    secondaryCtaTargetEl,
  ] = block.children;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const modelId = modelIdEl?.textContent?.trim();
  const graphQlEndpoint =
    `${publishDomain}/graphql/execute.json/msil-platform/carDetailBanner;modelId=` +
    modelId;
  fetch(graphQlEndpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      car = result?.data?.carModelList?.items[0];
      populateBanner(car);
    })
    .catch();
  function populateBanner(car) {
    const carImage = publishDomain + car.carImage._dynamicUrl;
    const carLogoImage = publishDomain + car.carLogoImage._dynamicUrl;
    const startingPriceText = startingPriceTextEl?.textContent?.trim();
    const testDriveText = Array.from(testDriveTextEl.querySelectorAll("p"))
      .map((p) => p.outerHTML)
      .join("");
    const scrollMoreText = scrollMoreTextEl?.textContent?.trim();
    const primaryCta = ctaUtils.getLink(
      primaryCtaLinkEl,
      primaryCtaTextEl,
      primaryCtaTargetEl,
      "button-primary-light"
    );
    const secondaryCta = ctaUtils.getLink(
      secondaryCtaLinkEl,
      secondaryCtaTextEl,
      secondaryCtaTargetEl,
      "button-secondary-light"
    );

    const image = bgImageEl?.querySelector("picture");
    const img = image.querySelector("img");
    img.removeAttribute("width");
    img.removeAttribute("height");

    let ctaHtml = "";
    if (primaryCta || secondaryCta) {
      ctaHtml = `
                     <div class="banner__actions">
                       ${primaryCta ? primaryCta.outerHTML : ""}
                       ${secondaryCta ? secondaryCta.outerHTML : ""}
                     </div>
                   `;
    }

    block.innerHTML = "";
    block.insertAdjacentHTML(
      "beforeend",
      utility.sanitizeHtml(`
                   <div class="hero__banner">
                       ${
                         image
                           ? `<div class="hero__banner--image">${image.outerHTML}</div>`
                           : ""
                       }
                       <div class="banner__content">
                           <div class="banner__info container">
                           ${
                             car.carDescription
                               ? `<div class="banner__carDescription">${car.carDescription}</div>`
                               : ""
                           }
                               ${
                                 carLogoImage && car.altText
                                   ? `<div class="banner__carLogoImage"><img src="../../../icons/brezza-logo.svg" alt=${car.altText}></div>`
                                   : ""
                               }
                               ${
                                 startingPriceText
                                   ? `<div class="banner__startingPriceText"><p>${startingPriceText}</p></div>`
                                   : ""
                               }
                               ${
                                 car.exShowroomPrice
                                   ? `<div class="banner__exShowroomPrice">${car.exShowroomPrice}</div>`
                                   : ""
                               }
                               ${
                                 testDriveText
                                   ? `<div class="banner__testDriveText">${testDriveText}</div>`
                                   : ""
                               }
                               
                               
                               ${
                                 carImage && car.altText
                                   ? `<div class="banner__carImage"><img src=${carImage} alt=${car.altText}></div>`
                                   : ""
                               }
                               
                               ${ctaHtml}
                           </div>
                           
                       </div>
                       
                   </div>
                   <div class="hero__bottom-gradient">
                    ${
                      scrollMoreText
                        ? `<div class="banner__scrollMoreText">${scrollMoreText}</div>`
                        : ""
                    }
                    </div>
             `)
    );
  }
  // function extractBannerInfo(result){
  //     const car = result?.data?.carModelList?.items[0];
  //     const carImage = publishDomain+car.carImage._dynamicUrl;
  //     const carLogoImage = publishDomain+car.carLogoImage._dynamicUrl;
  //     const description = car.carDescription;
  //     const carExShowroomPrice = car.exShowroomPrice;
  //    }
}