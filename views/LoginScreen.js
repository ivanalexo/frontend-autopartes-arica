import React, { useState } from 'react';

import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { User, Users } from '../src/api-handler/User';
import Loader from './Components/Loader';

const LoginScreen = props => {
    let [username, setUsername] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [errorText, setErrorText] = useState('');

    const handleSubmitPress = () => {
        setErrorText('');
        if (!username) {
            alert('Ingrese su nombre de usuario');
            return;
        }
        if (!userPassword) {
            alert('Ingrese su contraseña');
            return;
        }
        setLoading(true);
        var dataToSend = { username: username, password: userPassword };

        Users.login(dataToSend)
            .then(response => response)
            .then(responseJson => {
                setLoading(false);
                if (responseJson.data.status === 'active') {
                    const token = responseJson.data.accessToken
                    const data = {
                        id: responseJson.data.id,
                        token: token
                    }
                    AsyncStorage.setItem('userInfo', JSON.stringify(data));
                    props.navigation.navigate('DrawerNavigationRoutes', {
                        otherParams: token
                    });
                } else {
                    setErrorText('Verifica el email y contraseña');
                }
            })
            .catch(error => {
                setLoading(false);
                alert(error.response.data.message);
            });
    };

    return (
        <View style = { styles.mainBody }>
            <Loader loading = { loading }/> 
            <ScrollView keyboardShouldPersistTaps = 'handled'>
                <View style = {{ marginTop: 100 } }>
                    <KeyboardAvoidingView enabled>
                        <View style = {{ alignItems: 'center' }}>
                            <Image 
                                source = { require('../assets/images/autoPartesArica.png') }
                                style = {{
                                            width: '70%',
                                            height: 120,
                                            resizeMode: 'contain',
                                            margin: 30
                                        }}
                            />
                        </View> 
                        <View style = { styles.SectionStyle }>
                            <TextInput 
                                style = { styles.inputStyle }
                                onChangeText = { username => setUsername(username) }
                                underlineColorAndroid = '#ffffff'
                                placeholder = 'Usuario'
                                placeholderTextColor = '#f6f6f7'
                                autoCapitalize = 'none'
                                keyboardType = 'default'
                                returnKeyType = 'next'
                                onSubmitEditing = {
                                    () =>
                                    this._passwordInput && this._passwordInput.focus()
                                }
                                blurOnSubmit = { false }
                            /> 
                        </View> 
                        <View style = { styles.SectionStyle }>
                            <TextInput 
                                style = { styles.inputStyle }
                                onChangeText = { userPassword => setUserPassword(userPassword) }
                                underlineColorAndroid = '#ffffff'
                                placeholder = 'Contraseña'
                                placeholderTextColor = '#f6f6f7'
                                keyboardType = 'default'
                                ref = {
                                    ref => {
                                        this._passwordInput = ref;
                                    }
                                }
                                onSubmitEditing = { Keyboard.dismiss }
                                blurOnSubmit = { false }
                                secureTextEntry = { true }
                            /> 
                        </View>
                        {errorText != '' ? ( 
                            <Text style = { styles.errorTextStyle } > { errorText } </Text>) : null
                        } 
                        <TouchableOpacity 
                            style = { styles.buttonStyle }
                            activeOpacity = { 0.5 }
                            onPress = { handleSubmitPress }>
                        <Text style = { styles.buttonTextStyle } > Login </Text> 
                        </TouchableOpacity> 
                        <Text 
                            style = { styles.registerTextStyle }
                            onPress = {
                                () => props.navigation.navigate('RegisterScreen') } > ¿No tiene cuenta ? Registrate 
                        </Text> 
                        </KeyboardAvoidingView> 
                    </View> 
                </ScrollView> 
            </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#29434e'
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10
    },
    buttonStyle: {
        backgroundColor: '#0277bd',
        borderWidth: 0,
        color: '#ffffff',
        borderColor: '#0277bd',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20
    },
    buttonTextStyle: {
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 16
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
    registerTextStyle: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14
    }
});