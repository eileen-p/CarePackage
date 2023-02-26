import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { WebView} from 'react-native-webview';
import { SelectList } from 'react-native-dropdown-select-list';
import { CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import { discoverMovies } from './movieFinder';
// Used dropdown-select-list from https://www.npmjs.com/package/react-native-dropdown-select-list

// movie genres
const happyGenres = [
  { id: 12, name: 'Adventure' },
  { id: 35, name: 'Comedy' },
  { id: 10751, name: 'Family' },
  { id: 10402, name: 'Music' }
];
const romanticGenres = [
  { id: 10749, name: 'Romance' }
];
const sadGenres = [
  { id: 18, name: 'Drama' },
  { id: 10752, name: 'War' }
];
const relaxedGenres = [
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 10751, name: 'Family' },
  { id: 10402, name: 'Music' },
  { id: 99, name: 'Documentary' }, // questionable
  { id: 36, name: 'History' }
];
const hypeGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 80, name: 'Crime' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  {id: 10752, name: 'War' }
];



apikey = "5337a2d15abd632c67adfc31eb638eb5";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const customTransition = {
    gestureEnabled: true,
    gestureDirection: 'vertical',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolators: ({current,next,layouts}) => {
      return { 
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0,1],
                outputRange: [layouts.screen.width,0],
              })
            },
            {
              rotate: current.progress.interpolate({
                inputRange: [0,1],
                outputRange: ["180deg","0deg"],
              }),

            },
            {
              scale: next ?
                next.progress.interpolate({
                  inputRange: [0,1],
                  outputRange: [1,0.7],
                }) : 1
            }
          ]
        }
      }
    }
    }
  

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        ...customTransition,
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        // transitionSpec:{ 
        //   open: TransitionSpecs.TransitionIOSSpec,
        //   close: TransitionSpecs.TransitionIOSSpec,
        // },
        // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
      options = {{...customTransition}}
      >
        <Stack.Screen
          name= "Home"
          component= {HomeScreen}
          options= {{title: 'Home', headerShown: false}}
        />
        <Stack.Screen 
          name= "Mood Page" 
          component={MoodScreen}
          options = {{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );

}


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
      <View style={styles.header}>
        <Text style={styles.bigPurple}>What mood were you thinkin?</Text>
        <StatusBar style="auto" />
        <SelectList 
          setSelected={(val) => setSelected(val)} 
          onSelect
          font-family='cochin'
          data={data} 
          boxStyles={{borderRadius: 9}}
          save="value"
        />
        <Button
          title="Get my mix!"
          
          onPress={async () => {
            const apiData = await discoverMovies(hypeGenres)
            const uniqueArray = Array.from(new Set(apiData.map(JSON.stringify))).map(JSON.parse);
            rand = Math.floor(Math.random() * uniqueArray.length);
            moodMovie = uniqueArray[rand].poster_path;
            console.log(moodMovie);
            navigation.navigate('Mood Page')}
          }

            
          
          color="#841584"
        />

      </View>

    
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  header: {
    flex: 1,
    paddingHorizontal: 100,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  bigPurple: {
    color: 'lavender',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    justifyContent: 'center'
  },
});

const MoodScreen = ({navigation}) => {
  return (
    <>
    <View>
      <WebView source ={{uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M'}}/>
    </View>
    <View style={{ flex: 1 }}>
    <WebView
      automaticallyAdjustContentInsets={false}
      source={{ uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M' }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      startInLoadingState={true}
      scalesPageToFit={true}
    />
  </View>
  </>  

    );
};
