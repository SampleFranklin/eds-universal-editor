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
            <p class="notice__title" data-index="${notice.index}">${notice.listTitle}</p>
            ${notice.isNew ? `<p class="notice_new-identifier">${notice.isNew}</p>` : ""}
        </div>
    `).join('');

    block.innerHTML = `
        <div class="notice-list block" data-block-name="notice-list" data-block-status="loaded">
            <div>
                <div>
                    <p class="notice-list__separator"><strong>${componentSeparator}</strong></p>
                    <h3 class="notice-list__title">${compTitle}</h3>
                </div>
            </div>
            ${listOfNotice}
        </div>
    `;

    return block;
}
