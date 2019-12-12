import React, { ReactNode } from 'react';
import { Platform } from 'react-native';
import { Body, Content, List, ListItem, Right, Text, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { Item } from '../../model/item';
import styles from './styles';
import { CartScreen } from '.';
import { ScreenView } from '../../utils/screen.view';

class Screen implements ScreenView {

    public render(pageCtrl: CartScreen): ReactNode {
        return (
            <Content>
                <List dataArray={pageCtrl.state.items} renderRow={(item: Item) => 
                    <ListItem>
                        <Body>
                            <Text>{item.product.factory.name} {item.product.name}</Text>
                            <Text note>{item.price.toFixed(2)} * {item.amount} un = R$ {(item.price * item.amount).toFixed(2)}</Text>
                        </Body>
                        <Right>
                            <Button onPress={() => pageCtrl.remove(item)} style={styles.trashButton} bordered danger>
                                <Text>
                                    <Ionicons name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash' } size={24} />
                                </Text>
                            </Button>
                        </Right>
                    </ListItem>
                } />
                <ListItem last>
                    <Text>Total do Pedido: R$ {pageCtrl.state.total.toFixed(2)}</Text>
                </ListItem>

                <Button disabled={pageCtrl.state.items.length<=0} onPress={() => pageCtrl.invoice()} style={styles.invoiceButton} block>
                    <Text>Fechar o Pedido</Text>
                </Button>

            </Content>
        );
    }
}

export default new Screen();