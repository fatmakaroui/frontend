import React from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Image,ScrollView ,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  Dashboard2,
  GestionDesTaches,
  GestionDesComptes,
  AcceuilScreen,
  AboutScreen,
  AproposScreen,
  ContactUsScreen,
  VerifReclamation,
  ComptesTech,
  CompteClient,
  CompteClientNV,
  DashboardClient,
  GTacheTech,
  LocalisationTech
} from './screens';

const logout =()=>{
	AsyncStorage.removeItem("token")
 }

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

const DashboardNavigator = createStackNavigator(
	{
		Dashboard : {
			screen: Dashboard,
			navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		
		}),
		},
	},

);

const Dashboard2Navigator = createStackNavigator(
	{
		Dashboard2 : {
			screen: Dashboard2,
			navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		
		}),
		},
	},

);

const DashboardClientNavigator = createStackNavigator(
	{
		DashboardClient : {
			screen: DashboardClient,
			navigationOptions: ({ navigation }) => ({
				title: 'Les Réclamations',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		
		}),
		},
	},

);

const VerifRScreen = createStackNavigator(
	{
		
		VerifR : {
			screen: VerifReclamation,
			navigationOptions: ({ navigation }) => ({
				title: 'Liste des Réclamations',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		headerLeft: (
			<Icon
			  name="chevron-left"
			  size={24}
			  color='white'
			  onPress={() => navigation.navigate('DashboardNavigator')}
			/> ),	}),
		
		},
	},

);

const GTachesNavigator = createStackNavigator(
	{
		
		Gtaches : {
			screen: GestionDesTaches,
			navigationOptions: ({ navigation }) => ({
				title: 'Liste des Taches',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		headerLeft: (
			<Icon
			  name="chevron-left"
			  size={24}
			  color='white'
			  onPress={() => navigation.navigate('DashboardNavigator')}
			/> ),	}),
		
		},
	},

);

const GTachesTechNavigator = createStackNavigator(
	{
		
		GtacheTech : {
			screen: GTacheTech,
			navigationOptions: ({ navigation }) => ({
				title: 'Liste des Taches',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		headerLeft: (
			<Icon
			  name="chevron-left"
			  size={24}
			  color='white'
			  onPress={() => navigation.navigate('Dashboard2Navigator')}
			/> ),	}),
		
		},
	},

);

const LocalisationTechNavigator = createStackNavigator(
	{
		
		LocalisationTech : {
			screen: LocalisationTech,
			navigationOptions: ({ navigation }) => ({
				title: 'Liste des Taches',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		headerLeft: (
			<Icon
			  name="chevron-left"
			  size={24}
			  color='white'
			  onPress={() => navigation.navigate('Dashboard2Navigator')}
			/> ),	}),
		
		},
	},

);

const GComptesNavigator = createStackNavigator(
	{
		
		GComptes : {
			screen: GestionDesComptes,
			navigationOptions: ({ navigation }) => ({
				title: 'Gestion des Comptes',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		headerLeft: (
			<Icon
			  name="chevron-left"
			  size={24}
			  color='white'
			  onPress={() => navigation.navigate('DashboardNavigator')}
			/> ),	}),
		
		},
	},

);

const CompteTechNavigator = createStackNavigator(
	{
		
		CompteTech : {
			screen: ComptesTech,
			navigationOptions: ({ navigation }) => ({
				title: 'Techniciens',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		headerLeft: (
			<Icon
			  name="chevron-left"
			  size={24}
			  color='white'
			  onPress={() => navigation.navigate('GComptesNavigator')}
			/> ),	}),
		
		},
	},

);

const CompteClientNavigator = createStackNavigator(
	{
		
		CompteClient : {
			screen: CompteClient,
			navigationOptions: ({ navigation }) => ({
				title: 'Client',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		headerLeft: (
			<Icon
			  name="chevron-left"
			  size={24}
			  color='white'
			  onPress={() => navigation.navigate('GComptesNavigator')}
			/> ),	}),
		
		},
	},

);

const CompteClientNVNavigator = createStackNavigator(
	{
		
		CompteClientNV : {
			screen: CompteClientNV,
			navigationOptions: ({ navigation }) => ({
				title: 'Client',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight:(<Icon name="sign-out" size={24} color="white" onPress={() =>navigation.navigate('AcceuilNavigator')}/>),
		headerLeft: (
			<Icon
			  name="chevron-left"
			  size={24}
			  color='white'
			  onPress={() => navigation.navigate('GComptesNavigator')}
			/> ),	}),
		
		},
	},

);


const AboutNavigator = createStackNavigator(
	{
		About : {
			screen: AboutScreen,
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

const AproposNavigator = createStackNavigator(
	{
		Apropos : {
			screen: AproposScreen,
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

const ContactUsNavigator = createStackNavigator(
	{
		ContactUs : {
			screen: ContactUsScreen,
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

const loginNavigator = createStackNavigator(
	{
		login: {
			screen: LoginScreen,
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
            onPress={() => navigation.navigate('HomeNavigator')}
          />
        ),
      }),
		},
	},

);

const RegisterNavigator = createStackNavigator(
	{
		Register: {
			screen: RegisterScreen,
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
            onPress={() => navigation.navigate('HomeNavigator')}
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
    Apropos: {
			screen: AproposNavigator,
			navigationOptions: {
				title: 'À propos',
				drawerLabel: 'À propos',
				drawerIcon: ({ tintColor, focused }) => (
					<Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />
				),
			},
    },
    About: {
			screen: AboutNavigator,
			navigationOptions: {
				title: 'Historique & dates clès',
				drawerLabel: 'Historique & dates clès',
				drawerIcon: ({ tintColor, focused }) => (
					<Icon name="history" type="font-awesome" size={24} color={tintColor} />
				),
			},
	},
	ContactUs: {
		screen: ContactUsNavigator,
		navigationOptions: {
			title: 'Contact & réclamation',
			drawerLabel: 'Contact & réclamation',
			drawerIcon: ({ tintColor, focused }) => (
				<Icon name="address-card" type="font-awesome" size={24} color={tintColor} />
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
	RegisterNavigator,
    ForgotPasswordScreen,
	GTachesNavigator,
	GComptesNavigator,
	AcceuilScreen,
	AcceuilNavigator,
	MainNavigator,
	HomeNavigator,
	loginNavigator,
	DashboardNavigator,
	Dashboard2Navigator,
	DashboardClientNavigator,
	VerifRScreen,
	CompteTechNavigator,
	CompteClientNavigator,
	CompteClientNVNavigator,
	GTachesTechNavigator,
	LocalisationTechNavigator
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
