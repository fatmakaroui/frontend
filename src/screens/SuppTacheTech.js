import{Modal,Dimensions,TouchableWithoutFeedback, Picker,Button,StyleSheet,View,Text, Alert} from 'react-native'
import React,{useState} from 'react'
import { baseUrl } from '../shared/baseUrl';
import {
    commentaireValidator,
  } from '../core/utils' ;
import {Input} from 'react-native-elements'
const deviceHeight=Dimensions.get("window").height



export class SuppTacheTech extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            show:false,
            commentaire:'',
            CommentaireErreur:'',
            tache:[],
        }
      }
      
      
      
      
      
      show=(item)=>{
        this.setState({show:true,
            commentaire:'',
            CommentaireErreur:'',
            tache:item
        }
         )
      
        
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

    AddComm = () => {
        const commentaireError = commentaireValidator(this.state.commentaire);
        
       
        if (commentaireError ) {
          this.setState({commentaireErreur:commentaireError});
          return;
        }
        this.updateTache(this.state.tache)
      
      };
    

   
    updateRec=(item)=>{
        fetch(baseUrl+"recs/"+item.idRec,{
            method:"PUT",
            headers: {
             'Content-Type': 'application/json'
           },
           body:JSON.stringify({
            "etat.type":"Suspendu",
            "etat.commentaire" : this.state.commentaire
             
           })
          })
          .then(res=>res.text())
          .then(text => console.log(text)
         )
                 
               
      }
      
      updateTache=(item)=>{
        fetch(baseUrl+"taches/"+item._id,{
          method:"PUT",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "etat.type":"Suspendu",
           "etat.commentaire":this.state.commentaire
           
         })
        })
        .then(res=>res.text())
        .then(text => console.log(text),
        this.updateRec(item),
        this.close())
               
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
              <View style={styles.modal}

                    >
                    <Text style={styles.modalTitle}>Problème ?</Text>   
                    <Input
                        placeholder="Décrir le promlème"
                        style={{ height: 10, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.setState({ commentaire: text, commentaireErreur: '' })}
                        errorMessage={this.state.commentaireErreur}
                        />
                    <Button onPress={() => this.AddComm()} color="#ff3333" title="Confirmer" />  
                    <Button onPress={() => this.close()} color="#6c757d" title="Annuler" />  
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