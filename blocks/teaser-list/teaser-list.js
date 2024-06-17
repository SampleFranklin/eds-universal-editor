import { getTeaser } from "../teaser/teaser.js";

export default function decorate(block) {
  block.classList.add('finance-service');
  const commonTitle = block.querySelector('.teaser-list > div:first-child > div > p').innerText;
  const teasers = Array.from(block.querySelectorAll('.teaser-list > div:not(:first-child)')).map((card) => {
    return getTeaser(card).outerHTML;
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

  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', sanitizeHtml(newHtml));
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


