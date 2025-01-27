let dateInput = document.querySelector("#date");
let today = new Date();
let curYear, curMonth, curDay;
let formData = document.querySelector(".form");

formData.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let year = document.querySelector("#year").value;
  let month = document.querySelector("#month").value;
  let day = document.querySelector("#day").value;
  validateDate(year, month, day);
});

function validateDate(year, month, day) {
  if (year.length !== 4 || year < 1900 || year > today.getFullYear()) {
    alert(" year should be 1900 to " + today.getFullYear());
    return;
  }
  if (month < 1 || month > 12) {
    alert("Month should be between 01 and 12");
    return;
  }
  if (day < 1 || day > 31) {
    alert("Day should be between 01 and 31");
    return;
  }
  calculateAge(year, month, day);
}
function calculateAge(year, month, day) {
  curYear = today.getFullYear();
  curMonth = today.getMonth() + 1;
  curDay = today.getDate();
  if (curDay < day) {
    curDay += 30;
    curMonth--;
  }

  if (curMonth < month) {
    curMonth += 12;
    curYear--;
  }
  displayAge(year, month, day);
}

function displayAge(year, month, day) {
  let ageYears = curYear - year;
  let ageMonths = curMonth - month;
  let ageDays = curDay - day;
  document.querySelector(
    "#age"
  ).innerHTML = `${ageYears} years ${ageMonths} months ${ageDays} days`;
  // window.print();
  attempts(ageYears, ageMonths, ageDays);
}

function attempts(ageYears, ageMonths, ageDays) {
  let totalYears = ageYears + ageMonths / 12 + ageDays / 365;
  let result = document.querySelector(".result h3");
  let showAttempts = document.querySelector(".result p");

  let attempts;
  if (totalYears < 16.5) {
    let remainYears = 16.5 - ageYears;
    result.textContent = `please wait for ${Math.abs(remainYears).toFixed(
      2
    )} years`;
    showAttempts.textContent = "";
  } else if (totalYears >= 16.5 && totalYears <= 19.5) {
    let remainYears = 19.5 - ageYears;
    attempts = Math.floor(remainYears * 2);
    result.textContent = " ";
    showAttempts.textContent = `Your attempts: ${attempts}`;
  } else {
    attempts = 0;
    result.textContent = "Ops! Let's try for Merchant Navy";
    showAttempts.textContent = `remain attempts: ${attempts}`;
  }
}
