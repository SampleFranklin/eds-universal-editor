import utility from '../../utility/utility.js';
export default function decorate(block) {


  console.log(block);


  const [...dealerListEl] = block.children;
  console.log(dealerListEl);

  const dealersHTML = dealerListEl.map((dealer) => {
    const image = dealer.querySelector('picture');

    const title = dealer.querySelector('p')?.textContent?.trim() || '';
    const href = dealer.querySelector('a')?.href || '';

      if (image) {
        console.log()
    }

    return `
        <li>
            <a href=${href} >
                <div class="d-grid-item">
                    <div class="d-grid-item-icon">
                            ${(image) ? `<div class="feature__image">${image.outerHTML}</div>` : ''}
                    </div>

                    <div class="d-grid-item-title">
                        <h2>${title}</h2>
                    </div>
                </div>
            </a>
        </li>
    `;
  }).join('');

  const newHtml =
  `<div class="row">
        <div class="col-sm-12">
            <ul class="dealer-menu">
                   ${dealersHTML}
            </ul>
        </div>
    </div>
  </div>`


//  block.innerHTML = '';
//  block.insertAdjacentHTML('beforeend', utility.sanitizeHtml(newHtml));
  console.log(block);
}