export default function decorate(block) {
    console.log(block);

    const [titleEl, ...noticesEl] = block.children;
    console.log(noticesEl);

    const componentSeparator = titleEl.querySelector('p')?.textContent?.trim() || "";
    const compTitle = titleEl.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim() || "";

    const notices = Array.from(noticesEl).map((notice, index) => {
        const [listTitleEl, isNewEl] = notice.children;
        return {
            listTitle: listTitleEl?.textContent?.trim() || "",
            isNew: isNewEl?.textContent?.trim() || "",
            index: index + 1
        };
    });

    const listOfNotice = notices.map(notice => `
        <div>
            <div><p class="notice__title" data-index="${notice.index}">${notice.listTitle}</p>  </div>
            ${notice.isNew ? `<div><p class="notice_new-identifier">${notice.isNew}</p>  </div>` : "<div></div>"}
        </div>
    `).join('');

    block.innerHTML = `
        <div class="notice-list block" data-block-name="notice-list" data-block-status="loaded">
            ${titleEl.outerHTML}
            ${listOfNotice}
        </div>
    `;

    return block;
}
