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

    const items = Array.from(dealershipActivitiesItemEls).map((itemEl) => {
      const [dealerNameEl, emailIdEl, scheduledDateEl, scheduledTimeEl, contactEl] = itemEl.children;
      const dealerName = dealerNameEl?.textContent?.trim() || '';
      const emailId = emailIdEl?.textContent?.trim() || '';
      const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
      const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
      const contact = contactEl?.textContent?.trim() || '';

      return {
        dealerName,
        emailId,
        scheduledDate,
        scheduledTime,
        contact,
        tab: 'showroom_visit' // Adjust as needed
      };
    });

    return {
      title,
      subtitle,
      tabname1,
      tabname2,
      tabname3,
      items,
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
      tab: "showroom_visit"
    },
  ];

  const dealership = getDealershipActivities();

  // Generate HTML for authoring items and combine with stubbed items
  const combinedItemsHtml = dealership.items.map(authoringItem => {
    const stubbedItem = stubbedData.find(stub => 
      stub.dealerName === authoringItem.dealerName &&
      stub.scheduledDate === authoringItem.scheduledDate &&
      stub.scheduledTime === authoringItem.scheduledTime
    );

    console.log('Authoring Item:', authoringItem);
    console.log('Stubbed Item:', stubbedItem);

    return `
      <div class="dealer-card">
        ${stubbedItem ? `
          <div class="stubbed-item">
            ${stubbedItem.image ? `<div class="dealer-image"><picture><img src="${stubbedItem.image}" alt="Dealer Image"></picture></div>` : ''}
            ${stubbedItem.description ? `<p class="dealer-description">${stubbedItem.description}</p>` : ''}
            ${stubbedItem.primaryCta ? `<a href="#" class="primary-cta">${stubbedItem.primaryCta}</a>` : ''}
            ${stubbedItem.secondaryCta ? `<button class="cta-button secondary">${stubbedItem.secondaryCta}</button>` : ''}
          </div>` : ''}
        <div class="authoring-item">
          <div class="dealer-name-schedule">
            <p class="dealer-name">${authoringItem.dealerName}</p>
            <p class="dealer-date">${authoringItem.scheduledDate}</p>
            <p class="dealer-time">${authoringItem.scheduledTime}</p>
          </div>
          <div class="dealer-email-contact">
            <p class="dealer-email">${authoringItem.emailId}</p>
            <p class="dealer-contact">${authoringItem.contact}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Count the actual number of cards being displayed
  const actualCardCount = dealership.items.length;

  block.innerHTML = utility.sanitizeHtml(`
    <section class="dealer-activities">
      <div class="dealership-activities-container">
        <div class="dealership-activities__content">
          <span class="dealership-activities__title">${dealership.title} (${actualCardCount})</span>
          <p class="dealership-activities__subtitle">${dealership.subtitle}</p>
          <div class="dealership-activities__tabs">
            <p class="dealership-activities__tab active" id="showroom_visit">${dealership.tabname1} (${dealership.items.filter(item => item.tab === 'showroom_visit').length})</p>
            <p class="dealership-activities__tab" id="test_drive">${dealership.tabname2} (${dealership.items.filter(item => item.tab === 'test_drive').length})</p>
            <p class="dealership-activities__tab" id="booked">${dealership.tabname3} (${dealership.items.filter(item => item.tab === 'booked').length})</p>
          </div>
        </div>
        <div class="dealer-activities__items">
          <ul class="list-container">
            ${combinedItemsHtml}
          </ul>
        </div>
      </div>
    </section>
  `);

  function handleTabClick(event) {
    const tabs = block.querySelectorAll('.dealership-activities__tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    const selectedTab = event.target.id;
    const filteredItemsHtml = dealership.items.filter(item => item.tab === selectedTab).map(authoringItem => {
      const stubbedItem = stubbedData.find(stub => 
        stub.dealerName === authoringItem.dealerName &&
        stub.scheduledDate === authoringItem.scheduledDate &&
        stub.scheduledTime === authoringItem.scheduledTime
      );

      console.log('Filtered Authoring Item:', authoringItem);
      console.log('Filtered Stubbed Item:', stubbedItem);

      return `
        <div class="dealer-card">
          ${stubbedItem ? `
            <div class="stubbed-item">
              ${stubbedItem.image ? `<div class="dealer-image"><picture><img src="${stubbedItem.image}" alt="Dealer Image"></picture></div>` : ''}
              ${stubbedItem.description ? `<p class="dealer-description">${stubbedItem.description}</p>` : ''}
              ${stubbedItem.primaryCta ? `<a href="#" class="primary-cta">${stubbedItem.primaryCta}</a>` : ''}
              ${stubbedItem.secondaryCta ? `<button class="cta-button secondary">${stubbedItem.secondaryCta}</button>` : ''}
            </div>` : ''}
          <div class="authoring-item">
            <div class="dealer-name-schedule">
              <p class="dealer-name">${authoringItem.dealerName}</p>
              <p class="dealer-date">${authoringItem.scheduledDate}</p>
              <p class="dealer-time">${authoringItem.scheduledTime}</p>
            </div>
            <div class="dealer-email-contact">
              <p class="dealer-email">${authoringItem.emailId}</p>
              <p class="dealer-contact">${authoringItem.contact}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    block.querySelector('.list-container').innerHTML = filteredItemsHtml;
  }

  const tabs = block.querySelectorAll('.dealership-activities__tab');
  tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
}
