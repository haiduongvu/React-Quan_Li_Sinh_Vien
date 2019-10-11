import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, Image, Alert, TouchableHighlight, Button, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import listData from '../data/listData';
import Swipeout from 'react-native-swipeout';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { bold } from 'ansi-colors';




export default  class ThemMoi extends Component {
 
  // static navigationOptions =
  // {
  //    title: 'Them moi ',
  // };
 
constructor(props) {
 
   super(props)
 
   this.state = {
 
     hoten: '',
     lop: '',
     masv: '',
     //anh: '',
 
   }
 
 }
 
 InsertStudentRecordsToServer = () =>{
  if (this.state.hoten.length == 0 || this.state.lop.length == 0 || this.state.masv.length == 0 ) {
    Alert.alert(
      'Thong bao',
      'Ban can dien day du thong tin ?')
    return;}

      fetch('http://10.16.69.43/react/insert.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
        hoten : this.state.hoten,
 
        lop : this.state.lop,
 
        masv : this.state.masv,
 
        //anh: this.state.anh
 
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
 
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
 
          }).catch((error) => {
            console.error(error);
          });


 
}
 
 GoTo_Show_StudentList_Activity_Function = () =>
  {
    this.props.navigation.navigate('Home');
  }
 
 render() {
   return (
 
<View style={styles.MainContainer}>
 
 
       <Text style={{fontSize: 25,color: 'green', textAlign: 'center', marginBottom: 20, TextStyle: bold}}> THEM MOI SINH VIEN </Text>
 
       <TextInput
         
         placeholder="Nhap ho ten sv"
 
         onChangeText={ TextInputValue => this.setState({ hoten : TextInputValue }) }
 
         //underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
 
      <TextInput
         
         placeholder="Nhap lop"
 
         onChangeText={ TextInputValue => this.setState({ lop : TextInputValue }) }
 
         //underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
 
      <TextInput
         
         placeholder="Nhap ma sv"
 
         onChangeText={ TextInputValue => this.setState({ masv : TextInputValue }) }
 
         //underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
 
       {/* <TextInput
 
         placeholder="Enter Student Email"
 
         onChangeText={ TextInputValue => this.setState({ anh : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       /> */}
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertStudentRecordsToServer} >
 
        <Text style={styles.TextStyle}> THEM MOI </Text>
 
      </TouchableOpacity>
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_StudentList_Activity_Function} >
 
        <Text style={styles.TextStyle}> DANH SACH </Text>
 
      </TouchableOpacity>
 
 
</View>
           
   );
 }
}
const styles = StyleSheet.create({
 
  MainContainer :{
 
    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'
 
  },
 
  MainContainer_For_Show_StudentList_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
    
    },
 
  TextInputStyleClass: {
        marginTop : 15,
        textAlign: 'center',
        width: '90%',
        marginBottom: 7,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        color: 'white',
        borderRadius: 5 ,
        backgroundColor : 'mediumseagreen',
  },
 
  TouchableOpacityStyle: {
    marginTop : 20,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: 'tomato',
 
  },
 
  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },
 
  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }
 
});