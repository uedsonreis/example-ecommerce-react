import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import { Factory } from '../../utils/factory';
import { SalesOrderScreen } from './sales.order';
import { SalesOrderList } from './sales.order.list';

class SalesOrderFactory extends Factory {

    public createStack(): any {

        const stack: any = createStackNavigator(
            {
                List: SalesOrderList,
                Order: SalesOrderScreen
            },
            this.config
        );
        return stack;
    }
}

const factory: SalesOrderFactory = new SalesOrderFactory();
export default factory.createStack();