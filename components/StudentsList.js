import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, ListItem, ScrollView, StyleSheet } from 'react-native';
import StudentCard from './StudentCard';
import {URL_BASE} from "@env";

class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.arrayNew = []
    this.url = "http://"+ URL_BASE +"/api/estudiantes/"
    this.getData()

    this.state = {
      data: [],
      value: '',
    };
  }

  getData () {
    //console.log(this.url + this.props.clave)
    fetch(this.url + this.props.clave, {
        method: 'GET'
        //Request Type
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((response) => {
        //Success
        response.forEach(element => {
          tempSet = {id: element['id'],
                     matricula: element['Matricula'], 
                     nombre: (element['Nombre'] + ' ' + element['Apaterno'])}
          this.arrayNew.push(tempSet)
        });
        this.setState({data: this.arrayNew})
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        console.error(error);
    });
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

  searchItems = text => {
    let newData = this.arrayNew.filter(item => {
      const itemData = `${item.nombre.toUpperCase()}`;
      const textData = text.toUpperCase();
    if(text.length > 0 ){
      return itemData.indexOf(textData) > -1;
    } else {
      return itemData
    }

    });

    this.setState({
      data: newData,
      value: text,
    });
  };

  renderHeader = () => {
    return (
      <TextInput
        style={styles.inputHeader}
        placeholder="Buscar Alumno por nombre..."
        onChangeText={text => this.searchItems(text)}
        value={this.state.value}
      />
    );
  };
  

  render() {
    return (
      <View
        style={styles.containerView}>
        <FlatList
          data={this.state.data}
          refreshing
          renderItem={({ item }) => (
            <StudentCard id_docente={this.props.id} id_estudiante={item.id} matricula={item.matricula} nombre={item.nombre} />
          )}
          keyExtractor={item => item.id}
          //ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          stickyHeaderIndices={[0]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerView: {
    padding: 25,
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  inputHeader: {
    backgroundColor: "white",
    height: 60,
    borderColor: '#e8e8e8',
    borderWidth: 3,
    borderRadius: 30,
    paddingHorizontal: 30,
  }
})

export default StudentsList;