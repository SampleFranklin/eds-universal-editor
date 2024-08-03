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
    // Add more stubbed data as needed
  ];

  const dealership = getDealershipActivities();

  // Merge authoring items with stubbed data
  const combinedItems = dealership.items.map(item => {
    const stubbed = stubbedData.find(stub =>
      stub.dealerName === item.dealerName &&
      stub.scheduledDate === item.scheduledDate &&
      stub.scheduledTime === item.scheduledTime &&
      stub.emailId === item.emailId &&
      stub.contact === item.contact

    );
    return {
      ...item,
      image: stubbed?.image || '',
      description: stubbed?.description || '',
      primaryCta: stubbed?.primaryCta || '',
      secondaryCta: stubbed?.secondaryCta || '',
      dealerName:stubbed?.dealerName || '',
      emailId:stubbed?.emailId || '',
      scheduledDate:stubbed?.scheduledDate || '',
      scheduleTime:stubbed?.scheduledTime || '',
      contact:stubbed?.contact || '',
      tab: item.tab,
    };
  });

  console.log("Combined Items:", combinedItems); // Log combined items for debugging

  // Generate HTML for combined items
  const itemsHtml = combinedItems.map(data => `
    <div class="dealer-card">
      ${data.image ? `<div class="dealer-image"><picture><img src="${data.image}" alt="Dealer Image"></picture></div>` : ''}
      ${data.description ? `<p class="dealer-description">${data.description}</p>` : ''}
      <div class="dealer-name-schedule">
        <p class="dealer-name">${data.dealerName}</p>
        <p class="dealer-date">${data.scheduledDate}</p>
        <p class="dealer-time">${data.scheduledTime}</p>
      </div>
      <div class="dealer-email-contact">
        <p class="dealer-email">${data.emailId}</p>
        <p class="dealer-contact">${data.contact}</p>
      </div>
      ${data.primaryCta ? `<a href="#" class="primary-cta">${data.primaryCta}</a>` : ''}
      ${data.secondaryCta ? `<button class="cta-button secondary">${data.secondaryCta}</button>` : ''}
    </div>
  `).join('');

  block.innerHTML = utility.sanitizeHtml(`
    <section class="dealer-activities">
      <div class="dealership-activities-container">
        <div class="dealership-activities__content">
          <span class="dealership-activities__title">${dealership.title} (${combinedItems.length})</span>
          <p class="dealership-activities__subtitle">${dealership.subtitle}</p>
          <div class="dealership-activities__tabs">
            <p class="dealership-activities__tab active" id="showroom_visit">${dealership.tabname1} (${combinedItems.filter(item => item.tab === 'showroom_visit').length})</p>
            <p class="dealership-activities__tab" id="test_drive">${dealership.tabname2} (${combinedItems.filter(item => item.tab === 'test_drive').length})</p>
            <p class="dealership-activities__tab" id="booked">${dealership.tabname3} (${combinedItems.filter(item => item.tab === 'booked').length})</p>
          </div>
        </div>
        <div class="dealer-activities__items">
          <ul class="list-container">
            ${itemsHtml}
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
    const filteredItemsHtml = combinedItems.filter(item => item.tab === selectedTab).map(data => `
      <div class="dealer-card">
        ${data.image ? `<div class="dealer-image"><picture><img src="${data.image}" alt="Dealer Image"></picture></div>` : ''}
        ${data.description ? `<p class="dealer-description">${data.description}</p>` : ''}
        <div class="dealer-name-schedule">
          <p class="dealer-name">${data.dealerName}</p>
          <p class="dealer-date">${data.scheduledDate}</p>
          <p class="dealer-time">${data.scheduledTime}</p>
        </div>
        <div class="dealer-email-contact">
          <p class="dealer-email">${data.emailId}</p>
          <p class="dealer-contact">${data.contact}</p>
        </div>
        ${data.primaryCta ? `<a href="#" class="primary-cta">${data.primaryCta}</a>` : ''}
        ${data.secondaryCta ? `<button class="cta-button secondary">${data.secondaryCta}</button>` : ''}
      </div>
    `).join('');

    block.querySelector('.list-container').innerHTML = filteredItemsHtml;
  }

  const tabs = block.querySelectorAll('.dealership-activities__tab');
  tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
}
