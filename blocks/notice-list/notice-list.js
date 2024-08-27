export default function decorate(block) {
    const [titleEl, ...noticesEl] = block.children;

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

   

    block.innerHTML = `
        <div id="container1" class="container">
            <h2>${compTitle}</h2>
            ${listOfNotice}
        </div>

        <div id="container2" class="container hidden">
            ${noticesBody}
        </div>

        <div id="container3" class="container hidden">
            <h2>Container 3</h2>
            <p>This is the content of Container 3.</p>
            <button  id="backButton2">Back</button>
        </div>
    `;

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
}
