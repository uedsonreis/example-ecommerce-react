import React, { Component, ReactNode } from 'react';
import { Platform } from 'react-native';
import { Body, Content, List, ListItem, Right, Text, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { MenuIcon } from '../../components/sidemenu/menu.icon';
import api, { Authorization } from '../../utils/connection.api';
import HTTP from '../../utils/http.codes';
import { Item } from '../../model/item';
import cart from '../../storage/cart';
import styles from './styles';
import userSession from '../../storage/user.session';

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
        cart.get().then((items: Item[]) => {
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

    private remove(item: Item): void {
        cart.remove(item).then(() => {
            this.updateItems();
        });
    }

    private invoice(): void {
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
                    cart.clear();
                    this.props.navigation.navigate('SalesOrder');
                } else {
                    alert("Erro ao buscar os pedidos: "+JSON.stringify(result.data));
                }
            });
        });
    }

    public render(): ReactNode {
        return (
            <Content>
                <List dataArray={this.state.items} renderRow={(item: Item) => 
                    <ListItem>
                        <Body>
                            <Text>{item.product.factory.name} {item.product.name}</Text>
                            <Text note>{item.price.toFixed(2)} * {item.amount} un = R$ {(item.price * item.amount).toFixed(2)}</Text>
                        </Body>
                        <Right>
                            <Button onPress={() => this.remove(item)} style={styles.trashButton} bordered danger>
                                <Text>
                                    <Ionicons name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash' } size={24} />
                                </Text>
                            </Button>
                        </Right>
                    </ListItem>
                } />
                <ListItem last>
                    <Text>Total do Pedido: R$ {this.state.total.toFixed(2)}</Text>
                </ListItem>

                <Button disabled={this.state.items.length<=0} onPress={() => this.invoice()} style={styles.invoiceButton} block>
                    <Text>Fechar o Pedido</Text>
                </Button>

            </Content>
        );
    }
}