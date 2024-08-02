import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default function decorate(block) {
  function getDealershipActivities() {
  const [titleEl, subtitleEl, tabsEl, ...dealershipActivitiesItemEls] = block.children;

  const title = titleEl?.textContent?.trim() || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';
  const tabs = Array.from(tabsEl).map((tabEl) => {
    const [tabnameEl] = tabEl.children;
    const tabname = tabnameEl?.textContent?.trim() || '';
    const li = document.createElement('li');
    li.innerHTML = `<p class="tabs">${tabname}</p>`;
    moveInstrumentation(tabEl, li);
    return li.outerHTML;
  });
  const items = Array.from(dealershipActivitiesItemEls).map((itemEl) => {
    const [dealerNameEl, emailIdEl,scheduledDateEl,scheduledTimeEl,contactEl] = itemEl.children;
    const dealerName = dealerNameEl?.textContent?.trim() || '';
    const emailId = emailIdEl?.textContent?.trim() || '';
    const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
    const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
    const contact = contactEl?.textContent?.trim() || '';
    
    const li = document.createElement('li');
    li.innerHTML = `<p class=" dealer-items">${dealerName}
   ${emailId}
   ${scheduledDate}
   ${scheduledTime}
   ${contact}
    </p>`;
    moveInstrumentation(itemEl, li);
    return li.outerHTML;
  });
  return {
    title, 
    subtitle, 
    tabs, 
    items
  }
  
 
  }
  const dealership = getDealershipActivities();
  block.innerHTML = utility.sanitizeHtml(`
    <div class="dealership-activities__container>
    <div class="dealership-activities__content>
    <p class="title">${dealership.title}</p>
    <p class="sub-title">${dealership.subtitle}</p>
    <div class="dealership-activities__tabs">
                <div class="scroll-bar"></div>
                <ul class="list-container">
                  ${dealership.tabs.join('')}
                </ul>
              </div>
            </div>
<div class ="dealer-activities__items">
 <ul class="list-container">
                  ${dealership.items.join('')}
                </ul>
                </div>
    
  </div>
`);
}

//   function createDealerCard(data) {
//       return `
//           <div class="card" data-category="${data.category}">
//               <div class="image">
//                   ${data.image ? `<img src="${data.image}" alt="carImage" class="car-image"/>` : ''}
//               </div>
//               <div class="items">
//                   <div class="description">${data.description || ''}</div>
//                   <div class="dname">${data.dealername}</div>
//                   <div class="dealeremailId">${data.emailid}</div>
//                   <div class="dealerscheduleddate">${data.scheduleddate}</div>
//                   <div class="dealerscheduledtime">${data.scheduledtime}</div>
//                   <div class="dealercontact">${data.contact}</div>
//                   ${data.primarycta ? `<div class="primary-cta"><a href="#">${data.primarycta}</a></div>` : ''}
//                   ${data.secondarycta ? `<div class="secondary-cta"><button>${data.secondarycta}</button></div>` : ''}
//               </div>
//           </div>
//       `;
//   }

//   const mockData = [
//       {
//           dealername: 'Mayuri Automobile Co. Ltd.',
//           image: '/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png',
//           description: 'Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R',
//           scheduledtime: '14:30PM',
//           scheduleddate: '13th Jun, 2024',
//           contact: '9931242213',
//           emailid: 'mandi@competent-maruti.com',
//           primarycta: 'Schedule a video call',
//           secondarycta: 'Directions',
//           category: 'Showroom Visit',
//       },
//       {
//           dealername: 'Mayuri Automobile Co. Ltd.',
//           image: '/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png',
//           description: 'Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R',
//           scheduledtime: '14:30PM',
//           scheduleddate: '13th Jun, 2024',
//           contact: '9931242213',
//           emailid: 'mandi@competent-maruti.com',
//           primarycta: 'Schedule a video call',
//           secondarycta: 'Directions',
//           category: 'Test Drive',
//       },
//       {
//           dealername: 'Mayuri Automobile Co. Ltd.',
//           image: '/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png',
//           description: 'Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R',
//           scheduledtime: '14:30PM',
//           scheduleddate: '13th Jun, 2024',
//           contact: '9931242213',
//           emailid: 'mandi@competent-maruti.com',
//           primarycta: 'Schedule a video call',
//           secondarycta: 'Directions',
//           category: 'Showroom Visit',
//       },
//   ];

//   // Generate HTML for cards
//   const cardsHTML = mockData.map(data => createDealerCard(data)).join("");

//   // Calculate counts
//   const totalCount = mockData.length;
//   const countsByCategory = mockData.reduce((counts, item) => {
//       counts[item.category] = (counts[item.category] || 0) + 1;
//       return counts;
//   }, {});

//   block.innerHTML = `
//       <div class="main-container">
//           <div class="title-section">
//               <div class="titleNew">${title} (${totalCount})</div>
//               <div class="subtitleNew">${subtitle}</div>
//           </div>
//           <div class="rowNew">
//               <div class="col-sm-3">
//                   <div class="tabs">
//                       ${tabs.map(tabName => {
//                           const count = countsByCategory[tabName] || 0;
//                           return `<div class="tab" data-category="${tabName}">${tabName} (${count})</div>`;
//                       }).join('')}
//                   </div>
//               </div>
//               <div class="col-sm-9">
//                   <div class="cards-section">
//                       ${cardsHTML}
//                   </div>
//               </div>
//           </div>
//       </div>
//   `;

//   document.addEventListener('DOMContentLoaded', () => {
//       const tabs = block.querySelectorAll('.tab');
//       const cards = block.querySelectorAll('.card');
      
//       tabs.forEach(tab => {
//           tab.addEventListener('click', () => {
//               const category = tab.dataset.category;
//               cards.forEach(card => {
//                   card.style.display = card.dataset.category === category ? 'block' : 'none';
//               });
//               tabs.forEach(t => t.classList.remove('active')); // Remove active class from all tabs
//               tab.classList.add('active'); // Add active class to the clicked tab
//           });
//       });

//       // Activate the first tab and its cards by default
//       if (tabs.length > 0) {
//           tabs[0].click();
//       }
//   });

