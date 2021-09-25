import React, {Component} from 'react';
var styles = require('../../assets/files/Styles');
import {Alert, Dimensions, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { Container, Body, Footer, Header, Input, Item, Left, Text, Title, Right, View, Button, Toast, Label, Form} from 'native-base';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import ColorsApp from '../utils/ColorsApp';
import { StatusBar } from "react-native";
import {Grid, Row, Col } from 'react-native-easy-grid';
import ConfigApp from '../utils/ConfigApp';
import HTML from 'react-native-render-html';
import Strings from '../utils/Strings';
import AppPreLoader from '../components/AppPreLoader'; 
import { LinearGradient } from 'expo-linear-gradient';

var width = Dimensions.get('window').width;

export default class TermsGuest extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST82.toUpperCase()}`,
    headerLeft: () =>  <Ionicons name={'md-arrow-back'} onPress={ () => { navigation.goBack() }} style={styles.arrowbackicon}/>,
    });

_isMounted = false;

constructor(props) {

    super(props);

    this.state = {
      isLoading: true
    }

  }

  componentDidMount() {
    
       this._isMounted = true;
       
       return fetch(ConfigApp.URL+'json/data_strings.php')
         .then((response) => response.json())
         .then((responseJson) => {
          if (this._isMounted) {

           this.setState({
             isLoading: false,
             dataSource: responseJson[0]
           }, function() {
           });
           }
         })
         .catch((error) => {
           console.error(error);
         });
     }

  componentWillUnmount() {
    this._isMounted = false;
  }

	render() {

    const item = this.state.dataSource;

      if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

return (

<Container style={styles.background_general}>

<ScrollView showsVerticalScrollIndicator ={false} showsHorizontalScrollIndicator={false}>

<View style={{padding: 20}}>

<HTML html={item.st_privacypolicy} />      
<HTML html={item.st_termsofservice} />    

</View>
</ScrollView>
		</Container>
			);
	}
}