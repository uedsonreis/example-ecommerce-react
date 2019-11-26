import React, { Component, ReactNode } from 'react';
import { Body, Content, Left, List, ListItem, Right, Text, Button } from 'native-base';

import cart from '../../model/cart';
import { Item } from '../../model/item';

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
                            <Button onPress={() => this.remove(item)} style={{ borderColor: 'white' }} bordered danger>
                                <Text>Remover</Text>
                            </Button>
                        </Right>
                    </ListItem>
                } />
            </Content>
        );
    }
}