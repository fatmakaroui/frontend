import React, { memo, useState } from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableOpacity, Alert } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { baseUrl } from '../shared/baseUrl';
import {
  emailValidator,
  passwordValidator,
  nomValidator,
  cinValidator,
} from '../core/utils' ;
import AsyncStorage from '@react-native-community/async-storage';




const RegisterScreen = ({ navigation }) => {
  const [nom, setNom] = useState({ value: '', error: '' });
  const [prenom, setPrenom] = useState({ value: '', error: '' });
  const [cin, setCin] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  
  
  
  const _onSignUpPressed = () => {
    const nomError = nomValidator(nom.value);
    const prenomError = nomValidator(prenom.value);
    const cinError = cinValidator(cin.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nomError||prenomError||cinError) {
      setName({ ...nom, error: nomError });
      setName({ ...prenom, error: prenomError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setName({ ...cin, error: cinError });
      return;
    }
   
    sendCred();
    
  };


  sendCred=()=>{
    fetch(baseUrl+"signup",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email.value,
       "password":password.value,
       "cin":cin.value,
       "nom":nom.value,
       "prenom":prenom.value,
     })
    })
    .then(res=>res.json())
    .then( data=>{
        console.log(data)
        navigation.navigate('LoginNavigator');
            
    });
  }
  return (
    <Background>
      <ScrollView>

      <Header>Demander un Compte</Header>

      <TextInput
        label="Nom"
        returnKeyType="next"
        value={nom.value}
        onChangeText={text => setNom({ value: text, error: '' })}
        error={!!nom.error}
        errorText={nom.error}
      />

      <TextInput
        label="Prenom"
        returnKeyType="next"
        value={prenom.value}
        onChangeText={text => setPrenom({ value: text, error: '' })}
        error={!!prenom.error}
        errorText={prenom.error}
      />

      <TextInput
        label="Cin"
        returnKeyType="next"
        value={cin.value}
        onChangeText={text => setCin({ value: text, error: '' })}
        error={!!cin.error}
        errorText={cin.error}
      />

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

      <Button mode="contained" onPress={()=> _onSignUpPressed()} style={styles.button}>
        Envoyer
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Vous avez déjà un compte? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginNavigator')}>
          <Text style={styles.link}>S'identifier</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
