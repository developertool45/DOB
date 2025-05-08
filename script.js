const form = document.querySelector("#age-form");
const t = new Date();
let course = null;
form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const year = document.querySelector("#year").value;
  const month = document.querySelector("#month").value;
  const day = document.querySelector("#day").value;
  const name = document.querySelector("#name").value;
  const mobile = document.querySelector("#mobileNumber").value;
  const usercourse = document.querySelector("#courses").value;
  course = usercourse;
  // console.log(name, mobile, year, month, day, courses);
  validateDate(year, month, day, course, name, mobile);
});
function validateDate(year, month, day, course, name, mobile) {
  if (year.length !== 4 || year < 1950 || year > t.getFullYear()) {
    alert(" year should be 1950 to " + t.getFullYear());
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
  if (!course) {
    alert("Please select a course");
    return;
  }
  if (!name) {
    alert("Please enter your name");
    return;
  }
  if (!mobile) {
    alert("Please enter your mobile number");
    return;
  }
  calculateAge(year, month, day, course);
}
function calculateAge(year, month, day) {
  curYear = t.getFullYear(); //current year
  curMonth = t.getMonth() + 1; //current month
  curDay = t.getDate(); //current day

  //if current day is less than birth day
  if (curDay < day) {
    curDay += 30;
    curMonth--;
  }
  // if current month is less than birth month
  if (curMonth < month) {
    curMonth += 12;
    curYear--;
  }
  // if current year is less than birth year
  if (curYear < year) {
    alert("You are not born yet");
    return;
  }

  let calYears = curYear - year;
  let calMonths = curMonth - month;
  let calDays = curDay - day;

  const showAge = document.querySelector("#age");
  showAge.textContent = `${calYears} years, ${calMonths} months, ${calDays} days`;
  document.querySelector(".result").classList.add("show");
  // user age in years
  const userAgeinYears =
    (Date.now() - new Date(`${year}-${month}-${day}`)) /
    (1000 * 3600 * 24 * 365.25);
  const userYears = +userAgeinYears.toFixed(1);
  attempts(userYears);
}
function attempts(years) {
  const warningMsg = document.querySelector(".content p");
  const remainingAttempts = document.querySelector(".attempts .attempt");
  const suggestion = document.querySelector("#suggetion");
  // attemps and result
  if (course == "NDA" && years >= 16.5 && years <= 19.5) {
    console.log("============nda part============");
    let attempts = 0;
    let remainYears = (19.5 - years).toFixed(1);
    const [year, month] = remainYears.toString().split(".");
    console.log(remainYears, year, month);
    attempts = Math.floor(year * 2);
    if (month <= 5) {
      attempts += 1;
      if (month > 5) attempts += 1;
    }
    warningMsg.textContent = " ";
    remainingAttempts.textContent = `Your remaining attempts: ${attempts}`;
    if (attempts == 1) {
      suggestion.textContent =
        "But don’t worry! You can still serve the nation through CDS, AFCAT, or OTA exams.";
    }
  }

  if ((course == "CDSE" && years > 19.5) || years <= 25) {
    console.log("cdse");
    return;
  }
  if (course == "AFCAT") {
    console.log("afcat");
    return;
  }
  if (course == "AGNIVEER") {
    console.log("agniveer");
    return;
  }
}
function calculateAttempts(years) {
  const warningMsg = document.querySelector(".content p");
  const remainingAttempts = document.querySelector(".attempts .attempt");
  const suggetion = document.querySelector("#suggetion");
  console.log(years, "calculated years");
  let attempts = 0;
  if (years) {
    let remainYears = 19.5 - years;
    if (remainYears < 0.5) {
      attempts = 1;
      warningMsg.textContent = " ";
      remainingAttempts.textContent = `Your remaining attempts: ${attempts}`;
      return;
    }
    attempts = Math.floor(remainYears * 2);
    console.log(attempts);

    warningMsg.textContent = " ";
    remainingAttempts.textContent = `Your remaining attempts: ${attempts}`;
  }
}

// if (years >= 16.5 && years <= 19.5) {
//   let remainYears = 19.5 - year;
//   if (remainYears < 0.5) {
//     attempts = 1;
//     warningMsg.textContent = " ";
//     remainingAttempts.textContent = `Your remaining attempts: ${attempts}`;
//     return;
//   }
//   attempts = Math.floor(remainYears * 2);
//   warningMsg.textContent = " ";
//   remainingAttempts.textContent = `Your remaining attempts: ${attempts}`;
// } else {
//   remainingAttempts.style.display = "none";
//   attempts = `0`;
//   warningMsg.textContent = `You are not eligible for the NDA exam as you are older than the age limit.`;
//   suggetion.textContent = `But don’t worry! You can still serve the nation through CDS, AFCAT, or OTA exams.`;
// }
