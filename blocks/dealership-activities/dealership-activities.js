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
      tab: "booked"
    },
  ];

  const dealership = getDealershipActivities();

  // Debug: Log the parsed dealership activities and stubbed data
  console.log('Dealership Activities:', dealership);
  console.log('Stubbed Data:', stubbedData);

  // Function to generate HTML for cards based on filtered items
  function generateCardsHtml(items) {
    return items.map((authoringItem, index) => {
      const stubbedItem = stubbedData[index];
      return `
        <div class="dealer-card" data-tab="${stubbedItem.tab}">
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
          <div class="stubbed-item">
            ${stubbedItem.image ? `<div class="dealer-image"><picture><img src="${stubbedItem.image}" alt="Dealer Image"></picture></div>` : ''}
            ${stubbedItem.description ? `<p class="dealer-description">${stubbedItem.description}</p>` : ''}
            ${stubbedItem.primaryCta ? `<a href="#" class="primary-cta">${stubbedItem.primaryCta}</a>` : ''}
            ${stubbedItem.secondaryCta ? `<button class="cta-button secondary">${stubbedItem.secondaryCta}</button>` : ''}
            ${stubbedItem.dealerName ? `<p class="dealership-name">${stubbedItem.dealerName}</p>` : ''}
            ${stubbedItem.emailId ? `<p class="dealership-emailid">${stubbedItem.emailId}</p>` : ''}
            ${stubbedItem.scheduledDate ? `<p class="dealership-date">${stubbedItem.scheduledDate}</p>` : ''}
            ${stubbedItem.scheduledTime ? `<p class="dealership-time">${stubbedItem.scheduledTime}</p>` : ''}
            ${stubbedItem.contact ? `<p class="dealership-contact">${stubbedItem.contact}</p>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // Initial render
  function renderInitialContent() {
    const totalCount = dealership.items.length;
    const showroomVisitCount = dealership.items.filter(item => item.tab === 'showroom_visit').length;
    const testDriveCount = dealership.items.filter(item => item.tab === 'test_drive').length;
    const bookedCount = dealership.items.filter(item => item.tab === 'booked').length;

    block.innerHTML = utility.sanitizeHtml(`
      <section class="dealer-activities">
        <div class="dealership-activities-container">
          <div class="dealership-activities__content">
            <span class="dealership-activities__title">${dealership.title} (${totalCount})</span>
            <p class="dealership-activities__subtitle">${dealership.subtitle}</p>
            <div class="dealership-activities__tabs">
              <p class="dealership-activities__tab active" id="showroom_visit">${dealership.tabname1} (${showroomVisitCount})</p>
              <p class="dealership-activities__tab" id="test_drive">${dealership.tabname2} (${testDriveCount})</p>
              <p class="dealership-activities__tab" id="booked">${dealership.tabname3} (${bookedCount})</p>
            </div>
          </div>
          <div class="dealer-activities__items">
            <ul class="list-container">
              ${generateCardsHtml(dealership.items)}
            </ul>
          </div>
        </div>
      </section>
    `);
  }

  // Call initial render
  renderInitialContent();

  // Add move instrumentation to authoring items only
  const authoringItems = block.querySelectorAll('.authoring-item');
  authoringItems.forEach(item => moveInstrumentation(item, {
    allowedTypes: ['authoring-item']
  }));

  function handleTabClick(event) {
    const selectedTab = event.target.getAttribute('data-tab');
    
    // Filter items based on the selected tab
    const filteredItems = stubbedData.filter(item => item.tab === selectedTab);
    
    // Generate HTML for filtered cards
    const cardsHtml = filteredItems.map(item => `
      <div class="dealer-card">
        <div class="dealer-image"><picture><img src="${item.image}" alt="Dealer Image"></picture></div>
        <p class="dealer-description">${item.description}</p>
        <a href="#" class="primary-cta">${item.primaryCta}</a>
        <button class="cta-button secondary">${item.secondaryCta}</button>
        <p class="dealership-name">${item.dealerName}</p>
        <p class="dealership-emailid">${item.emailId}</p>
        <p class="dealership-date">${item.scheduledDate}</p>
        <p class="dealership-time">${item.scheduledTime}</p>
        <p class="dealership-contact">${item.contact}</p>
      </div>
    `).join('');
  
    // Set HTML content for cards container
    document.querySelector('.cards').innerHTML = cardsHtml;
  
    // Update active tab
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
  }
<div class="dealership-activities__tabs">
  <button class="tab" data-tab="showroom_visit">Showroom Visit</button>
  <button class="tab" data-tab="test_drive">Test Drive</button>
  <button class="tab" data-tab="booked">Booked</button>
</div>
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', handleTabClick);
});
}  