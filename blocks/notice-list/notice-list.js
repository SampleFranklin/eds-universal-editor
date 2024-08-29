export default function decorate(block) {
    //console.log(block);

    const [titleEl, ...noticesEl] = block.children;
    //console.log(noticesEl);

    const titleELClone =  titleEl.cloneNode(true);
    const noticesElClone = Array.from(noticesEl).map((notice) => {
        let noticeClone = notice.cloneNode(true);
        return noticeClone;
    });

    let vavi = keepOnlyFirstDivInNotices(noticesElClone);
    const vaviHTML = vavi.map(notice=>{
        return notice.outerHTML
    }).join('');
    
    console.log(vaviHTML)
    

    block.innerHTML = `
        <div class="notice-list block" data-block-name="notice-list" data-block-status="loaded">
            ${titleEl.outerHTML}
            ${vaviHTML}
        </div>
    `;

    return block;

    function keepOnlyFirstDivInNotices(noticesElClone) {
        // Iterate over each element in noticesElClone
        noticesElClone.forEach(notice => {
            // Convert notice.children (HTMLCollection) to an array and iterate over each child
           
                // Find all div elements within the current child
                const divs = notice.querySelectorAll('div');
                console.log("DIVS:", divs);
                // If there are multiple divs, remove all but the first one
                divs.forEach((div, index) => {
                    if (index > 0) {
                        div.remove();
                    }
                });
            ;
        });
        

        return noticesElClone;
    }
}
