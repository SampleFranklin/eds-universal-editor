export default function decorate(block) {
  // Data storage (simulating API response)
  const dealershipData = {
    showroomVisit: [
      {
        dealerName: "Mayuri Automobile Co. Ltd.",
        scheduledDate: "13th June, 2024",
        scheduledTime: "14:30PM",
        emailId: "mandir@competent-maruti.com",
        contact: "9931242567"
      },
      // Add more showroom visit entries as needed
    ],
    testDrive: [
      {
        dealerName: "XYZ Motors",
        scheduledDate: "15th June, 2024",
        scheduledTime: "10:00AM",
        emailId: "xyz@motors.com",
        contact: "9876543210"
      },
      // Add more test drive entries as needed
    ],
    booked: [
      // Add booked entries if any
    ]
  };
 
  // Function to update the dealership activities count
  function updateActivitiesCount() {
    const totalActivities = dealershipData.showroomVisit.length + 
                            dealershipData.testDrive.length + 
                            dealershipData.booked.length;
    const titleEl = block.querySelector('.dealership-activities__title');
    if (titleEl) {
      titleEl.textContent = `Dealership Activities (${totalActivities})`;
    }
  }
 
  // Function to render activity cards
  function renderActivityCards(activityType) {
    const cardsContainer = block.querySelector('.dealer__activities-notification-cards');
    if (!cardsContainer) return;
 
    cardsContainer.innerHTML = ''; // Clear existing cards
 
    dealershipData[activityType].forEach(activity => {
      const card = document.createElement('div');
      card.className = 'dealer__activity';
      card.innerHTML = `
<div class="dealer__activity-header">
<span class="dealer__upcoming">Upcoming ${activityType === 'testDrive' ? 'test drive' : activityType} | </span>
<span>Heads up! We have scheduled a ${activityType === 'testDrive' ? 'test drive' : activityType} on ${activity.scheduledDate} for Wagon R</span>
</div>
<div class="dealer__activity-body">
<img src="./icons/car-image.png" alt="Car" class="car-image">
<div class="activity-details-info-1">
<div class="activity-text-group">
<span class="label-field">Dealer Name: </span>
<span class="info-field">${activity.dealerName}</span>
</div>
<div class="activity-text-group">
<span class="label-field">Scheduled Date: </span>
<span class="info-field">${activity.scheduledDate}</span>
</div>
<div class="activity-text-group">
<span class="label-field">Scheduled Time: </span>
<span class="info-field">${activity.scheduledTime}</span>
</div>
</div>
<div class="activity-details-info-2">
<div class="activity-text-group">
<span class="label-field">Email ID: </span>
<span class="info-field">${activity.emailId}</span>
</div>
<div class="activity-text-group">
<span class="label-field">Contact: </span>
<span class="info-field">${activity.contact}</span>
</div>
</div>
<div class="dealer__activity-actions">
<button class="btn secondary-btn">Schedule a video call</button>
<button class="btn primary-btn">Directions</button>
</div>
</div>
      `;
      cardsContainer.appendChild(card);
    });
  }
 
  // Set up event listeners for tab switching
  function setupTabListeners() {
    const tabs = block.querySelectorAll('.dealer__tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const activityType = this.id;
        renderActivityCards(activityType);
      });
    });
  }
 
  // Initialize the component
  function init() {
    updateActivitiesCount();
    renderActivityCards('showroomVisit');
    setupTabListeners();
  }
 
  // Call the initialization function
  init();
}