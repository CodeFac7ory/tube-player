import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

import config from './config.json'

export default class Video extends React.Component {

  render() {
  	return <Text>{this.props.id.videoId}</Text>
  }
}