import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import catalogStack from '../../screens/catalog';
import cartStack from '../../screens/cart';

class TabNavigatorFactory {

    public create(): any {
        
        const tabNavigator: any = createBottomTabNavigator({
            catalogStack,
            cartStack
        });

        tabNavigator.path = "";

        return tabNavigator;
    }
}

const factory: TabNavigatorFactory = new TabNavigatorFactory();
export default factory.create();