import { Item } from '../model/item';
import { Product } from '../model/product';

import storage from './local.storage';

class CartStorage {

    private static readonly LOCAL_VAR: string = "CART";

    public async get(): Promise<Item[]> {
        const value: any = await storage.getItem(CartStorage.LOCAL_VAR);
        if (value !== undefined && value !== null) {
            return JSON.parse(value) as Array<Item>;
        } else {
            return new Array<Item>();
        }
    }

    public async add(item: Item): Promise<void> {
        const items: Item[] = await this.get();

        const itemSaved: Item = this.getItem(items, item.product);
        if (itemSaved) this.removeItem(items, itemSaved);
        
        if (itemSaved !== undefined && itemSaved !== null) {
            itemSaved.amount = itemSaved.amount + item.amount;
            items.push(itemSaved);
        } else {
            items.push(item);
        }    
        storage.setItem(CartStorage.LOCAL_VAR, JSON.stringify(items));
    }

    public async remove(item: Item): Promise<void> {
        const items: Item[] = await this.get();
        const itemSaved: Item = this.getItem(items, item.product);
        this.removeItem(items, itemSaved);
        await storage.setItem(CartStorage.LOCAL_VAR, JSON.stringify(items));
    }

    public async clear(): Promise<void> {
        await storage.removeItem(CartStorage.LOCAL_VAR);
    }

    private getItem(items: Item[], product: Product): Item {
        return items.find((item: Item) => item.product.id === product.id);
    }

    private removeItem(items: Item[], item: Item): void {
        items.splice(items.indexOf(item), 1);
    }

}

export default new CartStorage();