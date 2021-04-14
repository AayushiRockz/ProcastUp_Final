import React , {Component} from 'react';
import {View,Text, FlatList, StyleSheet, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../Component/MyHeader';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../Component/AppHeader';
import { RFValue } from "react-native-responsive-fontsize";
export default class CompletedGoalsScreen extends Component{
    constructor(){
        super();
        this.state={
            userId :firebase.auth().currentUser.email,
            completedGoalsList:[]
        }
        this.ref=null
    }

    getCompletedGoalsList=()=>{
        db.collection("goals").where("goal_status","==",'completed').get()
        .then((snapshot)=> {
            var completedGoalsList = snapshot.docs.map((doc) => doc.data());
            this.setState({
                completedGoalsList:completedGoalsList,
            });
          }

        )

    }

    keyExtractor = (item, index) => index.toString();

    // //   render Item
      renderItem = ({ item, i }) => {
         return (
           <ListItem
             key={i}
             title={item.completedGoalsList}       
             titleStyle={{ color: "black", fontWeight: "bold" , fontSize:20 }}
             bottomDivider
         />
        );
      };
    //   //   render Item
    componentDidMount() {
        this.getCompletedGoalsList();
      }

    componentWillUnmount() {
        this.ref();
        }
     

    render(){
        return(

            <View>
              <AppHeader/> 
              <MyHeader title="Completed Goals"/>
              <Text style={styles.otherText}>See how far you have come</Text>

              {this.state.completedGoalsList.length===0
            ?(
                <View>
                    <Image
              source={require("../assets/completeGoals.png")}
              style={{width:800, height:500, margin:30, alignSelf:'center'}}
            />
                </View>
            )
            :(
               
             <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.completedGoalsList}
                renderItem={this.renderItem}
             />  
                
            )
            }
            </View>
        )
    }

}


const styles = StyleSheet.create({
    MidText:{
        fontSize:RFValue(30),
        alignSelf:'center',
        color:'grey',
        fontFamily:'serif'
    },
    otherText:{
        fontSize:RFValue(15),
        fontFamily:'serif'
    }
})