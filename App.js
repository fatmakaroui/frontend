import React,{useEffect,useState} from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import AsyncStorage from '@react-native-community/async-storage';


const Main = () => {
  const [isloggedin,setLogged] = useState(null)
  const detectLogin= async ()=>{
     const token = await AsyncStorage.getItem('token')
     if(token){
         setLogged(true)
     }else{
         setLogged(false)
     }
  }
 useEffect(()=>{
    detectLogin()
 },[])


  return(
   
  <Provider theme={theme}>
    <App />
  </Provider>

)};

export default Main;
