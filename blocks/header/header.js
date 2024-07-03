import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

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

function toggleUserDropdown() {
  const navRight = document.getElementById("nav-right");
  const x = navRight.querySelector('.sign-in-wrapper')
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
   Array.from(nav.querySelectorAll('nav > div.section:not(:first-child):not(:last-child)')).forEach((el) => {
      const heading = el.querySelector('.icontitle :is(h1,h2,h3,h4,h5,h6)');
      const icon = el.querySelector(".icon");
      const iconClicked = el.querySelector(".iconClicked");
      const [content] = Array.from(el.children).slice(1);
      const teaser = el.querySelector(".teaser-wrapper");

      list.push({
        heading: heading?.textContent,
        icon: icon?.innerHTML,
        iconClicked: iconClicked?.innerHTML,
        content: content,
        teaser: teaser,
      });
    });
  const logo = nav.querySelector(".logo-wrapper");
  const carIcon = nav.children[1].querySelector(".icon").innerHTML;
  const user__dropdownDiv = nav.querySelector('.sign-in-wrapper .user__dropdown');
  const contact = nav.querySelector('.contact-wrapper');
  user__dropdownDiv.append(contact);
  const userDropdown = nav.querySelector('.sign-in-wrapper')
  const userAccountLinkItems = user__dropdownDiv.querySelectorAll('.user__account>a')
  const signInTeaser = nav.querySelector('.sign-in-teaser'); 
  const locationHtml=nav.querySelector('.location-wrapper');
  
  const desktopHeader = `
    <div class="navbar ${isNexa ? "navbar-nexa" : "navbar-arena"}">
      <div class="nav-hamburger ${isNexa && "nav-hamburger-nexa"}">
      <button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>
    </div>
      ${logo.outerHTML}
      <div class="links"></div>
      <div class="right" id="nav-right">
        ${!isNexa ? `<div class="language">EN &#9662;</div>` : ''}
        <img id="user-img" src="../../icons/${isNexa ? 'account_circle': 'user'}.svg" alt="user" />
        ${userDropdown.outerHTML}
      </div>
      <div class="car">${carIcon}</div>
      <div class="car-panel" id="carPanel">car</div>
    </div>
  `;

  const mobileHeader = `
    <div id="menu" class="menu ${isNexa ? "menu-nexa" : "menu-arena"}">
      <div class="menu-header ${isNexa && "menu-header-nexa"}">
        <div class="back-arrow"><img src="../../icons/${isNexa ? 'chevron_left_white' : 'chevron_left'}.svg" alt="back" /></div>
        <span class="menu-title">Menu</span>
        <span class="close-icon"><img src="../../icons/${isNexa ? 'close_white' : 'close'}.svg" alt="close" /></span>
      </div>
      <ul class="menu-list"></ul>
    </div>
  `;
  const navWrapper = document.createElement("div");
  navWrapper.innerHTML = desktopHeader + mobileHeader;
  navWrapper.querySelector('.right').insertAdjacentElement("beforebegin",locationHtml);

  block.append(navWrapper);
  const navHamburger = document.querySelector(".nav-hamburger");
  const backArrow = document.querySelector(".back-arrow");
  const closeIcon = document.querySelector(".close-icon");
  const caricon = document.querySelector(".navbar .car");
  [navHamburger, backArrow, closeIcon].forEach(element => {
    element.addEventListener("click", toggleMenu);
  });
  
  caricon.addEventListener("click", toggleCarMenu);
  document.querySelector('#user-img').addEventListener("click", ()=>toggleUserDropdown());
  
  const linkEl = document.querySelector(".links");
  const menuList = document.querySelector(".menu-list");

  if (isNexa) menuList.innerHTML += `<li>${signInTeaser.outerHTML}</li>`

  list.forEach((el, i) => {
    const linkTitle = document.createElement("div");
    const desktopPanel = document.createElement("div");
    const heading = document.createElement("span");
    linkTitle.classList.add("link-title");
    heading.textContent = el.heading;
    linkTitle.append(heading);
    desktopPanel.classList.add("desktop-panel","panel", el.heading?.split(' ')[0].toLowerCase());
    if(el.content) desktopPanel.append(el.content);
    if(el.teaser) desktopPanel.append(el.teaser);
    linkEl.append(linkTitle, desktopPanel);
    // linkEl.innerHTML += `<div class="link-title"><span>${el.heading}</span></div> ${el.content || el.teaser ? `<div class="desktop-panel panel ${el.heading.toLowerCase()}">${el.content || ''}${el.teaser || ''}</div>` :''}`;
    if (i === 0) return;
    // const menuItem = document.createElement("li");
    // menuItem.id = `menu-item-${i}`;
    // if (el.content) menuItem.classList.add("accordion", "nav-link");
    // menuItem.classList.add(el.heading.split(' ')[0].toLowerCase())
    // const icon = document.createElement("span");
    // icon.classList.add("icon");
    // icon.innerHTML = el.icon;
    // const menuTitle = document.createElement("span");
    // menuTitle.classList.add("menu-title");
    // menuTitle.textContent = el.heading;
    // menuItem.append(icon, menuTitle);
    // const panel = document.createElement("div");
    // panel.classList.add("panel");
    // if (el.content) panel.append(el.content);
    // if (el.teaser) panel.append(el.teaser);
    // menuList.append(menuItem, panel);
    menuList.innerHTML += `<li id="menu-item-${i}" class="${el.content ?'accordion nav-link':''} ${el.heading?.toLowerCase()}" ><span class="icon">${el.icon}</span> <span class="menu-title">${el.heading}</span></li>
    ${el.content || el.teaser ? `<div class="panel">${el.content || ''}${el.teaser || ''}</div>` :''}
    `;
  });
  (isNexa
    ? Array.from(userAccountLinkItems).slice(1)
    : userAccountLinkItems
  ).forEach((el) => {
    menuList.innerHTML += `<li>${el.outerHTML}</li>`;
  });

  menuList.innerHTML += `<li>${contact.outerHTML}</li>`

  const acc = document.getElementsByClassName("accordion");
  
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function (e) {
      this.classList.toggle("active");
      const index = parseInt(this.getAttribute('id').split("-")[2]);
      const menuListIconWrapper = this.querySelector(".icon");
      const menuListTitle = this.querySelector(".menu-title");
      const { icon, iconClicked } = list[index];
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        menuListIconWrapper.innerHTML = icon;
        menuListTitle.classList.remove('menu-title-clicked')
        panel.style.maxHeight = null;
      } else {
        menuListIconWrapper.innerHTML = iconClicked;
        menuListTitle.classList.add('menu-title-clicked')
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
