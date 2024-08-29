export default function decorate(block) {
    const [titleEl, ...noticesEl] = block.children;
     const container= document.createElement('div');
     container.classList.add('sample-container')
    
     console.log(Array.from(noticesEl[0].children)[0]);

    const componentSeparator = titleEl.querySelector('p')?.textContent?.trim() || "";
    const compTitle = titleEl.querySelector('h1, h2, h3, h4, h5, h6')|| "";
    

    const notices = noticesEl.map((notice) => {
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

    container.innerHTML = `${listOfNotice}`
    console.log(container)
    
    // block.innerHTML = `
    //     <div id="container1" class="container">
    //         <p>${componentSeparator}</p>
    //         ${compTitle.outerHTML}
    //         <div>
    //         <p>Sample text</p>
    //         </div>
    //     </div>`
    
    // block.innerHTML='';
    // block.append(container);
    return block;
}