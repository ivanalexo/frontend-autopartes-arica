import React, { useEffect, useState, useRef } from 'react';

//Import all required component
import { View, Text, Image, StyleSheet, ToastAndroid, Button, TouchableOpacity, Alert, Modal, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-ionicons';
import { Products } from '../../src/api-handler/Product';
import { Sale } from '../../src/api-handler/Sales';
import { ImageUpload } from '../../src/api-handler/Image';
import ImagePicker from 'react-native-image-picker';
import Loader from '../Components/Loader';

function prevData(value) {
  const ref = useRef();
  console.log(ref.current);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const DetailsScreen = ({ navigation }) => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [errorText, setErrorText] = useState('');
  let [visible, setVisible] = useState(false);
  let [visibleSaleModal, setVisibleSaleModal] = useState(false);
  let [client, setClient] = useState('');
  let [quantity, setQuantity] = useState('');
  let [dataQuantity, setDataQuantity] = useState('');
  let [image, setImage] = useState('');
  let [cloudinaryImage, setCloudinaryImage] = useState({});
  let [isImageUpdated, setImageUpdated] = useState(false);

  const productId = navigation.state.params.itemId;
  
  useEffect(() => {
    setLoading(true);
    Products.getProductById(productId)
      .then(response => response)
      .then(responseJson => {
        setData(responseJson.data);
        setDataQuantity(data.quantity);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.response);
      });
    }, [productId]);
  const resetData = prevData(data);
  const selectImage = () => {
    const options = {
      title: 'Seleccionar Image',
      base64: true
    };
    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button');
      } else {
        const source = { 
          mime: response.type,
          data: response.data
        }
        data.image.src = response.uri;
        setCloudinaryImage(source);
        setImageUpdated(true);
        setImage(response.uri)
      }
    });
  }

  function onChangeProductForm(evt, name) {
    const value = evt.nativeEvent.text;
    setData({
      ...data,
      [name]: value
    });
  }

  const updateProduct = (data) => {
    Products.updateProduct(productId ,data)
    .then(response => response)
    .then(responseJson => {
      setLoading(false);
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  const handleSubmitSale = () => {
    setErrorText('');
    if (!client) {
      alert('Ingrese el cliente');
      return;
    }
    if (!quantity) {
      alert('Ingrese la cantidad');
      return;
    }

    if (dataQuantity < quantity ) {
      alert(`Error: la cantidad disponible es de: ${dataQuantity}`);
      return;
    }

    let data = {
      client: client,
      product: productId,
      quantity: quantity
    }
    setLoading(true);
    Sale.saleProduct(data)
      .then(response => response)
      .then(responseJson => {
        setLoading(false);
        ToastAndroid.showWithGravity(
          'Venta realizada exitosamente',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        )
      })
      .catch(error => {
        setLoading(false)
        ToastAndroid.showWithGravity(
          error.response.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        )
        return;
      })
  }

  const handleSubmitUpdate = () => {
    setErrorText('');
    if (!data.code) {
      alert('Ingrese el código del producto');
      return;
    }
    else if(!data.name) {
      alert('Ingrese nombre del producto');
      return;
    }
    else if(!data.model) {
      alert('Ingrese el modelo del producto');
      return;
    }
    else if(!data.quantity) {
      quantity = 1;
    }
    else if(!data.price) {
      alert('Ingrese el precio del producto');
      return;
    }
    if(isImageUpdated === false) {
      setLoading(true);
      updateProduct(data);
    } else {
      setLoading(true);
      ImageUpload.uploadImage(cloudinaryImage)
      .then(response => response)
      .then(responseJson => {
        dataToSend = {
          ...data,
          image: {
            id: responseJson.data.id,
            src: responseJson.data.url
          }
        }
        setData(dataToSend);
        updateProduct(dataToSend);
      })
      .catch(error => {
        console.log(error.response)
      });
    }
  }

  const displayModal = (show) => {
    setVisible(show);
  }

  const displaySaleModal = (show) => {
    setVisibleSaleModal(show);
  }

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
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={visibleSaleModal}
            onRequestClose={() => {
              displaySaleModal(false);
            }}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.formLabel}>Vender Producto</Text>
              <View style={styles.SectionStyle}>
              <TextInput
                  style={styles.inputStyle}
                  name={'client'}
                  placeholder="Cliente"
                  onChangeText={client => setClient(client)}
                  underlineColorAndroid='#FFF'
                  placeholderTextColor='#FFF'
                  autoCapitalize='sentences'
                  returnKeyType='next'
                  onSubmitEditing={() => {
                    this._quantityInput && this._quantityInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                </View>
                <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={quantity => setQuantity(quantity)}
                  name='quantity'
                  placeholder="Cantidad"
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  autoCapitalize={'none'}
                  keyboardType={'numeric'}
                  returnKeyType={'next'}
                  ref={ref=> {
                    this._quantityInput = ref
                  }}
                  blurOnSubmit={false}
                />                  
                </View>
                <View style={styles.buttonActions}>
                <Button
                  onPress={() => {
                    navigation.navigate('Details', {itemId: productId});
                    displaySaleModal(false);
                  }}
                  title='Cerrar'
                />
                <Button
                  onPress={() => {
                    handleSubmitSale();
                    displaySaleModal(false);
                    navigation.navigate('Details',{itemId: productId});
                  }}
                  title='Vender'
                />
              </View>                
              </View>
          </Modal>
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              setData(resetData);
              displaySaleModal(false);
            }}
          >
            <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.formLabel}>Actualizar Producto</Text>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  name={'code'}
                  onChange={e => onChangeProductForm(e, 'code')}
                  underlineColorAndroid='#FFF'
                  placeholderTextColor='#FFF'
                  value={data.code}
                  autoCapitalize='sentences'
                  returnKeyType='next'
                  onSubmitEditing={() => {
                    this._nameInput && this._nameInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChange={e => onChangeProductForm(e, 'name')}
                  name='name'
                  underlineColorAndroid='#FFF'
                  placeholderTextColor='#FFF'
                  value={data.name}
                  autoCapitalize={'none'}
                  keyboardType='default'
                  returnKeyType={'next'}
                  ref={ref => {
                    this._nameInput = ref;
                  }}
                  onSubmitEditing={() => {
                    this._modelInput && this._modelInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChange={e => onChangeProductForm(e, 'model')}
                  name='model'
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  value={data.model}
                  autoCapitalize={'none'}
                  keyboardType={'default'}
                  returnKeyType={'next'}
                  ref={ref=> {
                    this._modelInput = ref
                  }}
                  onSubmitEditing={() => {
                    this._descriptionInput && this._descriptionInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChange={e => onChangeProductForm(e, 'description')}
                  name='description'
                  value={data.description}
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  autoCapitalize={'none'}
                  placeholder={data.description}
                  keyboardType={'default'}
                  returnKeyType={'next'}
                  ref={ref=> {
                    this._descriptionInput = ref
                  }}
                  onSubmitEditing={() => {
                    this._quantityInput && this._quantityInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChange={e => onChangeProductForm(e, 'quantity')}
                  name='quantity'
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  value={String(data.quantity)}
                  autoCapitalize={'none'}
                  keyboardType={'numeric'}
                  returnKeyType={'next'}
                  ref={ref=> {
                    this._quantityInput = ref
                  }}
                  onSubmitEditing={() => {
                    this._priceInput && this._priceInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChange={e => onChangeProductForm(e, 'price')}
                  name='price'
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  value={String(data.price)}
                  autoCapitalize={'none'}
                  ref={ref => {
                    this._priceInput = ref
                  }}
                  keyboardType={'numbers-and-punctuation'}
                  blurOnSubmit={false}
                />
              </View>
              {data.image ?
              <View>
                <Text style={styles.formLabel}>Imagen</Text>
                <TouchableOpacity onPress={selectImage}><Image style={styles.ImageStyle} source={{ uri: data.image.src }} /></TouchableOpacity>
              </View> :
              <View>
                <Text style={styles.formLabel}>Imagen</Text>
              <TouchableOpacity onPress={selectImage}><Image style={styles.ImageStyle} source={require('../../assets/images/addImage.png')} /></TouchableOpacity>
            </View>
            }
            <View style={styles.buttonActions}>
                <Button
                  onPress={() => {
                    navigation.navigate('Details', {itemId: productId});
                    displayModal(false);
                  }}
                  title='Cerrar'
                />
                <Button
                  onPress={() => {
                    handleSubmitUpdate();
                    ToastAndroid.showWithGravity(
                      'Producto actualizado exitosamente',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    )
                    displayModal(false);
                    navigation.navigate('Details',{itemId: productId});
                  }}
                  title='Actualizar'
                />
              </View>
            </ScrollView>
            </View>
          </Modal>
      <Loader loading={loading}/>
      {"image" in data ? 
        <Image source={{ uri: data.image.src }} style={styles.imageProduct} />
        :
        <Image source={require('../../assets/images/addImage.png')} style={styles.imageProduct} />
      }
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.price}>Modelo: {data.model}</Text>
      <Text style={styles.description}>Descripción: {data.description}</Text>
      <Text style={styles.quantity}>Cantidad disponible: {data.quantity}</Text>
      <View style={styles.buttonActions}>
        <TouchableOpacity style={styles.buttonSell}
        onPress={() => { displaySaleModal(true)}}
        >
          <Icon name="cart">
            <Text style={styles.textButtons}>Vender</Text>
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonEdit}
          onPress={() => { displayModal(true) }}
          >
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
  quantity:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  buttonActions: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-around'
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white'
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  formLabel: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#213e4b',
  },
  IconStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  },
  ImageStyle: {
    width: 200,
    height: 200,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 200,
    alignSelf: 'center',
    position: 'relative'
  }
});
