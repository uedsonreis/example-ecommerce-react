import React, { Component, ReactNode } from 'react';
import { Right, Body, Text, List, ListItem, Content } from 'native-base';

import api, { Authorization } from '../../utils/connection.api';
import userSession from '../../storage/user.session';
import HTTP from '../../utils/http.codes';

import { MenuIcon } from '../../components/sidemenu/menu.icon';
import { SalesOrder } from '../../model/sales.order';
import screen from './sales.order.list';

type State = { salesOrders: SalesOrder[] };

export class SalesOrderListScreen extends Component<any, State> {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text>Meus Pedidos</Text>,
            headerLeft: () => (
                <MenuIcon navigation={navigation} />
            ),
        };
    };

    constructor(props: any) {
        super(props);
        this.state = { salesOrders: undefined };
        this.updateList();
    }

    private updateList(): void {
        userSession.getToken().then((token: string) => {
            api.setHeader(Authorization, "Bearer "+ token);

            api.get('sales/order/list').then((result: any) => {
                if (result.status === HTTP.BAD_REQUEST) {
                    alert("You must login as a Customer to do the purchasing!");
                    this.props.navigation.navigate('Login');
                } else if (result.status === HTTP.FORBIDDEN) {
                    alert("Validation failure, You are not logged!");
                    this.props.navigation.navigate('Login');
                } else if (result.status === HTTP.OK) {
                    this.setState({ salesOrders: result.data });
                    console.log("The sales orders are here: "+ result.data);
                } else {
                    alert("Erro ao buscar os pedidos: "+JSON.stringify(result.data));
                }
            });
        });
    }

    public formatDate(dateText: string): string {
        const day: string = dateText.substring(8, 10);
        const month: string = dateText.substring(5, 7);
        const year: string = dateText.substring(0, 4);
        const hours: string = dateText.substring(11, 16);
        
        return day +"/"+ month +"/"+ year +" às "+ hours + "h";
    }

    public render(): ReactNode {
        return screen.render(this);
    }
}