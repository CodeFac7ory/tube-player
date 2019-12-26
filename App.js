import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import Youtube from './Youtube';

export default function App() {
	console.log('RUNNING');
  return (
    <View style={styles.container}>
	    <Youtube style={styles.youtube}>
	    </Youtube>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  	// justifyContent: 'center',
  	// alignItems: 'center',
  	alignItems: 'stretch',
  	paddingTop: 40,
  	paddingLeft: 10,
  	paddingRight: 10,
    backgroundColor: '#bbb',
  	// flexDirection: 'row',
  	// flexWrap: 'nowrap',
  	// width: '100%',
  	// display: 'flex',
  },
  youtube: {
    flex: 1,
  }
});
