import React, { Component, ReactNode } from 'react';

import api from '../../utils/connection.api';
import HTTP from '../../utils/http.codes';
import { Item } from '../../model/item';
import cartStorage from '../../storage/cart.storage';
import userSession from '../../storage/user.session';
import { CartView } from './view';

type State = { items: Item[], total: number }

export class CartScreen extends Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            total: 0.0
        };

        cartStorage.addObserver(() => {
            this.updateItems();
        });
    }

    private async updateItems(): Promise<void> {
        const items: Item[] = cartStorage.items;
        this.setState({ items: items });

        let total: number = 0.0;

        items.forEach((item: Item) => {
            total += item.price! * item.amount!;
        });

        this.setState({ total: total });
    }

    componentDidMount(): void {
        this.updateItems();
    }

    public remove(item: Item): void {
        cartStorage.remove(item).then(() => {
            this.updateItems();
        });
    }

    public invoice(): void {
        const items = this.state.items.map(item => ({ ...item, productId: item.product!.id }));

        userSession.getToken().then((token: string) => {
            api.invoice(items, token).then((result: any) => {
                if (result.status === HTTP.BAD_REQUEST) {
                    alert("Você precisa logar como Cliente para fechar o pedido!");
                    this.props.navigation.navigate('login');
                } else if (result.status === HTTP.FORBIDDEN) {
                    alert("Você precisa logar para fechar o pedido!");
                    this.props.navigation.navigate('login');
                } else if (result.status === HTTP.OK || result.status === HTTP.CREATED) {
                    cartStorage.clear();
                    this.props.navigation.navigate('salesOrder');
                } else {
                    alert("Erro ao buscar os pedidos: "+JSON.stringify(result.data));
                }
            });
        });
    }

    public render(): ReactNode {
        return (
            <CartView items={this.state.items} total={this.state.total} actions={this} />
        );
    }
}