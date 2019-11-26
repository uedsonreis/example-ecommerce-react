import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import { CartScreen } from './cart';
import { InvoiceScreen } from './invoice';

import { TabBarIcon } from '../../components/tab-bar-icon';
import { Factory } from '../../utils/factory';

class SalesOrderFactory extends Factory {

    public createStack(): any {

        const stack: any = createStackNavigator(
            {
                Cart: CartScreen,
                Invoice: InvoiceScreen
            },
            this.config
        );

        stack.navigationOptions = {
            tabBarLabel: 'Carrinho',
            tabBarIcon: ({ focused }) => {
                const name: string = Platform.OS === 'ios' ? 'ios-cart' : 'md-cart';
                return <TabBarIcon name={name} focused={focused} />;
            },
        };

        stack.path = "";

        return stack;
    }
}

const factory: SalesOrderFactory = new SalesOrderFactory();
export default factory.createStack();