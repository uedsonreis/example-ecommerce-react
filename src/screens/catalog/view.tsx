import React, { Component, ReactNode } from 'react';
import { Right, Body, Text, List, ListItem, Content, Header, Left, Title } from 'native-base';

import { Product } from '../../model/product';
import { StackHeaderProps } from '@react-navigation/stack';
import { MenuIcon } from '../../components/SideMenu/menu.icon';

type Props = { products: Product[], actions: any };

export function CatalogHeader(props: StackHeaderProps) {
    return (
        <Header>
            <Left><MenuIcon navigation={props.navigation} /></Left>
            <Body>
                <Text>Catálogo</Text>
            </Body>
            <Right />
        </Header>
    )
}

export class CatalogView extends Component<Props, any> {

    public render(): ReactNode {
        const { products, actions } = this.props;

        return (
            <Content>
                <List dataArray={products} renderRow={(product: Product) =>
                    <ListItem key={product.id} noIndent onPress={() => actions.props.navigation.navigate('pickup', product)}>
                        <Body>
                            <Text>{product.name}</Text>
                            <Text note>{product.factory!.name}</Text>
                        </Body>
                        <Right>
                            <Text note>R$ {product.price!.toFixed(2)}</Text>
                        </Right>
                    </ListItem>
                } />
            </Content>
        );
    }
}