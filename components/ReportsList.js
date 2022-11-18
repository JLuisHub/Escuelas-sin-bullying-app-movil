import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import ReportCard from '../components/ReportCard'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import { URL_BASE } from '@env'

class ReportsList extends Component {
  constructor(props) {
    super(props)
    this.url = 'http://'+ URL_BASE +'/api/v1/reportes/estudiante/' + this.props.id
    //this.refreshList = this.refreshList.bind(this)
    //this.checkData = this.checkData.bind(this)
    this.getData = this.getData.bind(this)
  
    this.state = {
       data: [],
       isRefreshing: false,
    }
    //Este array en realidad va cargar los reportes traidos por una query
    this.arrayNew = [];
    this.arrayNewTemp = [];
    this.getData()
  }

  getData = () => {
    this.arrayNew = []
    this.changeRefreshState(true)
    fetch(this.url, {
        method: 'GET'
        //Request Type
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((response) => {
      console.log(response)
        //Success
        response.forEach(element => {
            tempSet = {
                id: element['id'],
                description: element['descripcion'],
                date: element['fecha']
            }
            this.arrayNew.push(tempSet)
        })

        this.setState({data: this.arrayNew})    
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        console.error(error)
    })
    this.changeRefreshState(false)
  }

  checkData = () => {
    this.arrayNew = []
    this.setState({isRefreshing: true})
    fetch(this.url, {
      method: 'GET'
      //Request Type
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((response) => {
        //Success      
        response.forEach(element => {
            tempSet = {
                id: element['id'],
                description: element['descripcion'],
                date: element['fecha'],
            }
            this.arrayNew.push(tempSet)          
        })
        /*
        if (this.arrayNew.length != this.arrayNewTemp.length) {
          this.setState({data: []})
          this.arrayNew = this.arrayNewTemp
          this.arrayNewTemp = []
        }*/
        this.setState({data: this.arrayNew})
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        console.error(error)
    })
    this.setState({isRefreshing: false})
  }

  changeRefreshState = (currentState) => {
    this.setState({isRefreshing: currentState})
    console.log(this.state.isRefreshing)
    /*
    if (this.state.isRefreshing == true) {
      this.setState({isRefreshing: false})
    } else {
      this.setState({isRefreshing: true})
    }
    */
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
                  Numero de Reportes:     {this.arrayNew.length}
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
                  <ReportCard id = {item.id} desc = {item.description} date = {item.date} refresh={this.getData} />
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
  },

  button_cont: {
    width: '70%',
    maxHeight: 10,
    alignSelf: 'center'
  }
})

export default ReportsList