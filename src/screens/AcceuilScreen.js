import React, { memo,useState ,useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Card } from 'react-native-elements';
import {  ScrollView, FlatList, Text} from 'react-native';
import { baseUrl } from '../shared/baseUrl';

const AcceuilScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [pubs, setPubs] = useState([]);

  useEffect(() => {
    fetch(baseUrl+"pubs")
      .then((response) => response.json())
      .then((json) => setPubs(json))
      .then(console.log(setPubs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({item}) => (
    <Card
                    featuredTitle={item.titre}
          
                    image={require('../assets/4.jpg')}>
                    
                    <Text
                        style={{margin: 10,color: '#C207D8'}}>
                          {item.date}
                        </Text>
                    <Text
                        style={{margin: 10}}>
                         
                        {item.description}</Text>
                </Card>
  );
  

  return(
      <Background>
        <ScrollView>
        <FlatList  
                data={pubs}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
        </ScrollView>
      </Background>
      )
};

export default memo(AcceuilScreen);