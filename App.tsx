import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SideMenu from './src/components/SideMenu';
import TabNavigator from './src/components/TabNavigator';
import LoginStack from './src/components/LoginStack';
import SalesOrderStack from './src/components/SalesOrderStack';

export default function App() {
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="main" drawerContent={SideMenu}>
                <Drawer.Screen name="main" component={TabNavigator} />
                <Drawer.Screen name="salesOrder" component={SalesOrderStack} />
                <Drawer.Screen name="login" component={LoginStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}