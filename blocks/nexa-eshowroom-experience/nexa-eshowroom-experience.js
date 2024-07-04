export default function decorate(block) {
    console.log(block);
    block.innerHTML = `
    <section class="e-showroom">
      <div class="e-showroom__container">
        <div class="carousel__slide carousel__slide--active">
          <div class="e-showroom__info-container">
            <div>
                <h2 class="text-heading-primary">
                  Grand Vitara
                </h2>
                <div class="e-showroom__price-text">Starting Price
                <span class="e-showroom__price">Rs 11 68 000</span>
                </div>
            </div>
            <div>
                <div class="e-showroom__subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam.
                </div>
            <div class="e-showroom__action">
                <a href="#" title="#" class="button e-showroom__primary__btn" target="_self">Explore Invicto</a>
                <a href="#" title="#" class="button btn-title e-showroom__secondary__btn" target="_self">Build your own</a>
          </div>
          </div>
        </div>
        <div class="e-showroom__video-carousel">
          <div class="e-showroom__video-container">
            <video id="video1" class="e-showroom__video" muted>
              <source
                src="https://publish-p71852-e1137339.adobeaemcloud.com/etc.clientlibs/auto/components/webcompV3/clientlib-web/resources/assets/videos/clips/1.mp4"
                type="video/mp4">
            </video>
            <!-- <video id="video1-rev" class="e-showroom__video-rev" muted>
            <source src="https://publish-p71852-e1137339.adobeaemcloud.com/etc.clientlibs/auto/components/webcompV3/clientlib-web/resources/assets/videos/clips/1-Rev.mp4" type="video/mp4">
            </video> -->
          </div>
        </div>
      </div>
        <div class="e-showroom__carousel__dots">
          <ul>
            <li class="e-showroom__carousel__dot carousel__dot--active" data-target-index="0"></li>
            <li class="e-showroom__carousel__dot " data-target-index="1"></li>
            <li class="e-showroom__carousel__dot" data-target-index="2"></li>
            <li class="e-showroom__carousel__dot" data-target-index="3"></li>
          </ul>
        </div>
        <div class="e-showroom__carousel__navigation">
          <span class="carousel__prev carousel__nav--disabled"></span>
          <span class="carousel__next"></span>
        </div>
      </div>
  </section>
  `;
}
