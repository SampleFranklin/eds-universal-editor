import utility from "../../utility/utility.js";
import teaser from "../../utility/teaserUtils.js";
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const [titleEl,...teaserListEl] = block.children;
    const sliderTitle = titleEl.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    sliderTitle?.classList?.add("slider-title");
    const teasers = teaserListEl.map((card) => {
        const teaserObj = teaser.getTeaser(card)?.firstElementChild;
        moveInstrumentation(card,teaserObj);
        utility.mobileLazyLoading(teaserObj, ".teaser__image img");
        return teaserObj.outerHTML;
      });

    const newHtml = `
        <div class="container">
            <div class="slider-content">
               ${(sliderTitle) ? sliderTitle.outerHTML : ''}
            </div>
            <div class="teaser-content">
                <div class="teaser__cards">
                     ${teasers.join("")}
                </div>
            </div>
        </div>
        `;

    block.innerHTML = "";
    block.insertAdjacentHTML("beforeend", utility.sanitizeHtml(newHtml));

    console.log(block);
}