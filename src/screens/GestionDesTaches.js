import React, { memo , useState,useEffect} from 'react';
import {TouchableOpacity,StyleSheet, ScrollView,RefreshControl ,FlatList, Text, View,Dimensions } from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AfficheRecAdmin} from './AfficheTacheAdmin';
import {AddTacheAdmin} from './AddTacheAdmin';
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const GestionDesTaches = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [taches, setTaches] = useState([]);

//affichage
  let popupRef=React.createRef()
  
  const onShowPopup=(item)=>{
    popupRef.show(item)
  }

  const onClosePopup=()=>{
    popupRef.close()
  }

  //Ajoute
  let popupRef1=React.createRef()
  
  const onShowPopup1=(item)=>{
    popupRef1.show(item)
  }

  const onClosePopup1=()=>{
    popupRef1.close()
  }

  useEffect(() => {
    fetch(baseUrl+"taches/rechTech/not defined")
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
 
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Refresh();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  Refresh=() => {
    fetch(baseUrl+"taches/rechTech/not defined")
      .then((response) => response.json())
      .then((json) => setTaches(json))
      .then(console.log(setTaches))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }
  

  
  renderItem = ({ item }) => {
    
    return (
      
      <View  style={styles.rec}>
        <Text style={styles.recText} >{item.date}</Text>
        <Text style={styles.recText}>{item.nom}</Text>
        <Text style={styles.recText}>-{item.description}</Text>
        <TouchableOpacity style={styles.recDelete }>
          <Icon name="eye"
            size={24}
            color='white'
            onPress={this.GetItem.bind(this,item)}/>
            <AfficheRecAdmin 
            title="Tache"
            ref={(target)=>popupRef=target}
            onTouchOutside={onClosePopup}
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
        }
        >
      
          <FlatList
            data={taches}
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
            onPress={onShowPopup1}
            />
            <AddTacheAdmin 
            title={"add"}
            ref={(target)=>popupRef1=target}
            onTouchOutside={onClosePopup1}
           
      />
      </View>
        </View>
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
},
Icon: {
  alignSelf:'flex-end',
  position: 'absolute',
  bottom: 10,
  right: 10
},
});


export default memo(GestionDesTaches);    