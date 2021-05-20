import * as React from 'react';
import {View,Text,TouchableOpacity,FlatList,TextInput,StyleSheet} from 'react-native';
import db from "../config"

export default class ReadStory extends React.Component{
  constructor(){
    super();
    this.state={
      allStories:[],
      lastStory:null,
      search:''
    }
  }

  moreStories=async()=>{
    var text = this.state.search.toUpperCase();
    var enteredText = text.split("");

    if(enteredText[0].toUpperCase() === "A"){
      const query = await db.collection("readStory").where("Author", "==", text).startAfter(this.state.lastStory).limit(10).get();
      query.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.alignItems, doc.data()],
          lastStory:doc
        })
      })
    }
    else if(enteredText[0].toUpperCase() === "T"){
      const query = await db.collection("readStory").where("Title", "==", text).startAfter(this.state.lastStory).limit(10).get();
      query.docs.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories, doc.data()],
          lastStory:doc
        })
      })
    }
  }

  searchStory = async(text) =>{
    var enteredText = text.split("");

    if(enteredText[0].toUpperCase() === "A"){
      const story = await db.collection("readStory").where("Author", "==", text).limit(10).get();
      story.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.alignItems, doc.data()],
          lastStory:doc
        })
      })
    }
    else if(enteredText[0].toUpperCase() === "T"){
      const story = await db.collection("readStory").where("Title", "==", text).limit(10).get();
      story.docs.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories, doc.data()],
          lastStory:doc
        })
      })
    }
  }

  componentDidMount = async() =>{
    const query = await db.collection("readStory").limit(10).get();
    query.docs.map((doc)=>{
      this.setState({
        allStories: [],
        lastStory: doc
      })
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput 
            style ={styles.bar}
            placeholder = "Enter Author or Title"
            onChangeText={(text)=>{this.setState({search:text})}}/>
            <TouchableOpacity
              style = {styles.searchButton}
              onPress={()=>{this.searchStory(this.state.search)}}
            >
              <Text>Search</Text>
            </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allStories}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Author " + item.Author}</Text>
              <Text>{"Title " + item.Title}</Text>
            </View>
          )}
          keyExtractor={(index,item)=>index.toString()}
          onEndReached={this.moreStories}
          onEndReachedThreshold={0.7}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })