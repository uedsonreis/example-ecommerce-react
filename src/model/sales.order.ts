import { Customer } from "./customer";
import { Item } from "native-base";

export class SalesOrder {

    public id?: number;
    public totalValue?: number;
    public createdAt?: Date;

    public customer?: Customer;
    public items?: Item[];
}