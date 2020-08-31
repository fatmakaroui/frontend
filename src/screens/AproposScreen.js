import React, { memo} from 'react';
import Background from '../components/Background';
import { Card } from 'react-native-elements';
import {  ScrollView,  Text} from 'react-native';


const AproposScreen = ({ navigation }) => {
  
  return(
      <Background>
      <ScrollView>
		<Card title="Qui sommes-nous ?">
			<Text style={{ margin: 10, fontSize: 20 ,fontWeight: "bold"}}>
            Pionnier dans la mise en œuvre et la maintenance
            des réseaux de télécommunications.
			</Text>
            <Text style={{ margin: 10, fontSize: 16 }}>
            SOTETEL est un acteur de référence dans le domaine des télécommunications opérant depuis 1981 sur le marché tunisien et à l’étranger.
			</Text>
            <Text style={{ margin: 10, fontSize: 16,color: "#cc0066" ,fontWeight: "bold"}}>
            - Bâtisseur des réseaux
			</Text>
            <Text style={{ margin: 10, fontSize: 16}}>
            SOTETEL est le bâtisseur des réseaux et des services de télécommunications. Ses activités couvrent l’infrastructure des réseaux fixes, radioélectriques et mobiles, l’infrastructure des réseaux convergents, les solutions des communications, les applications métiers et les solutions d’accès unifiés et d’intelligence.
			</Text>
            <Text style={{ margin: 10, fontSize: 16,color: "#cc0066" ,fontWeight: "bold"}}>
            - Intégrateur de solutions digitales
			</Text>
            <Text style={{ margin: 10, fontSize: 16}}>
            SOTETEL est l’intégrateur de solutions digitales et de services à fortes valeurs ajoutées opérant dans une logique d’innovation technologique et d’amélioration continue.
			</Text>
		</Card>
        </ScrollView>
      </Background>
      )
};

export default memo(AproposScreen);