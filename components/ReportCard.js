import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'
import { URL_BASE } from '@env'
import LoadingScreen from '../screens/LoadingScreen'

const ReportCard = ( {id, desc, date, matricula, nombre, refresh} ) => {

    const [ loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onDeletePress = () => {
        setLoading(true)
        fetch('http://'+ URL_BASE +'/api/v1/docente/reporte/' + id, {
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
                    {date}
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

                <View style = {styles.buttonCont}>
                    <CustomButton 
                        text = 'Eliminar'
                        onPress = {onDeletePress}
                    />
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardCont: {
        marginVertical: 20
    },

    subCardCont: {
        flexDirection: 'row'
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

export default ReportCard