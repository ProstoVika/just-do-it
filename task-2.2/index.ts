interface FoodInterface{
    img : string;
    name : string;
    price : string;
    des : string;
    category : string;
}
const food = [
    {
        name: "Cauliflower, Shiitake",
        img: "images/8.jpg",
        price: "500",
        category: "Vegetable",
        des: "Dish that is easy, quick and a no fuss recipe.",
    },
    {
        name: "Parsnip Puree",
        img: "images/13.jpg",
        price: "350",
        category: "Vegetable",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Parsnip Puree",
        img: "images/16.jpg",
        price: "500",
        category: "Vegetable",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "DAL Shiitak",
        img: "images/11.jpg",
        price: "250",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Roasted Chicken",
        img: "images/12.jpg",
        price: "1250",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Roasted Chicken",
        img: "images/13.jpg",
        price: "150",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Roasted Chicken",
        img: "images/17.jpg",
        price: "150",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Duck with (or not)",
        img: "images/16.jpg",
        price: "450",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Duck (or not) with",
        img: "images/16.jpg",
        price: "250",
        category: "Fish/Meat",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Chocolate Soil",
        img: "images/20.jpg",
        price: "260",
        category: "Dessert",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Coffee Panna Cotta",
        img: "images/21.jpg",
        price: "520",
        category: "Dessert",
        des: "Aloo Gosht is a spicy, thick and creamy meat gravy",
    },
    {
        name: "Panna cotta",
        img: "images/22.jpg",
        price: "460",
        category: "Dessert",
        des: "You need less than to make smoothie",
    },
    {
        name: "Passion fruit",
        img: "images/23.jpg",
        price: "620",
        category: "Dessert",
        des: "You need less than to make smoothie",
    },
    {
        name: "Pineapple upside",
        img: "images/24.jpg",
        price: "100",
        category: "Dessert",
        des: "You need less than to make smoothie",
    },
    {
        name: "Montrachet Domaine ",
        img: "images/39.jpg",
        price: "250",
        category: "Drinks",
        des: "You need less than to make smoothie",
    },
    {
        name: "Whiskey styling",
        img: "images/33.jpg",
        price: "550",
        category: "Drinks",
        des: "You need less than to make smoothie",
    },
    {
        name: "Smoke in Commercial",
        img: "images/34.jpg",
        price: "550",
        category: "Drinks",
        des: "You need less than to make smoothie",
    },
    {
        name: "Cheval Blanc ",
        img: "images/38.jpg",
        price: "400",
        category: "Drinks",
        des: "You need less than to make smoothie",
    },
    {
        name: "Clarified New",
        img: "images/36.jpg",
        price: "150",
        category: "Drinks",
        des: "You need less than to make smoothie",
    },
    {
        name: "Cheval Blanc ",
        img: "images/37.jpg",
        price: "320",
        category: "Drinks",
        des: "You need less than to make smoothie",
    },
];

const categories = document.querySelector(".categories");
const container = document.querySelector(".container");
const getCatFood = () => {
    filterMenu ("ALL")

    const cat = food
        .reduce(
            (values, items) => {
                if (!values.includes(items.category)) {
                    values.push(items.category);
                }
                return values;
            },
            ["ALL"],
        );

    const catBtn = cat
        .map((item) => {
            return `<a href="#" class="ctitle ${item}">${item}</a>`;
        })
    categories.innerHTML = catBtn
        .join("");
}
const handleItemClick = () => {
    let button = document.getElementsByClassName("ctitle")
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener ("click",
            (e) => {
                const val = (e.target as HTMLButtonElement).className.split(" ");
                filterMenu(val[1])
            });
    }
}
window.addEventListener("DOMContentLoaded", () => {
    getCatFood();
    handleItemClick();
});

const displayMenu = (food : FoodInterface[]) => {
    container.innerHTML = food
        .map((item : FoodInterface) => {
            return (
                `<div class="items">
               <div class="img-continer">
                 <img src=${item.img} alt="dishes"/>
               </div> 
            <div class="t-n-p">
               <div class="details">
                 <span class="title">${item.name}</span>
                 <span class="price">$${item.price}</span> 
                </div>

                <div class="des">
                  ${item.des}
                </div>

                <div class="category">
                  ${item.category}
                </div>
            </div>
        </div>`)
        }).join("")
}
food
    .reduce(
        (values, items) => {
            if (!values.includes(items.category)) {
                values.push(items.category);
            }
            return values;
        },
        ["ALL"],
    );
function filterMenu(category : string) {
    let filter1 = food.filter(item => item.category === category)
    displayMenu(category === "ALL" ? food : filter1);
}

