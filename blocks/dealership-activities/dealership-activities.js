import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  // Extract elements from the block
  const [titleEl, subtitleEl, ...tabsAndItemsEls] = block.children;

  // Extract title and subtitle
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';

  // Function to extract individual dealership activity items
  const extractDealershipActivityItems = (items) => {
    return items.map((itemEl, index) => {
      const imageEl = itemEl.querySelector('.image');
      const dealerNameEl = itemEl.querySelector('.dealer-name');
      const contactEl = itemEl.querySelector('.contact');
      const emailIdEl = itemEl.querySelector('.email-id');
      const scheduledDateEl = itemEl.querySelector('.scheduled-date');
      const scheduledTimeEl = itemEl.querySelector('.scheduled-time');
      const primaryCtaEl = itemEl.querySelector('.primary-cta');
      const secondaryCtaEl = itemEl.querySelector('.secondary-cta');

      const image = imageEl?.querySelector('img')?.outerHTML || '';
      const dealerName = dealerNameEl?.textContent?.trim() || '';
      const contact = contactEl?.textContent?.trim() || '';
      const emailId = emailIdEl?.textContent?.trim() || '';
      const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
      const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
      const primaryCta = primaryCtaEl?.querySelector('button')?.outerHTML || '';
      const secondaryCta = secondaryCtaEl?.querySelector('a')?.outerHTML || '';

      return `
        <div class="dealership-activities__item" id="tab${index + 1}">
          <div class="dealership-activities__item-left">
            ${image}
          </div>
          <div class="dealership-activities__item-right">
            <p><strong>Dealer Name:</strong> ${dealerName}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Email ID:</strong> ${emailId}</p>
            <p><strong>Scheduled Date:</strong> ${scheduledDate}</p>
            <p><strong>Scheduled Time:</strong> ${scheduledTime}</p>
            <div class="actions">
              ${primaryCta}
              ${secondaryCta}
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  // Function to extract and build the tabs
  const extractTabs = (tabs) => {
    return tabs.map((tab, index) => {
      const isActive = index === 0 ? 'active' : '';
      return `<button class="tablink ${isActive}" data-tab="tab${index + 1}">Tab ${index + 1}</button>`;
    }).join('');
  };

  // Separate tabs and items
  const tabs = tabsAndItemsEls.filter((el) => el.classList.contains('tab'));
  const items = tabsAndItemsEls.filter((el) => el.classList.contains('dealership-activities__item'));

  // Generate tabs and items HTML
  const tabsHtml = extractTabs(tabs);
  const itemsHtml = extractDealershipActivityItems(items);

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
  if (document.querySelectorAll('.dealership-activities__item')[0]) {
    document.querySelectorAll('.dealership-activities__item')[0].style.display = 'flex';
    document.querySelectorAll('.dealership-activities__item')[0].classList.add('active');
    moveInstrumentation(document.querySelectorAll('.dealership-activities__item')[0]);
  }
}
