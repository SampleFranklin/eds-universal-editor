import TabUtils from "../../utility/tabsUtils.js";
import utility from "../../utility/utility.js";

function generateHighlightItemHTML(highlightItem, index) {
  const [titleEl, subtitleEl, , imageEl, ...hotspotsEl] =
    highlightItem.children;

    const hotspotsHTML = createHotspotsHTML(hotspotsEl);

  const image = imageEl?.querySelector("picture");
  if (image) {
    const img = image.querySelector("img");
    const alt = image.querySelector("img").alt || "Image Description";
    img.classList.add("hotspot-img");
    img.removeAttribute("width");
    img.removeAttribute("height");
    img.setAttribute("alt", alt);
  }

  const subtitle = subtitleEl?.textContent?.trim() || "";
  if (titleEl) {
    titleEl.classList.add("title");
  }

  const newHTML = utility.sanitizeHtml(`
        <div class="text-section">
            ${titleEl ? titleEl.outerHTML : ""}
        <div class="description">
            <p>${subtitle}</p>
          </div>
        </div>
        <div class="hotspots">
            ${image ? image.outerHTML : ""}
            ${hotspotsHTML ? hotspotsHTML : ""}
           
          </div>
    `);

  highlightItem.classList.add("safetyTabItem", `switch-index-${index}`);
  highlightItem.innerHTML = newHTML;
  return highlightItem.outerHTML;
}

function createHotspotsHTML(hotspotsEl) {
  
  return hotspotsEl.map(point => {
    // Assuming each el is structured as a <div> with three <p> elements
    const [topPercent, leftPercent, textContent] = Array.from(point.querySelectorAll('p')).map(p => p?.innerHTML?.trim() || '');
    return `
      <div class="circle open-top" style="top: ${topPercent}%; left: ${leftPercent}%" data-text="${textContent}">
        <div class="text-container">${textContent}</div>
      </div>
    `;
  }).join('');
}

function initializeHotspotExpansion(block){
  
  const circles = block.querySelectorAll(".circle");

   // Function to close all expanded hotspots
   function closeAllHotspots(currentCircle) {
    circles.forEach(circle => {
      if (circle !== currentCircle && circle.classList.contains("moved")) {
        circle.style.top = circle.dataset.originalTop;
        circle.style.left = circle.dataset.originalLeft;
        const line = circle.parentElement.querySelector(`.line[data-circle="${circle.dataset.circle}"]`);
        if (line) {
          line.remove();
        }
        circle.querySelector(".text-container").style.display = "none";
        circle.classList.remove("moved");
      }
    });
  }



  // Add click event listener to each circle
  circles.forEach(circle => {
      circle.addEventListener("click", function() {
          const rect = this.getBoundingClientRect();
          const containerRect = this.parentElement.getBoundingClientRect();
          const textContainer = this.querySelector(".text-container");

          // Close any other expanded hotspots
          closeAllHotspots(this);
          

          if (this.classList.contains("moved")) {
              // Move back to original position and remove line
              this.style.top = this.dataset.originalTop;
              this.style.left = this.dataset.originalLeft;
              const line = this.parentElement.querySelector(`.line[data-circle="${this.dataset.circle}"]`);
              if (line) {
                  line.remove();
              }
              textContainer.style.display = "none";
              this.classList.remove("moved");
          } else {
              // Save original position
              if (!this.dataset.originalTop) {
                  this.dataset.originalTop = this.style.top;
              }
              if (!this.dataset.originalLeft) {
                  this.dataset.originalLeft = this.style.left;
              }
              this.dataset.circle = `${Math.random().toString(36).substr(2, 9)}`;

              // Create and add line
              const line = document.createElement("div");
              line.classList.add("line");
              line.dataset.circle = this.dataset.circle;

              if (this.classList.contains("open-top")) {
                  line.style.top = `${-68}px`;
                  line.style.left = `${rect.left - containerRect.left + rect.width / 2 - 1}px`;
                  line.style.height = `${rect.top - containerRect.top + 68  }px`;
                  this.style.top = `calc(0% - 68px - 10px)`;

                  textContainer.style.top = '0';
                  textContainer.style.left = `15px`;

              } 
              this.parentElement.appendChild(line);
              this.classList.add("moved");
              textContainer.style.display = "block";
          }
      });
  });

   // Add resize event listener to window
   window.addEventListener("resize", closeAllHotspots);
}

export default function decorate(block) {

  const blockClone = block.cloneNode(true);
  const highlightItemListElements = Array.from(block.children);
  const highlightItemListElementsClone = Array.from(blockClone.children);

  const highlightItemsHTML = highlightItemListElements
    .map((highlightItem, index) =>
      generateHighlightItemHTML(highlightItem, index)
    )
    .join("");
  const switchListHTML = TabUtils.generateSwitchListHTML(
    highlightItemListElementsClone,
    (highlightItem) => {
      const [, , tabNameEl] = highlightItem.children;
      return tabNameEl?.textContent?.trim() || "";
    }
  );

  block.innerHTML = `
    <div class="safetyTabItems-container">${highlightItemsHTML}</div>
    ${switchListHTML}`;

  TabUtils.setupTabs(block, "safetyTabItem");

  initializeHotspotExpansion(block);

  return block;
}
