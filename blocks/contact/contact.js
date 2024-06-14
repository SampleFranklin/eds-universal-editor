export default function decorate(block) {
    const commonTitle = block.querySelector('.contact > div:first-child > div > p').innerText;
    const ctaElements = Array.from(block.querySelectorAll('.contact > div:not(:first-child)')).map(element => {
        const imgSrc = element.querySelector('img')?.src;
        const altText = element.querySelector('div:nth-of-type(2) > p')?.innerText;
        const link = element.querySelector('div:nth-of-type(4) p.button-container a');
        console.log("link",link)
        const target = element.querySelector('div:nth-of-type(5) > p')?.innerText;
        // console.log("target",target);

        element.innerHTML = `
                <a href="${link}" target="${target}" class="user__contact--icon">
                    <img src="${imgSrc}" alt="${altText || ""}" loading="lazy">
                </a>
        `;
        return element.innerHTML;
    });
    const newHtml = `
        <div class="user__contact">
            <h4>${commonTitle}</h4>
            <div class="user__contact__icons">
                ${ctaElements.join('')}
            </div>
        </div>
    `;
    block.innerHTML = newHtml;
    console.log(block);
}