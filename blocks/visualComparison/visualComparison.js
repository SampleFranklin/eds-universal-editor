export default function decorate(block) {
    console.log("inside visualComparison");
    console.log(block);


    const values = document.querySelector(':scope > div > div > p');
    console.log("vcompare:"+values);
}