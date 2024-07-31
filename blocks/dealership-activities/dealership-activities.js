// import { moveInstrumentation } from '../../scripts/scripts.js';
// import utility from '../../utility/utility.js';

// export default async function decorate(block) {
//   // Stubbed response to simulate dynamic items
//   const stubbedItemsResponse = [
//     {
//       index: 0,
//       image: '<picture><img src="image1.jpg" alt="Image 1"></picture>',
//       dealerName: 'Dealer One',
//       emailId: 'dealerone@example.com',
//       scheduledDate: '2024-07-30',
//       scheduledTime: '10:00 AM',
//       contact: '123-456-7890',
//       description: 'Description for event 1.',
//       primaryText: 'Register',
//       primaryHref: '#',
//       primaryTarget: '_self',
//       secondaryText: 'More Info',
//       secondaryHref: '#',
//       secondaryTarget: '_self',
//     },
//     {
//       index: 1,
//       image: '<picture><img src="image2.jpg" alt="Image 2"></picture>',
//       dealerName: 'Dealer Two',
//       emailId: 'dealertwo@example.com',
//       scheduledDate: '2024-08-01',
//       scheduledTime: '2:00 PM',
//       contact: '234-567-8901',
//       description: 'Description for event 2.',
//       primaryText: 'Register',
//       primaryHref: '#',
//       primaryTarget: '_self',
//       secondaryText: 'More Info',
//       secondaryHref: '#',
//       secondaryTarget: '_self',
//     },
//     {
//       index: 2,
//       image: '<picture><img src="image3.jpg" alt="Image 3"></picture>',
//       dealerName: 'Dealer Three',
//       emailId: 'dealerthree@example.com',
//       scheduledDate: '2024-08-05',
//       scheduledTime: '9:00 AM',
//       contact: '345-678-9012',
//       description: 'Description for event 3.',
//       primaryText: 'Register',
//       primaryHref: '#',
//       primaryTarget: '_self',
//       secondaryText: 'More Info',
//       secondaryHref: '#',
//       secondaryTarget: '_self',
//     },
//   ];

//   // Function to extract elements and generate HTML
//   const generateHtml = () => {
//     // Extract elements from the block
//     const [titleEl, subtitleEl, dealershipActivitiesTab] = block.children;

//     // Extract title and subtitle
//     const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
//     const subtitle = subtitleEl?.textContent?.trim() || '';

//     // Extract the dealership activities tab names
//     const extractDealershipActivitiesTab = (tabEl) => {
//       return Array.from(tabEl.children).map((tab, index) => ({
//         tabName: tab.textContent.trim() || `Tab ${index + 1}`,
//         id: `tab${index + 1}`  // Unique ID for each tab
//       }));
//     };

//     // Function to extract individual dealership activity items from stubbed response
//     const extractDealershipActivityItems = (items) => {
//       return items.map((item) => {
//         return {
//           index: item.index,
//           content: `
//             <div class="dealership-activities__item" id="item${item.index}">
//               <div class="dealership-activities__item-left">
//                 ${item.image}
//                 <p class="description">${item.description}</p>
//               </div>
//               <div class="dealership-activities__item-right">
//                 <p class="dealer-name">
//                   <strong>DEALER NAME:</strong><br>
//                   <span contenteditable="true">${item.dealerName}</span>
//                 </p>
//                 <p class="scheduled-date">
//                   <strong>SCHEDULED DATE:</strong><br>
//                   <span contenteditable="true">${item.scheduledDate}</span>
//                 </p>
//                 <p class="scheduled-time">
//                   <strong>SCHEDULED TIME:</strong><br>
//                   <span contenteditable="true">${item.scheduledTime}</span>
//                 </p>
//                 <p class="email-id">
//                   <strong>EMAIL ID:</strong><br>
//                   <span contenteditable="true">${item.emailId}</span>
//                 </p>
//                 <p class="contact">
//                   <strong>CONTACT:</strong><br>
//                   <span contenteditable="true">${item.contact}</span>
//                 </p>
//                 <div class="actions">
//                   <a href="${item.primaryHref}" target="${item.primaryTarget}" class="primary-text">${item.primaryText}</a>
//                   <a href="${item.secondaryHref}" target="${item.secondaryTarget}" class="button secondary-text">${item.secondaryText}</a>
//                 </div>
//               </div>
//             </div>
//           `,
//         };
//       });
//     };

//     // Generate tabs and items HTML
//     const tabs = extractDealershipActivitiesTab(dealershipActivitiesTab);
//     const items = extractDealershipActivityItems(stubbedItemsResponse);

//     // Filter items to show only those for "Showroom Visit"
//     const showroomVisitItems = items.slice(0, 2); // Adjust based on actual filtering criteria

//     // Debugging: Log extracted tabs and items
//     console.log('Tabs:', tabs);
//     console.log('Items:', showroomVisitItems);

//     const tabsHtml = tabs
//       .map(
//         (tab, index) => `
//         <div class="tablink ${index === 0 ? 'active default' : ''}" data-tab="${tab.id}">
//           ${tab.tabName}
//           <hr class="tab-scroll-line">
//         </div>
//       `
//       )
//       .join('');

//     const itemsHtml = showroomVisitItems.map((item) => item.content).join('');

//     // Set block's inner HTML
//     block.innerHTML = utility.sanitizeHtml(`
//       <div class="dealership-activities__container">
//         <div class="dealership-activities__content">
//           <div class="dealership-activities__title">
//             ${title}
//             <p class="subtitle">${subtitle}</p>
//           </div>
//           <div class="dealership-activities-tab">
//             <div class="tabs">
//               ${tabsHtml}
//             </div>
//           </div>
//           <div class="dealership-activities__items" id="all-items">
//             ${itemsHtml}
//           </div>
//         </div>
//       </div>
//     `);
//   };

//   // Function to handle tab switching and highlight
//   const openTab = (evt, tabId) => {
//     const tabContent = document.querySelectorAll('.dealership-activities__item');
//     const tabLinks = document.querySelectorAll('.tablink');

//     tabContent.forEach((content) => {
//       content.style.display = 'none';
//       content.classList.remove('active');
//     });

//     tabLinks.forEach((link) => {
//       link.classList.remove('active');
//     });

//     const activeTab = document.getElementById(tabId);
//     if (activeTab) {
//       activeTab.style.display = 'flex';
//       activeTab.classList.add('active');
//       moveInstrumentation(activeTab);
//     }

//     evt.currentTarget.classList.add('active');
//     moveInstrumentation(evt.currentTarget);
//   };

//   // Function to attach event listeners to tabs
//   const attachTabListeners = () => {
//     document.querySelectorAll('.tablink').forEach((tabLink) => {
//       tabLink.addEventListener('click', (event) => {
//         const tabId = tabLink.getAttribute('data-tab');
//         openTab(event, tabId);
//       });

//       tabLink.addEventListener('mouseover', () => {
//         document.querySelector('.tablink.active')?.classList.remove('active');
//       });
//     });
//   };

//   // Initial rendering and attaching listeners
//   generateHtml();
//   attachTabListeners();

//   // Initial tab display setup
//   const firstItem = document.querySelector('.dealership-activities__item');
//   if (firstItem) {
//     firstItem.style.display = 'flex';
//     firstItem.classList.add('active');
//     moveInstrumentation(firstItem);
//   }
// }
