import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";
// import svg from "../../icons/chevron_left.svg";

const list = [];
const currentURL = window.location.href;
const isNexa = currentURL.includes("nexa");

function toggleMenu() {
  const x = document.getElementById("menu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function toggleCarMenu() {
  const x = document.getElementById("carPanel");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata("nav");
  const navPath = navMeta
    ? new URL(navMeta, window.location).pathname
    : "/common/nav";
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = "";
  const nav = document.createElement("nav");
  nav.id = "nav";
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  Array.from(nav.querySelectorAll(".nav-link")).forEach((el) => {
    const heading = el.querySelector("h2");
    const icon = el.querySelector(".icon");
    const iconClicked = el.querySelector(".iconClicked");
    const content = el.querySelector(".link-grid-wrapper");
    const teaser = el.querySelector(".teaser-wrapper");

    list.push({
      heading: heading?.textContent,
      icon: icon?.innerHTML,
      iconClicked: iconClicked?.innerHTML,
      content: content?.innerHTML,
      teaser: teaser?.innerHTML,
    });
  });
  const logo = nav.querySelector(".logo-wrapper");
  const carIcon = nav.querySelector(".nav-cars-container .icon").innerHTML;
  console.log({ list }, nav, logo);
  // hamburger for mobile

  const desktopHeader = `
    <div class="navbar ${isNexa && "navbar-nexa"}">
      <div class="nav-hamburger ${isNexa && "nav-hamburger-nexa"}">
      <button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>
    </div>
      ${logo.outerHTML}
      <div class="links"></div>
      <div class="right">
        <div class="location">Gurgaon &#9662;</div>
        ${!isNexa ? `<div class="language">EN &#9662;</div>` : ''}
        <img src="../../icons/account_circle.svg" alt="user" />
      </div>
      <div class="car">${carIcon}</div>
      <div class="car-panel" id="carPanel">car</div>
    </div>
  `;

  const mobileHeader = `
    <div id="menu" class="menu ${isNexa && "menu-nexa"}">
      <div class="menu-header ${isNexa && "menu-header-nexa"}">
        <div class="back-arrow"><img src="../../icons/chevron_left.svg" alt="back" /></div>
        <span class="menu-title">Menu</span>
        <span class="close-icon"><img src="../../icons/close.svg" alt="close" /></span>
      </div>
      <ul class="menu-list"></ul>
    </div>
  `;
  const navWrapper = document.createElement("div");
  navWrapper.innerHTML = desktopHeader + mobileHeader;

  block.append(navWrapper);
  const navHamburger = document.querySelector(".nav-hamburger");
  const backArrow = document.querySelector(".back-arrow");
  const closeIcon = document.querySelector(".close-icon");
  const caricon = document.querySelector(".navbar .car");
  [navHamburger, backArrow, closeIcon].forEach(element => {
    element.addEventListener("click", toggleMenu);
  });
  
  caricon.addEventListener("click", toggleCarMenu);

  list.forEach((el, i) => {
    const linkEl = document.querySelector(".links");
    const menuList = document.querySelector(".menu-list");
    linkEl.innerHTML += `<div class="link-title"><span>${el.heading}</span></div> ${el.content || el.teaser ? `<div class="desktop-panel panel ${el.heading.toLowerCase()}">${el.content || ''}${el.teaser || ''}</div>` :''}`;
    if (i === 0) return;
    menuList.innerHTML += `<li id="menu-item-${i}" class="${el.content ?'accordion nav-link':''} ${el.heading.toLowerCase()}" ><span class="icon">${el.icon}</span> <span class="menu-title">${el.heading}</span></li>
    ${el.content || el.teaser ? `<div class="panel">${el.content || ''}${el.teaser || ''}</div>` :''}
    `;
  });

  const acc = document.getElementsByClassName("accordion");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
