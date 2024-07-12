import TabUtils from '../../utility/tabsUtils.js';
import utility from '../../utility/utility.js';

function generateHighlightItemHTML(highlightItem, index) {
    
    const [
      titleEl,
      subtitleEl,,
      imageEl
    ] = highlightItem.children;

    const image = imageEl?.querySelector('picture');
    if (image) {
      const img = image.querySelector('img');
      const alt=image.querySelector('img').alt || 'Image Description';
      img.classList.add('highlightItem-img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      img.setAttribute('alt', alt);
    }

    const title = titleEl?.textContent?.trim() || '';
    const subtitle = subtitleEl?.textContent?.trim() || '';
    
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
    
        </div>
    `);

    highlightItem.classList.add('highlightItem', `switch-index-${index}`);
    highlightItem.innerHTML = newHTML;
    return highlightItem.outerHTML;
  }


export default function decorate(block) {

console.log(block);

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
    <div class="highlightItems-container">${highlightItemsHTML}</div>
    ${switchListHTML}`;    

    TabUtils.setupTabs(block, highlightItemListElements);
  
    return block;

}