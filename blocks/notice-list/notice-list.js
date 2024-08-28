export default function decorate(block) {
    const [titleEl, ...noticesEl] = block.children;

    const componentSeparator = titleEl.querySelector('p')?.textContent?.trim() || "";
    const compTitle = titleEl.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim() || "";

    const notices = noticesEl.map(notice => {
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

    const noticesBody = notices.map((notice, index) => `
        <div id="description${index}" class="description hidden">
            <h4>${notice.title}</h4>
            ${notice.descEl}
            <button id="backButton">${notice.cta1}</button>
            <button id="container3Button">${notice.cta2}</button>
        </div>
    `).join('');

   

    block.innerHTML = `
        <div id="container1" class="container">
            <p>${componentSeparator}</p>
            <h2>${compTitle}</h2>
            ${listOfNotice}
        </div>

        <div id="container2" class="container hidden">
            ${noticesBody}
        </div>

        <div id="container3" class="container hidden">
            <h2>Container 3</h2>
            <p>This is the content of Container 3.</p>
            <button  id="backButton2">Back</button>
        </div>
    `;

   return block;
}
