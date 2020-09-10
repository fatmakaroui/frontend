import React, { memo ,useEffect, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';

import Button from '../components/Button';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../shared/baseUrl';


const Dashboard2 = ({ navigation }) => {
  const [email,setEmail] = useState("loading")
  const [isLoading, setLoading] = useState(true);
  const [taches, setTaches] = useState([]);


  const Boiler = async ()=>{
     const token = await AsyncStorage.getItem("token")
   fetch(baseUrl,{
   headers:new Headers({
     Authorization:"Bearer "+token
    
   })
   }).then(res=>res.json())
   .then(async (data)=>{
     console.log(data)
     setEmail(data.email)
     await AsyncStorage.setItem('email',data.email)
   
   }
   )
  }
  

useEffect(()=>{
  Boiler()
  
},[])



return(<Background>
  <Logo />
 
  <Button mode="outlined" onPress={() => navigation.navigate('GTachesTechNavigator')}>
        Gestion des Taches
      </Button>
  <Button mode="outlined" onPress={() => navigation.navigate('LocalisationTechNavigator')}>
        localisation
      </Button>
  
</Background>)

};

export default memo(Dashboard2);
