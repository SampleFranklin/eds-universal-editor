import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';
import ctaUtils from '../../utility/ctaUtils.js';

export default function decorate(block) {
  // Function to extract Nexa World content from the block
  function getNexaWorldContent() {
    const [
      pretitleEl,
      titleEl,
      descriptionEl,
      ctaTextEl,
      ctaLinkEl,
      ctaTargetEl,
       ...linkEls // Get the rest of the elements as link elements
    ] = block.children;

    const pretitle = pretitleEl?.textContent?.trim() || '';
    const title = titleEl?.textContent?.trim() || '';
    const description = Array.from(descriptionEl.querySelectorAll('p')).map(p => p.outerHTML).join('');
    const cta = (ctaLinkEl) ? {
      href: ctaLinkEl.querySelector('a')?.href || '#',
      title: ctaLinkEl.querySelector('a')?.title || '',
      target: ctaLinkEl.querySelector('a')?.target || '_self',
      textContent: ctaTextEl?.textContent?.trim() || ''
    } : null;

    const links = Array.from(linkEls).map(linkEl => ({
      text: linkEl.textContent.trim(),
      href: linkEl.querySelector('a')?.href || '#',
      target: inkEl.querySelector('a')?.target || '_self',
    }));

     // Creating the links section
  const linksContainer = document.createElement('div');
  linksContainer.classList.add('nexa-world__links');

  const ul = document.createElement('ul');

  // Process each link element to create the CTA links
  linkEls.slice(0, 4).forEach(linkEl => {
    const li = document.createElement('li');

    const ctatext = linkEl.querySelector('.ctatext')?.textContent.trim() || '';
    const ctalink = linkEl.querySelector('.ctalink')?.href || '#';
    const ctatarget = linkEl.querySelector('.ctalink')?.target || '_self';
    const iconSrc = linkEl.querySelector('.icon')?.src || 'default-icon.jpg';
    const hoverIconSrc = linkEl.querySelector('.icon')?.dataset.hoverIcon || 'hover-icon.jpg';
    const a = document.createElement('a');
    a.href = ctalink;
    a.classList.add('cta-link');
    a.setAttribute('target', ctatarget);
    a.setAttribute('data-hover-icon', hoverIconSrc);
    a.setAttribute('data-default-icon', iconSrc);

    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.classList.add('cta-icon');

    const span = document.createElement('span');
    span.classList.add('cta-text');
    span.textContent = ctatext;

    a.appendChild(icon);
    a.appendChild(span);
    li.appendChild(a);
    ul.appendChild(li);
  });

  linksContainer.appendChild(ul);


    

    return {
      pretitle,
      title,
      description,
      cta,
      links
    };
  }

  // Get Nexa World content from the block
  const nexaWorldContent = getNexaWorldContent();

  // Construct CTA with icon
  const ctaWithIconHtml = `
    <div class="nexa-world__action">
      <a href="${nexaWorldContent.cta?.href || '#'}" title="${nexaWorldContent.cta?.title || ''}" class="button btn-title" target="${nexaWorldContent.cta?.target || '_self'}">
        <p>${nexaWorldContent.cta?.textContent}</p>
        <span class="location-icon"><img src="/content/dam/nexa-world/north_east.svg" alt="Image arrow"></span>
      </a>
    </div>`;

  // Construct Nexa World HTML structure
  const nexaWorldHtml = `
    <div class="nexa-world__content">
      <div class="nexa-world__title">
        ${nexaWorldContent.pretitle ? `<p class="pre-title">${nexaWorldContent.pretitle}</p>` : ''}
        ${nexaWorldContent.title ? `<p class="title">${nexaWorldContent.title}</p>` : ''}
      </div>
      ${nexaWorldContent.description ? `<p class="description">${nexaWorldContent.description}</p>` : ''}
      ${ctaWithIconHtml}
    </div>`;
    const ul =document.createElement('ul');
    ul.classList.add("list-container");
    nexaWorldContent.links.forEach(link => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.text;

      listItem.appendChild(anchor);
      ul.appendChild(listItem);
    });
     // Create the teaser HTML structure
  const nexaWorldTeaser = `
  <div class="nexa-world__teaser">
    <div class="nexa-world__links">
      ${ul.outerHTML}
    </div>
    <div class="nexa-world__img">
      <img src="/content/dam/nexa-world/Group%201321315474.png" alt="image" />
    </div>
  </div>`;

  //create Html for ctawithicon

  <div class="cta-container">
        ${ctaData.map(cta => `
          <div class="cta-wrapper">
            <a href="${cta.link}" class="cta-link" target="${cta.target}" data-hover-icon="${cta.hoverIcon}" data-default-icon="${cta.icon}">
              <img src="${cta.icon}" class="cta-icon" alt="icon">
              <span class="cta-text">${cta.text}</span>
            </a>
          </div>
        `).join('')}
      </div>

// Replace the block's HTML with the constructed Nexa World HTML and teaser if present
block.innerHTML = `
  <div class="nexa-world__container">
    ${nexaWorldHtml}
    ${nexaWorldTeaser}
  </div>`;

// Add event listeners to links to change the image on hover
document.addEventListener('DOMContentLoaded', function() {
  const linksList = block.querySelectorAll('.nexa-world__links li');
  const imgElement = block.querySelector('.nexa-world__img img');

  linksList.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const imgSrc = link.getAttribute('data-img');
      imgElement.setAttribute('src', imgSrc);
    });

    link.addEventListener('mouseleave', () => {
      imgElement.setAttribute('src', '/content/dam/nexa-world/Group%201321315474.png');
    });
  });
});


// Call the function to decorate the block
document.addEventListener('DOMContentLoaded', () => {
const blocks = document.querySelectorAll('.nexa-world-component'); // Replace with the actual block class name
blocks.forEach(decorate);
});
}

 

