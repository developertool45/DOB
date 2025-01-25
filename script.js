let dateInput = document.querySelector('#date');
dateInput.addEventListener('change', function(event) {
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
    document.querySelector('#age').innerHTML = `${ageYears} years ${ageMonths} months ${ageDays} days`;
    window.print();
}

