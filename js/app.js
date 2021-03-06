const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const inputField = document.querySelector("#city");
const errorMsg = document.querySelector('#error-msg')

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  //update details templates

  details.innerHTML = `
     <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
          </div>`;

  // update the day $ and night images

  const iconSrc = `./assert/icons/${weather.WeatherIcon}.svg`;

  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "./assert/day.svg";
  } else {
    timeSrc = "./assert/night.svg";
  }

  time.setAttribute("src", timeSrc);

  //remove the d-none class if present

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  card.classList.remove("card-move");
  setTimeout(() => {
    cityForm.classList.add("trans");
    inputField.classList.add("input-height");
    card.classList.add("card-move");
  }, 0);
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  

  // update he ui with new city
  updateCity(city)
    .then((data) => {
      errorMsg.innerHTML = "";
      updateUI(data);
    })
    .catch((err) =>{
      
      card.classList.add("d-none");
      
      errorMsg.innerHTML=`${err.message}`;
      
      
    });
});
