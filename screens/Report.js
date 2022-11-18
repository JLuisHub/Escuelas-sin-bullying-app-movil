import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../components/CustomButton'
import {URL_BASE} from '@env'

function Report ({ route, navigation }) {
    // id, nombre y matricula del alumno pasada por parametros
    const { id_docente, id_estudiante, nombre, matricula, refresh } = route.params
    const [ descripcion, setDescripcion ] = useState('')

    const now = new Date()
    

    const onSavePress = () => {

        var Id_docente = id_docente;
        var Id_estudiante = id_estudiante;
        var Descripcion = descripcion;
        var Fecha = now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear()
    
        if ((descripcion.length==0)){
          alert("Es necesario colocar una descripción!");
        }else{
          var APIURL = 'http://'+URL_BASE+'/api/v1/docente/reporte';
    
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
    
          fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          })
          .then((Response)=>Response.json())
          .then((Response)=>{
            //API_TOKEN=Response
            alert(Response.message)
          })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        }

        navigation.goBack()
        {refresh()}
    }
    

  return (
    <ScrollView style = {styles.mainCont}>
      <View style = {styles.doubleColumn}>
        <Text style = {styles.title}>Reporte para: </Text>
        <Text style = {styles.title} >{nombre}</Text>
      </View>
      <View style = {styles.doubleColumn} >
        <View style = {styles.subCont}>
            <Text style = {styles.title} >Matricula: </Text>
            <Text style = {styles.infoText}>{matricula}</Text>
        </View>
        <View style = {styles.subCont} >
            <Text style = {styles.title} >Fecha: </Text>
            <Text style = {styles.infoText}> {now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear()} </Text>
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
            text = 'Guardar'
            onPress = {onSavePress} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainCont: {
        paddingHorizontal: 20
    },
    doubleColumn: {
        flexDirection: 'row',
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
        marginVertical: 10
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

export default Report