export default function decorate(block) {
  const [titleEl, subtitleEl, tabsEl, ...dealershipActivitiesItemEls] = block.children;

  const title = titleEl?.textContent?.trim() || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';
  const tabs = Array.from(tabsEl?.children || []).map(tabEl => tabEl?.textContent?.trim() || '');

 function createDealerCard(data){
  return`
  <div class ="card" data-category="${data.category}">
  <div class="image">
  <img src="{data.image}" alt="carImage" class="car-image"/>
  </div>
  <div class=items">
  <div class="description">${data.description}</div>
  <div class ="dname">
  ${data.dealername}<br/>
  </div>
  <div class="dealeremailId">
  ${data.emailid}<br/>
  </div>
  <div class="dealerscheduleddate">
  ${data.scheduleddate}<br/>
  </div>
  <div class="dealerscheduledtime">
  ${data.scheduledtime}<br/>
  </div>
  <div class="dealercontact">
  ${data.contact}<br/>
  </div>
  <div class="primarylink">
  ${data.primarycta}<br/>
  </div>
  <div class="secondarylink">
  ${data.secondarycta}<br/>
  </div>
  </div>

`  }
const mockData=[
  {
    dealername: 'Mayuri Automobile Co. Ltd.',
    image: '/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png',
    description: 'Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R',
    scheduledtime: '14:30PM',
    scheduleddate: '13th Jun, 2024',
    contact: '9931242213',
    emailid: 'mandi@competent-maruti.com',
    primarycta: 'Schedule a video call',
    secondarycta: 'Directions',
    category:"Showromm Visit",
  },
  {
    dealername: 'Mayuri Automobile Co. Ltd.',
    image: '/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png',
    description: 'Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R',
    scheduledtime: '14:30PM',
    scheduleddate: '13th Jun, 2024',
    contact: '9931242213',
    emailid: 'mandi@competent-maruti.com',
    primarycta: 'Schedule a video call',
    secondarycta: 'Directions',
    category:"Test Drive",
  },
  {
    dealername: 'Mayuri Automobile Co. Ltd.',
    image: '/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png',
    description: 'Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R',
    scheduledtime: '14:30PM',
    scheduleddate: '13th Jun, 2024',
    contact: '9931242213',
    emailid: 'mandi@competent-maruti.com',
    primarycta: 'Schedule a video call',
    secondarycta: 'Directions',
    category:"Showroom Visit",
  },
];
const cardsHTML = mockData.map(data => createDealerCard(data)).join("");
 
    block.innerHTML = `
        <div class="main-container">
            <div class="title-section">
                <div class="titleNew">${title}</div>
                <div class="subtitleNew">${subtitle}</div>
            </div>
            <div class="rowNew">
                <div class="col-sm-3">
                    <div class="tabs">${tabName}</div>
                </div>
                
                
            </div>
            <div class="cards-section">
                ${cardsHTML}
            </div>
        </div>
    `;
 
    document.addEventListener('DOMContentLoaded', () => {
      const block = document.querySelector('.block');
  
      fetchData().then(data => {
          // Render tabs
          const tabContainer = document.createElement('div');
          tabContainer.classList.add('tab-container');
          data.tabs.forEach(tabData => {
              const tab = document.createElement('div');
              tab.id = tabData.id;
              tab.textContent = tabData.text;
              tab.dataset.category = tabData.category;
              tab.classList.add('tab');
              tabContainer.appendChild(tab);
          });
          block.appendChild(tabContainer);
  
          // Render cards
          const cardContainer = document.createElement('div');
          cardContainer.classList.add('card-container');
          data.cards.forEach(cardData => {
              const card = document.createElement('div');
              card.classList.add('card');
              card.dataset.category = cardData.category;
              card.textContent = cardData.content;
              card.style.display = 'none';  // Initially hide all cards
              cardContainer.appendChild(card);
          });
          block.appendChild(cardContainer);
  
          // Add event listeners to tabs
          const tabs = block.querySelectorAll('.tab');
          const cards = block.querySelectorAll('.card');
          tabs.forEach(tab => {
              tab.addEventListener('click', () => {
                  const category = tab.dataset.category;
                  cards.forEach(card => {
                      card.style.display = card.dataset.category === category ? 'block' : 'none';
                  });
                  tabs.forEach(t => t.classList.remove('active')); // Remove active class from all tabs
                  tab.classList.add('active'); // Add active class to the clicked tab
              });
          });
  
          // Activate the first tab and its cards by default
          if (tabs.length > 0) {
              tabs[0].click();
          }
      });
  });
}  