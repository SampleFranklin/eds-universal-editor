export default function decorate(block) {

  function generateTeaserHTML(highlightTeaser, index) {
    const [
      imageEl,
      altTextEl,
      pretitleEl,
      titleEl,
      descriptionEl,
    ] = highlightTeaser.children;

    const image = imageEl?.querySelector('picture > img');
    const imageUrl = image ? image.src : '';
    const alt = altTextEl?.textContent?.trim() || 'Image Description';
    const pretitle = pretitleEl?.textContent?.trim() || '';
    const title = titleEl?.textContent?.trim() || '';
    const description = Array.from(descriptionEl.querySelectorAll('p')).map(p => p.textContent.trim()).join('');

    return `
      <div class="teaser switch-index-${index}">
        <img class="teaser-img" src="${imageUrl}" alt="${alt}"/>
        <div class="text-section">
          <div class="top-left">
            <h1>${title}</h1>
          </div>
          <div class="top-right">
            <p>${pretitle}</p>
          </div>
        </div>
        <div class="teaser-content">
          <p class="more-content">
            ${description}
          </p>
          <a href="#" class="read-more">Read more</a>
        </div>
      </div>
    `;
  }

  function generateSwitchListItemHTML(altText, index) {
    return `
      <li class="switch-list-item switch-index-${index}">${altText}</li>
    `;
  }

  function generateSwitchListHTML(teaserListElements) {
    const switchListHTML = teaserListElements.map((highlightTeaser, index) => {
      const [, altTextEl] = highlightTeaser.children;
      const altText = altTextEl?.textContent?.trim() || '';
      return generateSwitchListItemHTML(altText, index);
    }).join('');

    return `
      <div class="switch-list-section">
        <ul class="switch-list">
          ${switchListHTML}
        </ul>
      </div>
    `;
  }

  // Main logic
  const teaserListElements = Array.from(block.children);
  const teasersHTML = teaserListElements.map((teaser, index) => generateTeaserHTML(teaser, index)).join('');
  const switchListHTML = generateSwitchListHTML(teaserListElements);

  block.innerHTML = `
    <div class="teasers-container">${teasersHTML}</div>
    ${switchListHTML}
  `;

  // Event handling
  const switchList = block.querySelector('.switch-list');

  switchList.addEventListener('click', function(event) {
    const switchItem = event.target.closest('.switch-list-item');
    if (!switchItem) return;

    const index = Array.from(switchList.children).indexOf(switchItem);
    const teasers = block.querySelectorAll('.teaser');
    const switchItems = block.querySelectorAll('.switch-list-item');

    teasers.forEach(teaser => teaser.style.display = 'none');
    teasers[index].style.display = 'block';

    switchItems.forEach(item => item.classList.remove('active'));
    switchItem.classList.add('active');
  });

  block.querySelectorAll('.teaser').forEach(teaser => {
    const readMoreButton = teaser.querySelector('.read-more');
    if (readMoreButton) {
      readMoreButton.addEventListener('click', function(event) {
        event.preventDefault();
        const moreContent = teaser.querySelector('.more-content');
        moreContent.classList.toggle('expanded');
        readMoreButton.textContent = moreContent.classList.contains('expanded') ? 'Read less' : 'Read more';
      });
    }
  });

  // Cleanup function
  const eventListeners = [];

  function addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    eventListeners.push({ element, event, handler });
  }

  function removeAllEventListeners() {
    eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
  }

  // Initial setup
  const defaultTeaser = block.querySelector('.teaser.switch-index-0');
  if (defaultTeaser) {
    defaultTeaser.style.display = 'block';
  }

  const firstSwitchItem = block.querySelector('.switch-list-item');
  if (firstSwitchItem) {
    firstSwitchItem.classList.add('active');
  }

  return { block, cleanup: removeAllEventListeners };
}
