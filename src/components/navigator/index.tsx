import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import { TabBarIcon } from '../../components/tab-bar-icon';
import catalogStack from '../../screens/catalog';
import salesOrderStack from '../../screens/sales-order';

class TabNavigatorFactory {

    public create(): any {
        
        const tabNavigator: any = createBottomTabNavigator({
            catalogStack,
            salesOrderStack
        });

        tabNavigator.path = "";

        return tabNavigator;
    }
}

const factory: TabNavigatorFactory = new TabNavigatorFactory();
export default factory.create();