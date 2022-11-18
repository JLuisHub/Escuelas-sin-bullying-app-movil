import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = (params) => {

    const { onPress, text, type = "PRIMARY"} = params;

  return (

    <TouchableOpacity 
    style = {[styles.buttonContainer]}
    onPress = { onPress }>

        <Text style = {[styles.buttonText]} adjustsFontSizeToFit>
            {text}
        </Text>

    </TouchableOpacity>

  )
}


export default Button

const styles = StyleSheet.create({

    buttonContainer: {
        backgroundColor:"#001640",
        width: "100%",
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: "#e8e8e8",
    },

    buttonText: {
        color: "white",
        fontWeight: '600',
        alignSelf: 'center'
    }

})