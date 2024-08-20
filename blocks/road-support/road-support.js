import utility from '../../utility/utility.js';

export default function decorate(block) {
  const [
    titleEl,
    contactEl1,
    contactEl2,
    contactIcon,
    contactIconMobile,
    textEls,
  ] = block.children;
  const titleElement = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
  titleElement?.classList?.add('road-support-title');
  const contactElText1 = contactEl1?.querySelector('p')?.textContent?.trim();
  const contactElText2 = contactEl2?.querySelector('p')?.textContent?.trim();
  const callIcon = contactIcon?.querySelector('img');
  const callIconMobile = contactIconMobile?.querySelector('img');
  callIconMobile?.classList?.add('call-icon-mob');

  const aElement = document.createElement('a');
  aElement.href = `tel:${contactElText1}`;
  aElement.textContent = contactElText1;

  const newHtml = `
          <div class="title-container">
            ${titleElement?.outerHTML}
          </div>
          <div class="contact-container flex">
            <div class="contact-box">
                ${callIcon?.outerHTML}
            </div>
            <div class="contact-box">
               <a href="tel:${contactElText1}"> ${contactElText1}</a>
                ${callIconMobile?.outerHTML}
            </div>
            <div class="contact-box">
               <a href="tel:${contactElText2}"> ${contactElText2}</a>
                ${callIconMobile?.outerHTML}
            </div>
          </div>
          <div class="description-container">${textEls?.innerHTML}</div>
      `;

  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', utility.sanitizeHtml(newHtml));
}