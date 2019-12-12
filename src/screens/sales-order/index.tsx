import React, { Component, ReactNode } from 'react';
import { Text } from 'native-base';

import { SalesOrder } from '../../model/sales.order';
import { SalesOrderScreenView } from './sales.order';
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

        return <SalesOrderScreenView salesOrder={this.state.salesOrder} total={total} />
    }
}