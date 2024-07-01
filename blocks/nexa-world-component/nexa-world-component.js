import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';
import ctaUtils from '../../utility/ctaUtils.js';


export default function decorate(block) {

  
    

    // Create the main container div
const container = document.createElement("div");     //let or const
container.className = "nexa-world__container";

// Create the content div
const content = document.createElement("div");
content.className = "nexa-world__content";
container.appendChild(content);

// Create the title div
const titleDiv = document.createElement("div");
titleDiv.className = "nexa-world__title";
content.appendChild(titleDiv);

// Create the pre-title paragraph
const preTitle = document.createElement("p");
preTitle.className = "pre-title";
preTitle.textContent = "Discover the";
titleDiv.appendChild(preTitle);

// Create the title paragraph
const title = document.createElement("p");
title.className = "title";
title.textContent = "Nexa World";
titleDiv.appendChild(title);

// Create the description paragraph
const description = document.createElement("p");
description.className = "description";
description.textContent = "Navigating the process of buying a car can be overwhelming, but our Buyer's Guide is here to make it a smooth and enjoyable experience.";
content.appendChild(description);

// Create the action div
const actionDiv = document.createElement("div");
actionDiv.className = "nexa-world__action";
content.appendChild(actionDiv);

// Create the link inside the action div
const link = document.createElement("a");
link.href = "#";
link.title = "#";
link.className = "button btn-title";
link.target = "_self";
actionDiv.appendChild(link);

// Create the paragraph inside the link
const linkText = document.createElement("p");
linkText.textContent = "Explore Nearby Dealers";
link.appendChild(linkText);

// Create the span inside the link
const iconSpan = document.createElement("span");
iconSpan.className = "location-icon";
link.appendChild(iconSpan);

// Create the teaser div
const teaserDiv = document.createElement("div");
teaserDiv.className = "nexa-world__teaser";
container.appendChild(teaserDiv);

// Create the links div inside the teaser
const linksDiv = document.createElement("div");
linksDiv.className = "nexa-world__links";
teaserDiv.appendChild(linksDiv);

// Create the unordered list inside the links div
const ul = document.createElement("ul");
linksDiv.appendChild(ul);

// Create list items and append them to the ul
const items = ["NEXA Blue", "Lifestyle", "Music", "Socials"];
items.forEach(function(item) {
  var li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
});

// Create the image div inside the teaser
const imgDiv = document.createElement("div");
imgDiv.className = "nexa-world__img";
teaserDiv.appendChild(imgDiv);

// Create the image element and append it to the image div
const img = document.createElement("img");
img.src = "/content/dam/nexa-world/Group%201321315474.png";
img.alt = "image_1";
imgDiv.appendChild(img);

// Append the container to the body (or any other element where you want to insert it)
document.body.appendChild(container);
 

// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
  blocks.forEach(decorate);
});
  }
