import utility from '../../utility/utility.js';

export default async function decorate(block) {
  const title = block.children[0]?.querySelector(':is(h1,h2,h3,h4,h5,h6');
  title?.classList?.add('container', 'icon-text-title');
  // Select all the <div> elements that represent each advantage card
  const cardElements = block.querySelectorAll('div > picture');

  // Initialize a string to hold the HTML structure
  let newContainerHTML = `${title?.outerHTML}<div class="container advantages-container">`;

  // Loop through each card element and build the desired structure using template literals
  cardElements?.forEach((pictureElement, index) => {
    // Get the image from the <picture> tag
    const imgElement = pictureElement?.querySelector('img');
    pictureElement.classList.add('advantage-class');
    const imgSrc = imgElement ? imgElement.src : '';
    const imgAlt = imgElement ? imgElement.alt : `Advantage ${index + 1} Icon`;

    // Get the text content from the <p> tag
    const textElement = pictureElement?.parentElement?.nextElementSibling?.querySelector('p');
    const textContent = textElement ? textElement.innerHTML : '';

    // Append the HTML for this card to the container string using template literals
    pictureElement.innerHTML = `
                  <div class="icon">
                      <img src="${imgSrc}" alt="${imgAlt}">
                  </div>
                  <div class="content">
                      <p>${textContent}</p>
                  </div>`;
                  newContainerHTML += pictureElement.outerHTML;
  });

  // Close the container div
  newContainerHTML += '</div>';

  block.innerHTML = '';
  // Append the new container to the body or another parent element
  block.innerHTML = utility.sanitizeHtml(newContainerHTML);
}
