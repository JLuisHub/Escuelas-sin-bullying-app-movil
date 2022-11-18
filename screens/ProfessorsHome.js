import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import StudentsList from '../components/StudentsList'

const ProfessorsHome = ({route, navigation}) => {
    const {id, clave} = route.params

    return (
        <View>
            <View>
                <StudentsList clave = {clave} id = {id}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default ProfessorsHome