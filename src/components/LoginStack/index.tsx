import React, { ReactNode, Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../../screens/login';

export default class LoginStack extends Component<any, any> {

    render(): ReactNode {
        const StackNavigator = createStackNavigator();
        
        return (
            <StackNavigator.Navigator headerMode="screen">
                <StackNavigator.Screen name="login" component={LoginScreen} />
            </StackNavigator.Navigator>
        );
    }

}