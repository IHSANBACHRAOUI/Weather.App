const apikey = "6d28f779d0c7eb44a2b7fbf7938719b8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let metric = "units=metric";
let days = [];
const today = new Date();

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const fdate = `${year}-${month}-${day}`;
  return fdate;
}
for (let i = 0; i < 6; i++) {
  today.setDate(today.getDate() + 1);
  days.push(formatDate(today));
}
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);
  var data = await response.json();
  console.log(data);
  


  let city1 = document.getElementById('city1');

  city1.innerHTML = `<h3>${data.name}</h3>`;
  displayForCast(data.name);
  let temp = document.getElementById('tempu');
  temp.innerHTML = `<h4>${data.main.temp}°C</h4>`;
  let humidity = document.getElementById('humd');
  humidity.innerHTML = `<p>${data.main.humidity}%<p>`;
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";


  console.log(city1);
  console.log(temp);
  console.log(humidity);
  console.log(data.name);
  console.log(data.main.temp);
  console.log(data.main.humidity);



}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
   
})
let fetchData = async function (url) {
  try {
    console.log(url);
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const geoUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&${metric}`;
        // fetchData
        fetchData(`${geoUrl}`).then((result) => {
          let location = result.city.name + "," + result.city.country;
          let cityName = document.getElementById("city1");
          cityName.innerHTML = `<h1>${location}</h1>`;
          const dayOne = document.getElementById("date");
          displayForCast(result.city.name);
          const options = {
            weekday: "long",
          };
          let fdate = new Date();
          console.log(fdate);
          fdate.setDate(fdate.getDate());
          fdate = fdate.toLocaleDateString("en-US", options);
          dayOne.innerHTML = `<h1>${fdate}</h1>`;
          //day1
          const dayun = document.getElementById("dayun");
          dayun.innerHTML = days[0];
          //weather icon
          const dayunImg = document.getElementById("dayunImg");
          dayunImg.src = `https://openweathermap.org/img/wn/${result.list[0].weather[0].icon}.png`;
          //weather day1
          const dayunW = document.getElementById("dayunW");
          dayunW.innerHTML = `<h1>${result.list[0].main.temp}°C</h1>`;

          //day2
          const day2 = document.getElementById("day2");
          day2.innerHTML = days[1];
          //weather icon
          const day2Img = document.getElementById("day2Img");
          day2Img.src = `https://openweathermap.org/img/wn/${result.list[5].weather[0].icon}.png`;
          //weather day2
          const day2W = document.getElementById("day2W");
          day2W.innerHTML = `<h1>${result.list[5].main.temp}°C</h1>`;
           
          console.log(result.list[5].main.temp);

          //day3
          const day3 = document.getElementById("day3");
          day3.innerHTML = days[2];
          //weather icon
          const day3Img = document.getElementById("day3Img");
          day3Img.src = `https://openweathermap.org/img/wn/${result.list[13].weather[0].icon}.png`;
          //weather day2
          const day3W = document.getElementById("day3W");
          day3W.innerHTML = `<h1>${result.list[13].main.temp}°C</h1>`;


          //day4
          const day4 = document.getElementById("day4");
          day4.innerHTML = days[3];
          //weather icon
          const day4Img = document.getElementById("day4Img");
          day4Img.src = `https://openweathermap.org/img/wn/${result.list[21].weather[0].icon}.png`;
          //weather day4
          const day4W = document.getElementById("day4W");
          day4W.innerHTML = `<h1>${result.list[21].main.temp}°C</h1>`;



          //day5
          const day5 = document.getElementById("day5");
          day5.innerHTML = days[4];
          //weather icon
          const day5Img = document.getElementById("day5Img");
          day5Img.src = `https://openweathermap.org/img/wn/${result.list[29].weather[0].icon}.png`;
          //weather day5
          const day5W = document.getElementById("day5W");
          day5W.innerHTML = `<h1>${result.list[29].main.temp}°C</h1>`;


          console.log(result);
        }).catch((error) => {
          console.error("Error fetching data:", error);
        });

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      function (error) {
        console.error("Error getting location: " + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

});

function displayForCast(cityName) {

  const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}&${metric}`;

  fetch(forcastUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById("dayun1").innerHTML = "";
      console.log(data);
      const forecastByDate = [];
      const fiveForecastDay = data.list.filter(responseLigne => {
        const date = new Date(responseLigne.dt_txt).getDate()
        if (!forecastByDate.includes(date)) {
          return forecastByDate.push(date)
        }
      })
      // filtrer les dates
      const forecastsDays = fiveForecastDay.map(el => {
        const date = new Date(el.dt_txt).toLocaleString('fr-FR', { weekday: 'long' });
        return date;
      });
      // console.log(forecastsDays)
      forecastsDays.forEach(el => {
        console.log("Date:", el.date);
      })
      //filtrer par température
      const forecastsTemp = fiveForecastDay.map(el => {
        const temperature = el.main.temp;
        return temperature;
      })
      forecastsTemp.forEach(el => {
        console.log("Température:", el.temperature);
      })

      // Récupérer l'élément canvas

      const ctx = document.getElementById('myChart');

      // Vérifier si l'élément canvas existe
      if (ctx) {
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
          existingChart.destroy();
        }

        // Créer un nouveau graphique
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: forecastsDays,
            datasets: [{
              label: 'Température',
              data: forecastsTemp,
              borderWidth: 1,
              borderColor: '#DBD56E',
              backgroundColor: 'bleu'
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        var i;
        for(i=1;i<5;i++){

            let forCastHtml = `
        
            <div class="card2">
            <div class="weather">
              <div class="date1" id="dayun">${forecastsDays[i]}</div>
              <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" class="weather-icon" id="dayunImg">
              <h1 class="temp" id="dayunW">${forecastsTemp[i]}°C</h1>
            </div>
          </div> 


            `; 
        document.getElementById("dayun1").innerHTML += forCastHtml ;

        }
      } else {
        console.error("L'élément canvas avec l'ID 'myChart' n'a pas été trouvé.");
      }

    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('City not found. Please try again.');
    });

}






















