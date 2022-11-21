import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
  return (
    <View style = {[styles.container, styles.horizontal]} >
      <ActivityIndicator size={"large"}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    }
  });
  

export default LoadingScreen