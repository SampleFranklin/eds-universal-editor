import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  // Extract elements from the block
  const [titleEl, subtitleEl, ...dealershipActivitiesItemEl] = block.children;

  // Extract title and subtitle
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
  const subtitle = subtitleEl?.textContent?.trim() || '';

  // Function to extract individual dealership activity items
  const extractDealershipActivityItems = (items) => {
    return items.map((itemEl, index) => {
      const [
        tabNameEl,
        descriptionEl,
        imageEl,
        dealerNameEl,
        emailIdEl,
        scheduledDateEl,
        scheduledTimeEl,
        contactEl,
        primaryTextEl,
        primaryAnchorEl,
        primaryTargetEl,
        secondaryTextEl,
        secondaryAnchorEl,
        secondaryTargetEl
      ] = itemEl.children;

      const image = imageEl?.querySelector('picture')?.outerHTML || '';
      const dealerName = dealerNameEl?.textContent?.trim() || '';
      const emailId = emailIdEl?.textContent?.trim() || '';
      const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
      const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
      const contact = contactEl?.textContent?.trim() || '';
      const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.textContent.trim()).join('');

      const primaryText = primaryTextEl?.textContent?.trim() || '';
      const primaryHref = primaryAnchorEl?.querySelector('a')?.href || '#';
      const primaryTarget = primaryTargetEl?.querySelector('a')?.target || '_self';

      const secondaryText = secondaryTextEl?.textContent?.trim() || '';
      const secondaryHref = secondaryAnchorEl?.querySelector('a')?.href || '#';
      const secondaryTarget = secondaryTargetEl?.querySelector('a')?.target || '_self';

      return {
        tabName: tabNameEl?.textContent?.trim() || `Tab ${index + 1}`,
        content: `
          <div class="dealership-activities__item" id="tab${index + 1}">
            <div class="dealership-activities__item-left">
              ${image}
              <p class="description">${description}</p>
            </div>
            <div class="dealership-activities__item-right">
  <p class="dealer-name">
    <strong>DEALER NAME:</strong><br>
    <span contenteditable="true">${dealerName}</span>
  </p>
  <p class="scheduled-date">
    <strong>SCHEDULED DATE:</strong><br>
    <span contenteditable="true">${scheduledDate}</span>
  </p>
  <p class="scheduled-time">
    <strong>SCHEDULED TIME:</strong><br>
    <span contenteditable="true">${scheduledTime}</span>
  </p>
  <p class="email-id">
    <strong>EMAIL ID:</strong><br>
    <span contenteditable="true">${emailId}</span>
  </p>
  <p class="contact">
    <strong>CONTACT:</strong><br>
    <span contenteditable="true">${contact}</span>
  </p>
  <div class="actions">
    <a href="${primaryHref}" target="${primaryTarget}" class="primary-text">${primaryText}</a>
    <a href="${secondaryHref}" target="${secondaryTarget}" class="button secondary-text">${secondaryText}</a>
  </div>
</div>

            </div>
          </div>
        `
      };
    });
  };

  // Function to extract and build the tabs
  const extractTabs = (tabs) => {
    return tabs.map((tab, index) => {
      const isActive = index === 0 ? 'active default' : '';
      return `
        <div class="tablink ${isActive}" data-tab="tab${index + 1}">
          ${tab.tabName}
          <hr class="tab-scroll-line">
        </div>
      `;
    }).join('');
  };

  // Generate tabs and items HTML
  const items = extractDealershipActivityItems(dealershipActivitiesItemEl);
  const tabsHtml = extractTabs(items);
  const itemsHtml = items.map(item => item.content).join('');
  

  // Set block's inner HTML
  block.innerHTML = utility.sanitizeHtml(`
    <div class="dealership-activities__container">
      <div class="dealership-activities__content">
        <div class="dealership-activities__title">
          ${title}
          <p class="subtitle">${subtitle}</p>
        </div>
        <div class="tabs-wrapper">
          <div class="tabs">
            ${tabsHtml}
          </div>
        </div>
        <div class="dealership-activities__items">
          ${itemsHtml}
        </div>
      </div>
    </div>
  `);

  // Function to handle tab switching and highlight
  const openTab = (evt, tabName) => {
    const tabContent = document.querySelectorAll('.dealership-activities__item');
    const tabLinks = document.querySelectorAll('.tablink');

    tabContent.forEach((content) => {
      content.style.display = 'none';
      content.classList.remove('active');
    });

    tabLinks.forEach((link) => {
      link.classList.remove('active');
    });

    const activeTab = document.getElementById(tabName);
    if (activeTab) {
      activeTab.style.display = 'flex';
      activeTab.classList.add('active');
      moveInstrumentation(activeTab);
    }

    evt.currentTarget.classList.add('active');
    moveInstrumentation(evt.currentTarget);
  };

  // Attach click event listeners to the tabs
  document.querySelectorAll('.tablink').forEach((tabLink) => {
    tabLink.addEventListener('click', (event) => {
      const tabName = tabLink.getAttribute('data-tab');
      openTab(event, tabName);
    });
  });

  // Initial tab display setup
  if (document.querySelectorAll('.dealership-activities__item')[0]) {
    document.querySelectorAll('.dealership-activities__item')[0].style.display = 'flex';
    document.querySelectorAll('.dealership-activities__item')[0].classList.add('active');
    moveInstrumentation(document.querySelectorAll('.dealership-activities__item')[0]);
  }
}