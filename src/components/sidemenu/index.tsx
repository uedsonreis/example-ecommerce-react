import React, { Component, ReactNode } from 'react';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Content, Container, ListItem, Text, List } from 'native-base';

export default function SideMenu(props: DrawerContentComponentProps<DrawerContentOptions>) {

        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemDivider><Text>Opções</Text></ListItem>
                        
                        <ListItem onPress={() => props.navigation.navigate('main')}>
                            <Text>Compras</Text>
                        </ListItem>

                        <ListItem onPress={() => props.navigation.navigate('salesOrder')}>
                            <Text>Pedidos</Text>
                        </ListItem>

                        <ListItem onPress={() => props.navigation.navigate('login')} last>
                            <Text>Login</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
}