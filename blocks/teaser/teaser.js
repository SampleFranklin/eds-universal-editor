export default function decorate(block) {
    console.log("Inside Teaser");
    console.log(block);
    var teaserCard = document.createElement('div');
    teaserCard.className = 'teaser-card';
    var staticTeaser = block
    var teaserImage = staticTeaser.querySelector('.teaser > div > div > picture').cloneNode(true);
    var teaserTitle = staticTeaser.querySelector('.teaser > div:nth-child(3) > div > p').cloneNode(true);
    var teaserDescription = staticTeaser.querySelector('.teaser > div:nth-child(4) > div > p').cloneNode(true);
    var teaserCTAContainer = staticTeaser.querySelector('.teaser > div:nth-child(4) > div > .button-container').cloneNode(true);
    teaserImage.querySelector('img').removeAttribute('width');
    teaserImage.querySelector('img').removeAttribute('height');
    teaserImage.classList.add('teaser-image');
    teaserCard.appendChild(teaserImage);
    var teaserContent = document.createElement('div');
    teaserContent.className = 'teaser-content';
    teaserContent.appendChild(teaserTitle);
    teaserContent.appendChild(teaserDescription);
    teaserContent.appendChild(teaserCTAContainer);
    teaserCard.appendChild(teaserContent);

    block.innerHTML = "";
    block.append(teaserCard);
}