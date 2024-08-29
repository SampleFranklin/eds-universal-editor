export default function decorate(block) {

    function keepOnlyFirstDivInNotices(noticesElClone) {
        // Iterate over each element in noticesElClone
        noticesElClone.forEach((notice, index) => {
            // Find all div elements within the current notice
            const divs = notice.querySelectorAll('div');

            // Iterate over the divs, keep the first one, and remove the rest
            divs.forEach((div, divIndex) => {
                if (divIndex > 0) {
                    div.remove();
                } else if (divIndex === 0) {
                    const pElement = div.querySelector('p');
                    if (pElement) {
                        pElement.classList.add('notice_list-title');

                        const secondDiv = notice.querySelectorAll('div')[1];
                        const secondDivText = (secondDiv?.textContent) ? `<span>${secondDiv?.textContent.trim()}</span>` : '';

                        const aElement = document.createElement('a');
                        aElement.href = '#';
                        aElement.innerHTML = `${pElement.textContent || ''} ${secondDivText} `;
                        aElement.setAttribute('data-index', index);

                        pElement.innerHTML = "";
                        pElement.append(aElement);

                    }
                }
            });
        });

        return noticesElClone;
    }



    const [titleEl, ...noticesEl] = block.children;

    const titleELClone = titleEl.cloneNode(true);
    const noticesElClone = Array.from(noticesEl).map((notice) => {
        let noticeClone = notice.cloneNode(true);
        return noticeClone;
    });

    const noticesDetails = noticesEl.map(notice => {
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

    const allNoticesHTML = noticesDetails.map((notice, index) => `
        <div id="description${index}" class="description hidden">
            <button id="backButton">${notice.cta1}</button>
            <h4>${notice.title}</h4>
            ${notice.descEl}
            <button id="containerr3Button">${notice.cta2}</button>
        </div>
    `).join('');

    let alteredNoticesEL = keepOnlyFirstDivInNotices(noticesElClone);
    const listTiltleHTML = alteredNoticesEL.map(notice => {
        return notice.outerHTML
    }).join('');

    //transformHTML(block, allNoticesHTML);

    block.innerHTML = `
             <div id="containerr1" class="containerr">
                ${titleEl.outerHTML}
                ${listTiltleHTML}  
            </div>

            <div id="containerr2" class="containerr hidden">
                ${allNoticesHTML}
            </div>

            <div id="containerr3" class="containerr hidden">
                <h2>containerr 3</h2>
                <p>This is the content of containerr 3.</p>
                <button  id="backButton2">Back</button>
            </div>
    `;



    //Adding Event Listener to list titles
    const links = document.querySelectorAll("#containerr1 a");
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const index = this.getAttribute("data-index");
            showDescription(index);
        });
    });

    document.querySelectorAll("#backButton").forEach(btn => {
        btn.addEventListener("click", showcontainerr1);
    })
    document.querySelectorAll("#containerr3Button").forEach(btn => {
        btn.addEventListener("click", showcontainerr3);
    })
    document.querySelectorAll("#backButton2").forEach(btn => {
        btn.addEventListener("click", showcontainerr1);
    })


    function showDescription(index) {

        const parentElement = block.parentElement.parentElement;
        const siblings = Array.from(parentElement.children).filter(child => child !== block.parentElement);
        siblings.forEach(block => block.classList.add('hidden'));

        document.getElementById('containerr1').classList.add('hidden');
        document.getElementById('containerr2').classList.remove('hidden');


        let descriptions = document.getElementsByClassName('description');
        for (let i = 0; i < descriptions.length; i++) {
            descriptions[i].classList.add('hidden');
        }


        document.getElementById(`description${index}`).classList.remove('hidden');
    }

    function showcontainerr1() {
        const parentElement = block.parentElement.parentElement;
        const siblings = Array.from(parentElement.children).filter(child => child !== block.parentElement);
        siblings.forEach(block => block.classList.remove('hidden'));

        document.getElementById('containerr1').classList.remove('hidden');
        document.getElementById('containerr2').classList.add('hidden');
        document.getElementById('containerr3').classList.add('hidden');
    }

    function showcontainerr3() {
        document.getElementById('containerr2').classList.add('hidden');
        document.getElementById('containerr3').classList.remove('hidden');
    }

    function transformHTML(noticeListBlock, containerr2Items) {
        // Get the parent element which is the initial containerr
        const originalcontainerr = noticeListBlock.closest('.section');

        // Create new containerrs
        const containerr1 = document.createElement('div');
        containerr1.id = 'containerr1';
        containerr1.className = 'containerr';

        const containerr2 = document.createElement('div');
        containerr2.id = 'containerr2';
        containerr2.className = 'containerr hidden';
        containerr2.innerHTML = containerr2Items;


        const containerr3 = document.createElement('div');
        containerr3.id = 'containerr3';
        containerr3.className = 'containerr hidden';
        containerr3.innerHTML = `
        <div">
            <button id="backButton">BACK</button>
            <h4>SAMPLE containerr 3</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>`

        // Get all child elements of the original containerr
        const childElements = Array.from(originalcontainerr.children);

        // Append all children except the last one to containerr1
        for (let i = 0; i < childElements.length; i++) {
            containerr1.appendChild(childElements[i]);
        }

        // Clear the original containerr and append the new containerrs
        while (originalcontainerr.firstChild) {
            originalcontainerr.removeChild(originalcontainerr.firstChild);
        }

        originalcontainerr.appendChild(containerr1);
        originalcontainerr.appendChild(containerr2);
        originalcontainerr.appendChild(containerr3);
    }


}
