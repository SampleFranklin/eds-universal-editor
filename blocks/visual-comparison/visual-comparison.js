export default function decorate(block) {

    const links =  block.querySelectorAll(':scope > div > div > p > a');
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('outer-div');

    const videos = [];

    links.forEach((link)=>{
        const url = link.attributes['href'].nodeValue;
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('inner-div');

        const video = document.createElement('video');
        video.src = url;
        video.loop = true;
        video.autoplay = true;
        video.setAttribute("aria-label", "altText Video");

        innerDiv.appendChild(video);
        outerDiv.appendChild(innerDiv);

        videos.push(video);
    })
    const [video1, video2] = [videos[0], videos[1]]
    function syncPlay(){
        if (video1.paused !== video2.paused) {
          if (video1.paused) {
            video2.pause();
          } else {
            video2.play();
          }
        }
      };
    function syncPause(){
        if (video1.paused !== video2.paused) {
          if (video1.paused) {
            video2.pause();
          } else {
            video2.play();
          }
        }
      };
    function syncTimeUpdate() {
        if (Math.abs(video1.currentTime - video2.currentTime) > 0.1) {
          video2.currentTime = video1.currentTime;
        }
      };

    video1.addEventListener("play", syncPlay);
    video1.addEventListener("pause", syncPause);
    video1.addEventListener("timeupdate", syncTimeUpdate);

    block.textContent = '';
    block.append(outerDiv);
}