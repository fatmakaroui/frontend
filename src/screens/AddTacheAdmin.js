import{Modal,Dimensions,TouchableWithoutFeedback,Button,Picker,StyleSheet,View,Text,Image} from 'react-native'
import React ,{Component ,setState} from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import {  Icon, Input} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {Marker} from 'react-native-maps'; 
import {
    emailValidator,
    nomValidator,
    numeroValidator,
    cinValidator,
    localisationValidator,
    descriptionValidator
  } from '../core/utils' ;

import { baseUrl } from '../shared/baseUrl';
const deviceHeight=Dimensions.get("window").height


export class AddTacheAdmin extends Component{

    
    constructor(props){
        super(props)
        this.state={
            
            latitude:36.799611,
            longitude : 10.20,
             erreur:null,
            show:false,
            nom:'',
            nomErreur:'',
           
            numero: '',
            numeroErreur:'',
            email:'',
            emailErreur:'',
            description: '',
            descriptionErreur:'',
            localisation: '',
            localisationErreur:'',
            data:[]
        }
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(position =>{
            this.setState({
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,
        erreur: null
        });
      
    
        erreur => this.setState({ error: error.message}),
        {enableHighAccuracy: true , timeout:20000, maximumAge: 2000}
    });
    }
  
    

    show=()=>{
        this.setState({show:true,
            nom:'',
            nomErreur:'',
            
            numero: '',
            numeroErreur:'',
            email:'',
            emailErreur:'',
            description: '',
            descriptionErreur:'',
            technicien:[],
           
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

    AddTache=()=>{
        fetch(baseUrl+"taches",{
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "nom":this.state.nom,
           "email":this.state.email,
           "cin":11111111,
           "numero":this.state.numero,
           "description":this.state.description,
           "localisation.latitude":this.state.latitude,
           "localisation.longitude":this.state.longitude,
           "emailTech":this.state.technicien,
           "etat":"En cours"
         })
        })
        .then(res=>res.json())
        .then( data=>{
            console.log(data)
            this.close();
                
        });
      }
    
    
    AddRec = () => {
        const nomError = nomValidator(this.state.nom);
        const emailError = emailValidator(this.state.email);
    
        const numeroError = numeroValidator(this.state.numero);
        const descriptionError = descriptionValidator(this.state.description);
       
        if (emailError || nomError || numeroError|| descriptionError ) {
          this.setState({nomErreur:nomError});
          console.log(this.state.nomErreur)

          this.setState({emailErreur:emailError});
         
          this.setState({numeroErreur:numeroError});
          this.setState({descriptionErreur:descriptionError});
          return;
        }
       this.sendRec();
      };


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
                         <Input
                            placeholder="Nom & Prénom"
                            leftIcon={<Icon name="user" type="font-awesome" />}
                            onChangeText={text => this.setState({ nom: text, nomErreur: '' })}
                            errorMessage={this.state.nomErreur}
						/>
                        
                        
                         <Input
							placeholder="Numéro"
							leftIcon={<Icon name="phone-square" type="font-awesome" />}
                            onChangeText={text => this.setState({ numero: text, numeroErreur: '' })}
                            keyboardType="numeric"
                            maxLength={8}
                            errorMessage={this.state.numeroErreur}
						/>
                        
                         <Input
							placeholder="Email"
							leftIcon={<Icon name="envelope-square" type="font-awesome" />}
                            onChangeText={text =>this.setState({ email: text, emailErreur: '' })}
                            autoCapitalize="none"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            errorMessage={this.state.emailErreur}
						/>
                        
						<Input
							placeholder="Description"
							leftIcon={<Icon name="exclamation" type="font-awesome" />}
                            onChangeText={text => this.setState({ description: text, descriptionErreur: '' })}
                            errorMessage={this.state.descriptionErreur}
						/>
                         <Text style={styles.modalText} >Technicien: </Text>
                                <Picker
                                    style={styles.formItem}
                                    selectedValue={this.state.data}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ technicien: itemValue })}
                                >
                                {this.renderItem()}
                        </Picker>
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
                                 <Marker coordinate= {this.state}/>  
                        </MapView>
                        
						<Button onPress={()=> this.AddTache()} color="#512DA8" title="Envoyer" />
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
	
	formLabel: {
		fontSize: 18,
		flex: 2,
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
        height: 150,
        left:15
      },
});