import React, { ReactNode } from 'react';
import { Right, Body, Text, List, ListItem, Content } from 'native-base';

import { SalesOrder } from '../../model/sales.order';
import { ScreenView } from '../../utils/screen.view';
import { SalesOrderListScreen } from '.';

class Screen implements ScreenView {

    public render(pageCtrl: SalesOrderListScreen): ReactNode {
        return (
            <Content>
                <List dataArray={pageCtrl.state.salesOrders} renderRow={(salesOrder: SalesOrder) => 
                    <ListItem noIndent onPress={() => pageCtrl.props.navigation.navigate('Order', salesOrder) }>
                        <Body>
                            <Text>{pageCtrl.formatDate(salesOrder.createdAt.toString())}</Text>
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

export default new Screen();