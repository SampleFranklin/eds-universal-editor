import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  // Stubbed response to simulate dynamic items
  const stubbedItemsResponse = [
    {
      image: '<picture><img src="image1.jpg" alt="Image 1"></picture>',
      dealerName: '<span contenteditable="true">Dealer One</span>',
      emailId: '<span contenteditable="true">dealerone@example.com</span>',
      scheduledDate: '<span contenteditable="true">2024-07-30</span>',
      scheduledTime: '<span contenteditable="true">10:00 AM</span>',
      contact: '<span contenteditable="true">123-456-7890</span>',
      description: 'Description for event 1.',
      primaryText: 'Register',
      primaryHref: '#',
      primaryTarget: '_self',
      secondaryText: 'More Info',
      secondaryHref: '#',
      secondaryTarget: '_self',
    },
    {
      image: '<picture><img src="image2.jpg" alt="Image 2"></picture>',
      dealerName: '<span contenteditable="true">Dealer Two</span>',
      emailId: '<span contenteditable="true">dealertwo@example.com</span>',
      scheduledDate: '<span contenteditable="true">2024-08-01</span>',
      scheduledTime: '<span contenteditable="true">2:00 PM</span>',
      contact: '<span contenteditable="true">234-567-8901</span>',
      description: 'Description for event 2.',
      primaryText: 'Register',
      primaryHref: '#',
      primaryTarget: '_self',
      secondaryText: 'More Info',
      secondaryHref: '#',
      secondaryTarget: '_self',
    }
  ];

  // Extract elements from the block
  const [titleEl, subtitleEl, ...dealershipActivitiesItemEl] = block.children;

  // Extract title and subtitle
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';

  // Function to extract individual dealership activity items
  const extractDealershipActivityItems = (items) => {
    return items.map((itemEl, index) => {
      return {
        tabName: `Tab ${index + 1}`,  // Example tab name, adjust as needed
        content: `
          <div class="dealership-activities__item" id="item${index}">
            <div class="dealership-activities__item-left">
              ${itemEl.image}
              <p class="description">${itemEl.description}</p>
            </div>
            <div class="dealership-activities__item-right">
              <p class="dealer-name">${itemEl.dealerName}</p>
              <p class="scheduled-date">${itemEl.scheduledDate}</p>
              <p class="scheduled-time">${itemEl.scheduledTime}</p>
              <p class="email-id">${itemEl.emailId}</p>
              <p class="contact">${itemEl.contact}</p>
              <div class="actions">
                <a href="${itemEl.primaryHref}" target="${itemEl.primaryTarget}" class="primary-text">${itemEl.primaryText}</a>
                <a href="${itemEl.secondaryHref}" target="${itemEl.secondaryTarget}" class="button secondary-text">${itemEl.secondaryText}</a>
              </div>
            </div>
          </div>
        `,
      };
    });
  };

  // Function to extract and build the tabs
  const extractTabs = (items) => {
    return items.map((item, index) => {
      const isActive = index === 0 ? 'active default' : '';
      return `
        <div class="tablink ${isActive}" data-tab="item${index}">
          ${item.tabName}
          <hr class="tab-scroll-line">
        </div>
      `;
    }).join('');
  };

  // Generate items for the first tab only and create empty tabs for the rest
  const items = extractDealershipActivityItems(stubbedItemsResponse);
  const tabsHtml = `
    <div class="tablink active default" data-tab="item0">Tab 1<hr class="tab-scroll-line"></div>
    <div class="tablink" data-tab="item1">Tab 2<hr class="tab-scroll-line"></div>
    <div class="tablink" data-tab="item2">Tab 3<hr class="tab-scroll-line"></div>
  `;
  const itemsHtml = `
    <div class="dealership-activities__item" id="item0" style="display: flex;">
      ${items.map(item => item.content).join('')}
    </div>
    <div class="dealership-activities__item" id="item1" style="display: none;"></div>
    <div class="dealership-activities__item" id="item2" style="display: none;"></div>
  `;

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
  const openTab = (evt, tabId) => {
    const tabContent = document.querySelectorAll('.dealership-activities__item');
    const tabLinks = document.querySelectorAll('.tablink');

    tabContent.forEach((content) => {
      content.style.display = 'none';
      content.classList.remove('active');
    });

    tabLinks.forEach((link) => {
      link.classList.remove('active');
    });

    const activeTab = document.getElementById(tabId);
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
      const tabId = tabLink.getAttribute('data-tab');
      openTab(event, tabId);
    });
  });

  // Initial tab display setup
  if (document.querySelectorAll('.dealership-activities__item')[0]) {
    document.querySelectorAll('.dealership-activities__item')[0].style.display = 'flex';
    document.querySelectorAll('.dealership-activities__item')[0].classList.add('active');
    moveInstrumentation(document.querySelectorAll('.dealership-activities__item')[0]);
  }
}
