import React, { Component, ReactNode } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import navigator from './src/components/navigator';

Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
});

const AppContainer: any = createAppContainer(
    createSwitchNavigator({
        Main: navigator,
    })
);

export default AppContainer;