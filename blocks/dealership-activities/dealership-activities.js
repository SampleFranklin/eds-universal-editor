import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';
export default function decorate(block) {
  const [titleEl, subtitleEl, tabname1El, tabname2El, tabname3El, labelsEl] =
    block.children;
    const title =
    titleEl?.querySelector(":is(h1,h2,h3,h4,h5,h6)")?.outerHTML || "";
  const subtitle = subtitleEl?.textContent?.trim() || "";
  const tabname1 = tabname1El?.textContent?.trim() || "";
  const tabname2 = tabname2El?.textContent?.trim() || "";
  const tabname3 = tabname3El?.textContent?.trim() || "";

  const [dealerNameEl, emailIdEl,scheduledDateEl, scheduledTimeEl,  contactEl] =
    labelsEl.children;

  const dealerName = dealerNameEl?.textContent?.trim() || "";
  const scheduledDate = scheduledDateEl?.textContent?.trim() || "";
  const scheduledTime = scheduledTimeEl?.textContent?.trim() || "";
  const emailId = emailIdEl?.textContent?.trim() || "";
  const contact = contactEl?.textContent?.trim() || "";

  

  // Data storage (simulating API response)
  const dealershipData = {
    showroomVisit: [
      {
        dealerName: "Mayuri Automobile Co. Ltd.",
        scheduledDate: "13th June, 2024",
        scheduledTime: "14:30PM",
        emailId: "mandir@competent-maruti.com",
        contact: "9931242567",
      },
      {
        dealerName: "XYZ Motors",
        scheduledDate: "15th June, 2024",
        scheduledTime: "10:00AM",
        emailId: "xyz@motors.com",
        contact: "9876543210",
      },
    ],
    testDrive: [
      {
        dealerName: "XYZ Motors",
        scheduledDate: "15th June, 2024",
        scheduledTime: "10:00AM",
        emailId: "xyz@motors.com",
        contact: "9876543210",
      },
      // Add more test drive entries as needed
    ],
    booked: [
      {
        dealerName: "XYZ Motors",
        scheduledDate: "15th June, 2024",
        scheduledTime: "10:00AM",
        emailId: "xyz@motors.com",
        contact: "9876543210",
      },
    ],
  };

  // Function to create the entire HTML structure
  function createDealershipActivitiesHTML() {
    const totalActivities =
      dealershipData.showroomVisit.length +
      dealershipData.testDrive.length +
      dealershipData.booked.length;

    return `
            <div class="dealer-activities-container">
              <div class="dealership-activities__content">
                <span class="dealership-activities__title">${title}</span>
                  <p class="dealership-activities__subtitle">${subtitle}</p>
                  <ul class="dealer__tabs">
                    <li class="dealer__tab active" id="showroomVisit">${tabname1} (${dealershipData.showroomVisit.length})</li>
                    <li class="dealer__tab" id="testDrive">${tabname2} (${dealershipData.testDrive.length})</li>
                    <li class="dealer__tab" id="booked">${tabname3} (${dealershipData.booked.length})</li>
                  </ul>
              </div>
              <div class="dealer__activities-notification-cards">
                ${renderActivityCards("showroomVisit")}
              </div>
            </div>`;
  }
 
  // Function to render activity cards
  function renderActivityCards(activityType) {
    return dealershipData[activityType]
      .map(
        (activity) => `
                        <div class="dealer__activity">
                          <div class="dealer__activity-header">
                            <span class="dealer__upcoming">Upcoming ${activityType === "testDrive" ? "test drive" : activityType}</span>
                            <span> | Heads up! We have scheduled a ${activityType === "testDrive" ? "test drive" : activityType} on ${activity.scheduledDate} for Wagon R</span>
                          </div>
                          <div class="dealer__activity-body">
                          <picture>
                            <img src="/content/dam/nexa-world/Ar_Vk_Maruti_Rangman_Front%203-4th%20Bridge%20Motion%20Shot_V3_SL%204.png"," alt="Car" class="car-image">
                            </picture>
                            <div class="activity-details-info-1">
                              <div class="activity-text-group">
                                <span class="label-field">${dealerName} </span>
                                <span class="info-field">${activity.dealerName}</span>
                              </div>
                              <div class="activity-text-group">
                                <span class="label-field">${scheduledDate} </span>
                                <span class="info-field">${activity.scheduledDate}</span>
                              </div>
                              <div class="activity-text-group">
                                <span class="label-field">${scheduledTime} </span>
                                <span class="info-field">${activity.scheduledTime}</span>
                              </div>
                            </div>
                            <div class="activity-details-info-2">
                              <div class="activity-text-group">
                                <span class="label-field">${emailId} </span>
                                <span class="info-field">${activity.emailId}</span>
                              </div>
                              <div class="activity-text-group">
                                <span class="label-field">${contact} </span>
                                <span class="info-field">${activity.contact}</span>
                              </div>
                            </div>
                            <div class="dealer__activity-actions">
                            <button class="btn secondary-btn">Schedule a video call</button>
                            <button class="btn primary-btn">Directions</button>
                          </div>
                        </div>
                      </div>`).join("");
  }

  // Handle tab click event
  function handleTabClick(event) {
    const tabs = block.querySelectorAll(".dealer__tab");
    tabs.forEach((t) => t.classList.remove("active"));
    event.currentTarget.classList.add("active");
    const activityType = event.currentTarget.id;
    const cardsContainer = block.querySelector(".dealer__activities-notification-cards");
    cardsContainer.innerHTML = renderActivityCards(activityType);
  }

  // Set up event listeners for tab switching
  function setupTabListeners() {
    const tabs = block.querySelectorAll(".dealer__tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", handleTabClick);
    });
  }

  // Initialize the component
  function init() {
    block.innerHTML = utility.sanitizeHtml(createDealershipActivitiesHTML())
    
    if(block.querySelector('dealership-activities__title')?.firstElementChild) {
      block.querySelector('dealership-activities__title').firstElementChild.textContent = `${title} (${totalActivities})`
    }
    const initialCards = block.querySelector(".dealer__activity-body");
    moveInstrumentation(labelsEl, initialCards);
    setupTabListeners();
  }

  // Call the initialization function
  init();
}