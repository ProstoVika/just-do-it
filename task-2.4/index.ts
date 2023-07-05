import {
    WeatherInterface,
    DayWeatherInterface,
    PointerEvent,
    CoordObjectInterface,
    IGetResInterface
} from './inter/interfaces';

class CurrentLocation {
    constructor(
        private _name: string,
        private _lat: string,
        private _lon: string,
        private _unit: string
    ) {
    }

    getName(): string {
        return this._name;
    }

    setName(name: string) {
        this._name = name;
    }

    getLat(): string {
        return this._lat;
    }

    setLat(lat: string) {
        this._lat = lat;
    }

    getLon(): string {
        return this._lon;
    }

    setLon(lon: string) {
        this._lon = lon;
    }

    getUnit(): string {
        return this._unit;
    }

    setUnit(unit: string) {
        this._unit = unit;
    }

    toggleUnit() {
        this._unit = this._unit === "imperial" ? "metric" : "imperial";
    }
}

const currentLoc = new CurrentLocation('', '', '', '');

const initApp = (): void => {
    const geoButton = document.getElementById("getLocation") as HTMLElement;
    geoButton.addEventListener("click", getGeoWeather);
    const homeButton = document.getElementById("home") as HTMLElement;
    homeButton.addEventListener("click", loadWeather);
    const saveButton = document.getElementById("saveLocation") as HTMLElement;
    saveButton.addEventListener("click", saveLocation);
    const unitButton = document.getElementById("unit") as HTMLElement;
    unitButton.addEventListener("click", setUnitPref);
    const refreshButton = document.getElementById("refresh") as HTMLElement;
    refreshButton.addEventListener("click", refreshWeather);
    const locationEntry = document.getElementById("searchBar__form") as HTMLElement;
    locationEntry.addEventListener("submit", submitNewLocation);
    setPlaceholderText();
    loadWeather();
};

document.addEventListener("DOMContentLoaded", initApp);

const getGeoWeather = (event?: PointerEvent): void => {
    if (event && event.type === "click") {
        const mapIcon = document.querySelector(".fa-map-marker-alt") as HTMLElement;
        addSpinner(mapIcon);
    }
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const addSpinner = (element: HTMLElement): void => {
    animateButton(element);
    setTimeout(animateButton, 1000, element);
};

const animateButton = (element: HTMLElement): void => {
    element.classList.toggle("none");
    element.nextElementSibling?.classList.toggle("block");
    element.nextElementSibling?.classList.toggle("none");
};

const geoError = (errObj: GeolocationPositionError): void => {
    const errMsg = errObj ? errObj.message : "Geolocation not supported";
    displayError(errMsg, errMsg);
};

const setLocationObject = (locationObj: CurrentLocation, coordsObj: CoordObjectInterface): void => {
    const {lat, lon, name, unit} = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
        locationObj.setUnit(unit);
    }
};

const getHomeLocation = (): string | null => {
    return localStorage.getItem("defaultWeatherLocation");
};
const WEATHER_API_KEY = '5489fd4b518810ca9aac9f95c2b1b532';
const getWeatherFromCoords = async (locationObj: CurrentLocation): Promise<WeatherInterface> => {
    const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        return await weatherStream.json();
    } catch (err) {
        console.error(err);
    }

    const urlDataObj = {
        lat: locationObj.getLat(),
        lon: locationObj.getLon(),
        units: locationObj.getUnit()
    };
    try {
        const weatherStream = await fetch("./.netlify/functions/get_weather", {
            method: "POST",
            body: JSON.stringify(urlDataObj)
        });
        return await weatherStream.json();
    } catch (err) {
        console.error(err);
        throw (err)
    }
};

const getCoordsFromApi = async (entryText: string, units: string): Promise<IGetResInterface> => {
    const regex = /^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q";
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
    const encodedUrl = encodeURI(url);
    try {
        const dataStream = await fetch(encodedUrl);
        return await dataStream.json();
    } catch (err) {
        const error = err as Error;
        console.error(error.stack);
    }
    const urlDataObj = {
        text: entryText,
        units: units
    };
    try {
        const dataStream = await fetch("./.netlify/functions/get_coords", {
            method: "POST",
            body: JSON.stringify(urlDataObj)
        });
        return await dataStream.json();
    } catch (err) {
        console.error(err);
    throw (err)
    }
};

const cleanText = (text: string): string => {
    const regex = / {2,}/g;
    return text.replaceAll(regex, " ").trim();
};
const setPlaceholderText = (): void => {
    const input = document.getElementById("searchBar__text") as HTMLInputElement;
    window.innerWidth < 400
        ? (input.placeholder = "Kyiv, Київ, Ukraine")
        : (input.placeholder = "Kyiv, Київ, Ukraine");
};

const displayError = (headerMsg: string, srMsg: string): void => {
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(srMsg);
};

const displayApiError = (statusCode: Error): void => {
    const properMsg = toProperCase(statusCode.message);
    updateWeatherLocationHeader(properMsg);
    updateScreenReaderConfirmation(`${properMsg}. Please try again.`);
};

const toProperCase = (text: string): string => {
    const words = text.split(" ");
    const properWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return properWords.join(" ");
};

const updateWeatherLocationHeader = (message: string): void => {
    const h1 = document.getElementById("currentForecast__location") as HTMLElement;
    if (message.indexOf("Lat:") !== -1 && message.indexOf("Long:") !== -1) {
        const msgArray = message.split(" ");
        const mapArray = msgArray.map((msg) => {
            return msg.replace(":", ": ");
        });
        const lat =
            mapArray[0].indexOf("-") === -1
                ? mapArray[0].slice(0, 10)
                : mapArray[0].slice(0, 11);
        const lon =
            mapArray[1].indexOf("-") === -1
                ? mapArray[1].slice(0, 11)
                : mapArray[1].slice(0, 12);
        h1.textContent = `${lat} • ${lon}`;
    } else {
        h1.textContent = message;
    }
};

const updateScreenReaderConfirmation = (message: string): void => {
    (document.getElementById("confirmation") as HTMLElement).textContent = message;
};

const updateDisplay = (weatherJson: WeatherInterface, locationObj: CurrentLocation): void => {
    fadeDisplay();
    clearDisplay();

    const screenReaderWeather = buildScreenReaderWeather(
        weatherJson,
        locationObj
    );
    updateScreenReaderConfirmation(screenReaderWeather);
    updateWeatherLocationHeader(locationObj.getName());

    const ccArray = createCurrentConditionsDivs(
        weatherJson,
        locationObj.getUnit()
    );
    displayCurrentConditions(ccArray);
    displaySixDayForecast(weatherJson);
    setFocusOnSearch();
    fadeDisplay();
};

const fadeDisplay = (): void => {
    const cc = document.getElementById("currentForecast") as HTMLElement;
    cc.classList.toggle("zero-vis");
    cc.classList.toggle("fade-in");
    const sixDay = document.getElementById("dailyForecast") as HTMLElement;
    sixDay.classList.toggle("zero-vis");
    sixDay.classList.toggle("fade-in");
};

const clearDisplay = (): void => {
    const currentConditions = document.getElementById(
        "currentForecast__conditions"
    ) as HTMLElement;
    deleteContents(currentConditions);
    const sixDayForecast = document.getElementById("dailyForecast__contents") as HTMLElement;
    deleteContents(sixDayForecast);
};

const deleteContents = (parentElement: HTMLElement): void => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const buildScreenReaderWeather = (weatherJson: WeatherInterface, locationObj: CurrentLocation): string => {
    const location = locationObj.getName();
    const unit = locationObj.getUnit();
    const tempUnit = unit === "imperial" ? "Fahrenheit" : "Celsius";
    return `${weatherJson.current.weather[0].description} and ${Math.round(
        Number(weatherJson.current.temp)
    )}°${tempUnit} in ${location}`;
};

const setFocusOnSearch = (): void => {
    (document.getElementById("searchBar__text") as HTMLElement).focus();
};
const createElem = (elemType: string, divClassName: string, divText?: string, unit?: string): HTMLElement => {
    const div = document.createElement(elemType);
    div.className = divClassName;
    if (divText) {
        div.textContent = divText;
    }
    if (divClassName === "temp" && unit) {
        const unitDiv = document.createElement("div") as HTMLElement;
        unitDiv.className = "unit";
        unitDiv.textContent = unit;
        div.appendChild(unitDiv);
    }
    return div;
};
const createCurrentConditionsDivs = (weatherObj: WeatherInterface, unit: string): HTMLElement[] => {
    const tempUnit = unit === "imperial" ? "F" : "C";
    const icon = createMainImgDiv(
        weatherObj.current.weather[0].icon,
        weatherObj.current.weather[0].description
    );
    const temp = createElem(
        "div",
        "temp",
        `${Math.round(Number(weatherObj.current.temp))}°`,
        tempUnit
    );
    const feels = createElem(
        "div",
        "feels",
        `Feels Like${Math.round(Number(weatherObj.current.feels_like))}°`,
        tempUnit
    );
    return [icon, temp, feels];
};

const createMainImgDiv = (icon: string, altText: string): HTMLElement => {
    const iconDiv = createElem("div", "icon");
    iconDiv.id = "icon";
    const faIcon = translateIconToFontAwesome(icon);
    faIcon.ariaHidden = "true";
    faIcon.title = altText;
    iconDiv.appendChild(faIcon);
    return iconDiv;
};

const translateIconToFontAwesome = (icon: string): HTMLElement => {
    const i = document.createElement("i");
    const firstTwoChars = icon.slice(0, 2);
    const lastChar = icon.slice(2);
    switch (firstTwoChars) {
        case "01":
            if (lastChar === "d") {
                i.classList.add("far", "fa-sun");
            } else {
                i.classList.add("far", "fa-moon");
            }
            break;
        case "02":
            if (lastChar === "d") {
                i.classList.add("fas", "fa-cloud-sun");
            } else {
                i.classList.add("fas", "fa-cloud-moon");
            }
            break;
        case "03":
            i.classList.add("fas", "fa-cloud");
            break;
        case "04":
            i.classList.add("fas", "fa-cloud-meatball");
            break;
        case "09":
            i.classList.add("fas", "fa-cloud-rain");
            break;
        case "10":
            if (lastChar === "d") {
                i.classList.add("fas", "fa-cloud-sun-rain");
            } else {
                i.classList.add("fas", "fa-cloud-moon-rain");
            }
            break;
        case "11":
            i.classList.add("fas", "fa-poo-storm");
            break;
        case "13":
            i.classList.add("far", "fa-snowflake");
            break;
        case "50":
            i.classList.add("fas", "fa-smog");
            break;
        default:
            i.classList.add("far", "fa-question-circle");
    }
    return i;
};

const displayCurrentConditions = (currentConditionsArray: HTMLElement[]): void => {
    const ccContainer = document.getElementById("currentForecast__conditions") as HTMLElement;
    currentConditionsArray.forEach((cc) => {
        ccContainer.appendChild(cc);
    });
};

const displaySixDayForecast = (weatherJson: WeatherInterface): void => {
    for (let i = 1; i <= 6; i++) {
        const dfArray = createDailyForecastDivs(weatherJson.daily[i]);
        displayDailyForecast(dfArray);
    }
};

const createDailyForecastDivs = (dayWeather: DayWeatherInterface): HTMLElement[] => {
    const dayAbbreviationText = getDayAbbreviation(dayWeather.dt);
    const dayAbbreviation = createElem(
        "p",
        "dayAbbreviation",
        dayAbbreviationText
    );
    const dayIcon = createDailyForecastIcon(
        dayWeather.weather[0].icon,
        dayWeather.weather[0].description
    );
    const dayHigh = createElem(
        "p",
        "dayHigh",
        `${Math.round(Number(dayWeather.temp.max))}°`
    );
    const dayLow = createElem(
        "p",
        "dayLow",
        `${Math.round(Number(dayWeather.temp.min))}°`
    );
    return [dayAbbreviation, dayIcon, dayHigh, dayLow];
};

const getDayAbbreviation = (data: number): string => {
    const dateObj = new Date(data * 1000);
    const utcString = dateObj.toUTCString();
    return utcString.slice(0, 3).toUpperCase();
};

const createDailyForecastIcon = (icon: string, altText: string): HTMLElement => {
    const img = document.createElement("img");
    if (window.innerWidth < 768 || window.innerHeight < 1025) {
        img.src = `https://openweathermap.org/img/wn/${icon}.png`;
    } else {
        img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
    img.alt = altText;
    return img;
};

const displayDailyForecast = (dfArray: HTMLElement[]): void => {
    const dayDiv = createElem("div", "forecastDay");
    dfArray.forEach((el) => {
        dayDiv.appendChild(el);
    });
    const dailyForecastContainer = document.getElementById(
        "dailyForecast__contents"
    ) as HTMLElement;
    dailyForecastContainer.appendChild(dayDiv);
};

const geoSuccess = (position: GeolocationPosition): void =>  {
    const myCoordsObj = {
        lat: position.coords.latitude.toString(),
        lon: position.coords.longitude.toString(),
        name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
    } as CoordObjectInterface;
    setLocationObject(currentLoc, myCoordsObj);
    updateDataAndDisplay(currentLoc);
};

const loadWeather = (event?:PointerEvent): void => {
    const savedLocation = getHomeLocation();
    if (!savedLocation && !event) return getGeoWeather();
    if (!savedLocation && event?.type === "click") {
        displayError(
            "No Home Location Saved.",
            "Sorry. Please save your home location first."
        );
    } else if (savedLocation && !event) {
        displayHomeLocationWeather(savedLocation);
    } else if (savedLocation) {
        const homeIcon = document.querySelector(".fa-home") as HTMLElement;
        addSpinner(homeIcon);
        displayHomeLocationWeather(savedLocation);
    }
};

const displayHomeLocationWeather = (home: string): void => {
    const locationJson = JSON.parse(home);
    const myCoordsObj = {
        lat: locationJson.lat,
        lon: locationJson.lon,
        name: locationJson.name,
        unit: locationJson.unit
    };
    setLocationObject(currentLoc, myCoordsObj);
    updateDataAndDisplay(currentLoc);
};

const saveLocation = (): void => {
    if (currentLoc.getLat() && currentLoc.getLon()) {
        const saveIcon = document.querySelector(".fa-save") as HTMLElement;
        addSpinner(saveIcon);
        const location = {
            name: currentLoc.getName(),
            lat: currentLoc.getLat(),
            lon: currentLoc.getLon(),
            unit: currentLoc.getUnit()
        };
        localStorage.setItem("defaultWeatherLocation", JSON.stringify(location));
        updateScreenReaderConfirmation(
            `Saved ${currentLoc.getName()} as home location.`
        );
    }
};

const setUnitPref = (): void => {
    const unitIcon = document.querySelector(".fa-chart-bar") as HTMLElement;
    addSpinner(unitIcon);
    currentLoc.toggleUnit();
    updateDataAndDisplay(currentLoc);
};

const refreshWeather = (): void => {
    const refreshIcon = document.querySelector(".fa-sync-alt") as HTMLElement;
    addSpinner(refreshIcon);
    updateDataAndDisplay(currentLoc);
};

const submitNewLocation = async (event: Event): Promise<IGetResInterface | undefined> => {
    event.preventDefault();
    const text = (<HTMLInputElement>document.getElementById("searchBar__text")).value;
    const entryText = cleanText(text);
    if (!entryText.length) return;
    const locationIcon = document.querySelector(".fa-search") as HTMLElement;
    addSpinner(locationIcon);
    const coordsData = await getCoordsFromApi(entryText, currentLoc.getUnit());
    if (coordsData) {
        if (coordsData.cod === 200) {
            const myCoordsObj = {
                lat: coordsData.coord.lat,
                lon: coordsData.coord.lon,
                name: coordsData.sys.country
                    ? `${coordsData.name}, ${coordsData.sys.country}`
                    : coordsData.name
            };
            setLocationObject(currentLoc, myCoordsObj);
            updateDataAndDisplay(currentLoc);
        } else {
            displayApiError(coordsData);
        }
    } else {
        displayError("Connection Error", "Connection Error");
    }
};

const updateDataAndDisplay = async (locationObj: CurrentLocation): Promise<void> => {
    const weatherJson = await getWeatherFromCoords(locationObj);
    if (weatherJson) updateDisplay(weatherJson, locationObj);
};
