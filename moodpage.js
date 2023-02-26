import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';


export default function MoodPage() {

    return (

    <View style={styles.container}>
        <Text style={"auto"}>Here are you recommendations!</Text>


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
});