import React, { Component, ReactNode } from 'react';
import { Text, Content, Label, ListItem, Button, List, Header, Left, Body, Right, Title } from 'native-base';

import styles from './styles';

import { Product } from '../../model/product';
import { StackHeaderProps, HeaderBackButton } from '@react-navigation/stack';
import { MenuIcon } from '../../components/SideMenu/menu.icon';
import { BackHandler } from 'react-native';

export function ProductHeader(props: StackHeaderProps) {
    const product: any = props.scene.route.params;
    return (
        <Header>
            <Left>
                <HeaderBackButton label="Catálogo" onPress={() => props.navigation.goBack()} />
            </Left>
            <Body>
                <Text>{product.name}</Text>
            </Body>
            <Right />
        </Header>
    )
}

type Props = { product: Product, actions: any };

export class ProductView extends Component<Props, any> {

    public render(): ReactNode {
        const { product, actions } = this.props;

        return (
            <Content>

                <List>
                    <ListItem>
                        <Label><Text> Fabricado por {product.factory!.name}. </Text></Label>
                    </ListItem>
                    <ListItem>
                        <Label><Text> Temos {product.amount} unidades em estoque. </Text></Label>
                    </ListItem>
                    <ListItem last>
                        <Label><Text> Valor unitário: R$ {product.price!.toFixed(2)} </Text></Label>
                    </ListItem>
                </List>

                <Button onPress={() => actions.addToCart()} style={styles.addButton} block>
                    <Text>Add 1 unidade no Carrinho</Text>
                </Button>
            
            </Content>
        );
    }
}