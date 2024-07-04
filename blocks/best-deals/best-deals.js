import utility from "../../utility/utility.js";
import teaser from "../../utility/teaserUtils.js";
import slider from "../../utility/sliderUtil.js";
import ctaUtils from "../../utility/ctaUtils.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const [
    titleEl,
    subtitleEl,
    ctaTextEl,
    ctaLinkEl,
    ctaTargetEl,
    ...teaserListEl
  ] = block.children;
  const sliderTitle = titleEl.querySelector(":is(h1,h2,h3,h4,h5,h6)");
  const subtitle = subtitleEl?.textContent?.trim();
  const primaryCta = ctaUtils.getLink(ctaLinkEl, ctaTextEl, ctaTargetEl, 'explore-button');

    const teasers = teaserListEl.map((card) => {
      const teaserObj = teaser.getTeaser(card)?.firstElementChild;
      moveInstrumentation(card, teaserObj);
      utility.mobileLazyLoading(teaserObj, ".teaser__image img");
      return teaserObj.outerHTML;
    });

    const bestDealsHtml = `
        <div class="container container__slider">
            <div class="slider-header">
              ${sliderTitle ? sliderTitle.outerHTML : ""}
              <p>${subtitle}</p>
              ${(primaryCta) ? primaryCta.outerHTML : ''}
            </div>	
        <div class="teaser-content">
            <div class="button__content">
              <button class="nav-arrow prev hide">←</button>
              <button class="nav-arrow next">→</button>
            </div>
            <div class="teaser__cards">
                ${teasers.join("")}
            </div>
        </div>
      </div>
    `
    const parser = new DOMParser();
    const doc = parser.parseFromString(bestDealsHtml, 'text/html');
    const teaserCards = doc.querySelectorAll('.teaser__card');

    teaserCards.forEach(function(card) {
      const actionsDiv = card.querySelector('.teaser__actions');
      const anchorTag = actionsDiv.querySelector('a');

        anchorTag.classList.remove('primary__btn');
        anchorTag.classList.add('best-deals-btn');

      const anchorWrapper = anchorTag.cloneNode();

      actionsDiv.remove();

      anchorWrapper.innerHTML = card.outerHTML;
      card.replaceWith(anchorWrapper);
    });

    const updatedHtmlString = doc.body.innerHTML;
    
    block.innerHTML = "";
    block.insertAdjacentHTML("beforeend", utility.sanitizeHtml(updatedHtmlString));
    
    const sliderContainer = document.querySelector(".teaser__cards");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const boxes = document.querySelectorAll(".best-deals-btn");
    slider.initSlider(sliderContainer, prevButton, nextButton, boxes);  

}