export default function decorate(block) {

    // Extract the widget icon details
    const widgetIconElement = block.querySelector('.widget > div:first-child picture img');
    const widgetIconSrc = widgetIconElement ? widgetIconElement.src : '';
    const widgetIconAlt = widgetIconElement ? widgetIconElement.alt : '';

    // Extract the link elements
    const linkElements = Array.from(block.querySelectorAll('.widget > div:nth-child(n+2)'));

    // Create the widget icon HTML
    const widgetIconHtml = `
        <div class="widget__icon">
            <img src="${widgetIconSrc}" alt="${widgetIconAlt}" />
        </div>
    `;

    // Create the link elements HTML
    let linkElementsHtml = `
        <div class="widget__links">
            <ul>
    `;

    linkElements.forEach(linkElement => {
        const iconElement = linkElement.querySelector('picture img');
        const iconSrc = iconElement ? iconElement.src : '';
        const iconAlt = iconElement ? iconElement.alt : '';

        const linkAnchorElement = linkElement.querySelector('.button-container a');
        const linkHref = linkAnchorElement ? linkAnchorElement.href : '#';
        const linkTitle = linkAnchorElement ? linkAnchorElement.title : '';

        const linkTextElement = linkElement.querySelector(':nth-child(2) p');
        const linkText = linkTextElement ? linkTextElement.textContent : '';

        linkElementsHtml += `
            <li>
                <a href="${linkHref}" target="_self" title="${linkTitle}">
                    <span class="widget__link__icon">
                        <img src="${iconSrc}" alt="${iconAlt}" />
                    </span>
                    <p>${linkText}</p>
                </a>
            </li>
        `;
    });

    linkElementsHtml += `
            </ul>
        </div>
    `;

    // Combine the widget icon and link elements into the final widget HTML
    const widgetHtml = `
        <div class="widget">
            ${widgetIconHtml}
            ${linkElementsHtml}
        </div>
    `;

    // Replace the original block content with the new HTML
    block.innerHTML = widgetHtml;
    
    // Add hover logic with JavaScript
    const widgetElement = block.querySelector('.widget');
    const widgetLinksElement = block.querySelector('.widget__links');
    
    widgetElement.addEventListener('mouseenter', () => {
        widgetLinksElement.style.display = 'block';
    });

    widgetElement.addEventListener('mouseleave', () => {
        widgetLinksElement.style.display = 'none';
    });

    // Initially hide the widget links
    widgetLinksElement.style.display = 'none';
}