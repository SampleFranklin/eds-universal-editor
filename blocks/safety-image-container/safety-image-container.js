export default function decorate(block) {

  const [imageEl, ...hotspots] = block.children;

  console.log("Blocks", block);
  console.log("Image", imageEl);
  console.log("Hotspots", hotspots);

 const image = imageEl?.querySelector("img") || "";


 const hotspotsPoints = hotspots
    .map((hotspot, index) => {
      const [xAxis, yAxis, direction, description] = hotspot.children;
      const xPos = xAxis?.textContent?.trim() || 0;
      const yPos = yAxis?.textContent?.trim() || 0;
      const openDirection = direction?.textContent?.trim() || "";
     
     

      const div = document.createElement('div');
        div.className = 'circle open-top';
        div.style.top = `${xPos}%`;
        div.style.left = `${yPos}%`;
       
        description.classList.add('text-container');
      
        // Append the text container to the main div
        div.appendChild(description);

        return div.outerHTML;
    })
    .join("");

    console.log("Hotsopts Generated:",hotspotsPoints )
 

  // Create offer cards
//   

  block.innerHTML = `
    <div class="image-container">
    <img src="${image.src}" alt="Sample Image">
        ${hotspotsPoints}
    </div>
`;

const circles = document.querySelectorAll(".circle");

circles.forEach(circle => {
    circle.addEventListener("click", function() {
        const rect = this.getBoundingClientRect();
        const containerRect = this.parentElement.getBoundingClientRect();
        const textContainer = this.querySelector(".text-container");

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

            if (this.classList.contains("open-bottom")) {
                line.style.top = `${rect.top - containerRect.top + rect.height}px`;
                line.style.left = `${rect.left - containerRect.left + rect.width / 2 - 1}px`;
                line.style.height = `${containerRect.height - (rect.top - containerRect.top + rect.height) + 68}px`;
                this.style.top = 'calc(100% + 68px)';

                textContainer.style.top = `0px`;
                textContainer.style.left =  `15px`;

            } else if (this.classList.contains("open-top")) {
                line.style.top = `${-68}px`;
                line.style.left = `${rect.left - containerRect.left + rect.width / 2 - 1}px`;
                line.style.height = `${rect.top - containerRect.top + 68  }px`;
                this.style.top = `calc(0% - 68px - 10px)`;

                textContainer.style.top = '0';
                textContainer.style.left = `15px`;

            } else if (this.classList.contains("open-left")) {
                line.classList.add("line-horizontal");
                line.style.top = `${rect.top - containerRect.top + rect.height / 2 - 1}px`;
                line.style.left = `${-68}px`;
                line.style.width = `${rect.left - containerRect.left + 68}px`;
                this.style.left = 'calc(0% - 68px)';

                textContainer.style.top = `15px`;
                textContainer.style.left = '0';

            } else if (this.classList.contains("open-right")) {
                line.classList.add("line-horizontal");
                line.style.top = `${rect.top - containerRect.top + rect.height / 2 - 1}px`;
                line.style.left = `${rect.left - containerRect.left + rect.width}px`;
                line.style.width = `${containerRect.width - (rect.left - containerRect.left + rect.width)+68}px`;
                this.style.left = 'calc(100% + 68px)';

                textContainer.style.top = `15px`;
                textContainer.style.left = `0px`;
            }

            this.parentElement.appendChild(line);
            this.classList.add("moved");
            textContainer.style.display = "block";
        }
    });
});





}
