// export default function decorate(block){
//   const[
//       titleEl,
//       subtitleEl,
//       tabEl
//   ] = block.children;

//   const title = titleEl?.textContent?.trim() || "";
//   const subtitle = subtitleEl?.textContent?.trim() || "";
//   const tab = tabEl?.textContent?.trim() || "";

//   function createDealerCard(data){
//    return`
//     <div class="main-container">
// <div class="title-section">
// <div class="title">my title</div>
// <div class="subtitle">My subtitle</div>
// </div>

// <div class="heading-section">
//   <div class="row">
//   <div class="col-sm-3">
//     <div class="showroom">Showroom Visit</div>
//     <div class="testDrive">Test Drive</div>
//     <div class="booked">Booked</div>
//   </div>
//   </div>
// </div>

// <div class="cards-section">
//   <div class="card">
//       <div class="image">
//           <img src="${data.image}" alt="carImage" class="car-image" />
//       </div>
//       <div class="items">
//          <div class="news">${data.dnews}</div>
//          <div class="dname">
//           ${data.dhead}
//           <br/>
//           <b><h4>${data.dname}</h4></b>
//          </div>
//       </div>
//   </div>
// </div>
// </div>
//    `;
//   }

//   const mockData = {
//    image: "/content/dam/xwalk-ank/image-dealer.png",
//    dnews: "Upcoming test drive | Heads up! We have scheduled a test drive on 13th June for Wagon R",
//    dhead: "Dealer name",
//    dname: "Mayuri Automobile Co. Ltd."
//   };

//   const profileCardHTML = createDealerCard(mockData);
//   block.innerHTML = profileCardHTML;
// }