import React, { memo , useState,useEffect} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { DataTable } from 'react-native-paper';
import { SafeAreaView, StyleSheet,StatusBar, ScrollView, FlatList, Text, ActivityIndicator, View,Dimensions } from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import { Icon} from 'react-native-elements';

const GestionDesTaches = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [taches, setTaches] = useState([]);


  useEffect(() => {
    fetch(baseUrl+"taches")
      .then((response) => response.json())
      .then((json) => setTaches(json))
      .then(console.log(setTaches))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const Item = ({ title}) => (
    <View style={styles.View} >
      <Text style={styles.Text}>{title}</Text>
      <Icon 
      raised
      reverse
      name="trash"
      type="font-awesome"
      color="#FC2542"
      size={20}
      />
    </View>
  );
  
  const renderItem = ({item}) => (
    <Item 
    title={item.titre} 
   
    />
  );


    return(
    
    
    <Background>
       <BackButton goBack={() => navigation.navigate('Dashboard')} />
       
        <SafeAreaView style={styles.container}>
        <Header>Liste des taches</Header>
          <FlatList  
            data={taches}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
     
      </Background>)
    

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  View: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:'#F0E5F7',
    width:Dimensions.get('window').width
  },
  Text: {
    fontSize: 20,
    color: "black",
    padding:10
  },
});

export default memo(GestionDesTaches);    