export default function decorate(block) {
    const signIn = block.querySelector('.sign-in > div:first-child > div');
    const link = signIn.querySelector('p.button-container a');
    if (signIn.querySelector('h4'))
        signIn.querySelector('p.button-container')?.remove();
    signIn.classList.add('sign-in-teaser__desc-content');

    const ctaText = link.innerText;
    const desktopSrc = block.querySelector('.sign-in div:nth-of-type(2) > div > picture > img')?.src;
    const desktopAltText = block.querySelector('.sign-in div:nth-of-type(4) > div > p')?.innerText;
    const mobileSrc = block.querySelector('.sign-in div:nth-of-type(3) > div > picture > img')?.src;
    const mobileAltText = block.querySelector('.sign-in div:nth-of-type(5) > div > p')?.innerText;
    const signInTarget = block.querySelector('.sign-in div:nth-of-type(6) > div > p')?.innerText;

    const mobileSignInHtml = `
        <div class="sign-in-teaser">
            <div class="sign-in-teaser__desc">
                ${signIn.outerHTML}
                <a href="${link}" class="sign-in-teaser--link" target="${signInTarget}">
                    ${ctaText}
                </a>
            </div>
            <div class="sign-in-teaser__image">
                <img src="${mobileSrc}" loading="lazy" alt="${mobileAltText || ""}"/>
            </div>
        </div>
    `;
    console.log("mobileSignInHtml:",mobileSignInHtml);

    const ctaElements = Array.from(block.querySelectorAll('.sign-in > div:nth-last-child(-n+2)')).map(element => {
        const imgSrc = element.querySelector('img')?.src;
        const altText = element.querySelector('div:nth-of-type(2) > p')?.innerText;
        const ctaText = element.querySelector('div:nth-of-type(3) > p').innerText;
        const link = element.querySelector('div:nth-of-type(4) p.button-container a');
        const target = element.querySelector('div:nth-of-type(5) > p')?.innerText;
        
        element.innerHTML = `
            <a href="${link}" class="user__account--link" target="${target}">
                <span class="user__account__list-icon">
                    <img src="${imgSrc}" loading="lazy" alt="${altText || ""}"/>
                </span>
                ${ctaText}
            </a>
        `;
        return element.innerHTML;
    });


    const desktopSignInHtml = `
        <div class="user__account">
            <a href="${link}" class="user__account--link hide-sm" target="${signInTarget}">
                <span class="user__account__list-icon">
                    <img src="${desktopSrc}" loading="lazy" alt="${desktopAltText || ""}"/>
                </span>
                ${ctaText}
            </a>
            ${ctaElements.join('')}
        </div>
    `;
        console.log("desktopSignInHtml:",desktopSignInHtml);

    const newHtml = `
        <div class="user__dropdown">
            ${mobileSignInHtml}
            ${desktopSignInHtml}
        </div>
    `;
    block.innerHTML = newHtml;
    console.log(block);
}
