import { View, Text, StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import React, {useState} from 'react'

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

import LoadingScreen from './LoadingScreen'

import {useNavigation} from '@react-navigation/native'
import {URL_BASE} from '@env'

const AddTutorado = ({route, navigation}) => {
  const {id, refresh} = route.params
  const [clave, setClave] = useState('');
  const [matricula, setMatricula] = useState('');
  const [fecha, setFecha] = useState('');
  const [loading, setLoading] = useState(false)

  this.url = 'http://'+ URL_BASE +'/api/v1/tutor_legal/vincular'
  //const navigation = useNavigation()

  const onSavePress = () => {
      
      InsertRecord()
  }

  InsertRecord=()=>{
    setLoading(true)
    var Id_tutor = id
    var Clave = clave;
    var Matricula = matricula;
    var Fecha = fecha;

    if ((Clave.length==0) || (Matricula.length==0) || (Fecha.length==0)){
      ToastAndroid.showWithGravity("Todos los campos deben ser llenados!",
                                   ToastAndroid.LONG,
                                   ToastAndroid.BOTTOM)
    }else{
      var APIURL = url;

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
            
      var Data ={
        id_tutor_legal: Id_tutor,
        clave: Clave, 
        matricula: Matricula, 
        FechaNac: Fecha
      };

      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
        ToastAndroid.showWithGravity(Response.message,
                                       ToastAndroid.LONG,
                                       ToastAndroid.BOTTOM)
      })
      .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })
    }
    setTimeout(() => {
      {refresh()}
      setLoading(false)
      navigation.goBack()
    }, 1000);
  }

  return (
    <ScrollView>
      {loading && (<LoadingScreen/>)}
      <View style = {[styles.login_form_cont]}>

          <Text style = {[styles.login_input_name]}>Clave de la escuela</Text>
            <CustomInput 
              placeholder = "Introduzca la clave"
              value = {clave}
              setValue = {setClave}
              />
          
          <Text style = {[styles.login_input_name]}>Matricula</Text>
            <CustomInput 
              placeholder = "Introduzca la matricula"
              value = {matricula}
              setValue = {setMatricula}
              />

          <Text style = {[styles.login_input_name]}>Fecha de nacimiento con guiones</Text>
            <CustomInput 
              placeholder = "ejemplo 22-10-2022"
              value = {fecha}
              setValue = {setFecha}
              />

          <View style = {[styles.CustomButtonCont]}>
            <CustomButton
                text = 'Agregar'
                onPress = {onSavePress}
                />
          </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    login_form_cont: {
        width: '80%',
        alignSelf: "center",
        marginTop: "30%"
    },  

    login_input_name: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 20
    },

    CustomButtonCont: {
        marginTop: 30,
        width: "70%",
        maxHeight: 60,
        alignSelf: 'center'
    }

})

export default AddTutorado