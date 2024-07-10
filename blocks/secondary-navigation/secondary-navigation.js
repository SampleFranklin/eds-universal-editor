

import { moveInstrumentation } from '../../scripts/scripts.js';


export default function decorate(block) {
    const [logoEl, logolinkEl, ...ctasEl] = block.children;
    const logoText = logoEl?.textContent?.trim() || '';
    const logoLink = logolinkEl?.querySelector('a')?.href || '';

    const ctaElements = ctasEl.map((element, index) => {
        const [ctaTextEl, linkEl] = element.children;
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = linkEl?.querySelector('.button-container a')?.href;

        const newButton = document.createElement('a');
        newButton.href = link;
        newButton.innerHTML = `<p>${ctaText}</p>`;

        if (index === 0) {
            newButton.classList.add('nav-button', 'active');
        } else {
            newButton.classList.add('nav-button');
        }

        element.innerHTML = '';
        element.appendChild(newButton);

        moveInstrumentation(element, newButton);

        return element.innerHTML;
    }).join('');

    function setupNavButtons(navButtons) {
        navButtons.forEach(button => {
            button.addEventListener('click', function () {
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    block.innerHTML = `
    <nav class="navbar">
        <a href="${logoLink}" class="logo-container">
            <p>${logoText}</p>
        </a>
        <div class="buttons-container">
            ${ctaElements}
        </div>
    </nav>
    `;

    const navbarbuttons = block.querySelectorAll('.nav-button');
    setupNavButtons(navbarbuttons);

    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = block.querySelector('.navbar');
        if (currentScroll > lastScrollTop) {
            // Scroll down
            navbar.style.top = '0'; // Adjust this value based on your navbar height
        } else {
            // Scroll up
            navbar.style.top = '-200px'; // Adjust this value based on your navbar height
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}
