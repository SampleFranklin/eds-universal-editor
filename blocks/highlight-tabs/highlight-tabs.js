import TabUtils from '../../utility/tabsUtils.js';
import utility from '../../utility/utility.js';

export default function decorate(block) {
  const highlightItemButtons = {};
  function generateHighlightItemHTML(highlightItem, index) {
    const [
      imageEl,
      altTextEl,,
      titleEl,
      subtitleEl,
      descriptionEl,
      expandDescriptionEl,
      collapseDescriptionEL,
    ] = highlightItem.children;

    const image = imageEl?.querySelector('picture');
    if (image) {
      const img = image.querySelector('img');
      img.classList.add('highlightItem-img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      const alt = altTextEl?.textContent?.trim() || 'Image Description';
      img.setAttribute('alt', alt);
    }

    const title = titleEl?.textContent?.trim() || '';
    const subtitle = subtitleEl?.textContent?.trim() || '';
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.textContent.trim()).join('');
    const expandDescription = expandDescriptionEl?.textContent?.trim() || '';
    const collapseDescription = collapseDescriptionEL?.textContent?.trim() || '';
    highlightItemButtons[index] = {
      expandBtn: expandDescription,
      collapseBtn: collapseDescription,
    };
    const newHTML = utility.sanitizeHtml(`
        <div class="text-section">
          <div class="top-left">
            <h1>${title}</h1>
          </div>
          <div class="top-right">
            <p>${subtitle}</p>
          </div>
        </div>
        ${(image) ? image.outerHTML : ''}
        <div class="highlightItem-content">
          <p class="more-content">
            ${description}
          </p>
          ${description.length > 130 ? `<a href="#" class="read-more">${expandDescription}</a>` : ''}
        </div>
    `);
    highlightItem.classList.add('highlightItem', `switch-index-${index}`);
    highlightItem.innerHTML = newHTML;
    return highlightItem.outerHTML;
  }

  function initializeHighlightItems(highlightItems) {
    highlightItems.forEach((highlightItem, index) => {
      const moreContent = highlightItem.querySelector('.more-content');
      const readMoreButton = highlightItem.querySelector('.read-more');

      if (moreContent && readMoreButton) {
        // Make sure to call the height measurement after the content has been rendered
        setTimeout(() => {
          // const contentHeight = moreContent.offsetHeight;
          const computedStyle = getComputedStyle(moreContent);
          const contentHeight= parseFloat(computedStyle.height)
          const lineHeight = parseFloat(computedStyle.lineHeight);
          console.log(contentHeight,lineHeight,"cjlh")

          // Determine whether to show the read more link based on content height
          if (contentHeight > lineHeight*3) {  // Set your desired height threshold here
            readMoreButton.style.display = 'block';
          }

          readMoreButton.addEventListener('click', (event) => {
            event.preventDefault();
            moreContent.classList.toggle('expanded');
            const { expandBtn, collapseBtn } = highlightItemButtons[index];
            readMoreButton.textContent = moreContent.classList.contains('expanded') ? collapseBtn : expandBtn;
          });
        }, 0); // A delay of 0 ms allows the DOM to update before measuring
      }
    });
  }

  const blockClone = block.cloneNode(true);
  const highlightItemListElements = Array.from(block.children);
  const highlightItemListElementsClone = Array.from(blockClone.children);
  const highlightItemsHTML = highlightItemListElements
    .map((highlightItem, index) => generateHighlightItemHTML(highlightItem, index)).join('');
  const switchListHTML = TabUtils
    .generateSwitchListHTML(highlightItemListElementsClone, (highlightItem) => {
      const [, , tabNameEl] = highlightItem.children;
      return tabNameEl?.textContent?.trim() || '';
    });

    const highlightItemsContainer = document.createElement('div');
    highlightItemsContainer.classList.add('highlightItems-container');
    highlightItemsContainer.innerHTML = highlightItemsHTML;
    block.innerHTML = `
    <div class="highlightItems-container">${highlightItemsHTML}</div>
    ${switchListHTML}`;

    const restructureDescriptionHtml = (block) => {
      const highlightItemsContainer = block.querySelector('.highlightItems-container');
      const switchListSection = block.querySelector('.switch-list-section');
      const highlightItems = highlightItemsContainer.querySelectorAll('.highlightItem');
    
      // Move highlightItem-content elements to be siblings of the switch list
      highlightItems.forEach((item, index) => {
        const content = item.querySelector('.highlightItem-content');
        if (content) {
          switchListSection.appendChild(content);
          if(index==0){
            content.style.display='block';
          }
          else{
          content.style.display = 'none';
          }
        }
    });
  }

    const isMobile = window.matchMedia("(max-width: 999px)").matches;
    if (isMobile) {
      restructureDescriptionHtml(block);
    }
  initializeHighlightItems(block.querySelectorAll('.highlightItem-content'));
  TabUtils.setupTabs(block, highlightItemListElements);

  return block;
}
