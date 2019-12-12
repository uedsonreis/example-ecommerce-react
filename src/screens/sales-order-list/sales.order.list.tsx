import React, { ReactNode, Component } from 'react';
import { Right, Body, Text, List, ListItem, Content } from 'native-base';

import { SalesOrder } from '../../model/sales.order';

type Props = { salesOrders: SalesOrder[], actions: any };

export class SalesOrderListScreenView extends Component<Props, any> {

    public render(): ReactNode {
        const { salesOrders, actions } = this.props;

        return (
            <Content>
                <List dataArray={salesOrders} renderRow={(salesOrder: SalesOrder) => 
                    <ListItem noIndent onPress={() => actions.props.navigation.navigate('Order', salesOrder) }>
                        <Body>
                            <Text>{actions.formatDate(salesOrder.createdAt.toString())}</Text>
                            <Text note>Pedido nº {salesOrder.id}</Text>
                        </Body>
                        <Right>
                            <Text note>R$ {salesOrder.totalValue.toFixed(2)}</Text>
                        </Right>
                    </ListItem>
                } />
            </Content>
        );
    }
}