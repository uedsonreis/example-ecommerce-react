import { Item } from './item';
import { Product } from './product';
import { Platform } from 'react-native';

declare var window;

class Cart {

    private static readonly LOCAL_VAR: string = "CART";

    private storage: any;

    constructor() {
        if (Platform.OS === 'web') {
            this.storage = window.localStorage;
        } else {
            this.storage = require('@react-native-community/async-storage');
        }
    }

    public get(): Item[] {
        const value: any = this.storage.getItem(Cart.LOCAL_VAR);

        if (value === undefined || value === null) {
            return new Array<Item>();
        } else {
            return JSON.parse(value) as Array<Item>;
        }
    }

    private getItem(items: Item[], product: Product): Item {
        return items.find((item: Item) => item.product.id === product.id);
    }

    private removeItem(items: Item[], item: Item): void {
        items.splice(items.indexOf(item), 1);
    }

    public add(item: Item): void {
        const items: Array<Item> = this.get();

        const itemSaved: Item = this.getItem(items, item.product);
        if (itemSaved) this.removeItem(items, itemSaved);

        if (itemSaved !== undefined && itemSaved !== null) {
            itemSaved.amount = itemSaved.amount + item.amount;
            items.push(itemSaved);
        } else {
            items.push(item);
        }

        this.storage.setItem(Cart.LOCAL_VAR, JSON.stringify(items));
    }

    public remove(item: Item): void {
        const items: Item[] = this.get();
        const itemSaved: Item = this.getItem(items, item.product);
        this.removeItem(items, itemSaved);
        this.storage.setItem(Cart.LOCAL_VAR, JSON.stringify(items));
    }

}

export default new Cart();