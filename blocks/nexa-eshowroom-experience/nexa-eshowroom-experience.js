import { fetchPlaceholders } from "../../scripts/aem.js";
import carouselUtils from '../../utility/carouselUtils.js';

export default async function decorate(block) {
  // const { publishDomain } = await fetchPlaceholders();

  // console.log(block);
  // console.log(block.children);

  // const [
  //   // componentId,
  //   // titleE1,
  //   // priceTextE1,
  //   // subTitleE1,
  //   // secondaryBtnTextE1,
  //   // secondaryBtnCtaE1,
  //   ...videoItemsE1
  // ] = block.children;
  // let graphQlEndpoint;

  // // graphQlEndpoint = publishDomain + "/graphql/execute.json/msil-platform/NexaCarList";
  // graphQlEndpoint = "https://publish-p71852-e1137339.adobeaemcloud.com/graphql/execute.json/msil-platform/CarModelListByPath";

  // const requestOptions = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "http://localhost:3000"
  //   },
  // };

  // let ApiResponse;

  // fetch(graphQlEndpoint, requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     ApiResponse = result;
  //   })
  //   .catch((error) => console.error(error));
  
  // console.log("API-------------", ApiResponse);

  // const videoItems = videoItemsE1?.map((item, index)=>{
  //   const [
  //     componentId,
  //     titleE1,
  //     priceTextE1,
  //     subTitleE1,
  //     secondaryBtnTextE1,
  //     secondaryBtnCtaE1,
  //     forwardVideoE1,
  //     revVideoE1,
  //     primaryBtnTextE1,
  //     primaryBtnCtaE1
  //   ] = block.children;

  //   const modelId = componentId?.textContent?.trim();
  //   const title = titleE1?.textContent?.trim();
  //   const priceText = priceTextE1?.textContent?.trim();
  //   const subTitle = subTitleE1?.textContent?.trim();
  //   const secondaryBtnText = secondaryBtnTextE1?.textContent.trim()
  //   const secondaryBtnCta = secondaryBtnCtaE1?.querySelector('a');


  //   fetchPrice(modelId, )

  //   console.log(item);
  // })

  block.innerHTML = `
    <section class="e-showroom">
    <div class="e-showroom__container">
      <div class="e-showroom__slides carousel__slides">
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
                <a href="#" title="#" class="button e-showroom__primary__btn" target="_self">Explore Vitara</a>
                <a href="#" title="#" class="button btn-title e-showroom__secondary__btn" target="_self">Build your
                  own</a>
              </div>
            </div>
          </div>
          <div class="e-showroom__video-carousel">
            <div class="e-showroom__video-container">
              <video id="video1" class="e-showroom__video active-video" autoplay muted>
                <source
                  src="https://publish-p71852-e1137339.adobeaemcloud.com/etc.clientlibs/auto/components/webcompV3/clientlib-web/resources/assets/videos/clips/1.mp4"
                  type="video/mp4">
              </video>
              <video id="video1-rev" class="e-showroom__video-rev" muted>
                <source
                  src="https://publish-p71852-e1137339.adobeaemcloud.com/etc.clientlibs/auto/components/webcompV3/clientlib-web/resources/assets/videos/clips/1-Rev.mp4"
                  type="video/mp4">
              </video>
            </div>
          </div>
        </div>
        <div class="carousel__slide">
          <div class="e-showroom__info-container">
            <div>
              <h2 class="text-heading-primary">
                Grand Vitara new
              </h2>
              <div class="e-showroom__price-text">Starting Price
                <span class="e-showroom__price">Rs 22 68 000</span>
              </div>
            </div>
            <div>
              <div class="e-showroom__subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam.
              </div>
              <div class="e-showroom__action">
                <a href="#" title="#" class="button e-showroom__primary__btn" target="_self">Explore Vitaraa</a>
                <a href="#" title="#" class="button btn-title e-showroom__secondary__btn" target="_self">Build your
                  own</a>
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
              <video id="video1-rev" class="e-showroom__video-rev" muted>
                <source
                  src="https://publish-p71852-e1137339.adobeaemcloud.com/etc.clientlibs/auto/components/webcompV3/clientlib-web/resources/assets/videos/clips/1-Rev.mp4"
                  type="video/mp4">
              </video>
            </div>
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

  // carouselUtils.init(
  //   block.querySelector('.e-showroom__container'), 'e-showroom__slides', 'fade', (currentSlide, targetSlide, direction) => {
  //     currentSlide.querySelector('e-showroom__video')?.play();
  //     targetSlide.querySelector('e-showroom__rev')?.pause();
  //   }
  // );

  // const el = block.getElementsByClassName("e-showroom__carousel__navigation");
  // const elNext = block.getElementsByClassName("carousel__next");
  // elNext.addEventListener("click", function(){block.querySelector('.e-showroom__video').play()})
}
