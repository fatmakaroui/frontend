import React, { memo ,useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,ScrollView, FlatList,Alert, Text, View  ,RefreshControl,TouchableOpacity } from 'react-native';
import {AfficheRec} from './AfficheRec';
import AsyncStorage from '@react-native-community/async-storage';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const GTacheTech = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [taches, setTaches] = useState([]);
  
  

  let popupRef=React.createRef()
  
  const onShowPopup=(item)=>{
    popupRef.show(item)
  }

  const onClosePopup=()=>{
    popupRef.close()
  }

  const GetTache = async ()=>{
    const email = await AsyncStorage.getItem("email")
    console.log(email)
    fetch(baseUrl+"taches/rechTech/"+email)
      .then((response) => response.json())
      .then((json) => setTaches(json))
      .then(console.log(setTaches))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    GetTache()
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Refresh();
    wait(1000).then(() => setRefreshing(false));
  }, []);
  
  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>Pas de réclamations</Text>
      </View>
    );
  };
  GetItem=(item)=> {
    popupRef.show(item)
  }
 
  Refresh=() => {
    fetch(baseUrl+"recs/rech/non consulté")
    .then((response) => response.json())
    .then((json) => setReclamations(json))
    .then(console.log(setReclamations))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  
  renderItem = ({ item }) => {
    
    return (
      
      <View style={styles.rec}>
        <Text style={styles.recText} >{item.date}</Text>
        <Text style={styles.recText}>{item.nom}</Text>
        <Text style={styles.recText}>-{item.description}</Text>
        <TouchableOpacity style={styles.recDelete }>
          <Icon name="eye"
            size={24}
            color='white'
            onPress={this.GetItem.bind(this,item)}/>
            <AfficheRec 
            title="TacheTech"
            ref={(target)=>popupRef=target}
            onTouchOutside={onClosePopup}
           />
        </TouchableOpacity>
      </View>

    )
  }



    return(

        <ScrollView style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      
          <FlatList
            data={taches}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={ListEmpty}
          >
            
          </FlatList>
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
export default memo(GTacheTech);