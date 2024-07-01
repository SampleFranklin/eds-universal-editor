import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';
import ctaUtils from '../../utility/ctaUtils.js';

export default function decorate(block) {

// Function to create the Nexa World container
function createNexaWorldContainer() {
    // Create container div
    const container = document.createElement('div');
    container.className = 'nexa-world__container';
  
    // Create content div
    const content = document.createElement('div');
    content.className = 'nexa-world__content';
  
    // Create title div
    const titleDiv = document.createElement('div');
    titleDiv.className = 'nexa-world__title';
  
    // Create pre-title paragraph
    const preTitle = document.createElement('p');
    preTitle.className = 'pre-title';
    preTitle.textContent = 'Discover the';
  
    // Create title paragraph
    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = 'Nexa World';
  
    // Append pre-title and title to title div
    titleDiv.appendChild(preTitle);
    titleDiv.appendChild(title);
  
    // Create description paragraph
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = 'Navigating the process of buying a car can be overwhelming, but our Buyer\'s Guide is here to make it a smooth and enjoyable experience.';
  
    // Create action div
    const actionDiv = document.createElement('div');
    actionDiv.className = 'nexa-world__action';
  
    // Create anchor link
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.title = 'Explore Nearby Dealers';
    anchor.className = 'button btn-title';
    anchor.target = '_self';
  
    // Create anchor text
    const anchorText = document.createElement('p');
    anchorText.textContent = 'Explore Nearby Dealers';
  
    // Create location icon span
    const locationIcon = document.createElement('span');
    locationIcon.className = 'location-icon';
  
    // Append anchor text and icon to anchor
    anchor.appendChild(anchorText);
    anchor.appendChild(locationIcon);
  
    // Append anchor to action div
    actionDiv.appendChild(anchor);
  
    // Append title div, description, and action div to content div
    content.appendChild(titleDiv);
    content.appendChild(description);
    content.appendChild(actionDiv);
  
    // Create teaser div
    const teaser = document.createElement('div');
    teaser.className = 'nexa-world__teaser';
  
    // Create links div
    const linksDiv = document.createElement('div');
    linksDiv.className = 'nexa-world__links';
  
    // Create unordered list
    const ul = document.createElement('ul');
  
    // List items
    const items = ['NEXA Blue', 'Lifestyle', 'Music', 'Socials'];
    items.forEach(itemText => {
      const li = document.createElement('li');
      li.textContent = itemText;
      ul.appendChild(li);
    });
  
    // Append list to links div
    linksDiv.appendChild(ul);
  
    // Create image div
    const imgDiv = document.createElement('div');
    imgDiv.className = 'nexa-world__img';
  
    // Create image element
    const img = document.createElement('img');
    img.src = '/';
    img.alt = 'image';
  
    // Append image to image div
    imgDiv.appendChild(img);
  
    // Append links div and image div to teaser div
    teaser.appendChild(linksDiv);
    teaser.appendChild(imgDiv);
  
    // Append content div and teaser div to container
    container.appendChild(content);
    container.appendChild(teaser);
  
    // Return the container
    return container;
  }
  
  // Append the created container to the body or any specific element
  document.body.appendChild(createNexaWorldContainer());
}