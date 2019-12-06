import React, { Component, ReactNode } from 'react';
import { Body, Content, List, ListItem, Text } from 'native-base';

import { MenuIcon } from '../../components/sidemenu/menu.icon';
import { SalesOrder } from '../../model/sales.order';
import { Item } from '../../model/item';

type State = { salesOrder: SalesOrder }

export class SalesOrderScreen extends Component<any, State> {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text>Pedido Nº {navigation.state.params.id}</Text>
        };
    };

    constructor(props: any) {
        super(props);
        this.state = {
            salesOrder: this.props.navigation.state.params
        };
    }

    public render(): ReactNode {
        let total: number = 0.0;

        if (this.state.salesOrder.items) {
            this.state.salesOrder.items.forEach((item: Item) => {
                total += item.price * item.amount;
            });
        }

        return (
            <Content>
                <List dataArray={this.state.salesOrder.items} renderRow={(item: Item) => 
                    <ListItem>
                        <Body>
                            <Text>{item.product.factory.name} {item.product.name}</Text>
                            <Text note>{item.price.toFixed(2)} * {item.amount} un = R$ {(item.price * item.amount).toFixed(2)}</Text>
                        </Body>
                    </ListItem>
                } />
                <ListItem last>
                    <Text>Total do Pedido: R$ {total.toFixed(2)}</Text>
                </ListItem>

            </Content>
        );
    }
}