import React, { Component, ReactNode } from 'react';
import {Text, View } from 'react-native';

export class CartScreen extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <View>
                <Text> Cart in development... </Text>
            </View>
        );
    }
}