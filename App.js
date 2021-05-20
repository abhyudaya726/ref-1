import * as React from 'react';
import {Image} from 'react-native';
import WriteStory from './screens/WriteStory';
import ReadStory from './screens/ReadStory';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer />
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Write: {screen: WriteStory},
  Read: {screen: ReadStory},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
      if(routeName === "Write"){
        return(
          <Image
          source={require("./assets/write.png")}
          style={{width:30, height:30}}
        />
        )
        
      }
      else if(routeName === "Read"){
        return(
          <Image
          source={require("./assets/read.png")}
          style={{width:30, height:30}}
        />)
        
      }
    }
  })
}
);

const AppContainer = createAppContainer(TabNavigator);