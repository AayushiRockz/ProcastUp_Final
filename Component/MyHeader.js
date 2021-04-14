import React , {Component} from 'react';
import { View } from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class MyHeader extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <SafeAreaProvider>
                <Header
                leftComponent={<Icon name='bars' type='font-awesome' color='white' onPress={()=> this.props.navigation.toggleDrawer()} />}
                centerComponent={{text:this.props.title, style:{color:"#BAC2FF", fontSize:20, fontFamily:'serif' , alignSelf:'flex-start'}}}
                backgroundColor="#2B2CFF"
                
                />

            </SafeAreaProvider>   
            
        );
    }
}