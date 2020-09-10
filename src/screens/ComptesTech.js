import React, { memo ,useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Background from '../components/Background';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,ScrollView, FlatList, Text, View ,RefreshControl,TouchableOpacity } from 'react-native';
import {AfficheCompte} from './AfficheCompte';
import {AddCompteTech} from './AddCompteTech';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

const ComptesTech = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    //Ajoute
    let popupRef1=React.createRef()
  
    const onShowPopup1=()=>{
        popupRef1.show1()
    }

    const onClosePopup1=()=>{
        popupRef1.close1()
    }

    //AFFICHAGE
   
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
  
    useEffect(() => {
      fetch(baseUrl+"Tech")
        .then((response) => response.json())
        .then((json) => setUsers(json))
        .then(console.log(setUsers))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    Refresh=() => {
        fetch(baseUrl+"Tech")
          .then((response) => response.json())
          .then((json) => setUsers(json))
          .then(console.log(setUsers))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Refresh();
        wait(1000).then(() => setRefreshing(false));
      }, []);


    renderItem = ({ item }) => {
    
        return (
          
            <View  style={styles.rec}>
            <Text style={styles.recText} >{item.email}</Text>
            <TouchableOpacity style={styles.recDelete }>
              <Icon name="eye"
                size={24}
                color='white'
                onPress={this.GetItem.bind(this,item)}/>
                <AfficheCompte 
                title="Tech"
                ref={(target)=>popupRef=target}
                onTouchOutside={onClosePopup}
               />
            </TouchableOpacity>
          </View>
    
        )
      }

    return(
        
     <View style={styles.container}>
        <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View >
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            
          
        </View>
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
            <AddCompteTech 
            title="Demo Popup"
            ref={(target)=>popupRef1=target}
            onTouchOutside={onClosePopup1}
           
      />
           
                </View>
        </View>  
      
      )
    }

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
    }
      });

export default memo(ComptesTech);