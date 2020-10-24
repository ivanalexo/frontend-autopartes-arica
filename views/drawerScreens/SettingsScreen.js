import React, {useEffect, useState} from 'react';

//Import all required component
import AsyncStorage from '@react-native-community/async-storage';
import { Users } from '../../src/api-handler/User';

import { Image, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, ToastAndroid } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';




const SettingsScreen = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: ''
  });
  return (
      
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'Image URL' }} />
              </Left>
              <Body>
                <Text>NOMBRE</Text>
                <Text note numberOfLines={1}>ROL</Text>
              </Body>
              <Right>
                <Button >
                  <Text>EDITAR</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
     
  );
};
export default SettingsScreen;