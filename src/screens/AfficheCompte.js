import{Modal,TouchableWithoutFeedback,Button,StyleSheet,View,Text, Alert} from 'react-native'
import React from 'react'
import { baseUrl } from '../shared/baseUrl';


var compte=([])


export class AfficheCompte extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            show:false,
            
        }
    }

    show=(item)=>{
        compte=item
        this.setState({show:true})
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

    button=()=>{
        const{title}=this.props
        if(title=="Tech")
        {
            return(<Button  color="#ff3333" onPress={() => this.DelCompte()} title="Supprimer" /> )
        }
        else if(compte.type=="non vérifier"){
            return(<View>
                <Button  color="#00b33c" onPress={() => this.AccCompte()} title="Accepter" />
               <Button  color="#ff3333" onPress={() => this.DelCompte()} title="Supprimer" /> 
               </View> )
        }
        else {
            return(<View>
               <Button  color="#ff3333" onPress={() => this.DelCompte()} title="Supprimer" /> 
               </View> )
        }
    } 

    AccCompte=()=>{
        
        fetch(baseUrl+compte._id,{
          method:"PUT",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "type":"Vérifier",   
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text),
        this.close()
       )
               
        
      }
    
    DelCompte=()=>{
        fetch(baseUrl+compte._id,{
          method:"Delete",
          headers: {
           'Content-Type': 'application/json'
         },
        })
        .then(res=>res.text())
        .then(text => console.log(text),
            
               this.close() )
  
      }
    
    render() {
        let{show}=this.state
        const {onTouchOutside,title}=this.props

        return(
            <Modal
            animationType={'fade'}
            transparent={true}
            visible={show}
            onRequestClose={this.close}
            style={styles.modal}>
                <View style={{
                    flex:1,
                    backgroundColor:'#000000AA',
                    justifyContent:'flex-end'}}
                    >
                        {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={styles.modal}    >
                            <Text style={styles.modalTitle}>Compte</Text>   
                            <Text style={styles.modalText}>Nom : {compte.nom}</Text>
                            <Text style={styles.modalText}>Prenom : {compte.prenom}</Text>
                            <Text style={styles.modalText}>Cin : {compte.cin}</Text>
                            <Text style={styles.modalText}>Email : {compte.email}</Text>
						{this.button()}
                        <Button onPress={() => this.close()} color="#a6a6a6" title="Annuler" /> 
                        </View>
                    </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
	
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