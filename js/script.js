// make "name" field selected upon load
const name = document.getElementById("name");
name.focus();

// set "other job" field to not display when job title not "other"
const otherJobRole = document.getElementById("other-job-role");
const title = document.getElementById("title");

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
  Array.from(shirtOptions).forEach(shirt => {
    if (shirt.dataset.theme === theme) {
      shirt.style.display = "block";
    } else {
      shirt.style.display = "none";
    }
  });
});
