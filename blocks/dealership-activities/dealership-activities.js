export default function decorate(block) {
  const [
    titleEl,
    subtitleEl,
    ...tabElements
  ] = block.children;

  const title = titleEl?.textContent?.trim() || "";
  const subtitle = subtitleEl?.textContent?.trim() || "";
  const tabs = tabElements.map(tabEl => tabEl?.textContent?.trim() || "");

  function createDealerCard() {
    const tabMap = tabs.map((tab, index) => `
      <div class="tab-item ${index === 0 ? 'active' : ''}" data-index="${index}">
        ${tab}
        <div class="scroll-line ${index === 0 ? 'visible' : ''}"></div>
      </div>
    `).join('');

    return `
      <div class="dealership-activities__container">
        <div class="dealership-activities__content">
          <div class="dealership-activities__title">
            ${title}
            <p class="subtitle">${subtitle}</p>
          </div>
          <div class="dealership-activities__tabs">
            ${tabMap}
          </div>
        </div>
      </div>
    `;
  }

  const dealershipCard = createDealerCard();
  block.innerHTML = dealershipCard;

  const tabItems = block.querySelectorAll('.tab-item');

  tabItems.forEach(item => {
    item.addEventListener('click', () => {
      tabItems.forEach(tab => {
        tab.classList.remove('active');
        tab.querySelector('.scroll-line').classList.remove('visible');
      });
      item.classList.add('active');
      item.querySelector('.scroll-line').classList.add('visible');
    });
  });
}
