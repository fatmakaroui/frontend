import{Modal,TouchableWithoutFeedback,Button,StyleSheet,View,Text} from 'react-native'
import React ,{Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import MapView, {Marker} from 'react-native-maps'; 

import { baseUrl } from '../shared/baseUrl';



export class AfficheTacheTech extends Component{

    
    constructor(props){
        super(props)
        this.state={
            
            latitude:36.799611,
            longitude : 10.20,
            erreur:null,
            show:false,
            technicien:[],
            tache:[],
            etat:[{type:''}],
         
        }
    }

  
  
    

    show=(item)=>{
        this.setState({show:true,
            
            tache:item,
            etat:item.etat,
           latitude:item.localisation.latitude,
           longitude:item.localisation.longitude,
        data:[]})
      
        
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
                                <Text style={styles.modalText}>Etat : {this.state.etat.type}</Text>
                                <Text style={styles.modalText}> Localisation :</Text>

                                <MapView 
                                style={styles.mapStyle} 
                                initialRegion={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.025,
                                longitudeDelta: 0.05
                                }}
                                >
                                        <Marker coordinate= {this.state} pinColor = {"green"}/>
                                       
                                </MapView>

                            
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
        height: 300,
        left:15
      },
});