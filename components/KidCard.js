import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'
import { URL_BASE } from '@env'
import LoadingScreen from '../screens/LoadingScreen'

const KidCard = ( {id_estudiante, nombre_estudiante, id_tutor} ) => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    onPressNotifications = () => {
        navigation.navigate('Notifications', {id_tutor: id_tutor, 
                                              id_estudiante: id_estudiante})
    }

    const onDeletePress = () => {
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

                <Text style = {styles.info}>
                    {nombre_estudiante}
                </Text>            

            </View>
            <View style = {styles.buttonCont}>
                <CustomButton text = "Eliminar"/>
            </View>
            <View style = {styles.buttonCont}>
                <CustomButton text = "Notificaciones" onPress = {onPressNotifications}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    cardCont: {
        flexDirection: 'row',
        marginVertical: 20,
    },

    subCardCont: {
        flex: 3,
    },

    infoHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
    },

    info: {
        fontSize: 20,
        flex: 1,
    },

    buttonCont: {
        alignSelf: 'flex-end',
        maxHeight: 50,
        flex: 2
    }
})

export default KidCard