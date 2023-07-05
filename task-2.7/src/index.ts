import './styles.css'
import {productDOM, ProductList} from "./lego/product";
import {Filter} from "./lego/filter";
import {Cart} from "./lego/cart";


class MainController {
    private readonly productList: ProductList;
    private filter: Filter;
    private readonly productDOM: Element;


    constructor(productDOM: Element, cart: Cart) {
        this.productDOM = document.querySelector(".products-container")!;
        this.productList = new ProductList(this.productDOM, cart);
        this.filter = new Filter(this.productList);

        this.updateView();
    }

    private updateView = async (): Promise<void> => {
        await this.productList.fetchProducts();
        const filteredProducts = this.filter.getFilteredProducts();
        this.filter.filterRenderProducts(filteredProducts);
    }
}

const cart = new Cart();
const mainController = new MainController(productDOM, cart);

