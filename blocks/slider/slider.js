import utility from "../../utility/utility.js";
import teaser from "../../utility/teaserUtils.js";

export default function decorate(block) {
    const [titleEl,...teaserListEl] = block.children;
    const sliderTitle = titleEl?.textContent?.trim() || "";

    const teasers = teaserListEl.map((card) => {
        const teaserObj = teaser.getTeaser(card)?.firstElementChild;
        utility.mobileLazyLoading(teaserObj, ".teaser__image img");
        return teaserObj.outerHTML;
      });

    const newHtml = `
        <div class="container">
            <div class="slider-content">
                <h2 class="slider-title">
                    ${sliderTitle}
                </h2>
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