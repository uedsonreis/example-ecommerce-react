import React, { ReactNode, Component } from 'react';
import { Body, Content, List, ListItem, Text } from 'native-base';

import { SalesOrder } from '../../model/sales.order';
import { Item } from '../../model/item';

type Props = { salesOrder: SalesOrder, total: number };

export class SalesOrderScreenView extends Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        const { salesOrder, total } = this.props;
        return (
            <Content>
                <List dataArray={salesOrder.items} renderRow={(item: Item) => 
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