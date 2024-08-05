import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default function decorate(block) {
  function getDealershipActivities() {
    const [titleEl, subtitleEl, tabname1El, tabname2El, tabname3El, ...dealershipActivitiesItemEls] = block.children;

    const title = titleEl?.textContent?.trim() || '';
    const subtitle = subtitleEl?.textContent?.trim() || '';
    const tabname1 = tabname1El?.textContent?.trim() || '';
    const tabname2 = tabname2El?.textContent?.trim() || '';
    const tabname3 = tabname3El?.textContent?.trim() || '';

    const tabMap = {
      'showroom_visit': tabname1,
      'test_drive': tabname2,
      'booked': tabname3
    };

    const items = Array.from(dealershipActivitiesItemEls).map((itemEl) => {
      const [dealerNameEl, emailIdEl, scheduledDateEl, scheduledTimeEl, contactEl] = itemEl.children;
      const dealerName = dealerNameEl?.textContent?.trim() || '';
      const emailId = emailIdEl?.textContent?.trim() || '';
      const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
      const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
      const contact = contactEl?.textContent?.trim() || '';

      const tab = itemEl.dataset.tab || 'showroom_visit'; // Example: Use data attribute

      return {
        dealerName,
        emailId,
        scheduledDate,
        scheduledTime,
        contact,
        tab
      };
    });

    return {
      title,
      subtitle,
      tabname1,
      tabname2,
      tabname3,
      items,
      tabMap
    };
  }

  const stubbedData = [
    {
      dealerName: "Mayuri Automobile Co. Ltd.",
      image: "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      description: "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
      scheduledTime: "14:30PM",
      scheduledDate: "13th Jun, 2024",
      contact: "9931242213",
      emailId: "mandi@competent-maruti.com",
      primaryCta: "Schedule a video call",
      secondaryCta: "Directions",
      tab: "showroom_visit"
    },
    {
      dealerName: "Mayuri Automobile Co. Ltd.",
      image: "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      description: "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
      scheduledTime: "14:30PM",
      scheduledDate: "13th Jun, 2024",
      contact: "9931242213",
      emailId: "mandi@competent-maruti.com",
      primaryCta: "Schedule a video call",
      secondaryCta: "Directions",
      tab: "test_drive"
    },
    {
      dealerName: "Mayuri Automobile Co. Ltd.",
      image: "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      description: "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
      scheduledTime: "14:30PM",
      scheduledDate: "14th Jun, 2024",
      contact: "9931242213",
      emailId: "mandi@competent-maruti.com",
      primaryCta: "Schedule a video call",
      secondaryCta: "Reschedule",
      tab: "booked"
    },
  ];

  const dealership = getDealershipActivities();

  function combineItems(authoringItems, stubbedItems) {
    const combinedItems = [];

    authoringItems.forEach(authoringItem => {
      const stubbedItem = stubbedItems.find(item => item.tab === authoringItem.tab);

      if (stubbedItem) {
        combinedItems.push({
          ...authoringItem,
          ...stubbedItem
        });
      } else {
        combinedItems.push(authoringItem);
      }
    });

    // Add stubbed items that don't have corresponding authoring items
    stubbedItems.forEach(stubbedItem => {
      const authoringItem = authoringItems.find(item => item.tab === stubbedItem.tab);

      if (!authoringItem) {
        combinedItems.push(stubbedItem);
      }
    });

    return combinedItems;
  }

  function generateCardsHtml(items) {
    return items.map((item) => `
      <div class="dealer-card" data-tab="${item.tab}">
        <div class="authoring-item">
          <div class="dealer-name-schedule">
            <p class="dealer-name">${item.dealerName}</p>
            <p class="dealer-date">${item.scheduledDate}</p>
            <p class="dealer-time">${item.scheduledTime}</p>
          </div>
          <div class="dealer-email-contact">
            <p class="dealer-email">${item.emailId}</p>
            <p class="dealer-contact">${item.contact}</p>
          </div>
        </div>
        <div class="stubbed-item">
          ${item.image ? `<div class="dealer-image"><picture><img src="${item.image}" alt="Dealer Image"></picture></div>` : ''}
          ${item.description ? `<p class="dealer-description">${item.description}</p>` : ''}
          ${item.primaryCta ? `<a href="#" class="primary-cta">${item.primaryCta}</a>` : ''}
          ${item.secondaryCta ? `<button class="cta-button secondary">${item.secondaryCta}</button>` : ''}
        </div>
      </div>
    `).join('');
  }

  function renderInitialContent() {
    // Combine authoring and stubbed data
    const combinedItems = combineItems(dealership.items, stubbedData);

    // Filter items by tab
    const showroomVisitItems = combinedItems.filter(item => item.tab === 'showroom_visit');
    const testDriveItems = combinedItems.filter(item => item.tab === 'test_drive');
    const bookedItems = combinedItems.filter(item => item.tab === 'booked');

    // Calculate counts
    const showroomVisitCount = showroomVisitItems.length;
    const testDriveCount = testDriveItems.length;
    const bookedCount = bookedItems.length;

    block.innerHTML = utility.sanitizeHtml(`
      <section class="dealer-activities">
        <div class="dealership-activities-container">
          <div class="dealership-activities__content">
            <span class="dealership-activities__title">${dealership.title} (${combinedItems.length})</span>
            <p class="dealership-activities__subtitle">${dealership.subtitle}</p>
            
            <div class="dealership-activities__tabs">
              <p class="dealership-activities__tab active" data-tab="showroom_visit">${dealership.tabname1} (${showroomVisitCount})</p>
              <p class="dealership-activities__tab" data-tab="test_drive">${dealership.tabname2} (${testDriveCount})</p>
              <p class="dealership-activities__tab" data-tab="booked">${dealership.tabname3} (${bookedCount})</p>
            </div>
          </div>
          <div class="scrollable-wrapper">
            <div class="dealer-activities__items">
              <ul class="list-container">
                ${generateCardsHtml(showroomVisitItems)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    `);

    // Attach event listeners after rendering
    attachTabEventListeners();
  }

  function attachTabEventListeners() {
    const tabs = block.querySelectorAll('.dealership-activities__tab');
    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
  }

  function handleTabClick(event) {
    const tabs = block.querySelectorAll('.dealership-activities__tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    const selectedTab = event.target.dataset.tab;
    const combinedItems = combineItems(dealership.items, stubbedData);

    // Filter items based on selected tab
    const itemsForTab = combinedItems.filter(item => item.tab === selectedTab);
    const filteredCardsHtml = generateCardsHtml(itemsForTab);

    // Update the card container
    const listContainer = block.querySelector('.list-container');
    listContainer.innerHTML = filteredCardsHtml;

    // Reattach event listeners after updating the DOM
    attachTabEventListeners();
  }

  renderInitialContent();

  // Ensure instrumentation is moved
  const authoringItems = block.querySelectorAll('.authoring-item');
  authoringItems.forEach(item => moveInstrumentation(item, {
    allowedTypes: ['authoring-item']
  }));
}
