import React, { memo ,useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,ScrollView, FlatList, Text, View ,TouchableOpacity } from 'react-native';

const VerifReclamation = ({ navigation }) => {
 
  const [isLoading, setLoading] = useState(true);
  const [reclamations, setReclamations] = useState([]);
  
  

  useEffect(() => {
    fetch(baseUrl+"recs")
      .then((response) => response.json())
      .then((json) => setReclamations(json))
      .then(console.log(setReclamations))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  

  
  renderItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.rec}>
        <Text style={styles.recText}>{item.date}</Text>
        <Text style={styles.recText}>{item.nom}</Text>
        <Text style={styles.recText}>-{item.description}</Text>
        <TouchableOpacity style={styles.recDelete }>
          <Icon name="eye"
            size={24}
            color='white'/>

        </TouchableOpacity>
      </View>

    )
  }



    return(

        <ScrollView style={styles.scrollContainer}>
      
          <FlatList
            data={reclamations}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </ScrollView>
       
      )
    

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  rec: {
    position: 'relative',
    padding: 20,
    paddingRight:100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
},
recText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#cc3399',
    fontWeight: "bold"
},
recDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009933',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
}
});
export default memo(VerifReclamation);
