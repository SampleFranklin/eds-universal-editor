import TabUtils from '../../utility/tabsUtils.js';
import utility from '../../utility/utility.js';

function generateHighlightItemHTML(highlightItem, index) {
  const [
    titleEl,
    subtitleEl,,
    imageEl,
    ...hotspotsEl
  ] = highlightItem.children;

  hotspotsEl.map((hotspot) => {
    //console.log(hotspot.outerHTML);
  });

    const image = imageEl?.querySelector('picture');
    if (image) {
      const img = image.querySelector('img');
      const alt=image.querySelector('img').alt || 'Image Description';
      img.classList.add('hotspot-img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      img.setAttribute('alt', alt);
    }

  
  const subtitle = subtitleEl?.textContent?.trim() || '';
  if(titleEl){
    titleEl.classList.add('title');
  }

  const newHTML = utility.sanitizeHtml(`
        <div class="text-section">
            ${titleEl? titleEl.outerHTML : ''}
        <div class="description">
            <p>${subtitle}</p>
          </div>
        </div>
        <div class="hotspots">
            ${(image) ? image.outerHTML : ''}
        </div>
    `);

    highlightItem.classList.add('safetyTabItem', `switch-index-${index}`);
    highlightItem.innerHTML = newHTML;
    return highlightItem.outerHTML;
  }

export default function decorate(block) {
  // console.log(block);

  const highlightItemButtons = {};

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

    
    block.innerHTML = `
    <div class="safetyTabItems-container">${highlightItemsHTML}</div>
    ${switchListHTML}`;    

    TabUtils.setupTabs(block, 'safetyTabItem'); 
    return block;

}
