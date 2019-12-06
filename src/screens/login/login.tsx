import React, { Component, ReactNode } from "react";
import { Content, List, ListItem, Button, Text, Label, Container, Segment, Input } from "native-base";
import { NavigationActions } from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";

import api from '../../utils/connection.api';
import { MenuIcon } from "../../components/sidemenu/menu.icon";
import { User } from "../../model/user";
import styles from "./styles";
import session from '../../storage/user.session';
import { Customer } from "../../model/customer";

type State = {
    segmentA: boolean,
    segmentB: boolean,
    customer: Customer,
    user: User,
    confirmPass: string
}

export class LoginScreen extends Component<any, State> {

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
        
        this.state = {
            segmentA: true,
            segmentB: false,
            user: new User(),
            customer: new Customer(),
            confirmPass: ""
        };
    }

    private changeActiveSegment(): void {
        this.setState({ segmentA: !this.state.segmentA, segmentB: !this.state.segmentB });
    }

    private navigateToScreen(route: string) {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    private validateForm(): boolean {
        if (this.state.user.login === undefined || this.state.user.login.trim() === '') {
            alert("Este email é inválido!");
            return false;
        }

        if (!this.state.user.login.includes("@") || !this.state.user.login.includes(".")) {
            alert("Este email é inválido!");
            return false;
        }

        if (this.state.customer.age === undefined || this.state.customer.age <= 0) {
            alert("Esta idade não é permitida!");
            return false;
        }

        if (this.state.user.password !== this.state.confirmPass) {
            alert("As senhas não conferem!");
            return false;
        }

        this.state.customer.email = this.state.user.login;
        this.state.customer.user = this.state.user;

        return true;
    }

    private signup(): void {
        if (!this.validateForm()) return;

        api.post('user/customer/add', this.state.customer).then((result: any) => {
            if (result.ok) {
                session.login(this.state.customer.email, result.data);
                this.navigateToScreen('Cart');
            } else {
                alert("Ocorreu um erro ao salvar o usuário: "+ JSON.stringify(result.data));
            }
        });
    }

    private login(): void {
        api.post('user/login', this.state.user).then((result: any) => {
            if (result.ok) {
                session.login(this.state.user.login, result.data);
                this.navigateToScreen('Cart');
            } else {
                alert("Login ou senha inválido(a).");
            }
        });
    }

    private renderContent(): ReactNode {
        if (this.state.segmentA) {
            return this.renderLogin();
        } else {
            return this.renderRegister();
        }
    }

    private renderLogin(): ReactNode {
        return (
            <Content>
                <List>
                    <ListItem>
                        <Label><Text> Email: </Text></Label>
                        <Input onChangeText={text => this.state.user.login = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => this.state.user.password = text} />
                    </ListItem>
                </List>

                <Button onPress={() => this.login()} style={styles.loginButton} block>
                    <Text>Entrar</Text>
                </Button>
            </Content>
        );
    }

    private renderRegister(): ReactNode {
        return (
            <Content>
                <List>
                    <ListItem>
                        <Label><Text> Email: </Text></Label>
                        <Input onChangeText={text => this.state.user.login = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => this.state.user.password = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Confirmar Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => this.setState({ confirmPass: text}) } />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Nome: </Text></Label>
                        <Input onChangeText={text => this.state.customer.name = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Idade: </Text></Label>
                        <Input keyboardType={'numeric'} onChangeText={age => this.state.customer.age = Number(age)} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Endereço: </Text></Label>
                        <Input onChangeText={text => this.state.customer.address = text} />
                    </ListItem>
                </List>

                <Button onPress={() => this.signup()} style={styles.loginButton} block>
                    <Text>Registrar</Text>
                </Button>
            </Content>
        );
    }

    public render(): ReactNode {
        return (
            <Container>
                <Segment>
                    <Button first active={this.state.segmentA} onPress={() => this.changeActiveSegment()}>
                        <Text>Entrar</Text>
                    </Button>
                    <Button last active={this.state.segmentB} onPress={() => this.changeActiveSegment()}>
                        <Text>Registrar</Text>
                    </Button>
                </Segment>
                {this.renderContent()}
            </Container>
        );
    }

}