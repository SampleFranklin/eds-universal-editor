const carouselUtils = {
  init: (el, className) => {
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
        <button class="carousel__prev">Prev</button>
        <button class="carousel__next">Next</button>
      </div>
    `;

    const activateSlide = (position) => {
      const slides = el.querySelectorAll('.carousel__slide');
      const currentSlide = el.querySelector('.carousel__slide--active');
      const currentIndex = parseInt(currentSlide.dataset.slideIndex, 10);
      let activeSlide;
      if (position === 1 && currentIndex + 1 < slides.length) {
        activeSlide = slides[currentIndex + 1];
      } else if (position === -1 && currentIndex - 1 >= 0) {
        activeSlide = slides[currentIndex - 1];
      }
      if (activeSlide) {
        el.querySelector('.carousel__slides').scrollTo({
          top: 0,
          left: activeSlide.offsetLeft,
          behaviour: 'smooth'
        });
        currentSlide.classList.remove('carousel__slide--active');
        activeSlide.classList.add('carousel__slide--active');
      }
    };

    el.querySelector('.carousel__prev')?.addEventListener('click', () => {
      activateSlide(-1);
    });
    el.querySelector('.carousel__next')?.addEventListener('click', () => {
      activateSlide(1);
    });
  }
}

export default carouselUtils;