import { sanitizeHtml } from '../../scripts/utils.js';
import {Teaser} from '../teaser/teaser.js';

class TeaserList {
  constructor(block) {
    this.block = block;
    this.teasers = [];
  }

  mobileLazyLoading(teaser) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const imgElement = teaser.querySelector('.teaser__image img');
    if (isMobile && imgElement) {
      imgElement.setAttribute('loading', 'lazy');
    } else if (!isMobile && imgElement) {
      imgElement.setAttribute('loading', 'eager');
    }
  }

  toggleFocusedClass() {
    const cards = this.block.querySelectorAll('.teaser__cards .teaser__card');
    cards[0].classList.add('teaser__card--focused','teaser__left');
    cards[1].classList.add('teaser__card--unfocused', 'teaser__right')

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        cards.forEach((el) => {
            el.classList.remove('teaser__card--focused');
            el.classList.add('teaser__card--unfocused'); 
        });
        card.classList.add('teaser__card--focused');
        card.classList.remove('teaser__card--unfocused');

      });
    });

    const teaserCards = this.block.querySelectorAll('.teaser__card');

    teaserCards.forEach((teaserCard) => {
      teaserCard.addEventListener('click', () => {
        teaserCards.forEach((c) => c.classList.remove('teaser__card--focused'));
        teaserCard.classList.add('teaser__card--focused');

        const focusedTeaserCard = this.block.querySelector('.teaser__card--focused');

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

  decorate() {
    const [titleEl, styleEl, ...cards] = this.block.children;
    const style = styleEl?.textContent?.trim().split(',');
    this.block.classList.add(...style);
    const commonTitle = titleEl?.textContent?.trim() || '';

    cards.forEach((card) => {
      const teaser = new Teaser(card); // Create instance of Teaser for each card
      this.teasers.push(teaser); // Store teaser instance in teasers array
      this.mobileLazyLoading(teaser.getTeaser()); // Call getTeaser and apply mobile lazy loading
    });

    const teasersHtml = this.teasers.map((teaser) => teaser.block.outerHTML).join('');

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
              ${teasersHtml}
            </div>
          </div>
        </div>
      </div>
    `;

    this.block.innerHTML = '';
    this.block.insertAdjacentHTML('beforeend', sanitizeHtml(newHtml));
    this.toggleFocusedClass();
  }
}

export default function decorate(block) {
  const teaserList = new TeaserList(block);
  teaserList.decorate();
}