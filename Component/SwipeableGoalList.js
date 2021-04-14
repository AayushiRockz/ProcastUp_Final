import React from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Alert
  } from "react-native";

  import { ListItem, Icon } from "react-native-elements";

  import { SwipeListView } from "react-native-swipe-list-view";
  import db from '../config';
  import firebase from 'firebase';
export default class SwipeableGoalList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        goals: this.props.goals
        };
      }


      updateMarkCompleted = goal => {
        db.collection("goals")
          .doc(goal.doc_id)
          .update({
           'goal_status': "completed"
          });

          Alert.alert("Goal marked as completed.")
      };
    

    onSwipeValueChange = swipeData =>{
        var goals = this.state.goals
        const {key,value} = swipeData
        if (value < -Dimensions.get("window").width) {
            const newData = [...goals];
            this.updateMarkCompleted(goals[key]);
            newData.splice(key, 1);
            this.setState({ goals: newData });
          }
    };

    renderItem = data => (
        <Animated.View>
          <ListItem
            leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
            title={data.item.goal}
            titleStyle={{ color: "black", fontWeight: "bold" }}
            bottomDivider
          />
        </Animated.View>
      );

      renderHiddenItem = () => (
        <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
            <Text style={styles.backTextWhite}>Mark as completed</Text>
          </View>
        </View>
      );

      render(){
          return(
              <View style={styles.container}>
                   <SwipeListView
                        disableRightSwipe
                        data={this.state.goals}
                        renderItem={this.renderItem}
                        renderHiddenItem={this.renderHiddenItem}
                        rightOpenValue={-Dimensions.get("window").width}
                        previewRowKey={"0"}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onSwipeValueChange={this.onSwipeValueChange}
                        keyExtractor={(item, index) => index.toString()}
                        />
              </View>
          )
      }
}



const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1
    },
    backTextWhite: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      alignSelf: "flex-start"
    },
    rowBack: {
      alignItems: "center",
      backgroundColor: "#29b6f6",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 15
    },
    backRightBtn: {
      alignItems: "center",
      bottom: 0,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      width: 100
    },
    backRightBtnRight: {
      backgroundColor: "#29b6f6",
      right: 0
    }
  });
  