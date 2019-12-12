import React, { Component, ReactNode } from 'react';
import { Text } from 'native-base';

import cartStorage from '../../storage/cart.storage';
import { Product } from '../../model/product';
import { Item } from '../../model/item';
import { ProductScreenView } from './view';

type State = { product: Product };

export class ProductScreen extends Component<any, State> {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text>{navigation.state.params.name}</Text>,
        };
    };

    constructor(props: any) {
        super(props);

        this.state = {
            product: this.props.navigation.state.params
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
            <ProductScreenView product={this.state.product} actions={this} />
        );
    }
}