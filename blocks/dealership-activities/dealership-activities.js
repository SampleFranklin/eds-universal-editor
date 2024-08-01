import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  // Extract elements from the block
  const [titleEl, subtitleEl, tabsEl] = block.children;

  // Extract title and subtitle
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';

  // Function to extract and build the tabs
  const extractTabs = (tabsEl) => {
    return Array.from(tabsEl.children).map((tabEl, index) => {
      const tabName = tabEl.textContent.trim();
      return `
        <div class="tablink ${index === 0 ? 'active' : ''}" data-tab="tab${index + 1}">
          ${tabName}
        </div>
      `;
    }).join('');
  };

  // Generate tabs HTML
  const tabsHtml = extractTabs(tabsEl);

  // Set block's inner HTML
  block.innerHTML = utility.sanitizeHtml(`
    <div class="dealership-activities__container">
      <div class="dealership-activities__content">
        <div class="dealership-activities__title">
          ${title}
          <p class="subtitle">${subtitle}</p>
        </div>
        <div class="tabs-wrapper">
          <div class="tabs">
            ${tabsHtml}
          </div>
        </div>
      </div>
    </div>
  `);

  // Function to handle tab switching and highlight
  const openTab = (evt, tabName) => {
    const tabLinks = document.querySelectorAll('.tablink');

    tabLinks.forEach((link) => {
      link.classList.remove('active');
    });

    evt.currentTarget.classList.add('active');
    moveInstrumentation(evt.currentTarget);
  };

  // Attach click event listeners to the tabs
  document.querySelectorAll('.tablink').forEach((tabLink) => {
    tabLink.addEventListener('click', (event) => {
      openTab(event, tabLink.getAttribute('data-tab'));
    });
  });

  // Show only the first tab's content by default
  const firstTabLink = document.querySelector('.tablink');
  if (firstTabLink) {
    openTab({ currentTarget: firstTabLink }, firstTabLink.getAttribute('data-tab'));
  }
}
