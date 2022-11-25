import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import StudentsList from '../components/StudentsList'
import CustomButton from '../components/CustomButton'

const ProfessorsHome = ({route, navigation}) => {
    const {id, clave} = route.params

    const onPressChangePassword = () => {
        navigation.navigate("chgPass",{id:id})
    }

    return (
        <View>
            <View style= {styles.buttonCont}>
                <CustomButton text='Cambiar Contraseña' onPress={onPressChangePassword}/>
            </View>
            <View>
                <StudentsList clave = {clave} id = {id}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonCont: {
        maxHeight: '10%',

    }
})

export default ProfessorsHome