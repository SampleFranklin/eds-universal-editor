export default function decorate(block) {
    
    const [titleEl, ...noticesEl] = block.children;
   
    const titleELClone =  titleEl.cloneNode(true);
    const noticesElClone = Array.from(noticesEl).map((notice) => {
        let noticeClone = notice.cloneNode(true);
        return noticeClone;
    });

    let alteredNoticesEL = keepOnlyFirstDivInNotices(noticesElClone);  //Only List Title detail
    const listTiltleHTML = alteredNoticesEL.map(notice=>{
        return notice.outerHTML
    }).join('');
    
  
    

    block.innerHTML = `
            ${titleEl.outerHTML}
            ${listTiltleHTML}  
    `;

    return block;

    function keepOnlyFirstDivInNotices(noticesElClone) {
        // Iterate over each element in noticesElClone
        noticesElClone.forEach((notice, index) => {
            // Find all div elements within the current notice
            const divs = notice.querySelectorAll('div');
            
            // Iterate over the divs, keep the first one, and remove the rest
            divs.forEach((div, divIndex) => {
                if (divIndex > 0) {
                    div.remove();
                } else if (divIndex === 0) {
                    const pElement = div.querySelector('p');
                    if (pElement) {
                        pElement.setAttribute('data-index', index);
                        pElement.classList.add('notice_list-title');

                         // Find the text content of the second <div>
                        const secondDiv = notice.querySelectorAll('div')[1];
                        const secondDivText = secondDiv?.textContent?.trim() || '';
                    
                        if (secondDivText) {
                        // Append the text content inside the <p> element wrapped in <span>
                        pElement.innerHTML += ` <span>${secondDivText}</span>`;
                        }
                    }
                }
            });
        });
    
        return noticesElClone;
    }
    
}
