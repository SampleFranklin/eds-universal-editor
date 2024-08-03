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
        html: `<div class="dealer-card">
          <p>${dealerName}</p>
          <p>${emailId}</p>
          <p>${scheduledDate}</p>
          <p>${scheduledTime}</p>
          <p>${contact}</p>
        </div>`,
        tab: 'showroom_visit' // Adjust as needed based on your logic
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
      email: "mandi@competent-maruti.com",
      tab: "showroom_visit" // Specify tab for stubbed data
    },
    {
      dealerName: "Mayuri Automobile Co. Ltd.",
      image: "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
      description: "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
      scheduledTime: "14:30PM",
      scheduledDate: "13th Jun, 2024",
      contact: "9931242213",
      email: "mandi@competent-maruti.com",
      tab: "showroom_visit" // Specify tab for stubbed data
    },
  ];

  const dealership = getDealershipActivities();
  const totalItems = dealership.items.length + stubbedData.length;

  // Combine dealership items with stubbed data
  const allItems = [
    ...dealership.items,
    ...stubbedData.map(data => ({
      html: `<div class="dealer-card">
        <img src="${data.image}" alt="Dealer Image">
        <p>${data.dealerName}</p>
        <p>${data.email}</p>
        <p>${data.scheduledDate}</p>
        <p>${data.scheduledTime}</p>
        <p>${data.contact}</p>
        <p>${data.description}</p>
      </div>`,
      tab: data.tab,
    }))
  ];

  // Group items by tab
  const itemsByTab = {
    showroom_visit: allItems.filter(item => item.tab === 'showroom_visit'),
    test_drive: allItems.filter(item => item.tab === 'test_drive')
  };

  block.innerHTML = utility.sanitizeHtml(`
    <section class="dealer-activities">
      <div class="dealership-activities-container">
        <div class="dealership-activities__content">
          <span class="dealership-activities__title">${dealership.title} (${totalItems})</span>
          <p class="dealership-activities__subtitle">${dealership.subtitle}</p>
          <div class="dealership-activities__tabs">
            <p class="dealership-activities__tab active" id="showroom_visit">${dealership.tabname1} (${itemsByTab.showroom_visit.length})</p>
            <p class="dealership-activities__tab" id="test_drive">${dealership.tabname2} (${itemsByTab.test_drive.length})</p>
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
