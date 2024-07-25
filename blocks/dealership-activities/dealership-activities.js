import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  // Extract elements from the block
  const [titleEl, subtitleEl, ...dealershipActivitiesItemEl] = block.children;

  // Extract title and subtitle
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';

  // Function to extract individual dealership activity items
  const extractDealershipActivityItems = (items) => {
    return items.map((itemEl, index) => {
      const [
        tabNameEl,
        imageEl,
        dealerNameEl,
        emailIdEl,
        scheduledDateEl,
        scheduledTimeEl,
        contactEl,
        primaryTextEl,
        secondaryTextEl
      ] = itemEl.children;

      const image = imageEl?.querySelector('picture')?.outerHTML || '';
      const dealerName = dealerNameEl?.textContent?.trim() || '';
      const emailId = emailIdEl?.textContent?.trim() || '';
      const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
      const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
      const contact = contactEl?.textContent?.trim() || '';
      const primaryText = primaryTextEl?.innerHTML || '';
      const secondaryText = secondaryTextEl?.innerHTML || '';

      return {
        tabName: tabNameEl?.textContent?.trim() || `Tab ${index + 1}`,
        content: `
          <div class="dealership-activities__item" id="tab${index + 1}">
            <div class="dealership-activities__item-left">
              ${image}
            </div>
            <div class="dealership-activities__item-right">
              <p class="dealer-name">${dealerName}</p>
              <p class="scheduled-date-time">${scheduledDate} | ${scheduledTime}</p>
              <p class="email-id">${emailId}</p>
              <p class="contact">${contact}</p>
              <div class="actions">
                <div class="primary-text">${primaryText}</div>
                <div class="secondary-text">${secondaryText}>
                <button class="secondary-text">${secondaryText}</button>
                </div>
              </div>
            </div>
          </div>
        `
      };
    });
  };

  // Function to extract and build the tabs
  const extractTabs = (tabs) => {
    return tabs.map((tab, index) => {
      const isActive = index === 0 ? 'active' : '';
      return `<div class="tablink ${isActive}" data-tab="tab${index + 1}">${tab.tabName}</div>`;
    }).join('');
  };

  // Generate tabs and items HTML
  const items = extractDealershipActivityItems(dealershipActivitiesItemEl);
  const tabsHtml = extractTabs(items);
  const itemsHtml = items.map(item => item.content).join('');

  // Set block's inner HTML
  block.innerHTML = utility.sanitizeHtml(`
    <div class="dealership-activities__container">
      <div class="dealership-activities__content">
        <div class="dealership-activities__title">
          ${title}
          <p class="subtitle">${subtitle}</p>
        </div>
        <div class="tabs">
          ${tabsHtml}
        </div>
        <div class="dealership-activities__items">
          ${itemsHtml}
        </div>
      </div>
    </div>
  `);

  // Function to handle tab switching and highlight
  const openTab = (evt, tabName) => {
    const tabContent = document.querySelectorAll('.dealership-activities__item');
    const tabLinks = document.querySelectorAll('.tablink');

    tabContent.forEach((content) => {
      content.style.display = 'none';
      content.classList.remove('active');
    });

    tabLinks.forEach((link) => {
      link.classList.remove('active');
    });

    const activeTab = document.getElementById(tabName);
    if (activeTab) {
      activeTab.style.display = 'flex';
      activeTab.classList.add('active');
      moveInstrumentation(activeTab);
    }

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

  // Initial tab display setup
  const initialTab = document.querySelector('.dealership-activities__item');
  if (initialTab) {
    initialTab.style.display = 'flex';
    initialTab.classList.add('active');
    moveInstrumentation(initialTab);
  }
}
