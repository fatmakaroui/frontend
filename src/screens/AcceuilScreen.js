import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const AcceuilScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Bienvenue Acceuil</Header>

    <Paragraph>
    SOTETEL est un acteur de référence dans le domaine des télécommunications opérant depuis 1981 sur le marché tunisien et à l’étranger.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(AcceuilScreen);