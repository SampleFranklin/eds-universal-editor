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
  const dealershipActivitiesItems = Array.from(dealershipActivitiesItemsEl.children).map(itemEl => {
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

  // Function to create dealer card HTML
  function createDealerCard(dealer) {
    return `
      <div class="dealer-card">
        <p class="dealer-name">${dealer.dealername}</p>
        
        
        <p class="scheduled-time">${dealer.scheduledtime}</p>
        <p class="scheduled-date">${dealer.scheduleddate}</p>
        <p class="contact">${dealer.contact}</p>
        <p class="email">${dealer.email}</p>
        
      </div>
    `;
  }

  // Render content for a specific tab using stubbedData
  function renderContentForTab(tabIndex) {
    const tabName = tabs[tabIndex];
    const filteredData = dealershipActivitiesItems;
    //const filteredData = stubbedData.filter(dealer => dealer.category === tabName);
    return filteredData.map(createDealerCard).join('');
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































// export default function decorate(block) {
//   const [
//     titleEl,
//     subtitleEl,
//     dealershipActivitiesItemsEl,
//     ...tabElements
//   ] = block.children;

//   const title = titleEl?.textContent?.trim() || "";
//   const subtitle = subtitleEl?.textContent?.trim() || "";
//   const tabs = tabElements.map(tabEl => tabEl?.textContent?.trim() || "");

//   // Extract dealership activities from the authoring system
//   const dealershipActivities = Array.from(dealershipActivitiesItemsEl.children).map(itemEl => {
//     const [
//       dealerNameEl,
//       emailIdEl,
//       scheduledDateEl,
//       scheduledTimeEl,
//       contactEl
//     ] = itemEl.children;

//     return {
//       dealerName: dealerNameEl?.textContent?.trim() || '',
//       emailId: emailIdEl?.textContent?.trim() || '',
//       scheduledDate: scheduledDateEl?.textContent?.trim() || '',
//       scheduledTime: scheduledTimeEl?.textContent?.trim() || '',
//       contact: contactEl?.textContent?.trim() || ''
//     };
//   });

//   // Render content for a specific tab using only dealershipActivities
//   function renderContentForTab(tabIndex) {
//     // Assuming you have some logic to filter data based on tabIndex
//     const filteredData = dealershipActivities; // Apply any filtering logic as needed
//     return filteredData.map((dealer, index) => createDealerCard(dealer, index)).join('');
//   }

//   // Create HTML for a dealer card using the data from dealershipActivities
//   function createDealerCard(dealer, index) {
//     return `
//       <div class="dealer-card" data-index="${index}">
//         <h3 class="dealer-name">${dealer.dealerName}</h3>
//         <p class="email-id">${dealer.emailId}</p>
//         <p class="scheduled-date">${dealer.scheduledDate}</p>
//         <p class="scheduled-time">${dealer.scheduledTime}</p>
//         <p class="contact">${dealer.contact}</p>
//       </div>
//     `;
//   }

//   // Render tabs
//   const tabMap = tabs.map((tab, index) => `
//     <div class="tab-item ${index === 0 ? 'active' : ''}" data-index="${index}">
//       ${tab}
//       <div class="scroll-line ${index === 0 ? 'visible' : ''}"></div>
//     </div>
//   `).join('');

//   const initialContent = renderContentForTab(0);

//   block.innerHTML = `
//     <div class="dealership-activities__container">
//       <div class="dealership-activities__content">
//         <div class="dealership-activities__title">
//           ${title}
//           <p class="subtitle">${subtitle}</p>
//         </div>
//         <div class="dealership-activities__tabs">
//           ${tabMap}
//         </div>
//         <div class="dealer-cards">
//           ${initialContent}
//         </div>
//       </div>
//     </div>
//   `;

//   const tabItems = block.querySelectorAll('.tab-item');
//   const dealerCardsContainer = block.querySelector('.dealer-cards');

//   tabItems.forEach(item => {
//     item.addEventListener('click', () => {
//       tabItems.forEach(tab => {
//         tab.classList.remove('active');
//         tab.querySelector('.scroll-line').classList.remove('visible');
//       });
//       item.classList.add('active');
//       item.querySelector('.scroll-line').classList.add('visible');

//       const tabIndex = parseInt(item.dataset.index, 10);
//       dealerCardsContainer.innerHTML = renderContentForTab(tabIndex);
//     });
//   });

//   // Debugging: Check initial content
//   console.log('Initial Content:', initialContent);
// }
