export interface ProductInterface{
    id: number;
    image: string;
    title: string;
    company: string;
    price: number;
}

export interface CartItemsInterface{
    id: number;
    product: ProductInterface;
    quantity: number;
}

export class CartItemsClass implements CartItemsInterface{
    constructor(
        public id: number,
        public product: ProductInterface,
        public quantity: number
    ) {
    }
}








/*
export interface ItemsInterface{
    id: number;
    image: string;
    title: string;
    company: string;
    price: number;
    amount: number;
    quantity: number;

/!*    getId(): number;*!/
}

export class  ItemsClass implements  ItemsInterface {
 /!*   private readonly id: number*!/

    constructor(
        public id: number,
        public image: string,
        public title: string,
        public company: string,
        public price: number,
        public amount: number,
        public quantity: number
    ) {

      /!*  this.id = id;*!/
        /!* this.id = new Date().toISOString();*!/
    }


    /!*public getId(): number {
        return this.id;
    }*!/
}*/

