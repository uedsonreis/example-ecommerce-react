import React, { Component, ReactNode } from "react";
import { Button, Text, Container, Segment } from "native-base";
import { NavigationActions } from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";

import api from '../../utils/connection.api';
import { MenuIcon } from "../../components/sidemenu/menu.icon";
import { User } from "../../model/user";
import session from '../../storage/user.session';
import { Customer } from "../../model/customer";
import screenView from './login';

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

    public changeActiveSegment(): void {
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

    public signup(): void {
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

    public login(): void {
        api.post('user/login', this.state.user).then((result: any) => {
            if (result.ok) {
                session.login(this.state.user.login, result.data);
                this.navigateToScreen('Cart');
            } else {
                alert("Login ou senha inválido(a).");
            }
        });
    }

    public render(): ReactNode {
        return screenView.render(this);
    }

}