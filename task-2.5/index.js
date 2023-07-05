var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function getMyCookies() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var allCookies = decodedCookie.split(';');
    return allCookies.filter(function (cookie) {
        var id = cookie.split('=')[0];
        return /LoveCookies/.test(id);
    }) || [];
}
function getList() {
    var myCookies = getMyCookies();
    var list = document.getElementById('list');
    if (myCookies.length) {
        JSON.parse(myCookies[0].split('=')[1]).forEach(function (value) {
            list.innerHTML += '<div id=' + value + '>' + value + ' <button onclick="deleteItem(\'' + value + '\')"><i class="fas fa-trash"></i></button></div>';
        });
    }
}
function addItem() {
    var text = document.getElementById('grocery').value;
    if (text.length > 0) {
        var date = new Date();
        var id = 'LoveCookies';
        addListItem(id, text);
        document.getElementById('grocery').value = '';
    }
}
function addListItem(id, text) {
    setCookie(id, text, 365);
    var list = document.getElementById('list');
    list.innerHTML += '<div id=' + text + '>' + text + ' <button onclick="deleteItem(\'' + text + '\')" class="delete-btn"><i class="fas fa-trash"></i></button></div>';
}
function setCookie(id, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var myCookies = getMyCookies();
    var values = [];
    if (myCookies.length) {
        values = __spreadArray(__spreadArray([], JSON.parse(myCookies[0].split('=')[1]), true), [value], false);
    }
    else {
        values = [value];
    }
    document.cookie = id + "=" + JSON.stringify(values) + ";" + expires + ";path=/";
}
function deleteItem(id) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var myCookies = getMyCookies();
    var values = JSON.parse(myCookies[0].split('=')[1]).filter(function (item) { return item !== id; });
    var item = document.getElementById(id);
    item.remove();
    document.cookie = 'LoveCookies' + "=" + JSON.stringify(values) + ";" + expires + ";path=/";
}
function deleteList() {
    var myCookies = getMyCookies();
    var values = JSON.parse(myCookies[0].split('=')[1]);
    values.forEach(function (value) {
        var item = document.getElementById(value);
        item.remove();
    });
    if (!myCookies)
        return;
    document.cookie = 'LoveCookies' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
