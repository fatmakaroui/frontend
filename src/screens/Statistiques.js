import React, { memo ,useEffect, useState } from 'react';
import Background from '../components/Background';
import { Text, View, FlatList,StyleSheet ,ScrollView} from 'react-native';
import { Card, Rating } from 'react-native-elements';
import PureChart from 'react-native-pure-chart';
import { baseUrl } from '../shared/baseUrl';

const Statistiques = ({ navigation }) => {
  const [evaluation, setEvaluations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [nbr,setnbr]=useState(1)
  const [encours,setEncours]=useState(1)
  useEffect(() => {
 
    fetch(baseUrl+"evas")
      .then((response) => response.json())
      .then((json) => {setEvaluations(json);
        setnbr(json.length)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    fetch(baseUrl+"taches/rechTech/not defined")
      .then((response) => response.json())
      .then((json) => setEncours(json.length))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
        
     
     
     
  }, []);

  

  function RenderComments({ comments }) {
    const renderCommentItem = ({ item, index }) => (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating type="star" readonly startingValue={item.rating} imageSize={12} />
        <Text style={{ fontSize: 12 }}>{`--${item.author}, ${item.date}`}</Text>
      </View>
    );
  
    if (comments!= null) {
      const result = Object.values(evaluation).reduce((r, { rating }) => r + rating, 0);
      const s= result/nbr;
      return (
        

          <Card title="Avis des clients">
            <Rating type="star" readonly startingValue={s} imageSize={30} />
            <Text style={{margin: 10, fontSize: 14 ,fontWeight: "bold"}}>Commentaires</Text>
            <FlatList
              data={comments}
              renderItem={renderCommentItem}
              keyExtractor={(item) => item._id.toString()}
            />
          </Card>
      
      );
    }
  
    return <View />;
  }
  const sampleData = [
    {
      value: 5,
      label: 'Suspendu',
      color: '#512DA8',
    }, {
      value: 12,
      label: 'Fini',
      color: '#3AD721'
    }
    , {
      value: 19,
      label: 'En cours',
      color: '#FFA419'
    }

  ]
 
  return(
  <View style={styles.container}>
    <ScrollView>
     <Card title="Vues des taches">
       <View style={{left:30}}>
            <PureChart  data={sampleData} type='pie' /> 
            <Text></Text>
            <Text style={styles.recFini} >Taches fini</Text>
            <Text style={styles.recEnCours} >Taches en cours</Text>
            <Text style={styles.recSuspendu} >Taches suspendu</Text>
            </View>
          </Card>
            
            <RenderComments comments={evaluation} />
            </ScrollView>
        </View>)

};
const styles = StyleSheet.create({
	container: {
		flex: 1,
  },
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: '#512DA8',
		textAlign: 'center',
		color: 'white',
		marginBottom: 20,
  },
  recFini: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#3AD721',
    fontWeight: "bold"
},
recSuspendu: {
  paddingLeft: 20,
  borderLeftWidth: 10,
  borderLeftColor: '#512DA8',
  fontWeight: "bold"
},
recEnCours: {
  paddingLeft: 20,
  borderLeftWidth: 10,
  borderLeftColor: '#FFA419',
  fontWeight: "bold"
},})

export default memo(Statistiques);
