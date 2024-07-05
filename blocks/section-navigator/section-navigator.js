export default function decorate(block) {
    const sectionsCount = document.querySelectorAll('main > .section').length;

    var nav = document.createElement('nav');
    for (var i = 1; i <= sectionsCount; i++) {
        var span = document.createElement('span');
        span.className = 'dot';
        span.setAttribute('data-section', i);
        nav.appendChild(span);
    }

    block.innerHTML = '';
    block.appendChild(nav);
}