import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'
import { URL_BASE } from '@env'

const ReportCard = ( {id, desc, date, matricula, nombre, refresh} ) => {

    const navigation = useNavigation()

    const onDeletePress = () => {
        fetch('http://'+ URL_BASE +'/api/v1/docente/reporte/' + id, {
          method: 'DELETE'
          //Request Type
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((response) => {
            //Success
            alert(response)
            })
        //If response is not in json then in error
        .catch((error) => {
            //Error 
            console.error(error)
        })

        {refresh()}
    }
    
    return (
        <View style = {styles.cardCont}>

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