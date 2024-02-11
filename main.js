let navDate = document.querySelector(".date");
let mainHeader = document.querySelector(".header");
let cardSunrise = document.querySelector(".Sunrise");
let cardFajr = document.querySelector(".Fajr");
let cardDhuhr = document.querySelector(".Dhuhr");
let cardAsr = document.querySelector(".Asr");
let cardMaghrib = document.querySelector(".Maghrib");
let cardIsha = document.querySelector(".Isha");
let cards = document.querySelectorAll(".card");
let getLocation = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (loc) {
      let location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      resolve(location);
    });
  });
};
let getDate = function () {
  return new Promise((resolve, reject) => {
    let date = new Date();
    let formattedDateObject = {
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear(),
    };
    let formattedDate = `${formattedDateObject.day}-${formattedDateObject.month}-${formattedDateObject.year}`;
    resolve(formattedDate);
  });
};
let putActiveClass = function (finalData) {
  let time = new Date();
  let hour = time.getHours();
  let minutes = time.getMinutes();
  let fullTime = hour * 60 + minutes;

  let activeCard = null;

  switch (true) {
    case fullTime < calculateMinutes(finalData.timings.Fajr):
      activeCard = cardFajr;
      break;
    case fullTime < calculateMinutes(finalData.timings.Sunrise):
      activeCard = cardSunrise;
      break;
    case fullTime < calculateMinutes(finalData.timings.Dhuhr):
      activeCard = cardDhuhr;
      break;
    case fullTime < calculateMinutes(finalData.timings.Asr):
      activeCard = cardAsr;
      break;
    case fullTime < calculateMinutes(finalData.timings.Maghrib):
      activeCard = cardMaghrib;
      break;
    case fullTime < calculateMinutes(finalData.timings.Isha):
      activeCard = cardIsha;
      break;
    default:
      activeCard = cardFajr;
      break;
  }

  cards.forEach((card) => {
    card.classList.remove("active");
  });
  activeCard.classList.add("active");
};

function calculateMinutes(timeString) {
  let [hour, minute] = timeString.split(":").map(Number);
  return hour * 60 + minute;
}

let getPrayerTime = async function () {
  let date = await getDate();
  let location = await getLocation();
  console.log(date);
  console.log(location);
  let response = await axios.get(
    ` https://api.aladhan.com/v1/timings/${date}?latitude=${location.latitude}&longitude=${location.longitude}`
  );
  console.log(response.data.data);
  let finalData = response.data.data;
  console.log(finalData);
  mainHeader.textContent = finalData.meta.method.name;
  navDate.textContent = date;
  cardSunrise.querySelector(".card-time").textContent =
    finalData.timings.Sunrise;
  cardFajr.querySelector(".card-time").textContent = finalData.timings.Fajr;
  cardDhuhr.querySelector(".card-time").textContent = finalData.timings.Dhuhr;
  cardAsr.querySelector(".card-time").textContent = finalData.timings.Asr;
  cardMaghrib.querySelector(".card-time").textContent =
    finalData.timings.Maghrib;
  cardIsha.querySelector(".card-time").textContent = finalData.timings.Isha;
  putActiveClass(finalData);
};
getPrayerTime();
