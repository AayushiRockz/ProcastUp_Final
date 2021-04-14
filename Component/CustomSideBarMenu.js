import React , {Component} from 'react';
import {DrawerItems} from 'react-navigation-drawer';
import {View,Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

export default class CustomSideBarMenu extends Component {
  state = {
    userId: firebase.auth().currentUser.email,
    image: "#",
    name: "",
    docId: "",
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + " " + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

  render(){
    return(
      <View style={{flex:1}}>
              <View
          style={{
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1a2bc3",
          }}
        >
         <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size={"large"}
            onPress={() => this.selectPicture()}
            showEditButton
          />


          <Text
            style={{
              fontWeight: "300",
              fontSize: 20,
              color: "#fff",
              padding: 10,
            }}
          >
            {this.state.name}
          </Text>
        </View>
  
         <View style={{ flex: 0.86 }}>
          <DrawerItems {...this.props} />
        </View>

        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.button}
            onPress={()=>{firebase.auth.signOut
              this.props.navigation.navigate('Welcome')
            }}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    height:50,
    width:'60%',
    padding:10,
    justifyContent:'center',
    backgroundColor:'#002365',
    borderWidth:2,
    borderRadius:50,
    borderColor:'#59FFFF',
    shadowOffset:{width:2,height:5} ,   
       shadowOpacity:4,
       shadowRadius:20,
  },
  buttonText:{
    color:'#59FFFF',
    fontFamily:'fantasy',
    fontSize:25
  },
  logOutContainer:{
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },

})
