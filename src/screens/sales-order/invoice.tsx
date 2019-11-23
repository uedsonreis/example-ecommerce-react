import React, { Component, ReactNode } from 'react';
import {Text, View } from 'react-native';

export class InvoiceScreen extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <View>
                <Text> Invoice in development... </Text>
            </View>
        );
    }
}