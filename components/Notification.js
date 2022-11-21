import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'
import { URL_BASE } from '@env'
import LoadingScreen from '../screens/LoadingScreen'

const Notification = ( {id, asunto, desc, fecha, refresh} ) => {
    const [ loading, setLoading ] = useState(false)

    const onPressDelete = () => {
        setLoading(true)
        //Aun falta poner el URL del API
        fetch('http://'+ URL_BASE +'/URLDELAPI/' + id, {
          method: 'DELETE'
          //Request Type
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((response) => {
            //Success
            ToastAndroid.showWithGravity(response,ToastAndroid.LONG,ToastAndroid.BOTTOM)
            //alert(response)
            })
        //If response is not in json then in error
        .catch((error) => {
            //Error 
            console.error(error)
        })

        setTimeout(() => {
            {refresh()}
            setLoading(false)
        }, 1000);
    }

    return (
        <View style = {styles.cardCont}>
            {loading && (<LoadingScreen/>)}
            <View style = {styles.subCardCont}>

                <Text style = {styles.infoHeader}>
                    Fecha: 
                </Text>

                <Text style = {styles.info}>
                    {fecha}
                </Text>
                {asunto == "citatorio" &&
                    <View style = {styles.buttonCont}>
                        <CustomButton text = "Borrar" onPress = {onPressDelete}/>
                    </View>
                }

            </View>

            <View style = {styles.subCardCont}>

                <Text style = {styles.infoHeader}>
                    Tipo: 
                </Text>

                <Text style = {styles.info}>
                    {asunto}
                </Text>

            </View>

            <View style = {styles.subCardCont}>

                <View style = {{flex:4}}>
                    <Text style = {styles.infoHeader}>
                        Descripcion:
                    </Text>

                    <Text style = {styles.info}>
                        {desc}
                    </Text>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardCont: {
        marginVertical: 20,
    },

    subCardCont: {
        flexDirection: 'row'
    },

    infoHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        color: 'black',
    },

    buttonCont: {
        flex: 1,
        maxHeight: 50,
    },

    info: {
        fontSize: 20,
        flex: 1,
        color: 'black',
    },
})

export default Notification