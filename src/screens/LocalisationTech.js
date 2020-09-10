import React, { memo} from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import {  StyleSheet,ScrollView, View, Text} from 'react-native';
import MapView from 'react-native-maps';

import Header from '../components/Header';


const LocalisationTech = ({ navigation }) => {
   
    return(
  <Background>
            <ScrollView>
        <View style={styles.container}>
        <Header>Mise à jour votre localisation </Header> 
        <MapView style={styles.mapStyle} 
        initialRegion={{
          latitude: 35.035439,
          longitude: 9.483939,
          latitudeDelta: 6,
          longitudeDelta: 2
        }}
       >
             
        </MapView>
        <Button mode="outlined" >
        Enregistrer
      </Button>
        
        </View>
        </ScrollView>
        
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
  
  export default memo(LocalisationTech);