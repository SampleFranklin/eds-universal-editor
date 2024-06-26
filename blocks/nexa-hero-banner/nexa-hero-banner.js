import { fetchPlaceholders } from '../../scripts/aem.js'

export default function decorate(block) {
  const [showCtaEl,ctaTextEl, ...bannerItemsEl] = block.children;
  const videoUrls = [];
  const bannerItems = bannerItemsEl?.map((itemEl) => {
    const [videoEl] = itemEl.children
    videoUrls.push(videoEl?.querySelector('a').innerText);
    itemEl.innerHTML = `
    <div class="hero-banner__video-container">
    </div>
    `;
    return itemEl.outerHTML;
  }).join('');

  block.innerHTML = `
    <div>
      ${bannerItems}
    </div>
  `;

  fetchPlaceholders().then((res) => {
    const publishDomain = res.publishDomain;
    block.querySelectorAll('.hero-banner__video-container').forEach((item, index) => {
      const video = document.createElement('video');
      video.classList.add('hero-banner__video');
      video.src = publishDomain + videoUrls[index];
      video.autoplay = true;
      video.playsInline = true;
      video.muted = true;
      item.append(video);
    });
  });
}