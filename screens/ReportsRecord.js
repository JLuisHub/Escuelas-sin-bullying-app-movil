import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import ReportsList from '../components/ReportsList'
import CustomButton from '../components/CustomButton'

const ReportsRecord = ({route, navigation}) => {
    const {id_docente, id_estudiante, matricula, nombre} = route.params

    onPressAddReport = () => {
    
        navigation.navigate('Report', {id_docente: id_docente, id_estudiante: id_estudiante,
          nombre: nombre, matricula: matricula, refresh: this.reportsList.checkData})
    }

    onPressAddSummon = () => {
    
      navigation.navigate('Summon', {id_docente: id_docente, id_estudiante: id_estudiante, 
        nombre: nombre, matricula: matricula})
    }

    return (
        <View>
          <View>
              <ReportsList ref={reportsList => {this.reportsList = reportsList}} 
              id = {id_estudiante} matricula = {matricula} nombre = {nombre} nav={navigation}/>
          </View>
          <View style={styles.buttons_cont}>
            <View style = {styles.button_cont}>
              <CustomButton text = "Nuevo Reporte" onPress = {this.onPressAddReport} />
            </View>
            <View style = {styles.button_cont}>
              <CustomButton text = "Nuevo Citatorio" onPress = {this.onPressAddSummon} />
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

export default ReportsRecord