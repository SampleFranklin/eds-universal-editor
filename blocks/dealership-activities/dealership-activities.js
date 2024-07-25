import { moveInstrumentation } from '../../scripts/scripts.js';
import utility from '../../utility/utility.js';

export default async function decorate(block) {
  
  // Extract elements from the block
  const [titleEl, subtitleEl, ...dealershipActivitiesItemEl] = block.children;

  // Extract title and subtitle
  const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    title?.classList?.add('title');
    const subtitle = subtitleEl?.textContent?.trim() || '';

  const dealershipActivitiesItem = dealershipActivitiesItemEl?.map((itemEl) => {
    const [
      tabnameEl,
      imageEl,
      dealerNameEl,
      emailIdEl,
      scheduledDateEl,
      scheduledTimeEl,
      contactEl,
      primaryTextEl,
      secondaryTextEl
    ] = itemEl.children;

    const image = imageEl?.querySelector('picture');
  if (image) {
    const img = image.querySelector('img');
    const alt = image.querySelector('img').alt || 'Image Description';
    img.classList.add('hotspot-img');
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.setAttribute('alt', alt);
  }
  const dealerName = dealerNameEl?.textContent?.trim() || '';
  const emailId = emailIdEl?.textContent?.trim() || '';
  const scheduledDate = scheduledDateEl?.textContent?.trim() || '';
  const scheduledTime = scheduledTimeEl?.textContent?.trim() || '';
  const contact = contactEl?.textContent?.trim() || '';
  console.log("subtitle")
  return {
    imgSrc: imageEl?.querySelector('img')?.src || '',
    dealerName,
    emailId,
    scheduledDate,
    scheduledTime,
    contact
  }
  });
  return {
    title,
    subtitle
  }
  }

