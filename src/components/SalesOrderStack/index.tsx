import React, { ReactNode, Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SalesOrderScreen } from '../../screens/sales-order';
import { SalesOrderHeader } from '../../screens/sales-order/view';
import { SalesOrderListScreen } from '../../screens/sales-order-list';
import { SalesOrderListHeader } from '../../screens/sales-order-list/view';

export default class SalesOrderStack extends Component<any, any> {

    render(): ReactNode {
        const StackNavigator = createStackNavigator();
        
        return (
            <StackNavigator.Navigator headerMode="screen">
                <StackNavigator.Screen name={'list'} component={SalesOrderListScreen} options={{
                    header: SalesOrderListHeader
                }} />
                <StackNavigator.Screen name={'order'} component={SalesOrderScreen} options={{
                    header: SalesOrderHeader
                }} />
            </StackNavigator.Navigator>
        );
    }

}