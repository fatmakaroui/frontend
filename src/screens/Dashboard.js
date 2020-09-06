import React, { memo ,useEffect, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../shared/baseUrl';


const Dashboard = ({ navigation }) => {
  const [email,setEmail] = useState("loading")
  const Boiler = async ()=>{
     const token = await AsyncStorage.getItem("token")
   fetch(baseUrl,{
   headers:new Headers({
     Authorization:"Bearer "+token
    
   })
   }).then(res=>res.json())
   .then(data=>{
     console.log(data)
     setEmail(data.email)
   }
   )
  }
useEffect(()=>{
  Boiler()
},[])



  return(<Background>
    <Logo />
   
    <Button mode="outlined" onPress={() => navigation.navigate('GTachesNavigator')}>
          Gestion des Taches
        </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('VerifRScreen')}>
          Verifier les réclamations
       </Button>
  </Background>)

};

export default memo(Dashboard);
