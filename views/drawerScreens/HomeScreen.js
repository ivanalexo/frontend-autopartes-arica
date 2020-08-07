import React, { useState, useEffect } from 'react';

//Import all required component
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
  Title
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Loader from '../Components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { Products } from '../../src/api-handler/Product';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageUpload } from '../../src/api-handler/Image';

const HomeScreen = (props) => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [isRegistraionSuccess, setRegistrationSuccess] = useState(false);
  let [errorText, setErrorText] = useState('');
  let [visible, setVisible] = useState(false)
  let [model, setModel] = useState('');
  let [code, setCode] = useState('');
  let [name, setName] = useState('');
  let [image, setImage] = useState('');
  let [cloudinaryImage, setCloudinaryImage] = useState({});
  let [description, setDescription] = useState('');
  let [quantity, setQuantity] = useState(0);
  let [price, setPrice] = useState(0);

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

  const selectImage = () => {
    const options = {
      title: 'Seleccionar Image',
      base64: true
    };
    ImagePicker.launchImageLibrary(options, async response => {
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
        setCloudinaryImage(source);
        setImage(response.uri)
      }
    });
  }

  const createProduct = async (data) => {
    Products.createProduct(data)
    .then(response => {
      setLoading(false);
      isRegistraionSuccess(true);
    })
    .catch(error => {
      console.log(error.response)
    })
  }
  const handleSubmitCreate = () => {
    setErrorText('');
    if (!code) {
      alert('Ingrese el código del producto');
      return;
    }
    if(!name) {
      alert('Ingrese nombre del producto');
      return;
    }
    if(!model) {
      alert('Ingrese el modelo del producto');
      return;
    }
    if(!quantity) {
      quantity = 1;
    }
    if(!price) {
      alert('Ingrese el precio del producto');
      return;
    }
    if(!image) {
      let dataToSend = {
        code: code,
        name: name,
        model: model,
        description: description,
        quantity: quantity,
        price: price,
        image: {}
      }
      setLoading(true);
      createProduct(dataToSend);
    } else {
      setLoading(true);
      ImageUpload.uploadImage(cloudinaryImage)
      .then(response => response)
      .then(responseJson => {
        console.log(responseJson)
        let dataToSend = {
          code: code,
          name: name,
          model: model,
          description: description,
          quantity: quantity,
          price: price,
          image: {
            id: responseJson.data.id,
            src: responseJson.data.url
          }
        }
        createProduct(dataToSend);
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }

  const displayModal = (show) => {
    setVisible(show);
  }

  global.currentScreenIndex = 'HomeScreen';
  console.log(data);
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#29434e',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/images/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registro exitoso</Text>
        <TouchableOpacity
          style={styles.buttonActions}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonTextStyle}>Continuar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  let display = data.map(function (productData, index) {
    return (
      <View key={productData.id}>
        <Card>
          <CardItem cardBody>
            {"image" in productData ? 
            <Image source={{ uri: productData.image.src }} style={{ height: 200, width: null, flex: 1 }} />
            :
            <Image source={require('../../assets/images/addImage.png')} style={{ height: 200, width: null, flex: 1 }} />
          }
          </CardItem>
          <CardItem>
            <Body>
              <Text>{productData.name}</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
      <Container>
        <Content>
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              displayModal(false);
            }}
          >
            <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.formLabel}>Agregar Producto</Text>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={code => setCode(code)}
                  autoFocus={true}
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  placeholder={'Código'}
                  autoCapitalize={'none'}
                  keyboardType={'default'}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this._nameInput && this._nameInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={name => setName(name)}
                  autoFocus={true}
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  placeholder={'Nombre'}
                  autoCapitalize={'none'}
                  keyboardType={'default'}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this._modelInput && this._modelInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={model => setModel(model)}
                  autoFocus={true}
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  placeholder={'Modelo'}
                  autoCapitalize={'none'}
                  keyboardType={'default'}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this._descriptionInput && this._descriptionInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={description => setDescription(description)}
                  autoFocus={true}
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  autoCapitalize={'none'}
                  placeholder={'Descripción'}
                  keyboardType={'default'}
                  returnKeyType={'next'}
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
                  autoFocus={true}
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  placeholder={'Cantidad'}
                  autoCapitalize={'none'}
                  keyboardType={'numeric'}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this._priceInput && this._priceInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={price => setPrice(price)}
                  autoFocus={true}
                  underlineColorAndroid={'white'}
                  placeholderTextColor={'white'}
                  placeholder={'Precio'}
                  autoCapitalize={'none'}
                  keyboardType={'numbers-and-punctuation'}
                  blurOnSubmit={false}
                />
              </View>
              {image ?
              <View>
                <Text style={styles.formLabel}>Imagen</Text>
                <TouchableOpacity onPress={selectImage}><Image style={styles.ImageStyle} source={{ uri: image }} /></TouchableOpacity>
              </View> :
              <View>
                <Text style={styles.formLabel}>Imagen</Text>
              <TouchableOpacity onPress={selectImage}><Image style={styles.ImageStyle} source={require('../../assets/images/addImage.png')} /></TouchableOpacity>
            </View>
            }
            <View style={styles.buttonActions}>
                <Button
                  onPress={() => {
                    displayModal(false)
                  }}
                  title='Close'
                />
                <Button
                  //disabled={this.state.isEnabled}
                  onPress={() => {
                    handleSubmitCreate();
                    ToastAndroid.showWithGravity(
                      'Producto creado exitosamente',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    )
                    displayModal(false);
                    props.navigation.navigate('HomeScreen');
                  }}
                  title='Crear'
                />
              </View>
            </ScrollView>
            </View>
          </Modal>
          <Loader loading={loading} />
          {display}
        </Content>
      </Container>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => { displayModal(true) }}
        style={styles.FloatingButtonStyle}>
        <Image
          style={styles.IconStyle}
          source={require('../../assets/images/plus-512.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  MainContainer: {
    width: 60,
    height: 60,
    left: 335,
    bottom: 30,
    alignItems: 'center',
    paddingTop: 5,

    borderRadius: 60 / 2
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
  buttonActions: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 35,
    justifyContent: 'space-evenly'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#213e4b',
  },
  FloatingButtonStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#0277bd',
    justifyContent: 'center',
    left: 330,
    bottom: 30,
    borderRadius: 60 / 2
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
