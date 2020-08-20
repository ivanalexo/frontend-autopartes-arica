import React, { useEffect, useState } from 'react';

//Import all required component
import { View, Text, Image, StyleSheet, ToastAndroid, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-ionicons';
import { Products } from '../../src/api-handler/Product';
import Loader from '../Components/Loader';

const DetailsScreen = ({ navigation }) => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);

  const productId = navigation.state.params.itemId;

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
  const handleDelete = () => {
    Alert.alert(
      'Eliminar',
      '¿Está seguro que desea borrar este producto?',
    [
      {
        text: 'Cancelar',
        onPress: () => {
          return null;
        }
      },
      {
        text: 'Confirmar',
        onPress: () => {
          deleteProduct();
        }
      }
    ],
    { cancelable: false }
    )
  }
  const deleteProduct = () => {
    setLoading(true);
    Products.deleteProduct(productId)
      .then(response => response)
      .then(responseJson => {
        setLoading(false);
        ToastAndroid.showWithGravity(
          'Producto eliminado exitosamente',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
          );
          navigation.navigate('HomeScreen');
      });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 30 }}>
      <Loader loading={loading}/>
      {"image" in data ? 
        <Image source={{ uri: data.image.src }} style={styles.imageProduct} />
        :
        <Image source={require('../../assets/images/addImage.png')} style={styles.imageProduct} />
      }
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.price}> {data.model}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.buttonActions}>
        <TouchableOpacity style={styles.buttonSell}>
          <Icon name="cart">
            <Text style={styles.textButtons}>Vender</Text>
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEdit}>
          <Icon name="create">
            <Text style={styles.textButtons}>Editar</Text>
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonDelete}
          onPress={() => { handleDelete(); }}
          >
          <Icon name="trash">
            <Text style={styles.textButtons}>Eliminar</Text>
          </Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DetailsScreen;

const styles = StyleSheet.create({
  imageProduct: {
    width: 200,
    height: 200
  },
  buttonSell: {
    backgroundColor:"#34eb8c",
    borderRadius: 5,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    elevation: 9,
    alignContent: "center",
    alignItems: "center",
    height: 45,
    width: 80
  },
  buttonEdit: {
    backgroundColor:"#3486eb",
    borderRadius: 5,
    shadowColor: "#000",
    paddingTop: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    elevation: 9,
    alignContent: "center",
    alignItems: "center",
    height: 45,
    width: 80
  },
  buttonDelete: {
    backgroundColor:"#eb4034",
    borderRadius: 5,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    elevation: 9,
    alignContent: "center",
    alignItems: "center",
    height: 45,
    width: 80
  },
  textButtons: {
    fontSize: 15,
    paddingBottom: 15
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
  },
  buttonActions: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-around'
  },
})