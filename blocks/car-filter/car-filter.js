import { formatToLakhs } from "../../scripts/aem.js";
import utility from "../../utility/utility.js";

export default function decorate(block) {
  const [
    titleEl,
    subtitleEl,
    exshowroomPrefixEl,
    selectVariantEl,
    filterSelectEl,
  ] = block.children;

  const location = "Mumbai";
  const title = titleEl?.textContent?.trim();
  const subtitle = subtitleEl?.textContent?.trim();
  const exShowroomPrefixText = exshowroomPrefixEl?.textContent?.trim();
  const componentVariation = selectVariantEl?.textContent?.trim();
  const filterList = filterSelectEl?.textContent?.trim();
  console.log(filterList);
  let endpoint;
  if (componentVariation === "arena-variant") {
    endpoint = "arena-endpoint";
  } else {
    endpoint = "nexa-endpoint";
  }
  //   const graphQlResponse = {
  //     data: {
  //       carModelList: {
  //         items: [
  //           {
  //             carImage: {
  //               _authorUrl: "../../icons/fronx.webp",
  //             },
  //             carLogoImage: {
  //               _authorUrl: "../../icons/fronx.webp",
  //             },
  //             carName: "Grand Vitara",
  //             bodyType: "SUV",
  //             carDescription: "Create. Inspire",
  //             altText: "Grand Vitara",
  //             exShowroomPrice: 1099000,
  //             fuelOptions: ["Petrol", "S-CNG"],
  //             technology: ["Smart Hybrid"],
  //             additionalSpecifications: null,
  //             carTagName: ["msil:nexa/grand-vitara"],
  //             defaultVariantId: "GVR4EZ2",
  //           },
  //           {
  //             carImage: {
  //               _authorUrl: "../../icons/ignis.webp",
  //             },
  //             carLogoImage: {
  //               _authorUrl: "../../icons/fronx.webp",
  //             },
  //             carName: "Invicto",
  //             bodyType: "SUV",
  //             carDescription: "Created to Inspire the Extraordinary",
  //             altText: "Invicto",
  //             exShowroomPrice: 2521000,
  //             fuelOptions: ["Petrol", "S-CNG"],
  //             technology: ["Intelligent Electric Hybrid"],
  //             additionalSpecifications: null,
  //             carTagName: ["msil:nexa/invicto"],
  //             defaultVariantId: "INAHAZ200",
  //           },
  //           {
  //             carImage: {
  //               _authorUrl: "../../icons/invicto.webp",
  //             },
  //             carLogoImage: {
  //               _authorUrl: "../../icons/fronx.webp",
  //             },
  //             carName: "Jimny",
  //             bodyType: "Hatchback",
  //             carDescription: "Created For Purity of Function",
  //             altText: "Jimny",
  //             exShowroomPrice: 1274000,
  //             fuelOptions: ["Petrol"],
  //             technology: ["Turbo"],
  //             additionalSpecifications: ["All Grip"],
  //             carTagName: ["msil:nexa/jimny"],
  //             defaultVariantId: "JMR4CZ2",
  //           },
  //           {
  //             carImage: {
  //               _authorUrl: "../../icons/fronx.webp",
  //             },
  //             carLogoImage: {
  //               _authorUrl: "../../icons/fronx.webp",
  //             },
  //             carName: "Grand Vitara",
  //             bodyType: "SUV",
  //             carDescription: "Create. Inspire",
  //             altText: "Grand Vitara",
  //             exShowroomPrice: 1099000,
  //             fuelOptions: ["Petrol", "S-CNG"],
  //             technology: ["Smart Hybrid"],
  //             additionalSpecifications: null,
  //             carTagName: ["msil:nexa/grand-vitara"],
  //             defaultVariantId: "GVR4EZ2a",
  //           },
  //           {
  //             carImage: {
  //               _authorUrl: "../../icons/ignis.webp",
  //             },
  //             carLogoImage: {
  //               _authorUrl: "../../icons/fronx.webp",
  //             },
  //             carName: "Invicto",
  //             bodyType: "SUV",
  //             carDescription: "Created to Inspire the Extraordinary",
  //             altText: "Invicto",
  //             exShowroomPrice: 2521000,
  //             fuelOptions: ["Petrol", "S-CNG"],
  //             technology: ["Intelligent Electric Hybrid"],
  //             additionalSpecifications: null,
  //             carTagName: ["msil:nexa/invicto"],
  //             defaultVariantId: "INAHAZ20b",
  //           },
  //           {
  //             carImage: {
  //               _authorUrl: "../../icons/invicto.webp",
  //             },
  //             carLogoImage: {
  //               _authorUrl: "../../icons/fronx.webp",
  //             },
  //             carName: "Jimny",
  //             bodyType: "Hatchback",
  //             carDescription: "Created For Purity of Function",
  //             altText: "Jimny",
  //             exShowroomPrice: 1274000,
  //             fuelOptions: ["Petrol"],
  //             technology: ["Turbo"],
  //             additionalSpecifications: ["All Grip"],
  //             carTagName: ["msil:nexa/jimny"],
  //             defaultVariantId: "JMR4CZ2c",
  //           },
  //         ],
  //       },
  //     },
  //   };
  const graphQlResponse = {
    data: {
      carModelList: {
        items: [
          {
            carImage: {
              _authorUrl: "../../icons/alto.png",
            },
            carLogoImage: {
              _authorUrl: "../../icons/altoLogo.png",
            },
            carName: "Grand Vitara",
            bodyType: "SUV",
            carDescription: "Create. Inspire",
            altText: "Grand Vitara",
            exShowroomPrice: 1099000,
            fuelOptions: ["Petrol", "S-CNG"],
            technology: ["Smart Hybrid"],
            additionalSpecifications: null,
            carTagName: ["msil:nexa/grand-vitara"],
            defaultVariantId: "GVR4EZ2",
          },
          {
            carImage: {
              _authorUrl: "../../icons/celerio.png",
            },
            carLogoImage: {
              _authorUrl: "../../icons/celerioLogo.png",
            },
            carName: "Invicto",
            bodyType: "SUV",
            carDescription: "Created to Inspire the Extraordinary",
            altText: "Invicto",
            exShowroomPrice: 2521000,
            fuelOptions: ["Petrol", "S-CNG"],
            technology: ["Intelligent Electric Hybrid"],
            additionalSpecifications: null,
            carTagName: ["msil:nexa/invicto"],
            defaultVariantId: "INAHAZ200",
          },
          {
            carImage: {
              _authorUrl: "../../icons/espresso.png",
            },
            carLogoImage: {
              _authorUrl: "../../icons/espressoLogo.png",
            },
            carName: "Jimny",
            bodyType: "Hatchback",
            carDescription: "Created For Purity of Function",
            altText: "Jimny",
            exShowroomPrice: 1274000,
            fuelOptions: ["Petrol"],
            technology: ["Turbo"],
            additionalSpecifications: ["All Grip"],
            carTagName: ["msil:nexa/jimny"],
            defaultVariantId: "JMR4CZ2",
          },
          {
            carImage: {
              _authorUrl: "../../icons/swift.png",
            },
            carLogoImage: {
              _authorUrl: "../../icons/swiftLogo.png",
            },
            carName: "Grand Vitara",
            bodyType: "SUV",
            carDescription: "Create. Inspire",
            altText: "Grand Vitara",
            exShowroomPrice: 1099000,
            fuelOptions: ["Petrol", "S-CNG"],
            technology: ["Smart Hybrid"],
            additionalSpecifications: null,
            carTagName: ["msil:nexa/grand-vitara"],
            defaultVariantId: "GVR4EZ2a",
          },
          {
            carImage: {
              _authorUrl: "../../icons/celerio.png",
            },
            carLogoImage: {
              _authorUrl: "../../icons/celerioLogo.png",
            },
            carName: "Invicto",
            bodyType: "SUV",
            carDescription: "Created to Inspire the Extraordinary",
            altText: "Invicto",
            exShowroomPrice: 2521000,
            fuelOptions: ["Petrol", "S-CNG"],
            technology: ["Intelligent Electric Hybrid"],
            additionalSpecifications: null,
            carTagName: ["msil:nexa/invicto"],
            defaultVariantId: "INAHAZ20b",
          },
          {
            carImage: {
              _authorUrl: "../../icons/celerio.png",
            },
            carLogoImage: {
              _authorUrl: "../../icons/celerioLogo.png",
            },
            carName: "Jimny",
            bodyType: "Hatchback",
            carDescription: "Created For Purity of Function",
            altText: "Jimny",
            exShowroomPrice: 1274000,
            fuelOptions: ["Petrol"],
            technology: ["Turbo"],
            additionalSpecifications: ["All Grip"],
            carTagName: ["msil:nexa/jimny"],
            defaultVariantId: "JMR4CZ2c",
          },
        ],
      },
    },
  };

  const newHTMLContainer = carModelInfo(graphQlResponse);

  function carModelInfo(result) {
    const cars = result.data.carModelList.items;

    if (!Array.isArray(cars) || cars.length === 0) {
      console.error("No car data found in the GraphQL response.");
      return null;
    }

    const newContainer = document.createElement("div");
    newContainer.classList.add("filter-cars");

    const carFiltersContainer = document.createElement("div");
    carFiltersContainer.classList.add("car-filter-list");

    const carCardsContainer = document.createElement("div");
    carCardsContainer.classList.add("card-list");

    const carCardsWithTeaser = document.createElement("div");
    carCardsWithTeaser.classList.add("card-list-teaser");
    carCardsWithTeaser.append(carCardsContainer);

    newContainer.appendChild(carFiltersContainer);

    const textElement = document.createElement("div");
    textElement.classList.add("filter-text");
    newContainer.appendChild(textElement);

    const titleElement = document.createElement("div");
    titleElement.classList.add("title");
    titleElement.textContent = title;
    textElement.appendChild(titleElement);

    const subtitleElement = document.createElement("div");
    subtitleElement.classList.add("subtitle");
    subtitleElement.textContent = subtitle;
    textElement.appendChild(subtitleElement);

    newContainer.append(carCardsWithTeaser);

    let selectedFilter = "All";
    const filters = {};
    const filterTypes = filterList.split(",");

    filterTypes.forEach((type) => {
      filters[type] = new Set();
    });

    cars.forEach((car) => {
      filterTypes.forEach((type) => {
        if (car && Array.isArray(car[type])) {
          car[type].forEach((option) => {
            if (typeof option === "string") {
              filters[type].add(option.toLowerCase());
            } else if (Array.isArray(option)) {
              option.forEach((opt) => filters[type].add(opt.toLowerCase()));
            }
          });
        } else if (car && typeof car[type] === "string") {
          filters[type].add(car[type].toLowerCase());
        }
      });
    });

    Object.keys(filters).forEach((filterType) => {
      filters[filterType] = [...filters[filterType]].sort();
    });

    let unifiedFilterOptions;

    if (componentVariation === "arena-variant") {
      unifiedFilterOptions = [
        ...new Set(filterTypes.flatMap((type) => filters[type])),
      ];
    } else {
      unifiedFilterOptions = [
        "All",
        ...new Set(filterTypes.flatMap((type) => filters[type])),
      ];
    }

    function createUnifiedFilter(filterOptions) {
      filterOptions.forEach((option, index) => {
        const filter = document.createElement("span");
        filter.classList.add("filter");
        filter.textContent = option;
        if (index === 0) {
          filter.classList.add("selected");
          selectedFilter = option.toLowerCase();
        }
        document.addEventListener("click", function (event) {
          if (event.target.matches(".car-filter .filter")) {
            selectedFilter = option.toLowerCase();
            updateFilterStyles();
            filterCards();
          }
        });
        carFiltersContainer.appendChild(filter);
      });
    }

    function updateFilterStyles() {
      carFiltersContainer.querySelectorAll(".filter").forEach((filter) => {
        filter.classList.toggle(
          "selected",
          filter.textContent.toLowerCase() === selectedFilter
        );
      });
    }

    function filterCards() {
      const filteredCars = cars.filter((car) => {
        if (selectedFilter === "all") {
          return true;
        }
        return filterTypes.some((type) => {
          return (
            (Array.isArray(car[type]) &&
              car[type]
                .map((opt) => opt.toLowerCase())
                .includes(selectedFilter)) ||
            (typeof car[type] === "string" &&
              car[type].toLowerCase() === selectedFilter)
          );
        });
      });
      renderCards(filteredCars);
    }

    function renderCards(carsToRender) {
      carCardsContainer.innerHTML = "";

      carsToRender.forEach((car) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardLogoImage = document.createElement("div");
        cardLogoImage.classList.add("card-logo-image");

        const logoImg = document.createElement("img");
        logoImg.src = car.carLogoImage._authorUrl;
        logoImg.alt = car.logoImageAltText;
        cardLogoImage.appendChild(logoImg);

        const cardImage = document.createElement("div");
        cardImage.classList.add("card-image");

        const img = document.createElement("img");
        img.src = car.carImage._authorUrl;
        img.alt = car.altText;
        cardImage.appendChild(img);

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const heading = document.createElement("h3");
        heading.classList.add("card-title");
        heading.textContent = car.carName;
        const description = document.createElement("p");
        description.classList.add("card-description");
        description.textContent = car.carDescription;
        const priceText = document.createElement("p");
        priceText.classList.add("card-price-text");
        const price = document.createElement("p");
        price.classList.add("card-price");
        const storedPrices = getLocalStorage("modelPrice")
          ? JSON.parse(getLocalStorage("modelPrice"))
          : {};
        if (
          storedPrices[car.defaultVariantId] &&
          storedPrices[car.defaultVariantId].price[location]
        ) {
          const storedPrice =
            storedPrices[car.defaultVariantId].price[location];
          price.textContent = exShowroomPrefixText + storedPrice;
        } else {
          fetchPrice(car.defaultVariantId, price, priceText, car.exShowroomPrice);
        }

        cardContent.appendChild(heading);
        cardContent.appendChild(description);
        cardContent.appendChild(priceText);
        cardContent.appendChild(price);
        card.appendChild(cardLogoImage);
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        carCardsContainer.appendChild(card);
      });
    }

    function fetchPrice(variantCode, priceElement, priceText, defaultPrice) {
      const apiKey = "3Oa87EBtBK9k4QQa87eYDaTB2CcLnbp7aqd00kqH";
      const apiUrl =
        "https://api.preprod.developersatmarutisuzuki.in/pricing/v1/common/pricing/ex-showroom-price";
      const colorType = "M";
      const salesType = "IND";
      const forCode = "48";

      const storedPrices = getLocalStorage("modelPrice")
        ? JSON.parse(getLocalStorage("modelPrice"))
        : {};
      storedPrices[variantCode] = storedPrices[variantCode] || {
        price: {},
        timestamp: 0,
      };

      if (storedPrices[variantCode].price[location]) {
        const storedPrice = storedPrices[variantCode].price[location];
        priceElement.textContent = exShowroomPrefixText + storedPrice;
        return;
      }

      const params = {
        colorType: colorType,
        salesType: salesType,
        forCode: forCode,
        variantCode: variantCode,
      };

      const headers = {
        "x-api-key": apiKey,
        Authorization:
          "eyJraWQiOiJQK0wyTlZKNWFWNTRreEhnRWxQcUpNTHlZRDl5OE1PS1J4T25KWktOdGJjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhOGQ4OWI3ZC03OGMwLTRlYWUtYmZkNC01Zjc1OWQ3ODcyMjgiLCJzZGs6dXNlclBvb2xJZCI6ImFwLXNvdXRoLTFfNGUxVUFqQnhKIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfNGUxVUFqQnhKIiwiZ3JvdXBzIjoiTVNJTC1EZXZlbG9wZXJQb3J0YWwtU2FsZXMtR3JvdXB8TVNJTC1EZXZlbG9wZXJQb3J0YWwtQ3VzdG9tZXItR3JvdXB8TVNJTC1EZXZlbG9wZXJQb3J0YWwtR2VuZXJhbC1Hcm91cHxNU0lMLURldmVsb3BlclBvcnRhbC1QcmVzYWxlcy1Hcm91cHxNU0lMLURldmVsb3BlclBvcnRhbC1PcGVyYXRpb25zLUdyb3VwfE1TSUwtRGV2ZWxvcGVyUG9ydGFsLVBhcnRuZXItR3JvdXB8TVNJTC1EZXZlbG9wZXJQb3J0YWwtT0NSLUdyb3VwfE1TSUwtRGV2ZWxvcGVyUG9ydGFsLVBhcmtpbmdNYW5hZ2VtZW50LUdyb3VwfE1TSUwtRGV2ZWxvcGVyUG9ydGFsLUludGVybmFsQVBJcy1Hcm91cCIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImMxYzE4YTZhLWIyNDEtNDIyMy1iNmJiLTEzZjUxNzAyNDA1NCIsInNkazphdXRoZW50aWNhdGlvbkZsb3dUeXBlIjoiVVNFUl9TUlBfQVVUSCIsIm9yaWdpbl9qdGkiOiI3ZjY0NDRkMy0zMmVkLTRjOGUtOTQ3Ny04MzI5N2JiMDMzNmQiLCJhdWQiOiI2YmJhZzNzajNoa3R0M2Frb2dycHI5NzBjZyIsInNkazp1c2VyUG9vbFdlYkNsaWVudElkIjoiNmJiYWczc2ozaGt0dDNha29ncnByOTcwY2ciLCJzZGs6Z2F0ZXdheVVybCI6Imh0dHBzOlwvXC9kMXgzdXVjejAybG9oeS5jbG91ZGZyb250Lm5ldFwvIiwiZXZlbnRfaWQiOiJjZjdhNmQzMy1kNjI3LTRlNjEtODYxMC00ODFjNGJiZjE2OTAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxOTQ2ODM1NywibmFtZSI6IlZpa2FzIiwicGhvbmVfbnVtYmVyIjoiKzkxODEzMDQyMDE1MCIsInNkazpyZWdpb24iOiJhcC1zb3V0aC0xIiwic2RrOmF1dGhTZXJ2ZXJVcmwiOiJodHRwczpcL1wvZDF4M3V1Y3owMmxvaHkuY2xvdWRmcm9udC5uZXRcLyIsImV4cCI6MTcxOTQ3MTk1NywiaWF0IjoxNzE5NDY4MzU3LCJqdGkiOiIwNTM4YTczZS0xN2JkLTRkYjktYWJhNy1jNmU4NzRkNjVjYzMiLCJlbWFpbCI6InZpa2FzLmNoYXVkaGFyeTAxQG5hZ2Fycm8uY29tIn0.D5EI5Kqr-kqN5u7MRpYuRGoM2dezJsrMEfZOKP1SBF54bf2yMgtKdYT6H5bymqoD3Dd_N8Fw4KiDNEO1u8JHPjquUsV_ADJROi9ZPir2FLaeOfyP3NsArXyCcg-l9px3rYKjUka7K8j7Ax5c5HFzCgmpqtDgvzlAwO12yz7tW9dCYbdgAp80QCrT7mguoCfxDWHwLw9unGYBiG8WaDbZ6Sx3_74PWjb7UM6EzTpC07rFANuJR3ZKSPMxBD8Rm1Lp1ZzWdLbEXeslE6OX3LHSnLiuXeDC41MCJcM3nJVD_wkWM8JHtl9965OYgVeL8f2rdP30Ys7Rsk385M7lDWR8Cw",
      };

      const url = new URL(apiUrl);
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const formattedPrice = defaultPrice
        ? priceFormatting(defaultPrice)
        : "Not available";
      priceElement.textContent =  formattedPrice;
      priceText.textContent = exShowroomPrefixText;
    }

    function setLocalStorage(key, value) {
      localStorage.setItem(key, value);
    }

    function getLocalStorage(key) {
      return localStorage.getItem(key);
    }

    function priceFormatting(price) {
      if (componentVariation === "arena-variant") {
        return formatToLakhs(price);
      }
      const formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      });
      return formatter.format(price);
    }

    createUnifiedFilter(unifiedFilterOptions);
    updateFilterStyles();
    filterCards();

    return newContainer;
  }
  block.innerHTML = "";
  block.appendChild(newHTMLContainer);
}
