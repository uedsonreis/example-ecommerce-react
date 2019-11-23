import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import { CatalogScreen } from './product.list';
import { PickupScreen } from './pickup';

import { TabBarIcon } from '../../components/tab-bar-icon';
import { Factory } from '../../utils/factory';

class CatalogFactory extends Factory {

    public createStack(): any {

        const stack: any = createStackNavigator(
            {
                Catalog: CatalogScreen,
                Pickup: PickupScreen
            },
            this.config
        );

        stack.navigationOptions = {
            tabBarLabel: 'Catalog',
            tabBarIcon: ({ focused }) => {
                const name: string = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
                return <TabBarIcon name={name} focused={focused} />;
            },
        };

        stack.path = "";

        return stack;
    }
}

const factory: CatalogFactory = new CatalogFactory();
export default factory.createStack();