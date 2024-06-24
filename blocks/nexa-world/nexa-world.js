import utility from './utility.js';
import ctaUtils from './ctaUtils.js';

export default function decorate(block) {
  // HTML structure
  const html = `
    <div class="nexa-world__container">
      <div class="nexa-world__content">
        <div class="nexa-world__title">
          <p class="pre-title">Discover the</p>
          <p class="title">Nexa World</p>
        </div>
        <p class="description">Navigating the process of buying a car can be overwhelming, but our Buyer's Guide is here to make it a smooth and enjoyable experience.</p>
        <div class="nexa-world__action">
          <a href="#" title="#" class="button btn-title" target="_self">
            <p>Explore Nearby Dealers</p>
            <span class="location-icon"></span>
          </a>
        </div>
      </div>
      <div class="nexa-world__teaser">
        <div class="nexa-world__links">
          <ul>
            <li data-image-src="image1.jpg">NEXA Blue</li>
            <li data-image-src="image2.jpg">Lifestyle</li>
            <li data-image-src="image3.jpg">Music</li>
            <li data-image-src="image4.jpg">Socials</li>
          </ul>
        </div>
        <div class="nexa-world__img">
          <img id="nexa-img" src="/" alt="image" />
        </div>
      </div>
    </div>
  `;

  // Sanitize and insert the HTML into the block
  block.innerHTML = utility.sanitizeHtml(html);

  // JavaScript for handling image hover effects
  const listItems = block.querySelectorAll('.nexa-world__links li');
  const image = block.querySelector('#nexa-img');

  listItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const imageSrc = item.getAttribute('data-image-src');
      image.setAttribute('src', imageSrc);
    });

    item.addEventListener('mouseleave', () => {
      image.setAttribute('src', '/'); // Reset image
    });
  });
}



