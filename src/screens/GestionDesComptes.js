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
          Comptes Clients
       </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('CompteClientNVNavigator')}>
          Clients non vérifier
       </Button>
  </Background>)

};

export default memo(GestionDesComptes);
