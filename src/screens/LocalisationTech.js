import React, {Component, memo} from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import {  StyleSheet,ScrollView, View,Alert, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { baseUrl } from '../shared/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../components/Header';


export default class LocalisationTech extends Component {

    

   constructor(props){
       super(props);
    this.state={
        latitude:0,
        longitude : 0,
      erreur:null
    };
}
componentDidMount(){
    navigator.geolocation.getCurrentPosition(position =>{
        this.setState({
    latitude : position.coords.latitude,
    longitude : position.coords.longitude,
    erreur: null
    });
  

    erreur => this.setState({ error: error.message}),
    {enableHighAccuracy: true , timeout:20000, maximumAge: 2000}
});
}
UpdateLoc=async ()=>{
    const email = await AsyncStorage.getItem("email")

    fetch(baseUrl+"update/"+email,{
        method:"PUT",
        headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({
         "localisation.latitude":this.state.latitude,
         "localisation.longitude":this.state.longitude   
       })
      })
      .then(res=>res.text())
      .then(text => console.log(text)
     )

     Alert.alert(
         "Localisation",
        "Votre position à été mise à jour",
        [
            
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed')
            },
        ],
        { cancelable: false }
    );
    
  }

    

   render(){
    return(
        <Background>
             
                <View style={styles.container}>
                <Header>Mise à jour votre localisation </Header> 
                    <MapView 
                        style={styles.mapStyle} 
                        initialRegion={{
                        latitude: 35.5,
                        longitude: 9.483939,
                        latitudeDelta: 5,
                        longitudeDelta: 2
                        }}
                >
                 <Marker coordinate= {this.state}/>  
        </MapView>
        <Button mode="outlined" onPress={()=>this.UpdateLoc()}>
        Enregistrer
      </Button>
        
        </View>    
        
  </Background>
         
        )}
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
  
 