import vinCheckDecorate from '../vin-check/vin-check.js';

export default async function decorate(block) {
  function keepOnlyFirstDivInNotices(noticesElClone) {
    noticesElClone.forEach((notice, index) => {
      const divs = notice.querySelectorAll('div');

      divs.forEach((div, divIndex) => {
        if (divIndex > 0) {
          div.remove();
        } else if (divIndex === 0) {
          const pElement = div.querySelector('p');
          if (pElement) {
            pElement.classList.add('notice_list-title');

            const secondDiv = notice.querySelectorAll('div')[1];
            const secondDivText = (secondDiv?.textContent) ? `<span>${secondDiv?.textContent.trim()}</span>` : '';

            const aElement = document.createElement('a');
            aElement.href = '#';
            aElement.innerHTML = `${pElement.textContent || ''} ${secondDivText} `;
            aElement.setAttribute('data-index', index);

            pElement.innerHTML = '';
            pElement.append(aElement);
          }
        }
      });
    });

    return noticesElClone;
  }

  function emptyContainer3() {
    const container3 = block.querySelector('#container3');
    container3.innerHTML = '';
    return container3;
  }

  function showcontainer2() {
    const { parentElement } = block.parentElement;
    const siblings = Array.from(parentElement.children)
      .filter((child) => child !== block.parentElement);
    siblings.forEach((siblingBlock) => siblingBlock.classList.remove('hidden'));

    block.querySelector('#container1').classList.add('hidden');
    block.querySelector('#container3').classList.add('hidden');
    block.querySelector('#container2').classList.remove('hidden');
  }

  function showcontainer1(submitLink) {
    const submitBtn = block.querySelector('#container1 .check');
    submitBtn.setAttribute('submit-link', submitLink);

    block.querySelector('#container3').classList.add('hidden');
    block.querySelector('#container1').classList.remove('hidden');
  }

  const [comptitleEl, vinCheckEL, ...noticesEl] = block.children;

  const compSeparator = comptitleEl?.querySelector('p') || '';
  compSeparator.classList.add('comp-separator');

  const componentHeading = comptitleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)') || '';
  componentHeading.classList.add('comp-heading');

  const noticesElClone = Array.from(noticesEl).map((notice) => {
    const noticeClone = notice.cloneNode(true);
    return noticeClone;
  });
  const alteredNoticesEL = keepOnlyFirstDivInNotices(noticesElClone);
  const listTiltleHTML = alteredNoticesEL.map((notice) => notice.outerHTML).join('');

  const noticesDetails = noticesEl.map((notice) => {
    const [listTitleEl,
      isNewEl,
      titleEl,
      descEl,
      cta1El,
      cta2El] = notice.children;
    return {
      listTitle: listTitleEl?.textContent?.trim() || '',
      isNew: isNewEl?.textContent?.trim() || '',
      title: titleEl?.textContent?.trim() || '',
      descEl: descEl?.innerHTML || '',
      cta1: cta1El?.textContent?.trim() || '',
      cta2: cta2El?.textContent?.trim() || '',
    };
  });

  await vinCheckDecorate(vinCheckEL);

  block.innerHTML = `
        <div id="container1" class="container hidden">
            <button  id="backButton2">Back</button>    
        </div>

        <div id="container2" class="container">
            <div class="notice-list__heading_container">
                ${compSeparator?.outerHTML || ''}
                ${componentHeading?.outerHTML || ''}
            </div>
            
            <div class="notice-list__list_container">
                ${listTiltleHTML}  
            </div>
        </div>
        
        <div id="container3" class="container hidden">
        </div>`;

  function showDescription(index) {
    const { parentElement } = block.parentElement;
    const siblings = Array.from(parentElement.children)
      .filter((child) => child !== block.parentElement);
    siblings.forEach((siblingBlock) => siblingBlock.classList.add('hidden'));

    block.querySelector('#container2').classList.add('hidden');

    const notice = noticesDetails[index];
    const noticeHTML = `
            <div id="description${index}" class="description">
                <button id="backButton">${notice.cta1}</button>
                <h4>${notice.title}</h4>
                ${notice.descEl}
                <button id="checkHereBtn" data-submit-link="${index}">${notice.cta2}</button>
            </div>`;

    const container3 = emptyContainer3();
    container3.innerHTML = noticeHTML;
    container3.querySelector('#backButton').addEventListener('click', () => {
      emptyContainer3();
      showcontainer2();
    });
    container3.querySelector('#checkHereBtn').addEventListener('click', (event) => {
      event.preventDefault();
      const subLink = event.currentTarget.getAttribute('data-submit-link');
      emptyContainer3();
      showcontainer1(subLink);
    });
    container3.classList.remove('hidden');
  }

  const links = block.querySelectorAll('#container2 a');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const index = event.currentTarget.getAttribute('data-index');
      showDescription(index);
    });
  });

  block.querySelectorAll('#backButton2').forEach((btn) => {
    btn.addEventListener('click', showcontainer2);
  });

  const container1 = block.querySelector('#container1');
  container1.append(vinCheckEL);
}
