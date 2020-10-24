import React, { useState, useEffect } from 'react';

//Import all required component
import { ScrollView } from 'react-native-gesture-handler';

import { Image, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert, ToastAndroid } from 'react-native';
import {
  Container,
  View,
  Text,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Title,
  Right, 
  List, 
  ListItem , 
  FlatList, 
} from 'native-base';

const UserEditar = () => {
    return ( 
        <Content>
          <Item rounded>
            <Input placeholder='Rounded Textbox'/>
          </Item>
        </Content>
     );
}


 
export default UserEditar;