import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { CatalogScreen } from '../../screens/catalog';
import { CartScreen } from '../../screens/cart';
import { Platform } from 'react-native';
import { TabBarIcon } from '../tab-bar-icon';
import { ProductScreen } from '../../screens/product';

class TabNavigatorFactory {

    private readonly config: any = Platform.select({
        web: { headerMode: 'screen' },
        default: {},
    });

    private createCatalogStack(): any {
        const stack: any = createStackNavigator(
            { Catalog: CatalogScreen, Pickup: ProductScreen },
            this.config
        );

        stack.navigationOptions = {
            tabBarLabel: 'Catálogo',
            tabBarIcon: ({ focused }) => {
                const name: string = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
                return <TabBarIcon name={name} focused={focused} />;
            },
        };

        stack.path = "";
        return stack;
    }

    private createCartStack(): any {
        const stack: any = createStackNavigator({ Cart: CartScreen }, this.config);

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

    public createTabNavigator(): any {
        const tabNavigator: any = createBottomTabNavigator({
            catalogStack: this.createCatalogStack(),
            cartStack: this.createCartStack()
        });

        tabNavigator.path = "";
        return tabNavigator;
    }
}

const factory: TabNavigatorFactory = new TabNavigatorFactory();
export default factory.createTabNavigator();