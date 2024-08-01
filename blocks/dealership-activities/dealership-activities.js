export default function decorate(block) {
  const [
    titleEl,
    subtitleEl,
    tabsEl,
    ...dealershipActivitiesItemEl
  ] = block.children;

  const title = titleEl?.textContent?.trim() || "";
  const subtitle = subtitleEl?.textContent?.trim() || "";
  const tabs = Array.from(tabsEl.children).map(tabEl => tabEl?.textContent?.trim() || "");

  const stubbedData = [
    {
      "dealername": "Mayuri Automobile Co. Ltd.",
      "image": "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      "description": "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
      "scheduledtime": "14:30PM",
      "scheduleddate": "13th Jun, 2024",
      "contact": "9931242213",
      "emailid": "mandi@competent-maruti.com",
      "primarycta": "Schedule a video call",
      "secondarycta": "Directions"
    },
    {
      "dealername": "Mayuri Automobile Co. Ltd.",
      "image": "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      "description": "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
      "scheduledtime": "14:30PM",
      "scheduleddate": "13th Jun, 2024",
      "contact": "9931242213",
      "emailid": "mandi@competent-maruti.com",
      "primarycta": "Schedule a video call",
      "secondarycta": "Directions"
    }
  ];

  function createDealerCard(dealer, cardIndex) {
    return `
      <div class="dealer-card" data-card-index="${cardIndex}">
        <div class="dealer-details">
          <div class="dealer-name-email">
            <div class="dealer-name">${dealer.dealername}</div>
            <div class="dealer-email">${dealer.emailid}</div>
          </div>
          <div class="dealer-schedule-contact">
            <div class="dealer-scheduleddate">${dealer.scheduleddate}</div>
            <div class="dealer-scheduledtime">${dealer.scheduledtime}</div>
            <div class="dealer-contact">${dealer.contact}</div>
          </div>
        </div>
      </div>
    `;
  }

  function extractDealershipActivityItems(items) {
    return Array.from(items).map((itemEl, index) => {
      const [
        dealerNameEl,
        emailIdEl,
        scheduledDateEl,
        scheduledTimeEl,
        contactEl
      ] = itemEl.children;

      return {
        dealername: dealerNameEl?.textContent?.trim() || stubbedData[index]?.dealername || '',
        emailid: emailIdEl?.textContent?.trim() || stubbedData[index]?.emailid || '',
        scheduleddate: scheduledDateEl?.textContent?.trim() || stubbedData[index]?.scheduleddate || '',
        scheduledtime: scheduledTimeEl?.textContent?.trim() || stubbedData[index]?.scheduledtime || '',
        contact: contactEl?.textContent?.trim() || stubbedData[index]?.contact || ''
      };
    });
  }

  const dealershipActivitiesData = extractDealershipActivityItems(dealershipActivitiesItemEl);

  function renderContentForTab(tabIndex) {
    const filteredData = dealershipActivitiesData.slice(tabIndex * 2, tabIndex * 2 + 2);
    return filteredData.map((dealer, index) => createDealerCard(dealer, index)).join('');
  }

  const tabMap = tabs.map((tab, index) => `
    <div class="tab-item ${index === 0 ? 'active' : ''}" data-index="${index}">
      ${tab} (${dealershipActivitiesData.slice(index * 2, index * 2 + 2).length})
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
}
