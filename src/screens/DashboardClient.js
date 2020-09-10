import React, { memo ,useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,ScrollView, FlatList,Alert, Text, View  ,RefreshControl,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }


const DashboardClient = ({ navigation }) => {
const [refreshing, setRefreshing] = useState(false);
  const [email,setEmail] = useState("loading")
  const [reclamations, setReclamations] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const Boiler = async ()=>{
     const token = await AsyncStorage.getItem("token")
   fetch(baseUrl,{
   headers:new Headers({
     Authorization:"Bearer "+token
    
   })
   }).then(res=>res.json())
   .then(data=>{
     console.log(data.email)
     setEmail(data.email)
     
     GetRecs(data.email)
   }
   )
  }

  const GetRecs =  (email)=>{
    fetch(baseUrl+"recs/rechE/"+email)
      .then((response) => response.json())
      .then((json) => setReclamations(json))
      .then(console.log(reclamations))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

 }



useEffect(()=>{
  Boiler()
  
},[])

ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>Pas de réclamations</Text>
      </View>
    );
  };

  DelRec=(item)=>{
    fetch(baseUrl+"recs/"+item._id,{
      method:"Delete",
      headers: {
       'Content-Type': 'application/json'
     },
    })
    .then(res=>res.text())
    .then(text => console.log(text))

  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetRecs();
    wait(1000).then(() => setRefreshing(false));
  }, []);

renderItem = ({ item }) => {
    
    return (
      
      <View style={styles.rec}>
        <Text style={styles.recText}>{item.nom}</Text>
        <Text style={styles.recText}>-{item.description}</Text>
        <Text style={styles.recText}>Etat : {item.etat}</Text>
        <TouchableOpacity style={styles.recVoir }>
            <Icon name="eye"
            size={24}
            color='white'
            //onPress={this.GetItem.bind(this,item)}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recDelete }>
          <Icon name="trash"
            size={24}
            color='white'
            onPress={this.DelRec.bind(this,item)}
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
        data={reclamations}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={ListEmpty}
      >
        
      </FlatList>
    </ScrollView>)

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
  recVoir: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00b33c',
      padding: 10,
      top: 10,
      bottom: 10,
      right: 60
  },
  recDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff3333',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
}
  });
export default memo(DashboardClient);
