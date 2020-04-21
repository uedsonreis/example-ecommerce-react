import React, { ReactNode, Component } from 'react';
import { Platform } from 'react-native';
import { Body, Content, List, ListItem, Right, Text, Button, Header, Left } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { Item } from '../../model/item';
import styles from './styles';
import { MenuIcon } from '../../components/SideMenu/menu.icon';
import { StackHeaderProps } from '@react-navigation/stack';

type Props = { items: Item[], total: number, actions: any };

export function CartHeader(props: StackHeaderProps) {
    return (
        <Header>
            <Left>
                <MenuIcon navigation={props.navigation} />
            </Left>
            <Body>
                <Text>Carrinho</Text>
            </Body>
            <Right />
        </Header>
    );
}

export class CartView extends Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        const { items, total, actions } = this.props;
        return (
            <Content>
                <List dataArray={items} renderRow={(item: Item) => 
                    <ListItem key={item.id}>
                        <Body>
                            <Text>{item.product!.factory!.name} {item.product!.name}</Text>
                            <Text note>{item.price!.toFixed(2)} * {item.amount} un = R$ {(item.price! * item.amount!).toFixed(2)}</Text>
                        </Body>
                        <Right>
                            <Button onPress={() => actions.remove(item)} style={styles.trashButton} bordered danger>
                                <Text>
                                    <Ionicons name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash' } size={24} />
                                </Text>
                            </Button>
                        </Right>
                    </ListItem>
                } />
                <ListItem last>
                    <Text>Total do Pedido: R$ {total.toFixed(2)}</Text>
                </ListItem>

                <Button disabled={items.length<=0} onPress={() => actions.invoice()} style={styles.invoiceButton} block>
                    <Text>Fechar o Pedido</Text>
                </Button>

            </Content>
        );
    }
}