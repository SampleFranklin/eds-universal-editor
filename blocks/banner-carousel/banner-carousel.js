import ctaUtils from "../../utility/ctaUtils.js";

async function fetchCar() {
  const car = await fetch(
    "https://publish-p71852-e1137339.adobeaemcloud.com/graphql/execute.json/msil-platform/arenaBannerList?q=123"
  );
  return await car.json();
}

function convertToLakh(number) {
  if (number) return number / 100000;
}

export default async function decorate(block) {
  console.log(block);
  const carResponse = await fetchCar();
  const carsObject = carResponse?.data?.carModelList?.items?.reduce(
    (acc, car) => {
      acc[car.modelId] = car;
      return acc;
    },
    {}
  );

  const carContainersWrapper = document.createElement("div");

  const [bGImgContainer, ...carList] = block.children;

  const bgImg = bGImgContainer.querySelector('picture')

  carList.forEach((element) => {
    const [
      title,
      modelId,
      type,
      onRoadPrice,
      primaryCtaTextEl,
      primaryCtaLinkEl,
      primaryCtaTargetEl,
      secondaryCtaTextEl,
      secondaryCtaLinkEl,
      secondaryCtaTargetEl,
    ] = element.children;

    const carObjectItem = carsObject[modelId?.textContent];

    const [firstLetterTitle, ...rest] = title?.textContent?.split(" ");
    const restTitle = rest.join(" ");

    const primaryCta = ctaUtils.getLink(primaryCtaLinkEl, primaryCtaTextEl, primaryCtaTargetEl, 'primary__btn');
    const secondaryCta = ctaUtils.getLink(secondaryCtaLinkEl, secondaryCtaTextEl, secondaryCtaTargetEl, 'secondary__btn');
    carContainersWrapper.innerHTML += `
      <div class="car-container">
          <img
            src=${carObjectItem?.carImage?._publishUrl || ''}
            alt=${carObjectItem?.carName || ''}
            class="sidebar-car--image"
          />
          <div class="sidebar">
            <div class="sidebar_text_container">
              <div class="text-container">
                <span>${firstLetterTitle || ''} ${restTitle || ''}</span>
              </div>
              <img
                src=${carObjectItem?.carLogoImage?._publishUrl || ''}
                alt=${carObjectItem?.carName || ''}
                class="sidebar-car--logo"
              />
              <span><strong>${carObjectItem?.bodyType}</strong> | ${type?.textContent || ''}</span>
              <div class="sidebar--hr"></div>
              <div class="sidebar--details">
                <div class="sidebar--details--exshowroom">
                  <span>Ex. showroom:</span>
                  <span><strong>${convertToLakh(carObjectItem?.exShowroomPrice) || ''} Lakhs</strong></span>
                </div>
                <div class="sidebar--details--onroad">
                  <span>Estd. On-road in Gurgaon:</span>
                  <span><strong>${onRoadPrice?.textContent || ''}</strong></span>
                </div>
              </div>
              <div class="buttons">
                ${(primaryCta) ? primaryCta.outerHTML : ''}
                ${(secondaryCta) ? secondaryCta.outerHTML : ''}
              </div>
            </div>
          </div>
        </div>
    `;
  });

  const heroBannerWrapper = `
    <div class="hero_banner_container_wrapper">
      ${bgImg.outerHTML}
      <div class="hero_banner_container">
        <button class="pre-btn"><img src="../../icons/arrow_backward.svg" alt="previous" /></button>
        <button class="nxt-btn"><img src="../../icons/arrow_forward.svg" alt="next" /></button>
        ${carContainersWrapper.innerHTML}
      </div>
    </div>
  `;

  block.innerHTML = heroBannerWrapper;

  const nxtBtn = document.querySelector(".nxt-btn");
  const preBtn = document.querySelector(".pre-btn");

  function addBGToSlider(indexSidebar, sideBarItem) {
    if (indexSidebar === 0) {
      sideBarItem.classList.add("left_sidebar");
      const img = document.createElement("img");
      img.src = "../../icons/title_cover_blue.svg";
      sideBarItem.querySelector(".text-container").prepend(img);
    } else if (indexSidebar === 1) {
      sideBarItem.classList.add("mid_sidebar");
      const img = document.createElement("img");
      img.src = "../../icons/title_cover_yellow.svg";
      sideBarItem.querySelector(".text-container").prepend(img);
    } else if (indexSidebar === 2) {
      sideBarItem.classList.add("right_sidebar");
      const img = document.createElement("img");
      img.src = "../../icons/title_cover_yellow.svg";
      sideBarItem.querySelector(".text-container").prepend(img);
    }
  }

  function addImgToTitleDesktop(indexSidebar, sideBarItem) {
    if (indexSidebar === 0) {
      const img = document.createElement("img");
      img.src = "../../icons/title_cover_blue.svg";
      sideBarItem.querySelector(".text-container").prepend(img);
    } else if (indexSidebar === 1) {
      const img = document.createElement("img");
      img.src = "../../icons/title_cover_yellow.svg";
      sideBarItem.querySelector(".text-container").prepend(img);
    } else if (indexSidebar === 2) {
      const img = document.createElement("img");
      img.src = "../../icons/title_cover_yellow.svg";
      sideBarItem.querySelector(".text-container").prepend(img);
    }
  }

  function addImgToTitleMobile(indexSidebar, sideBarItem) {
    const img = document.createElement("img");
    img.src = "../../icons/title_cover_yellow.svg";
    sideBarItem.querySelector(".text-container").prepend(img);
  }

    const isDesktop = window.innerWidth > 998;
    const cards = document.querySelectorAll(".car-container");
    const cardCount = cards.length;
    let currentIndex = 0;
    const cardsPerPage = isDesktop ? 3 : 1;
    let highlightedSidebar = null;
    function showCards(index) {
      cards.forEach((card, i) => {
        const indexSidebar = i - index;
        const sideBarItem = card.querySelector(".sidebar");
        if (isDesktop) {
          addBGToSlider(indexSidebar, sideBarItem);
          addImgToTitleDesktop(indexSidebar, sideBarItem);
        }else{
          addImgToTitleMobile(indexSidebar, sideBarItem);
        }
        card.classList.remove("show");
        if (i >= index && i < index + cardsPerPage) {
          card.classList.add("show");
          card
            .querySelector(".sidebar-car--image")
            .addEventListener("mouseenter", function () {
              handleMouseEnter(card);
            });
          card
            .querySelector(".sidebar-car--image")
            .addEventListener("mouseleave", function () {
              handleMouseLeave(card);
            });
          card;
        }
      });

      const middleIndex = Math.floor(cardsPerPage / 2);
      if (index + middleIndex < cards.length) {
        cards[index + middleIndex].classList.add("highlight");
        highlightedSidebar = cards[index + middleIndex];
      }
    }

    const bullets = document.createElement("div");
    bullets.classList.add("bullets");
    bullets.id = "bullets";

    for (let i = 0; i < cardCount; i = i + cardsPerPage) {
      bullets.innerHTML += `<input id="bullet" type="radio" ${
        i === 0 ? "checked" : ""
      } />`;
    }

    document
      .querySelector(".hero_banner_container_wrapper")
      .appendChild(bullets);

    nxtBtn.addEventListener("click", function () {
      if (currentIndex + cardsPerPage < cards.length) {
        currentIndex += cardsPerPage;
        const pageCount = Math.floor(currentIndex / cardsPerPage);
        const bullets = document.querySelector("#bullets").children;
        bullets[pageCount - 1].checked = false;
        bullets[pageCount].checked = true;
        showCards(currentIndex);
      }
    });

    preBtn.addEventListener("click", function () {
      if (currentIndex - cardsPerPage >= 0) {
        currentIndex -= cardsPerPage;
        const pageCount = Math.floor(currentIndex / cardsPerPage);
        const bullets = document.querySelector("#bullets").children;
        bullets[pageCount + 1].checked = false;
        bullets[pageCount].checked = true;
        showCards(currentIndex);
      }
    });

    function handleMouseEnter(event) {
      if (highlightedSidebar) {
        highlightedSidebar.classList.remove("highlight");
      }

      highlightedSidebar = event;
      highlightedSidebar.classList.add("highlight");
    }

    function handleMouseLeave() {
      if (highlightedSidebar) {
        highlightedSidebar.classList.remove("highlight");
      }
      const middleIndex = currentIndex + Math.floor(cardsPerPage / 2);
      if (middleIndex < cards.length) {
        highlightedSidebar = cards[middleIndex];
        highlightedSidebar.classList.add("highlight");
      }
    }

    showCards(currentIndex);

    console.log(carsObject, bgImg, carList, carContainersWrapper);
}
