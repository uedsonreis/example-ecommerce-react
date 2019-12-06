import React, { Component, ReactNode } from 'react';
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { Content, Container, ListItem, Text, List } from 'native-base';

export class SideMenu extends Component<any, any> {

    private navigateToScreen(route: string) {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    public render(): ReactNode {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemDivider><Text>Opções</Text></ListItem>
                        
                        <ListItem onPress={() => this.navigateToScreen('Main')}>
                            <Text>Compras</Text>
                        </ListItem>

                        <ListItem onPress={() => this.navigateToScreen('SalesOrder')}>
                            <Text>Pedidos</Text>
                        </ListItem>

                        <ListItem onPress={() => this.navigateToScreen('Login')} last>
                            <Text>Login</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }

}