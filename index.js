document.getElementById("age-form").addEventListener("submit", submitForm);
function calculateAge(ud) {
  const td = new Date();
  if (ud > td) {
    return "Error: Birth date cannot be in the future.";
  }
  let y = td.getFullYear() - ud.getFullYear();
  let m = td.getMonth() - ud.getMonth();
  let d = td.getDate() - ud.getDate();
  if (d < 0) {
    m--;
    d += new Date(td.getFullYear(), td.getMonth(), 0).getDate();
  }
  if (m < 0) {
    a--;
    m += 12;
  }
  return {
    years: y,
    months: m,
    days: d,
  };
}
const suggestionText =
  "But don’t worry! You can still serve the nation through CDS, AFCAT, or OTA exams.";
function calculateEligibility(examType, years, months) {
  const ageInMonths = years * 12 + months;
  let message = "";

  function calculateAttemptsLeft(endAgeMonths) {
    return Math.floor((endAgeMonths - ageInMonths) / 12);
  }

  function generateLink(url, text) {
    return `<br><br><a href="${url}" target="_blank"><button>${text}</button></a>`;
  }

  function ndaEligibility() {
    const startAge = 15 * 12 + 8;
    const endAge = 18 * 12 + 8;
    if (ageInMonths < startAge) {
      const monthsRemaining = startAge - ageInMonths;
      return `You are not eligible for the NDA exam yet. You’ll be eligible in approximately ${monthsRemaining} months.  ${generateLink(
        "https://tejashdefenceacademy.com/nda-foundation-course-11th-12th-registration",
        "Join NDA Foundation Course"
      )}`;
    } else if (ageInMonths <= endAge) {
      const attempts = Math.floor((endAge - ageInMonths) / 6);
      return `You are eligible for NDA and have ${attempts} attempts left.
        ${generateLink(
          "https://tejashdefenceacademy.com/best-nda-coaching-in-dehradun/",
          "Join NDA Foundation Course"
        )},
        ${generateLink(
          "https://dehradundefenceacademy.com/nda-foundation-course-coaching-after-10-in-dehradun-sip/",
          "Join NDA target Course"
        )}`;
    }
    return `<p>You are not eligible for the NDA exam as you are older than the age limit.</p> </br><p id="suggestion">${suggestionText}</p>
    ${generateLink(
      "https://tejashdefenceacademy.com/cds-coaching-in-dehradun/",
      "Prepare for CDS/OTA"
    )}
    ${generateLink(
      "https://tejashdefenceacademy.com/cds-coaching-in-dehradun/",
      "Prepare for AFCAT"
    )}`;
  }

  function cdseEligibility() {
    const startAge = 19 * 12;
    const endAge = 25 * 12;
    if (ageInMonths < startAge) {
      return `You are not eligible for CDSE. The age limit is between 19 and 25 years.`;
    } else if (ageInMonths <= endAge) {
      const attempts = calculateAttemptsLeft(endAge);
      return `<p>You are eligible for CDSE and have ${attempts} attempts left. The exam is held in April and September.</p>
       ${generateLink(
         "https://pages.razorpay.com/tejashdefenceacademy",
         "Prepare for CDS/OTA"
       )} 
       `;
    }
    return `You are not eligible for CDSE as you are older than the age limit.`;
  }

  function afcatEligibility() {
    const flyingStart = 20 * 12;
    const flyingEnd = 24 * 12;
    const groundStart = 20 * 12;
    const groundEnd = 26 * 12;
    let response = "";

    if (ageInMonths >= flyingStart && ageInMonths <= flyingEnd) {
      const attempts = calculateAttemptsLeft(flyingEnd);
      response += `<p>You are eligible for AFCAT Flying Branch and have ${attempts} attempts left </p>.
      ${generateLink(
        "https://pages.razorpay.com/tejashdefenceacademy",
        "Prepare for AFCAT"
      )}`;
    } else {
      response += `<p>You are not eligible for AFCAT Flying Branch. The age limit is 20 to 24 years.</p>`;
    }

    if (ageInMonths >= groundStart && ageInMonths <= groundEnd) {
      const attempts = calculateAttemptsLeft(groundEnd);
      response += `<p>You are eligible for AFCAT Ground Duty Branch and have ${attempts} attempts left.</p>
      ${generateLink(
        "https://pages.razorpay.com/tejashdefenceacademy",
        "Prepare for AFCAT"
      )}`;
    } else {
      response += `<br><p>You are not eligible for AFCAT Ground Duty Branch. The age limit is 20 to 26 years.</p>`;
    }
    return response;
  }

  function agniveerEligibility() {
    const startAge = 19 * 12;
    const endAge = 25 * 12;
    if (ageInMonths < startAge) {
      return `<p>You are not eligible for Agniveer. The age limit is between 19 and 25 years.</p>`;
    } else if (ageInMonths <= endAge) {
      const attempts = calculateAttemptsLeft(endAge);
      return `<p>You are eligible for Agniveer and have ${attempts} attempts left.</p>
      ${generateLink(
        "https://pages.razorpay.com/tejashdefenceacademy",
        "Prepare for Agniveer"
      )}`;
    }
    return `<p>You are not eligible for Agniveer as you are older than the age limit.</p>`;
  }

  switch (examType) {
    case "nda":
      message = ndaEligibility();
      break;
    case "cdse":
      message = cdseEligibility();
      break;
    case "afcat":
      message = afcatEligibility();
      break;
    case "agniveer":
      message = agniveerEligibility();
      break;
    default:
      message = "Invalid exam type.";
  }
  return message;
}
function validateForm() {
  const e = document.getElementById("mobileNumber").value;
  if (!/^\d{10}$/.test(e)) {
    alert("Please enter a valid 10-digit mobile number.");
    return false;
  }
  return true;
}
function submitForm(ev) {
  ev.preventDefault();
    if (!validateForm()) {
      return false;
    }
  const e = document.getElementById("name").value;
  const t = document.getElementById("mobileNumber").value;
  const a = document.getElementById("date").value;
  const n = document.getElementById("courses").value;
 
  const o = new Date(a);
    const r = calculateAge(o);
    const resultShow = document.getElementById("result");
  if (typeof r === "string") {
    resultShow.innerHTML = r;
    return false;
  }
    const i = calculateEligibility(n, r.years, r.months);
    resultShow.classList.add('show')

  document.getElementById(
    "age"
    ).innerHTML = ` ${r.years} years, ${r.months} months, and ${r.days} days`;

    document.querySelector("#attempts").innerHTML = i;
  //   const c = {
  //     name: e,
  //     phone: t,
  //     age: `${r.years} years, ${r.months} months, ${r.days} days`,
  //     course: n,
  //   };
  // const l = new URLSearchParams(c).toString();

  //   fetch('index.php', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: l.toString(),
  //   })
  //     .then((e) => e.json())
  //     .then((e) => {
  //       console.log("Success:", e);
  //     })
  //     .catch((e) => {
  //       console.error("Error:", e);
  //     });
  //   return false;
}
