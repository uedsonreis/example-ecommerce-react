import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import navigator from './src/components/navigator';
import { SideMenu } from './src/components/sidemenu';
import login from './src/screens/login';

Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
});

const AppContainer: any = createAppContainer(
    createDrawerNavigator({
        Main: navigator,
        Login: login,
    }, {
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width - 120
    })
);

export default AppContainer;