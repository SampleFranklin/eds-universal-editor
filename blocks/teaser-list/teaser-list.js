export default function decorate(block) {

    // let tempBlock= block.cloneNode(true);
    // console.log(tempBlock.cloneNode(true));
    // let skeletonHtml = `<h1></h1><div style="display: flex;">`;

    // const cards = tempBlock.querySelectorAll('.teaser-list > div:not(:first-child)');
    // cards.forEach(card => {
    // skeletonHtml += `
    //                     <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
    //                         <img src="" alt="" style="max-width: 100%;">
    //                         <p></p>
    //                         <h2></h2>
    //                         <p></p>
    //                         <div></div>
    //                         <div></div>
    //                     </div>
    //                 `;
    // });

    // skeletonHtml += `</div>`;
    // // block.innerHTML = skeletonHtml;

    // console.log("Here 1");


    //  const commonTitle = tempBlock.querySelector('.teaser-list > div:first-child > div > p')?.innerText;
    //     let newHtml = `<h1>${commonTitle}</h1><div style="display: flex;">`;
    // console.log("Here 2");

    //    // const cards = tempBlock.querySelectorAll('.teaser-list > div:not(:first-child)');

    //     cards.forEach(card => {
    //         console.log("Here 3");
    //         const imgSrc = card.querySelector('img').src;
    //         const preTitle = card.querySelector('div:nth-of-type(2) > p').innerText;
    //         const title = card.querySelector('div:nth-of-type(3) > p').innerText;
    //         const description = Array.from(card.querySelectorAll('div:nth-of-type(4) > p:not(.button-container)')).map(p => p.innerText).join(' ');

    //         const ctaElements = card.querySelectorAll('div:nth-of-type(4) > p.button-container > a');
    //         const cta1 = ctaElements[0] ? ctaElements[0].outerHTML : '';
    //         const cta2 = ctaElements[1] ? ctaElements[1].outerHTML : '';

    //         newHtml += `
    //             <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
    //                 <img src="${imgSrc}" alt="" style="max-width: 100%;">
    //                 <p>${preTitle}</p>
    //                 <h2>${title}</h2>
    //                 <p>${description}</p>
    //                 <div>${cta1}</div>
    //                 <div>${cta2}</div>
    //             </div>
    //         `;
    //         console.log("Here 4");
    //     });

    //     newHtml += `</div>`;
    //     console.log("Here 5");
        // block.innerHTML='';
        // block.innerHTML = newHtml;

        console.log(block.cloneNode(true));
         const commonTitle = block.querySelector('.teaser-list > div:first-child > div > p').innerText;
        let newHtml = `<h1>${commonTitle}</h1><div style="display: flex;">`;

        const cards = block.querySelectorAll('.teaser-list > div:not(:first-child)');

        cards.forEach(card => {
            const img = card.querySelector('picture');
            img.querySelector('img').removeAttribute('height');
            img.querySelector('img').removeAttribute('width');

            const preTitle = card.querySelector('div:nth-of-type(2)');
            const title = card.querySelector('div:nth-of-type(3)');
            const description = card.querySelector('div:nth-of-type(4)');
            const actions = description.querySelectorAll('div:nth-of-type(4) .button-container');
            let ctaHtml = "";
            actions.forEach(item => {
                ctaHtml += `<div>${item.innerHTML}</div>`;
                item.remove();
            });

            newHtml += `
                    <div>
                        <picture>
                            ${img.innerHTML}
                        </picture>
                    </div>
                    <div>
                        <div>
                            ${preTitle.innerHTML}
                        </div>
                        <div>
                            ${title.innerHTML}
                        </div>
                        <div>
                            ${description.innerHTML}
                        </div>
                        <div>
                            ${ctaHtml}
                        </div>
                    </div>
            `;
        });

        console.log(newHtml);

        newHtml += `</div>`;
        block.innerHTML = newHtml;
}