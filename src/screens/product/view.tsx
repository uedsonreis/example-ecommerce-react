import React, { Component, ReactNode } from 'react';
import { Text, Content, Label, ListItem, Button, List } from 'native-base';

import styles from './styles';

import { Product } from '../../model/product';

type Props = { product: Product, actions: any };

export class ProductScreenView extends Component<Props, any> {

    public render(): ReactNode {
        const { product, actions } = this.props;

        return (
            <Content>

                <List>
                    <ListItem>
                        <Label><Text> Fabricado por {product.factory.name}. </Text></Label>
                    </ListItem>
                    <ListItem>
                        <Label><Text> Temos {product.amount} unidades em estoque. </Text></Label>
                    </ListItem>
                    <ListItem last>
                        <Label><Text> Valor unitário: R$ {product.price.toFixed(2)} </Text></Label>
                    </ListItem>
                </List>

                <Button onPress={() => actions.addToCart()} style={styles.addButton} block>
                    <Text>Add 1 unidade no Carrinho</Text>
                </Button>
            
            </Content>
        );
    }
}