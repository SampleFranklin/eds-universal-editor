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
    const tabMap = tabs.map(tab => `
      <div class="tab-item">
        ${tab}
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

  // Create dealership card and set innerHTML
  const dealershipCard = createDealerCard();
  block.innerHTML = dealershipCard;
}
