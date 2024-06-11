export default function decorate(block) {
    let imageHtml = "";
    const image = block.querySelector('picture');
    if(image) {
        image.querySelector('img').removeAttribute('width');
        image.querySelector('img').removeAttribute('height');
        imageHtml = `
        <div class="teaser-image">
            <picture>
                ${image.innerHTML}
            </picture>
        </div>
        `;
    }

    const pretitleText = block.querySelector('div:nth-child(2)').textContent;
    let pretitleHtml = "";
    if(pretitleText?.trim()) {
        pretitleHtml = `
            <div class="teaser-pretitle">
                <p>${pretitleText}</p>
            </div>
        `;
    }

    const titleText = block.querySelector('div:nth-child(3)').textContent;
    let titleHtml = "";
    if(titleText?.trim()) {
        titleHtml = `
            <div class="teaser-title">
                <h1>${titleText}</h1>
            </div>
        `;
    }

    const descriptionEl = block.querySelector('div:nth-child(4) div');
    let descriptionHtml = "";

    const links = descriptionEl?.querySelectorAll('div:nth-child(4) .button-container');
    let ctaHtml = "";
    if(links && links.length > 0) {
        links.forEach((item) => {
            ctaHtml += item.innerHTML;
            item.remove();
        });
    }

    if(ctaHtml) {
        ctaHtml = `
        <div class="teaser-actions">
            ${ctaHtml}
        </div>
        `;
    }

    if(descriptionEl) {
        descriptionHtml = `
        <div class="teaser-description">
            ${descriptionEl.innerHTML}
        </div>
        `;
    }

    block.innerHTML = `
    <div class="teaser-card">
        ${imageHtml}
        <div class="teaser-content">
            ${pretitleHtml}
            ${titleHtml}
            ${descriptionHtml}
            ${ctaHtml}
        </div>
    </div>
    `;
}