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
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default scrolling behavior
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    block.innerHTML = `
    <div class="secondary-navbar-container">
        <nav class="secondary-navbar">
            <a href="${logoLink}" class="logo-container">
                <p>${logoText}</p>
            </a>
            <div class="buttons-container">
                ${ctaElements}
            </div>
        </nav>
    </div>
    `;
    const navbarbuttons = block.querySelectorAll('.nav-button');
    setupNavButtons(navbarbuttons);

    let lastScrollTop = 0;
    const section = document.querySelector('.secondary-navigation').closest('.section');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = block.querySelector('.secondary-navbar-container');
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        console.log(currentScroll, " ", sectionTop, " ", navbar.offsetHeight);
      
        if (currentScroll < sectionTop) {

            navbar.style.visibility = 'visible';
            navbar.style.position = 'relative';

        }


        else if (currentScroll >= sectionTop && currentScroll < sectionBottom) { //inside the section

            navbar.style.visibility = 'visible';
            navbar.style.position = 'fixed';

            if (lastScrollTop <= currentScroll)//scroll down
            {

                navbar.style.top = '0';
             }

            else {

                navbar.style.visibility = 'hidden';
            }

    }
        
        
        else {

            navbar.style.visibility = 'hidden';

        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

}
