import { sanitizeHtml } from "../../scripts/utils.js";
import { getTeaser } from "../teaser/teaser.js";

export default function decorate(block) {
  
  let style= block.querySelector('.teaser-list > div:nth-child(2) > div > p').innerText.split(',')
  block.classList.add(...style);
  const commonTitle = block.querySelector('.teaser-list > div:first-child > div > p').innerText;
  const teasers = Array.from(block.querySelectorAll('.teaser-list > div:not(:first-child):not(:nth-child(2))')).map((card) => {
    const teaser = getTeaser(card);
    mobileLazyLoading(teaser);
    return teaser.outerHTML;
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
                <div class="teaser__cards">
                     ${teasers.join('')}
                </div>
            </div>
        </div>
    </div>
    `;

  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', sanitizeHtml(newHtml));
  toggleFocusedClass();
  mobileLazyLoading();
}

function mobileLazyLoading(teaser){
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const imgElement = teaser.querySelector('.teaser__image img');
    if (isMobile && imgElement) {
      imgElement.setAttribute('loading', 'lazy');
    }
}


 function toggleFocusedClass() {

     var cards = document.querySelectorAll('.teaser__cards .teaser__card');
     cards[0].classList.add('teaser__card--focused');

     cards.forEach(function(card) {
         card.addEventListener('click', function() {
             cards.forEach(function(card) {
                 card.classList.remove('teaser__card--focused');
             });
             this.classList.add('teaser__card--focused');
         });
     });

 // Sroll the cards on click
     const teaserCards = document.querySelectorAll('.teaser__card');

     teaserCards.forEach(teaserCard => {
         teaserCard.addEventListener('click', () => {
             teaserCards.forEach(c => c.classList.remove('teaser__card--focused'));
             teaserCard.classList.add('teaser__card--focused');

             const focusedTeaserCard = document.querySelector('.teaser__card--focused');

             if (focusedTeaserCard) {
                 const container = focusedTeaserCard.closest('.teaser__cards');
                 const cardOffsetLeft = focusedTeaserCard.offsetLeft;
                 const containerOffsetLeft = container.offsetLeft;
                 const scrollLeft = cardOffsetLeft - containerOffsetLeft;
                 const cardWidth = focusedTeaserCard.offsetWidth;
                 const containerWidth = container.clientWidth;
                 const maxScrollLeft = Math.min(scrollLeft, container.scrollWidth - containerWidth);

                 container.scrollTo({
                     left: maxScrollLeft,
                     behavior: 'smooth'
                 });
             }
         });
     });

 }


