const name = document.getElementById("name");
const email = document.getElementById("email");
const otherJobRole = document.getElementById("other-job-role");
const title = document.getElementById("title");
const total = document.getElementById("activities-cost");
const allActivities = document.querySelectorAll("#activities-box input");
const activities = document.getElementById("activities");
const payPal = document.getElementById("paypal");
const bitCoin = document.getElementById("bitcoin");

// make "name" field selected upon load
name.focus();

// hide PayPal and BitCoin text boxes on load
payPal.style.display = "none";
bitCoin.style.display = "none";

/**
 * VALIDATORS
 *  add "not-valid" class to invalid input
 *  add "valid" class to valid input
 *  show "hint" element on invalid input
 */
function isNameValid() {
  const validName = name.value.trim().length > 0;
  if (!validName) {
    name.parentElement.classList.add("not-valid");
    name.parentElement.classList.remove("valid");
    name.nextElementSibling.style.display = "block";
  } else {
    name.parentElement.classList.remove("not-valid");
    name.parentElement.classList.add("valid");
    name.nextElementSibling.style.display = "none";
  }
  return validName;
}

// Produce real-time error message on "name" input
name.addEventListener("keyup", e => {
  isNameValid();
});

function isEmailValid() {
  const validEmail = /^\w[\w.-]*@\w[\w.-]*\.[a-z]+$/i.test(email.value);
  if (!validEmail) {
    email.parentElement.classList.add("not-valid");
    email.parentElement.classList.remove("valid");
    email.nextElementSibling.style.display = "block";
    email.parentElement.lastElementChild.style.display = "block";
  } else {
    email.parentElement.classList.remove("not-valid");
    email.parentElement.classList.add("valid");
    email.nextElementSibling.style.display = "none";
  }
  return validEmail;
}

function hasRegistered() {
  const validRegistration = Array.from(allActivities).some(activity => activity.checked);
  if (!validRegistration) {
    activities.classList.add("not-valid");
    activities.classList.remove("valid");
  } else {
    activities.classList.remove("not-valid");
    activities.classList.add("valid");
  }
  return validRegistration;
}

// validate all credit card input
function isCreditCardValid() {
  const zip = document.getElementById("zip");
  const cvv = document.getElementById("cvv");
  const cardNumber = document.getElementById("cc-num");
  const expMonth = document.getElementById("exp-month");
  const expYear = document.getElementById("exp-year");

  const validZip = /^\d{5}$/.test(zip.value);
  if (!validZip) {
    zip.parentElement.classList.add("not-valid");
    zip.parentElement.classList.remove("valid");
    zip.nextElementSibling.style.display = "block";
  } else {
    zip.parentElement.classList.remove("not-valid");
    zip.parentElement.classList.add("valid");
    zip.nextElementSibling.style.display = "";
  }

  const validCVV = /^\d{3}$/.test(cvv.value);
  if (!validCVV) {
    cvv.parentElement.classList.add("not-valid");
    cvv.parentElement.classList.remove("valid");
    cvv.nextElementSibling.style.display = "block";
  } else {
    cvv.parentElement.classList.remove("not-valid");
    cvv.parentElement.classList.add("valid");
    cvv.nextElementSibling.style.display = "";
  }

  const validCCNumber = /^\d{13,16}$/.test(cardNumber.value);
  if (!validCCNumber) {
    cardNumber.parentElement.classList.add("not-valid");
    cardNumber.parentElement.classList.remove("valid");
    cardNumber.nextElementSibling.style.display = "block";
  } else {
    cardNumber.parentElement.classList.remove("not-valid");
    cardNumber.parentElement.classList.add("valid");
    cardNumber.nextElementSibling.style.display = "";
  }

  // Extra validation on month / year input
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  let validYear;
  let validMonth;

  if (expYear.value && Number.parseInt(expYear.value) >= year) {
    expYear.previousElementSibling.classList.remove("not-valid");
    expYear.classList.remove("not-valid");
    expYear.previousElementSibling.classList.add("valid");
    validYear = true;
  } else {
    expYear.previousElementSibling.classList.add("not-valid");
    expYear.classList.add("not-valid");
    expYear.previousElementSibling.classList.remove("valid");
    validYear = false;
  }

  if (
    expMonth.value &&
    (Number.parseInt(expYear.value) > year || (expYear.value == year && month < Number.parseInt(expMonth.value)))
  ) {
    expMonth.previousElementSibling.classList.remove("not-valid");
    expMonth.classList.remove("not-valid");
    expMonth.previousElementSibling.classList.add("valid");
    validMonth = true;
  } else {
    expMonth.previousElementSibling.classList.add("not-valid");
    expMonth.classList.add("not-valid");
    expMonth.previousElementSibling.classList.remove("valid");
    validMonth = false;
  }

  return validZip && validCVV && validCCNumber && validYear && validMonth;
}

// Set "other job" field to not display when job title not "other"
// and listen for change to "other" option field
otherJobRole.style.display = "none";

title.addEventListener("change", e => {
  if (e.target.value === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});

// T-Shirt Section
const shirtColors = document.getElementById("color");
shirtColors.setAttribute("disabled", "");

const shirtOptions = document.querySelectorAll("#color option");

const designs = document.getElementById("design");
designs.addEventListener("change", e => {
  shirtOptions[0].selected = true; // set default selection on every design change to clear pop up menu of existing value
  const theme = e.target.value;
  shirtColors.removeAttribute("disabled");
  shirtOptions.forEach(shirt => {
    if (shirt.dataset.theme === theme) {
      shirt.style.display = "block";
    } else {
      shirt.style.display = "none";
    }
  });
});

// Interactive Cost Calculator
activities.addEventListener("change", e => {
  let totalCost = 0;

  allActivities.forEach(activity => {
    if (activity.checked) totalCost += Number.parseInt(activity.dataset.cost);
  });
  total.textContent = `Total: $${totalCost}`;
});

// Payment Pop Up Menu
const payment = document.getElementById("payment");
const paymentSelection = document.querySelectorAll("#payment option");
paymentSelection[1].selected = true;

const creditCard = document.getElementById("credit-card");

payment.addEventListener("change", e => {
  if (e.target.value !== "credit-card") {
    creditCard.style.display = "none";
    if (e.target.value === "paypal") {
      bitCoin.style.display = "none";
      payPal.style.display = "block";
    } else {
      bitCoin.style.display = "block";
      payPal.style.display = "none";
    }
  } else {
    payPal.style.display = "none";
    bitCoin.style.display = "none";
    creditCard.style.display = "block";
  }
});

// Focus form
const checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("focus", e => {
    e.target.parentNode.classList.add("focus");
  });
});
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("blur", e => {
    e.target.parentNode.classList.remove("focus");
  });
});

// Add change event handler on checkboxes
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", e => {
    if (e.target.checked) {
      checkboxes.forEach(item => {
        const activity = item.nextElementSibling.textContent;
        const data = item.dataset.dayAndTime;
        if (e.target.nextElementSibling.textContent !== activity && e.target.dataset.dayAndTime === data) {
          item.setAttribute("disabled", "");
          item.nextElementSibling.style.color = "lightgray";
        }
      });
    } else {
      checkboxes.forEach(item => {
        if (item.dataset.dayAndTime === e.target.dataset.dayAndTime) {
          item.removeAttribute("disabled");
          item.nextElementSibling.style.color = "black";
        }
      });
    }
  });
});

/**
 * Dynamic validation errors on email input
 *  - insert error messages into DOM under "email" input
 *  - validate email input on keyup
 */
email.parentElement.insertAdjacentHTML(
  "beforeend",
  "<p class='email-hint hint' id='email-username'>A username is required at the start of the email address</p>"
);
email.parentElement.insertAdjacentHTML(
  "beforeend",
  "<p class='email-hint hint' id='email-atsymbol'>An @ symbol is required in the middle of the email address</p>"
);
email.parentElement.insertAdjacentHTML(
  "beforeend",
  "<p class='email-hint hint' id='email-domain'>A dot domain name is required at the end of the email address</p>"
);

const username = document.getElementById("email-username");
const atsymbol = document.getElementById("email-atsymbol");
const domain = document.getElementById("email-domain");

email.addEventListener("keyup", e => {
  if (!/^[a-z0-9][\w.-]*/i.test(e.target.value)) {
    username.style.display = "block";
  } else {
    username.style.display = "";
  }
  if (!/[a-z0-9]@[a-z0-9]/i.test(e.target.value)) {
    atsymbol.style.display = "block";
  } else {
    atsymbol.style.display = "";
  }
  if (!/\.[a-z]+$/i.test(e.target.value)) {
    domain.style.display = "block";
  } else {
    domain.style.display = "";
  }
  isEmailValid();
});

// Run all validations on submit
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  const isNameValidCheck = isNameValid();
  const isEmailValidCheck = isEmailValid();
  const isRegistrationValidCheck = hasRegistered();
  let isCreditCardValidCheck = true;
  if (payment.value === "credit-card") {
    isCreditCardValidCheck = isCreditCardValid();
  }

  const everythingIsValid = isNameValidCheck && isEmailValidCheck && isRegistrationValidCheck && isCreditCardValidCheck;

  // If there are any invalid inputs the page will
  // not refresh to let user make required changes
  if (!everythingIsValid) {
    e.preventDefault();
    console.log("Validation has failed. Please review your input and try again.");
  }
});
