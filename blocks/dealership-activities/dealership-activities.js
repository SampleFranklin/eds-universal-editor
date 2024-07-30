import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

// Example JSON data for dealership activities items
const dealershipActivitiesData = [
  {
    tabName: 'Tab 1',
    image: '<picture>...</picture>',
    dealerName: 'Dealer One',
    emailId: 'dealerone@example.com',
    scheduledDate: '13th Jun, 2022',
    scheduledTime: '14:30 PM',
    contact: 'contact info',
    description: 'Description for Dealer One.',
    primaryText: 'Primary Action',
    primaryHref: '#',
    primaryTarget: '_self',
    secondaryText: 'Secondary Action',
    secondaryHref: '#',
    secondaryTarget: '_self'
  },
  // Add more dealership activity items as needed
];

export default async function decorate(block) {
  // Extract elements from the block
  const [titleEl, subtitleEl] = block.children;

  // Extract title and subtitle
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';

  // Function to generate HTML for individual dealership activity items
  const generateDealershipActivityItemsHtml = (items) => {
    return items.map((item, index) => `
      <div class="dealership-activities__item" id="tab${index + 1}">
        <div class="dealership-activities__item-left">
          ${item.image}
          <p class="description">${item.description}</p>
        </div>
        <div class="dealership-activities__item-right">
          <p class="dealer-name">
            <strong>DEALER NAME:</strong><br>
            <span contenteditable="true">${item.dealerName}</span>
          </p>
          <p class="scheduled-date">
            <strong>SCHEDULED DATE:</strong><br>
            <span contenteditable="true">${item.scheduledDate}</span>
          </p>
          <p class="scheduled-time">
            <strong>SCHEDULED TIME:</strong><br>
            <span contenteditable="true">${item.scheduledTime}</span>
          </p>
          <p class="email-id">
            <strong>EMAIL ID:</strong><br>
            <span contenteditable="true">${item.emailId}</span>
          </p>
          <p class="contact">
            <strong>CONTACT:</strong><br>
            <span contenteditable="true">${item.contact}</span>
          </p>
          <div class="actions">
            <a href="${item.primaryHref}" target="${item.primaryTarget}" class="primary-text">${item.primaryText}</a>
            <a href="${item.secondaryHref}" target="${item.secondaryTarget}" class="button secondary-text">${item.secondaryText}</a>
          </div>
        </div>
      </div>
    `).join('');
  };

  // Function to generate HTML for tabs
  const generateTabsHtml = (tabs) => {
    return tabs.map((tab, index) => {
      const isActive = index === 0 ? 'active default' : '';
      return `
        <div class="tablink ${isActive}" data-tab="tab${index + 1}">
          ${tab.tabName}
          <hr class="tab-scroll-line">
        </div>
      `;
    }).join('');
  };

  // Generate tabs and items HTML
  const tabsHtml = generateTabsHtml(dealershipActivitiesData);
  const itemsHtml = generateDealershipActivityItemsHtml(dealershipActivitiesData);

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
  if (document.querySelectorAll('.dealership-activities__item')[0]) {
    document.querySelectorAll('.dealership-activities__item')[0].style.display = 'flex';
    document.querySelectorAll('.dealership-activities__item')[0].classList.add('active');
    moveInstrumentation(document.querySelectorAll('.dealership-activities__item')[0]);
  }
}
