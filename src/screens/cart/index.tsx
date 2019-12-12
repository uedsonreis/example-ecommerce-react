import React, { Component, ReactNode } from 'react';
import { Text } from 'native-base';

import { MenuIcon } from '../../components/sidemenu/menu.icon';
import api, { Authorization } from '../../utils/connection.api';
import HTTP from '../../utils/http.codes';
import { Item } from '../../model/item';
import cartStorage from '../../storage/cart.storage';
import userSession from '../../storage/user.session';
import screenView from './cart';

type State = { items: Item[], total: number }

export class CartScreen extends Component<any, State> {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text>Carrinho de Compras</Text>,
            headerLeft: () => (
                <MenuIcon navigation={navigation} />
            )
        };
    };

    private focusListener: any;

    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            total: 0.0
        };
    }

    private updateItems(): void {
        cartStorage.get().then((items: Item[]) => {
            this.setState({ items: items });

            let total: number = 0.0;

            items.forEach((item: Item) => {
                total += item.price * item.amount;
            });

            this.setState({ total: total });
        });
    }

    componentDidMount(): void {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.updateItems();
        });
    }

    componentWillUnmount(): void {
        this.focusListener.remove();
    }

    public remove(item: Item): void {
        cartStorage.remove(item).then(() => {
            this.updateItems();
        });
    }

    public invoice(): void {
        userSession.getToken().then((token: string) => {
            api.setHeader(Authorization, "Bearer "+ token);

            api.post('sales/order/invoice', this.state.items).then((result: any) => {
                if (result.status === HTTP.BAD_REQUEST) {
                    alert("Você precisa logar como Cliente para fechar o pedido!");
                    this.props.navigation.navigate('Login');
                } else if (result.status === HTTP.FORBIDDEN) {
                    alert("Você precisa logar para fechar o pedido!");
                    this.props.navigation.navigate('Login');
                } else if (result.status === HTTP.OK) {
                    cartStorage.clear();
                    this.props.navigation.navigate('SalesOrder');
                } else {
                    alert("Erro ao buscar os pedidos: "+JSON.stringify(result.data));
                }
            });
        });
    }

    public render(): ReactNode {
        return screenView.render(this);
    }
}