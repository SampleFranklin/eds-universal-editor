import { sanitizeHtml } from '../../scripts/utils.js';
import { getTeaser } from '../teaser/teaser.js';

function mobileLazyLoading(teaser) {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const imgElement = teaser.querySelector('.teaser__image img');
  if (isMobile && imgElement) {
    imgElement.setAttribute('loading', 'lazy');
  } else if (!isMobile && imgElement) {
    imgElement.setAttribute('loading', 'eager');
  }
}

function toggleFocusedClass() {
  const cards = document.querySelectorAll('.teaser__cards .teaser__card');
  cards[0].classList.add('teaser__card--focused');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((el) => {
        el.classList.remove('teaser__card--focused');
      });
      this.classList.add('teaser__card--focused');
    });
  });

  // Sroll the cards on click
  const teaserCards = document.querySelectorAll('.teaser__card');

  teaserCards.forEach((teaserCard) => {
    teaserCard.addEventListener('click', () => {
      teaserCards.forEach((c) => c.classList.remove('teaser__card--focused'));
      teaserCard.classList.add('teaser__card--focused');

      const focusedTeaserCard = document.querySelector('.teaser__card--focused');

      if (focusedTeaserCard) {
        const container = focusedTeaserCard.closest('.teaser__cards');
        const cardOffsetLeft = focusedTeaserCard.offsetLeft;
        const containerOffsetLeft = container.offsetLeft;
        const scrollLeft = cardOffsetLeft - containerOffsetLeft;
        const containerWidth = container.clientWidth;
        const maxScrollLeft = Math.min(scrollLeft, container.scrollWidth - containerWidth);

        container.scrollTo({
          left: maxScrollLeft,
          behavior: 'smooth',
        });
      }
    });
  });
}

export default function decorate(block) {
  const [titleEl, styleEl, ...cards] = block.children;

  const style = styleEl?.textContent?.trim().split(',');
  block.classList.add(...style);
  const commonTitle = titleEl?.textContent?.trim() || '';
  const teasers = cards.map((card) => {
    const teaser = getTeaser(card);
    mobileLazyLoading(teaser);
    return teaser.outerHTML;
  });

  const newHtml = `
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-sm-8 col-sm-10">
                <h2 class="text-color">
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
}
