// export default async function decorate(block) {
//       const [
//         titleEl,
//         subtitleEl,
//         ] = block.children;
  
//       const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
//       const subtitle = subtitleEl?.textContent?.trim() || '';
//       return {
//         title,
//         subtitle,
//     }

// import { fetchPlaceholders } from '../../scripts/aem.js';

// export default async function decorate(block) {
//   const { publishDomain } = await fetchPlaceholders();

//   function getTabHtml(id, title) {
//     return `
//       <button class="tablink" onclick="openTab(event, '${id}')">${title}</button>
//     `;
//   }

//   function getDealershipActivityHtml(activity) {
//     const {
//       image,
//       dealerName,
//       contact,
//       emailId,
//       scheduledDate,
//       scheduledTime,
//       primaryCta,
//       secondaryCta
//     } = activity;

//     return `
//       <div class="dealership-activities__item">
//         <img src="${image}" alt="${dealerName}">
//         <div>
//           <p><strong>Dealer Name:</strong> ${dealerName}</p>
//           <p><strong>Contact:</strong> ${contact}</p>
//           <p><strong>Email ID:</strong> ${emailId}</p>
//           <p><strong>Scheduled Date:</strong> ${scheduledDate}</p>
//           <p><strong>Scheduled Time:</strong> ${scheduledTime}</p>
//         </div>
//         <div class="actions">
//           <button type="button" class="primary-cta">${primaryCta}</button>
//           <a href="${secondaryCta.link}" class="secondary-cta">${secondaryCta.text}</a>
//         </div>
//       </div>
//     `;
//   }

//   function openTab(evt, tabId) {
//     const tabContents = document.querySelectorAll('.dealership-activities__items');
//     tabContents.forEach(tabContent => {
//       tabContent.classList.remove('active');
//     });

//     const tabLinks = document.querySelectorAll('.tablink');
//     tabLinks.forEach(tabLink => {
//       tabLink.classList.remove('active');
//     });

//     document.getElementById(tabId).classList.add('active');
//     evt.currentTarget.classList.add('active');
//   }

//   // Fetch and process data
//   async function fetchData() {
//     // Replace this URL with your data source URL
//     const response = await fetch('/path/to/your/data.json');
//     const data = await response.json();
//     return data;
//   }

//   // Generate the HTML for tabs and their content
//   async function generateContent() {
//     const data = await fetchData();

//     const tabsHtml = data.map(tab => getTabHtml(tab.id, tab.title)).join('');
//     const tabsContentHtml = data.map(tab => `
//       <div id="${tab.id}" class="dealership-activities__items">
//         ${tab.activities.map(activity => getDealershipActivityHtml(activity)).join('')}
//       </div>
//     `).join('');

//     block.innerHTML = `
//       <div class="dealership-activities__container">
//         <div class="dealership-activities__content">
//           <div class="dealership-activities__title">
//             <p class="pre-title">Discover the</p>
//             <p class="title">Dealership Activities</p>
//           </div>
//           <p class="dealership-activities__description">Navigating the process of buying a car can be overwhelming, but our Buyer's Guide is here to make it a smooth and enjoyable experience.</p>
//           <div class="dealership-activities__action">
//             <a href="#" title="#" class="button btn-title" target="_self">
//               <p class="cta-text">Explore Nearby Dealers</p>
//             </a>
//           </div>
//         </div>

//         <div class="tabs-container">
//           <div class="tabs">
//             ${tabsHtml}
//           </div>
//         </div>

//         ${tabsContentHtml}
//       </div>
//     `;

//     // Initialize the first tab as active
//     document.querySelector('.tablink')?.click();

//     // Add custom scroll bar styles
//     const style = document.createElement('style');
//     style.textContent = `
//       .tabs-container::-webkit-scrollbar {
//         height: 8px;
//       }
//       .tabs-container::-webkit-scrollbar-thumb {
//         background-color: #007BFF;
//         border-radius: 4px;
//       }
//       .tabs-container::-webkit-scrollbar-track {
//         background-color: #f1f1f1;
//       }
//     `;
//     document.head.appendChild(style);

//     // Event listener to handle resizing
//     window.addEventListener('resize', () => {
//       // Logic for responsive behavior if needed
//     });
//   }

//   // Generate the content on load
//   generateContent();
// }


