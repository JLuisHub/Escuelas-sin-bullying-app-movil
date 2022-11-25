import { View, Text, StyleSheet, Linking, ToastAndroid } from 'react-native'
import React, {useState} from 'react'

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

import {useNavigation} from '@react-navigation/native'
import {URL_BASE} from '@env'
import LoadingScreen from './LoadingScreen'

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const urlTutorRegistro = "http://"+ URL_BASE +"/tutor_legal/registro/create"
  const urlLogin = "http://"+ URL_BASE +"/api/v1/tutor_legal_docente/login"

  const navigation = useNavigation()

  const onTutorRegister = () => {
    Linking.openURL(urlTutorRegistro);
  }

  const onSignInPressed = () => {
    console.log(email)
    console.log(password)
    
    InsertRecord()
  }

  InsertRecord=()=>{
    setLoading(true)
    var Email = email;
    var Password = password;

    if ((Email.length==0) || (Password.length==0)){
      ToastAndroid.showWithGravity("Es necesario colocar un correo y contraseña!", ToastAndroid.LONG, ToastAndroid.BOTTOM)
      //alert("Es necesario colocar un correo y contraseña!");
    }else{
      var APIURL = urlLogin;
      console.log(urlLogin)

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
            
      var Data ={
        email: Email,
        password: Password
      };

      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
        //API_TOKEN=Response}
        if (Response.role) {
          ToastAndroid.showWithGravity("Bienvenido " + Response.role, ToastAndroid.LONG, ToastAndroid.BOTTOM)
          if (Response.role == "docente") {
            navigation.navigate("ProfessorsHome",{id:Response.docente.id, clave:Response.docente.clave})
          }else{
            navigation.navigate("TutorsHome",{id_tutor:Response.tutor.id})
          }
        }else{
          ToastAndroid.showWithGravity("Datos de ingreso incorrectos", ToastAndroid.LONG, ToastAndroid.BOTTOM)
          //alert("Datos de ingreso incorrectos")
        }
      })
      .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })
    }
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }

  return (
    <View>
      {loading && (<LoadingScreen/>)}
      <View style = {[styles.login_form_cont]}>

        <Text style = {[styles.login_input_name]}>Correo</Text>
        <CustomInput 
            placeholder = "Introduzca su Correo"
            value = {email}
            setValue = {setEmail}
            />
        
        <Text style = {[styles.login_input_name]}>Contraseña</Text>
        <CustomInput 
            placeholder = "Contraseña"
            value = {password}
            setValue = {setPassword}
            secureTextEntry
            />

        <View style = {[styles.CustomButtonCont]}>
            <CustomButton
                text = 'Iniciar Sesión'
                onPress = {onSignInPressed}
                />
        </View>
        <View style = {[styles.CustomButtonCont2]}>
            <CustomButton
                text = 'Registrarme como tutor legal'
                onPress = {onTutorRegister}
                />
        </View>
      </View>
    </View>
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
  },
  CustomButtonCont2: {
    marginTop: 10,
    width: "70%",
    maxHeight: 60,
    alignSelf: 'center'
  }

})

export default SignInScreen