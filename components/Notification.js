import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'
import { URL_BASE } from '@env'

const Notification = ( {id, asunto, desc, fecha} ) => {

    return (
        <View style = {styles.cardCont}>
            <View style = {styles.subCardCont}>

                <Text style = {styles.infoHeader}>
                    Fecha: 
                </Text>

                <Text style = {styles.info}>
                    {fecha}
                </Text>

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
})

export default Notification