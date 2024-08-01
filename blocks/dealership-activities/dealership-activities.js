import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  // Extract elements from the block
  const [titleEl, subtitleEl, tabsEl, ...dealershipActivitiesItemEl] = block.children;

  // Extract title and subtitle
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';

  // Function to extract individual dealership activity items
  const extractDealershipActivityItems = (items) => {
    return Array.from(items).map((itemEl, index) => {
      const [
        dealerNameEl,
        emailIdEl,
        scheduledDateEl,
        scheduledTimeEl,
        contactEl
      ] = itemEl.children;

      const dealerName = dealerNameEl?.textContent?.trim() || '';
      const emailId = emailIdEl?.textContent?.trim() || '';
      const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
      const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
      const contact = contactEl?.textContent?.trim() || '';

      return `
        <div class="dealership-activities__item" id="item${index + 1}">
          <div class="dealership-activities__item-content">
            <p class="dealer-name">${dealerName}</p>
            <p class="scheduled-date">${scheduledDate}</p>
            <p class="scheduled-time">${scheduledTime}</p>
            <p class="email-id">${emailId}</p>
            <p class="contact">${contact}</p>
          </div>
        </div>
      `;
    }).join('');
  };

  // Function to extract and build the tabs
  const extractTabs = (tabsEl) => {
    return Array.from(tabsEl.children).map((tabEl, index) => {
      const tabName = tabEl.textContent.trim();
      const isActive = index === 0 ? 'active' : ''; // Default the first tab as active
      return `
        <div class="tablink ${isActive}" data-tab="tab${index + 1}">
          ${tabName}
          <hr class="tab-scroll-line">
        </div>
      `;
    }).join('');
  };

  // Generate tabs and items HTML
  const itemsHtml = extractDealershipActivityItems(dealershipActivitiesItemEl);
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
        <div class="dealership-activities__items">
          ${itemsHtml}
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
      const tabName = tabLink.getAttribute('data-tab');
      openTab(event, tabName);
    });
  });

  // Initialize the first tab to be open
  const firstTabLink = document.querySelector('.tablink');
  if (firstTabLink) {
    firstTabLink.click(); // This will trigger the click event and open the first tab
  }
}
