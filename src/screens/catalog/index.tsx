import React, { Component, ReactNode } from 'react';
import { Right, Body, Text, List, ListItem, Content } from 'native-base';

import api from '../../utils/connection.api';
import { Product } from '../../model/product';
import { MenuIcon } from '../../components/sidemenu/menu.icon';

type State = { products: Product[] };

export class CatalogScreen extends Component<any, State> {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text>Catálogo</Text>,
            headerLeft: () => (
                <MenuIcon navigation={navigation} />
            ),
        };
    };

    constructor(props: any) {
        super(props);

        this.state = { products: undefined };

        this.updateProductList();
    }

    private updateProductList(): void {
        api.get('product/list').then((result: any) => {
            this.setState({ products: result.data });
            console.log("Products: ", this.state.products);
        });
    }

    public render(): ReactNode {
        return (
            <Content>
                <List dataArray={this.state.products} renderRow={(product: Product) => 
                    <ListItem noIndent onPress={() => this.props.navigation.navigate('Pickup', product) }>
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