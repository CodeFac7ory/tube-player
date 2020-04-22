import React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';

import Video from './Video';

import config from './config.json'

export default class App extends React.Component {
  state = {
    search: '',
    title: null,
    id: null,
    suggestions: [],
    list: [],
  };

  suggestionsSearch = search => {

  	this.setState({
  		search: search,
      title: null,
  	});

  	if (search.length < 1) {
  		return;
  	}

  	console.log('search');
  	console.log(search);

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
          suggestions: list
        })
      }
    })
    .catch(error => {
      console.error('[[[[[[[[error]]]]]]]]')
      console.error(error)
    })
    return;
  };

  resultsSearch = title => {
    console.log('resultsSearch');
    console.log(title);

    this.setState({
      title: title
    });

    fetch('https://www.googleapis.com/youtube/v3/search/?key=' + config.googleApiKey
      + '&q=' + encodeURI(title)
      + '&part=snippet,id&order=viewCount&maxResults=10')
    .then(res => {
      return res.json();
    })
    .then(res => {
      Keyboard.dismiss();

      const list = []
      if (res.items) {
        res.items.forEach(item => {
          list.push(item)
        })
        this.setState({
          list: list
        })
      }

      console.log(res.items.length);
    })
    .catch(error => {
      console.error('[[[[[[[[error]]]]]]]]')
      console.error(error)
    })
  };

  openVideo = id => {
    this.setState({ id, id });
  };

  render() {
    const { search } = this.state;

    return (
      <NavigationContainer>
      	<View>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={ this.suggestionsSearch = this.suggestionsSearch.bind(this) }
            value={search}
          />
          {
          	!this.state.id
            && !this.state.title
            && this.state.search !== ''
            ? (this.state.suggestions.map((item, i) => (
    	      	<ListItem
    	      		key={i}
    	      		title={item}
    	      		titleStyle={
    	      			styles.listItem
    	      		}
    	      		onPress={
    	      			// this.resultsSearch = this.resultsSearch.bind(this)
                  () => this.resultsSearch(item)
                }
          		/>
          	))) : null
      		}
          {
            !this.state.id
            && this.state.title ? (this.state.list.map((item, i) => (
              <ListItem
                key={i}
                title={item.snippet.title}
                titleStyle={
                  styles.listItem
                }
                onPress={() => this.openVideo(item.id)}
              />
            ))) : null
          }
          {
            this.state.id ? (<Video id={this.state.id}/>) : null
          }
      	</View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
  	paddingTop: 0,
  	marginTop: 0,
  }
});