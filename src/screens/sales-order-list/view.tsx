import React, { ReactNode, Component } from 'react';
import { Right, Body, Text, List, ListItem, Content, Header, Left } from 'native-base';

import { SalesOrder } from '../../model/sales.order';
import { StackHeaderProps } from '@react-navigation/stack';
import { MenuIcon } from '../../components/SideMenu/menu.icon';

type Props = { salesOrders: SalesOrder[], actions: any };

export function SalesOrderListHeader(props: StackHeaderProps) {
    return (
        <Header>
            <Left>
                <MenuIcon navigation={props.navigation} />
            </Left>
            <Body>
                <Text>Meus Pedidos</Text>
            </Body>
            <Right />
        </Header>
    )
}

export class SalesOrderListView extends Component<Props, any> {

    public render(): ReactNode {
        const { salesOrders, actions } = this.props;

        return (
            <Content>
                <List dataArray={salesOrders} renderRow={(salesOrder: SalesOrder) => 
                    <ListItem noIndent key={salesOrder.id}
                        onPress={() => actions.props.navigation.navigate('order', salesOrder) }>
                        <Body>
                            <Text>{actions.formatDate(salesOrder.createdAt!.toString())}</Text>
                            <Text note>Pedido nº {salesOrder.id}</Text>
                        </Body>
                        <Right>
                            <Text note>R$ {salesOrder.totalValue!.toFixed(2)}</Text>
                        </Right>
                    </ListItem>
                } />
            </Content>
        );
    }
}