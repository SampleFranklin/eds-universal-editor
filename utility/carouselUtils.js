const carouselUtils = {
  init: (
    el,
    className,
    onChange = (currentSlide, targetSlide) => {},
  ) => {
    if (!el) {
      return
    }

    el.classList.add('carousel__wrapper');
    const slidesWrapper = el.querySelector('.' + className);
    const dots = document.createElement('ul');
    slidesWrapper.classList.add('carousel__slides');
    [...slidesWrapper.children].forEach((slide, index) => {
      slide.classList.add(`carousel__slide`);
      slide.dataset.slideIndex = index;
      const dot = document.createElement('li');
      dot.classList.add('carousel__dot');
      dot.dataset.targetIndex = index;
      if (0 === index) {
        slide.classList.add('carousel__slide--active');
        dot.classList.add('carousel__dot--active');
      }
      dots.append(dot);
    });
    el.innerHTML = `
      ${slidesWrapper.outerHTML}
      <div class="carousel__dots">
        ${dots.outerHTML}
      </div>
      <div class="carousel__navigation">
        <span class="carousel__prev carousel__nav--disabled"></span>
        <span class="carousel__next"></span>
      </div>
    `;

    const updateDots = (targetIndex, currentIndex) => {
      const currentDot = el.querySelector('.carousel__dot--active');
      const targetDot = el.querySelector(`.carousel__dot[data-target-index="${targetIndex}"]`);
      currentDot?.classList?.remove('carousel__dot--active');
      targetDot?.classList?.add('carousel__dot--active');
      if(targetIndex > currentIndex) {
        for(let i = currentIndex; i < targetIndex; i++) {
          el.querySelector(`.carousel__dot[data-target-index="${i}"]`)?.classList?.add('carousel__dot--visited');
        }
      } else {
        for(let i = currentIndex; i >= targetIndex; i--) {
          el.querySelector(`.carousel__dot[data-target-index="${i}"]`)?.classList?.remove('carousel__dot--visited');
        }
      }
    }

    const updateNavigation = (targetIndex, size) => {
      const prev = el.querySelector('.carousel__navigation .carousel__prev');
      const next = el.querySelector('.carousel__navigation .carousel__next');
      if(targetIndex <= 0) {
        prev?.classList?.add('carousel__nav--disabled');
      } else {
        prev?.classList?.remove('carousel__nav--disabled');
      }
      if(targetIndex >= size - 1) {
        next?.classList?.add('carousel__nav--disabled');
      } else {
        next?.classList?.remove('carousel__nav--disabled');
      }
    }

    const activateSlide = (position) => {
      const slides = el.querySelectorAll('.carousel__slide');
      const currentSlide = el.querySelector('.carousel__slide--active');
      const currentIndex = parseInt(currentSlide.dataset.slideIndex, 10);
      let targetIndex = 0;
      let targetSlide;
      if (position === 1 && currentIndex + 1 < slides.length) {
        targetIndex = currentIndex + 1;
        targetSlide = slides[targetIndex];
      } else if (position === -1 && currentIndex - 1 >= 0) {
        targetIndex = currentIndex - 1;
        targetSlide = slides[targetIndex];
      }

      if (targetSlide) {
        currentSlide.classList.remove('carousel__slide--active');
        targetSlide.classList.add('carousel__slide--active');
        onChange(currentSlide, targetSlide);
        updateNavigation(targetIndex, slides.length);
        updateDots(targetIndex, currentIndex);
      }
    };

    el.querySelector('.carousel__prev')?.addEventListener('click', (e) => {
      activateSlide(-1);
    });
    el.querySelector('.carousel__next')?.addEventListener('click', (e) => {
      activateSlide(1);
    });
    el.querySelectorAll('.carousel__dot')?.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.dataset.targetIndex, 10);
        const currentSlide = el.querySelector('.carousel__slide--active');
        const targetSlide = el.querySelector(`.carousel__slide[data-slide-index="${targetIndex}"]`)
        currentSlide?.classList?.remove('carousel__slide--active');
        targetSlide?.classList?.add('carousel__slide--active');
        onChange(currentSlide, targetSlide);
        const slides = el.querySelectorAll('.carousel__slide');
        updateNavigation(targetIndex, slides.length);
        updateDots(targetIndex, parseInt(currentSlide.dataset.slideIndex, 10));
      });
    });
  }
}

export default carouselUtils;