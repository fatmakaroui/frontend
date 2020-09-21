import React, { memo ,useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,ScrollView, FlatList,Alert, Text, View  ,RefreshControl,TouchableOpacity } from 'react-native';
import {AfficheRec} from './AfficheRec';
import { Vibration } from 'react-native';


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const VerifReclamation = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [reclamations, setReclamations] = useState([]);
 
  

  let popupRef=React.createRef()
  
  const onShowPopup=(item)=>{
    popupRef.show(item)
  }

  const onClosePopup=()=>{
    popupRef.close()
  }

 
  

  useEffect(() => {
    var start = new Date();
    var s = start.getMilliseconds();
    
    fetch(baseUrl+"recs/rech/non consulté")
      .then((response) => response.json())
      .then((json) => {setReclamations(json);
       console.log("Number of item:"+json.length)})
      .then(console.log(setReclamations))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      var fin = new Date();
    var f = fin.getMilliseconds();
    
     var  timeTaken= f-s
      console.log('the fetch get http://localhost:3000/recs take :'+timeTaken+'ms')
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
            title="Réclamation"
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
            data={reclamations}
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
export default memo(VerifReclamation);
