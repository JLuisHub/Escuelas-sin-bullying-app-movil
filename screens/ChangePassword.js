import { View, Text, StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import React, {useState} from 'react'

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

import LoadingScreen from './LoadingScreen'

import {URL_BASE} from '@env'

const ChangePassword = ({route, navigation}) => {
  const {id} = route.params
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false)

  this.url = 'http://'+ URL_BASE +'/api/v1/docente/cambio_contrasenia'

  const onSavePress = () => {
      
    var Id_docente = id
    var Pass = currentPass;
    var NewPass = newPass;
    var ConfirmPass = confirmPass

    if ((Pass.length==0) || (NewPass.length==0) || (ConfirmPass.length==0)){
      ToastAndroid.showWithGravity("Todos los campos deben ser llenados!",
                                   ToastAndroid.LONG,
                                   ToastAndroid.BOTTOM)
    }else if (NewPass != ConfirmPass) {
        ToastAndroid.showWithGravity("La contraseña nueva y su confirmación no coincide")
    }else{
        setLoading(true)
        var APIURL = url;
  
        var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        };
              
        var Data ={
            id:  Id_docente,
            contrasenia:  NewPass,
            contrasenia_2: NewPass
        };
  
        fetch(APIURL,{
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(Data)
        })
        .then((Response)=>Response.json())
        .then((Response)=>{
          console.log(Response)
          ToastAndroid.showWithGravity(Response.message,
                                         ToastAndroid.LONG,
                                         ToastAndroid.BOTTOM)
        })
        .catch((error)=>{
          console.error("ERROR FOUND" + error);
        })
        setTimeout(() => {
          setLoading(false)
          navigation.goBack()
        }, 1000);
    }
  }

  return (
    <ScrollView>
      {loading && (<LoadingScreen/>)}
      <View style = {[styles.login_form_cont]}>

          <Text style = {[styles.login_input_name]}>Contraseña Actual</Text>
            <CustomInput 
              placeholder = "Contraseña Actual"
              value = {currentPass}
              setValue = {setCurrentPass}
              />
          
          <Text style = {[styles.login_input_name]}>Nueva Contraseña</Text>
            <CustomInput 
              placeholder = "Contraseña Nueva"
              value = {newPass}
              setValue = {setNewPass}
              />

          <Text style = {[styles.login_input_name]}>Confirmar Nueva Contraseña</Text>
            <CustomInput 
              placeholder = "Confirme Su nueva contraseña"
              value = {confirmPass}
              setValue = {setConfirmPass}
              />

          <View style = {[styles.CustomButtonCont]}>
            <CustomButton
                text = 'Guardar'
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

export default ChangePassword