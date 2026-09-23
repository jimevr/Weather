/* =====================================
   CONFIGURACIÓN DE LA API
===================================== */

const GEOCODING_API =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";


/* =====================================
   ELEMENTOS DEL DOM
===================================== */

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");

const temperature = document.getElementById("temperature");
const weatherDescription =
    document.getElementById("weatherDescription");

const feelsLike = document.getElementById("feelsLike");

const precipitation =
    document.getElementById("precipitation");

const wind = document.getElementById("wind");

const humidity =
    document.getElementById("humidity");

const windDirection =
    document.getElementById("windDirection");

const weatherIcon =
    document.getElementById("weatherIcon");

const forecastGrid =
    document.getElementById("forecastGrid");

const updatedTime =
    document.getElementById("updatedTime");

const favoriteButton =
    document.getElementById("favoriteButton");

const favoritesGrid =
    document.getElementById("favoritesGrid");

const loadingScreen =
    document.getElementById("loadingScreen");

const toast =
    document.getElementById("toast");

const sideMenu =
    document.getElementById("sideMenu");

const menuOverlay =
    document.getElementById("menuOverlay");

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const homeSection =
    document.getElementById("homeSection");

const aboutSection =
    document.getElementById("aboutSection");

const favoritesSection =
    document.getElementById("favoritesSection");

const locationButton =
    document.getElementById("locationButton");

const favoritesButton =
    document.getElementById("favoritesButton");


/* =====================================
   ESTADO DE LA APLICACIÓN
===================================== */

let currentCity = {
    name: "Ciudad de México",
    country: "México",
    latitude: 19.4326,
    longitude: -99.1332
};

let favorites =
    JSON.parse(localStorage.getItem("weatherFavorites")) || [];


/* =====================================
   ICONOS SVG
===================================== */

function getWeatherIcon(code, size = 24) {

    let icon = "";

    if (code === 0) {

        icon = `
            <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4"
                    stroke="currentColor"
                    stroke-width="1.7"/>

                <path d="M12 2V5"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M12 19V22"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M2 12H5"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M19 12H22"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>
            </svg>
        `;

    } else if (code <= 3) {

        icon = `
            <svg viewBox="0 0 24 24" fill="none">

                <circle cx="16" cy="8" r="3"
                    stroke="currentColor"
                    stroke-width="1.5"/>

                <path d="M7 17H17"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M5 17C3.9 17 3 16.1 3 15
                         C3 13.9 3.9 13 5 13
                         C5.3 13 5.6 13.1 5.9 13.1
                         C6.4 11.3 8.1 10 10 10
                         C12.3 10 14 11.8 14 14"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>
            </svg>
        `;

    } else if (code >= 51 && code <= 67) {

        icon = `
            <svg viewBox="0 0 24 24" fill="none">

                <path d="M5 11H16"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M7 15L6 18"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M12 15L11 18"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M17 15L16 18"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M5 11C4 11 3 10.2 3 9.2
                         C3 8.2 4 7.5 5 7.5
                         H15"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>
            </svg>
        `;

    } else if (code >= 80 && code <= 82) {

        icon = `
            <svg viewBox="0 0 24 24" fill="none">

                <path d="M5 12H16"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M7 16L6 19"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M12 16L11 19"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M17 16L16 19"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>
            </svg>
        `;

    } else {

        icon = `
            <svg viewBox="0 0 24 24" fill="none">

                <path d="M5 13H16"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M7 17H13"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>

                <path d="M16 13C17.7 13 19 11.7 19 10
                         C19 8.3 17.7 7 16 7
                         C15.8 4.8 14 3 12 3
                         C9.8 3 8 4.8 8 7
                         C6.3 7 5 8.3 5 10"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"/>
            </svg>
        `;
    }

    return icon;
}


/* =====================================
   DESCRIPCIÓN DEL CLIMA
===================================== */

function getWeatherDescription(code) {

    const descriptions = {

        0: "Cielo despejado",

        1: "Principalmente despejado",
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

        71: "Nevada ligera",
        73: "Nevada moderada",
        75: "Nevada intensa",

        80: "Lluvias ligeras",
        81: "Lluvias moderadas",
        82: "Lluvias intensas",

        95: "Tormenta eléctrica",
        96: "Tormenta con granizo",
        99: "Tormenta intensa"
    };

    return descriptions[code] || "Condiciones variables";
}


/* =====================================
   DIRECCIÓN DEL VIENTO
===================================== */

function getWindDirection(degrees) {

    const directions = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SO",
        "O",
        "NO"
    ];

    const index =
        Math.round(degrees / 45) % 8;

    return directions[index];
}


/* =====================================
   BUSCAR CIUDAD
===================================== */

async function searchCity(city) {

    if (!city.trim()) {

        showToast("Escribe una ciudad para buscar.");

        return;
    }

    showLoading(true);

    try {

        const response = await fetch(
            ${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=es&format=json
        );

        if (!response.ok) {
            throw new Error("Error en la búsqueda");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {

            showToast("No encontramos esa ciudad.");

            return;
        }

        const result = data.results[0];

        currentCity = {
            name: result.name,
            country: result.country || "",
            latitude: result.latitude,
            longitude: result.longitude
        };

        await loadWeather();

        showHome();

    } catch (error) {

        console.error(error);

        showToast(
            "No fue posible consultar la ciudad."
        );

    } finally {

        showLoading(false);
    }
}


/* =====================================
   OBTENER CLIMA
===================================== */

async function loadWeather() {

    const url =
        ${WEATHER_API}?latitude=${currentCity.latitude} +
        &longitude=${currentCity.longitude} +
        &current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m +
        &daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max +
        &timezone=auto +
        &forecast_days=7;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("No se pudo obtener el clima.");
    }

    const data = await response.json();

    updateCurrentWeather(data);

    updateForecast(data);

    updateFavoriteButton();

    updatedTime.textContent =
        `Actualizado ${new Date().toLocaleTimeString(
            "es-MX",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )}`;
}


/* =====================================
   ACTUALIZAR CLIMA ACTUAL
===================================== */

function updateCurrentWeather(data) {

    const current = data.current;

    cityName.textContent =
        currentCity.name;

    countryName.textContent =
        currentCity.country;

    temperature.textContent =
        Math.round(current.temperature_2m);

    weatherDescription.textContent =
        getWeatherDescription(
            current.weather_code
        );

    feelsLike.textContent =
        `Sensación térmica: ${Math.round(
            current.apparent_temperature
        )}°C`;

    precipitation.textContent =
        ${current.precipitation || 0} mm;

    wind.textContent =
        ${Math.round(current.wind_speed_10m)} km/h;

    humidity.textContent =
        ${current.relative_humidity_2m}%;

    windDirection.textContent =
        getWindDirection(
            current.wind_direction_10m
        );

    weatherIcon.innerHTML =
        getWeatherIcon(
            current.weather_code
        );
}


/* =====================================
   PRONÓSTICO
===================================== */

function updateForecast(data) {

    const daily = data.daily;

    forecastGrid.innerHTML = "";

    for (let i = 0; i < daily.time.length; i++) {

        const date =
            new Date(daily.time[i] + "T12:00:00");

        const dayName =
            i === 0
                ? "Hoy"
                : date.toLocaleDateString(
                    "es-MX",
                    {
                        weekday: "short"
                    }
                );

        const maxTemp =
            Math.round(
                daily.temperature_2m_max[i]
            );

        const rain =
            daily.precipitation_probability_max[i];

        const card =
            document.createElement("article");

        card.className = "forecast-card";

        card.innerHTML = `

            <span class="forecast-day">
                ${dayName}
            </span>

            <div class="forecast-icon">
                ${getWeatherIcon(
                    daily.weather_code[i]
                )}
            </div>

            <strong class="forecast-temperature">
                ${maxTemp}°C
            </strong>

            <span class="forecast-rain">
                ${rain}% precipitación
            </span>

        `;

        forecastGrid.appendChild(card);
    }
}


/* =====================================
   LOADING
===================================== */

function showLoading(show) {

    loadingScreen.classList.toggle(
        "hidden",
        !show
    );
}


/* =====================================
   TOAST
===================================== */

let toastTimeout;

function showToast(message) {

    clearTimeout(toastTimeout);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);
}


/* =====================================
   MENÚ
===================================== */

function openMenu() {

    sideMenu.classList.add("open");

    menuOverlay.classList.add("active");
}

function closeSideMenu() {

    sideMenu.classList.remove("open");

    menuOverlay.classList.remove("active");
}

menuButton.addEventListener(
    "click",
    openMenu
);

closeMenu.addEventListener(
    "click",
    closeSideMenu
);

menuOverlay.addEventListener(
    "click",
    closeSideMenu
);


/* =====================================
   SECCIONES
===================================== */

function showHome() {

    homeSection.classList.remove("hidden");

    aboutSection.classList.add("hidden");

    favoritesSection.classList.add("hidden");

    closeSideMenu();
}

function showAbout() {

    homeSection.classList.add("hidden");

    aboutSection.classList.remove("hidden");

    favoritesSection.classList.add("hidden");

    closeSideMenu();
}

function showFavorites() {

    homeSection.classList.add("hidden");

    aboutSection.classList.add("hidden");

    favoritesSection.classList.remove("hidden");

    renderFavorites();

    closeSideMenu();
}


document.querySelectorAll(
    ".menu-option[data-section]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const section =
                button.dataset.section;

            if (section === "inicio") {
                showHome();
            }

            if (section === "about") {
                showAbout();
            }

        }
    );
});


/* =====================================
   BUSCADOR
===================================== */

searchButton.addEventListener(
    "click",
    () => {

        searchCity(
            searchInput.value
        );

    }
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchCity(
                searchInput.value
            );

        }

    }
);


document.querySelector(
    '[data-section="buscar"]'
).addEventListener(
    "click",
    () => {

        showHome();

        searchInput.focus();

    }
);


/* =====================================
   GEOLOCALIZACIÓN
===================================== */

locationButton.addEventListener(
    "click",
    () => {

        if (!navigator.geolocation) {

            showToast(
                "Tu navegador no permite obtener la ubicación."
            );

            return;
        }

        showLoading(true);

        navigator.geolocation.getCurrentPosition(

            async position => {

                currentCity = {
                    name: "Mi ubicación",
                    country: "",
                    latitude:
                        position.coords.latitude,
                    longitude:
                        position.coords.longitude
                };

                try {

                    await loadWeather();

                    showHome();

                } catch (error) {

                    showToast(
                        "No fue posible obtener el clima."
                    );

                } finally {

                    showLoading(false);
                }
            },

            () => {

                showLoading(false);

                showToast(
                    "No se pudo acceder a tu ubicación."
                );

            }
        );
    }
);


/* =====================================
   FAVORITOS
===================================== */

favoriteButton.addEventListener(
    "click",
    () => {

        const alreadyFavorite =
            favorites.some(
                city =>
                    city.name === currentCity.name
            );

        if (alreadyFavorite) {

            favorites =
                favorites.filter(
                    city =>
                        city.name !==
                        currentCity.name
                );

            showToast(
                "Ciudad eliminada de favoritos."
            );

        } else {

            favorites.push({
                ...currentCity
            });

            showToast(
                "Ciudad agregada a favoritos."
            );
        }

        localStorage.setItem(
            "weatherFavorites",
            JSON.stringify(favorites)
        );

        updateFavoriteButton();
    }
);


function updateFavoriteButton() {

    const isFavorite =
        favorites.some(
            city =>
                city.name === currentCity.name
        );

    favoriteButton.classList.toggle(
        "active",
        isFavorite
    );
}


/* =====================================
   MOSTRAR FAVORITOS
===================================== */

favoritesButton.addEventListener(
    "click",
    showFavorites
);


function renderFavorites() {

    favoritesGrid.innerHTML = "";

    if (favorites.length === 0) {

        favoritesGrid.innerHTML = `

            <div class="about-card">

                <span class="eyebrow">
                    FAVORITOS
                </span>

                <h2>
                    Todavía no tienes ciudades guardadas.
                </h2>

                <p>
                    Busca una ciudad y selecciona el
                    botón de favoritos para guardarla.
                </p>

            </div>

        `;

        return;
    }


    favorites.forEach(city => {

        const card =
            document.createElement("div");

        card.className = "favorite-card";

        card.innerHTML = `

            <div>

                <h3>
                    ${city.name}
                </h3>

                <p>
                    ${city.country}
                </p>

            </div>

            <button>
                Consultar
            </button>

        `;

        card
            .querySelector("button")
            .addEventListener(
                "click",
                async () => {

                    currentCity = {
                        ...city
                    };

                    showLoading(true);

                    try {

                        await loadWeather();

                        showHome();

                    } catch (error) {

                        showToast(
                            "No fue posible consultar esta ciudad."
                        );

                    } finally {

                        showLoading(false);
                    }
                }
            );

        favoritesGrid.appendChild(card);

    });
}


/* =====================================
   INICIALIZACIÓN
===================================== */

async function initializeApp() {

    showLoading(true);

    try {

        await loadWeather();

    } catch (error) {

        console.error(error);

        showToast(
            "No fue posible cargar el clima."
        );

    } finally {

        showLoading(false);
    }
}

initializeApp();
