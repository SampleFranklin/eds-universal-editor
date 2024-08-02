import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default function decorate(block) {
  function getDealershipActivities() {
    const [titleEl, subtitleEl, tabsContainerEl, ...dealershipActivitiesItemEls] = block.children;

    const title = titleEl?.textContent?.trim() || '';
    const subtitle = subtitleEl?.textContent?.trim() || '';
    const tabs = Array.from(tabsContainerEl.children).map((tabEl) => {
      const [tabnameEl] = tabEl.children;
      const tabname = tabnameEl?.textContent?.trim() || '';
      const li = document.createElement('li');
      li.innerHTML = `<p class="tabs">${tabname}</p>`;
      moveInstrumentation(tabEl, li);
      return li.outerHTML;
    });

    const items = Array.from(dealershipActivitiesItemEls).map((itemEl) => {
      const [dealerNameEl, emailIdEl, scheduledDateEl, scheduledTimeEl, contactEl] = itemEl.children;
      const dealerName = dealerNameEl?.textContent?.trim() || '';
      const emailId = emailIdEl?.textContent?.trim() || '';
      const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
      const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
      const contact = contactEl?.textContent?.trim() || '';

      const li = document.createElement('li');
      li.innerHTML = `<p class="dealer-items">${dealerName}
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
      items,
    };
  }

  const dealership = getDealershipActivities();
  block.innerHTML = utility.sanitizeHtml(`
    <div class="dealership-activities__container">
      <div class="dealership-activities__content">
        <p class="title">${dealership.title}</p>
        <p class="sub-title">${dealership.subtitle}</p>
        <div class="dealership-activities__tabs">
          <div class="scroll-bar"></div>
          <ul class="list-container">
            ${dealership.tabs.join('')}
          </ul>
        </div>
      </div>
      <div class="dealer-activities__items">
        <div class="dealer-activities__cards">
          <ul class="list-container">
            ${dealership.items.join('')}
          </ul>
        </div>
      </div>
    </div>
  `);
}



