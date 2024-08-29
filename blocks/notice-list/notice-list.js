export default function decorate(block) {
    const [titleEl, ...noticesEl] = block.children;

    console.log(Array.from(noticesEl[0].children)[0]);

    const componentSeparator = titleEl.querySelector('p')?.textContent?.trim() || "";
    const compTitle = titleEl.querySelector('h1, h2, h3, h4, h5, h6')|| "";
    

    

   

   console.log(listOfNotice);
   
    block.innerHTML = `
        <div id="container1" class="container">
            <p>${componentSeparator}</p>
            ${compTitle.outerHTML}
        </div>`
    
    return block;
}