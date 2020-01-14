import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import { SideMenu } from './src/components/sidemenu';
import navigator from './src/components/navigator';
import { SalesOrderListScreen } from './src/screens/sales-order-list';
import { SalesOrderScreen } from './src/screens/sales-order';
import { LoginScreen } from './src/screens/login';

Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
});

const salesOrderStack: any = createStackNavigator(
    { List: SalesOrderListScreen, Order: SalesOrderScreen }
);

const loginStack: any = createStackNavigator({ LoginScreen });

const AppContainer: any = createAppContainer(
    createDrawerNavigator({
        Main: navigator,
        SalesOrder: salesOrderStack,
        Login: loginStack,
    }, {
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width - 120
    })
);

export default AppContainer;