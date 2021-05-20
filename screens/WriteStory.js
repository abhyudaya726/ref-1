import * as React from 'react';
import {View,Text,TextInput,TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class WriteStory extends React.Component{

  constructor(){
    super();
    this.state={
      title:'',
      author:'',
      story:''
    }
  }

  submitStory=async()=>{
    await db.collection("readStory").add({
      "Author":this.state.author,
      "Title":this.state.title
    });
    await db.collection("story").doc("Story").update({
      "Author":this.state.author,
      "Story":this.state.story,
      "Title":this.state.title
    });
    ToastAndroid.show("Your Story Has Been Submitted!!", ToastAndroid.SHORT);
  }

  render(){
    return(
      <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder={"Story Tale"}
              onChangeText={text => 
                this.setState({title:text})
              }
              value={this.state.title}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder={"Author"}
              onChangeText={text => 
                this.setState({author:text})
              }
              value={this.state.author}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder={"Write Your Story"}
              onChangeText={text => 
                this.setState({story:text})
              }
              value={this.state.story}
            />
          </View>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={this.submitStory()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    submitButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    }
  });