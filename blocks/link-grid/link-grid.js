export default function decorate(block) {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('link-container-section');

    // Filter out columns that contain paragraphs
    const columns = Array.from(block.children).filter(item => item.querySelector('p'));

    // Create HTML for each column and join them
    const columnsHTML = columns.map(column => {
        const buttonContainerHTML = Array.from(column.querySelectorAll('p.button-container a'))
            .map(link => {
                const href = link.getAttribute('href') || '#';
                const linkText = link.textContent || 'Link';
                const target = isInternalLink(href) ? '_self' : '_blank';
                return `<li><a href="${href}" target="${target}">${linkText}</a></li>`;
            })
            .join('');

        const headingHTML = column.querySelector('h3') ? column.querySelector('h3').outerHTML : '<div class="no-heading-column"></div>';

        return `
            <div class="link-grid-column">
                ${headingHTML}
                <ul class="button-container">
                    ${buttonContainerHTML}
                </ul>
            </div>
        `;
    }).join('');

    // Append the HTML for all columns to the grid container
    gridContainer.innerHTML = columnsHTML;

    // Clear the block and append the grid container
    block.innerHTML = "";
    block.appendChild(gridContainer);
}

function isInternalLink(href) {
    return !/^https?:\/\//i.test(href);
}
