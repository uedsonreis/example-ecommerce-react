import React, { Component, ReactNode } from 'react';

import api from '../../utils/connection.api';
import { Product } from '../../model/product';
import { CatalogView } from './view';

type State = { products: Product[] };

export class CatalogScreen extends Component<any, State> {

    constructor(props: any) {
        super(props);

        this.state = { products: [] };

        this.updateProductList();
    }

    private updateProductList(): void {
        api.get('product/list').then((result: any) => {
            this.setState({ products: result.data });
            console.log("Products: ", this.state.products);
        });
    }

    public render(): ReactNode {
        return (
            <CatalogView products={this.state.products} actions={this} />
        );
    }
}