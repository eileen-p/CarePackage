import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
//import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import MoodPage from './moodpage';

import { SelectList } from 'react-native-dropdown-select-list';
// Used dropdown-select-list from https://www.npmjs.com/package/react-native-dropdown-select-list

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name= "Home"
          component= {HomeScreen}
          options= {{title: 'Home', headerShown: false}}
        />
        <Stack.Screen name= "Mood Page" component={MoodScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );

}
//export default function App() {



const HomeScreen = ({navigation}) => {
  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Happy'},
      {key:'2', value:'Romantic'},
      {key:'3', value:'Sad'},
      {key:'4', value:'Relaxed'},
      {key:'5', value:'Hype'},
      {key:'6', value:'Studious'},
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.bigPurple}>What mood were you thinkin?</Text>
      <StatusBar style="auto" />
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        font-family='cochin'
        data={data} 
        boxStyles={{borderRadius: 9}}
        save="value"
      />
    {/* <Pressable >
      <Text>I'm pressable!</Text>
    </Pressable> */}
      <Button
        title="Get my mix!"
        onPress={() =>
          navigation.navigate('Mood Page')
        }
      />
    </View>
    
  );
  
}


  //return (

  //);
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 100,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  bigPurple: {
    color: 'lavender',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});

const MoodScreen = ({navigation}) => {
  return <Text>HI</Text>;
};
