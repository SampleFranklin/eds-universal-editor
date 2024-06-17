export default function decorate(block) {
    console.log("icontitle: "+ block.children)
    const icons = block.querySelectorAll('.icontitle picture');
    const icon = icons[0];
    const iconClicked = icons[1];
    const title = block.querySelector('div:nth-child(1) > p').textContent.trim();
    const iconImages = block.querySelectorAll('.icontitle img');
    iconImages.forEach((img) => {
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.setAttribute('alt', title);
    });
    block.innerHTML =`
        <h2>${title}</h2>
        <div class='icon'>${icon.outerHTML}</div>
        ${iconClicked.outerHTML}
    `;
}