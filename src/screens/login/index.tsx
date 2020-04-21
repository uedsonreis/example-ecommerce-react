import React, { Component, ReactNode } from "react";
import { Text } from "native-base";

import api from '../../utils/connection.api';
import { MenuIcon } from "../../components/SideMenu/menu.icon";
import { User } from "../../model/user";
import session from '../../storage/user.session';
import { Customer } from "../../model/customer";
import { AuthScreenView } from "./view";

type State = {
    customer: Customer,
    user: User,
    confirmPass: string
}

export class LoginScreen extends Component<any, State> {

    static navigationOptions = (props: any) => {
        return {
            headerTitle: () => <Text>Autenticação</Text>,
            headerLeft: () => (
                <MenuIcon navigation={props.navigation} />
            ),
        };
    };

    constructor(props: any) {
        super(props);
        
        this.state = {
            user: new User(),
            customer: new Customer(),
            confirmPass: ""
        };
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
                session.login(this.state.customer.email!, result.data);
                this.props.navigation.navigate('salesOrder');
            } else {
                alert("Ocorreu um erro ao salvar o usuário: "+ JSON.stringify(result.data));
            }
        });
    }

    public login(): void {
        api.post('user/login', this.state.user).then((result: any) => {
            if (result.ok) {
                session.login(this.state.user.login!, result.data);
                this.props.navigation.navigate('salesOrder');
            } else {
                alert("Login ou senha inválido(a).");
            }
        });
    }

    public render(): ReactNode {
        return <AuthScreenView user={this.state.user} customer={this.state.customer} actions={this} />
    }

}