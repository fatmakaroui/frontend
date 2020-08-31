import React, { memo} from 'react';
import Background from '../components/Background';
import { Card } from 'react-native-elements';
import {  ScrollView,  Text} from 'react-native';


const AboutScreen = ({ navigation }) => {
  
  return(
      <Background>
      <ScrollView>
		<Card title="Historique & dates clès">
			<Text style={{ margin: 10, fontSize: 16 }}>
			    1981- Création de SOTETEL{'\n\n'}
				1995- Signature de la Convention collective particulière de l’entreprise.{'\n\n'}
				1996- Transfert au nouveau siège social à Charguia 2.
				Mise en place du centre de formation « Sadok Ghannouchi » SOTETEL-NEC.{'\n\n'}
                1998- Introduction à la Bourse des Valeurs Mobilières de Tunis- BVMT{'\n\n'}
				1999- Changement du Logo SOTETEL.
				Certification ISO 9001.
				Décentralisation et Ouverture d’un pôle régional à Sousse et à Sfax.
				Mérite international de développement des communications par l’IIPP-Genève.{'\n\n'}
				2001- Décentralisation et Ouverture d’un pôle régional à Medenine.
				Prix présidentiel national du progrès social .{'\n\n'}
				2003- Certification GASP-ERICSSON (Global Agreement Services Provider) pour la coopération triangulaire à l’international{'\n\n'}
				2004- Ouverture de SOTETEL-Branch Lybie.{'\n\n'}
				2007- Instauration de la nouvelle gouvernance et dissociation entre les fonctions du président du conseil d’administration et le directeur général.
				Mise en place d’un nouveau ERP.
				Première révision de la Convention collective particulière de l’entreprise.{'\n\n'}
				2009- Première restructuration de l’entreprise.
				Certification CISCO et partenariat « PREMIUM »	{'\n\n'}
				2011- Certification CISCO et partenariat « SILVER ».
				Deuxième révision de la Convention collective particulière de l’entreprise.
				Première élection pour le choix des administrateurs représentants les petits porteurs actionnaires en bourse.	{'\n\n'}
				2012- Renouvellement Certification CISCO et partenariat « SILVER » .
				Signature de partenariat avec DB Algeria Tech, filiale du Groupe Telnet.{'\n\n'}
				2013- Signature de partenariat avec « SIAE-Italy »	{'\n\n'}
				2015- Deuxième restructuration de l’entreprise. {'\n\n'}
				2016- Mission d’étude de marché & positionnement de l’entreprise.
				Accréditation du centre de formation{'\n\n'}
				2017- Certification HP Business Partner.
				Ouverture d’une succursale « SOTETEL-MALTE ».
				Instauration d’un système de gestion de flotte.{'\n\n'}
				2018- Certification HUAWEI et partenariat « SILVER ».
				Création du SPA SOTETEL-Algérie.
				Certification ISO 9001 : 2015.
				Signature de partenariat SOTETEL-TMI.
				Instauration d’un système de surveillance et de contrôle d’accès.
				Mise en place d’un nouvel outil PPM.
			</Text>
		</Card>
        </ScrollView>
      </Background>
      )
};

export default memo(AboutScreen);