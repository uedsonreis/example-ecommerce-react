import React, { Component, ReactNode } from "react";
import { Content, List, ListItem, Button, Text, Label, Container, Segment, Input } from "native-base";

import styles from "./styles";
import { LoginScreen } from '.';
import { ScreenView } from '../../utils/screen.view';

class Screen implements ScreenView {

    private renderLogin(pageCtrl: LoginScreen): ReactNode {
        return (
            <Content>
                <List>
                    <ListItem>
                        <Label><Text> Email: </Text></Label>
                        <Input onChangeText={text => pageCtrl.state.user.login = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => pageCtrl.state.user.password = text} />
                    </ListItem>
                </List>
    
                <Button onPress={() => pageCtrl.login()} style={styles.loginButton} block>
                    <Text>Entrar</Text>
                </Button>
            </Content>
        );
    }
    
    private renderRegister(pageCtrl: LoginScreen): ReactNode {
        return (
            <Content>
                <List>
                    <ListItem>
                        <Label><Text> Email: </Text></Label>
                        <Input onChangeText={text => pageCtrl.state.user.login = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => pageCtrl.state.user.password = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Confirmar Senha: </Text></Label>
                        <Input secureTextEntry={true} onChangeText={text => pageCtrl.setState({ confirmPass: text}) } />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Nome: </Text></Label>
                        <Input onChangeText={text => pageCtrl.state.customer.name = text} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Idade: </Text></Label>
                        <Input keyboardType={'numeric'} onChangeText={age => pageCtrl.state.customer.age = Number(age)} />
                    </ListItem>
                    <ListItem>
                        <Label><Text> Endereço: </Text></Label>
                        <Input onChangeText={text => pageCtrl.state.customer.address = text} />
                    </ListItem>
                </List>
    
                <Button onPress={() => pageCtrl.signup()} style={styles.loginButton} block>
                    <Text>Registrar</Text>
                </Button>
            </Content>
        );
    }

    private renderContent(pageCtrl: LoginScreen): ReactNode {
        if (pageCtrl.state.segmentA) {
            return this.renderLogin(pageCtrl);
        } else {
            return this.renderRegister(pageCtrl);
        }
    }
    
    public render(pageCtrl: LoginScreen): ReactNode {
        return (
            <Container>
                <Segment>
                    <Button first active={pageCtrl.state.segmentA} onPress={() => pageCtrl.changeActiveSegment()}>
                        <Text>Entrar</Text>
                    </Button>
                    <Button last active={pageCtrl.state.segmentB} onPress={() => pageCtrl.changeActiveSegment()}>
                        <Text>Registrar</Text>
                    </Button>
                </Segment>
                {this.renderContent(pageCtrl)}
            </Container>
        );
    }
}

export default new Screen();