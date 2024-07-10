/**
* Utility for Carousel
*/
const carouselUtils = {
  /**
   * Callback for carousel slide changes
   * @callback onChange
   * @param {Element} [currentSlide] Current slide of the carousel
   * @param {Element} [targetSlide] Slide which going to be active
   * @param {number} [direction] Direction of the slides based on interaction
   * - Previous: -1
   * - Next: 1
   * - Dots: 0
   */
  /**
  * Intialises the carousel
  * @param {Element} [el] Parent element which will be replaced with carousel elements
  * @param {string} [className] Class name of the element which contains all the slides
  * @param {string} [carouselType] Type of the carousel - Supported types: `fade`
  * @param {onChange} [onChange] Callback for carousel slide changes
  * @returns {void}
  */
  init: (
    el,
    className,
    carouselType,
    {
      onChange = () => {},
      onReset = () => {},
      showArrows = true,
      showDots = true,
      dotsInteractive = true,
      navigationContainerClassName = ''
    }
  ) => {
    if (!el) {
      return;
    }

    const updateDots = (targetIndex, currentIndex) => {
      const currentDot = el.querySelector('.carousel__dot--active');
      const targetDot = el.querySelector(`.carousel__dot[data-target-index="${targetIndex}"]`);
      currentDot?.classList?.remove('carousel__dot--active');
      targetDot?.classList?.add('carousel__dot--active');
      if (targetIndex > currentIndex) {
        for (let i = currentIndex; i < targetIndex; i += 1) {
          el.querySelector(`.carousel__dot[data-target-index="${i}"]`)?.classList?.add('carousel__dot--visited');
        }
      } else {
        for (let i = currentIndex; i >= targetIndex; i -= 1) {
          el.querySelector(`.carousel__dot[data-target-index="${i}"]`)?.classList?.remove('carousel__dot--visited');
        }
      }
    }

    const updateNavigation = (targetIndex, size) => {
      const prev = el.querySelector('.carousel__navigation .carousel__prev');
      const next = el.querySelector('.carousel__navigation .carousel__next');
      if (targetIndex <= 0) {
        prev?.classList?.add('carousel__nav--disabled');
      } else {
        prev?.classList?.remove('carousel__nav--disabled');
      }
      if (targetIndex >= size - 1) {
        next?.classList?.add('carousel__nav--disabled');
      } else {
        next?.classList?.remove('carousel__nav--disabled');
      }
    }

    const navigateSlide = (direction = 0, position = null, isReset = false) => {
      const currentSlide = el.querySelector('.carousel__slide--active');
      const currentIndex = parseInt(currentSlide.dataset.slideIndex, 10);
      const targetIndex = position ?? (currentIndex + (direction ?? 0));
      let targetSlide = el.querySelector(`.carousel__slide[data-slide-index="${targetIndex}"]`);
      if (targetSlide) {
        if(isReset) {
          onReset(currentSlide, targetSlide);
        } else if (typeof onChange === 'function') {
          onChange(currentSlide, targetSlide, direction);
        }
        currentSlide.classList.remove('carousel__slide--active');
        targetSlide.classList.add('carousel__slide--active');
        updateNavigation(targetIndex, el.querySelectorAll('.carousel__slide').length);
        updateDots(targetIndex, currentIndex);
        return true;
      }
      return false;
    }

    if (carouselType === 'fade' || !carouselType) {
      el.classList.add('fade-carousel__wrapper');
    }
    const slidesWrapper = el.querySelector(`.${className}`);
    const dots = document.createElement('ul');
    slidesWrapper.classList.add('carousel__slides');
    [...slidesWrapper.children].forEach((slide, index) => {
      slide.classList.add('carousel__slide');
      slide.dataset.slideIndex = index;
      const dot = document.createElement('li');
      dot.classList.add('carousel__dot');
      dot.dataset.targetIndex = index;
      if (index === 0) {
        slide.classList.add('carousel__slide--active');
        dot.classList.add('carousel__dot--active');
      }
      dots.append(dot);
    });

    el.querySelector(`.${className}`).replaceWith(slidesWrapper);
    const navigationContainerEl = (navigationContainerClassName) ? el.querySelector(`.${navigationContainerClassName}`) : null;
    if (showDots) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel__dots';
      dotsContainer.append(dots);
      if(navigationContainerEl) {
        navigationContainerEl.insertAdjacentElement('beforeend', dotsContainer);
      } else {
        el.insertAdjacentElement('beforeend', dotsContainer);
      }
      if (dotsInteractive) {
        el.querySelectorAll('.carousel__dot')?.forEach((dot) => {
          dot.addEventListener('click', (e) => {
            const targetIndex = parseInt(e.target.dataset.targetIndex, 10);
            navigateSlide(0, targetIndex);
          });
        });
      }
    }

    if (showArrows) {
      const arrowsContainer = document.createElement('div');
      arrowsContainer.className = 'carousel__navigation';
      arrowsContainer.innerHTML = `
          <span class="carousel__prev carousel__nav--disabled"></span>
          <span class="carousel__next"></span>
      `;
      if(navigationContainerEl) {
        navigationContainerEl.insertAdjacentElement('beforeend', arrowsContainer);
      } else {
        el.insertAdjacentElement('beforeend', arrowsContainer);
      }
      el.querySelector('.carousel__prev')?.addEventListener('click', () => {
        navigateSlide(-1);
      });
      el.querySelector('.carousel__next')?.addEventListener('click', () => {
        navigateSlide(1);
      });
    }

    const prev = () => {
      return navigateSlide(-1);
    }
    const next = () => {
      return navigateSlide(1);
    }
    const reset = () => {
      return navigateSlide(0, 0, true);
    }

    return {
      prev: prev,
      next: next,
      reset: reset
    }
  },
};

export default carouselUtils;
