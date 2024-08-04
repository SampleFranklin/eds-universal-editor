// import { moveInstrumentation } from '../../scripts/scripts.js';
// import utility from '../../utility/utility.js';

// export default function decorate(block) {
//   function getDealershipActivities() {
//     const [titleEl, subtitleEl, tabname1El, tabname2El, tabname3El, ...dealershipActivitiesItemEls] = block.children;

//     const title = titleEl?.textContent?.trim() || '';
//     const subtitle = subtitleEl?.textContent?.trim() || '';
//     const tabname1 = tabname1El?.textContent?.trim() || '';
//     const tabname2 = tabname2El?.textContent?.trim() || '';
//     const tabname3 = tabname3El?.textContent?.trim() || '';

//     const tabMap = {
//       'showroom_visit': tabname1,
//       'test_drive': tabname2,
//       'booked': tabname3
//     };

//     const items = Array.from(dealershipActivitiesItemEls).map((itemEl) => {
//       const [dealerNameEl, emailIdEl, scheduledDateEl, scheduledTimeEl, contactEl] = itemEl.children;
//       const dealerName = dealerNameEl?.textContent?.trim() || '';
//       const emailId = emailIdEl?.textContent?.trim() || '';
//       const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
//       const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
//       const contact = contactEl?.textContent?.trim() || '';

//       // Determine tab for each item based on a data attribute or content
//       const tab = itemEl.dataset.tab || 'showroom_visit'; // Example: Use data attribute

//       return {
//         dealerName,
//         emailId,
//         scheduledDate,
//         scheduledTime,
//         contact,
//         tab
//       };
//     });

//     return {
//       title,
//       subtitle,
//       tabname1,
//       tabname2,
//       tabname3,
//       items,
//       tabMap
//     };
//   }

//   const stubbedData = [
//     {
//       dealerName: "Mayuri Automobile Co. Ltd.",
//       image: "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
//       description: "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
//       scheduledTime: "14:30PM",
//       scheduledDate: "13th Jun, 2024",
//       contact: "9931242213",
//       emailId: "mandi@competent-maruti.com",
//       primaryCta: "Schedule a video call",
//       secondaryCta: "Directions",
//       tab: "showroom_visit"
//     },
//     {
//       dealerName: "Mayuri Automobile Co. Ltd.",
//       image: "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
//       description: "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
//       scheduledTime: "14:30PM",
//       scheduledDate: "13th Jun, 2024",
//       contact: "9931242213",
//       emailId: "mandi@competent-maruti.com",
//       primaryCta: "Schedule a video call",
//       secondaryCta: "Directions",
//       tab: "showroom_visit"
//     },
//     {
//       dealerName: "Mayuri Automobile Co. Ltd.",
//       image: "/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png",
//       description: "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
//       scheduledTime: "14:30PM",
//       scheduledDate: "14th Jun, 2024",
//       contact: "9931242213",
//       emailId: "mandi@competent-maruti.com",
//       primaryCta: "Schedule a video call",
//       secondaryCta: "reschedule",
//       tab: "booked"
//     },
//   ];

//   const dealership = getDealershipActivities();

//   // Debug: Log the parsed dealership activities and stubbed data
//   console.log('Dealership Activities:', dealership);
//   console.log('Stubbed Data:', stubbedData);

//   function generateCardsHtml(items) {
//     return items.map((item) => {
//       const stubbedItem = stubbedData.find(stub => stub.tab === item.tab);
//       if (!stubbedItem) return ''; // Skip if no corresponding stubbed data

//       return `
//         <div class="dealer-card" data-tab="${item.tab}">
//           <div class="authoring-item">
//             <div class="dealer-name-schedule">
//               <p class="dealer-name">${item.dealerName}</p>
//               <p class="dealer-date">${item.scheduledDate}</p>
//               <p class="dealer-time">${item.scheduledTime}</p>
//             </div>
//             <div class="dealer-email-contact">
//               <p class="dealer-email">${item.emailId}</p>
//               <p class="dealer-contact">${item.contact}</p>
//             </div>
//           </div>
//           <div class="stubbed-item">
//             ${stubbedItem.image ? `<div class="dealer-image"><picture><img src="${stubbedItem.image}" alt="Dealer Image"></picture></div>` : ''}
//             ${stubbedItem.description ? `<p class="dealer-description">${stubbedItem.description}</p>` : ''}
//             ${stubbedItem.primaryCta ? `<a href="#" class="primary-cta">${stubbedItem.primaryCta}</a>` : ''}
//             ${stubbedItem.secondaryCta ? `<button class="cta-button secondary">${stubbedItem.secondaryCta}</button>` : ''}
//             ${stubbedItem.dealerName ? `<p class="dealership-name">${stubbedItem.dealerName}</p>` : ''}
//             ${stubbedItem.emailId ? `<p class="dealership-emailid">${stubbedItem.emailId}</p>` : ''}
//             ${stubbedItem.scheduledDate ? `<p class="dealership-date">${stubbedItem.scheduledDate}</p>` : ''}
//             ${stubbedItem.scheduledTime ? `<p class="dealership-time">${stubbedItem.scheduledTime}</p>` : ''}
//             ${stubbedItem.contact ? `<p class="dealership-contact">${stubbedItem.contact}</p>` : ''}
//           </div>
//         </div>
//       `;
//     }).join('');
//   }

//   function renderInitialContent() {
//     const totalCount = dealership.items.length;
//     const showroomVisitCount = dealership.items.filter(item => item.tab === 'showroom_visit').length;
//     const testDriveCount = dealership.items.filter(item => item.tab === 'test_drive').length;
//     const bookedCount = dealership.items.filter(item => item.tab === 'booked').length;

//     block.innerHTML = utility.sanitizeHtml(`
//       <section class="dealer-activities">

//         <div class="dealership-activities-container">
//           <div class="dealership-activities__content">
//             <span class="dealership-activities__title">${dealership.title} (${totalCount})</span>
//             <p class="dealership-activities__subtitle">${dealership.subtitle}</p>
            
//             <div class="dealership-activities__tabs">
//               <p class="dealership-activities__tab active" id="showroom_visit">${dealership.tabname1} (${showroomVisitCount})</p>
//               <p class="dealership-activities__tab" id="test_drive">${dealership.tabname2} (${testDriveCount})</p>
//               <p class="dealership-activities__tab" id="booked">${dealership.tabname3} (${bookedCount})</p>
//             </div>
//           </div>
//           <div class="scrollable-wrapper">
//           <div class="dealer-activities__items">
//             <ul class="list-container">
//               ${generateCardsHtml(dealership.items)}
//             </ul>
//             </div>
//           </div>
//         </div>
//       </section>
//     `);
//   }

//   renderInitialContent();

//   const authoringItems = block.querySelectorAll('.authoring-item');
//   authoringItems.forEach(item => moveInstrumentation(item, {
//     allowedTypes: ['authoring-item']
//   }));

//   function handleTabClick(event) {
//     const tabs = block.querySelectorAll('.dealership-activities__tab');
//     tabs.forEach(tab => tab.classList.remove('active'));
//     event.target.classList.add('active');

//     const selectedTab = event.target.id;
//     const filteredItems = dealership.items.filter(item => item.tab === selectedTab);
//     const filteredCardsHtml = generateCardsHtml(filteredItems);

//     const totalTabCount = {
//       'showroom_visit': dealership.items.filter(item => item.tab === 'showroom_visit').length,
//       'test_drive': dealership.items.filter(item => item.tab === 'test_drive').length,
//       'booked': dealership.items.filter(item => item.tab === 'booked').length,
//     };

//     // Update the count for each tab
//     tabs.forEach(tab => {
//       const tabId = tab.id;
//       tab.innerHTML = `${dealership.tabMap[tabId]} (${totalTabCount[tabId]})`;
//     });

//     block.querySelector('.list-container').innerHTML = filteredCardsHtml;
//   }

//   const tabs = block.querySelectorAll('.dealership-activities__tab');
//   tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
// }
