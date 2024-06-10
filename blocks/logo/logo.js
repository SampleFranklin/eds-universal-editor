export default function decorate(block) {
  console.log(block, "logoNexa");

  const reference = document.querySelector(
    ":scope > div > div > picture > img"
  );
  if (reference) {
    const url = reference.getAttribute("src");
    console.log("url for Logo", url);
  } else {
    console.log("No matching element found");
  }
  // Create the anchor element
  const anchor = document.createElement("a");
  anchor.href = "/"; // Set the href attribute to the desired link
  anchor.target = "_self";

  // Create the div element
  const div = document.createElement("div");
  div.classList.add("main-logo");

  // Create the img element
  const img = document.createElement("img");
  img.className = "logo"; // Use className to set the class
  img.src = "/"; // Set the src attribute
  img.altText = "logo"; //Set the altText

  // Append the img to the div
  div.appendChild(img);

  //Append the div to the anchor
  anchor.appendChild(div);

  block.appendChild(anchor);
}

// export default function decorate(block) {
//     console.log(block,"logoNexa");
//   const anchor = document.createElement("a");
//   anchor.href = "/";
//   anchor.target = "_self";

//   const logoWrapper = document.querySelector(".logo-wrapper");
//   if (logoWrapper) {
//     logoWrapper.insertBefore(anchor, logoWrapper.firstChild);
//   }
// }
