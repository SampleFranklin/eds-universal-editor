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

//  const { publishDomain, apiKey } = await fetchPlaceholders();
    const url = 'https://dev-arena.marutisuzuki.com/content/arena/services/token';
//  const url = `${publishDomain}/content/arena/services/token`;
    let authorization = null;
    try {
        const auth = await fetch(url);
        authorization = await auth.text();
    } catch (e) {
        authorization = '';
    }

    const defaultHeaders = {
        'x-api-key': '3Oa87EBtBK9k4QQa87eYDaTB2CcLnbp7aqd00kqH',
        Authorization: authorization,
    };

    const urlWithParams = 'https://api.preprod.developersatmarutisuzuki.in/masterdata/v1/common/CommonMasterData/state-list';
    let result;
    try {
    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: defaultHeaders,
    });
    result = await response.json();
    console.log(result);
    } catch (e) {
        throw new Error('Network response was not ok', e);
    }

    const graphQLUrl = 'https://publish-p135331-e1341966.adobeaemcloud.com/graphql/execute.json/msil-platform/CarModelById?z=10';
    let output;
    try {
        const resp = await fetch(graphQLUrl);
        output = await resp.json();
        console.log(output);
    } catch (e) {
        throw new Error('Network response was not ok', e);
    }

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
                        ${result.data.map(state => `<option value="${state.stateCode}">${state.stateDescription}</option>`).join('')}
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
                        ${output.data.carModelList.items.filter(carModel => (carModel._path.includes('/arena') == true)).map(carModel => `<option value="${carModel.modelDesc}">${carModel.modelDesc}</option>`).join('')}
                    </select>
                    <span class="error-message" id="modelError" style="color: red; display: none;">Please select a car model.</span>
                </div>
                <div class="form-group form-group-bottom">
                    <div>
                        <input type="text" name="mobile" id="newTestMobile" class="form-control" placeholder=${mobile} onkeypress="return event.charCode >= 48 && event.charCode <= 57" minlength="10" maxlength="10" required="" aria-required="true" autocomplete="off">
                        <span class="error-message" id="mobileError" style="color: red; display: none;">Please enter a 10-digit mobile number.</span>
                        <span id="sendOtpBtn" class="btsendotp sendOtp otp" style="border: 2px solid black;">Send OTP</span>
                        <span id="error-span" style="color:#f00;"></span>
                    </div>
                    <div id="bsd" class="divResendInfo" style="margin-top: 45px; white-space:nowrap; position:absolute; top:5px; right:115px; font-size:12px; color: green; font-weight: bold; text-align: left; margin-left: 15px; display: none;">
                        <span>RESEND OTP IN</span> &nbsp;<span id="bsd_m">00</span>:<span id="bsd_s">00</span>
                        <input type="text" value="90" id="bsd_seconds" style="display: none">
                    </div>
                </div>
                <div class="form-group otpTxt btdotpTxt form-group-bottom">
                    <input type="text" name="otp" id="btdResendOtp" class="form-control" placeholder=${otp} onkeypress="return event.charCode >= 48 && event.charCode <= 57" minlength="5" maxlength="5" autocomplete="off">
                    <span id="otptestDriveError" style="display: none; color:red;">Please enter at least 5 characters.</span>
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
    document.populateCities = async function() {
        const stateAbbreviation = document.getElementById('dealerstate').value;
        const cityDropdown = document.getElementById('dealercity');
        const dealerDropdown = document.getElementById('dealer');

        // Clear existing options
        cityDropdown.innerHTML = '<option value="">Select City</option>';
        dealerDropdown.innerHTML = '<option value="">Select Dealer</option>';

        if(stateAbbreviation){
            const getCitiesUrl = 'https://api.preprod.developersatmarutisuzuki.in/dms/v1/api/common/msil/dms/dealer-only-cities?channel=NRM&stateCode='+stateAbbreviation;
            try {
                const response = await fetch(getCitiesUrl, {
                  method: 'GET',
                  headers: defaultHeaders,
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const cities = await response.json();
                const options = cities.data.filter(city => city.cityDesc).map(city => `<option value="${city.cityCode}">${city.cityDesc}</option>`).join('');
                cityDropdown.innerHTML += options;
            } catch (e) {
                throw new Error('Network response was not ok', e);
            }
        }
    };

    // Function to populate dealers based on selected city
    document.populateDealers = async function() {
        const stateAbbreviation = document.getElementById('dealerstate').value;
        const cityCode = document.getElementById('dealercity').value;
        console.log(cityCode);
        const dealerDropdown = document.getElementById('dealer');
        // Clear existing options
        dealerDropdown.innerHTML = '<option value="">Select Dealer</option>';

        if (cityCode) {
            // Define the API endpoint to fetch dealers based on the cityCode
            const getDealersUrl = 'https://api.preprod.developersatmarutisuzuki.in/dms/v1/api/common/msil/dms/dealer-master?channel=NRM&outletType=O&cityCd='+cityCode;
            try {
                const response = await fetch(getDealersUrl, { method: 'GET', headers: defaultHeaders });
                if (!response.ok) throw new Error('Network response was not ok');
                const dealers = await response.json();
                console.log(dealers);
                // Filter and populate dealer dropdown
                const options = dealers.data.filter(dealer => dealer.name).map(dealer => `<option value="${dealer.dealerCode}">${dealer.name}</option>`).join('');
                dealerDropdown.innerHTML += options;
            } catch (error) {
                console.error('Failed to fetch dealers:', error);
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

    let timerInterval;
    let remainingTime = 90; // Timer duration in seconds

    function startTimer() {
        const sendOtpBtn = document.getElementById('sendOtpBtn');
        const timerDisplay = document.getElementById('bsd');
        sendOtpBtn.style.pointerEvents = 'none';
        timerDisplay.style.display = 'inline';
        timerDisplay.innerHTML = `<span>RESEND OTP IN</span> &nbsp;<span id="bsd_m">${Math.floor(remainingTime / 60).toString().padStart(2, '0')}</span>:<span id="bsd_s">${(remainingTime % 60).toString().padStart(2, '0')}</span>`;

        timerInterval = setInterval(() => {
            remainingTime -= 1;
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                sendOtpBtn.style.pointerEvents = 'auto';
                timerDisplay.style.display = 'none';
                remainingTime = 90; // Reset timer
            } else {
                document.getElementById('bsd_m').textContent = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                document.getElementById('bsd_s').textContent = (remainingTime % 60).toString().padStart(2, '0');
            }
        }, 1000);
    }
    // Function to handle OTP sending
    document.handleOtp = async function() {
        // Validate all fields
        const allFields = document.querySelectorAll('#defaultNewForm input, #defaultNewForm select');
        let isValid = true;

        allFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            const mobileNumber = document.getElementById('newTestMobile').value;
            console.log(mobileNumber);

            const requestBody = {
              otpLength: 5,
              mobile: mobileNumber,
              validity:"300"
            };

            // If form is valid, proceed with OTP sending
            document.getElementById('error-span').textContent = '';
            const sendOtpBtn = document.getElementById('sendOtpBtn');
            const sendOtpUrl = 'https://api.preprod.developersatmarutisuzuki.in/masterdata/v1/common/CommonMasterData/send-otp'
            try {
                const response = await fetch(sendOtpUrl, {
                  method: 'POST',
                  headers: {
                    ...defaultHeaders,
                    'Content-Type': 'application/json' // Ensure the header specifies JSON content
                  },
                  body: JSON.stringify(requestBody) // Convert the body to a JSON string
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const otpResponse = await response.json();
                sendOtpBtn.innerText = 'RESEND OTP';
                startTimer();
            } catch (error) {
                console.error('Failed to Send OTP:', error);
            }
        }
    };

    // Function to handle OTP verification
    function verifyOtp() {
        const otpField = document.getElementById('btdResendOtp');
        const otpValue = otpField.value.trim();
        if (otpValue.length === 5) {
            document.getElementById('btdcheckbox').disabled = false;
        } else {
            document.getElementById('btdcheckbox').disabled = true;
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
    const sendOtpBtnSelector = document.querySelector('#sendOtpBtn');
    sendOtpBtnSelector.addEventListener('click', (event) => {
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

