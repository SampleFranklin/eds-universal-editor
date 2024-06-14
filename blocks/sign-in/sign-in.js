export default function decorate(block) {
    const signIn = block.querySelector('.sign-in > div:first-child > div');
    const link = signIn.querySelector('p.button-container a');
    if (signIn.querySelector('h4'))
        signIn.removeChild(signIn.querySelector('p.button-container'))
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













    // const signInDiv = document.createElement('div');
    // signInDiv.classList.add('user__dropdown');
    // const signInContainer = document.createElement('div');
    // signInContainer.classList.add('user__account');
    // const isDesktop = window.matchMedia('(min-width: 900px)');
    // if (!isDesktop.matches) {
    //     // The user is using a mobile device
    //     console.log('This is a mobile device.');
    //     signInContainer.append(block.querySelector('div').firstElementChild);
    //     const altText = block.querySelector('div:nth-child(5) div p');
    //     if (!altText) {
    //         altText.innerHTML = "Default Alt";
    //     }
    //     const picture = block.querySelector('div:nth-child(3) div > picture');
    //     picture.querySelector('img').removeAttribute('width');
    //     picture.querySelector('img').removeAttribute('height');
    //     picture.querySelector('img').setAttribute('alt', altText.innerHTML);
    //     signInContainer.append(picture);
    // }

    // // const ul = document.createElement('ul');
    // // const li = document.createElement('li');


    // const link = block.querySelector('div a');
    // const desktopImage = block.querySelector('div:nth-child(2) div > picture');
    // const desktopAltText = block.querySelector('div:nth-child(4) div p');
    // if (!desktopAltText) {
    //     altText.innerHTML = "Default Alt";
    // }
    // if (desktopImage) {
    //     desktopImage.querySelector('img').removeAttribute('width');
    //     desktopImage.querySelector('img').removeAttribute('height');
    //     desktopImage.querySelector('img').setAttribute('alt', desktopAltText.innerHTML);
    // }
    // link.removeAttribute('title');
    // link.classList.remove('button');
    // // link.removeAttribute('class');
    // link.classList.add('user__account--link', 'hide-sm');
    // const span = document.createElement('span');
    // span.classList.add('user__account__list-icon');
    // span.append(desktopImage);
    // link.append(span);
    // signInContainer.append(link);


    // // li.append(div);
    // // ul.append(li);


    // const list = block.children;
    // for (var i = 5; i < list.length; i++) {
    //     //     const anotherDiv = document.createElement('div');
    //     //     anotherDiv.classList.add('list-item');
    //     //     const li = document.createElement('li');
    //     const image = list[i].querySelector('picture');
    //     if (image) {
    //         image.querySelector('img').removeAttribute('width');
    //         image.querySelector('img').removeAttribute('height');
    //     }
    //     const ctaText = list[i].querySelector('p').textContent;
    //     const target = list[i].querySelector('div:nth-child(4) > p').innerHTML;
    //     const linkUrl = list[i].querySelector('a');
    //     linkUrl.removeAttribute('title');
    //     linkUrl.setAttribute('target',target);
    //     // linkUrl.innerHTML = ctaText;
    //     linkUrl.classList.remove('button');
    //     linkUrl.classList.add('user__account--link');
    //     const span = document.createElement('span');
    //     span.classList.add('user__account__list-icon');
    //     span.append(image);
    //     linkUrl.innerHTML = `
    //         ${span.outerHTML}
    //         ${ctaText}
    //     `;
    //     signInContainer.append(linkUrl);
    //     //     li.append(anotherDiv);
    //     //     ul.append(li);
    // }
    // signInDiv.append(signInContainer);
    // console.log("signInDiv", signInDiv);
    // block.innerHTML = "";
    // block.append(signInContainer);
}
