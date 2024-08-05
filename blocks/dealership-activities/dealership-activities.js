import utility from '../../utility/utility.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
export default function decorate(block) {
  function getDealershipActivities() {
    const [
      titleEl,
      subtitleEl,
      tabname1El,
      tabname2El,
      tabname3El,
      ...dealershipActivitiesItemEls] = block.children;

      const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
      title?.classList?.add('title');
      const subtitle = subtitleEl?.textContent?.trim() || '';
      const tabname1 = tabname1El?.textContent?.trim() || '';
      const tabname2 = tabname2El?.textContent?.trim() || '';
      const tabname3 = tabname3El?.textContent?.trim() || '';

      const items = Array.from(dealershipActivitiesItemEls).map((dealershipActivitiesItemEl) => {
        const [dealerNameEl, emailIdEl, scheduledDateEl, scheduledTimeEl, contactEl] = dealershipActivitiesItemEl.children;
        const dealerName = dealerNameEl?.textContent?.trim() || '';
        const emailId = emailIdEl?.textContent?.trim() || '';
        const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
        const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
        const contact = contactEl?.textContent?.trim() || '';
        const li = document.createElement('li');
        li.innerHTML = `<p class="dealer-name">${dealerName}</p>
        <p class="dealer-emailid">${emailId}</p>
        <p class="dealer-date">${scheduledDate}</p>
        <p class="dealer-time">${scheduledTime}</p>
        <p class="dealer-contact">${contact}</p>
    `;
        moveInstrumentation(dealershipActivitiesItemEl, li);
        return li.outerHTML;
      });

  return {
    title, subtitle, tabname1, tabname2, tabname3, items,
  };
}
console.log("vineetha")
const dealershipActivities = getDealershipActivities();
block.innerHTML = utility.sanitizeHtml(`
  <div class="dealer-activities">
        <div class="dealership-activities-container">
            <div class="dealership-activities__content">
                <p class="dealership-activities__title">${dealershipActivities.title}</p>
                <p class="dealership-activities__subtitle">${dealershipActivities.subtitle}</p>
                <ul class="dealer__tabs">
                    <li class="dealer__tab active" id="showroom_visit">${dealershipActivities.tabname1}</li>
                    <li class="dealer__tab" id="test_drive">${dealershipActivities.tabname2}</li>
                    <li class="dealer__tab" id="booked">${dealershipActivities.tabname3}</li>
                </ul>
            </div>
            <div class="dealer__activities-notification-cards">
                <div class="dealer__activity">
                    <div class="dealer__activity-header">
                        <span class="dealer__upcoming">Upcoming test drive | </span>
                        <span>Heads up! We have scheduled a test drive on 13th June for Wagon R</span>
                    </div>
                    <div class="dealer__activity-body">
                        <img src="./icons/car-image.png" alt="Car" class="car-image">
                        <div class="activity-details-info-1">
                            <div class="activity-text-group">
                                <span class="label-field">${dealershipActivities.dealerName} </span>
                                <span class="info-field">Mayuri Automobile Co. Ltd.</span>
                            </div>
                            <div class="activity-text-group">
                                <span class="label-field">${dealershipActivities.scheduledDate} </span>
                                <span class="info-field">13th June, 2024</span>
                            </div>
                            <div class="activity-text-group">
                                <span class="label-field">${dealershipActivities.scheduledTime}  </span>
                                <span class="info-field">14:30PM</span>
                            </div>
                        </div>
                        <div class="activity-details-info-2">
                            <div class="activity-text-group">
                                <span class="label-field">${dealershipActivities.emailId} </span>
                                <span class="info-field">mandir@competent-maruti.com</span>
                            </div>
                           
                            <div class="activity-text-group">
                                <span class="label-field">${dealershipActivities.contact} </span>
                                <span class="info-field">9931242213</span>
                            </div>
                        </div>
                        <div class="dealer__activity-actions">
                            <button class="btn secondary-btn">Schedule a video call</button>
                            <button class="btn primary-btn">Directions</button>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                `);

}