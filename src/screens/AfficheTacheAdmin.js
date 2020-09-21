import{Modal,Dimensions,TouchableWithoutFeedback,Picker,Button,StyleSheet,View,Text,Image} from 'react-native'
import React ,{Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import MapView, {Marker} from 'react-native-maps'; 

import { baseUrl } from '../shared/baseUrl';



export class AfficheRecAdmin extends Component{

    
    constructor(props){
        super(props)
        this.state={
            
            latitude:36.799611,
            longitude : 10.20,
            erreur:null,
            show:false,
            technicien:[],
            tache:[],
            data:[]
        }
    }

  
  
    

    show=(item)=>{
        this.setState({show:true,
            
            tache:item,
           latitude:item.localisation.latitude,
           longitude:item.localisation.longitude,
        data:[]})
        fetch(baseUrl+"Tech")
        .then(response => response.json())
        .then(data => this.setState({data}))
        .then(console.log(this.state.data))
        .catch((error) => console.error(error))
        console.log(this.state.tache)
        
    }

    close=()=>{
        
        this.setState({show:false})
    }

    renderOutsideTouchable(onTouch){
         const view=<View style={{flex:1,width:'100%'}}/>
         if(!onTouch)return view
         return(
             <TouchableWithoutFeedback onPress={onTouch} style={{flex:1,width:'100%'}}>
                 {view}
             </TouchableWithoutFeedback>
         )

    }

    
    

    renderSeparator = () =>{
     return( <View
             style={{
                 opacity: 0.1,
                 backgroundColor: '#182E44',
                 height:1
             }}
            />)
    }

    updateRec=()=>{
        fetch(baseUrl+"recs/"+this.state.tache.idRec,{
            method:"PUT",
            headers: {
             'Content-Type': 'application/json'
           },
           body:JSON.stringify({
             "etat.type":"En cours",   
           })
          })
          .then(res=>res.text())
          .then(text => console.log(text)
         )
                 
               
      }
   
    updateTache=()=>{
        fetch(baseUrl+"taches/"+this.state.tache._id,{
          method:"PUT",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "emailTech":this.state.technicien,
           "etat.type":"En cours"
           
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text),
        this.updateRec(),
               this.close() )
               
      }
   
  
      //list des techniciens
      renderItem = () =>{
      
        return( this.state.data.map( (item) => { 
              return( <Picker.Item label={item.prenom+' '+item.nom} key={item._id} value={item.email}  />)} ));
    }
   
   

    render() {
        let{show
        }=this.state
       
        const {onTouchOutside}=this.props

        return(
            
            <Modal
            animationType={'fade'}
            transparent={true}
            visible={show}
            onRequestClose={this.close}>
                <ScrollView>
                <View style={{
                    flex:1,
                    backgroundColor:'#000000AA',
                    justifyContent:'flex-end'}}
                    >
                        {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={styles.modal}

                                >
                                <Text style={styles.modalTitle}>Tache</Text>   
                                <Text style={styles.modalText} >Nom et prénom :{this.state.tache.nom}</Text>
                                <Text style={styles.modalText}>Cin : {this.state.tache.cin}</Text>
                                <Text style={styles.modalText}>Email : {this.state.tache.email}</Text>
                                <Text style={styles.modalText}>Date : {this.state.tache.date}</Text>
                                <Text style={styles.modalText}>Description : {this.state.tache.description}</Text>
                                <View style={styles.formRow}>
                                <Text style={styles.modalText} >Technicien: </Text>
                                <Picker
                                    style={styles.formItem}
                                    selectedValue={this.state.data}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ technicien: itemValue })}
                                >
                                {this.renderItem()}
                                </Picker>
                                </View>
                                <Text style={styles.modalText}> Localisation :</Text>

                                <MapView 
                                style={styles.mapStyle} 
                                initialRegion={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 1,
                                longitudeDelta: 2
                                }}
                                >
                                        <Marker coordinate= {this.state} pinColor = {"green"}/>
                                        {this.state.data.map(marker => (
                                                <Marker
                                                keyExtractor={marker._id}
                                                coordinate={marker.localisation}
                                                title={marker.nom}
                                                description={marker.email}
                                                />
                                            ))}  
                                </MapView>

                                <Button onPress={()=> this.updateTache()} color="#512DA8" title="Envoyer" />
                                <Button onPress={() => this.close()} color="#6c757d" title="Annuler" />  
                                </View>
                        
                    </View>
                    </ScrollView>
            </Modal>
           
        )
    }
}

const styles = StyleSheet.create({
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20,
	},
	
	
	formItem: {
		flex: 1,
	},
	modal: {
		justifyContent: 'center',
        margin: 20,
        backgroundColor:'#FFFFFF'
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: '#512DA8',
		textAlign: 'center',
		color: 'white',
		marginBottom: 20,
	},
	modalText: {
		fontSize: 18,
		margin: 10,
    },
    mapStyle: {
        flex:1,
        width: 280,
        height: 200,
        left:15
      },
});