import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list'
// Used dropdown-select-list from https://www.npmjs.com/package/react-native-dropdown-select-list
export default function App() {

  const [selected, setSelected] = React.useState("");
  //22
  const data = [
      {key:'1', value:'Happy'},
      {key:'2', value:'Romantic'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]



  return (
    <View style={styles.container}>
      <Text style={styles.bigPurple}>What mood were you thinkin?</Text>
      <StatusBar style="auto" />
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigPurple: {
    color: 'lavender',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
