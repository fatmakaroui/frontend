import{Modal,Dimensions,TouchableWithoutFeedback,Button,StyleSheet,View,Text} from 'react-native'
import React ,{Component ,setState} from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import {  Icon, Input} from 'react-native-elements';
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
            localisationErreur:''
        }
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
            localisation: '',
            localisationErreur:''})
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

    renderTitle = () =>{
        const {title}=this.props
        return(
            <View style={{alignItem:'center'}}>
                <Text style={{
                    color:'#182E44',
                    fontSize:25,
                    fontWeight:'500',
                    margin:15,
                    marginBottom:30
                }}>
                    {title}
                </Text>
            </View>
        )
    }
    
    renderContent=()=>{
        const {data}=this.props
        return(
            <View>
                <FlatList
                style={{marginBottom:20}}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={this.renderItem}
                keyExtractor={(item,index)=> index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                contentContainerStyle={{
                    paddingBottom: 40
                }}
                />

            </View>
        )
    }
    
    renderItem =({item})=>{
        return(
            <View style={{height:50,flex:1,alignItems:'flex-start',justifyContent:'center',marginLeft:20}}>
                <Text style={{fontSize:18,fontWeight:'normal',color:'#182E44'}}>{item.name}</Text>
            </View>
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
           "localisation":this.state.localisation
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
        const cinError = cinValidator(this.state.cin);
        const numeroError = numeroValidator(this.state.numero);
        const descriptionError = descriptionValidator(this.state.description);
        const localisationError = localisationValidator(this.state.localisation);
       
        if (emailError || nomError || cinError|| numeroError|| descriptionError ||localisationError) {
          this.setState({nomErreur:nomError});
          console.log(this.state.nomErreur)
          console.log(cinError)
          this.setState({emailErreur:emailError});
          this.setState({cinErreur:cinError});
          this.setState({numeroErreur:numeroError});
          this.setState({descriptionErreur:descriptionError});
          this.setState({localisationErreur:localisationError});
          return;
        }
       this.sendRec();
      };
   

    render() {
        let{show,
            nomErreur
        }=this.state
       
        const {onTouchOutside,title}=this.props

        return(
            <ScrollView>
            <Modal
            animationType={'fade'}
            transparent={true}
            visible={show}
            onRequestClose={this.close}>
                <View style={{
                    flex:1,
                    backgroundColor:'#000000AA',
                    justifyContent:'flex-end'}}
                    >
                        {this.renderOutsideTouchable(onTouchOutside)}
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
                       
                        <Input
							placeholder="Localisation"
							leftIcon={<Icon name="map-marker" type="font-awesome" />}
                            onChangeText={text => this.setState({ localisation: text, localisationErreur: '' })}
						    errorMessage={this.state.localisationErreur}
                        />
                        
						<Button onPress={()=> this.AddRec()} color="#512DA8" title="Envoyer" />
						<Button onPress={() => this.close()} color="#6c757d" title="Annuler" />  
                        </View>
                    </View>

            </Modal>
            </ScrollView>
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
	// Note formLabel and formItem will be inside formRow
	// so the flexDirection will be row, and formLabel will be 2x size formItem
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
});