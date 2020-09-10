import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View,Alert } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { baseUrl } from '../shared/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    sendCred();
    
  };


  sendCred=async (props)=>{
    fetch(baseUrl+"signin",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email.value,
       "password":password.value
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
      try {
        await AsyncStorage.setItem('token',data.token)
        if (data.type=="Admin"){
        navigation.navigate('DashboardNavigator');}
        else if(data.type=="Tech"){
          navigation.navigate('Dashboard2Navigator');  
        }
        else if(data.type=="Vérifier"){
          navigation.navigate('DashboardClientNavigator');  
        }
        else if(data.type=="non vérifier"){
          Alert('votre compte n\'est pas encore vérifier');
        }
      } catch (e) {
        console.log("error hai",e)
        setEmail({ ...email, error:"vérifier email ou mote de passe"});
        setPassword({ ...password,error:"vérifier email ou mote de passe"});
      }
      
            
    });
  }

  return (
    <Background>

      <Logo />

      <Header>Bienvenue</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
      S'identifier
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Vous n’avez pas de compte? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterNavigator')}>
          <Text style={styles.link}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
