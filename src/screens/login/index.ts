import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import { LoginScreen } from './login';
import { TabBarIcon } from '../../components/tab-bar-icon';
import { Factory } from '../../utils/factory';

class LoginFactory extends Factory {

    public createStack(): any {
        const stack: any = createStackNavigator(
            { LoginScreen },
            this.config
        );
        stack.path = "";
        return stack;
    }
}

const factory: LoginFactory = new LoginFactory();
export default factory.createStack();