import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import NotificationsList from '../components/NotificactionsList'

const Notifications = ({route, navigation}) => {
    const {id_tutor, id_estudiante, nombre} = route.params

    return (
        <View style= {styles.lists_cont}>
            <View style= {styles.list_cont}>
                <NotificationsList id={id_tutor} 
                                   id_estudiante={id_estudiante} 
                                   tipo = "Citatorios"/>
            </View>
            <View style= {styles.list_cont}>
                <NotificationsList id={id_tutor}
                                   id_estudiante={id_estudiante} 
                                   tipo = "Reportes"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lists_cont: {
        flexDirection: 'column',
        height: '100%',
    },

    list_cont: {
        flex: 1,
    }
})

export default Notifications