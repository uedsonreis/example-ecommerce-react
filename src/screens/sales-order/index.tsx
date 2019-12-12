import React, { Component, ReactNode } from 'react';
import { Text } from 'native-base';

import { SalesOrder } from '../../model/sales.order';
import screen from './sales.order';

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
        return screen.render(this);
    }
}