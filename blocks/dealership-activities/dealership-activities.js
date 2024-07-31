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
        <img src="${dealer.image}" alt="${dealer.dealername}" class="dealer-image"/>
        <div class="dealer-details">
          <h2 class="dealer-name">${dealer.dealername}</h2>
          <p class="dealer-description">${dealer.description}</p>
          <p class="dealer-scheduledtime">${dealer.scheduledtime}</p>
          <p class="dealer-scheduleddate">${dealer.scheduleddate}</p>
          <p class="dealer-contact">${dealer.contact}</p>
          <p class="dealer-email">${dealer.email}</p>
          <a href="#" class="primary-cta">${dealer.primarycta}</a>
          <button class="secondary-cta">${dealer.secondarycta}</button>
        </div>
      </div>
    `).join('');
  }

  const stubbedData = [
    {
      "dealername": "ABC Motors",
      "image": "https://example.com/images/abc-motors.jpg",
      "description": "ABC Motors offers a wide range of vehicles to suit your needs. Visit us for great deals and exceptional service.",
      "scheduledtime": "10:00 AM",
      "scheduleddate": "2024-08-15",
      "contact": "+1 (555) 123-4567",
      "email": "contact@abcmotors.com",
      "primarycta": "Book a Test Drive",
      "secondarycta": "Get Directions"
    },
    {
      "dealername": "XYZ Autos",
      "image": "https://example.com/images/xyz-autos.jpg",
      "description": "XYZ Autos provides top-quality vehicles with unbeatable prices. Come and see our latest models today.",
      "scheduledtime": "2:00 PM",
      "scheduleddate": "2024-08-20",
      "contact": "+1 (555) 987-6543",
      "email": "info@xyzautos.com",
      "primarycta": "Schedule a Visit",
      "secondarycta": "Contact Us"
    },
    {
      "dealername": "123 Car Dealership",
      "image": "https://example.com/images/123-car-dealership.jpg",
      "description": "123 Car Dealership is known for its excellent customer service and a wide selection of cars. Check out our latest offers!",
      "scheduledtime": "11:00 AM",
      "scheduleddate": "2024-08-25",
      "contact": "+1 (555) 555-1234",
      "email": "sales@123cardealership.com",
      "primarycta": "Request a Quote",
      "secondarycta": "View Inventory"
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
