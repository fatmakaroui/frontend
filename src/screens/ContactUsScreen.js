import React, { memo,useState,Component} from 'react';
import Background from '../components/Background';
import {  StyleSheet,ScrollView,Linking, View, Text} from 'react-native';
import MapView from 'react-native-maps';
import { Card, Button,Input,SocialIcon} from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import {AddReclamation} from './AddReclamation';



const ContactUsScreen = ({ navigation }) => {
  let popupRef=React.createRef()
  
  const onShowPopup=()=>{
    popupRef.show()
  }

  const onClosePopup=()=>{
    popupRef.close()
  }

   
      sendMail=()=> {
		MailComposer.composeAsync({
			recipients: ['contact@sotetel.com.tn'],
			subject: 'réclamation',
			body: 'À qui cela concerne:',
		});
    }
    

  return(
<Background>
          <ScrollView>
      <View style={styles.container}>
      <Header>Contact & Réclamation</Header> 
      <MapView style={styles.mapStyle} 
      initialRegion={{
        latitude: 35.035439,
        longitude: 9.483939,
        latitudeDelta: 6,
        longitudeDelta: 2
      }}
     >
           <MapView.Marker
            coordinate={{latitude: 35.794291,
            longitude: 10.65}}
            pinColor = {"purple"}
            title={"Siège Sousse"}
            description={"Adresse : ZI Sidi Abdelhamid, 4 rue de la physique 4061 Sousse"}
         />
     <MapView.Marker
            coordinate={{latitude: 36.853879,
            longitude: 10.120}}
            pinColor = {"purple"}
            title={"Sotetel social Tunis"}
            description={"Adresse : Rue des entrepreneurs, Z.I Charguia II, Aéroport, B.P 640, 1080 Tunis Cedex"}
         />
      <MapView.Marker
            coordinate={{latitude: 34.759740,
            longitude: 10.781}}
            pinColor = {"purple"}
            title={"Sotetel Sfax"}
            description={"Route Saltnia, Sfax 3022"}
         />
        <MapView.Marker
            coordinate={{latitude: 33.355476,
            longitude: 10.4513}}
            pinColor = {"purple"}
            title={"Sotetel Medenine"}
            description={"Adresse : Route de Gabes,Km 3.5 –BP 51 Medenine 4130"}
         />
      </MapView>
      <Header>Siége Social</Header>
      <Card title="Siège social Tunis">
      <Text style={{ margin: 10 }}>Rue des entrepreneurs, Z.I Charguia II, Aéroport,</Text>
					<Text style={{ margin: 10 }}>B.P 640, 1080 Tunis Cedex</Text>
					<Text style={{ margin: 10 }}>Tél : +(216) 71 941 100</Text>
					<Text style={{ margin: 10 }}>Fax : +(216) 71 940 584</Text>
					<Text style={{ margin: 10 }}>Email : contact@sotetel.com.tn</Text>
					
					<Button
						title="Send Email"
						buttonStyle={{ backgroundColor: '#512DA8' }}
						icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
						onPress={this.sendMail}
					/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<SocialIcon type='facebook' onPress={() => Linking.openURL('https://www.facebook.com/SotetelSmartEnabler')} />
					<SocialIcon type='linkedin' onPress={() => Linking.openURL('https://www.linkedin.com/company/sotetelsmartenabler')} />
          <SocialIcon type='youtube' onPress={() => Linking.openURL('https://www.youtube.com/channel/UC2GMMzGUfVj_7G7xFXULG1A')} />
					</View>
	   </Card>
      <Header>Nos pôles régionaux </Header>
      <Card title="Sotetel Sousse">
				<Text style={{ margin: 10 }}>Adresse : ZI Sidi Abdelhamid, 4 rue de la physique 4061 Sousse</Text>
				<Text style={{ margin: 10 }}>Tél : (+216) 73 321 360</Text>
				<Text style={{ margin: 10 }}>Fax : (+216) 73 322 554</Text>
					
	   </Card>
        <Card title="Sotetel Sfax">
				<Text style={{ margin: 10 }}>Adresse : ZI Poudrière II, Rue de l’acier Sfax 3000</Text>
				<Text style={{ margin: 10 }}>Tél : (+216) 74 257 457</Text>
				<Text style={{ margin: 10 }}>Fax : (+216) 74 257 457</Text>
					
		</Card>
        <Card title="Sotetel Medenine">
				<Text style={{ margin: 10 }}>Adresse : Route de Gabes,Km 3.5 –BP 51 Medenine 4130</Text>
				<Text style={{ margin: 10 }}>Tél : (+216 )75 60 07 00</Text>
				<Text style={{ margin: 10 }}>Fax : (+216) 75 60 08 91</Text>
					
		</Card>
      </View>
      </ScrollView>
      <View style={{position:'absolute',bottom:0,alignSelf:'flex-end'}}>
       <Icon 
       raised
       reverse
       name="plus-circle" 
       type="font-awesome" 
       size={80} 
       color={'#512DA8'} 
       onPress={onShowPopup}
       />
      <AddReclamation 
            title="Réclamation"
            ref={(target)=>popupRef=target}
            onTouchOutside={onClosePopup}
           
      />
        </View>
</Background>
       
      )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    mapStyle: {
        flex:1,
        width: 300,
        height: 300,
      },
   });

export default memo(ContactUsScreen);