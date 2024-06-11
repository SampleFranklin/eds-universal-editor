export default function decorate(block) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'link-container-section';
    const columns = []
    for (let i = 0; i < block.children.length; i++) {
        const item = block.children.item(i);
        const el = item.querySelector('p');
        if (el) {
            columns.push(item);
        }
    }
    columns.forEach(function (el) {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'link-grid-column';

        const buttonContainer = document.createElement('ul');
        buttonContainer.className = 'button-container';

        const tabDiv = el;

        const links = tabDiv.querySelectorAll('p.button-container a');
        links.forEach(function (link) {
            const linkText = link.textContent;
            const href = link.getAttribute('href');
            const li = document.createElement('li')
            const a = document.createElement('a');
            a.textContent = linkText;
            a.href = href;
            li.appendChild(a);
            if (isInternalLink(href)) {
                a.target = '_self';
            } else {
                a.target = '_blank';
            }

            buttonContainer.appendChild(li);
        });

        if(el.querySelector('h3')) {
            columnDiv.appendChild(el.querySelector('h3'));
        } else {
            columnDiv.classList.add('no-heading-column');
        }
        columnDiv.appendChild(buttonContainer);
        gridContainer.appendChild(columnDiv);
    });

    block.innerHTML = "";
    block.append(gridContainer);
    console.log(block);
}

function isInternalLink(href) {
    return !/^https?:\/\//i.test(href);
}