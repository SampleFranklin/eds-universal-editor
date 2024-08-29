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
                        const secondDivText = (secondDiv?.textContent)? `<span>${secondDiv?.textContent.trim()}</span>` : '';

                        const aElement = document.createElement('a');
                        aElement.href = '#';  
                        aElement.innerHTML =`${pElement.textContent || ''} ${secondDivText} `; 
                        aElement.setAttribute('data-index', index);

                        pElement.innerHTML ="";
                        pElement.append(aElement);
                      
                    }
                }
            });
        });
    
        return noticesElClone;
    }


    
    const [titleEl, ...noticesEl] = block.children;
   
    const titleELClone =  titleEl.cloneNode(true);
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
            <button id="container3Button">${notice.cta2}</button>
        </div>
    `).join('');

    let alteredNoticesEL = keepOnlyFirstDivInNotices(noticesElClone);  
    const listTiltleHTML = alteredNoticesEL.map(notice=>{
        return notice.outerHTML
    }).join('');
    
    transformHTML(block, allNoticesHTML);

    block.innerHTML = `
            ${titleEl.outerHTML}
            ${listTiltleHTML}  
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
        btn.addEventListener("click", showContainer1);
    })
    document.querySelectorAll("#container3Button").forEach(btn => {
        btn.addEventListener("click", showContainer3);
    })
    document.querySelectorAll("#backButton2").forEach(btn => {
        btn.addEventListener("click", showContainer1);
    })
    

    function showDescription(index) {
        document.getElementById('container1').classList.add('hidden');
        document.getElementById('container2').classList.remove('hidden');
    
        
        let descriptions = document.getElementsByClassName('description');
        for (let i = 0; i < descriptions.length; i++) {
            descriptions[i].classList.add('hidden');
        }
    
        
        document.getElementById(`description${index}`).classList.remove('hidden');
    }
    
    function showContainer1() {
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
        container3.innerHTML= `
        <div">
            <button id="backButton">BACK</button>
            <h4>SAMPLE CONTAINER 3</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>`
    
        // Get all child elements of the original container
        const childElements = Array.from(originalContainer.children);
    
        // Append all children except the last one to container1
        for (let i = 0; i < childElements.length; i++) {
            container1.appendChild(childElements[i]);
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
