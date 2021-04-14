import React , {Component} from 'react';
import {View,Text ,FlatList, StyleSheet, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../Component/MyHeader';
import AppHeader from '../Component/AppHeader';
import db from '../config';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize';

export default class WorkDoneScreen extends Component{
    constructor(){
        super();
        this.state={
            completedTaskList:[],
            userId:firebase.auth().currentUser.email
        }
        this.ref=null
    }

    getCompletedTaskList=()=>{
        db.collection("tasks").where("task_status","==",'completed').get()
        .then((snapshot)=> {
            var completedTaskList = snapshot.docs.map((doc) => doc.data());
            this.setState({
                completedTaskList:completedTaskList,
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
             title={item.completedTaskList}       
             titleStyle={{ color: "black", fontWeight: "bold" , fontSize:20 }}
             bottomDivider
         />
        );
      };
    //   //   render Item

    componentDidMount(){
        this.getCompletedTaskList();
    }
    componentWillUnmount() {
        this.ref();
        }
     

    render(){
        return(

            <View>
                <AppHeader/>
                <MyHeader title="Completed Goals"/>
                <Text style={styles.otherText}>Check your daily progress</Text>

                {this.state.completedTaskList.length===0
            ?(
                <View>
                    <Image
              source={require("../assets/completeTask.png")}
              style={{width:800, height:500, margin:30, alignSelf:'center'}}
            />
                </View>
            )
            :(
               
             <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.completedTaskList}
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
        fontFamily:'Monospace'
    }
})