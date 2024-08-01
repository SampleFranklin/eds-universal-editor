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

  const dealershipActivities = Array.from(dealershipActivitiesItemsEl.children).map(itemEl => {
    const dealerNameEl = itemEl.querySelector('.dealer-name');
    const activityEl = itemEl.querySelector('.activity');
    const descriptionEl = itemEl.querySelector('.description');

    return {
      dealerName: dealerNameEl?.textContent?.trim() || "",
      activity: activityEl?.textContent?.trim() || "",
      description: descriptionEl?.textContent?.trim() || ""
    };
  });

  const stubbedData = [
    {
      "dealername": "Mayuri Automobile Co. Ltd.",
      "image": "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      "description": "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
      "scheduledtime": "14:30PM",
      "scheduleddate": "13th Jun, 2024",
      "contact": "9931242213",
      "email": "mandi@competent-maruti.com",
      "primarycta": "Schedule a video call",
      "secondarycta": "Directions",
      "category": "Showroom Visit"
    },
    {
      "dealername": "Mayuri Automobile Co. Ltd.",
      "image": "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      "description": "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
      "scheduledtime": "14:30PM",
      "scheduleddate": "13th Jun, 2024",
      "contact": "9931242213",
      "email": "mandi@competent-maruti.com",
      "primarycta": "Schedule a video call",
      "secondarycta": "Directions",
      "category": "Showroom Visit"
    },
    // Add more items with different categories if needed
  ];

  function renderContentForTab(tabIndex) {
    const tabName = tabs[tabIndex];
    const filteredData = stubbedData.filter(dealer => dealer.category === tabName);
    return filteredData.map((dealer, index) => createDealerCard(dealer, index)).join('');
  }

  function createDealerCard(dealer, index) {
    return `
      <div class="dealer-card" data-index="${index}">
        <h3 class="dealer-name">${dealer.dealername}</h3>
        <img src="${dealer.image}" alt="Dealer Image">
        <p class="description">${dealer.description}</p>
        <p class="scheduled-time">${dealer.scheduledtime}</p>
        <p class="scheduled-date">${dealer.scheduleddate}</p>
        <p class="contact">${dealer.contact}</p>
        <p class="email">${dealer.email}</p>
        <button class="primary-cta">${dealer.primarycta}</button>
        <button class="secondary-cta">${dealer.secondarycta}</button>
      </div>
    `;
  }

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
}
