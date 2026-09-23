/* =========================================
   ESTADOS DE MÉXICO
========================================= */

const states = [

    {
        name: "Aguascalientes",
        capital: "Aguascalientes",
        lat: 21.88,
        lon: -102.29
    },

    {
        name: "Baja California",
        capital: "Mexicali",
        lat: 32.62,
        lon: -115.45
    },

    {
        name: "Baja California Sur",
        capital: "La Paz",
        lat: 24.14,
        lon: -110.31
    },

    {
        name: "Campeche",
        capital: "Campeche",
        lat: 19.83,
        lon: -90.53
    },

    {
        name: "Chiapas",
        capital: "Tuxtla Gutiérrez",
        lat: 16.75,
        lon: -93.12
    },

    {
        name: "Chihuahua",
        capital: "Chihuahua",
        lat: 28.63,
        lon: -106.07
    },

    {
        name: "Ciudad de México",
        capital: "Ciudad de México",
        lat: 19.43,
        lon: -99.13
    },

    {
        name: "Coahuila",
        capital: "Saltillo",
        lat: 25.42,
        lon: -101.00
    },

    {
        name: "Colima",
        capital: "Colima",
        lat: 19.24,
        lon: -103.72
    },

    {
        name: "Durango",
        capital: "Durango",
        lat: 24.02,
        lon: -104.67
    },

    {
        name: "Estado de México",
        capital: "Toluca",
        lat: 19.28,
        lon: -99.65
    },

    {
        name: "Guanajuato",
        capital: "Guanajuato",
        lat: 21.02,
        lon: -101.25
    },

    {
        name: "Guerrero",
        capital: "Chilpancingo",
        lat: 17.55,
        lon: -99.50
    },

    {
        name: "Hidalgo",
        capital: "Pachuca",
        lat: 20.10,
        lon: -98.75
    },

    {
        name: "Jalisco",
        capital: "Guadalajara",
        lat: 20.67,
        lon: -103.35
    },

    {
        name: "Michoacán",
        capital: "Morelia",
        lat: 19.70,
        lon: -101.19
    },

    {
        name: "Morelos",
        capital: "Cuernavaca",
        lat: 18.92,
        lon: -99.23
    },

    {
        name: "Nayarit",
        capital: "Tepic",
        lat: 21.51,
        lon: -104.89
    },

    {
        name: "Nuevo León",
        capital: "Monterrey",
        lat: 25.67,
        lon: -100.31
    },

    {
        name: "Oaxaca",
        capital: "Oaxaca",
        lat: 17.07,
        lon: -96.72
    },

    {
        name: "Puebla",
        capital: "Puebla",
        lat: 19.04,
        lon: -98.20
    },

    {
        name: "Querétaro",
        capital: "Querétaro",
        lat: 20.59,
        lon: -100.39
    },

    {
        name: "Quintana Roo",
        capital: "Chetumal",
        lat: 18.50,
        lon: -88.30
    },

    {
        name: "San Luis Potosí",
        capital: "San Luis Potosí",
        lat: 22.15,
        lon: -100.98
    },

    {
        name: "Sinaloa",
        capital: "Culiacán",
        lat: 24.80,
        lon: -107.39
    },

    {
        name: "Sonora",
        capital: "Hermosillo",
        lat: 29.07,
        lon: -110.95
    },

    {
        name: "Tabasco",
        capital: "Villahermosa",
        lat: 17.99,
        lon: -92.93
    },

    {
        name: "Tamaulipas",
        capital: "Ciudad Victoria",
        lat: 23.74,
        lon: -99.14
    },

    {
        name: "Tlaxcala",
        capital: "Tlaxcala",
        lat: 19.32,
        lon: -98.24
    },

    {
        name: "Veracruz",
        capital: "Xalapa",
        lat: 19.54,
        lon: -96.91
    },

    {
        name: "Yucatán",
        capital: "Mérida",
        lat: 20.97,
        lon: -89.62
    },

    {
        name: "Zacatecas",
        capital: "Zacatecas",
        lat: 22.77,
        lon: -102.58
    }

];


/* =========================================
   ICONOS DEL CLIMA
========================================= */

function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }

    if (code >= 1 && code <= 3) {
        return "🌤️";
    }

    if (code >= 45 && code <= 48) {
        return "🌫️";
    }

    if (code >= 51 && code <= 67) {
        return "🌧️";
    }

    if (code >= 71 && code <= 77) {
        return "❄️";
    }

    if (code >= 80 && code <= 82) {
        return "🌦️";
    }

    if (code >= 95) {
        return "⛈️";
    }

    return "☁️";
}


/* =========================================
   CREAR TARJETAS DE ESTADOS
========================================= */

function createStateCards(data) {

    const grid =
        document.getElementById("statesGrid");

    grid.innerHTML = "";


    data.forEach(state => {

        const card =
            document.createElement("div");

        card.className = "state-card";


        card.innerHTML = `

            <div class="state-top">

                <span class="weather-icon">
                    ${state.icon || "🌤️"}
                </span>

            </div>

            <div class="state-name">
                ${state.name}
            </div>

            <div class="state-temp">
                ${
                    state.temp !== undefined
                    ? Math.round(state.temp) + "°C"
                    : "--°C"
                }
            </div>

            <div class="rain">

                💧 Probabilidad de lluvia:

                ${
                    state.rain !== undefined
                    ? state.rain + "%"
                    : "--"
                }

            </div>

        `;


        card.onclick = () => {

            loadWeather(state);

        };


        grid.appendChild(card);

    });

}


/* =========================================
   OBTENER CLIMA DE UN ESTADO
========================================= */

async function loadWeather(state) {

    showPage("detalle");


    document.getElementById("detailState")
        .textContent = state.name;


    document.getElementById("detailCapital")
        .textContent = state.capital;


    document.getElementById("detailTemp")
        .textContent = "--°";


    document.getElementById("detailRain")
        .textContent = "--%";


    document.getElementById("detailWind")
        .textContent = "-- km/h";


    document.getElementById("detailHumidity")
        .textContent = "--%";


    document.getElementById("detailIcon")
        .textContent = "⏳";


    try {

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${state.lat}&longitude=${state.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;


        const response =
            await fetch(url);


        const data =
            await response.json();


        /* Temperatura */

        const temperature =
            Math.round(
                data.current.temperature_2m
            );


        document.getElementById("detailTemp")
            .textContent = temperature + "°C";


        /* Icono */

        document.getElementById("detailIcon")
            .textContent =
            getWeatherIcon(
                data.current.weather_code
            );


        /* Lluvia */

        const rain =
            data.daily
            .precipitation_probability_max[0];


        document.getElementById("detailRain")
            .textContent = rain + "%";


        /* Viento */

        document.getElementById("detailWind")
            .textContent =
            Math.round(
                data.current.wind_speed_10m
            ) + " km/h";


        /* Humedad */

        document.getElementById("detailHumidity")
            .textContent =
            data.current.relative_humidity_2m + "%";


        /* =================================
           PRONÓSTICO
        ================================= */

        const forecast =
            document.getElementById("forecastGrid");


        forecast.innerHTML = "";


        for (let i = 0; i < 5; i++) {

            const date =
                new Date(
                    data.daily.time[i] +
                    "T12:00:00"
                );


            const day =
                date.toLocaleDateString(
                    "es-MX",
                    {
                        weekday: "short"
                    }
                );


            const card =
                document.createElement("div");


            card.className =
                "forecast-card";


            card.innerHTML = `

                <div class="day">
                    ${day}
                </div>

                <div class="icon">

                    ${getWeatherIcon(
                        data.daily.weather_code[i]
                    )}

                </div>

                <div class="temp">

                    ${Math.round(
                        data.daily.temperature_2m_max[i]
                    )}°

                    /

                    ${Math.round(
                        data.daily.temperature_2m_min[i]
                    )}°

                </div>

                <div class="rain">

                    💧
                    ${data.daily.precipitation_probability_max[i]}%

                </div>

            `;


            forecast.appendChild(card);

        }


    } catch (error) {

        console.error(error);

        document.getElementById("detailIcon")
            .textContent = "⚠️";


        alert(
            "No se pudo obtener el clima. Revisa tu conexión a Internet."
        );

    }

}


/* =========================================
   CLIMA DE TODOS LOS ESTADOS
========================================= */

async function loadAllWeather() {

    const updatedStates = [];


    for (const state of states) {

        try {

            const url =
                `https://api.open-meteo.com/v1/forecast?latitude=${state.lat}&longitude=${state.lon}&current=temperature_2m,weather_code&daily=precipitation_probability_max&timezone=auto`;


            const response =
                await fetch(url);


            const data =
                await response.json();


            updatedStates.push({

                ...state,

                temp:
                    data.current.temperature_2m,

                icon:
                    getWeatherIcon(
                        data.current.weather_code
                    ),

                rain:
                    data.daily
                    .precipitation_probability_max[0]

            });


        } catch (error) {

            updatedStates.push(state);

        }

    }


    createStateCards(updatedStates);

}


/* =========================================
   CAMBIAR DE PÁGINA
========================================= */

function showPage(pageId, element) {

    document.querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document.getElementById(pageId)
        .classList.add("active");


    document.querySelectorAll("nav a")
        .forEach(link => {

            link.classList.remove("active");

        });


    if (element) {

        element.classList.add("active");

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   FILTRAR ESTADOS
========================================= */

function filterStates() {

    const search =
        document
        .getElementById("stateSearch")
        .value
        .toLowerCase();


    const cards =
        document.querySelectorAll(
            ".state-card"
        );


    cards.forEach(card => {

        const name =
            card
            .querySelector(".state-name")
            .textContent
            .toLowerCase();


        if (name.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =========================================
   BUSCAR ESTADO DESDE INICIO
========================================= */

function searchState() {

    const input =
        document
        .getElementById("homeSearch")
        .value
        .toLowerCase()
        .trim();


    const state =
        states.find(state =>
            state.name
            .toLowerCase()
            .includes(input)
        );


    if (!state) {

        alert(
            "No encontramos ese estado."
        );

        return;

    }


    loadWeather(state);

}


/* =========================================
   INICIAR
========================================= */

loadAllWeather();
