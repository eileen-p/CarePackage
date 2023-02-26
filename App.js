import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { WebView} from 'react-native-webview';
//import MoodPage from './moodpage';

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
const studiousGenre = [
  { id: 99, name: 'Documentary' }, // questionable
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
      console.log(current.progress, next.progress);
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
        <Stack.Screen
          name= "Movie Page"
          component={MovieScreen}
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
      {key:'6', value:'Studious'}
  ]

  const getTextColor = (selected) => {
    switch (selected) {
      case 'Happy':
        return { color: 'gold'};
      case 'Romantic':
        return { color: 'palevioletred'};
      case 'Sad':
        return { color: 'lightsteelblue'};
      case 'Relaxed':
        return { color: 'slateblue'};
      case 'Hype':
        return { color: 'lightsalmon'};
      case 'Studious':
        return { color: 'darkseagreen'};
      default:
        return { color: 'lavender'};
    }
  }
  
  return (
      <View style={styles.header}>
        <Text style={[styles.bigPurple, getTextColor(selected)]}>What mood were you thinkin?</Text>
        <StatusBar style="auto" />
        <SelectList 
          setSelected={(val) => setSelected(val)} 
          //// onSelect={(selected) => getTextColor(selected)} = {}
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
            moodMoviePath = uniqueArray[rand].poster_path;
            moodMovieName = uniqueArray[rand].original_title;
            console.log(moodMovieName, moodMoviePath);
            navigation.navigate('Mood Page', {paramKey: selected})
            console.log(moodMovieName,moodMoviePath);
          }

            
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

const randomInt = () => {
  return Math.floor(Math.random() * 6);
}

const happy = () => {
  const happyArr = ['https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0',
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX7KNKjOK0o75', 
  'https://open.spotify.com/embed/playlist/37i9dQZF1DWYBO1MoTDhZI',
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX1uG5byNIgDA',
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX2sUQwD7tbmL',
  'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?']
  const playlist = happyArr[randomInt()];
  return(
    <>
    <View>
      <WebView source ={{uri: playlist}}/>
    </View>
    <View style={{flex: 1, marginBottom: 100, marginTop: 200}}>
    <WebView
      automaticallyAdjustContentInsets={false}
      source={{ uri: playlist}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      startInLoadingState={true}
      scalesPageToFit={false}
    />
  </View>
  </>  
  )
}

const romantic = () => {
  const romanticArr = ['https://open.spotify.com/embed/playlist/37i9dQZF1DXbEm2sKzgoJ8',                                                           
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX6mvEU1S6INL',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DWTbzY5gOVvKd',                                                             
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX38lOuCWlLV1',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DWVGy1YP1ojM5',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DXcbAIldMQMIs']
  const playlist = romanticArr[randomInt()];
  return(
    <>
    <View>
      <WebView source ={{uri: playlist}}/>
    </View>
    <View style={{flex: 1, marginBottom: 100, marginTop: 200}}>
    <WebView
      automaticallyAdjustContentInsets={false}
      source={{ uri: playlist}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      startInLoadingState={true}
      scalesPageToFit={false}
    />
  </View>
  </>  
  )
}

const sad = () => {
  const sadArr = ['https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1',                                                          
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX3YSRoSdA634',                                                           
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX59NCqCqJtoH',                                                          
  'https://open.spotify.com/embed/playlist/37i9dQZF1DWVV27DiNWxkR',                                                         
  'https://open.spotify.com/embed/playlist/37i9dQZF1DWX83CujKHHOn',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX9LT7r8qPxfa']
  const playlist = sadArr[randomInt()];
  return(
    <>
    <View>
      <WebView source ={{uri: playlist}}/>
    </View>
    <View style={{flex: 1, marginBottom: 100, marginTop: 200}}>
    <WebView
      automaticallyAdjustContentInsets={false}
      source={{ uri: playlist}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      startInLoadingState={true}
      scalesPageToFit={false}
    />
  </View>
  </>  
  )
}

const relaxed = () => {
  const relaxedArr = ['https://open.spotify.com/embed/playlist/37i9dQZF1DX0MLFaUdXnjA',                                                          
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX52ln8eMkne9',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX6tTW0xDxScH',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX889U0CL85jj',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX6VdMW310YC7',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DXa3NnZWk6Z3T']
  const playlist = relaxedArr[randomInt()];
  return(
    <>
    <View>
      <WebView source ={{uri: playlist}}/>
    </View>
    <View style={{flex: 1, marginBottom: 100, marginTop: 200}}>
    <WebView
      automaticallyAdjustContentInsets={false}
      source={{ uri: playlist}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      startInLoadingState={true}
      scalesPageToFit={false}
    />
  </View>
  </>  
  )
}

const hype = () => {
  const hypeArr = ['https://open.spotify.com/embed/playlist/37i9dQZF1DXa2PvUpywmrr',         
  'https://open.spotify.com/embed/playlist/37i9dQZF1DWY4xHQp97fN6',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX8ky12eWIvcW',                                                           
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX5I05jXm1F2M',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1EIhpG2qPPV1Lr',                                                            
  'https://open.spotify.com/embed/playlist/3Qlo8PGJKE53FgTcIjuIvJ']
  const playlist = hypeArr[randomInt()];
  return(
    <>
    <View>
      <WebView source ={{uri: playlist}}/>
    </View>
    <View style={{flex: 1, marginBottom: 100, marginTop: 200}}>
    <WebView
      automaticallyAdjustContentInsets={false}
      source={{ uri: playlist}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      startInLoadingState={true}
      scalesPageToFit={false}
    />
  </View>
  </>  
  )
}

const studious = () => {
  const studiousArr = ['https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM',                                                           
  'https://open.spotify.com/embed/playlist/2OetfhEdq7for0HjLQIMC6',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6',                                                 
  'https://open.spotify.com/embed/playlist/156kA62wcOrCknkCFG073f',                                                            
  'https://open.spotify.com/embed/playlist/27Zm1P410dPfedsdoO9fqm',                                                            
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX692WcMwL2yW']
  const playlist = studiousArr[randomInt()];
  return(
    <>
    <View>
      <WebView source ={{uri: playlist}}/>
    </View>
    <View style={{flex: 1, marginBottom: 100, marginTop: 200}}>
    <WebView
      automaticallyAdjustContentInsets={false}
      source={{ uri: playlist}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      startInLoadingState={true}
      scalesPageToFit={false}
    />
  </View>
  </>  
  )
}

const ifElse = (selected) => {
  if (selected == 'Happy') {
    return happy();
  } else if (selected == 'Romantic'){
    return romantic();
  } else if (selected == 'Sad'){
    return sad();
  } else if (selected == 'Relaxed'){
    return relaxed();
  }else if(selected == 'Hype'){
    return hype();
  }else if(selected == 'Studious'){
    return studious(); 
  }
}

const MoodScreen = ({route, navigation}) => {
  const {paramKey} = route.params;
  return (
      <>
      {ifElse(paramKey)}
      <Button
        title="Show my movie!"
        onPress={() =>
          navigation.navigate('Movie Page', {paramKey2: paramKey})
        }
        color="#841584"
      />
      </>
  );
};

const styles2 = StyleSheet.create({
  button: {
    margin: 50,
    fontWeight: '700',
    fontSize: 30,
  }
});


const MovieScreen = ({route, navigation}) => {
  const {paramKey} = route.params;
  //const {paramKey2} = route.paramKey2; 
 // const {paramKey2} = route2.params;
  return(
      <>
      
      
       <View style={{flex: 1, marginLeft: 25, marginRight: 25, marginBottom: 185, marginTop: 150}}>
        <WebView
        source = {{uri: 'https://image.tmdb.org/t/p/w500/'+paramKey}}
        />
  </View> 
      
      </>
      
  );
};