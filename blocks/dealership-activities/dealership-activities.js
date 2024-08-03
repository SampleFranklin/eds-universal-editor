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

      const li = document.createElement('li');
      li.innerHTML = `<p class="dealer-items">
        ${dealerName}<br>
        ${emailId}<br>
        ${scheduledDate}<br>
        ${scheduledTime}<br>
        ${contact}
      </p>`;
      moveInstrumentation(itemEl, li);
      return li.outerHTML;
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

  const dealership = getDealershipActivities();
  block.innerHTML = utility.sanitizeHtml(`
    <section class="dealer-activities">
        <div class="dealership-activities-container">
            <div class="dealership-activities__content">
                <span class="dealership-activities__title">${dealership.title}</span>
                <p class="dealership-activities__subtitle">${dealership.subtitle}</p>
                <p class="dealership-activities__tabs">
                  ${dealership.tabname1}<br>
                  ${dealership.tabname2}<br>
                  ${dealership.tabname3}<br>
                </p>
            </div>
            <div class="dealer-activities__items">
                <ul class="list-container">
                    ${dealership.items}
                </ul>
            </div>
        </div>
    </section>
  `);
}
