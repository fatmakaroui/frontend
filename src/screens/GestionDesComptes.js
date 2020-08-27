import React, { memo} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

const GestionDesComptes = ({ navigation }) => {
    return(<Background>
       <BackButton goBack={() => navigation.navigate('Dashboard')} />
        <Logo />
        <Header>Let’s start</Header>
        <Paragraph>
          Your amazing app starts here. Open you favourite code editor and start
          editing this project.
        </Paragraph>
  
      </Background>)
    

};

export default memo(GestionDesComptes);    