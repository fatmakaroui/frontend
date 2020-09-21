import{Modal,Dimensions,TouchableWithoutFeedback, Picker,Button,StyleSheet,View,Text, Alert} from 'react-native'
import React,{useState} from 'react'
import { baseUrl } from '../shared/baseUrl';
import MapView, {Marker} from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';

const deviceHeight=Dimensions.get("window").height
var reclamation=([])
var technicien=([])

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
            tech:([]),
            technicien:[],
            latitude:36.799611,
            longitude : 10.20,
             erreur:null,
            etat:[]
               
        }
    }


      onMapLayout = () => {
        this.setState({ isMapReady: true });
      }

    show=(item)=>{
        reclamation=item
        this.setState({show:true,
          latitude:item.localisation.latitude,
          longitude : item.localisation.longitude,
          etat:item.etat
        })
       
    }

    close=()=>{
        this.setState({show:false})
    }

    show1=(item)=>{
      reclamation=item
      this.setState({show:true,
      etat:item.etat})
      
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


    getTech=()=>{
      fetch(baseUrl+"Tech")
      .then((response) => response.json())
      .then(tech=>this.setState({tech}))
      .catch((error) => console.error(error));
      
    }

   

    AccRec=()=>{
        
        fetch(baseUrl+"recs/"+reclamation._id,{
          method:"PUT",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "etat.type":"Consulté",   
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text)
       )
               
        
      }
      RefRec=()=>{
        
        fetch(baseUrl+"recs/"+reclamation._id,{
          method:"PUT",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "etat.type":"Réfusée",   
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text))
               
        
      }
      updateTache=()=>{
        fetch(baseUrl+"taches/"+reclamation._id,{
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
               this.close() )
               
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
           "localisation.latitude":reclamation.localisation.latitude,
           "localisation.longitude":reclamation.localisation.longitudeDelta,
           "idRec":reclamation._id
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text),
               this.AccRec(),
               this.close() )
               
        
      }
      QS1=()=>{
        Alert.alert(
          'Accepter?',
          'Voulez vous accepter cette réclamation ?',
          [
            {
              text: 'Cancel',
              onPress: () => this.close(),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => this.sendRec(),
            },
          ],
          { cancelable: false }
        );
      }
      QS2=()=>{
        Alert.alert(
          'Refuser?',
          'Voulez vous refuser cette réclamation ?',
          [
            {
              text: 'Cancel',
              onPress: () => this.close(),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {this.RefRec(),
              this.close()}
            },
          ],
          { cancelable: false }
        );
      }

    renderModel=()=>{
      const{title}=this.props
      if (title=="Taches") {
      
            return(  <View style={styles.modal}>
                <Text style={styles.modalTitle}>Tache</Text>  
                
                  <Text style={styles.modalText} >Nom et prénom :{reclamation.nom}</Text>
                  <Text style={styles.modalText}>Cin : {reclamation.cin}</Text>
                  <Text style={styles.modalText}>Email : {reclamation.email}</Text>
                  <Text style={styles.modalText}>Date : {reclamation.date}</Text>
                  <Text style={styles.modalText}>Description : {reclamation.description}</Text>
                  <Text style={styles.modalText}>Etat : </Text>
                  
                  <Button  color="#00b33c" title="Accepter" />
                  <Button  color="#ff3333" title="Réfuser" />  
                     </View>)
         
      }
      else if (title=="RéclamationC"){
        return(  <View style={styles.modal}>
          <Text style={styles.modalTitle}>Réclamation</Text>  
          
            <Text style={styles.modalText}>Email : {reclamation.email}</Text>
            <Text style={styles.modalText}>Date : {reclamation.date}</Text>
            <Text style={styles.modalText}>Description : {reclamation.description}</Text>
        <Text style={styles.modalText}>Etat : {this.state.etat.type}</Text>
            
           
            <Button onPress={() => this.close1()} color="#d9d9d9" title="Annuler" />  
               </View>)
      }
      else {
        return(  <View style={styles.modal}>
          <Text style={styles.modalTitle}>Réclamation</Text>  
          
            <Text style={styles.modalText} >Nom et prénom :{reclamation.nom}</Text>
            <Text style={styles.modalText}>Cin : {reclamation.cin}</Text>
            <Text style={styles.modalText}>Email : {reclamation.email}</Text>
            <Text style={styles.modalText}>Date : {reclamation.date}</Text>
            <Text style={styles.modalText}>Description : {reclamation.description}</Text>
            <Text style={styles.modalText}>Etat : {this.state.etat.type}</Text>
            
            <Button onPress={() => this.QS1()} color="#00b33c" title="Accepter" />
            <Button onPress={() => this.QS2()} color="#ff3333" title="Réfuser" />  
               </View>)
      }
    }

     
    renderItem = () =>{
        this.getTech()
        return( this.state.tech.map( (item) => { 
              return( <Picker.Item label={item.prenom+' '+item.nom} key={item._id} value={item.email}  />)} ));
    }
   
    
    render() {
        let{show}=this.state
        const {onTouchOutside}=this.props

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
                {this.renderModel()}
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
  mapStyle: {
    flex:1,
    width: 280,
    height: 100,
    left:15
  },
});