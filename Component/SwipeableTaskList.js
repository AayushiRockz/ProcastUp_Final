import React from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
  } from "react-native";

  import { ListItem, Icon } from "react-native-elements";

  import { SwipeListView } from "react-native-swipe-list-view";
  import db from '../config';
  import firebase from 'firebase';
import { Alert } from 'react-native';
export default class SwipeableTaskList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        tasks: this.props.tasks
        };
      }


      updateMarkCompleted = task => {
        db.collection("tasks")
          .doc(task.doc_id)
          .update({
           'task_status': "completed"
          });
          Alert.alert("Task marked as complete")
      };
    

    onSwipeValueChange = swipeData =>{
        var tasks = this.state.tasks
        const {key,value} = swipeData
        if (value < -Dimensions.get("window").width) {
            const newData = [...tasks];
            this.updateMarkCompleted(tasks[key]);
            newData.splice(key, 1);
            this.setState({ tasks: newData });
          }
    };

    renderItem = data => (
        <Animated.View>
          <ListItem
            leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
            title={data.item.task}
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
              <View>
                   <SwipeListView
                        disableRightSwipe
                        data={this.state.tasks}
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
  