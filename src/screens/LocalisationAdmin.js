import React, {Component, useState} from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import {  StyleSheet,ScrollView, View,Alert, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { baseUrl } from '../shared/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../components/Header';


export default class LocalisationAdmin extends Component {

    

   constructor(props){
       super(props);
    this.state={
       
      data:[{'_id':1,
          'localisation':{
              'latitude':35,
              'longitude':10
          },
          'nom':'test',
          'email':'test@gmail.tn'
      }],
    };
}


componentDidMount(){
   
    fetch(baseUrl+"Tech")
    .then(response => response.json())
    .then(data => this.setState({data}))
    .then(console.log(this.state.data))
    .catch((error) => console.error(error))
    
    };
  
    

   render(){
    return(
        <Background>
             
                <View style={styles.container}>
                <Header>Localisations des techniciens </Header> 
                
                    <MapView
                        style={styles.mapStyle} 
                        initialRegion={{
                        latitude: 35.5,
                        longitude: 9.483939,
                        latitudeDelta: 5,
                        longitudeDelta: 2
                        }}
                            >
                    {this.state.data.map(marker => (
                        <Marker
                        key={marker._id}
                        coordinate={marker.localisation}
                        title={marker.nom}
                        description={marker.email}
                        />
                    ))}
                    </MapView>
        
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
  
 