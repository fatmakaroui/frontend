import React from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Image, Text ,ScrollView ,StyleSheet} from 'react-native';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  GestionDesTaches,
  GestionDesComptes,
  AcceuilScreen,
} from './screens';

const AcceuilNavigator = createStackNavigator(
	{
		Acceuil: {
			screen: AcceuilScreen,
			navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-in" size={24} color="white" onPress={() => navigation.navigate('HomeNavigator')}/>),
				headerLeft:(<Icon name="bars" size={24} color="white" onPress={() => navigation.toggleDrawer()} />),
			}),
		},
	},

);

const HomeNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerLeft: (
          <Icon
            name="chevron-left"
            size={24}
            color='white'
            onPress={() => navigation.navigate('MainNavigator')}
          />
        ),
      }),
		},
	},

);

const CustomDrawerContentComponent = (props) => (
	<ScrollView>
		<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
			<View style={styles.drawerHeader}>
				<View style={{ flex: 1 }}>
				    <Image source={require('./assets/logo.png')} style={styles.drawerImage} />
				</View>
			
			</View>
			<DrawerItems {...props} />
		</SafeAreaView>
	</ScrollView>
);


const MainNavigator = createDrawerNavigator(
  {
    Acceuil: {
			screen: AcceuilNavigator,
			navigationOptions: {
				title: 'Acceuil',
				drawerLabel: 'Acceuil',
				drawerIcon: ({ tintColor, focused }) => (
					<Icon name="home" type="font-awesome" size={24} color={tintColor} />
				),
			},
    },
  },
    {
      drawerBackgroundColor: '#D1C4E9',
      contentComponent: CustomDrawerContentComponent,
    }
  );
  

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    GestionDesTaches,
    GestionDesComptes,
    AcceuilScreen,
    MainNavigator,
    HomeNavigator
  },
  {
    initialRouteName: 'MainNavigator',
    headerMode: 'none',
  }
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	drawerHeader: {
		backgroundColor: '#512DA8',
		height: 120,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
	},

	drawerImage: {
		margin: 10,
		width: 240,
		height: 80,
	},
});

export default createAppContainer(Router);
