import ctaUtils from '../../utility/ctaUtils.js';
import utility from '../../utility/utility.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

async function fetchCar(domain) {
  const car = await fetch(
    `${domain}/graphql/execute.json/msil-platform/arenaBannerList?q=123`,
  );
  return car.json();
}

function generateVariantList(carData) {
  if (!carData || !carData.data) {
    return '';
  }
  const variantItems = carData.data.carModelList.items.slice(0, 4).map(car => `
      <li>
        <p>${car.carName}</p>
        <p>${car.bodyType}</p>
      </li>
    `).join('');

    return `<ul>${variantItems}</ul>`;
  }

export default async function decorate(block) {
    const [
          imageEl,
          titleEl,
          descriptionEl,
          ctaTextEl,
          ctaLinkEl,
          ctaTargetEl,
          featureTypeEl,
    ] = block.children;

    const image = imageEl?.querySelector('picture');
    if (image) {
        const img = image.querySelector('img');
        img.removeAttribute('width');
        img.removeAttribute('height');
    }

    const title = `<h2>A powerful engine under the hood.</h2>`;
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
    const cta = ctaUtils.getLink(ctaLinkEl, ctaTextEl, ctaTargetEl, 'button-primary-light');
    const featureType = featureTypeEl?.textContent?.trim();

    let ctaHtml = '';
    if (cta) {
      ctaHtml = `
                     <div class="cta__actions">
                       ${(cta) ? cta.outerHTML : ''}
                     </div>
                   `;
    }
    let variantData = '';

    if(featureType) {
      block.classList.add(featureType);
      console.log(featureType);
           // Fetch Car Variant for 'feature-performance'
            if (featureType === 'feature-performance') {
             const { publishDomain } = await fetchPlaceholders();
             const carData = await fetchCar(publishDomain);
             variantData = generateVariantList(carData);
             console.log(carData);
            }
    }

    block.innerHTML = '';
    block.insertAdjacentHTML(
      'beforeend',
      utility.sanitizeHtml(`
                       <div class="feature__card">
                           ${(image) ? `<div class="feature__image">${image.outerHTML}</div>` : ''}
                           ${(variantData) ? `<div class="bottom__image"></div>` : ''}
                           <div class="feature__content">
                           ${(variantData) ? `<div class="feature__variant">${variantData}</div>` : ''}
                               <div class="feature__info">
                                   ${(title) ? `<div class="feature__title"><h2>A powerful engine under the hood.</h2></div>` : ''}
                                   ${(description) ? `<div class="feature__description">${description}</div>` : ''}
                               </div>
                               ${ctaHtml}
                           </div>
                       </div>
                 `),
    );
    block.classList.add("container");
    console.log(block);


}