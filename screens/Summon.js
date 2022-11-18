import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import DatePicker from 'react-native-date-picker'
import CustomButton from '../components/CustomButton'
import {useNavigation} from '@react-navigation/native'
import {URL_BASE} from '@env'

function Summon ({ route, navigation }) {
    // id, nombre y matricula del alumno pasada por parametros
    const {  id_docente, id_estudiante, nombre, matricula } = route.params
    const [descripcion, setDescripcion] = useState('')
    const [date, setDate] = useState(new Date())

    const onSendPress = () => {
        // Aqui va query para agregar el citatorio a la tabla Citatorios
        console.log("El citatorio lleva la siguiente info")
        console.log(id_docente)
        console.log(id_estudiante)
        console.log(descripcion)
        console.log(date)

        var Id_docente = id_docente;
        var Id_estudiante = id_estudiante;
        var Descripcion = descripcion;
        var Fecha = date
    
        if ((descripcion.length==0)){
          alert("Es necesario colocar una descripción!");
        }else{
          var APIURL = "http://"+URL_BASE+"/api/v1/docente/citatorio";
    
          var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          };
                
          var Data ={
            id_docente: Id_docente,
            id_estudiante: Id_estudiante,
            descripcion: Descripcion,
            fecha: Fecha
          };
          console.log(APIURL)
          fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          })
          .then((Response)=>Response.json())
          .then((Response)=>{
            //API_TOKEN=Response
            alert(Response.message)
            //console.warn('Logeado Mano')
            //console.log(Data);
          })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        }

        navigation.goBack()

    }
    

  return (
    <ScrollView style = {styles.mainCont}>
      <View style = {styles.doubleColumn}>
        <Text style = {styles.title}>Citatorio para tutor de: </Text>
        <Text style = {styles.title} >{nombre}</Text>
      </View>
      <View style = {styles.doubleColumn} >
        <View style = {styles.subCont}>
            <Text style = {styles.title} >Matricula: </Text>
            <Text style = {styles.infoText}>{matricula}</Text>
        </View>
        <View style = {styles.subCont} >
            <Text style = {styles.title} >Fecha de Cita: </Text>
            <DatePicker mode='date' date={date} onDateChange={setDate} />
        </View>
      </View>

      <View style = {styles.textInputCont} >
        <Text style = {styles.title} >Descripción</Text>
        <TextInput 
            style = {styles.textInput}
            placeholder = "Descripcion"
            defaultValue = {descripcion}
            onChangeText = {newDesc => setDescripcion(newDesc)}
            multiline = {true}
            />
      </View>

      <View style = {styles.contButton}>
        <CustomButton 
            text = 'Enviar'
            onPress = {onSendPress} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainCont: {
        paddingHorizontal: 10
    },
    doubleColumn: {
        //flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
    },
    subCont: {
        flex: 1,
        alignItems:'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        alignSelf:'center'
    },

    infoText: {
        fontSize: 15,
        justifyContent:'center',
        textAlignVertical: 'center'
    },
    textInputCont: {
        marginVertical: 30,
    },
    textInput: {
        minHeight: 100,
        backgroundColor: "white",
        textAlignVertical: 'top',
        padding: 10,
    },
    contButton: {
        maxHeight: 70,
    }
})

export default Summon