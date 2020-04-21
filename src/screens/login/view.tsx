import React, { Component, ReactNode } from "react";
import { Content, List, ListItem, Button, Text, Label, Container, Segment, Input } from "native-base";

import styles from "./styles";
import { User } from "../../model/user";
import { Customer } from "../../model/customer";

type AuthProps = { user: User, customer: Customer, actions: any };
type State = { segmentA: boolean, segmentB: boolean };

export class AuthScreenView extends Component<AuthProps, State> {

    constructor(props: AuthProps) {
        super(props);

        this.state = { segmentA: true, segmentB: false };
    }

    private changeActiveSegment(): void {
        this.setState({ segmentA: !this.state.segmentA, segmentB: !this.state.segmentB });
    }

    private renderContent(): ReactNode {
        const { user, customer, actions } = this.props;

        if (this.state.segmentA) {
            return ( <LoginScreenView user={user} actions={actions} /> );
        } else {
            return ( <RegisterScreenView user={user} customer={customer} actions={actions} /> );
        }
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

type LoginProps = { user: User, actions: any };

export class LoginScreenView extends Component<LoginProps, any> {
    public render(): ReactNode {
        const { user, actions } = this.props;
        return (
            <Content>
                <List>
                    <ListItem>
                        <Label><Text> Email: </Text></Label>
                        <Input onChangeText={text => user.login = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => user.password = text} />
                    </ListItem>
                </List>
    
                <Button onPress={() => actions.login()} style={styles.loginButton} block>
                    <Text>Entrar</Text>
                </Button>
            </Content>
        );
    }
}

type RegisterProps = { user: User, customer: Customer, actions: any };

export class RegisterScreenView extends Component<RegisterProps, any> {
    public render(): ReactNode {
        const { user, customer, actions } = this.props;
        return (
            <Content>
                <List>
                    <ListItem>
                        <Label><Text> Email: </Text></Label>
                        <Input onChangeText={text => user.login = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => user.password = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Confirmar Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => actions.setState({ confirmPass: text}) } />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Nome: </Text></Label>
                        <Input onChangeText={text => customer.name = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Idade: </Text></Label>
                        <Input keyboardType={'numeric'} onChangeText={age => customer.age = Number(age)} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Endereço: </Text></Label>
                        <Input onChangeText={text => customer.address = text} />
                    </ListItem>
                </List>
    
                <Button onPress={() => actions.signup()} style={styles.loginButton} block>
                    <Text>Registrar</Text>
                </Button>
            </Content>
        );
    }
}