export default function decorate(block) {
    const [
        titleEl,
        subtitleEl,
        priceTextEl,
        selectVariantEl,
        filterSelectEl
    ] = block.children;

    const location = "Mumbai";
    const title = titleEl?.textContent?.trim();
    const subtitle = subtitleEl?.textContent?.trim();
    const priceText = priceTextEl?.textContent?.trim();
    const componentVariation = selectVariantEl?.textContent?.trim();
    const filterList = filterSelectEl?.textContent?.trim();

    let graphQlEndpoint;
    if(componentVariation==='arena-variant'){
        graphQlEndpoint = 'arena-endpoint';
    }
    else{
        graphQlEndpoint = 'nexa-endpoint';
    }
    const graphQlResponse =
    {
        "data": {
          "carModelList": {
            "items": [
              {
                "carImage": {
                  "_authorUrl": "http://localhost:4502/content/dam/nexa/com/in/en/images/cars/grand-vitara/Grand%20Vitara.webp"
                },
                 "carLogoImage": {
                    "_authorUrl": "http://localhost:4502/content/dam/arena/com/in/en/images/S-presso.svg",
                    "_publishUrl": "http://localhost:4503/content/dam/arena/com/in/en/images/S-presso.svg"
                  },
                "logoImageAltText": "gv-logo",  
                "carName": "Grand Vitara",
                "bodyType": "SUV",
                "carDescription": "Create. Inspire",
                "altText": "Grand Vitara",
                "exShowroomPrice": 1099000,
                "fuelOptions": [
                  "Petrol",
                  "S-CNG"
                ],
                "technology": [
                  "Smart Hybrid"
                ],
                "additionalSpecifications": null,
                "carTagName": [
                  "msil:nexa/grand-vitara"
                ],
                "defaultVariantId": "GVR4EZ2",
                "carDetailsPagePath": null,
                "carOrder": null
              },
              {
                "carImage": {
                  "_authorUrl": "http://localhost:4502/content/dam/nexa/com/in/en/images/cars/invicto/Invicto.webp"
                },
                 "carLogoImage": {
                    "_authorUrl": "http://localhost:4502/content/dam/arena/com/in/en/images/S-presso.svg",
                    "_publishUrl": "http://localhost:4503/content/dam/arena/com/in/en/images/S-presso.svg"
                  },
                "logoImageAltText": "inv-logo",   
                "carName": "Invicto",
                "bodyType": "SUV",
                "carDescription": "Created to Inspire the Extraordinary",
                "altText": "Invicto",
                "exShowroomPrice": 2521000,
                "fuelOptions": [
                  "Petrol",
                  "S-CNG"
                ],
                "technology": [
                  "Intelligent Electric Hybrid"
                ],
                "additionalSpecifications": null,
                "carTagName": [
                  "msil:nexa/invicto"
                ],
                "defaultVariantId": "INAHAZ200",
                "carDetailsPagePath": null,
                "carOrder": null
              },
              {
                "carImage": {
                  "_authorUrl": "http://localhost:4502/content/dam/nexa/com/in/en/images/cars/jimny/Jimny.webp"
                },
                 "carLogoImage": {
                    "_authorUrl": "http://localhost:4502/content/dam/arena/com/in/en/images/S-presso.svg",
                    "_publishUrl": "http://localhost:4503/content/dam/arena/com/in/en/images/S-presso.svg"
                  },
                "logoImageAltText": "jim-logo",  
                "carName": "Jimny",
                "bodyType": "Hatchback",
                "carDescription": "Created For Purity of Function",
                "altText": "Jimny",
                "exShowroomPrice": 1274000,
                "fuelOptions": [
                  "Petrol"
                ],
                "technology": [
                  "Turbo"
                ],
                "additionalSpecifications": [
                  "All Grip"
                ],
                "carTagName": [
                  "msil:nexa/jimny"
                ],
                "defaultVariantId": "JMR4CZ2",
                "carDetailsPagePath": null,
                "carOrder": null
              }
            ]
          }
        }
      };


    const newHTMLContainer = carModelInfo(graphQlResponse);

    function carModelInfo(result) {
        const cars = result.data.carModelList.items;

        if (!Array.isArray(cars) || cars.length === 0) {
            console.error('No car data found in the GraphQL response.');
            return null;
        }

        const newContainer = document.createElement('div');
        newContainer.classList.add('filter-cars');

        const carFiltersContainer = document.createElement('div');
        carFiltersContainer.classList.add('car-filter-list');

        const carCardsContainer = document.createElement('div');
        carCardsContainer.classList.add('card-list');

        newContainer.appendChild(carFiltersContainer);

        const textElement = document.createElement('div');
        textElement.classList.add('filter-text');
        newContainer.appendChild(textElement);

        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = title;
        textElement.appendChild(titleElement);

        const subtitleElement = document.createElement('div');
        subtitleElement.classList.add('subtitle');
        subtitleElement.textContent = subtitle;
        textElement.appendChild(subtitleElement);

        newContainer.appendChild(carCardsContainer);

        let selectedFilter = 'All';
        const filters = {};
        const filterTypes = filterList.split(',');

        filterTypes.forEach(type => {
            filters[type] = new Set();
        });

        cars.forEach(car => {
            filterTypes.forEach(type => {
                if (car && Array.isArray(car[type])) {
                    car[type].forEach(option => {
                        if (typeof option === 'string') {
                            filters[type].add(option);
                        } else if (Array.isArray(option)) {
                            option.forEach(opt => filters[type].add(opt));
                        }
                    });
                } else if (car && typeof car[type] === 'string') {
                    filters[type].add(car[type]);
                }
            });
        });

        Object.keys(filters).forEach(filterType => {
            filters[filterType] = [...filters[filterType]]  ;
        });

        let unifiedFilterOptions;

        if (componentVariation === 'arena-variant') {
            unifiedFilterOptions = [...new Set(filterTypes.flatMap(type => filters[type]))];
        } else {
            unifiedFilterOptions = ['All', ...new Set(filterTypes.flatMap(type => filters[type]))];
        }

        function createUnifiedFilter(filterOptions) {
            filterOptions.forEach((option, index) => {
                const filter = document.createElement('span');
                filter.classList.add('filter');
                filter.textContent = option;
                if (index === 0) {
                    filter.classList.add('selected');
                    selectedFilter = option;
                }
                filter.addEventListener('click', function () {
                    selectedFilter = option;
                    updateFilterStyles();
                    filterCards();
                });
                carFiltersContainer.appendChild(filter);
            });
        }

        function updateFilterStyles() {
            carFiltersContainer.querySelectorAll('.filter').forEach(filter => {
                filter.classList.toggle('selected', filter.textContent === selectedFilter);
            });
        }

        function filterCards() {
            const filteredCars = cars.filter(car => {
                if (selectedFilter === 'All') {
                    return true;
                }
                return filterTypes.some(type => {
                    return (
                        (Array.isArray(car[type]) && car[type].map(opt => opt).includes(selectedFilter)) ||
                        (typeof car[type] === 'string' && car[type] === selectedFilter)
                    );
                });
            });
            renderCards(filteredCars);
        }

        function renderCards(carsToRender) {
            carCardsContainer.innerHTML = '';

            carsToRender.forEach(car => {
                const card = document.createElement('div');
                card.classList.add('card');

                if (componentVariation === 'arena-variant') {
                    const cardLogoImage = document.createElement('div');
                    cardLogoImage.classList.add('card-logo-image');

                    const logoImg = document.createElement('img');
                    logoImg.src = car.carLogoImage._publishUrl;
                    logoImg.alt = car.logoImageAltText;
                    cardLogoImage.appendChild(logoImg);
                    card.appendChild(cardLogoImage);
                }

                const cardImage = document.createElement('div');
                cardImage.classList.add('card-image');

                const img = document.createElement('img');
                img.src = car.carImage._publishUrl;
                img.alt = car.altText;
                cardImage.appendChild(img);

                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                const heading = document.createElement('h3');
                heading.classList.add('card-title');
                heading.textContent = car.carName;
                cardContent.appendChild(heading);

                const description = document.createElement('p');
                description.classList.add('card-description');
                description.textContent = car.carDescription;
                cardContent.appendChild(description);

                const priceElement = document.createElement('p');
                priceElement.classList.add('card-price');
                cardContent.appendChild(priceElement);

                fetchPrice(car.modelId, priceElement, car.exShowroomPrice);

                card.appendChild(cardImage);
                card.appendChild(cardContent);

                carCardsContainer.appendChild(card);
            });
        }

        function fetchPrice(variantCode, priceElement, defaultPrice) {
            const storedPrices = getLocalStorage('modelPrice') ? JSON.parse(getLocalStorage('modelPrice')) : {};
            if (storedPrices[variantCode] && storedPrices[variantCode].price[location]) {
                const storedPrice = storedPrices[variantCode].price[location];
                priceElement.textContent = priceText + " " + storedPrice;
            } else {
                // Perform fetch only if price not already in localStorage
                const apiKey = 'your_api_key_here';
                const apiUrl = 'https://api.example.com/pricing';

                const params = {
                    variantCode: variantCode,
                    location: location
                };

                const headers = {
                    'x-api-key': apiKey,
                    'Authorization': 'Bearer your_token_here'
                };

                const url = new URL(apiUrl);
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

                fetch(url, {
                    method: 'GET',
                    headers: headers
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error === false && data.data) {
                        const formattedPrice = priceFormatting(data.data);

                        // Store price in localStorage with TTL of 1 day
                        storedPrices[variantCode] = storedPrices[variantCode] || { price: {}, timestamp: 0 };
                        storedPrices[variantCode].price[location] = formattedPrice;
                        storedPrices[variantCode].timestamp = new Date().getTime() + (1 * 24 * 60 * 60 * 1000);

                        setLocalStorage('modelPrice', JSON.stringify(storedPrices));

                        priceElement.textContent = priceText + " " + formattedPrice;
                    } else {
                        const formattedPrice = defaultPrice ? priceFormatting(defaultPrice) : 'Not available';
                        priceElement.textContent = priceText + " " + formattedPrice;
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    const formattedPrice = defaultPrice ? priceFormatting(defaultPrice) : 'Not available';
                    priceElement.textContent = priceText + " " + formattedPrice;
                });
            }
        }

        function setLocalStorage(key, value) {
            localStorage.setItem(key, value);
        }

        function getLocalStorage(key) {
            return localStorage.getItem(key);
        }

        function priceFormatting(price) {
            const formatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            });
            return formatter.format(price);
        }

        createUnifiedFilter(unifiedFilterOptions);
        updateFilterStyles();
        filterCards();

        return newContainer;
    }

    function appendNewHTMLContainer() {
        if (newHTMLContainer) {
            block.appendChild(newHTMLContainer);
        } else {
            console.error('Failed to fetch car data or build HTML container.');
        }
    }

    block.innerHTML = '';
    block.appendChild(newHTMLContainer);
}
