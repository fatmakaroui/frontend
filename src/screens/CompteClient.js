import React, { memo ,useEffect, useState } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,ScrollView, FlatList, Text, View ,TouchableOpacity } from 'react-native';
import {AfficheCompte} from './AfficheCompte';

const CompteClient = ({ navigation }) => {
  
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

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
      fetch(baseUrl+"ClV")
        .then((response) => response.json())
        .then((json) => setUsers(json))
        .then(console.log(setUsers))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
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
            title="Compte"
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
            data={users}
            renderItem={renderItem}
            keyExtractor={item => item._id}
      
          >
            
          </FlatList>
        </ScrollView>
       
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
      }
      });

export default memo(CompteClient);