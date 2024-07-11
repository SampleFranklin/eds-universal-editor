import { fetchPlaceholders } from "../../scripts/aem.js";
import utility from "../../utility/utility.js";
import ctaUtils from "../../utility/ctaUtils.js";
import slider from "../../utility/sliderUtil.js";

export default async function decorate(block) {
  function formatINR(number) {
    // Convert the number to a string
    let numStr = number.toString();

    // Find the length of the number string
    let length = numStr.length;

    // If the length is less than or equal to 3, return the number as is
    if (length <= 3) {
      return numStr;
    }

    // Otherwise, split the number into two parts:
    // First part contains the last three digits
    // Second part contains the remaining digits
    let lastThree = numStr.substring(length - 3);
    let rest = numStr.substring(0, length - 3);

    // Initialize an array to store parts of the final string
    let parts = [];

    // Append commas every two digits in the rest part
    while (rest.length > 2) {
      parts.push(rest.substring(rest.length - 2));
      rest = rest.substring(0, rest.length - 2);
    }

    // If there's any remaining part, add it to the array
    if (rest.length > 0) {
      parts.push(rest);
    }

    // Reverse the array to get the correct order and join the parts with commas
    let formattedRest = parts.reverse().join(",");

    // Combine the formatted rest part with the last three digits
    let formattedNumber = formattedRest + "," + lastThree;

    return formattedNumber;
  }

  async function fetchCar(endPoint, option) {
    const car = await fetch(endPoint, option);
    return car.json();
  }
  const { publishDomain } = await fetchPlaceholders();
  let itemArray = [];
  let filterArray = [];
  let tabList = [];
  const [
    modelIdEl,
    startingPriceTextEl,
    primaryCtaTextEl,
    primaryCtaLinkEl,
    primaryCtaTargetEl,
    secondaryCtaTextEl,
    secondaryCtaLinkEl,
    secondaryCtaTargetEl,
  ] = block.children;
  const graphQlEndpoint = `${publishDomain}/graphql/execute.json/msil-platform/arenaVariantList;modelId=${
    modelIdEl.querySelector("p").textContent
  }`;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetchCar(graphQlEndpoint, requestOptions)
    .then((response) => {
      console.log(response.data.variantList);
      itemArray = [...response.data?.variantList?.items];
      filterArray = [...itemArray];
    })
    .catch((e) => {
      console.warn(e.errorCode);
    });

  tabList = itemArray.map((items, i) => {
    if (!tabList.includes(items.fuelType)) return items.fuelType;
  });
  tabList.unshift("ALL");
  console.log(tabList);
  const modelId = modelIdEl?.textContent?.trim();
  const startingPriceText = startingPriceTextEl?.textContent?.trim();
  const primaryCta = ctaUtils.getLink(
    primaryCtaLinkEl,
    primaryCtaTextEl,
    primaryCtaTargetEl,
    "button-primary-light"
  );
  primaryCta.classList.add("button");
  console.log(primaryCta);
  const secondaryCta = ctaUtils.getLink(
    secondaryCtaLinkEl,
    secondaryCtaTextEl,
    secondaryCtaTargetEl,
    "button-secondary-light"
  );
  function createItemList() {
    let itemHtml = "";
    filterArray.forEach((item, index) => {
      itemHtml += `<div class="variant__card">
        <div class="variant__image">
            <img alt="${item.variantName}" src="${publishDomain}${
        item.variantImage._dynamicUrl
      }" />
        </div>
        <div class="variant__content">
            <div class="variant__title">
                <p>${item.variantName}</p>
            </div>
            <div class="variant__discription">
                <p>${item.mileage} Km/L | ${item.highlightFeatures.join(
        " | "
      )}</p>
            </div>
            <div class="variant__price">
                <p>Starting Price <span>Rs. ${formatINR(
                  item.exShowroomPrice
                )}</span></p>
            </div>
        </div>
    </div>`;
    });
    return itemHtml;
  }

  const newHtml = `
  <div class="container container__slider">
      <div class="slider__tabContent">
        ${tabList
          .map((item, i) => {
            if (i < tabList.length - 1) {
              return (
                "<div class='tab__Iteam'>" +
                item +
                "</div><span class='tab__Iteam__saperator'> / </span>"
              );
            } else {
              return "<div class='tab__Iteam'>" + item + "</div>";
            }
          })
          .join("")}
      </div>
      <div class="variant-content">
        <div class="button__content">
            <button class="nav-arrow prev hide">←</button>
            <button class="nav-arrow next">→</button>
        </div>
      <div class="variant__cards">
          ${createItemList()}
      </div>
      </div>
      <div class="cta__container">
      ${primaryCta ? primaryCta.outerHTML : ""}
      ${secondaryCta ? secondaryCta.outerHTML : ""}
      </div>
  </div>
  `;

  block.innerHTML = "";
  block.insertAdjacentHTML("beforeend", utility.sanitizeHtml(newHtml));
  const sliderContainer = block.querySelector(".variant__cards");
  const prevButton = block.querySelector(".prev");
  const nextButton = block.querySelector(".next");
  const boxes = block.querySelectorAll(".variant__card");
  slider.initSlider(sliderContainer, prevButton, nextButton, boxes);
  block.querySelectorAll(".tab__Iteam").forEach(function (element, index) {
    if (index == 0) {
      element.classList.add("tab__active");
    }
    element.addEventListener("click", tabClick, false);
  });
  function tabClick() {
    block.querySelectorAll(".tab__Iteam").forEach(function (element) {
      element.classList.remove("tab__active");
    });
    this.classList.add("tab__active");
    if (this.textContent === "ALL") {
      filterArray = [...itemArray];
    } else {
      filterArray = itemArray.filter(
        (element) => this.textContent == element.fuelType
      );
    }
    block.querySelector(".variant__cards").innerHTML = "";
    block
      .querySelector(".variant__cards")
      .insertAdjacentHTML("beforeend", utility.sanitizeHtml(createItemList()));
    console.log(filterArray);
  }
}
