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

    function showcontainer1() {
        const parentElement = block.parentElement.parentElement;
        const siblings = Array.from(parentElement.children).filter(child => child !== block.parentElement);
        siblings.forEach(block => block.classList.remove('hidden'));

        document.getElementById('container1').classList.remove('hidden');
        document.getElementById('container2').classList.add('hidden');
        document.getElementById('container3').classList.add('hidden');
    }

    function showcontainer3(submitLink) {

        const submitBtn = document.querySelector("#container3 #submitBtn");
        submitBtn.setAttribute('submit-link', submitLink);

        document.getElementById('container2').classList.add('hidden');
        document.getElementById('container3').classList.remove('hidden');
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
            <button id="container3Button" data-submit-link="${index}">${notice.cta2}</button>
        </div>
    `).join('');

    let alteredNoticesEL = keepOnlyFirstDivInNotices(noticesElClone);
    const listTiltleHTML = alteredNoticesEL.map(notice => {
        return notice.outerHTML
    }).join('');

    //transformHTML(block, allNoticesHTML);

    block.innerHTML = `
             <div id="container1" class="container">
                ${titleEl.outerHTML}
                ${listTiltleHTML}  
            </div>

            <div id="container2" class="container hidden">
                ${allNoticesHTML}
            </div>

            <div id="container3" class="container hidden">
                <h2>container 3</h2>
                <p>This is the content of container 3.</p>
                <button  id="backButton2">Back</button>
                <button  id="submitBtn" >Check</button>
            </div>
    `;



    //Adding Event Listener to list titles
    const links = document.querySelectorAll("#container1 a");
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const index = this.getAttribute("data-index");
            showDescription(index);
        });
    });

    

    document.querySelectorAll("#backButton").forEach(btn => {
        btn.addEventListener("click", showcontainer1);
    })
    
    document.querySelectorAll("#container3Button").forEach(btn => {
        
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            const index = this.getAttribute("data-submit-link");
            showcontainer3(index);
        });
    })
    document.querySelectorAll("#backButton2").forEach(btn => {
        btn.addEventListener("click", showcontainer1);
    })

}
