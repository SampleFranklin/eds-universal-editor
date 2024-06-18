import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  //load footer as fragment
  const footerMeta = getMetadata("footer");
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/common/footer";
  const fragment = await loadFragment(footerPath);
  // decorate footer DOM
  block.textContent = "";
  const footer = document.createElement("div");
  // Create footer element with class "footer"

  const topSection = fragment.firstElementChild;
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  console.log(footer, "...........................foooter");

  // Select all columns
  // const columns = footer.querySelectorAll(".link-grid-column");
  const linkGridSection = footer.querySelector(".link-grid-wrapper");
  const contactUsSection = footer.querySelector(
    ".footer-center-section .default-content-wrapper"
  );
  const socialLinks = footer.querySelector(
    ".footer-center-section .contact-wrapper"
  );
  const contactWrapper = socialLinks.querySelector(
    ".contact-wrapper .contact div div p"
  );
  const bottomSection = footer.querySelector(".footer-bottom-section");
  const bottomFirstSection = bottomSection.querySelectorAll(
    ".columns-wrapper > div > div > div"
  );
  const bottomSecondSection = bottomSection.querySelector(
    ".default-content-wrapper"
  );
  console.log(socialLinks, "Soical Link");
  // const socialLinksHeading = contactWrapper.textContent || "";

  // const socialSection = socialLinks.querySelectorAll(".contact > div");
  // let socialLinksHtml = "";
  // socialLinksHtml = `<h3 class="footer__link__title">${socialLinksHeading}</h3> <ul class="footer__links footer__social__links">`;
  // socialSection.forEach((Element) => {
  //   if (Element.querySelector("picture")) {
  //     const anchor = Element.querySelector("a");
  //     const headingText = Element.querySelector("p");
  //     socialLinksHtml += `<li class="footer__social__link"><a href=${
  //       anchor.href
  //     } title=${headingText.textContent}>${
  //       Element.querySelector("picture").innerHTML
  //     }</a></li>`;
  //   }
  // });
  // socialLinksHtml += `</ul>`;

  // Initialize the array to hold the results
  // const storeColumns = [];
  // let finalColumnElemet = `<div class="row">`;

  // // Loop through each column
  // columns.forEach((column) => {
  //   // Get the heading text
  //   finalColumnElemet += `<div class="col-lg-2 footer__columns">`;
  //   const heading = column.querySelector("h3").textContent || "";
  //   if (heading != "") {
  //     finalColumnElemet += `<h3 class="footer__link__title">${heading}</h3>`;
  //   }
  //   finalColumnElemet += `<ul class="footer__links">`;

  //   // Select all <a> elements within the current column
  //   const anchorElements = column.querySelectorAll("ul.button-container li a");

  //   // Initialize an array to hold the <a> elements for the current column
  //   const linksArray = [];

  //   // Loop through each <a> element and store its details

  //   anchorElements.forEach((anchor) => {
  //     finalColumnElemet += `<li class="footer__link"><a href=${
  //       anchor.href
  //     } target="_blank" aria-label=${anchor.getAttribute("aria-label")}>${
  //       anchor.textContent
  //     }</a></li>`;
  //     linksArray.push({
  //       href: anchor.href,
  //       text: anchor.textContent,
  //       ariaLabel: anchor.getAttribute("aria-label"),
  //     });
  //   });
  //   finalColumnElemet += `</ul></div>`;
  //   // Push the heading and its associated links into the result array
  //   storeColumns.push({
  //     heading: heading,
  //     links: linksArray,
  //   });
  // });
  // finalColumnElemet += `<div class="col-lg-2 footer__columns">${contactUsSection.innerHTML}${socialLinksHtml}</div></div>`;

  console.log(bottomSection, ".............................bottomSection");
  console.log(
    bottomFirstSection,
    ".............................bottomFirstSection"
  );
  let bottomSectionHtmlText = [];
  bottomFirstSection.forEach((bottomElement) => {
    const pElement = bottomElement.querySelectorAll("p");
    let pElementString = ``;
    pElement.forEach((pStr) => {
      pElementString += `<p>${pStr.innerText}</p>`;
    });
    bottomSectionHtmlText.push(pElementString);
  });

  console.log(bottomSecondSection);
  let bottomSecondSectionHtml = `<div class="row">`;
  bottomSecondSection.querySelectorAll("p").forEach((bottomElement) => {
    const anchor = bottomElement.querySelector("a");
    if (anchor) {
      bottomSecondSectionHtml += ` <li><a href=${anchor.href}>Terms of use</a></li>`;
    } else {
      bottomSecondSectionHtml += `<div class="col-md-4 footer__copyright-left"><p>${bottomElement.textContent}</p></div><div class="col-md-8 footer__copyright-right"><ul>`;
    }
  });
  bottomSecondSectionHtml += `</ul><div>`;
  console.log(bottomSecondSectionHtml);
  let topSectionHtml = "";
  if (topSection?.innerHTML) {
    topSectionHtml = `
      <div class="row">
      <div class="col-md-12">
        ${topSection.innerHTML}
        </div>
      </div>
    `;
  }
  block.innerHTML = `
  <div class="footer" >
      <div class="container">
      ${topSectionHtml}
      <div class="row">
      <div class="col-md-10 footer__columns">
      ${linkGridSection.innerHTML}
      
      </div>
      <div class="col-md-2 footer__columns footer__columns-contact">${contactUsSection.outerHTML}${socialLinks.innerHTML}</div>
      <div class="col-md-12">
      <div class="footer__separator"></div>
      </div>
      </div>
      
        <!-- footer info text begins -->
        <div class="row">
          <div class="col-md-6">
            <div class="footer__info-left">
              ${bottomSectionHtmlText[0]}
            </div>
          </div>

          <div class="col-md-6">
            <div class="footer__info-right">
            ${bottomSectionHtmlText[1]}
            </div>
          </div>
        </div>
        <!-- footer info text end -->
        <!-- footer__copyright begins -->
       ${bottomSecondSectionHtml}
        <!-- footer__copyright end -->
      </div>
        
      </div>
    </div>
  `;
}
