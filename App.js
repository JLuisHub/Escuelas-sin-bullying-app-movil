import {
	StyleSheet,
	View,
} from 'react-native';

import React from 'react';
import Navigation from './navigation';


const App = () => {
	return (
		<View style = {[styles.container]}>
			<Navigation />
		</View>
	)

};


const styles = StyleSheet.create({
	container:{
		flex: 1,
    	backgroundColor: "#F1F1F1",
    
	}
})
 
export default App;