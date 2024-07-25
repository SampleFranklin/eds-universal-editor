export default async function decorate(block) {
    const [titleEl, subtitleEl, tabsEl, ...itemsEl] = block.children;
  
    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)')?.outerHTML || '';
    const subtitle = subtitleEl?.textContent?.trim() || '';
  
    const tabs = Array.from(tabsEl.querySelectorAll('li')).map((tab, index) => {
      return {
        title: tab.textContent.trim(),
        index
      };
    });
  
    const items = itemsEl.map((itemEl) => {
      const imageEl = itemEl.querySelector('img');
      const imageUrl = imageEl?.src || '';
      const imageAlt = imageEl?.alt || 'Dealer Image';
      const dealerName = itemEl.querySelector('.dealer-name')?.textContent?.trim() || '';
      const contact = itemEl.querySelector('.contact')?.textContent?.trim() || '';
      const emailId = itemEl.querySelector('.email-id')?.textContent?.trim() || '';
      const scheduledDate = itemEl.querySelector('.scheduled-date')?.textContent?.trim() || '';
      const scheduledTime = itemEl.querySelector('.scheduled-time')?.textContent?.trim() || '';
      const primaryCta = itemEl.querySelector('.primary-cta')?.textContent?.trim() || '';
      const secondaryCta = itemEl.querySelector('.secondary-cta')?.textContent?.trim() || '';
      const secondaryCtaLink = itemEl.querySelector('.secondary-cta')?.href || '#';
  
      return {
        imageUrl,
        imageAlt,
        dealerName,
        contact,
        emailId,
        scheduledDate,
        scheduledTime,
        primaryCta,
        secondaryCta,
        secondaryCtaLink
      };
    });
  
    const tabsHtml = tabs.map((tab, index) => `
      <button class="tablink ${index === 0 ? 'active' : ''}" data-index="${index}">${tab.title}</button>
    `).join('');
  
    const itemsHtml = items.map((item, index) => `
      <div class="dealership-activities__item ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="dealership-activities__item-left">
          <img src="${item.imageUrl}" alt="${item.imageAlt}">
        </div>
        <div class="dealership-activities__item-right">
          <p><strong>Dealer Name:</strong> ${item.dealerName}</p>
          <p><strong>Contact:</strong> ${item.contact}</p>
          <p><strong>Email ID:</strong> ${item.emailId}</p>
          <p><strong>Scheduled Date:</strong> ${item.scheduledDate}</p>
          <p><strong>Scheduled Time:</strong> ${item.scheduledTime}</p>
          <div class="actions">
            <button type="button">${item.primaryCta}</button>
            <a href="${item.secondaryCtaLink}" class="secondary-cta">${item.secondaryCta}</a>
          </div>
        </div>
      </div>
    `).join('');
  
    block.innerHTML = `
      <div class="dealership-activities__container">
        <div class="dealership-activities__content">
          <div class="dealership-activities__title">
            ${title}
            <p class="subtitle">${subtitle}</p>
          </div>
          <div class="tabs">
            ${tabsHtml}
          </div>
          <div class="dealership-activities__items">
            ${itemsHtml}
          </div>
        </div>
      </div>
    `;
  
    // Adding event listeners for tabs
    block.querySelectorAll('.tablink').forEach((tab) => {
      tab.addEventListener('click', (event) => {
        const index = event.currentTarget.dataset.index;
        block.querySelectorAll('.tablink').forEach((tab) => {
          tab.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        block.querySelectorAll('.dealership-activities__item').forEach((item) => {
          item.classList.remove('active');
        });
        block.querySelector(`.dealership-activities__item[data-index="${index}"]`).classList.add('active');
      });
    });
  }
  