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
var filter = document.querySelector('.filter-box');
var search = document.querySelector('.search-txt');
var cardsContainer = document.querySelector('.cards-container');
var resdata = [];
var url = 'https://restcountries.com/v2/';
var dark = (localStorage.getItem('dark') == null) ? "off" : localStorage.getItem('dark');
var data = function (restUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var answer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugger;
                return [4 /*yield*/, fetch("".concat(url).concat(restUrl))];
            case 1:
                answer = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, answer.json()];
            case 3:
                resdata = _a.sent();
                return [2 /*return*/, resdata['']];
            case 4:
                error_1 = _a.sent();
                console.log('error:' + error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
window.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (dark === "on") {
                    document.documentElement.style.setProperty('--mode-bg', 'var(--VeryDarkBlue)');
                    document.documentElement.style.setProperty('--Elements-color', 'var(--DarkBlue)');
                    document.documentElement.style.setProperty('--text-clr', 'var(--White)');
                }
                else {
                    document.documentElement.style.setProperty('--mode-bg', 'var(--VeryLightGray)');
                    document.documentElement.style.setProperty('--Elements-color', 'var(--White)');
                    document.documentElement.style.setProperty('--text-clr', 'var(--VeryDarkBlueT)');
                }
                return [4 /*yield*/, data(filter.value).then(function () { return updateUi(resdata); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var updateUi = function (data) {
    var reducedData = (data.length > 100) ? data.slice(0, 100) : data;
    var cards = [];
    for (var _i = 0, reducedData_1 = reducedData; _i < reducedData_1.length; _i++) {
        var item = reducedData_1[_i];
        var card = "<div class=\"card\" data-country=\"".concat(item.name, "\">\n       <img src=\"").concat(item.flags.png, "\" class=\"card-img-top\" alt=\"").concat(item.name, "\">\n       <div class=\"card-body\">\n         <h5 class=\"card-title\">").concat(item.name, "</h5>\n         <div><span>Population:</span> <span>").concat(item.population, "</span></div>\n         <div><span>Region:</span><span>").concat(item.region, "</span></div>\n         <div><span>Capital:</span><span>").concat(item.capital, "</span></div>\n       </div>\n     </div>");
        cards.push(card);
    }
    cardsContainer.innerHTML = cards.join('');
};
var resetSearch = function () {
    var elem = document.querySelector('.search-txt');
    elem.value = '';
};
filter.addEventListener('change', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                value = event.target.value;
                return [4 /*yield*/, data(value).then(function () { return updateUi(resdata); })];
            case 1:
                _a.sent();
                resetSearch();
                return [2 /*return*/];
        }
    });
}); });
var resetFilter = function () {
    var elem = document.querySelector('.filter-box');
    elem.value = 'all';
};
search.addEventListener('keyup', function () { return __awaiter(void 0, void 0, void 0, function () {
    var resturl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resturl = "name/".concat(search.value);
                return [4 /*yield*/, data(resturl).then(function () { return updateUi(resdata); })];
            case 1:
                _a.sent();
                resetFilter();
                return [2 /*return*/];
        }
    });
}); });
function darkMoodFn() {
    dark = (localStorage.getItem('dark') == null) ? "off" : localStorage.getItem('dark');
    if (dark === "off") {
        /* document.documentElement.style.setProperty('--mode-bg', 'var(--VeryDarkBlue)');
         document.documentElement.style.setProperty('--Elements-color', 'var(--DarkBlue)');
         document.documentElement.style.setProperty('--text-clr', 'var(--White)');*/
        localStorage.setItem('dark', "on");
    }
    else {
        /* document.documentElement.style.setProperty('--mode-bg', 'var(--VeryLightGray)');
         document.documentElement.style.setProperty('--Elements-color', 'var(--White)');
         document.documentElement.style.setProperty('--text-clr', 'var(--VeryDarkBlueT)');*/
        localStorage.setItem('dark', "off");
    }
}
document.querySelector('.dark-mood').addEventListener('click', function () { return darkMoodFn(); });
