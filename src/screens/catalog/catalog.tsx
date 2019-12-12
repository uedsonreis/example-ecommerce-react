import React, { Component, ReactNode } from 'react';
import { Right, Body, Text, List, ListItem, Content } from 'native-base';

import { Product } from '../../model/product';

type Props = { products: Product[], actions: any };

export class CatalogScreenView extends Component<Props, any> {

    public render(): ReactNode {
        const { products, actions } = this.props;

        return (
            <Content>
                <List dataArray={products} renderRow={(product: Product) => 
                    <ListItem noIndent onPress={() => actions.props.navigation.navigate('Pickup', product) }>
                        <Body>
                            <Text>{product.name}</Text>
                            <Text note>{product.factory.name}</Text>
                        </Body>
                        <Right>
                            <Text note>R$ {product.price.toFixed(2)}</Text>
                        </Right>
                    </ListItem>
                } />
            </Content>
        );
    }
}