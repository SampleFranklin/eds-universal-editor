import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/common/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const topSection = footer.querySelector('.footer-top-section .default-content-wrapper');
  const linkGridSection = footer.querySelector('.footer-center-section .link-grid');
  const contactUsSection = footer.querySelector('.footer-center-section .default-content-wrapper');
  const socialLinks = footer.querySelector('.footer-center-section .contact-wrapper');
  const bottomSection = footer.querySelector('.footer-bottom-section');

  const disclaimerSection = bottomSection?.querySelector('.columns div');
  for (let i = 0; i < disclaimerSection?.children?.length; i++) {
    disclaimerSection.children.item(i).classList.add(
      'col-lg-6', `footer__info-`
    );
  }

  const brandSectionTitle = bottomSection?.querySelector('.default-content-wrapper p:not(.button-container)');
  const brandSectionLinks = document.createElement('div');
  bottomSection?.querySelectorAll('.default-content-wrapper a')?.forEach(item => brandSectionLinks.append(item));

  let topSectionHtml = '';
  if (topSection?.innerHTML) {
    topSectionHtml = `
      <div class="row">
        ${topSection.innerHTML}
      </div>
    `;
  }

  let linkGridSectionHtml = "";
  if (linkGridSection?.innerHTML) {
    linkGridSectionHtml = `
      ${linkGridSection.innerHTML}
    `;
  }

  let contactUsSectionHtml = "";
  if (contactUsSection?.innerHTML) {
    contactUsSectionHtml = `
      <div class="contact-us-section">
        ${contactUsSection.innerHTML}
        ${(socialLinks.innerHTML) ? socialLinks.innerHTML : '' }
      </div>
    `;
  }

  let centerSectionHtml = "";
  if(linkGridSectionHtml || contactUsSectionHtml) {
    centerSectionHtml = `
      <div class="row">
        ${linkGridSectionHtml}
        ${contactUsSectionHtml}
      </div>
    `;
  }

  let disclaimerSectionHtml = "";
  if(disclaimerSection?.innerHTML) {
    disclaimerSectionHtml = `
        ${disclaimerSection.innerHTML}
    `;
  }

  let brandSectionHtml = "";
  if(brandSectionTitle?.innerHTML || brandSectionLinks?.innerHTML) {
    brandSectionHtml = `
      <div class="brand-section">
        <div class="brand-name">
          ${brandSectionTitle?.innerHTML || ""}
        </div>
        <div class="brand-links">
          ${brandSectionLinks?.innerHTML || ""}
        </div>
      </div>
    `;
  }

  let bottomSectionHtml = "";
  if(disclaimerSectionHtml || brandSectionHtml) {
    bottomSectionHtml = `
      <div class="section footer-bottom-section">
        ${disclaimerSectionHtml}
        ${brandSectionHtml}
      </div>
    `;
  }

  block.innerHTML = `
  <div class="container">
    ${topSectionHtml}
    ${centerSectionHtml}
    ${bottomSectionHtml}
  </div>
  `;
}
