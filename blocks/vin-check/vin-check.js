import utility from '../../utility/utility.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const [
    vinCheckTitleEl,
    vinCheckSubTitleEl,
    chassisInputPlaceholderEl,
    emptyInputMessageEl,
    successMessageEl,
    failureMessageEl,
    checkButtonEl,
    clearButtonEl,
  ] = block.children;
  const vinCheckTitle = vinCheckTitleEl
    ?.querySelector(':is(h1,h2,h3,h4,h5,h6,p')
    ?.textContent?.trim();
  const vinCheckSubtitle = vinCheckSubTitleEl?.textContent?.trim();
  const chassisInputPlaceholder = chassisInputPlaceholderEl?.textContent?.trim();
  const emptyInputMessage = emptyInputMessageEl?.textContent?.trim();
  const successMessage = successMessageEl?.textContent?.trim();
  const failureMessage = failureMessageEl?.querySelector('p')?.innerHTML;
  const checkButtonText = checkButtonEl?.textContent?.trim();
  const clearButtonText = clearButtonEl?.textContent?.trim();

  const { publishDomain, loader1 } = await fetchPlaceholders();

  const vinCheckHTML = `
    <div class="vin-check__container">
  <div class="vin-check__title">${vinCheckTitle}</div>
  <div class="vin-check__subtitle">${vinCheckSubtitle}</div>
  <div class="vin-check__searchBox">
    <div class="vin-check__inputBox">
      <input class="chassis__input" placeholder="${chassisInputPlaceholder}" />
    </div>
    <div class="vin-check__actions">
      <button class="check">${checkButtonText}</button>
      <button class="clear">${clearButtonText}</button>
    </div>
  </div>
  <div class="vin-check__success-message msg">${successMessage}</div>
  <div class="vin-check__failure-message msg">
    ${failureMessage}
  </div>
  <div class="nexa__loader">
    <img src=${publishDomain + loader1} class="nexa__loader_gif" />
  </div>
</div>
    `;

  block.innerHTML = utility.sanitizeHtml(vinCheckHTML);

  const chassisPattern = /^(MA3|MBJ|MBH)[A-Za-z0-9]{14}$/;

  const checkButton = block.querySelector('.check');
  const clearButton = block.querySelector('.clear');
  const chassisInput = block.querySelector('.chassis__input');
  const vinSuccessMessageContainer = block.querySelector(
    '.vin-check__success-message',
  );
  const vinFailureMessageContainer = block.querySelector(
    '.vin-check__failure-message',
  );
  const nexaLoader = block.querySelector('.nexa__loader');

  checkButton.addEventListener('click', () => {
    if (chassisInput.value.trim() === '') {
      // eslint-disable-next-line no-alert
      alert(`${emptyInputMessage}`);
    } else if (chassisPattern.test(chassisInput.value.trim())) {
      nexaLoader.style.display = 'flex';
      setTimeout(() => {
        vinSuccessMessageContainer.style.display = 'block';
        vinFailureMessageContainer.style.display = 'none';
        nexaLoader.style.display = 'none';
      }, 1000);
    } else {
      vinFailureMessageContainer.style.display = 'block';
      vinSuccessMessageContainer.style.display = 'none';
    }
  });

  clearButton.addEventListener('click', () => {
    chassisInput.value = '';
    vinFailureMessageContainer.style.display = 'none';
    vinSuccessMessageContainer.style.display = 'none';
  });

  return block
}
