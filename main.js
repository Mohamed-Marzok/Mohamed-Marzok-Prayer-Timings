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
  console.log(hour, minutes);
  let Sunrisehr = +String(finalData.timings.Sunrise).split(":")[0];
  let Sunrisemin = +String(finalData.timings.Sunrise).split(":")[1];
  let SunriseTime = Sunrisehr * 60 + Sunrisemin;

  let Fajrhr = +String(finalData.timings.Fajr).split(":")[0];
  let Fajrmin = +String(finalData.timings.Fajr).split(":")[1];
  let FajrTime = Fajrhr * 60 + Fajrmin;

  console.log(Fajrhr > hour);

  let Dhuhrhr = +String(finalData.timings.Dhuhr).split(":")[0];
  let Dhuhrmin = +String(finalData.timings.Dhuhr).split(":")[1];
  let DhuhrTime = Dhuhrhr * 60 + Dhuhrmin;

  let Asrhr = +String(finalData.timings.Asr).split(":")[0];
  let Asrmin = +String(finalData.timings.Asr).split(":")[1];
  let AsrTime = Asrhr * 60 + Asrmin;

  let Maghribhr = +String(finalData.timings.Maghrib).split(":")[0];
  let Maghribmin = +String(finalData.timings.Maghrib).split(":")[1];
  let MaghribTime = Maghribhr * 60 + Maghribmin;

  let Ishahr = +String(finalData.timings.Isha).split(":")[0];
  let Ishamin = +String(finalData.timings.Isha).split(":")[1];
  let IshaTime = Ishahr * 60 + Ishamin;

  if (FajrTime > fullTime) {
    cards.forEach((card) => {
      card.classList.remove("active");
    });
    cardFajr.classList.add("active");
  } else if (SunriseTime > fullTime) {
    cards.forEach((card) => {
      card.classList.remove("active");
    });
    cardSunrise.classList.add("active");
  } else if (DhuhrTime > fullTime) {
    cards.forEach((card) => {
      card.classList.remove("active");
    });
    cardDhuhr.classList.add("active");
  } else if (AsrTimeTime > fullTime) {
    cards.forEach((card) => {
      card.classList.remove("active");
    });
    cardAsr.classList.add("active");
  } else if (MaghribTime > fullTime) {
    cards.forEach((card) => {
      card.classList.remove("active");
    });
    cardMaghrib.classList.add("active");
  } else if (IshaTime > fullTime) {
    cards.forEach((card) => {
      card.classList.remove("active");
    });
    cardIsha.classList.add("active");
  } else {
    cards.forEach((card) => {
      card.classList.remove("active");
    });
    cardFajr.classList.add("active");
  }
};
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
