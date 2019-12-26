import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

import config from './config.json'

export default class App extends React.Component {
  state = {
    search: '',
    list: [],
  };

  updateSearch = search => {

    fetch('http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='
		 + search
		 // + '&callback=suggestCallback'
		 )
    .then(res => {
    	return(res.json());
    })
    .then(res => {
      const list = []
      if (res[1]) {
        res[1].forEach(item => {
          list.push(item)
        })
        this.setState({
          list: list
        })
      }
    })
    .catch(error => {
      console.error('[[[[[[[[error]]]]]]]]')
      console.error(error)
    })
    return;

    fetch('https://www.googleapis.com/youtube/v3/search/?key=' + config.googleApiKey
      + '&q=' + encodeURI(search)
      + '&part=snippet,id&order=viewCount&maxResults=5')
    .then(res => {
      return res.json();
    })
    .then(res => {

      const list = []
      if (res.items) {
        res.items.forEach(item => {
          list.push(item)
        })
        this.setState({
          list: list
        })
      }
    })
    .catch(error => {
      console.error('[[[[[[[[error]]]]]]]]')
      console.error(error)
    })

    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
    	<View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={ this.updateSearch = this.updateSearch.bind(this) }
        value={search}
      />
      {
      	this.state.list.map((item, i) => (
	      	<ListItem
	      		key={i}
	      		title={item}
	      		titleStyle={
	      			styles.listItem
	      		}
      		/>
      	))
  		}
    	</View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
  	paddingTop: 0,
  	marginTop: 0,
  }
});