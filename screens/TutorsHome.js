import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../components/CustomButton'
import KidsList from '../components/KidsList'

const TutorsHome = ({ route, navigation }) => {
    const {id_tutor} = route.params

    console.log(id_tutor)

    onPressAddStudent = () => {
        //Modificar
        navigation.navigate('AddTutorado', {id: id_tutor, refresh: this.kidslist.getData })
    }

    onPressNotifications = () => {
        //Modificar
        navigation.navigate('Notifications', {id: id_tutor})
    }

    return (
        <View>
          <View>
              <KidsList ref={kidslist => {this.kidslist = kidslist}} id = {id_tutor}/>
          </View>
          <View style={styles.buttons_cont}>
            <View style = {styles.button_cont}>
              <CustomButton text = "Agregar" onPress = {onPressAddStudent} />
            </View>
            <View style = {styles.button_cont}>
              <CustomButton text = "Notificaciones" onPress = {onPressNotifications} />
            </View>
          </View>

        </View>
    );
}

const styles = StyleSheet.create({
    button_cont: {
      maxHeight: 60,
      alignSelf: 'center',
      flex: 1,
    },

    buttons_cont: {
      marginTop: 1,
      alignSelf:'center',
      width: '85%',
      display: 'flex',
      flexDirection: 'row',
    }
  })

export default TutorsHome