import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import { TabBarIcon } from '../../components/tab-bar-icon';
import { Factory } from '../../utils/factory';

import { CartScreen } from './cart';

class CartFactory extends Factory {

    public createStack(): any {

        const stack: any = createStackNavigator(
            {
                Cart: CartScreen
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

const factory: CartFactory = new CartFactory();
export default factory.createStack();