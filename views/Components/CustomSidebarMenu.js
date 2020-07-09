import React, { useEffect, useState } from 'react';

//Import all required component
import { View, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Users } from '../../src/api-handler/User';

const CustomSidebarMenu = props => {
  const [userInfo, setUserInfo] = useState();
  let items = [
    {
      navOptionName: 'Home Screen',
      screenToNavigate: 'HomeScreen',
    },
    {
      navOptionName: 'Setting Screen',
      screenToNavigate: 'SettingsScreen',
    },
    {
      navOptionName: 'Logout',
      screenToNavigate: 'logout',
    },
  ];

  const handleClick = (index, screenToNavigate) => {
    if (screenToNavigate == 'logout') {
      props.navigation.toggleDrawer();
      Alert.alert(
        'Cerrar sesión',
        '¿Está seguro que quiere cerrar sesión?',
        [
          {
            text: 'Cancelar',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Confirmar',
            onPress: () => {
              AsyncStorage.clear();
              props.navigation.navigate('Auth');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.navigation.toggleDrawer();
      global.currentScreenIndex = screenToNavigate;
      props.navigation.navigate(screenToNavigate);
    }
  };

  useEffect(() => {
    //let data = await AsyncStorage.getItem('userInfo')//.then(value => value);
   // const val = await AsyncStorage.multiGet(['id', 'tkn']);
   AsyncStorage.getItem('userInfo').then(value => {
     let dataParse = JSON.parse(value);
     Users.getUserById(dataParse.id, dataParse.token)
       .then(response => {
         const user = response.data
         setUserInfo({
           name: user.name,
           username: user.username
         });
       })
       .catch(error => console.log(error.response));
   });
  },[]);

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, color: '#307ecc' }}>
            {userInfo.name.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>{userInfo.name}</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />
      <View style={{ width: '100%', flex: 1 }}>
        {items.map((item, key) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              color: 'white',
              backgroundColor:
                global.currentScreenIndex === item.screenToNavigate
                  ? '#4b9ff2'
                  : '#307ecc',
            }}
            key={key}
            onStartShouldSetResponder={() =>
              handleClick(key, item.screenToNavigate)
            }>
            <Text style={{ fontSize: 15, color: 'white' }}>
              {item.navOptionName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#307ecc',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#307ecc',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
    marginBottom: 10,
  },
});
export default CustomSidebarMenu;