import utility from '../../utility/utility.js';
import ctaUtils from '../../utility/ctaUtils.js';
import teaser from '../../utility/teaserUtils.js';

export default function decorate(block) {
  function getNexaWorld() {
    const container = document.createElement('div');
    container.className = 'nexa-world__container';

    // Create the content section
    const content = document.createElement('div');
    content.className = 'nexa-world__content';

    // Create the title section
    const titleSection = document.createElement('div');
    titleSection.className = 'nexa-world__title';
    
    const preTitle = document.createElement('p');
    preTitle.className = 'pretitle';
    preTitle.textContent = 'Discover the';
    
    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = 'Nexa World';
    
    titleSection.appendChild(preTitle);
    titleSection.appendChild(title);

    // Create the description
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = "Navigating the process of buying a car can be overwhelming, but our Buyer's Guide is here to make it a smooth and enjoyable experience.";

    // Create the action section
    const actionSection = document.createElement('div');
    actionSection.className = 'nexa-world__action';

    const actionLink = document.createElement('a');
    actionLink.href = '#';
    actionLink.title = '#';
    actionLink.className = 'button btn-title';
    actionLink.target = '_self';

    const actionText = document.createElement('p');
    actionText.textContent = 'Discover Nexa World';
    
    const locationIcon = document.createElement('span');
    locationIcon.className = 'location-icon';

    actionLink.appendChild(actionText);
    actionLink.appendChild(locationIcon);
    actionSection.appendChild(actionLink);

    // Append title, description, and action to content
    content.appendChild(titleSection);
    content.appendChild(description);
    content.appendChild(actionSection);

    // Create the teaser section
    const teaser = document.createElement('div');
    teaser.className = 'nexa-world__teaser';

    // Create the links section
    const linksSection = document.createElement('div');
    linksSection.className = 'nexa-world__links';

    const ul = document.createElement('ul');

    const linkItems = ['NEXA Blue', 'Lifestyle', 'Music', 'Socials'];
    linkItems.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });

    linksSection.appendChild(ul);

    // Create the image section
    const imgSection = document.createElement('div');
    imgSection.className = 'nexa-world__img';

    const img = document.createElement('img');
    img.src = '/';
    img.alt = 'image';

    imgSection.appendChild(img);

    // Append links and image to teaser
    teaser.appendChild(linksSection);
    teaser.appendChild(imgSection);

    // Append content and teaser to container
    container.appendChild(content);
    container.appendChild(teaser);

    // Append the container to the body
    document.body.appendChild(container);

    // Add event listener to list items
    document.addEventListener('DOMContentLoaded', function() {
      const links = document.querySelectorAll('.nexa-world__links ul li');
      links.forEach(link => {
        link.addEventListener('click', () => {
          alert(`You clicked on ${link.textContent}`);
        });
      });
    });

  }
}