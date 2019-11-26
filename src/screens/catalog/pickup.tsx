import React, { Component, ReactNode } from 'react';
import { Text, Content, Label, ListItem, Button, List, Form, Card } from 'native-base';

import cart from '../../storage/cart';
import { Product } from '../../model/product';
import { Item } from '../../model/item';
import styles from './styles';

type State = { product: Product };

export class PickupScreen extends Component<any, State> {

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

    private addToCart(): void {
        const item: Item = {
            amount: 1,
            product: this.state.product,
            price: this.state.product.price,
        };

        cart.add(item);
        this.props.navigation.pop();
    }

    public render(): ReactNode {
        return (
            <Content>

                <List>
                    <ListItem>
                        <Label><Text> Fabricado por {this.state.product.factory.name}. </Text></Label>
                    </ListItem>
                    <ListItem>
                        <Label><Text> Temos {this.state.product.amount} unidades em estoque. </Text></Label>
                    </ListItem>
                    <ListItem last>
                        <Label><Text> Valor unitário: R$ {this.state.product.price.toFixed(2)} </Text></Label>
                    </ListItem>
                </List>

                <Button onPress={() => this.addToCart()} style={styles.addButton} block>
                    <Text>Add 1 unidade no Carrinho</Text>
                </Button>
            
            </Content>
        );
    }
}