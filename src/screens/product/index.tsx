import React, { Component, ReactNode } from 'react';

import cartStorage from '../../storage/cart.storage';
import { Product } from '../../model/product';
import { Item } from '../../model/item';
import { ProductView } from './view';

type State = { product: Product };

export class ProductScreen extends Component<any, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            product: this.props.route.params
        };
    }

    public addToCart(): void {
        const item: Item = {
            amount: 1,
            product: this.state.product,
            price: this.state.product.price,
        };

        cartStorage.add(item);
        this.props.navigation.pop();
    }

    public render(): ReactNode {
        return (
            <ProductView product={this.state.product} actions={this} />
        );
    }
}