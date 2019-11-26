import React, { Component, ReactNode } from 'react';
import { Body, Content, List, ListItem, Right, Text, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import cart from '../../model/cart';
import { Item } from '../../model/item';
import { Platform } from 'react-native';
import styles from './styles';

type State = { items: Item[] }

export class CartScreen extends Component<any, State> {

    static navigationOptions = () => {
        return {
            headerTitle: () => <Text>Carrinho de Compras</Text>,
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
        alert("to do the request to server.");
    }

    public render(): ReactNode {
        return (
            <Content>
                <List dataArray={this.state.items} renderRow={(item: Item) => 
                    <ListItem noIndent onPress={() => this.props.navigation.navigate('Pickup', item) }>
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

                <Button onPress={() => this.invoice()} style={styles.invoiceButton} block>
                    <Text>Fechar o Pedido</Text>
                </Button>

            </Content>
        );
    }
}