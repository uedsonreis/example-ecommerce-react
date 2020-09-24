import React, { Component, ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../utils/colors';

type Props = { name: string, focused: boolean };

export class TabBarIcon extends Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        const { name, focused } = this.props;

        return (
            <Ionicons
                name={name}
                size={26}
                style={{ marginBottom: -3 }}
                color={focused ? colors.tabIconSelected : colors.tabIconDefault}
            />
        );
    }

}