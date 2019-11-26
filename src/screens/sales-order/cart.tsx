import React, { Component, ReactNode } from 'react';
import { Body, Content, List, ListItem, Right, Text, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { MenuIcon } from '../../components/sidemenu/menu.icon';
import api from '../../utils/connection.api';
import cart from '../../storage/cart';
import { Item } from '../../model/item';
import { Platform } from 'react-native';
import styles from './styles';

type State = { items: Item[] }

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
        this.state = { items: cart.get() };
    }

    private updateItems(): void {
        this.setState({ items: cart.get() });
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
        cart.remove(item);
        this.updateItems();
    }

    private invoice(): void {
        api.post('sales/order/invoice', this.state.items).then((result: any) => {
            alert(JSON.stringify(result));
        });
    }

    public render(): ReactNode {
        let total: number = 0.0;

        this.state.items.forEach((item: Item) => {
            total += item.price * item.amount;
        });

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
                    <Text>Total do Pedido: R$ {total.toFixed(2)}</Text>
                </ListItem>

                <Button onPress={() => this.invoice()} style={styles.invoiceButton} block>
                    <Text>Fechar o Pedido</Text>
                </Button>

            </Content>
        );
    }
}