import React, { Component, ReactNode } from 'react';
import { Right, Body, Text, View, List, ListItem, Left } from 'native-base';

import { Product } from '../../model/product';

type State = { product: Product };

export class PickupScreen extends Component<any, State> {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => <Text>{navigation.state.params.name}</Text>,
        };
    };

    constructor(props: any) {
        super(props);

        this.state = {
            product: this.props.navigation.state.params
        };
    }

    public render(): ReactNode {
        return (
            <View>
                <Text> {this.state.product.name} </Text>
            </View>
        );
    }
}