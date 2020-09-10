import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';

import Button from '../components/Button';



const GestionDesComptes = ({ navigation }) => {
 

  return(<Background>
    <Logo />
   
    <Button mode="outlined" onPress={() => navigation.navigate('CompteTechNavigator')}>
         Comptes techniciens
        </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('CompteClientNavigator')}>
          Compte Client
       </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('CompteClientNVNavigator')}>
          Client non vérifier
       </Button>
  </Background>)

};

export default memo(GestionDesComptes);
