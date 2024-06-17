import { getTeaser } from "../teaser/teaser.js";

export default function decorate(block) {
  block.classList.add('finance-service');
  const commonTitle = block.querySelector('.teaser-list > div:first-child > div > p').innerText;
  const teasers = Array.from(block.querySelectorAll('.teaser-list > div:not(:first-child)')).map((card) => {
    return getTeaser(card).outerHTML;
//     const imgSrc = card.querySelector('img')?.src;
//     const altText = card.querySelector('div:nth-of-type(2) > p')?.innerText;
//     const preTitle = card.querySelector('div:nth-of-type(3) > p')?.innerText;
//     const title = card.querySelector('div:nth-of-type(4) > p')?.innerText;
//     const description = Array.from(card.querySelectorAll('div:nth-of-type(5) p:not(.button-container)')).map((p) => p.innerText).join(' ');

//    // const ctaElements = card.querySelectorAll('div:nth-of-type(5) p.button-container a');
//    // const ctas = Array.from(ctaElements).map((cta) => cta.outerHTML);

//     const ctaElements = card.querySelectorAll('div:nth-of-type(5) p.button-container a');
//     const ctas = Array.from(ctaElements).map((cta, index) => {
//         const buttonText = cta.textContent.trim();
//         if (index === 0) {
//             return `<button class="btn btn--primary-solid" href="#">${buttonText}</button>`;
//         } else if (index === 1) {
//             return `<a class="btn--link btn--link-primary" href="#">${buttonText} <span class="test-icon" ></span></a>`;
//         }
//     });
//  //  ${ctas.map((cta, index) => `<div class="teaser-action teaser-action-${index}">${cta}</div>`).join('')}
//     card.outerHTML = card.innerHTML;
//     card.innerHTML = `
//             <div class="finance-service__card">
//                 <div class="finance-service__card__image">
//                     ${(imgSrc) ? `<div class="image-container"><img src="${imgSrc}" alt="${altText || title}"></div>` : ''}
//                 </div>
//                 <div class="finance-service__card__content">
//                   <div class="finance-service__card__description">
//                       ${(preTitle) ? `<p class="finance-service__card__pretitle">${preTitle}</p>` : ''}
//                       ${(title) ? `<h3>${title}</h3>` : ''}
//                       ${(description) ? `<p class="finance-service__card__info">${description}</p>` : ''}
//                   </div>
//                   <div class="finance-service__card__actions">
//                     ${ctas.map((cta, index) => `${cta}`).join('')}
//                   </div>
//                 </div>
//             </div>

//         `;
//     return card.innerHTML;
  });

  const newHtml = `
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-sm-8 col-sm-10">
                <h2 class="text-color-tertiary">
                    ${commonTitle}
                </h2>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="finance-service__cards">
                     ${teasers.join('')}
                </div>
            </div>
        </div>
    </div>
    `;

  block.innerHTML = newHtml;
//   toggleFocusedClass();
  mobileLazyLoading();
}

function mobileLazyLoading(){
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const imgElement = document.querySelector('.image-container img');
    if (isMobile && imgElement) {
      imgElement.setAttribute('loading', 'lazy');
    }
}


// function toggleFocusedClass() {

//     var cards = document.querySelectorAll('.finance-service__cards .finance-service__card');
//     cards[0].classList.add('finance-service__card--focused');

//     cards.forEach(function(card) {
//         card.addEventListener('click', function() {
//             cards.forEach(function(card) {
//                 card.classList.remove('finance-service__card--focused');
//             });
//             this.classList.add('finance-service__card--focused');
//         });
//     });

// // Sroll the cards on click
//     const teaserCards = document.querySelectorAll('.finance-service__card');

//     teaserCards.forEach(teaserCard => {
//         teaserCard.addEventListener('click', () => {
//             teaserCards.forEach(c => c.classList.remove('finance-service__card--focused'));
//             teaserCard.classList.add('finance-service__card--focused');

//             const focusedTeaserCard = document.querySelector('.finance-service__card--focused');

//             if (focusedTeaserCard) {
//                 const container = focusedTeaserCard.closest('.finance-service__cards');
//                 const cardOffsetLeft = focusedTeaserCard.offsetLeft;
//                 const containerOffsetLeft = container.offsetLeft;
//                 const scrollLeft = cardOffsetLeft - containerOffsetLeft;
//                 const cardWidth = focusedTeaserCard.offsetWidth;
//                 const containerWidth = container.clientWidth;
//                 const maxScrollLeft = Math.min(scrollLeft, container.scrollWidth - containerWidth);

//                 container.scrollTo({
//                     left: maxScrollLeft,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });

// }


