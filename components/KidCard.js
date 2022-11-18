import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'
import { URL_BASE } from '@env'

const KidCard = ( {nombre} ) => {
    
    return (
        <View style = {styles.cardCont}>

            <View style = {styles.subCardCont}>

                <Text style = {styles.info}>
                    {nombre}
                </Text>

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

export default KidCard