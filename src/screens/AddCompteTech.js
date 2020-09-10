import{Modal,Dimensions,TouchableWithoutFeedback,Button,StyleSheet,View,Text} from 'react-native'
import React ,{Component ,setState} from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import {  Icon, Input} from 'react-native-elements';
import {
    emailValidator,
    nomValidator,
    passwordValidator,
    cinValidator,
  
  } from '../core/utils' ;
import { baseUrl } from '../shared/baseUrl';
const deviceHeight=Dimensions.get("window").height


export class AddCompteTech extends Component{

 
    constructor(props){
        super(props)
        this.state={
            show:false,
            nom:'',
            nomErreur:'',
            cin: '',
            cinErreur:'',
            prenom: '',
            prenomErreur:'',
            email:'',
            emailErreur:'',
            password: '',
            passwordErreur:'',
            type:'Tech',
           
        }
    }
  

    show1=()=>{
        this.setState({show:true,
            nom:'',
            nomErreur:'',
            cin: '',
            cinErreur:'',
            prenom: '',
            prenomErreur:'',
            email:'',
            emailErreur:'',
            password: '',
            passwordErreur:'',})
    }

    close1=()=>{
        
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
    AddCompte=()=>{
        fetch(baseUrl+"signup",{
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "nom":this.state.nom,
           "email":this.state.email,
           "cin":this.state.cin,
           "prenom":this.state.prenom,
           "type":this.state.type,
           "password":this.state.password
         })
        })
        .then(res=>res.json())
        .then( data=>{
            console.log(data)
            this.close1();
                
        });
      }
    AddComp = () => {
        const nomError = nomValidator(this.state.nom);
        const emailError = emailValidator(this.state.email);
        const cinError = cinValidator(this.state.cin);
        const prenomError = nomValidator(this.state.prenom);
        const passwordError = passwordValidator(this.state.password);
        
       
        if (emailError || nomError || cinError|| prenomError|| passwordError ) {
          this.setState({nomErreur:nomError});
          this.setState({emailErreur:emailError});
          this.setState({cinErreur:cinError});
          this.setState({prenomErreur:prenomError});
          this.setState({passwordErreur:passwordError});
          return;
        }
       this.AddCompte();
      };
   

    render() {
        let{show}=this.state
       
        const {onTouchOutside,title}=this.props

        return(
            <ScrollView>
            <Modal
            animationType={'fade'}
            transparent={true}
            visible={show}
            onRequestClose={this.close1}>
                <View style={{
                    flex:1,
                    backgroundColor:'#000000AA',
                    justifyContent:'flex-end'}}
                    >
                        {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={styles.modal}

                        >
                         <Text style={styles.modalTitle}>Compte Technicien</Text>   
                         <Input
                            placeholder="Nom"
                            leftIcon={<Icon name="user" type="font-awesome" />}
                            onChangeText={text => this.setState({ nom: text, nomErreur: '' })}
                            errorMessage={this.state.nomErreur}
						/>

                        <Input
                            placeholder="Prenom"
                            leftIcon={<Icon name="user" type="font-awesome" />}
                            onChangeText={text => this.setState({ prenom: text, prenomErreur: '' })}
                            errorMessage={this.state.prenomErreur}
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
                            label="Password"
                            leftIcon={<Icon name="lock" type="font-awesome" />}
                            onChangeText={text =>this.setState({ password: text, passwordErreur: '' })}
                            errorMessage={this.state.passwordErreur}
                            secureTextEntry
                        />
                        
						<Button onPress={()=> this.AddComp()} color="#512DA8" title="Envoyer" />
						<Button onPress={() => this.close1()} color="#6c757d" title="Annuler" />  
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
		fontSize: 22,
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