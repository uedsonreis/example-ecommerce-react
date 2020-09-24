import React, { Component, ReactNode } from 'react';

import api from '../../utils/connection.api';
import userSession from '../../storage/user.session';
import HTTP from '../../utils/http.codes';

import { SalesOrder } from '../../model/sales.order';
import { SalesOrderListView } from './view';

type State = { salesOrders: SalesOrder[] };

export class SalesOrderListScreen extends Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = { salesOrders: [] };
        this.updateList();
    }

    private updateList(): void {
        userSession.getToken().then((token: string) => {
            api.getSalesOrderList(token).then((result: any) => {
                if (result.status === HTTP.BAD_REQUEST) {
                    alert("You must login as a Customer to do the purchasing!");
                    this.props.navigation.navigate('Login');
                } else if (result.status === HTTP.FORBIDDEN) {
                    alert("Validation failure, You are not logged!");
                    this.props.navigation.navigate('Login');
                } else if (result.status === HTTP.OK || result.status === HTTP.CREATED) {
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
        return (
            <SalesOrderListView salesOrders={this.state.salesOrders} actions={this} />
        );
    }
}