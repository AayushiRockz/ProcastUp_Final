import React , {Component} from 'react';
import {View,
Text,
StyleSheet, 
FlatList, 
TextInput, 
Alert,
Image,
TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../Component/MyHeader';
import AppHeader from '../Component/AppHeader';
import firebase from 'firebase';
import db from '../config';
import SwipeableTaskList from '../Component/SwipeableTaskList';
import {RFValue} from 'react-native-responsive-fontsize';


export default class TaskScreen extends Component{
    constructor(){
        super();
        this.state={
             userId: firebase.auth().currentUser.email,
            taskList:[],
            task:''
        }
        this.taskRef = null
    }

    
  addTasks = async (task) => {
     var userId = this.state.userId;
  
     db.collection("tasks").add({
       "user_id": userId,
       'task':this.state.task,
       'task_status':'incomplete'
   
     
     });

     this.setState({
     task:''
    })

      Alert.alert("Task Added")
   
}

  getTaskList = () => {
     this.taskRef = db
       .collection("tasks")
       .onSnapshot((snapshot) => {
         var taskList = snapshot.docs.map((doc) => doc.data());
         this.setState({
           taskList:taskList,
         });
       });
   };

   componentDidMount() {
     this.getTaskList();
   }

   componentWillUnmount() {
   this.taskRef();
   }

  
   keyExtractor = (item, index) => index.toString();

// //   render Item
  renderItem = ({ item, i }) => {
     return (
       <ListItem
         key={i}
         title={item.task}       
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
               <MyHeader title="My Tasks"/>
            {this.state.taskList.length===0
            ?(
                <View>

            <Image
              source={require("../assets/Dotask.png")}
              style={{width:800, height:500, margin:30, alignSelf:'center'}}
            />
                </View>
            )
            :(
              <SwipeableTaskList tasks={this.state.taskList}/>

                
            )
            }

            
                <TextInput placeholder="What should you do today to reach your goals?"
                    style={styles.input}
                    onChangeText={(text)=>{this.setState({task:text})}}
                            value={this.state.task}
                    />
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{this.addTasks(this.state.taskList)}}
                    >
                        <Text style={{color:'cyan'}}>Submit</Text>
                    </TouchableOpacity>
                    
            </View>
    
        )
    }
}
const styles = StyleSheet.create({
    input:{
    width:RFValue('60%'),
    height:RFValue('20%'),
    borderWidth:RFValue(2),
    alignSelf:'center',
    borderRadius:RFValue(20),
    margin:RFValue(30)
    
    },
    button:{
        height:RFValue(50),
        width:RFValue('10%'),
        padding:RFValue(10),
        justifyContent:'center',
        backgroundColor:'#002365',
        borderWidth:RFValue(2),
        borderRadius:RFValue(50),
        borderColor:'#59FFFF',
        shadowOffset:{width:RFValue(2),height:RFValue(5)} ,   
           shadowOpacity:RFValue(4),
           shadowRadius:RFValue(20),
          },
          
})