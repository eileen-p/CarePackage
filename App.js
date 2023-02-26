import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions, Animated, TouchableOpacity, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { WebView} from 'react-native-webview';

import { SelectList } from 'react-native-dropdown-select-list';
import { CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
// Used dropdown-select-list from https://www.npmjs.com/package/react-native-dropdown-select-list

import { LiquidLike, ExpandingDot } from 'react-native-animated-pagination-dots';




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

  const getTextColor = (selected) => {
    switch (selected) {
      case 'Happy':
        return { color: 'yellow'};
      case 'Romantic':
        return { color: 'red'};
      case 'Sad':
        return { color: 'blue'};
      case 'Relaxed':
        return { color: 'purple'};
      case 'Hype':
        return { color: 'green'};
      case 'Studious':
        return { color: 'gray'};
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
          //onSelect={(selected) => getTextColor(selected)}
          font-family='cochin'
          data={data} 
          boxStyles={{borderRadius: 9}}
          save="value"
        />
        <Button
          title="Get my mix!"
          
          onPress={() =>
            navigation.navigate('Mood Page')
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



const { width } = Dimensions.get('screen');

// const data = [
//   {
//     image:
//       'https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0',
//     backgroundColor: '#7bcf6e',
//   },
//   {
//     image:
//       'https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0',
//     backgroundColor: '#4654a7',
//   },
//   {
//     image:
//       'https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0',
//     backgroundColor: '#7370cf',
//   },
//   {
//     image:
//       'https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0',
//     backgroundColor: '#db4747',
//   },
// ];

const data = [
  {
    type: 'image',
    value: 
      'https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0',
           backgroundColor: '#7bcf6e',
  },
  {
    type: 'webview',
    value: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
    backgroundColor: '#db4747',
  }
];

const imageW = width * 0.7;
const imageH = imageW * 1.4;

  const scrollX = React.useRef(new Animated.Value(0));
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  //Current item index of flatlist
  const [activeIndex, setActiveIndex] = React.useState(0);
  let flatListRef = React.useRef(null);
  const gotoNextPage = () => {
    if (activeIndex + 1 < data.length) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };
  const gotoPrevPage = () => {
    if (activeIndex !== 0) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  };
  const skipToStart = () => {
    // @ts-ignore
    flatListRef.current.scrollToIndex({
      index: data.length - 1,
      animated: true,
    });
  };
  //Flatlist props that calculates current item index
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
  const renderItem = (ele) => {
    console.log(ele.item.type)
      if (ele.item.type === 'image') {
      return (
        <View style={[styles2.itemContainer]}>
          <Animated.Image
            style={{
              width: imageW,
              height: imageH,
              borderRadius: 20,
              resizeMode: 'cover',
            }}
            source={{ uri: ele.item.image }}
          />
        </View>
      );
    } else if (ele.item.type === 'webview') {
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
    } else {
      return null;
    }
  }
  // const renderItem = React.useCallback(({ item }) => {
  //   if (item.type === 'image') {
  //     return (
  //       <View style={[styles2.itemContainer]}>
  //         <Animated.Image
  //           style={{
  //             width: imageW,
  //             height: imageH,
  //             borderRadius: 20,
  //             resizeMode: 'cover',
  //           }}
  //           source={{ uri: item.image }}
  //         />
  //       </View>
  //     );
  //   } else if (item.type === 'webview') {
  //     return (
  //       <>
  //       <View>
  //         <WebView source ={{uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M'}}/>
  //       </View>
  //       <View style={{ flex: 1 }}>
  //         <WebView
  //           automaticallyAdjustContentInsets={false}
  //           source={{ uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M' }}
  //           javaScriptEnabled={true}
  //           domStorageEnabled={true}
  //           decelerationRate="normal"
  //           startInLoadingState={true}
  //           scalesPageToFit={true}
  //         />
  //       </View>
  //       </>
  //     );
  //   } else {
  //     return null;
  //   }

  // }, []);

  return (
    <View style={[styles2.container]}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {data.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const colorFade = scrollX.current.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.View
              key={index}
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: item.backgroundColor, opacity: colorFade },
              ]}
            />
          );
        })}
      </View>
      <Animated.FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX.current } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
      <ExpandingDot
    data={data}
    expandingDotWidth={30}
    scrollX={scrollX.current}
    inActiveDotOpacity={0.6}
    dotStyle={{
        width: 10,
        height: 10,
        backgroundColor: '#347af0',
        borderRadius: 5,
        marginHorizontal: 5
    }}
    containerStyle={{
        top: 30,
    }}
/>
      
      <View style={[styles2.buttonContainer]}>
        <TouchableOpacity
          style={[styles2.button]}
          onPress={() => gotoPrevPage()}
        >
          <Text style={[styles2.buttonText]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles2.button]}
          onPress={() => gotoNextPage()}
        >
          <Text style={[styles2.buttonText]}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles2.button]} onPress={() => skipToStart()}>
          <Text style={[styles2.buttonText]}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    //width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 20,
    fontWeight: '700',
  },
  buttonText: {
    color: '#fff',
  },
});

//   return (
//     <>
//     <View>
//       <WebView source ={{uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M'}}/>
//     </View>
//     <View style={{ flex: 1 }}>
//       <WebView
//         automaticallyAdjustContentInsets={false}
//         source={{ uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M' }}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         decelerationRate="normal"
//         startInLoadingState={true}
//         scalesPageToFit={true}
//       />
//     </View>
//     </>  
//   );
// };
