import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
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

  // Select all columns
  // const columns = footer.querySelectorAll(".link-grid-column");
  const linkGridSection = footer.querySelector(".link-grid-wrapper");
  const contactUsSection = footer.querySelector(
    ".footer-center-section .default-content-wrapper"
  );
  const socialLinks = footer.querySelector(
    ".footer-center-section .contact-wrapper"
  );

  const bottomSection = footer.querySelector(".footer-bottom-section");
  const bottomFirstSection = bottomSection.querySelectorAll(
    ".columns-wrapper > div > div > div"
  );
  const bottomSecondSection = bottomSection.querySelector(
    ".default-content-wrapper"
  );
  contactUsSection.querySelector("p").classList.add("tollfree__element");
  const bottomSectionHtmlText = [];
  bottomFirstSection.forEach((bottomElement) => {
    const pElement = bottomElement.querySelectorAll("p");
    let pElementString = "";
    pElement.forEach((pStr) => {
      pElementString += `<p>${pStr.innerText}</p>`;
    });
    bottomSectionHtmlText.push(pElementString);
  });

  let bottomSecondSectionHtml = '<div class="row">';
  bottomSecondSection.querySelectorAll("p").forEach((bottomElement) => {
    const anchor = bottomElement.querySelector("a");
    if (anchor) {
      bottomSecondSectionHtml += ` <li><a href=${anchor.href}>Terms of use</a></li>`;
    } else {
      bottomSecondSectionHtml += `<div class="col-md-4 footer__copyright-left"><p>${bottomElement.textContent}</p></div><div class="col-md-8 footer__copyright-right"><ul>`;
    }
  });
  bottomSecondSectionHtml += "</ul><div>";

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
  const collapsSection = function () {
    const contactUsSection = block.querySelector(".footer__columns-contact");
    contactUsSection.querySelectorAll("p").forEach((Element) => {
      Element.classList.add("hide__section");
    });
    block.querySelector(".contact").classList.add("hide__section");

    socialLinks.childNodes[0].classList.add("hide__section");

    block
      .querySelector(".link-container-section")
      .querySelectorAll("ul")
      .forEach((Element) => {
        Element.classList.add("hide__section");
      });
  };
  const expandSection = function () {
    const contactUsSection = block.querySelector(".footer__columns-contact");
    contactUsSection.querySelectorAll("p").forEach((Element) => {
      Element.classList.remove("hide__section");
    });
    block.querySelector(".contact").classList.remove("hide__section");
    block
      .querySelector(".link-container-section")
      .querySelectorAll("ul")
      .forEach((Element) => {
        Element.classList.remove("hide__section");
      });
  };
  block.parentElement.classList.add("footer__arena");
  block.innerHTML = `
  <div class="footer" >
      <div class="container">
      ${topSectionHtml}
      <div class="row">
      <div class="col-md-9 footer__columns">
      ${linkGridSection.innerHTML}
      
      </div>
      <div class="col-md-3 footer__columns footer__columns-contact">${contactUsSection.outerHTML}${socialLinks.innerHTML}</div>
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
  const footerSeparatorElemet = block.querySelector(".footer__separator");
  footerSeparatorElemet.addEventListener(
    "click",
    () => {
      if (footerSeparatorElemet.classList.contains("element__expand")) {
        footerSeparatorElemet.classList.remove("element__expand");
        expandSection();
      } else {
        footerSeparatorElemet.classList.add("element__expand");
        collapsSection();
      }
    },
    false
  );

  const accortieanItam = block.querySelectorAll(".accordian-item");

  accortieanItam.forEach((Element) => {
    Element.parentElement
      .querySelector("ul")
      .classList.add("hide__section__mobile");
    Element.classList.add("collaps");
    Element.addEventListener(
      "click",
      () => {
        if (
          Element.parentElement
            .querySelector("ul")
            .classList.contains("hide__section__mobile")
        ) {
          Element.classList.add("expand");
          Element.classList.remove("collaps");
          Element.parentElement
            .querySelector("ul")
            .classList.remove("hide__section__mobile");
        } else {
          Element.classList.add("collaps");
          Element.classList.remove("expand");
          Element.parentElement
            .querySelector("ul")
            .classList.add("hide__section__mobile");
        }
      },
      false
    );
  });
}
