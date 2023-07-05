import {NameInterface} from './inter/interfaces';

let filter = document.querySelector('.filter-box') as HTMLInputElement;
let search = document.querySelector('.search-txt');
let cardsContainer = document.querySelector('.cards-container');
let resdata = [];
const url = 'https://restcountries.com/v2/';
let dark = (localStorage.getItem('dark') == null) ? "off" : localStorage.getItem('dark');

let data = async (restUrl: string): Promise<NameInterface> => {
    let answer = await fetch(`${url}${restUrl}`)
    try {
        resdata = await answer.json();
        return resdata[''];
    } catch (error) {
        console.log('error:' + error)
    }
};

window.onload = async (): Promise<void> => {
    if (dark === "on") {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryDarkBlue)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--DarkBlue)');
        document.documentElement.style.setProperty('--text-clr', 'var(--White)');
    } else {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryLightGray)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--White)');
        document.documentElement.style.setProperty('--text-clr', 'var(--VeryDarkBlueT)');
    }
    await data(filter.value).then(() => updateUi(resdata))
}

let updateUi = (data: NameInterface[]): void => {
    let reducedData = (data.length > 100) ? data.slice(0, 100) : data;
    let cards = []
    for (let item of reducedData) {
        let card = `<div class="card" data-country="${item.name}">
       <img src="${item.flags.png}" class="card-img-top" alt="${item.name}">
       <div class="card-body">
         <h5 class="card-title">${item.name}</h5>
         <div><span>Population:</span> <span>${item.population}</span></div>
         <div><span>Region:</span><span>${item.region}</span></div>
         <div><span>Capital:</span><span>${item.capital}</span></div>
       </div>
     </div>`
        cards.push(card)
    }
    cardsContainer.innerHTML = cards.join('')
}

const resetSearch = (): void => {
    const elem = (document.querySelector('.search-txt') as HTMLInputElement)
    elem.value = '';
}

filter.addEventListener('change', async (event): Promise<void> => {
    let value = (event.target as HTMLTextAreaElement).value;
    await data(value).then(() => updateUi(resdata));
    resetSearch();
});

const resetFilter = (): void => {
    const elem = (document.querySelector('.filter-box') as HTMLInputElement)
    elem.value = 'all';
}

search.addEventListener('keyup', async (): Promise<void> => {
    let resturl = `name/${(search as HTMLTextAreaElement).value}`
    await data(resturl).then(() => updateUi(resdata));
    resetFilter();
})

function darkMoodFn(): void {
    dark = (localStorage.getItem('dark') == null) ? "off" : localStorage.getItem('dark')
    if (dark === "off") {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryDarkBlue)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--DarkBlue)');
        document.documentElement.style.setProperty('--text-clr', 'var(--White)');
        localStorage.setItem('dark', "on")

    } else {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryLightGray)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--White)');
        document.documentElement.style.setProperty('--text-clr', 'var(--VeryDarkBlueT)');
        localStorage.setItem('dark', "off")
    }
}

document.querySelector('.dark-mood').addEventListener('click', () => darkMoodFn())


