import utility from '../../utility/utility.js';

export default async function decorate(block) {
    const [titleEl, subTitleEl, nameEl, emailEl, stateEl, cityEl, dealerEL, buyerTypeEl, modelEl, mobileEl, otpEl, checkboxEl, btnLabelEl] = block.children;

    const getFieldData = (element) => {
        return element?.textContent?.trim() || '';
    };

    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    const subTitle = getFieldData(subTitleEl);
    const name = getFieldData(nameEl);
    const email = getFieldData(emailEl);
    const state = getFieldData(stateEl);
    const city = getFieldData(cityEl);
    const dealer = getFieldData(dealerEL);
    const buyerType = getFieldData(buyerTypeEl);
    const model = getFieldData(modelEl);
    const mobile = getFieldData(mobileEl);
    const otp = getFieldData(otpEl);
    const checkbox = getFieldData(checkboxEl);
    const btnLabel = getFieldData(btnLabelEl);

    // Sample JSON data
    const testJson = {
        "states": [{
                "id": "1",
                "name": "Maharashtra",
                "abbreviation": "MH",
                "cities": [{
                        "id": "1",
                        "name": "Mumbai",
                        "zipcode": "400001",
                        "carDealerships": [{
                                "id": "1",
                                "name": "Mumbai Motors",
                                "address": "101 Marine Drive",
                                "phone": "022-12345678",
                                "website": "http://www.mumbaimotors.in"
                            },
                            {
                                "id": "2",
                                "name": "South Bombay Cars",
                                "address": "202 Colaba Causeway",
                                "phone": "022-87654321",
                                "website": "http://www.southbombaycars.in"
                            }
                        ]
                    },
                    {
                        "id": "2",
                        "name": "Pune",
                        "zipcode": "411001",
                        "carDealerships": [{
                            "id": "3",
                            "name": "Pune Auto World",
                            "address": "303 MG Road",
                            "phone": "020-12345678",
                            "website": "http://www.puneautoworld.in"
                        }]
                    }
                ]
            },
            {
                "id": "2",
                "name": "Karnataka",
                "abbreviation": "KT",
                "cities": [{
                        "id": "3",
                        "name": "Bengaluru",
                        "zipcode": "560001",
                        "carDealerships": [{
                            "id": "4",
                            "name": "Bengaluru Auto Hub",
                            "address": "404 Brigade Road",
                            "phone": "080-12345678",
                            "website": "http://www.bengaluruautohub.in"
                        }]
                    },
                    {
                        "id": "4",
                        "name": "Mysuru",
                        "zipcode": "570001",
                        "carDealerships": [{
                            "id": "5",
                            "name": "Mysuru Motors",
                            "address": "505 Krishnamurthy Road",
                            "phone": "0821-1234567",
                            "website": "http://www.mysurumotors.in"
                        }]
                    }
                ]
            },
            {
                "id": "3",
                "name": "Delhi",
                "abbreviation": "DL",
                "cities": [{
                    "id": "5",
                    "name": "New Delhi",
                    "zipcode": "110001",
                    "carDealerships": [{
                        "id": "6",
                        "name": "Delhi Car Mart",
                        "address": "123 Connaught Place",
                        "phone": "011-12345678",
                        "website": "http://www.delhicarmart.in"
                    }]
                }]
            },
            {
                "id": "4",
                "name": "Tamil Nadu",
                "abbreviation": "TN",
                "cities": [{
                        "id": "6",
                        "name": "Chennai",
                        "zipcode": "600001",
                        "carDealerships": [{
                            "id": "7",
                            "name": "Chennai Auto Plaza",
                            "address": "234 Mount Road",
                            "phone": "044-12345678",
                            "website": "http://www.chennaiautoplaza.in"
                        }]
                    },
                    {
                        "id": "7",
                        "name": "Coimbatore",
                        "zipcode": "641001",
                        "carDealerships": [{
                            "id": "8",
                            "name": "Coimbatore Motors",
                            "address": "345 Avinashi Road",
                            "phone": "0422-123456",
                            "website": "http://www.coimbatoremotors.in"
                        }]
                    }
                ]
            },
            {
                "id": "5",
                "name": "West Bengal",
                "abbreviation": "WB",
                "cities": [{
                    "id": "8",
                    "name": "Kolkata",
                    "zipcode": "700001",
                    "carDealerships": [{
                        "id": "9",
                        "name": "Kolkata Cars",
                        "address": "456 Park Street",
                        "phone": "033-12345678",
                        "website": "http://www.kolkata-cars.in"
                    }]
                }]
            }
        ]
    };

    // Build the form HTML content
    const formContent = `
    <div class="container btdform" id="defaultNewForm" style="display:block;">
        <div class="bookTestDrive bookTest">
            ${(title) ? `${title.outerHTML}` : ''}
            <p>${subTitle}</p>
            <form class="testDrive" name="testDriveform" novalidate="novalidate">
                <div class="form-group form-group-bottom">
                    <input type="text" id="bttfname" name="name" class="form-control" placeholder=${name} maxlength="30">
                    <span class="error-message" id="nameError" style="color: red; display: none;">Please enter your name.</span>
                </div>
                <div class="form-group form-group-bottom">
                    <input type="email" name="email" id="newTestEmail" class="form-control" placeholder=${email}>
                    <span class="error-message" id="emailError" style="color: red; display: none;">Please enter a valid email address.</span>
                </div>
                <div class="form-group form-group-bottom">
                    <select name="dealerstate" id="dealerstate" class="form-control bookTestDrive_dealerState" onchange="populateCities()">
                        <option value="">${state}</option>
                        <option value="AN">ANDAMAN AND NICOBAR ISLANDS</option>
                        <option value="AP">ANDHRA PRADESH</option>
                        <option value="AR">ARUNACHAL PRADESH</option>
                        <option value="AS">ASSAM</option>
                        <option value="BH">BIHAR</option>
                        <option value="CG">CHANDIGARH</option>
                        <option value="CH">CHHATTISGARH</option>
                        <option value="DN">DADRA AND NAGAR HAVELI</option>
                        <option value="DL">DELHI</option>
                        <option value="GO">GOA</option>
                        <option value="GJ">GUJARAT</option>
                        <option value="HN">HARYANA</option>
                        <option value="HP">HIMACHAL PRADESH</option>
                        <option value="JK">JAMMU AND KASHMIR</option>
                        <option value="JH">JHARKHAND</option>
                        <option value="KT">KARNATAKA</option>
                        <option value="KL">KERALA</option>
                        <option value="LA">LADAKH</option>
                        <option value="MP">MADHYA PRADESH</option>
                        <option value="MH">MAHARASHTRA</option>
                        <option value="MN">MANIPUR</option>
                        <option value="ML">MEGHALAYA</option>
                        <option value="MZ">MIZORAM</option>
                        <option value="NG">NAGALAND</option>
                        <option value="OS">ODISHA</option>
                        <option value="PC">PONDICHERRY</option>
                        <option value="PJ">PUNJAB</option>
                        <option value="RJ">RAJASTHAN</option>
                        <option value="SK">SIKKIM</option>
                        <option value="TN">TAMIL NADU</option>
                        <option value="TL">TELANGANA</option>
                        <option value="TR">TRIPURA</option>
                        <option value="UP">UTTAR PRADESH</option>
                        <option value="UT">UTTARAKHAND</option>
                        <option value="WB">WEST BENGAL</option>
                    </select>
                    <span class="error-message" id="stateError" style="color: red; display: none;">Please select a state.</span>
                </div>
                <div class="form-group form-group-bottom">
                    <select name="dealercity" id="dealercity" class="form-control bookTestDrive_dealerCity" onchange="populateDealers()">
                        <option value="">${city}</option>
                    </select>
                    <span class="error-message" id="cityError" style="color: red; display: none;">Please select a city.</span>
                </div>
                <div class="form-group form-group-bottom">
                    <select name="dealer" id="dealer" class="form-control bookTestDrive_dealer">
                        <option value="">${dealer}</option>
                    </select>
                    <span class="error-message" id="dealerError" style="color: red; display: none;">Please select a dealer.</span>
                </div>
                <div class="form-group form-group-bottom">
                    <select type="buyerType" name="buyerType" id="newbuyerType" class="form-control">
                        <option value="">${buyerType}</option>
                        <option value="1">MY FIRST CAR</option>
                        <option value="2">ADDITIONAL CAR</option>
                        <option value="3">EXCHANGE OF AN OLD CAR</option>
                    </select>
                    <span class="error-message" id="buyerTypeError" style="color: red; display: none;">Please select a buyer type.</span>
                </div>
                <div class="form-group form-group-bottom">
                    <select name="model" id="testCarModelName" class="form-control bookTestDrive_car">
                        <option value="">${model}</option>
                        <option value="AT-ATR4EV100">ALTO K10</option>
                        <option value="VZ-VZR4CV100">BREZZA</option>
                        <option value="CL-CLR4CV100">CELERIO</option>
                        <option value="DI-DRR4HV100">DZIRE</option>
                        <option value="VR-VRRPGHF00">EECO</option>
                        <option value="ER-ERR4FV100">ERTIGA</option>
                        <option value="SP-SPR4BV100">S-PRESSO</option>
                        <option value="SI-SIR4AL100">SWIFT</option>
                        <option value="WA-WAR4HV100">WAGONR</option>
                        <option value="AN-ANR4TLB00">Tour H1</option>
                        <option value="WA-WAR4TL100">Tour H3</option>
                        <option value="DI-DRRCTL100">Tour S</option>
                        <option value="ER-ERRCTL200">Tour M</option>
                        <option value="VR-VRTPGHF00">Tour V</option>
                    </select>
                    <span class="error-message" id="modelError" style="color: red; display: none;">Please select a car model.</span>
                </div>
                <div class="form-group form-group-bottom">
                    <div>
                        <input type="text" name="mobile" id="newTestMobile" class="form-control" placeholder=${mobile} onkeypress="return event.charCode >= 48 && event.charCode <= 57" minlength="10" maxlength="10" required="" aria-required="true" autocomplete="off">
                        <span class="error-message" id="mobileError" style="color: red; display: none;">Please enter a 10-digit mobile number.</span>
                        <span id="sendOtpBtn" class="btsendotp sendOtp otp">Send OTP</span>
                        <span id="error-span" style="color:#f00;"></span>
                    </div>
                    <div id="bsd" class="divResendInfo" style="margin-top: 45px; white-space:nowrap; position:absolute; top:5px; right:115px; font-size:12px; color: green; font-weight: bold; text-align: left; margin-left: 15px; display: none;">
                        <span>RESEND OTP IN</span> &nbsp;<span id="bsd_m">00</span>:<span id="bsd_s">00</span>
                        <input type="text" value="90" id="bsd_seconds" style="display: none">
                    </div>
                </div>
                <div class="form-group otpTxt btdotpTxt form-group-bottom">
                    <input type="text" name="otp" id="btdResendOtp" class="form-control" placeholder=${otp} onkeypress="return event.charCode >= 48 && event.charCode <= 57" minlength="5" maxlength="5" autocomplete="off">
                    <span id="otptestDriveError" style="display: none; color:red;">OTP not matching</span>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="btdcheckbox" disabled value="">
                    <label>
                        ${checkbox}
                    </label>
                    <span class="error-message" id="checkboxError" style="color: red; display: none;">Please agree to the terms and conditions.</span>
                </div>
                <div class="form-group submit">
                    <button type="button" id="btnbookshowroomVisit" style="margin-bottom: 10px;background-color: grey; border: 2px solid grey;">${btnLabel}</button>
                </div>
            </form>
            <input type="hidden" id="dealerType" value="S">
            <input type="hidden" id="dealerType1" value="3S">
        </div>
    </div>
    `;

    // Function to populate cities based on selected state
    document.populateCities = function() {
        const stateAbbreviation = document.getElementById('dealerstate').value;
        const cityDropdown = document.getElementById('dealercity');
        const dealerDropdown = document.getElementById('dealer');

        // Clear existing options
        cityDropdown.innerHTML = '<option value="">Select City</option>';
        dealerDropdown.innerHTML = '<option value="">Select Dealer</option>';

        // Find the selected state
        const state = testJson.states.find(state => state.abbreviation === stateAbbreviation);
        if (state) {
            // Populate cities
            state.cities.forEach(city => {
                cityDropdown.innerHTML += `<option value="${city.name}">${city.name}</option>`;
            });
        }
    };

    // Function to populate dealers based on selected city
    document.populateDealers = function() {
        const stateAbbreviation = document.getElementById('dealerstate').value;
        const cityName = document.getElementById('dealercity').value;
        const dealerDropdown = document.getElementById('dealer');

        // Clear existing options
        dealerDropdown.innerHTML = '<option value="">Select Dealer</option>';

        // Find the selected state and city data
        const state = testJson.states.find(state => state.abbreviation === stateAbbreviation);
        if (state) {
            const city = state.cities.find(city => city.name === cityName);
            if (city) {
                // Populate dealers
                city.carDealerships.forEach(dealer => {
                    dealerDropdown.innerHTML += `<option value="${dealer.name}">${dealer.name}</option>`;
                });
            }
        }
    };

    // Function to validate the form
    function validateField(field) {
        let isValid = true;

        switch (field.id) {
            case 'bttfname':
                if (!field.value.trim()) {
                    document.getElementById('nameError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('nameError').style.display = 'none';
                }
                break;

            case 'newTestEmail':
                if (!field.value.trim() || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(field.value)) {
                    document.getElementById('emailError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('emailError').style.display = 'none';
                }
                break;

            case 'dealerstate':
                if (!field.value.trim()) {
                    document.getElementById('stateError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('stateError').style.display = 'none';
                }
                break;

            case 'dealercity':
                if (!field.value.trim()) {
                    document.getElementById('cityError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('cityError').style.display = 'none';
                }
                break;

            case 'dealer':
                if (!field.value.trim()) {
                    document.getElementById('dealerError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('dealerError').style.display = 'none';
                }
                break;

            case 'newbuyerType':
                if (!field.value.trim()) {
                    document.getElementById('buyerTypeError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('buyerTypeError').style.display = 'none';
                }
                break;

            case 'testCarModelName':
                if (!field.value.trim()) {
                    document.getElementById('modelError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('modelError').style.display = 'none';
                }
                break;

            case 'newTestMobile':
                if (!/^\d{10}$/.test(field.value)) {
                    document.getElementById('mobileError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('mobileError').style.display = 'none';
                }
                break;

            case 'btdResendOtp':
                if (field.value.trim() && field.value.length !== 5) {
                    document.getElementById('otptestDriveError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('otptestDriveError').style.display = 'none';
                }
                break;

            default:
                break;
        }

        // Enable/Disable submit button based on field validation
        document.getElementById('btnbookshowroomVisit').disabled = !isValid;

        return isValid;
    }

    // Function to handle OTP sending
    document.handleOtp = function() {
        // Validate all fields
        const allFields = document.querySelectorAll('#defaultNewForm input, #defaultNewForm select');
        let isValid = true;

        allFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // If form is valid, proceed with OTP sending
            document.getElementById('error-span').textContent = '';
            // Logic for sending OTP goes here
            verifyOtp();
        }
    };

    // Function to handle OTP verification
    function verifyOtp() {
        const otpField = document.getElementById('btdResendOtp');
        const otpValue = otpField.value.trim();

        // Example logic for OTP verification
        if (otpValue.length === 5) {
            // Assume OTP is valid, you can add real verification logic here
            document.getElementById('btdcheckbox').disabled = false;
            //            document.getElementById('checkboxError').style.display = 'none';
        } else {
            //            document.getElementById('checkboxError').style.display = 'block';
        }
    }

    // Inject form HTML into the block
    block.innerHTML = utility.sanitizeHtml(formContent);

    // Event listeners for form fields
    document.querySelectorAll('#defaultNewForm input, #defaultNewForm select').forEach(field => {
        field.addEventListener('input', () => {
            validateField(field);
        });
    });

    // Add event listener to the Send OTP button
    const sendOtpBtn = document.querySelector('#sendOtpBtn');
    sendOtpBtn.addEventListener('click', (event) => {
        document.handleOtp();
    });

    // Event listener for OTP field
    document.getElementById('btdResendOtp').addEventListener('input', () => {
        verifyOtp();
    });

    // Event listener for checkbox
    document.getElementById('btdcheckbox').addEventListener('change', () => {
        validateField(document.getElementById('btdcheckbox'));
    });

}

//${testJson.states.map(state => `<option value="${state.abbreviation}">${state.name}</option>`).join('')}