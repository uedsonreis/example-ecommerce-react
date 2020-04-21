import React, { Component, ReactNode } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import styles from "./styles";

export class MenuIcon extends Component<any, any> {
    
    public render(): ReactNode {
        const { navigation } = this.props;

        return (
            <TouchableOpacity style={styles.touchable} onPress={() => navigation.openDrawer()}>
                <Ionicons name={(Platform.OS === 'ios') ? "ios-menu" : 'md-menu'} size={20} />
            </TouchableOpacity>
        );
    }

}