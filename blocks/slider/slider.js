import utility from "../../utility/utility.js";
import teaser from "../../utility/teaserUtils.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const [titleEl, ...teaserListEl] = block.children;
  const sliderTitle = titleEl.querySelector(":is(h1,h2,h3,h4,h5,h6)");
  sliderTitle?.classList?.add("slider-title");
  const teasers = teaserListEl.map((card) => {
    const teaserObj = teaser.getTeaser(card)?.firstElementChild;
    moveInstrumentation(card, teaserObj);
    utility.mobileLazyLoading(teaserObj, ".teaser__image img");
    return teaserObj.outerHTML;
  });

  const newHtml = `
        <div class="container">
            <div class="slider-content">
               ${sliderTitle ? sliderTitle.outerHTML : ""}
            </div>
            <div class="teaser-content">
                <div class="button__content">
                <button class="nav-arrow prev">←</button>
                <button class="nav-arrow next">→</button>
                </div>
                <div class="teaser__cards">
                     ${teasers.join("")}
                </div>
            </div>
        </div>
        `;

  block.innerHTML = "";
  block.insertAdjacentHTML("beforeend", utility.sanitizeHtml(newHtml));
  const sliderContainer = document.querySelector(".teaser__cards");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const boxes = document.querySelectorAll(".teaser__card");

  let visibleBoxes = calculateVisibleBoxes();
  const totalBoxes = boxes.length;
  let currentIndex = 0;

  const updateSlider = () => {
    console.log(currentIndex);
    const boxWidth = boxes[0].offsetWidth;
    const offset = -currentIndex * boxWidth;
    sliderContainer.style.transform = `translateX(${offset}px)`;
  };

  prevButton.addEventListener("click", () => {
    console.log("click prv");
    currentIndex =
      currentIndex > 0 ? currentIndex - 3 : totalBoxes - visibleBoxes;
    updateSlider();
  });

  nextButton.addEventListener("click", () => {
    console.log("click next");
    currentIndex =
      currentIndex < totalBoxes - visibleBoxes ? currentIndex + 3 : 0;
    updateSlider();
  });

  // Calculate the number of visible boxes based on the window width
  function calculateVisibleBoxes() {
    const width = window.innerWidth;
    if (width >= 900) {
      return 3;
    } else if (width >= 600) {
      return 2;
    } else {
      return 1.5; // 1.5 slides on small screens
    }
  }
  // Ensure slider adjusts on window resize
  window.addEventListener("resize", () => {
    boxWidth = boxes[0].offsetWidth;
    visibleBoxes = calculateVisibleBoxes();
    sliderContainer.style.transition = "none";
    updateSlider();
    setTimeout(() => {
      sliderContainer.style.transition = "transform 0.5s ease-in-out";
    }, 0);
  });

  // Swipe functionality
  let startX, startY, endX, endY;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diffX = startX - endX;
    const diffY = startY - endY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 50) {
        // Swiped left
        currentIndex =
          currentIndex < totalBoxes - visibleBoxes ? currentIndex + 3 : 0;
      } else if (diffX < -50) {
        // Swiped right
        currentIndex =
          currentIndex > 0 ? currentIndex - 3 : totalBoxes - visibleBoxes;
      }
      updateSlider();
    }
  };

  sliderContainer.addEventListener("touchstart", handleTouchStart);
  sliderContainer.addEventListener("touchmove", handleTouchMove);
  sliderContainer.addEventListener("touchend", handleTouchEnd);

  // Initialize slider
  updateSlider();
  console.log(block);
}
