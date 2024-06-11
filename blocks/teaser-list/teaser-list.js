export default function decorate(block) {

    // let tempBlock= block.cloneNode(true);
    // console.log(tempBlock.clone(true));
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
    // block.innerHTML = skeletonHtml;


    //  const commonTitle = tempBlock.querySelector('.teaser-list > div:first-child > div > p').innerText;
    //     let newHtml = `<h1>${commonTitle}</h1><div style="display: flex;">`;

    //    // const cards = tempBlock.querySelectorAll('.teaser-list > div:not(:first-child)');

    //     cards.forEach(card => {
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
    //     });

    //     newHtml += `</div>`;
    //     block.innerHTML='';
    //     block.innerHTML = newHtml;

    // Old Code
    // const commonTitle = block.querySelector('.teaser-list > div:first-child > div > p').innerText;
    // let newHtml = `<div><h1>${commonTitle}</h1></div>`;

    // const cards = block.querySelectorAll('.teaser-list > div:not(:first-child)');

    // cards.forEach(card => {
    //     const imgSrc = card.querySelector('img').src;
    //     const preTitle = card.querySelector('div:nth-of-type(2) > p').innerText;
    //     const title = card.querySelector('div:nth-of-type(3) > p').innerText;
    //     const description = Array.from(card.querySelectorAll('div:nth-of-type(4) > p:not(.button-container)')).map(p => p.innerText).join(' ');

    //     const ctaElements = card.querySelectorAll('div:nth-of-type(4) > p.button-container > a');
    //     const cta1 = ctaElements[0] ? ctaElements[0].outerHTML : '';
    //     const cta2 = ctaElements[1] ? ctaElements[1].outerHTML : '';

    //     newHtml += `
    //                <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
    //                    <img src="${imgSrc}" alt="" style="max-width: 100%;">
    //                    <p>${preTitle}</p>
    //                    <h2>${title}</h2>
    //                    <p>${description}</p>
    //                    <div>${cta1}</div>
    //                    <div>${cta2}</div>
    //                </div>
    //            `;
    // });

    // newHtml += ``;
    // block.innerHTML = newHtml;

    //Cards Code
      const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}