import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import utility from '../../utility/utility.js';

/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/common/footer';
  const fragment = await loadFragment(footerPath);

  // Decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');

  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  const topSection = footer.querySelector('.footer-top-section');

  
  // Getting Middle Section For now  
  const middleSection = footer.querySelector('.footer-center-section');

  function transformArray(arr) {
    // 
    let resultCol = [];
    let defaultCol = [];

    arr.forEach(value => {
        if (value.classList.contains('link-column-wrapper')) {
            if (defaultCol.length > 0 && !(defaultCol[0]?.classList?.contains('link-column-wrapper'))) {
                resultCol.push(defaultCol);
                defaultCol = [];
            }
            defaultCol.push(value);
        } else {
            if (defaultCol.length > 0 && defaultCol[0]?.classList.contains('link-column-wrapper')) {
                resultCol.push(defaultCol);
                defaultCol = [];
            }
            defaultCol.push(value);
        }
    });

    if (defaultCol.length > 0) {
        resultCol.push(defaultCol);
    }

    return resultCol;
  }

  function generateLinkGridHTML(linkColumns){
    const linkColumnHTML = (linkColumns.length > 0) ? linkColumns.map((column) => column.outerHTML).join('') : '';
    return linkColumnHTML || '';
  }

  function getHeadingFromDefaultCol(divElement) {
    const headingSection = divElement?.querySelector('h1, h2, h3, h4, h5, h6');

    if (headingSection) {
      const parentEl= headingSection.parentElement;
      parentEl.removeChild(headingSection);
      headingSection.classList.add('contactUs__Heading');
    }

    return headingSection;
  }

  function processFinalColumns(finalColumns) {
    let result = [];

    finalColumns.forEach(columnGroup => {
        if (columnGroup[0].classList.contains('link-column-wrapper')) {
            // Create HTML for 'link-column-wrapper' divs
            const linkColumnHTML = generateLinkGridHTML(columnGroup);
            result.push(linkColumnHTML);
        } else {
            // Process elements that do not contain 'link-column-wrapper' divs
            const columnHeading = getHeadingFromDefaultCol(columnGroup[0]);
            const columnContent = columnGroup.map(column => column.outerHTML).join('');
            result.push({ heading: columnHeading, content: columnContent });
        }
    });

    return result;
}

  const middleSectionChildren = Array.from(middleSection.children);
  const finalColumns = transformArray(middleSectionChildren);
  const result = processFinalColumns(finalColumns);


  // const linkGridSection = footer.querySelector('.link-grid-wrapper');
  //const linkColumns = Array.from(footer.querySelectorAll('.link-grid-column'));
  //const linkColumnHTML = (linkColumns.length > 0) ? linkColumns.map((column) => column.outerHTML).join('') : '';
  // const contactUsSection = footer.querySelector(
  //   '.footer-center-section .default-content-wrapper',
  // );
  // const socialLinks = footer.querySelector(
  //   '.footer-center-section .contact-wrapper',
  // );
  const bottomSection = footer.querySelector('.footer-bottom-section');
  const bottomFirstSection = bottomSection?.querySelectorAll(
    '.columns-wrapper > div > div > div',
  );
  const bottomSecondSection = bottomSection?.querySelector(
    '.default-content-wrapper',
  );

  // const contactUsHeadingSection = contactUsSection?.querySelector('h3');
  // if (contactUsHeadingSection) {
  //   contactUsSection?.removeChild(contactUsHeadingSection);
  //   contactUsHeadingSection.classList.add('contactUs__Heading');
  // }


  const bottomSectionHtmlText = [];
  bottomFirstSection?.forEach((bottomElement) => {
    const pElement = bottomElement.querySelectorAll('p');
    let pElementString = '';
    pElement.forEach((pStr) => {
      pElementString += `<p>${pStr.innerText}</p>`;
    });
    bottomSectionHtmlText.push(pElementString);
  });

  let bottomFirstSectionHtml = '';
  const columnCount = 2;
  if (bottomSectionHtmlText.length === columnCount) {
    bottomFirstSectionHtml = `
      <div class="row">
        <div class="col-md-7">
          <div class="footer__info-left">
            ${bottomSectionHtmlText[0]}
          </div>
        </div>
        <div class="col-md-5">
          <div class="footer__info-right">
            ${bottomSectionHtmlText[1]}
          </div>
        </div>
      </div>
    `;
  } else {
    bottomFirstSectionHtml = `
      <div class="row">
        <div class="col-md-12">
          <div class="footer__info-left">
            ${(bottomFirstSectionHtml) ? bottomSectionHtmlText[0] : ''}
          </div>
        </div>
      </div>
    `;
  }

  let bottomSecondSectionHtml = '<div class="row centre-align">';
  bottomSecondSection?.querySelectorAll('p')?.forEach((bottomElement) => {
    const anchor = bottomElement.querySelector('a');
    if (anchor) {
      bottomSecondSectionHtml += ` <li><a href=${anchor.href}>${anchor.textContent}</a></li>`;
    } else {
      bottomSecondSectionHtml += `<div class="col-md-3 footer__copyright-left"><p>${bottomElement.textContent}</p></div><div class="col-md-9 footer__copyright-right"><ul>`;
    }
  });
  bottomSecondSectionHtml += '</ul></div>';

  let topSectionHtml = '';
  if (topSection?.innerHTML) {
    topSectionHtml = `
      <div class="row">
        <div class="col-md-12">
          ${topSection.innerHTML}
        </div>
      </div>
    `;
  }

  // Define the external function for the click event
  function accordionClick() {
    const ulElement = this.parentElement.querySelector('ul');
    if (ulElement.classList.contains('hide__section__mobile')) {
      this.classList.add('expand');
      this.classList.remove('collapse');
      ulElement.classList.remove('hide__section__mobile');
    } else {
      this.classList.add('collapse');
      this.classList.remove('expand');
      ulElement.classList.add('hide__section__mobile');
    }
  }

  const collapseSection = () => {
    block.querySelector('.contactUs__section').classList.add('hide__section');
    block
      .querySelector('.link-container-section')
      .querySelectorAll('ul')
      .forEach((element) => {
        element.classList.add('hide__section');
      });
  };

  const expandSection = () => {
    block
      .querySelector('.contactUs__section')
      .classList.remove('hide__section');
    block
      .querySelector('.link-container-section')
      .querySelectorAll('ul')
      .forEach((element) => {
        element.classList.remove('hide__section');
      });
  };

  block.innerHTML = utility.sanitizeHtml(`
    <div class="footer">
      <div class="container">
        ${topSectionHtml}
        <div class="row">
          <div class="col-md-9 footer__columns">
            <div class="link-grid-wrapper">
                <div class="link-container-section">
                  ${result[0] || ''}
                </div>  
            </div>  
          </div>
          <div class="col-md-3 footer__columns footer__columns-contact">
            ${(result[1].heading) ? result[1].heading.outerHTML : 'Contact Us'}
            <div class="contactUs__section hide__section__mobile">
              ${(result[1].content) ? result[1].content  : ''}
             
            </div>
          </div>
          <div class="col-md-12">
            <div class="footer__separator"></div>
          </div>
        </div>
        <!-- Footer info text begins -->
        ${bottomFirstSectionHtml}
        <!-- Footer info text end -->
        <!-- Footer copyright begins -->
        ${bottomSecondSectionHtml}
        <!-- Footer copyright end -->
      </div>
    </div>
  `);

  const footerSeparatorElement = block.querySelector('.footer__separator');
  footerSeparatorElement.addEventListener(
    'click',
    () => {
      if (footerSeparatorElement.classList.contains('element__expand')) {
        footerSeparatorElement.classList.remove('element__expand');
        expandSection();
      } else {
        footerSeparatorElement.classList.add('element__expand');
        collapseSection();
      }
    },
    false,
  );

  const accordionItems = block.querySelectorAll('.accordian-item');
  accordionItems.forEach((element) => {
    element.parentElement
      .querySelector('ul')
      .classList.add('hide__section__mobile');
    element.classList.add('collapse');
    element.addEventListener('click', accordionClick, false);
  });
}
