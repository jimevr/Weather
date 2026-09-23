/* ==========================================
   CONFIGURACIÓN INICIAL
========================================== */

const defaultCity = {
    name: "Ciudad de México",
    latitude: 19.4326,
    longitude: -99.1332,
    country: "México"
};


/* ==========================================
   ELEMENTOS HTML
========================================== */

const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const menuBtn = document.getElementById("menuBtn");

const closeMenu = document.getElementById("closeMenu");

const sideMenu = document.getElementById("sideMenu");


/* ==========================================
   MENU
========================================== */

menuBtn.addEventListener("click", () => {

    sideMenu.classList.add("open");

});


closeMenu.addEventListener("click", () => {

    sideMenu.classList.remove("open");

});


/* ==========================================
   BUSCADOR
========================================== */

searchBtn.addEventListener(
    "click",
    searchCity
);


cityInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            searchCity();

        }

    }
);


/* ==========================================
   BUSCAR CIUDAD
========================================== */

async function searchCity() {

    const city = cityInput.value.trim();

    if (city === "") {

        return;

    }

    showLoading();


    try {

        const url =
            https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json;

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Error al buscar la ciudad"
            );

        }


        const data =
            await response.json();


        if (
            !data.results ||
            data.results.length === 0
        ) {

            throw new Error(
                "No se encontró la ciudad"
            );

        }


        const location =
            data.results[0];


        const cityData = {

            name: location.name,

            latitude: location.latitude,

            longitude: location.longitude,

            country:
                location.country || ""

        };


        await getWeather(cityData);


        cityInput.value = "";


    } catch (error) {

        showError(
            "No encontramos esa ciudad. Intenta con otro nombre."
        );

        console.error(error);

    }

}


/* ==========================================
   OBTENER CLIMA
========================================== */

async function getWeather(location) {

    try {

        const url =
            https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m&timezone=auto&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "No se pudo obtener el clima"
            );

        }


        const data =
            await response.json();


        updateWeather(
            location,
            data.current
        );


    } catch (error) {

        showError(
            "No fue posible obtener el clima."
        );

        console.error(error);

    }

}


/* ==========================================
   ACTUALIZAR INTERFAZ
========================================== */

function updateWeather(
    location,
    weather
) {

    document.getElementById(
        "city"
    ).textContent =
        location.name;


    document.getElementById(
        "country"
    ).textContent =
        location.country;


    document.getElementById(
        "temperature"
    ).textContent =
        Math.round(
            weather.temperature_2m
        ) + "°";


    document.getElementById(
        "feelsLike"
    ).textContent =
        Math.round(
            weather.apparent_temperature
        ) + "°";


    document.getElementById(
        "humidity"
    ).textContent =
        weather.relative_humidity_2m +
        " %";


    document.getElementById(
        "precipitation"
    ).textContent =
        weather.precipitation +
        " mm";


    document.getElementById(
        "wind"
    ).textContent =
        Math.round(
            weather.wind_speed_10m
        ) +
        " km/h";


    document.getElementById(
        "clouds"
    ).textContent =
        weather.cloud_cover +
        " %";


    document.getElementById(
        "weatherDescription"
    ).textContent =
        getWeatherDescription(
            weather.weather_code
        );


    document.getElementById(
        "weatherIcon"
    ).textContent =
        getWeatherIcon(
            weather.weather_code
        );


    document.getElementById(
        "date"
    ).textContent =
        formatDate();


    clearError();

}


/* ==========================================
   DESCRIPCIÓN DEL CLIMA
========================================== */

function getWeatherDescription(code) {

    const weatherCodes = {

        0: "Despejado",

        1: "Mayormente despejado",

        2: "Parcialmente nublado",

        3: "Nublado",

        45: "Niebla",

        48: "Niebla con escarcha",

        51: "Llovizna ligera",

        53: "Llovizna moderada",

        55: "Llovizna intensa",

        61: "Lluvia ligera",

        63: "Lluvia moderada",

        65: "Lluvia intensa",

        71: "Nieve ligera",

        73: "Nieve moderada",

        75: "Nieve intensa",

        80: "Chubascos ligeros",

        81: "Chubascos moderados",

        82: "Chubascos intensos",

        95: "Tormenta eléctrica",

        96: "Tormenta con granizo",

        99: "Tormenta fuerte con granizo"

    };


    return weatherCodes[code]
        || "Condiciones variables";

}


/* ==========================================
   ICONOS
========================================== */

function getWeatherIcon(code) {

    if (code === 0) {

        return "☀️";

    }


    if (
        code === 1 ||
        code === 2
    ) {

        return "🌤️";

    }


    if (code === 3) {

        return "☁️";

    }


    if (
        code >= 45 &&
        code <= 48
    ) {

        return "🌫️";

    }


    if (
        code >= 51 &&
        code <= 67
    ) {

        return "🌧️";

    }


    if (
        code >= 71 &&
        code <= 77
    ) {

        return "❄️";

    }


    if (
        code >= 80 &&
        code <= 82
    ) {

        return "🌦️";

    }


    if (code >= 95) {

        return "⛈️";

    }


    return "🌤️";

}


/* ==========================================
   FECHA
========================================== */

function formatDate() {

    const date = new Date();


    return date.toLocaleDateString(
        "es-MX",
        {
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    );

}


/* ==========================================
   LOADING
========================================== */

function showLoading() {

    document.getElementById(
        "weatherDescription"
    ).textContent =
        "Buscando clima...";

}


/* ==========================================
   ERROR
========================================== */

function showError(message) {

    document.getElementById(
        "errorMessage"
    ).textContent =
        message;

}


function clearError() {

    document.getElementById(
        "errorMessage"
    ).textContent =
        "";

}


/* ==========================================
   INICIAR APLICACIÓN
========================================== */

getWeather(defaultCity);
