import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import ReportCard from './ReportCard'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import { URL_BASE } from '@env'
import Notification from './Notification'

class NotificationsList extends Component {
  constructor(props) {
    super(props)
    this.url = "http://"+ URL_BASE +"/api/v1/tutor_legal/notificaciones/" + this.props.id
    this.getData = this.getData.bind(this)
    /*
    if (this.props.tipo === 'Reportes') {
      //Direccion de API que regresa los reportes de los hijos de un tutor por su id
      //this.url = 'http://'+ URL_BASE +'/api/reportes/estudiante/' + this.props.id
    } else {
      //Direccion de API que regresa los citatorios de los hijos de un tutor por su id
      //this.url = 'http://'+ URL_BASE +'/api/reportes/estudiante/' + this.props.id
    }*/
    this.state = {
       data: [],
    }
    //Este array en realidad va cargar los reportes traidos por una query
    this.arrayNew = [];
    this.getData()
  }

  getData = () => {
    fetch(this.url, {
        method: 'GET'
        //Request Type
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((response) => {
        //Success
        //const arrayTemp = []
        response.forEach(element => {
            tempSet = {
                id: element['id'],
                asunto: element['asunto'],
                fecha: element['fecha'],
                description: element['descripcion'],
                //date: element['fecha'],
            }
            this.arrayNew.push(tempSet)
            //console.log(this.arrayNew)
        })
        this.setState({data: this.arrayNew})
        console.log(this.arrayNew)    
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        console.error(error)
    })
  }

  renderSeparator = () => {
      return (
          <View
          style={{
              height: 3,
              width: '100%',
              backgroundColor: '#3C4D6C',
          }}
          />
      );
  };

  renderHeader = () => {
    return (
      <View>
        <View style = {styles.headerInfoCont}>
              <Text style = {styles.headerInfoText} >
                  {this.props.tipo}
              </Text>
          </View>
      </View>
    )
  }

  render() {
    
    return (
      <View
        style={styles.containerView}>
          <FlatList
              style = {styles.list_cont}
              data={this.state.data}
              //data={this.arrayNew}
              renderItem={({ item }) => (
                  <Notification asunto = {item.asunto} 
                  desc = {item.description} fecha = {item.fecha} refresh = {this.getData}/>
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              stickyHeaderIndices={[0]}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    paddingHorizontal: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    //height: '100%',
  },

  list_cont: {
    marginVertical: 5,
    paddingHorizontal: 10,
    //maxHeight: '100%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderRadius: 20,
  },
  headerInfoCont: {
    //marginBottom: 5,
    paddingTop: 10,
    backgroundColor: 'white',
  },

  headerInfoText: {
    color: "#001640",
    fontSize: 20,
    textAlign:'center',
    fontWeight: 'bold',
  },

  button_cont: {
    width: '70%',
    maxHeight: 10,
    alignSelf: 'center'
  }
})

export default NotificationsList