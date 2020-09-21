import React, { memo ,useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,ScrollView, FlatList,Alert, Text, View  ,RefreshControl,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AddReclamation} from './AddReclamation';
import {AfficheRec} from './AfficheRec';
import {Evaluation} from './Evaluation';

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
  const [token, setToken] = useState('');
   //Affiche
   let popupRef1=React.createRef()
  
   const onShowPopup1=()=>{
       popupRef1.show1()
   }

   const onClosePopup1=()=>{
       popupRef1.close1()
   }
   //Evaluation
   let popupRef2=React.createRef()
  
   const onShowPopup2=()=>{
       popupRef2.show2()
   }

   const onClosePopup2=()=>{
       popupRef2.close2()
   }

   //Ajoute
  
   let popupRef=React.createRef()
 
   const onShowPopup=(item)=>{
     popupRef.show(item)
   }
 
   const onClosePopup=()=>{
     popupRef.close()
   }
   GetItem=(item)=> {
       popupRef.show(item)
     }  

  const Boiler = async ()=>{
     const token = await AsyncStorage.getItem("token")
   fetch(baseUrl,{
   headers:new Headers({
     Authorization:"Bearer "+token
    
   })
   }).then(res=>res.json())
   .then(async(data)=>{await AsyncStorage.setItem('email',data.email),
    console.log(email)
     GetRecs(data.email)
   })
  
 
  }
  GetItem=(item)=> {
    popupRef1.show1(item)
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
    .then(text => console.log(text));
    onRefresh()

  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Boiler();
    wait(1000).then(() => setRefreshing(false));
  }, []);

renderItem = ({ item }) => {
    
    return (
      
      <View style={styles.rec}>
        <Text style={styles.recText}>{item.nom}</Text>
        <Text style={styles.recText}>-{item.description}</Text>
        <Text style={styles.recText}>Etat : {item.etat.type} {item.etat.commentaire}</Text>
        <TouchableOpacity style={styles.recVoir }>
            <Icon name="eye"
            size={24}
            color='white'
            onPress={this.GetItem.bind(this,item)}
            />
             <AfficheRec 
            title="RéclamationC"
            ref={(target)=>popupRef1=target}
            onTouchOutside={onClosePopup1}
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
    <View style={styles.container}>
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
    </ScrollView>
    <View style={styles.Icon}>
            <Icon 
            raised
            reverse
            name="plus-circle" 
            type="font-awesome" 
            size={80} 
            color={'#512DA8'} 
            onPress={onShowPopup}
            />
            <AddReclamation  
            title={token}
            ref={(target)=>popupRef=target}
            onTouchOutside={onClosePopup}
           
      />
           
                </View>
                <View style={styles.Icon2}>
            <Icon 
            raised
            reverse
            name="comment" 
            type="font-awesome" 
            size={60} 
            color={'#512DA8'} 
            onPress={onShowPopup2}
            />
            <Evaluation 
            title="Evaluation"
            ref={(target)=>popupRef2=target}
            onTouchOutside={onClosePopup2}
           
      />
           
                </View>          
    </View>)

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
},
Icon: {
  alignSelf:'flex-end',
  position: 'absolute',
  bottom: 10,
  right: 10
},
Icon2: {
  alignSelf:'flex-end',
  position: 'absolute',
  bottom: 20,
  left: 20
}
  });
export default memo(DashboardClient);
