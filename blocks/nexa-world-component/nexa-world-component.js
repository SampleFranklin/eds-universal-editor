import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';
import ctaUtils from '../../utility/ctaUtils.js';


export default function decorate(block) {

  const [
    pretitleEl,
    titleEl,
    descriptionEl,
    ctaTextEl,
    hrefEl,
    targetEl,
    iconEl
] = block.children; 
  const pretitle= pretitleEl?.textContent?.trim();
  const title = titleEl?.textContent?.trim() || '';
  const description = descriptionEl?.textContent?.trim();
    const cta = (ctaLinkEl) ? {
      href: ctaLinkEl.querySelector('a')?.href || '#',
      title: ctaLinkEl.querySelector('a')?.title || '',
      target: ctaLinkEl.querySelector('a')?.target || '_self',
      textContent: ctaTextEl?.textContent?.trim() || ''
    } : null;
console.log(iconEl);

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
preTitle.textContent =pretitle;
titleDiv.appendChild(preTitle);

// Create the title paragraph
const title1 = document.createElement("p");
title.className = "title";
title.textContent = title;
titleDiv.appendChild(title);

// Create the description paragraph
const description1 = document.createElement("p");
description.className = "description";
description.textContent = description;
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
linkText.textContent = "ctaText";
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
const items = `${ctaWithIcon}`;
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
block.innerHTML='';
block.appendChild(container);
  }