import React, { useEffect, useState } from 'react';

//Import all required component
import { View, Text, Image, StyleSheet } from 'react-native';
import { Products } from '../../src/api-handler/Product';

const DetailsScreen = ({ navigation }) => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);

  const productId = navigation.state.params.itemId;
  console.log(productId);

  useEffect(() => {
    setLoading(true);
    Products.getProductById(productId)
      .then(response => response)
      .then(responseJson => {
        setData(responseJson.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [productId]);
  console.log(data)
  return (
    <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 30 }}>
      {"image" in data ? 
        <Image source={{ uri: data.image.src }} style={styles.imageProduct} />
        :
        <Image source={require('../../assets/images/addImage.png')} style={styles.imageProduct} />
      }
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.price}> {data.model}</Text>
      <Text style={styles.description}>{data.description}</Text>
    </View>
  );
};
export default DetailsScreen;

const styles = StyleSheet.create({
  imageProduct: {
    width: 200,
    height: 200
  },
  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"green",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  }
})