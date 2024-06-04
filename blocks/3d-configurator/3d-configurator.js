export default function decorate(block) {
    console.log("inside configurator");
    console.log(block);


    const values = document.querySelector(':scope > div > div > p');
    console.log(values);
}