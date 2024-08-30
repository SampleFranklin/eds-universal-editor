import vinCheckDecorate from '../vin-check/vin-check.js';
export default async function decorate(block) {


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

    function emptyContainer3(){
        const container3= block.querySelector('#container3')
        container3.innerHTML='';

        return container3;
    }
    
    function showDescription(index) {

        const parentElement = block.parentElement.parentElement;
        const siblings = Array.from(parentElement.children).filter(child => child !== block.parentElement);
        siblings.forEach(block => block.classList.add('hidden'));

        document.getElementById('container2').classList.add('hidden');
        

        const container3 = emptyContainer3();
       
        const notice = noticesDetails[index];

        const noticeHTML = `
            <div id="description${index}" class="description">
                <button id="backButton">${notice.cta1}</button>
                <h4>${notice.title}</h4>
                ${notice.descEl}
                <button id="container3Button" data-submit-link="${index}">${notice.cta2}</button>
            </div>
            `;

      container3.innerHTML = noticeHTML;
     
      document.querySelector("#backButton").addEventListener("click", ()=>{
         emptyContainer3();
         showcontainer2();
     });

     document.querySelector("#container3Button").addEventListener("click", function (event) {
         event.preventDefault();
         const index = this.getAttribute("data-submit-link");
         emptyContainer3();
         showcontainer1(index);
     });
    
     container3.classList.remove('hidden');

    }

    function showcontainer2() {
        const parentElement = block.parentElement.parentElement;
        const siblings = Array.from(parentElement.children).filter(child => child !== block.parentElement);
        siblings.forEach(block => block.classList.remove('hidden'));

        document.getElementById('container2').classList.remove('hidden');
        document.getElementById('container1').classList.add('hidden');
        document.getElementById('container3').classList.add('hidden');
    }

   function showcontainer1(submitLink) {

        const container1 = block.querySelector("#container1");
        container1.append(vinCheckEL)

        const submitBtn = container1.querySelector(".check");
        submitBtn.setAttribute('submit-link', submitLink);

        document.getElementById('container3').classList.add('hidden');
        document.getElementById('container1').classList.remove('hidden');
    }


    const blockClone = block.cloneNode(true);
    console.log(blockClone)

    const [titleEl, vinCheckEL, ...noticesEl] = block.children;

    const compSeparator = titleEl?.querySelector('p') || "";
    compSeparator.classList.add('comp-separator');
    const componentHeading = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)') || "";
    componentHeading.classList.add('comp-heading');

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


    let alteredNoticesEL = keepOnlyFirstDivInNotices(noticesElClone);
    const listTiltleHTML = alteredNoticesEL.map(notice => {
        return notice.outerHTML
    }).join('');

    await vinCheckDecorate(vinCheckEL);

        block.innerHTML = `
             <div id="container1" class="container hidden">
                <button  id="backButton2">Back</button>    
                
            </div>

             <div id="container2" class="container">
                <div class="notice-list__heading_container">
                    ${compSeparator?.outerHTML || ''}
                    ${componentHeading?.outerHTML || ''}
                </div>
                <div class="notice-list__list_container">
                    ${listTiltleHTML}  
                </div>
                
            </div>

            <div id="container3" class="container hidden">
            </div>

           
    `;



    //Adding Event Listener to list titles
    const links = document.querySelectorAll("#container2 a");
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const index = this.getAttribute("data-index");
            showDescription(index);
        });
    });

    
    document.querySelectorAll("#backButton2").forEach(btn => {
        btn.addEventListener("click", showcontainer2);
    })

}
