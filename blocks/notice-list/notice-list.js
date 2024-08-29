export default function decorate(block) {
    const [titleEl, ...noticesEl] = block.children;

    console.log(Array.from(noticesEl[0].children)[0]);

    const componentSeparator = titleEl.querySelector('p')?.textContent?.trim() || "";
    const compTitle = titleEl.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim() || "";
    

    const notices = noticesEl.map((notice,index) => {
        const [listTitleEl, isNewEl, titleEl, descEl, cta1El, cta2El] = notice.children;

        return {
            listTitle: listTitleEl?.textContent?.trim() || "",
            isNew: isNewEl?.textContent?.trim() || "",
            title: titleEl?.textContent?.trim() || "",
            descEl: descEl?.innerHTML || "", 
            cta1: cta1El?.textContent?.trim() || "",
            cta2: cta2El?.textContent?.trim() || ""
        };
    });

    const listOfNotice = notices.map((notice, index) => `
    <p>
        <a href="#" data-index="${index}">${notice.listTitle} ${notice.isNew}</a>
    </p>
`).join('');

   
   
    block.innerHTML = `
        <div id="container1" class="container">
            <p>${componentSeparator}</p>
            <h2>${compTitle}</h2>
            <div>
            ${Array.from(noticesEl[0].children)[0].outerHTML}
            </div>
        </div>`
    
    return block;
}