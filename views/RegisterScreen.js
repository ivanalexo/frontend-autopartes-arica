import React, { useState } from 'react';
import { Users } from '../src/api-handler/User';
//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './Components/Loader';

const RegisterScreen = props => {
  let [userName, setUserName] = useState('');
  let [username, setUsermame] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Ingrese su nombre');
      return;
    }

    if(!username) {
        alert('Ingrese su nombre de usuario');
        return;
    }

    if (!userEmail) {
      alert('Ingrese su email');
      return;
    }
    if (!userPassword) {
      alert('Ingrese su contraseña');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      name: userName,
      username: username,
      email: userEmail,
      password: userPassword
    };
    Users.register(dataToSend)
      .then(response => response)
      .then(responseJson => {
        setLoading(false);
        console.log(responseJson.data)
        if (responseJson.data.status == 1) {
          setIsRegistraionSuccess(true);
        } else {
          console.log(responseJson)
          setErrortext('No se pudo registrar el usuario');
        }
      })
      .catch(error => {
        setLoading(false);
        alert(error.response.data.message)
        console.log(error.response);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#29434e',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registro exitoso</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#29434e' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Nombre"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._usernameinput && this._usernameinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={username => setUsermame(username)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Username"
              placeholderTextColor="#F6F6F7"
              keyboardType='default'
              ref={ref => {
                  this._usernameinput = ref;
              }}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Email"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              ref={ref => {
                  this._emailinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._passwordInput && this._passwordInput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={password => setUserPassword(password)}
              underlineColorAndroid="#F6F6F7"
              placeholder="password"
              placeholderTextColor="#F6F6F7"
              keyboardType="default"
              ref={ref => {
                  this._passwordInput = ref;
              }}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#0277bd',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#0277bd',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});