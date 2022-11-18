import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import NotificationsList from '../components/NotificactionsList'

const Notifications = ({route, navigation}) => {
    const {id} = route.params

    return (
        <View>
            <View style= {styles.list_cont}>
                <NotificationsList id={id}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    list_cont: {
        height: '100%',
    }
})

export default Notifications