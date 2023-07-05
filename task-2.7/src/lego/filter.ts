import {ProductList} from "./product";
import {ProductInterface} from "../inter/interfaces";
import {Cart} from "./cart";

export class Filter {
    private productList: ProductList;
    private products: ProductInterface[];
    private searchWord: string;
    private company: string;
    private priceRange: number;


    constructor(productList: ProductList) {
        this.productList = productList;

        this.products = [];
        this.searchWord = "";
        this.company = "";
        this.priceRange = 100;
        this.initFilter();
    }

    private setSearchWord(word: string): void {
        this.searchWord = word.trim().toLowerCase();
    }

    private setCompany(company: string): void {
        this.company = company;
    }

    private setPriceRange(price: number): void {
        this.priceRange = price;
    }

    public filterProducts(): ProductInterface[] {
        return this.products.filter((product) => {
            return (
                product.title.indexOf(this.searchWord) !== -1 && (this.company ? product.company === this.company : true) && product.price <= this.priceRange
            );
        });
    }

    public getFilteredProducts(): ProductInterface[] {
        return this.filterProducts();
    }

    public filterRenderProducts(filteredProducts: ProductInterface[]): void {
        this.productList.renderList(filteredProducts); ///////////се переробила забрала
    }

    public upgradeProducts(): void {
        if (this.products) {
            const filteredProducts = this.getFilteredProducts();
            this.filterRenderProducts(filteredProducts);
        }
    }

    public filterByColorWine(color: string): void {
        this.setCompany(color);
        this.upgradeProducts();
    }

    public filterByPriceWine(price: number): void {
        this.setPriceRange(price);
        this.upgradeProducts();
    }

    public filterBySearchWine(searchWord: string): void {
        this.setSearchWord(searchWord);
        this.upgradeProducts();
    }

    public resetFiltersWine(): void {
        const slider = document.querySelector(".slider") as HTMLInputElement;
        if (slider) {
            slider.value = "100";
        }
        this.setSearchWord("");
        this.setCompany("");
        this.setPriceRange(100);
        this.upgradeProducts();
        const rangeLabel = document.getElementById("range-label");
        if (rangeLabel) {
            rangeLabel.innerText = "100$";
        }
    }

    public addEventListeners(): void {
        const redButton = document.getElementById("red");
        const whiteButton = document.getElementById("white");
        const roseButton = document.getElementById("rose");
        const sparklingButton = document.getElementById("sparkling");
        const allButton = document.getElementById("all");
        const searchInput = document.querySelector(".search-txt") as HTMLInputElement;
        const slider = document.querySelector(".slider") as HTMLInputElement;
        const reset = document.querySelector("#reset");

        redButton?.addEventListener("click", (): void => {
            this.filterByColorWine('red');
        });

        whiteButton?.addEventListener("click", (): void => {
            this.filterByColorWine('white');
        });

        roseButton?.addEventListener("click", (): void => {
            this.filterByColorWine('rose');
        });

        sparklingButton?.addEventListener("click", (): void => {
            this.filterByColorWine('sparkling');
        });

        allButton?.addEventListener("click", (): void => {
            this.filterByColorWine('');
        });

        if (searchInput) {
            searchInput.addEventListener("keyup", (e: KeyboardEvent): void => {
                const searchWord = (e.target as HTMLInputElement).value;
                this.filterBySearchWine(searchWord);
            });
        }

        if (slider) {
            const rangeLabel = document.getElementById("range-label");
            if (rangeLabel) {
                slider.addEventListener("input", (e: Event): void => {
                    const price = parseInt((e.target as HTMLInputElement).value);
                    rangeLabel.innerText = price + "$";
                    this.filterByPriceWine(price);
                });
            }
        }

        reset?.addEventListener("click", (): void => {
            this.setSearchWord('');
            this.setCompany('');
            this.setPriceRange(100);
            this.resetFiltersWine();
        });
    }

    private async initFilter(): Promise<void> {
        const products: ProductInterface[] = await this.productList.getProducts();
        this.products = products;
        this.addEventListeners();
    }
}

