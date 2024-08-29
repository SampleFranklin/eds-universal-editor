export default function decorate(block) {
    const blockClone = block.cloneNode(true);
    const [titleEl, ...noticesEl] = blockClone.children;

    const componentSeparator = titleEl.querySelector('p')?.textContent?.trim() || "";
    const compTitle = titleEl.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim() || "";

    const notices = noticesEl.map(notice => {
        const [listTitleEl, isNewEl, titleEl, descEl, cta1El, cta2El] = notice.children;

        return {
            listTitle: listTitleEl?.textContent?.trim() || "",
            isNew: isNewEl?.textContent?.trim() || "",
            title: titleEl?.textContent?.trim() || "",
            descEl: descEl?.innerHTML || "", 
            cta1: cta1El?.textContent?.trim() || "",
            cta2: cta2El?.textContent?.trim() || ""
        };
    });

    const listOfNotice = notices.map((notice, index) => `
        <p>
            <a href="#" data-index="${index}">${notice.listTitle} ${notice.isNew}</a>
        </p>
    `).join('');

    const noticesBody = notices.map((notice, index) => `
        <div id="description${index}" class="description hidden">
            <h4>${notice.title}</h4>
            ${notice.descEl}
            <button id="backButton">${notice.cta1}</button>
            <button id="container3Button">${notice.cta2}</button>
        </div>
    `).join('');

   
    transformHTML(block,noticesBody);

    block.innerHTML = `
        <p>${componentSeparator}</p>
        <h2>${compTitle}</h2>
        ${listOfNotice}`;

    const links = document.querySelectorAll("#container1 a");
    
    
   
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const index = this.getAttribute("data-index");
            showDescription(index);
        });
    });

  
    document.querySelectorAll("#backButton").forEach(btn => {
        btn.addEventListener("click", showContainer1);
    })
    document.querySelectorAll("#container3Button").forEach(btn => {
        btn.addEventListener("click", showContainer3);
    })
    document.querySelectorAll("#backButton2").forEach(btn => {
        btn.addEventListener("click", showContainer1);
    })
   


function showDescription(index) {
    const parentElement = block.parentElement.parentElement;
    const siblings = Array.from(parentElement.children).filter(child => child !== block.parentElement);

    siblings.forEach(block => block.classList.add('hidden'));
    document.getElementById('container1').classList.add('hidden');
    document.getElementById('container2').classList.remove('hidden');

    
    let descriptions = document.getElementsByClassName('description');
    for (let i = 0; i < descriptions.length; i++) {
        descriptions[i].classList.add('hidden');
    }

    
    document.getElementById(`description${index}`).classList.remove('hidden');
}

function showContainer1() {
    const parentElement = block.parentElement.parentElement;
    const siblings = Array.from(parentElement.children).filter(child => child !== block.parentElement);

    siblings.forEach(block => block.classList.remove('hidden'));
    document.getElementById('container1').classList.remove('hidden');
    document.getElementById('container2').classList.add('hidden');
    document.getElementById('container3').classList.add('hidden');
}

function showContainer3() {
    document.getElementById('container2').classList.add('hidden');
    document.getElementById('container3').classList.remove('hidden');
}

function transformHTML(noticeListBlock, container2Items) {
    // Get the parent element which is the initial container
    const originalContainer = noticeListBlock.closest('.section');

    // Create new containers
    const container1 = document.createElement('div');
    container1.id = 'container1';
    container1.className = 'container';

    const container2 = document.createElement('div');
    container2.id = 'container2';
    container2.className = 'container hidden';
    container2.innerHTML = container2Items;


    const container3 = document.createElement('div');
    container3.id = 'container3';
    container3.className = 'container hidden';

    // Get all child elements of the original container
    const childElements = Array.from(originalContainer.children);

    // Append all children except the last one to container1
    for (let i = 0; i < childElements.length - 1; i++) {
        container1.appendChild(childElements[i]);
    }

    // Get the last child element
    const lastChild = childElements[childElements.length - 1];

    // Append the last child if it's not the notice list block
    if (lastChild !== noticeListBlock) {
        container3.innerHTML='<button id="backButton2">BACK</button>';
        container3.appendChild(lastChild);
    }

    // If the last child is the notice list block, append it to container1
    if (lastChild === noticeListBlock) {
        container1.appendChild(lastChild);
    }

    // Clear the original container and append the new containers
    while (originalContainer.firstChild) {
        originalContainer.removeChild(originalContainer.firstChild);
    }

    originalContainer.appendChild(container1);
    originalContainer.appendChild(container2);
    originalContainer.appendChild(container3);
}
}
