import React, { Component, ReactNode } from "react";
import { TextInput } from "react-native";
import { Content, List, ListItem, Button, Text, Label } from "native-base";
import { NavigationActions } from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";

import { MenuIcon } from "../../components/sidemenu/menu.icon";
import { User } from "../../model/user";
import styles from "./styles";
import session from '../../storage/user.session';

export class LoginScreen extends Component<any, any> {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text>Autenticação</Text>,
            headerLeft: () => (
                <MenuIcon navigation={navigation} />
            ),
        };
    };

    constructor(props: any) {
        super(props);
        this.state = { user: new User() };
    }

    private navigateToScreen(route: string) {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    private login(): void {
        session.login(this.state.user, (isLogged: boolean) => {
            if (isLogged) {
                this.navigateToScreen('Cart');
            } else {
                alert("Login ou senha inválido(a).");
            }
        });
    }

    public render(): ReactNode {
        return (
            <Content>
                <List>
                    <ListItem>
                        <Label><Text> Login: </Text></Label>
                        <TextInput onChangeText={text => this.state.user.login = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Senha: </Text></Label>
                        <TextInput secureTextEntry={true} onChangeText={text => this.state.user.password = text} />
                    </ListItem>
                </List>

                <Button onPress={() => this.login()} style={styles.loginButton} block>
                    <Text>Entrar</Text>
                </Button>
            </Content>
        );
    }

}