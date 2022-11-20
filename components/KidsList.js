import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import KidCard from './KidCard'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import { URL_BASE } from '@env'

class KidsList extends Component {
  constructor(props) {
    super(props)
    //Falta poner el api que regresa a los estudiantes vinculados con un tutor por su id
    this.url = "http://"+ URL_BASE +"/api/v1/tutor_legal/tutorados/" + this.props.id
    //this.interval = setInterval(() => this.checkData(), 1000);
  
    this.state = {
       data: [],
       isRefreshing: false,
    }
    //Este array en realidad va cargar los reportes traidos por una query
    //{id:1, nombre: "Pepito"}, {id:2, nombre: "Maria"}, {id:3, nombre: "Jose"}, {id:4, nombre: "Martha"}
    this.arrayNew = [];
    this.arrayNewTemp = [];
    this.getData()
  }

  getData = () => {
    this.setState({isRefreshing: true})
    fetch(this.url, {
        method: 'GET'
        //Request Type
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((response) => {
        //Success
        this.arrayNew = []
        response.forEach(element => {
            tempSet = {
              id: element['id'],
              nombre: element['nombre']
            }
            this.arrayNew.push(tempSet)
            //console.log(this.arrayNew)
        })
        //console.log(this.props.id)
        this.setState({data: this.arrayNew})    
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        console.error(error)
    })
    this.setState({isRefreshing: false})
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
                  Estudiantes vinculados a su cuenta
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
              refreshing={this.state.isRefreshing}
              onRefresh={this.getData}
              renderItem={({ item }) => (
                  <KidCard nombre={item.nombre} />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    padding: 20,
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: '90%'
  },

  list_cont: {
    maxHeight: '100%'
  },
  headerInfoCont: {
    marginBottom: 5,
    padding: 10,
  },

  headerInfoText: {
    color: "black",
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  button_cont: {
    width: '70%',
    maxHeight: 10,
    alignSelf: 'center'
  }
})

export default KidsList