export default function decorate(block) {

  const [imageEl, ...hotspots] = block.children;

  console.log("Blocks", blocks);
  console.log("Image", imageEl);
  console.log("Hotspots", hotspots);

  const btnIcon = ctaIconEL?.querySelector("img") || "";

  // Create offer cards
//   const ctaElements = ctasEl
//     .map((element, index) => {
//       const [ctaTextEl, linkEl] = element.children;
//       const ctaText = ctaTextEl?.textContent?.trim() || "";
//       const link = linkEl?.querySelector(".button-container a")?.href;

//       const newButton = document.createElement("a");
//       newButton.href = link;
//       newButton.innerHTML = `<p>${ctaText}</p>`;

//       if (index === 0) {
//         newButton.classList.add("nav-button", "active");
//       } else {
//         newButton.classList.add("nav-button");
//       }

//       element.innerHTML = "";
//       element.appendChild(newButton);

//       moveInstrumentation(element, newButton);

//       return element.innerHTML;
//     })
//     .join("");

//   block.innerHTML = utility.sanitizeHtml(`
//     <div class="image-container">
//     <img src="tata.jpg" alt="Sample Image">
//     <div class="circle open-bottom" style="top: 20%; left: 30%;" data-text="Bottom Circle">
//         <div class="text-container">Bottom Circle</div>
//     </div>
//     <div class="circle open-top" style="top: 50%; left: 60%;" data-text="Top Circle">
//         <div class="text-container">Top Circle</div>
//     </div>
//     <div class="circle open-left" style="top: 70%; left: 80%;" data-text="Left Circle">
//         <div class="text-container">Left Circle</div>
//     </div>
//     <div class="circle open-right" style="top: 40%; left: 20%;" data-text="Right Circle">
//         <div class="text-container">Right Circle</div>
//     </div>
// </div>
// `);
}
