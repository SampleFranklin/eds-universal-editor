export default async function decorate(block) {
  // Extract elements from the block
  const [titleEl, subtitleEl, dealershipActivitiesItemsEl, tabsEl] = block.children;

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

      return {
        content: `
          <div class="dealership-activities__item" id="tab${index + 1}">
            <div class="dealership-activities__item-right">
              <p class="dealer-name">${dealerName}</p>
              <p class="scheduled-date">${scheduledDate}</p>
              <p class="scheduled-time">${scheduledTime}</p>
              <p class="email-id">${emailId}</p>
              <p class="contact">${contact}</p>
            </div>
          </div>
        `
      };
    });
  };

  // Function to extract and build the tabs
  const extractTabs = (items) => {
    return items.map((_, index) => {
      const isActive = index === 0 ? 'active' : '';
      return `<div class="tablink ${isActive}" data-tab="tab${index + 1}">Tab ${index + 1}</div>`;
    }).join('');
  };

  // Generate tabs and items HTML
  const items = extractDealershipActivityItems(dealershipActivitiesItemsEl.children);
  const tabsHtml = extractTabs(items);
  const itemsHtml = items.map(item => item.content).join('');

  // Set block's inner HTML
  block.innerHTML = `
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
  `;

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
    }
  };

  // Add event listeners to tabs
  document.querySelectorAll('.tablink').forEach(tabLink => {
    tabLink.addEventListener('click', (e) => {
      const tabName = e.currentTarget.dataset.tab;
      openTab(e, tabName);
    });
  });

  // Initialize the first tab to be open
  if (document.querySelector('.tablink')) {
    document.querySelector('.tablink').click();
  }
}
