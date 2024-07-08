import { fetchPlaceholders } from '../../scripts/aem.js';
export default async function decorate(block) {

  const { publishDomain } = await fetchPlaceholders();

  const getVideoUrl = (el) => {
    const url = el?.querySelector('a')?.textContent?.trim();
    if (url) {
      return publishDomain + url;
    } else {
      return '';
    }
  }
  
const [
  videoEl,
  allowMobileVideoEl,
  mobileVideoEl,
  titleEl
] = block.children;
const desktopVideoUrl = getVideoUrl(videoEl);
const isAllowMobileVideo = allowMobileVideoEl?.textContent?.trim() || "false";
const mobileVideoUrl = (isAllowMobileVideo === "true") ? (getVideoUrl(mobileVideoEl) || desktopVideoUrl) : desktopVideoUrl;
const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    
let videoUrl;
    if (window.matchMedia('(min-width: 999px)').matches) {
      videoUrl = desktopVideoUrl;
    } else {
      videoUrl = mobileVideoUrl;
    } 


const html = `
<div class="video-teaser-container">
		<video src="${videoUrl}" class="video-teaser-bg" autoplay loop muted></video>
        <div class="video-teaser-overlay">
            ${title ? title.outerHTML : ""}
            <div class="mute-button">🔇</div>
        </div>
</div>
`;
block.innerHTML = html;

  const video = block.querySelector('.video-teaser-bg');
  const muteButton = block.querySelector('.mute-button');

  muteButton.addEventListener("click", function() {
      if (video.muted) {
          video.muted = false;
          muteButton.textContent = "🔊";
      } else {
          video.muted = true;
          muteButton.textContent = "🔇";
      }
  });

}