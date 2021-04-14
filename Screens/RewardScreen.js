import React , {Component} from 'react';
import {View,Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../Component/MyHeader';
import AppHeader from '../Component/AppHeader';
import db from '../config';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize';


export default class RewardScreen extends Component{
    constructor(){
        super();
        this.state={
            reward:'',
            rewardList:[],
            userId:firebase.auth().currentUser.email
        }
        this.rewardRef = null
    }

    addReward=()=>{
        db.collection("rewards").add({
            "reward":this.state.reward,
            "reward_status":"not given"
        })
        this.setState({
            reward:''
        })
    }

    getRewardList = () => {
        this.rewardRef = db
          .collection("rewards")
          .onSnapshot((snapshot) => {
            var rewardList = snapshot.docs.map((doc) => doc.data());
            this.setState({
                rewardList:rewardList,
            });
          });
      };

    keyExtractor = (item, index) => index.toString();

    // //   render Item
      renderItem = ({ item, i }) => {
         return (
           <ListItem
             key={i}
             title={item.rewardList}       
             titleStyle={{ color: "black", fontWeight: "bold" , fontSize:20 }}
             bottomDivider
         />
        );
      };
    //   //   render Item
    

    componentDidMount() {
        this.getRewardList();
      }
   
      componentWillUnmount() {
      this.rewardRef();
      }
   

    render(){
        return(

            <View>
             <View>
                <AppHeader/> 
                <MyHeader title="Rewards"/>
             </View>
                <TextInput placeholder={"What will you reward yourself for completing your tasks ?"} 
                    onChangeText={(text)=>{this.setState({reward:text})}}
                    value={this.state.reward}
                    style={styles.input}
                />

                <TouchableOpacity 
                    onPress={()=>{this.addReward(this.state.reward)}}
                    style={styles.button}
                >
                    <Text  style={{color:'cyan'}}>Submit</Text>
                </TouchableOpacity>

                {this.state.rewardList.length===0
            ?(
                <View>

            <Image
              source={require("../assets/reward.png")}
              style={{width:800, height:500, margin:30, alignSelf:'center'}}
            />
                </View>
            )
            :(
               
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.rewardList}
                renderItem={this.renderItem}
              />
                
            )
            }

            </View>
        )
    }

}

const styles = StyleSheet.create({
    input:{
        borderWidth:RFValue(2), 
        width:RFValue(50),
        height:RFValue(40),
        borderRadius:RFValue(40),
        borderColor:'black',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
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
          }
        
        }
)