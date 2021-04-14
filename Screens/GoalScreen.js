import React , {Component} from 'react';
import {View,Text, TextInput, TouchableOpacity,  StyleSheet, Alert, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../Component/MyHeader';
import firebase from 'firebase';
import db from '../config';
import { Icon } from 'react-native-elements';
import SwipeableGoalList from '../Component/SwipeableGoalList';
import AppHeader from '../Component/AppHeader';
import {RFValue} from 'react-native-responsive-fontsize';

export default class GoalsScreen extends Component{
    constructor(){
        super();
        this.state={
             userId: firebase.auth().currentUser.email,
            goalList:[],
            goal:''
        }
        this.goalRef = null
    }

    
  addGoals = async (goal) => {
     var userId = this.state.userId;
  
     db.collection("goals").add({
       "user_id": userId,
       'goal':this.state.goal,
       "goal_status":"incomplete"
   
      
     });

     this.setState({
     goal:''
    })

    Alert.alert("Goal Added")
   
}

  getGoalsList = () => {
     this.goalRef = db
       .collection("goals")
       .onSnapshot((snapshot) => {
         var goalList = snapshot.docs.map((doc) => doc.data());
         this.setState({
           goalList:goalList,
         });
       });
   };

   componentDidMount() {
     this.getGoalsList();
   }

   componentWillUnmount() {
   this.goalRef();
   }

  
   keyExtractor = (item, index) => index.toString();

// //   render Item
  renderItem = ({ item, i }) => {
     return (
       <ListItem
         key={i}
         leftElement={<Icon name="square-o" type="font-awesome"  />}
         title={item.goalList}       
         titleStyle={{ color: "black", fontWeight: "bold" , fontSize:20 }}
         bottomDivider
     />
    );
  };
//   //   render Item


    render(){
        return(
    
            <View style={{flex:0.9,justifyContent:"center", alignContent:'center'}} >
                <AppHeader/>
               <MyHeader title="My Goals"/>
            {this.state.goalList.length===0
            ?(
                <View>

              <Image
              source={require("../assets/Dogoal.png")}
              style={{width:800, height:500, margin:30, alignSelf:'center'}}
            />
                </View>
            )
            :(
               
               <SwipeableGoalList goals={this.state.goalList}/>

                
            )
            }

            
                <TextInput placeholder="          What are your long term goals?"
                    style={styles.input}
                    onChangeText={(text)=>{this.setState({goal:text})}}
                            value={this.state.goal}
                    />
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{this.addGoals(this.state.goal)}}
                    >
                        <Text style={{color:'cyan'}}>Submit</Text>
                    </TouchableOpacity>
                    
            </View>
    
        )
    }

}

const styles = StyleSheet.create({
    input:{width:'70%',
    height:'20%',
    borderWidth:RFValue(2),
    alignSelf:'center',
    borderRadius:RFValue(10),
    margin:RFValue(30)
    
    },
    button:{
        height:RFValue(50),
        width:'30%',
        padding:RFValue(10),
        justifyContent:'center',
        backgroundColor:'#002365',
        borderWidth:RFValue(2),
        borderRadius:RFValue(50),
        borderColor:'#59FFFF',
        shadowOffset:{width:RFValue(2),height:RFValue(5)} ,   
           shadowOpacity:4,
           shadowRadius:20,
          },
        margin:RFValue(40)  
})