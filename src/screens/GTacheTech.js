import React, { memo ,useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,ScrollView, FlatList,Alert, Text, View ,Modal ,TouchableHighlight,RefreshControl,TouchableOpacity } from 'react-native';
import {AfficheTacheTech} from './AfficheTacheTech';
import AsyncStorage from '@react-native-community/async-storage';
import {SuppTacheTech} from './SuppTacheTech';
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const GTacheTech = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [taches, setTaches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  

  let popupRef=React.createRef()
  
  const onShowPopup=(item)=>{
    popupRef.show(item)
  }

  const onClosePopup=()=>{
    popupRef.close()
  }
  //supprimer tache

  let popupRef1=React.createRef()
  
  const onShowPopup1=(item)=>{
    popupRef1.show(item)
  }

  const onClosePopup1=()=>{
    popupRef1.close()
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

  updateRec=(item)=>{
    fetch(baseUrl+"recs/"+item.idRec,{
        method:"PUT",
        headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({
         "etat.type":"Fini",   
       })
      })
      .then(res=>res.text())
      .then(text => console.log(text)
     )
             
           
  }

  updateTache=(item)=>{
    fetch(baseUrl+"taches/"+item._id,{
      method:"PUT",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "etat.type":"Fini"
       
     })
    })
    .then(res=>res.text())
    .then(text => console.log(text),
    this.updateRec(item))
           
  }

  SuppItem=(item)=> {
    popupRef1.show(item)
  }

  
  renderItem = ({ item }) => {
    
    return (
      
      <View style={styles.rec}>
        <Text style={styles.recText} >{item.date}</Text>
        <Text style={styles.recText}>{item.nom}</Text>
        <Text style={styles.recText}>-{item.description}</Text>
        <TouchableOpacity style={styles.recVoir }>
          <Icon name="eye"
            size={24}
            color='white'
            onPress={this.GetItem.bind(this,item)}/>
            <AfficheTacheTech
            title="TacheTech"
            ref={(target)=>popupRef=target}
            onTouchOutside={onClosePopup}
           />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recAccepter }>
          <Icon name="check"
            size={24}
            color='white'
            onPress={this.updateTache.bind(this,item)}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recRefuser }>
          <Icon name="trash"
            size={24}
            color='white'
            onPress={this.SuppItem.bind(this,item)}
            />
             <SuppTacheTech
            
            ref={(target)=>popupRef1=target}
            onTouchOutside={onClosePopup1}
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
recVoir: {
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#00b33c',
  padding: 10,
  top: 10,
  bottom: 10,
  right: 50
},
recAccepter: {
position: 'absolute',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#66a3ff',
padding: 10,
top: 10,
bottom: 10,
right: 95
},
recRefuser: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff3333',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
},

});
export default memo(GTacheTech);
