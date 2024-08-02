export default function decorate(block) {
  const [titleEl, subtitleEl, tabsEl, ...dealershipActivitiesItemEls] = block.children;

  const title = titleEl?.textContent?.trim() || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';
  const tabs = Array.from(tabsEl?.children || []).map(tabEl => tabEl?.textContent?.trim() || '');

  const stubbedData = [
    {
      dealername: 'Mayuri Automobile Co. Ltd.',
      image: '/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png',
      description: 'Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R',
      scheduledtime: '14:30PM',
      scheduleddate: '13th Jun, 2024',
      contact: '9931242213',
      emailid: 'mandi@competent-maruti.com',
      primarycta: 'Schedule a video call',
      secondarycta: 'Directions',
      tab: 'Test Drive'
    },
    {
      dealername: 'Mayuri Automobile Co. Ltd.',
      image: '/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png',
      description: 'Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R',
      scheduledtime: '14:30PM',
      scheduleddate: '13th Jun, 2024',
      contact: '9931242213',
      emailid: 'mandi@competent-maruti.com',
      primarycta: 'Schedule a video call',
      secondarycta: 'Directions',
      tab: 'Test Drive'
    },
  ];

  function extractDealershipActivityItems(items) {
    return Array.from(items).map((itemEl) => {
      const [
        dealerNameEl,
        emailIdEl,
        scheduledDateEl,
        scheduledTimeEl,
        contactEl,
      ] = itemEl.children;

      return {
        dealername: dealerNameEl?.textContent?.trim() || '',
        emailid: emailIdEl?.textContent?.trim() || '',
        scheduleddate: scheduledDateEl?.textContent?.trim() || '',
        scheduledtime: scheduledTimeEl?.textContent?.trim() || '',
        contact: contactEl?.textContent?.trim() || '',
        tab: 'Other', // Default tab if not provided
      };
    });
  }

  const dealershipActivitiesData = extractDealershipActivityItems(dealershipActivitiesItemEls);

  function mergeData(stubbed, authoring) {
    return stubbed.concat(authoring.map((item, index) => ({
      dealername: item.dealername || stubbed[index % stubbed.length].dealername,
      emailid: item.emailid || stubbed[index % stubbed.length].emailid,
      scheduleddate: item.scheduleddate || stubbed[index % stubbed.length].scheduleddate,
      scheduledtime: item.scheduledtime || stubbed[index % stubbed.length].scheduledtime,
      contact: item.contact || stubbed[index % stubbed.length].contact,
      image: stubbed[index % stubbed.length].image,
      description: stubbed[index % stubbed.length].description,
      primarycta: stubbed[index % stubbed.length].primarycta,
      secondarycta: stubbed[index % stubbed.length].secondarycta,
      tab: item.tab,
    })));
  }

  function createDealerCard(dealer, cardIndex) {
    return `
      <div class="dealer-card" data-card-index="${cardIndex}">
        <div class="dealer-image">
          <img src="${dealer.image}" alt="Dealer Image">
        </div>
        <div class="dealer-details">
          <div class="dealer-name">${dealer.dealername}</div>
          <div class="dealer-email">${dealer.emailid}</div>
          <div class="dealer-scheduleddate">${dealer.scheduleddate}</div>
          <div class="dealer-scheduledtime">${dealer.scheduledtime}</div>
          <div class="dealer-contact">${dealer.contact}</div>
          <div class="dealer-description">${dealer.description}</div>
          <a href="#" class="primary-cta">${dealer.primarycta}</a>
          <button class="secondary-cta">${dealer.secondarycta}</button>
        </div>
      </div>
    `;
  }

  function getTabData(tab) {
    const allData = mergeData(stubbedData, dealershipActivitiesData);
    return allData.filter(item => item.tab === tab);
  }

  function renderContentForTab(tab) {
    const tabData = getTabData(tab);
    return tabData.map((dealer, index) => createDealerCard(dealer, index)).join('');
  }

  function updateTabLabels() {
    const tabDataCounts = tabs.map(tab => getTabData(tab).length);
    return tabs.map((tab, index) => `
      <div class="tab-item ${index === 0 ? 'active' : ''}" data-tab="${tab}">
        ${tab} (${tabDataCounts[index]})
        <div class="scroll-line ${index === 0 ? 'visible' : ''}"></div>
      </div>
    `).join('');
  }

  const initialContent = renderContentForTab(tabs[0]);
  const tabMap = updateTabLabels();
  const totalCount = mergeData(stubbedData, dealershipActivitiesData).length;

  block.innerHTML = `
    <div class="dealership-activities__container">
      <div class="dealership-activities__content">
        <div class="dealership-activities__title">
          ${title} (${totalCount})
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

  function updateTabState(tab) {
    tabItems.forEach((item) => {
      if (item.dataset.tab === tab) {
        item.classList.add('active');
        item.querySelector('.scroll-line').classList.add('visible');
      } else {
        item.classList.remove('active');
        item.querySelector('.scroll-line').classList.remove('visible');
      }
    });
  }

  tabItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      updateTabState(tab);
      dealerCardsContainer.innerHTML = renderContentForTab(tab);
    });
  });
}
