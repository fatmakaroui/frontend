import{Modal,Dimensions,TouchableWithoutFeedback,Button,StyleSheet,View,Text,Image} from 'react-native'
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


export class AddReclamation extends Component{

    
    constructor(props){
        super(props)
        this.state={
            
            latitude:36.799611,
            longitude : 10.20,
             erreur:null,
            show:false,
            nom:'',
            nomErreur:'',
            cin: '',
            cinErreur:'',
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
            cin: '',
            cinErreur:'',
            numero: '',
            numeroErreur:'',
            email:'',
            emailErreur:'',
            description: '',
            descriptionErreur:'',
           
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
    sendRec=()=>{
        const start = new Date();
    var s = start.getMilliseconds();
        fetch(baseUrl+"recs",{
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "nom":this.state.nom,
           "email":this.state.email,
           "cin":this.state.cin,
           "numero":this.state.numero,
           "description":this.state.description,
           "localisation.latitude":this.state.latitude,
           "localisation.longitude":this.state.longitude,
         })
        })
        .then(res=>{res.json();
            const fin = new Date();
            var f = fin.getMilliseconds();
            
             var  timeTaken= f-s
              console.log('the fetch post http://localhost:3000/recs take :'+timeTaken+'ms')})
        .then( data=>{
            console.log(data)
            this.close();
                
        });
      }
    AddRec2=()=>{
        this.GetUser();
        this.setState({nom:this.state.data.nom})
        this.setState({email:this.state.data.email})
        this.setState({cin:this.state.data.cin})
    }
    AddRec = () => {
        const nomError = nomValidator(this.state.nom);
        const emailError = emailValidator(this.state.email);
        const cinError = cinValidator(this.state.cin);
        const numeroError = numeroValidator(this.state.numero);
        const descriptionError = descriptionValidator(this.state.description);
       
        if (emailError || nomError || cinError|| numeroError|| descriptionError ) {
          this.setState({nomErreur:nomError});
          console.log(this.state.nomErreur)
          console.log(cinError)
          this.setState({emailErreur:emailError});
          this.setState({cinErreur:cinError});
          this.setState({numeroErreur:numeroError});
          this.setState({descriptionErreur:descriptionError});
          return;
        }
       this.sendRec();
      };


      renderModel=()=>{
        const{title}=this.props
 
        if(title=="Réclamation"){
                    return(
                    <View style={styles.modal}

                        >
                         <Text style={styles.modalTitle}>Réclamation</Text>   
                         <Input
                            placeholder="Nom & Prénom"
                            leftIcon={<Icon name="user" type="font-awesome" />}
                            onChangeText={text => this.setState({ nom: text, nomErreur: '' })}
                            errorMessage={this.state.nomErreur}
						/>
                        
                        <Input
							placeholder="Cin"
							leftIcon={<Icon name="id-card" type="font-awesome" />}
                            onChangeText={text => this.setState({ cin: text, cinErreur: '' })}
                            keyboardType="numeric"
                            maxLength={8}
                            errorMessage={this.state.cinErreur}
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
                        
						<Button onPress={()=> this.AddRec()} color="#512DA8" title="Envoyer" />
						<Button onPress={() => this.close()} color="#6c757d" title="Annuler" />  
                        </View>
)
        }
        else{
           
            return(
                
                <View style={styles.modal}

                        >
                         <Text style={styles.modalTitle}>Réclamation</Text>   
                        
						<Input
							placeholder="Description"
							leftIcon={<Icon name="exclamation" type="font-awesome" />}
                            onChangeText={text => this.setState({ description: text, descriptionErreur: '' })}
                            errorMessage={this.state.descriptionErreur}
						/>
                       
                        <Input
							placeholder="Numéro"
							leftIcon={<Icon name="phone-square" type="font-awesome" />}
                            onChangeText={text => this.setState({ numero: text, numeroErreur: '' })}
                            keyboardType="numeric"
                            maxLength={8}
                            errorMessage={this.state.numeroErreur}
						/>
                        
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
						<Button onPress={()=> this.AddRec()} color="#512DA8" title="Envoyer" />
						<Button onPress={() => this.close()} color="#6c757d" title="Annuler" />  
                        </View>
            )
        }
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
                        {this.renderModel()}
                        
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