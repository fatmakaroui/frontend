import{Modal,Dimensions,TouchableWithoutFeedback,Button,StyleSheet,View,Text} from 'react-native'
import React ,{Component ,setState} from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import {  Icon, Input,Rating } from 'react-native-elements';

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


export class Evaluation extends Component{

    
    constructor(props){
        super(props)
        this.state={
            show:false,
            rating:3,
            comment: '',
            author: '',
      
          
        }
    }
  
    

    show2=()=>{
        this.setState({show:true,
            rating:3,
            comment: '',
            author: '',
        })
        
    }

    close2=()=>{
        
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

    
    
   

  
    sendEva=()=>{
        fetch(baseUrl+"evas",{
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "rating":this.state.rating,
           "comment":this.state.comment,
           "author":this.state.author,
           
         })
        })
        .then(res=>res.json())
        .then( data=>{
            console.log(data)
            this.close2();
                
        });
      }
  
    

     

    render() {
        let{show}=this.state
       
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
                      
					<View style={styles.modal}>
						<Text style={styles.modalTitle}>Evaluer notre application</Text>
						<Rating
							minValue={1}
							startingValue={3}
							fractions={0}
							showRating
							onFinishRating={(rating) => this.setState({rating:rating})}
						/>
						<Input
							placeholder="Author"
							leftIcon={<Icon name="user" type="font-awesome" />}
							onChangeText={(author) => this.setState({author:author})}
						/>
						<Input
							placeholder="Comment"
							leftIcon={<Icon name="comment" type="font-awesome" />}
							onChangeText={(comment) => this.setState({comment:comment})}
						/>
						<Button  color="#512DA8" onPress={() => this.sendEva()} title="Envoyer" />
						<Button onPress={() => this.close2()} color="#6c757d" title="Annuler" />
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