import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from '../screens/SignInScreen'
import ProfessorsHome from '../screens/ProfessorsHome'
import ReportsRecord from '../screens/ReportsRecord'
import Report from '../screens/Report'
import Summon from '../screens/Summon'
import LoadingScreen from '../screens/LoadingScreen'
import TutorsHome from '../screens/TutorsHome'
import Notifications from '../screens/Notifications'
import AddTutorado from '../screens/AddTutorado'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: true}}>
          
        <Stack.Screen name="SignIn" component={SignInScreen} 
          options={HeaderStack("Escuela Sin Bullying")} />

        <Stack.Screen name="TutorsHome" component={TutorsHome} 
          options={HeaderStack("Escuela Sin Bullying")} />

        <Stack.Screen name="Notifications" component={Notifications} 
          options={HeaderStack("Notificaciones")} />

        <Stack.Screen name="AddTutorado" component={AddTutorado} 
          options={HeaderStack("Agregar a tutorado")} />
        
        <Stack.Screen name='ProfessorsHome' component={ProfessorsHome} 
          options={HeaderStack("Lista de Alumnos")}/>
        
        <Stack.Screen name='Record' component={ReportsRecord} 
          options={HeaderStack("Historial de Reportes")} />

        <Stack.Screen name='Report' component={Report} 
          options={HeaderStack("Reporte a alumno")} />

        <Stack.Screen name='Summon' component={Summon}
          options={HeaderStack("Citar a Tutor legal de alumno")} />

        <Stack.Screen name='Loading' component={LoadingScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


const HeaderStack = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: '#001640',
      padding: 20,
    }, 
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}

export default Navigation;