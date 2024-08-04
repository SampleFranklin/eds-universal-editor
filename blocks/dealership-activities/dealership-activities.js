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
        tab: 'showroom_visit' // Default tab, can be adjusted as needed
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
      tab: "test_drive" // Correct tab
    },
  ];

  const dealership = getDealershipActivities();

  function generateCardsHtml(items) {
    return items.map((item) => {
      const stubbedItem = stubbedData.find(stub => stub.emailId === item.emailId && stub.scheduledDate === item.scheduledDate);
      if (!stubbedItem) return '';

      return `
        <div class="dealer-card" data-tab="${stubbedItem.tab}">
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

  function renderInitialContent() {
    const totalCount = dealership.items.length;
    const showroomVisitCount = dealership.items.filter(item => item.tab === 'showroom_visit').length;
    const testDriveCount = dealership.items.filter(item => item.tab === 'test_drive').length;
    const bookedCount = dealership.items.filter(item => item.tab === 'booked').length;

    const cardsHtml = generateCardsHtml(dealership.items);

    block.innerHTML = `
      <div class="dealership-activities">
        <h2>${dealership.title}</h2>
        <p>${dealership.subtitle}</p>
        <div class="tabs">
          <button class="tab active" data-tab="showroom_visit">${dealership.tabname1} (${showroomVisitCount})</button>
          <button class="tab" data-tab="test_drive">${dealership.tabname2} (${testDriveCount})</button>
          <button class="tab" data-tab="booked">${dealership.tabname3} (${bookedCount})</button>
        </div>
        <div class="cards">${cardsHtml}</div>
      </div>
    `;

    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });
  }

  function handleTabClick(event) {
    const tabName = event.target.getAttribute('data-tab');
    const filteredItems = dealership.items.filter(item => item.tab === tabName);
    const cardsHtml = generateCardsHtml(filteredItems);

    document.querySelector('.cards').innerHTML = cardsHtml;

    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
  }

  renderInitialContent();
}
