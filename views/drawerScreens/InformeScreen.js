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

const InformeScreen = ( props) => {
    return(

        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>El producto mas vendido es : </Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                 <List>
                     <ListItem  >
                         <Text>Nombre producto</Text>
                     </ListItem>
                     <ListItem  itemHeader >
                         <Text>Modelo</Text>
                     </ListItem>
                    <ListItem itemHeader >
                         <Text>Descripcion</Text>
                    </ListItem>
                    <Image source={{uri: 'Image URL'}} style={{height: 100, width: 200}}/>       
            </List>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>El producto menos vendido es : </Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <List>
                     <ListItem  >
                         <Text>Nombre producto</Text>
                     </ListItem>
                     <ListItem  itemHeader >
                         <Text>Modelo</Text>
                     </ListItem>
                    <ListItem itemHeader >
                         <Text>Descripcion</Text>
                    </ListItem>
                    <Image source={{uri: 'Image URL'}} style={{height: 100, width: 100}}/>       
            </List>
              </Body>
            </CardItem>
          </Card>
           
        </Content>
       
    );
};
export default InformeScreen;

const styles = StyleSheet.create({

})
