import{Modal,Dimensions,TouchableWithoutFeedback,Button,StyleSheet,View,Text, Alert} from 'react-native'
import React,{useEffect} from 'react'
import { baseUrl } from '../shared/baseUrl';


const deviceHeight=Dimensions.get("window").height
var reclamation=([])

const createAlert = () =>
Alert.alert(
  "Information",
  "La réclamation est acceptée",
  [
    { text: "OK", onPress: () => this.close() }
  ],
  { cancelable: false }
);
export class AfficheRec extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            show:false,
            
        }
    }

    show=(item)=>{
        reclamation=item
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

    AccRec=()=>{
        
        fetch(baseUrl+"recs/"+reclamation._id,{
          method:"PUT",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "etat":"Consulté",   
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text))
               
        
      }
      RefRec=()=>{
        
        fetch(baseUrl+"recs/"+reclamation._id,{
          method:"PUT",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "etat":"Réfusée",   
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text),
        this.close())
               
        
      }
   
   
    sendRec=()=>{
        fetch(baseUrl+"taches",{
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "nom":reclamation.nom,
           "email":reclamation.email,
           "cin":reclamation.cin,
           "numero":reclamation.numero,
           "description":reclamation.description,
           "localisation":reclamation.localisation,
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text),
               this.close(),
               this.AccRec() )
               
        
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
                        <View style={styles.modal}

                        >
                            <Text style={styles.modalTitle}>{title}</Text>   
                            <Text style={styles.modalText} >Nom et prénom :{reclamation.nom}</Text>
                            <Text style={styles.modalText}>Cin : {reclamation.cin}</Text>
                            <Text style={styles.modalText}>Email : {reclamation.email}</Text>
                            <Text style={styles.modalText}>Date : {reclamation.date}</Text>
                            <Text style={styles.modalText}>Description : {reclamation.description}</Text>
                            <Text style={styles.modalText}>Localisation : {reclamation.localisation}</Text>
						<Button onPress={() => this.sendRec()} color="#009933" title="Accepter" />
						<Button onPress={() => this.RefRec()} color="red" title="Réfuser" />  
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