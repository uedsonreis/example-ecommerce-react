import { Item } from '../model/item';
import { Product } from '../model/product';

import storage from './local.storage';

class CartStorage {

    private static readonly LOCAL_VAR: string = "CART";

    public readonly items: Item[] = [];

    private readonly observers: Function[] = []

    constructor() {
        storage.getItem(CartStorage.LOCAL_VAR).then((value: any) => {
            if (value !== undefined && value !== null) {
                const items = JSON.parse(value) as Array<Item>;
                items.forEach(item => this.items.push(item));
            }
        });
    }

    public addObserver(observer: Function) {
        this.observers.push(observer);
    }

    public async add(item: Item): Promise<void> {
        const itemSaved: Item = this.getItem(item.product!)!;
        if (itemSaved) await this.removeItem(itemSaved);
        
        if (itemSaved !== undefined && itemSaved !== null) {
            itemSaved.amount = itemSaved.amount! + item.amount!;
            this.items.push(itemSaved);
        } else {
            this.items.push(item);
        }

        this.observers.forEach(observer => observer());
        await this.commit();
    }

    private getItem(product: Product): Item | undefined {
        return this.items.find((item: Item) => item.product!.id === product.id);
    }

    public async remove(item: Item): Promise<void> {
        const itemSaved: Item = this.getItem(item.product!)!;
        await this.removeItem(itemSaved);
    }

    public async clear(): Promise<void> {
        this.items.forEach(item => this.removeItem(item));
        await storage.removeItem(CartStorage.LOCAL_VAR);
    }

    private async removeItem(item: Item): Promise<void> {
        this.items.splice(this.items.indexOf(item), 1);
        await this.commit();
    }

    private async commit(): Promise<void> {
        await storage.setItem(CartStorage.LOCAL_VAR, JSON.stringify(this.items));
    }

}

export default new CartStorage();