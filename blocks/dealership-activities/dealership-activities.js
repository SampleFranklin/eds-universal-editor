export default function decorate(block) {
  const [
    titleEl,
    subtitleEl,
    dealershipActivitiesItemsEl,
    ...tabElements
  ] = block.children;

  const title = titleEl?.textContent?.trim() || "";
  const subtitle = subtitleEl?.textContent?.trim() || "";
  const tabs = tabElements.map(tabEl => tabEl?.textContent?.trim() || "");

  // Extract dealership activities from the authoring system
  const dealershipActivities = Array.from(dealershipActivitiesItemsEl.children).map(itemEl => {
    const [
      dealerNameEl,
      emailIdEl,
      scheduledDateEl,
      scheduledTimeEl,
      contactEl
    ] = itemEl.children;

    return {
      dealerName: dealerNameEl?.textContent?.trim() || '',
      emailId: emailIdEl?.textContent?.trim() || '',
      scheduledDate: scheduledDateEl?.textContent?.trim() || '',
      scheduledTime: scheduledTimeEl?.textContent?.trim() || '',
      contact: contactEl?.textContent?.trim() || ''
    };
  });

  // Render content for a specific tab using only dealershipActivities
  function renderContentForTab(tabIndex) {
    // Assuming you have some logic to filter data based on tabIndex
    const filteredData = dealershipActivities; // Apply any filtering logic as needed
    return filteredData.map((dealer, index) => createDealerCard(dealer, index)).join('');
  }

  // Create HTML for a dealer card using the data from dealershipActivities
  function createDealerCard(dealer, index) {
    return `
      <div class="dealer-card" data-index="${index}">
        <h3 class="dealer-name">${dealer.dealerName}</h3>
        <p class="email-id">${dealer.emailId}</p>
        <p class="scheduled-date">${dealer.scheduledDate}</p>
        <p class="scheduled-time">${dealer.scheduledTime}</p>
        <p class="contact">${dealer.contact}</p>
      </div>
    `;
  }

  // Render tabs
  const tabMap = tabs.map((tab, index) => `
    <div class="tab-item ${index === 0 ? 'active' : ''}" data-index="${index}">
      ${tab}
      <div class="scroll-line ${index === 0 ? 'visible' : ''}"></div>
    </div>
  `).join('');

  const initialContent = renderContentForTab(0);

  block.innerHTML = `
    <div class="dealership-activities__container">
      <div class="dealership-activities__content">
        <div class="dealership-activities__title">
          ${title}
          <p class="subtitle">${subtitle}</p>
        </div>
        <div class="dealership-activities__tabs">
          ${tabMap}
        </div>
        <div class="dealer-cards">
          ${initialContent}
        </div>
      </div>
    </div>
  `;

  const tabItems = block.querySelectorAll('.tab-item');
  const dealerCardsContainer = block.querySelector('.dealer-cards');

  tabItems.forEach(item => {
    item.addEventListener('click', () => {
      tabItems.forEach(tab => {
        tab.classList.remove('active');
        tab.querySelector('.scroll-line').classList.remove('visible');
      });
      item.classList.add('active');
      item.querySelector('.scroll-line').classList.add('visible');

      const tabIndex = parseInt(item.dataset.index, 10);
      dealerCardsContainer.innerHTML = renderContentForTab(tabIndex);
    });
  });

  // Debugging: Check initial content
  console.log('Initial Content:', initialContent);
}
