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
 * Validators
 */
function isNameValid() {
  const isValid = name.value.trim().length > 0;
  if (!isValid) {
    name.parentElement.classList.add("not-valid");
  } else {
    name.parentElement.classList.remove("not-valid");
  }
  return isValid;
}

function isEmailValid() {
  const isValid = /^\w[\w.-]*@\w[\w.-]*\.[a-z]+$/i.test(email.value);
  if (!isValid) {
    email.parentElement.classList.add("not-valid");
  } else {
    email.parentElement.classList.remove("not-valid");
  }
  return isValid;
}

function hasRegistered() {
  const isValid = Array.from(allActivities).some(activity => activity.checked);
  if (!isValid) {
    activities.classList.add("not-valid");
  } else {
    activities.classList.remove("not-valid");
  }
  return;
}

function isCreditCardValid() {
  const zip = document.getElementById("zip");
  const cvv = document.getElementById("cvv");
  const cardNumber = document.getElementById("cc-num");

  const validZip = /\d{5}/.test(zip.value);
  const validCVV = /\d{3}/.test(cvv.value);
  const validCCNumber = /\d{13,16}/.test(cardNumber.value);

  return /\d{5}/.test(zip.value) && /\d{3}/.test(cvv.value) && /\d{13,16}/.test(cardNumber.value);
}

// set "other job" field to not display when job title not "other"
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

// focus form
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

// validation on submit
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

  if (!everythingIsValid) {
    e.preventDefault();
    console.log("NOPE");
  }
});
