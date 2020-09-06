import React, { memo , useState,useEffect} from 'react';
import {TouchableOpacity,StyleSheet, ScrollView, FlatList, Text, View,Dimensions } from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AfficheRec} from './AfficheRec';
const GestionDesTaches = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [taches, setTaches] = useState([]);


  let popupRef=React.createRef()
  
  const onShowPopup=(item)=>{
    popupRef.show(item)
  }

  const onClosePopup=()=>{
    popupRef.close()
  }

  useEffect(() => {
    fetch(baseUrl+"taches")
      .then((response) => response.json())
      .then((json) => setTaches(json))
      .then(console.log(setTaches))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>Pas des taches</Text>
      </View>
    );
  };
  GetItem=(item)=> {
    popupRef.show(item)
  }
 

  
  renderItem = ({ item }) => {
    
    return (
      
      <View key={item.id} style={styles.rec}>
        <Text style={styles.recText} >{item.date}</Text>
        <Text style={styles.recText}>{item.nom}</Text>
        <Text style={styles.recText}>-{item.description}</Text>
        <TouchableOpacity style={styles.recDelete }>
          <Icon name="eye"
            size={24}
            color='white'
            onPress={this.GetItem.bind(this,item)}/>
            <AfficheRec 
            title="Taches"
            ref={(target)=>popupRef=target}
            onTouchOutside={onClosePopup}
           />
        </TouchableOpacity>
      </View>

    )
  }



    return(

        <ScrollView style={styles.scrollContainer}>
      
          <FlatList
            data={taches}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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


export default memo(GestionDesTaches);    