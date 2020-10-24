import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './drawerScreens/HomeScreen';
//import TabNavigationButtons from './drawerScreens/TabNavigation';
import DetailsScreen from './drawerScreens/DetailsScreen';
import SettingsScreen from './drawerScreens/SettingsScreen';
import InformeScreen from './drawerScreens/InformeScreen'
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import Icon from 'react-native-ionicons';

const FirstActivity_StackNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Home Screen',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc'
            },
            headerTintColor: '#fff'
        })
    }
});

const SecondActivity_StackNavigator = createStackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Setting Screen',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc'
            },
            headerTintColor: '#fff'
        })
    }
});

const ThirdActivity_StackNavigator = createStackNavigator({
    Details: {
        screen: DetailsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Details Screen',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc'
            },
            headerTintColor: '#fff'
        })
    }
})

const FourthActivity_StackNavigator = createStackNavigator({
    Informe: {
        screen: InformeScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Informe Screen',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc'
            },
            headerTintColor: '#fff'
        })
    }
})


const TabNavigationButtons = createBottomTabNavigator({
    HomeScreen: {
        screen: FirstActivity_StackNavigator,
        navigationOptions: {
            tabBarLabel: 'Productos',
            tabBarIcon: ({tintColor}) => 
                <Icon name="cart" color={tintColor}  />
        }
    },
    SettingsScreen: {
        screen: SecondActivity_StackNavigator,
        navigationOptions: {
            title: 'Settings',
            tabBarLabel: 'Personal',
            tabBarIcon: ({tintColor}) => 
                <Icon name="person" color={tintColor}/>
            
        }
    },
    InformeScreen: {
        screen: FourthActivity_StackNavigator,
        navigationOptions: {
            title: 'Informe',
            tabBarLabel: 'Informe',
            tabBarIcon: ({tintColor}) => 
                <Icon name="book" color={tintColor}/>
            
        }
    }
}, {
    initialRouteName: 'HomeScreen'
}
);

const ButtonsNav = createStackNavigator({
    Tab: {
        screen: TabNavigationButtons,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation}/>,
            headerStyle: {
                backgroundColor: '#307ecc'
            },
            headerTintColor: '#fff'
        })
    },
});

const DrawerNavigationRoutes = createDrawerNavigator({
    HomeScreen: {
        screen: FirstActivity_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Home Screen'
        },
    },
    SettingsScreen: {
        screen: SecondActivity_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Setting Screen'
        }
    },
    DetailsScreen: {
        screen: ThirdActivity_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Details Screen'
        }
    },
    InformeScreen: {
        screen: FourthActivity_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Informe Screen'
        }
    },
    TabNavigator: {
        screen: ButtonsNav,
        navigationOptions: {
            header: null
        }
    }
},
{
    contentComponent: CustomSidebarMenu,
    initialRouteName: 'TabNavigator',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});

export default DrawerNavigationRoutes;
