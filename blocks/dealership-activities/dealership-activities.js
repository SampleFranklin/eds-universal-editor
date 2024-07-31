export default function decorate(block) {
  const [
    titleEl,
    subtitleEl,
    ...tabElements
  ] = block.children;

  const title = titleEl?.textContent?.trim() || "";
  const subtitle = subtitleEl?.textContent?.trim() || "";
  const tabs = tabElements.map(tabEl => tabEl?.textContent?.trim() || "");

  function createDealerCard(data) {
    return data.map(dealer => `
      <div class="dealer-card">
        <picture>
          <img src="${dealer.image}" alt="image" class="dealer-image"/>
        </picture>
        <p class="dealer-description">${dealer.description}</p>
        <a href="#" class="primary-cta">${dealer.primarycta}</a>
          <button class="secondary-cta">${dealer.secondarycta}</button>
        <div class="dealer-details">
           <div class="dealer-name-email">
            <div>
              <strong>DEALER NAME:</strong> 
              <span class="dealer-name">${dealer.dealername}</span>
            </div>
            <div>
              <strong>EMAIL ID:</strong> 
              <span class="dealer-email">${dealer.email}</span>
            </div>
          </div>

          <div class="dealer-schedule-contact">
            <div>
              <strong>SCHEDULED TIME</strong>
              <p class="dealer-scheduledtime">${dealer.scheduledtime}</p>
            </div>
            <div>
              <strong>SCHEDULED DATE</strong>
              <p class="dealer-scheduleddate">${dealer.scheduleddate}</p>
            </div>
            <div>
              <strong>CONTACT</strong>
              <p class="dealer-contact">${dealer.contact}</p>
            </div>
          </div>
          
          
        </div>
      </div>
    `).join('');
  }

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
      "secondarycta": "Directions"
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
      "secondarycta": "Directions"
    }
  ];

  function renderContentForTab(tabIndex) {
    let filteredData;
    if (tabIndex === 0) {
      filteredData = stubbedData.slice(0, 2); // First 2 items
    } else {
      filteredData = stubbedData.slice(2); // Remaining items
    }
    return createDealerCard(filteredData);
  }

  const tabMap = tabs.map((tab, index) => `
    <div class="tab-item ${index === 0 ? 'active' : ''}" data-index="${index}">
      ${tab}
      <div class="scroll-line ${index === 0 ? 'visible' : ''}"></div>
    </div>
  `).join('');

  const dealershipActivitiesHTML = `
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
          ${renderContentForTab(0)} <!-- Initially render content for the first tab -->
        </div>
      </div>
    </div>
  `;

  block.innerHTML = dealershipActivitiesHTML;

  const tabItems = block.querySelectorAll('.tab-item');
  const dealerCardsContainer = block.querySelector('.dealer-cards');

  tabItems.forEach(item => {
    item.addEventListener('mouseover', () => {
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
