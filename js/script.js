// make "name" field selected upon load
const name = document.getElementById("name");
name.focus();

const otherJobRole = document.getElementById("other-job-role");
otherJobRole.style.display = "none";

const title = document.getElementById("title");

title.addEventListener("change", e => {
  if (e.target.value === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});
