import React, { ReactNode } from 'react';
import { Body, Content, List, ListItem, Text } from 'native-base';

import { SalesOrder } from '../../model/sales.order';
import { Item } from '../../model/item';
import { SalesOrderScreen } from '.';
import { ScreenView } from '../../utils/screen.view';

type State = { salesOrder: SalesOrder }

class Screen implements ScreenView {

    public render(pageCtrl: SalesOrderScreen): ReactNode {
        let total: number = 0.0;

        if (pageCtrl.state.salesOrder.items) {
            pageCtrl.state.salesOrder.items.forEach((item: Item) => {
                total += item.price * item.amount;
            });
        }

        return (
            <Content>
                <List dataArray={pageCtrl.state.salesOrder.items} renderRow={(item: Item) => 
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

export default new Screen();