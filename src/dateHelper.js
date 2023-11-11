// Date for website
// This uses Date() in js to display the date, time and other info
// Formatting is changed to my liking

// Grabs date element in html
const dateElement = document.getElementById("date");

/**
 * 
 */
const getDiff = function (ele) {

  const nowDate = new Date();
  const nowDateTimeUpdated = nowDate.toLocaleDateString(undefined, { hour: 'numeric', minute: 'numeric', second: 'numeric' });
  // console.log(ele);

  // get Time
  // console.log(ele);
  const index1 = ele.indexOf(':');
  const index2 = ele.indexOf(' ');
  const hours = ele.substring(0, index1);
  const minutes = ele.substring(index1 + 1, index2);
  // console.log(ele.substring(index2 + 1));
  const azanDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), hours, minutes, 0);
  // console.log(azanDate);
  if (azanDate < nowDate)
    azanDate.setDate(nowDate.getDate() + 1);
  const value = (azanDate - nowDate) / (1000 * 60);
  const valueHours = Math.floor(value / 60);
  const valueMinutes = Math.trunc(value % 60);
  // console.log(valueHours, valueMinutes);


  return `${valueHours}:${valueMinutes}`;
}

// Defines funtion to format the time correctly
const AzanMarkup = async function () {
  const singleMarkup = function (ele) {
    const date = new Date();
    date.setHours(ele[1].slice(0, 2));
    date.setMinutes(ele[1].slice(3, 5));

    // console.log(ele[0], date);

    const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });

    // console.log(time);
    return `
    <li class="azan">
    <p class="prayer-name">${ele[0]}</p>
    <p class="prayer-time" data-time="${time}">${time}</p>
    </li>
    `
  }

  const azanObjectEntries = Object.entries(await getAzan());

  // console.log(azanObject);
  const azanArray = [
    azanObjectEntries[0],
    azanObjectEntries[2],
    azanObjectEntries[3],
    azanObjectEntries[5],
    azanObjectEntries[6]
  ]
  const azanMarkup = `
  <ul class="azans">
  ${azanArray.map(ele => singleMarkup(ele)).join('')}
  </ul>
  `
  // console.log(createMarkup);
  dateElement.insertAdjacentHTML("afterend", azanMarkup);
  const azans = document.querySelector('.azans')
  azans.addEventListener('mouseover', function (e) {
    const ele = e.target.closest('.prayer-time');
    if (!ele) return;
    ele.classList.add('azan-hover');
    ele.textContent = getDiff(ele.dataset.time);

  })
  azans.addEventListener('mouseout', function (e) {
    const ele = e.target.closest('.prayer-time');
    if (!ele) return;
    // console.log(ele.dataset.time);
    ele.innerHTML = ele.dataset.time;
  })
}
AzanMarkup();

const showTime = async function () {

  // Uses Date to retrieve information
  const date = new Date();

  // Sets options for correct formatting
  const options = {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour12: true,
  };

  // Formats the date in DD/MM/YY instead of MM/DD/YY
  const formattedDate = date.toLocaleString("en-GB", options);

  // Extract day of week, date, and time from formattedDate
  const [dayOfWeek, dateStr, time] = formattedDate.split(", ");

  // Format so it shows Day, HH:MM:SS | DD/MM/YY

  dateElement.innerHTML = `${dayOfWeek}, ${time} | ${dateStr}`;

}

// Sets the function to repeat every 1000ms (1s)
setInterval(showTime, 1000);

// Calls the function
showTime()
// when hoever on azan time replace it with remaining time


