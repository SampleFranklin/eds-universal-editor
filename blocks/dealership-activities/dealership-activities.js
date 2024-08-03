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
      const [dealerNameEl, emailIdEl, scheduledDateEl, scheduledTimeEl, contactEl, primaryCtaEl, secondaryCtaEl, descriptionEl] = itemEl.children;
      const dealerName = dealerNameEl?.textContent?.trim() || '';
      const emailId = emailIdEl?.textContent?.trim() || '';
      const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
      const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
      const contact = contactEl?.textContent?.trim() || '';
      const primaryCta = primaryCtaEl?.textContent?.trim() || '';
      const secondaryCta = secondaryCtaEl?.textContent?.trim() || '';
      const description = descriptionEl?.textContent?.trim() || '';

      return {
        dealerName,
        emailId,
        scheduledDate,
        scheduledTime,
        contact,
        primaryCta,
        secondaryCta,
        description,
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
      primarycta: "Schedule a video call",
      secondarycta: "Directions",
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
      primarycta: "Schedule a video call",
      secondarycta: "Directions",
      tab: "showroom_visit"
    },
  ];

  const dealership = getDealershipActivities();
  const combinedItems = [...dealership.items, ...stubbedData];

  const allItems = combinedItems.map(data => ({
    html: `<div class="dealer-card">
      <div class="dealer-image">
        <picture>
          <img src="${data.image}" alt="Dealer Image">
        </picture>
      </div>
      <p class="dealer-description">${data.description}</p>
      <div class="dealer-name-schedule">
        <p class="dealer-name">${data.dealerName}</p><br>
        <p class="dealer-date">${data.scheduledDate}</p>
        <p class="dealer-time">${data.scheduledTime}</p>
      </div>
      <div class="dealer-email-contact">
        <p class="dealer-email">${data.emailId}</p><br>
        <p class="dealer-contact">${data.contact}</p>
      </div>
      <a href="#" class="primary-cta">${data.primaryCta}</a>
      <button class="cta-button secondary">${data.secondaryCta}</button>
    </div>`,
    tab: data.tab,
  }));

  const itemsByTab = {
    showroom_visit: allItems.filter(item => item.tab === 'showroom_visit'),
    test_drive: allItems.filter(item => item.tab === 'test_drive'),
    booked: allItems.filter(item => item.tab === 'booked')
  };

  block.innerHTML = utility.sanitizeHtml(`
    <section class="dealer-activities">
      <div class="dealership-activities-container">
        <div class="dealership-activities__content">
          <span class="dealership-activities__title">${dealership.title} (${combinedItems.length})</span>
          <p class="dealership-activities__subtitle">${dealership.subtitle}</p>
          <div class="dealership-activities__tabs">
            <p class="dealership-activities__tab active" id="showroom_visit">${dealership.tabname1} (${itemsByTab.showroom_visit.length})</p>
            <p class="dealership-activities__tab" id="test_drive">${dealership.tabname2} (${itemsByTab.test_drive.length})</p>
            <p class="dealership-activities__tab" id="booked">${dealership.tabname3} (${itemsByTab.booked.length})</p>
          </div>
        </div>
        <div class="dealer-activities__items">
          <ul class="list-container">
            ${itemsByTab.showroom_visit.map(item => item.html).join('')}
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
    const filteredItems = itemsByTab[selectedTab];
    
    block.querySelector('.list-container').innerHTML = filteredItems.map(item => item.html).join('');
  }

  const tabs = block.querySelectorAll('.dealership-activities__tab');
  tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
}
