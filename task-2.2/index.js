var food = [
    {
        name: "Cauliflower, Shiitake",
        img: "images/8.jpg",
        price: "500",
        category: "Vegetable",
        des: "Dish that is easy, quick and a no fuss recipe."
    },
    {
        name: "Parsnip Puree",
        img: "images/13.jpg",
        price: "350",
        category: "Vegetable",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Parsnip Puree",
        img: "images/16.jpg",
        price: "500",
        category: "Vegetable",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "DAL Shiitak",
        img: "images/11.jpg",
        price: "250",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Roasted Chicken",
        img: "images/12.jpg",
        price: "1250",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Roasted Chicken",
        img: "images/13.jpg",
        price: "150",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Roasted Chicken",
        img: "images/17.jpg",
        price: "150",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Duck with (or not)",
        img: "images/16.jpg",
        price: "450",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Duck (or not) with",
        img: "images/16.jpg",
        price: "250",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Chocolate Soil",
        img: "images/20.jpg",
        price: "260",
        category: "Dessert",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Coffee Panna Cotta",
        img: "images/21.jpg",
        price: "520",
        category: "Dessert",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy"
    },
    {
        name: "Panna cotta",
        img: "images/22.jpg",
        price: "460",
        category: "Dessert",
        des: "You need less than to make smoothie"
    },
    {
        name: "Passion fruit",
        img: "images/23.jpg",
        price: "620",
        category: "Dessert",
        des: "You need less than to make smoothie"
    },
    {
        name: "Pineapple upside",
        img: "images/24.jpg",
        price: "100",
        category: "Dessert",
        des: "You need less than to make smoothie"
    },
    {
        name: "Montrachet Domaine ",
        img: "images/39.jpg",
        price: "250",
        category: "Drinks",
        des: "You need less than to make smoothie"
    },
    {
        name: "Whiskey styling",
        img: "images/33.jpg",
        price: "550",
        category: "Drinks",
        des: "You need less than to make smoothie"
    },
    {
        name: "Smoke in Commercial",
        img: "images/34.jpg",
        price: "550",
        category: "Drinks",
        des: "You need less than to make smoothie"
    },
    {
        name: "Cheval Blanc ",
        img: "images/38.jpg",
        price: "400",
        category: "Drinks",
        des: "You need less than to make smoothie"
    },
    {
        name: "Clarified New",
        img: "images/36.jpg",
        price: "150",
        category: "Drinks",
        des: "You need less than to make smoothie"
    },
    {
        name: "Cheval Blanc ",
        img: "images/37.jpg",
        price: "320",
        category: "Drinks",
        des: "You need less than to make smoothie"
    },
];
var categories = document.querySelector(".categories");
var container = document.querySelector(".container");
var getCatFood = function () {
    filterMenu("ALL");
    var cat = food
        .reduce(function (values, items) {
        if (!values.includes(items.category)) {
            values.push(items.category);
        }
        return values;
    }, ["ALL"]);
    var catBtn = cat
        .map(function (item) {
        return "<a href=\"#\" class=\"ctitle ".concat(item, "\">").concat(item, "</a>");
    });
    categories.innerHTML = catBtn
        .join("");
};
var handleItemClick = function () {
    var button = document.getElementsByClassName("ctitle");
    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function (e) {
            var val = e.target.className.split(" ");
            filterMenu(val[1]);
        });
    }
};
window.addEventListener("DOMContentLoaded", function () {
    getCatFood();
    handleItemClick();
});
var displayMenu = function (food) {
    container.innerHTML = food
        .map(function (item) {
        return ("<div class=\"items\">\n               <div class=\"img-continer\">\n                 <img src=".concat(item.img, " alt=\"dishes\"/>\n               </div> \n            <div class=\"t-n-p\">\n               <div class=\"details\">\n                 <span class=\"title\">").concat(item.name, "</span>\n                 <span class=\"price\">$").concat(item.price, "</span> \n                </div>\n\n                <div class=\"des\">\n                  ").concat(item.des, "\n                </div>\n\n                <div class=\"category\">\n                  ").concat(item.category, "\n                </div>\n            </div>\n        </div>"));
    }).join("");
};
food
    .reduce(function (values, items) {
    if (!values.includes(items.category)) {
        values.push(items.category);
    }
    return values;
}, ["ALL"]);
function filterMenu(category) {
    var filter1 = food.filter(function (item) { return item.category === category; });
    displayMenu(category === "ALL" ? food : filter1);
}
