import ctaUtils from "../../utility/ctaUtils.js";
import utility from "../../utility/utility.js";

export default async function decorate(block) {
  const [
    logoImageEl,
    primaryCtaTextEl,
    primaryCtaLinkEl,
    primaryCtaTargetEl,
    secondaryCtaTextEl,
    secondaryCtaLinkEl,
    secondaryCtaTargetEl,
    ...headerItems
  ] = block.children;

  console.log(block);

  let headerItemsHtml = "";

  headerItems.forEach((element) => {
    const [titleEl, scrollClassEl] = element.children;
    const title = titleEl?.querySelector(":is(h1,h2,h3,h4,h5,h6)");
    const scrollCLass = scrollClassEl?.textContent?.trim();
    console.log(scrollCLass);
    let headerItemHtml = `  <div class="brand-header__header-item">
                                ${
                                  title
                                    ? `<div ${
                                        scrollCLass ? "name=" + scrollCLass : ""
                                      } class="brand-header__title">${
                                        title.outerHTML
                                      }</div>`
                                    : ""
                                }
                            </div>
                            `;
    headerItemsHtml += headerItemHtml;
  });
  const primaryCta = ctaUtils.getLink(
    primaryCtaLinkEl,
    primaryCtaTextEl,
    primaryCtaTargetEl,
    "button-primary-light"
  );
  const secondaryCta = ctaUtils.getLink(
    secondaryCtaLinkEl,
    secondaryCtaTextEl,
    secondaryCtaTargetEl,
    "button-secondary-light"
  );

  const image = logoImageEl?.querySelector("picture");
  const img = image.querySelector("img");
  img.removeAttribute("width");
  img.removeAttribute("height");

  let ctaHtml = "";
  if (primaryCta || secondaryCta) {
    ctaHtml = `
                     <div class="brand-header__actions">
                       ${primaryCta ? primaryCta.outerHTML : ""}
                       ${secondaryCta ? secondaryCta.outerHTML : ""}
                     </div>
                   `;
  }

  block.innerHTML = "";
  block.insertAdjacentHTML(
    "beforeend",
    utility.sanitizeHtml(`
                   <div class="brand-header-container container">
                       ${
                         image
                           ? `<div class="brand-header__logo">${image.outerHTML}</div>`
                           : ""
                       }
                       <div class="brand-header__content">
                            <div class="brand-header__items">
                                ${headerItemsHtml}
                            </div>
                       ${ctaHtml}
                       </div>
                   </div>
             `)
  );

  const links = document.querySelectorAll(".brand-header__title");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      const targetClass = this.getAttribute("name");
      const targetElement = targetClass
        ? document.querySelector("." + targetClass)
        : null;
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
  let sticky, navbar;

  // sticky brand header
  window.onscroll = function () {
    console.log(window.scrollY, sticky);
    if (window.pageYOffset >= sticky) {
      navbar?.classList?.add("sticky");
    } else {
      navbar?.classList?.remove("sticky");
    }
  };

  setTimeout(function () {
    navbar = block?.querySelector(".brand-header-container");
    sticky = navbar?.offsetTop;
  }, 3000);
}
