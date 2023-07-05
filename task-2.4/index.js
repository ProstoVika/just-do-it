"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var CurrentLocation = /** @class */ (function () {
    function CurrentLocation(_name, _lat, _lon, _unit) {
        this._name = _name;
        this._lat = _lat;
        this._lon = _lon;
        this._unit = _unit;
    }
    CurrentLocation.prototype.getName = function () {
        return this._name;
    };
    CurrentLocation.prototype.setName = function (name) {
        this._name = name;
    };
    CurrentLocation.prototype.getLat = function () {
        return this._lat;
    };
    CurrentLocation.prototype.setLat = function (lat) {
        this._lat = lat;
    };
    CurrentLocation.prototype.getLon = function () {
        return this._lon;
    };
    CurrentLocation.prototype.setLon = function (lon) {
        this._lon = lon;
    };
    CurrentLocation.prototype.getUnit = function () {
        return this._unit;
    };
    CurrentLocation.prototype.setUnit = function (unit) {
        this._unit = unit;
    };
    CurrentLocation.prototype.toggleUnit = function () {
        this._unit = this._unit === "imperial" ? "metric" : "imperial";
    };
    return CurrentLocation;
}());
var currentLoc = new CurrentLocation('', '', '', '');
var initApp = function () {
    var geoButton = document.getElementById("getLocation");
    geoButton.addEventListener("click", getGeoWeather);
    var homeButton = document.getElementById("home");
    homeButton.addEventListener("click", loadWeather);
    var saveButton = document.getElementById("saveLocation");
    saveButton.addEventListener("click", saveLocation);
    var unitButton = document.getElementById("unit");
    unitButton.addEventListener("click", setUnitPref);
    var refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", refreshWeather);
    var locationEntry = document.getElementById("searchBar__form");
    locationEntry.addEventListener("submit", submitNewLocation);
    setPlaceholderText();
    loadWeather();
};
document.addEventListener("DOMContentLoaded", initApp);
var getGeoWeather = function (event) {
    if (event && event.type === "click") {
        var mapIcon = document.querySelector(".fa-map-marker-alt");
        addSpinner(mapIcon);
    }
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
var addSpinner = function (element) {
    animateButton(element);
    setTimeout(animateButton, 1000, element);
};
var animateButton = function (element) {
    var _a, _b;
    element.classList.toggle("none");
    (_a = element.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.toggle("block");
    (_b = element.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.toggle("none");
};
var geoError = function (errObj) {
    var errMsg = errObj ? errObj.message : "Geolocation not supported";
    displayError(errMsg, errMsg);
};
var setLocationObject = function (locationObj, coordsObj) {
    var lat = coordsObj.lat, lon = coordsObj.lon, name = coordsObj.name, unit = coordsObj.unit;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
        locationObj.setUnit(unit);
    }
};
var getHomeLocation = function () {
    return localStorage.getItem("defaultWeatherLocation");
};
var WEATHER_API_KEY = '5489fd4b518810ca9aac9f95c2b1b532';
var getWeatherFromCoords = function (locationObj) { return __awaiter(void 0, void 0, void 0, function () {
    var lat, lon, units, url, weatherStream, err_1, urlDataObj, weatherStream, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lat = locationObj.getLat();
                lon = locationObj.getLon();
                units = locationObj.getUnit();
                url = "https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(lon, "&exclude=minutely,hourly,alerts&units=").concat(units, "&appid=").concat(WEATHER_API_KEY);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                weatherStream = _a.sent();
                return [4 /*yield*/, weatherStream.json()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 5];
            case 5:
                urlDataObj = {
                    lat: locationObj.getLat(),
                    lon: locationObj.getLon(),
                    units: locationObj.getUnit()
                };
                _a.label = 6;
            case 6:
                _a.trys.push([6, 9, , 10]);
                return [4 /*yield*/, fetch("./.netlify/functions/get_weather", {
                        method: "POST",
                        body: JSON.stringify(urlDataObj)
                    })];
            case 7:
                weatherStream = _a.sent();
                return [4 /*yield*/, weatherStream.json()];
            case 8: return [2 /*return*/, _a.sent()];
            case 9:
                err_2 = _a.sent();
                console.error(err_2);
                throw (err_2);
            case 10: return [2 /*return*/];
        }
    });
}); };
var getCoordsFromApi = function (entryText, units) { return __awaiter(void 0, void 0, void 0, function () {
    var regex, flag, url, encodedUrl, dataStream, err_3, error, urlDataObj, dataStream, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                regex = /^\d+$/g;
                flag = regex.test(entryText) ? "zip" : "q";
                url = "https://api.openweathermap.org/data/2.5/weather?".concat(flag, "=").concat(entryText, "&units=").concat(units, "&appid=").concat(WEATHER_API_KEY);
                encodedUrl = encodeURI(url);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(encodedUrl)];
            case 2:
                dataStream = _a.sent();
                return [4 /*yield*/, dataStream.json()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                err_3 = _a.sent();
                error = err_3;
                console.error(error.stack);
                return [3 /*break*/, 5];
            case 5:
                urlDataObj = {
                    text: entryText,
                    units: units
                };
                _a.label = 6;
            case 6:
                _a.trys.push([6, 9, , 10]);
                return [4 /*yield*/, fetch("./.netlify/functions/get_coords", {
                        method: "POST",
                        body: JSON.stringify(urlDataObj)
                    })];
            case 7:
                dataStream = _a.sent();
                return [4 /*yield*/, dataStream.json()];
            case 8: return [2 /*return*/, _a.sent()];
            case 9:
                err_4 = _a.sent();
                console.error(err_4);
                throw (err_4);
            case 10: return [2 /*return*/];
        }
    });
}); };
var cleanText = function (text) {
    var regex = / {2,}/g;
    return text.replaceAll(regex, " ").trim();
};
var setPlaceholderText = function () {
    var input = document.getElementById("searchBar__text");
    window.innerWidth < 400
        ? (input.placeholder = "Kyiv, Київ, Ukraine")
        : (input.placeholder = "Kyiv, Київ, Ukraine");
};
var displayError = function (headerMsg, srMsg) {
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(srMsg);
};
var displayApiError = function (statusCode) {
    var properMsg = toProperCase(statusCode.message);
    updateWeatherLocationHeader(properMsg);
    updateScreenReaderConfirmation("".concat(properMsg, ". Please try again."));
};
var toProperCase = function (text) {
    var words = text.split(" ");
    var properWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return properWords.join(" ");
};
var updateWeatherLocationHeader = function (message) {
    var h1 = document.getElementById("currentForecast__location");
    if (message.indexOf("Lat:") !== -1 && message.indexOf("Long:") !== -1) {
        var msgArray = message.split(" ");
        var mapArray = msgArray.map(function (msg) {
            return msg.replace(":", ": ");
        });
        var lat = mapArray[0].indexOf("-") === -1
            ? mapArray[0].slice(0, 10)
            : mapArray[0].slice(0, 11);
        var lon = mapArray[1].indexOf("-") === -1
            ? mapArray[1].slice(0, 11)
            : mapArray[1].slice(0, 12);
        h1.textContent = "".concat(lat, " \u2022 ").concat(lon);
    }
    else {
        h1.textContent = message;
    }
};
var updateScreenReaderConfirmation = function (message) {
    document.getElementById("confirmation").textContent = message;
};
var updateDisplay = function (weatherJson, locationObj) {
    fadeDisplay();
    clearDisplay();
    var screenReaderWeather = buildScreenReaderWeather(weatherJson, locationObj);
    updateScreenReaderConfirmation(screenReaderWeather);
    updateWeatherLocationHeader(locationObj.getName());
    var ccArray = createCurrentConditionsDivs(weatherJson, locationObj.getUnit());
    displayCurrentConditions(ccArray);
    displaySixDayForecast(weatherJson);
    setFocusOnSearch();
    fadeDisplay();
};
var fadeDisplay = function () {
    var cc = document.getElementById("currentForecast");
    cc.classList.toggle("zero-vis");
    cc.classList.toggle("fade-in");
    var sixDay = document.getElementById("dailyForecast");
    sixDay.classList.toggle("zero-vis");
    sixDay.classList.toggle("fade-in");
};
var clearDisplay = function () {
    var currentConditions = document.getElementById("currentForecast__conditions");
    deleteContents(currentConditions);
    var sixDayForecast = document.getElementById("dailyForecast__contents");
    deleteContents(sixDayForecast);
};
var deleteContents = function (parentElement) {
    var child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};
var buildScreenReaderWeather = function (weatherJson, locationObj) {
    var location = locationObj.getName();
    var unit = locationObj.getUnit();
    var tempUnit = unit === "imperial" ? "Fahrenheit" : "Celsius";
    return "".concat(weatherJson.current.weather[0].description, " and ").concat(Math.round(Number(weatherJson.current.temp)), "\u00B0").concat(tempUnit, " in ").concat(location);
};
var setFocusOnSearch = function () {
    document.getElementById("searchBar__text").focus();
};
var createElem = function (elemType, divClassName, divText, unit) {
    var div = document.createElement(elemType);
    div.className = divClassName;
    if (divText) {
        div.textContent = divText;
    }
    if (divClassName === "temp" && unit) {
        var unitDiv = document.createElement("div");
        unitDiv.className = "unit";
        unitDiv.textContent = unit;
        div.appendChild(unitDiv);
    }
    return div;
};
var createCurrentConditionsDivs = function (weatherObj, unit) {
    var tempUnit = unit === "imperial" ? "F" : "C";
    var icon = createMainImgDiv(weatherObj.current.weather[0].icon, weatherObj.current.weather[0].description);
    var temp = createElem("div", "temp", "".concat(Math.round(Number(weatherObj.current.temp)), "\u00B0"), tempUnit);
    var feels = createElem("div", "feels", "Feels Like".concat(Math.round(Number(weatherObj.current.feels_like)), "\u00B0"), tempUnit);
    return [icon, temp, feels];
};
var createMainImgDiv = function (icon, altText) {
    var iconDiv = createElem("div", "icon");
    iconDiv.id = "icon";
    var faIcon = translateIconToFontAwesome(icon);
    faIcon.ariaHidden = "true";
    faIcon.title = altText;
    iconDiv.appendChild(faIcon);
    return iconDiv;
};
var translateIconToFontAwesome = function (icon) {
    var i = document.createElement("i");
    var firstTwoChars = icon.slice(0, 2);
    var lastChar = icon.slice(2);
    switch (firstTwoChars) {
        case "01":
            if (lastChar === "d") {
                i.classList.add("far", "fa-sun");
            }
            else {
                i.classList.add("far", "fa-moon");
            }
            break;
        case "02":
            if (lastChar === "d") {
                i.classList.add("fas", "fa-cloud-sun");
            }
            else {
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
            }
            else {
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
var displayCurrentConditions = function (currentConditionsArray) {
    var ccContainer = document.getElementById("currentForecast__conditions");
    currentConditionsArray.forEach(function (cc) {
        ccContainer.appendChild(cc);
    });
};
var displaySixDayForecast = function (weatherJson) {
    for (var i = 1; i <= 6; i++) {
        var dfArray = createDailyForecastDivs(weatherJson.daily[i]);
        displayDailyForecast(dfArray);
    }
};
var createDailyForecastDivs = function (dayWeather) {
    var dayAbbreviationText = getDayAbbreviation(dayWeather.dt);
    var dayAbbreviation = createElem("p", "dayAbbreviation", dayAbbreviationText);
    var dayIcon = createDailyForecastIcon(dayWeather.weather[0].icon, dayWeather.weather[0].description);
    var dayHigh = createElem("p", "dayHigh", "".concat(Math.round(Number(dayWeather.temp.max)), "\u00B0"));
    var dayLow = createElem("p", "dayLow", "".concat(Math.round(Number(dayWeather.temp.min)), "\u00B0"));
    return [dayAbbreviation, dayIcon, dayHigh, dayLow];
};
var getDayAbbreviation = function (data) {
    var dateObj = new Date(data * 1000);
    var utcString = dateObj.toUTCString();
    return utcString.slice(0, 3).toUpperCase();
};
var createDailyForecastIcon = function (icon, altText) {
    var img = document.createElement("img");
    if (window.innerWidth < 768 || window.innerHeight < 1025) {
        img.src = "https://openweathermap.org/img/wn/".concat(icon, ".png");
    }
    else {
        img.src = "https://openweathermap.org/img/wn/".concat(icon, "@2x.png");
    }
    img.alt = altText;
    return img;
};
var displayDailyForecast = function (dfArray) {
    var dayDiv = createElem("div", "forecastDay");
    dfArray.forEach(function (el) {
        dayDiv.appendChild(el);
    });
    var dailyForecastContainer = document.getElementById("dailyForecast__contents");
    dailyForecastContainer.appendChild(dayDiv);
};
var geoSuccess = function (position) {
    var myCoordsObj = {
        lat: position.coords.latitude.toString(),
        lon: position.coords.longitude.toString(),
        name: "Lat:".concat(position.coords.latitude, " Long:").concat(position.coords.longitude)
    };
    setLocationObject(currentLoc, myCoordsObj);
    updateDataAndDisplay(currentLoc);
};
var loadWeather = function (event) {
    var savedLocation = getHomeLocation();
    if (!savedLocation && !event)
        return getGeoWeather();
    if (!savedLocation && (event === null || event === void 0 ? void 0 : event.type) === "click") {
        displayError("No Home Location Saved.", "Sorry. Please save your home location first.");
    }
    else if (savedLocation && !event) {
        displayHomeLocationWeather(savedLocation);
    }
    else if (savedLocation) {
        var homeIcon = document.querySelector(".fa-home");
        addSpinner(homeIcon);
        displayHomeLocationWeather(savedLocation);
    }
};
var displayHomeLocationWeather = function (home) {
    var locationJson = JSON.parse(home);
    var myCoordsObj = {
        lat: locationJson.lat,
        lon: locationJson.lon,
        name: locationJson.name,
        unit: locationJson.unit
    };
    setLocationObject(currentLoc, myCoordsObj);
    updateDataAndDisplay(currentLoc);
};
var saveLocation = function () {
    if (currentLoc.getLat() && currentLoc.getLon()) {
        var saveIcon = document.querySelector(".fa-save");
        addSpinner(saveIcon);
        var location_1 = {
            name: currentLoc.getName(),
            lat: currentLoc.getLat(),
            lon: currentLoc.getLon(),
            unit: currentLoc.getUnit()
        };
        localStorage.setItem("defaultWeatherLocation", JSON.stringify(location_1));
        updateScreenReaderConfirmation("Saved ".concat(currentLoc.getName(), " as home location."));
    }
};
var setUnitPref = function () {
    var unitIcon = document.querySelector(".fa-chart-bar");
    addSpinner(unitIcon);
    currentLoc.toggleUnit();
    updateDataAndDisplay(currentLoc);
};
var refreshWeather = function () {
    var refreshIcon = document.querySelector(".fa-sync-alt");
    addSpinner(refreshIcon);
    updateDataAndDisplay(currentLoc);
};
var submitNewLocation = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var text, entryText, locationIcon, coordsData, myCoordsObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                text = document.getElementById("searchBar__text").value;
                entryText = cleanText(text);
                if (!entryText.length)
                    return [2 /*return*/];
                locationIcon = document.querySelector(".fa-search");
                addSpinner(locationIcon);
                return [4 /*yield*/, getCoordsFromApi(entryText, currentLoc.getUnit())];
            case 1:
                coordsData = _a.sent();
                if (coordsData) {
                    if (coordsData.cod === 200) {
                        myCoordsObj = {
                            lat: coordsData.coord.lat,
                            lon: coordsData.coord.lon,
                            name: coordsData.sys.country
                                ? "".concat(coordsData.name, ", ").concat(coordsData.sys.country)
                                : coordsData.name
                        };
                        setLocationObject(currentLoc, myCoordsObj);
                        updateDataAndDisplay(currentLoc);
                    }
                    else {
                        displayApiError(coordsData);
                    }
                }
                else {
                    displayError("Connection Error", "Connection Error");
                }
                return [2 /*return*/];
        }
    });
}); };
var updateDataAndDisplay = function (locationObj) { return __awaiter(void 0, void 0, void 0, function () {
    var weatherJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getWeatherFromCoords(locationObj)];
            case 1:
                weatherJson = _a.sent();
                if (weatherJson)
                    updateDisplay(weatherJson, locationObj);
                return [2 /*return*/];
        }
    });
}); };
