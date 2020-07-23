import React, { useState, useEffect } from 'react';

//Import all required component
import { Image } from 'react-native';
import {
  Container,
  View,
  Text,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title
} from 'native-base';
import Loader from '../Components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { Products } from '../../src/api-handler/Product';

const HomeScreen = (props) => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);


  
  useEffect(() => {
    setLoading(true);
    Products.getProduct()
    .then(response => response)
    .then(responseJson => {
      setData(responseJson.data)
      setLoading(false)
    })
    .catch(error => {
      console.log(error.response);
    });
    
  }, []);

  global.currentScreenIndex = 'HomeScreen';
  console.log(data);
  let display = data.map(function (productData, index) {
    return (
      <View key={productData.id}>
        <Card>
          <CardItem cardBody>
            <Image source={{uri: productData.image.src}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{productData.name}</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  })
  return (
    <Container>
    <Content>
      <Loader loading={loading}/>
      {display}
    </Content>
  </Container>
  );
};
export default HomeScreen;

/*<View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
<Text style={{ fontSize: 23, marginTop: 10 }}>Home Screen</Text>
<Text style={{ fontSize: 18, marginTop: 10 }}>
  Autopartes
</Text>
<Text style={{ fontSize: 18, marginTop: 10 }}>https://aboutreact</Text>
</View>*/