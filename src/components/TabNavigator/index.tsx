import React, { ReactNode, Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CatalogScreen } from '../../screens/catalog';
import { CatalogHeader } from '../../screens/catalog/view';
import { CartScreen } from '../../screens/cart';
import { Platform } from 'react-native';
import { TabBarIcon } from '../tab-bar-icon';
import { ProductScreen } from '../../screens/product';
import { ProductHeader } from '../../screens/product/view';
import { CartHeader } from '../../screens/cart/view';

class CatalogStack extends Component<any, any> {
    render(): ReactNode {
        const StackNavigator = createStackNavigator();
        return (
            <StackNavigator.Navigator headerMode="screen">
                <StackNavigator.Screen name={'catalog'} component={CatalogScreen} options={{
                    header: CatalogHeader
                }} />
                <StackNavigator.Screen name={'pickup'} component={ProductScreen} options={{
                    header: ProductHeader
                }} />
            </StackNavigator.Navigator>
        );
    }
}

class CartStack extends Component<any, any> {
    render(): ReactNode {
        const StackNavigator = createStackNavigator();
        return (
            <StackNavigator.Navigator headerMode="screen">
                <StackNavigator.Screen name={'cart'} component={CartScreen} options={{
                    header: CartHeader
                }} />
            </StackNavigator.Navigator>
        );
    }
}

export default class TabNavigator extends Component<any, any> {

    private readonly config: any = Platform.select({
        web: { headerMode: 'screen' },
        default: {},
    });

    public render(): ReactNode {
        const Tab = createBottomTabNavigator();

        return (
            <Tab.Navigator>
                <Tab.Screen name="Catálogo" component={CatalogStack} options={{
                    tabBarIcon: (params: any) => {
                        const name: string = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
                        return <TabBarIcon name={name} focused={params.focused} />;
                    }
                }} />
                <Tab.Screen name="Carrinho" component={CartStack} options={{
                    tabBarIcon: (params: any) => {
                        const name: string = Platform.OS === 'ios' ? 'ios-cart' : 'md-cart';
                        return <TabBarIcon name={name} focused={params.focused} />;
                    }
                }} />
            </Tab.Navigator>
        );
    }
}