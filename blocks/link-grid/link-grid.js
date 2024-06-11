export default function decorate(block) {
    var gridContainer = document.createElement('div');
    gridContainer.className = 'link-container-section';
    var tabHeadings = block.querySelectorAll('.link-grid h3');
    tabHeadings.forEach(function (heading, index) {
        var columnDiv = document.createElement('div');
        columnDiv.className = 'link-grid-column';

        var buttonContainer = document.createElement('p');
        buttonContainer.className = 'button-container';

        var tabDiv = heading.parentNode;

        var links = tabDiv.querySelectorAll('p.button-container a');
        links.forEach(function (link) {
            var linkText = link.textContent;
            var href = link.getAttribute('href');

            var a = document.createElement('a');
            a.textContent = linkText;
            a.href = href;

            if (isInternalLink(href)) {
                a.target = '_self';
            } else {
                a.target = '_blank';
            }

            buttonContainer.appendChild(a);
        });

        columnDiv.appendChild(heading.cloneNode(true));
        columnDiv.appendChild(buttonContainer);
        gridContainer.appendChild(columnDiv);
    });
    block.innerHTML = "";
    block.append(gridContainer);
}

function isInternalLink(href) {
    return !/^https?:\/\//i.test(href);
}