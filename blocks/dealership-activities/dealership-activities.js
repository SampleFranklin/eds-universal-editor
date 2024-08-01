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
      "category": "Test Drive"
    },
    {
      "dealername": "Another Dealer",
      "image": "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      "description": "Another event description",
      "scheduledtime": "10:00AM",
      "scheduleddate": "15th Jul, 2024",
      "contact": "9876543210",
      "email": "another@dealer.com",
      "primarycta": "Get in Touch",
      "secondarycta": "Directions",
      "category": "Test Drive"
    }
  ];

  // Calculate item counts for each category
  const categoryCounts = stubbedData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

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

  // Render tabs with item counts
  const tabMap = tabs.map((tab, index) => `
    <div class="tab-item ${index === 0 ? 'active' : ''}" data-index="${index}">
      ${tab} (${categoryCounts[tab] || 0})
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

  // Log tab items for debugging
  console.log('Tab Items:', tabItems);

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

  // Debugging: Check initial content rendering
  console.log('Initial Content:', initialContent);
}
