export default function decorate(block) {

    const newHtml = `
            <nav>
                <span class="dot" data-section="1"></span>
                <span class="dot" data-section="2"></span>
                <span class="dot" data-section="3"></span>
                <span class="dot" data-section="4"></span>
            </nav>
    `;

    block.parentNode.parentNode.innerHTML = newHtml;
    var navElement = document.querySelector('main .section-navigator-container nav');
    var containerDiv = document.querySelector('.section-navigator-container');
    var mainElement = document.querySelector('main');
    if (navElement && containerDiv && mainElement) {
        mainElement.insertBefore(navElement, mainElement.firstChild);
        containerDiv.remove();
    }
}