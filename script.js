let dateInput = document.querySelector("#date");
dateInput.addEventListener("change", function (event) {
  let userDate = new Date(event.target.value);
  let userYear = userDate.getFullYear();
  let userMonth = userDate.getMonth() + 1;
  let userDay = userDate.getDate();
  calculateAge(userYear, userMonth, userDay);
});

function calculateAge(year, month, day) {
  let today = new Date();
  let curYear = today.getFullYear();
  let curMonth = today.getMonth() + 1;
  let curDay = today.getDate();

  if (curDay < day) {
    curDay += 30;
    curMonth--;
  }

  if (curMonth < month) {
    curMonth += 12;
    curYear--;
  }

  displayAge(curYear, curMonth, curDay, year, month, day);
}

function displayAge(curYear, curMonth, curDay, year, month, day) {
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
  let attempts = 0;
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
