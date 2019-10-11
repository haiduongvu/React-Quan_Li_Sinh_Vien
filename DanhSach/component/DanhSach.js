import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, Image, Alert, TouchableHighlight,Button} from 'react-native';
import listData from '../data/listData';
import Swipeout from 'react-native-swipeout';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//import DetailsScreen from './AddStudent';
import ThemMoi from './AddStudent';
import CapNhap from './Edit';
import { TouchableOpacity } from 'react-native-gesture-handler';

//import AddModal from '../component/AddModal';

/* 
class FlatListItem extends Component{
    constructor (props){
        super(props)
        this.state = {
            activeRowkey: null
        };
    }
    render (){
        const swipeSettings = {
            autoClose : true,
            onClose : (secId, rowId, directions) =>{
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen : (secId, rowId, directions) =>{
                this.setState({ activeRowKey: this.props.item.key });
            },
            right: [
                {
                    onPress : () => {
                        const deletingRow = this.state.activeRowKey; 
                        Alert.alert(
                            'DELETE',
                            'Are you sure you want to delete ?',
                            [                              
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {        
                                //listData.splice(this.props.index, 1); 
                                listData.splice(this.props.index, 1); 
                                //Refresh FlatList ! 
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                              }},
                            ],
                            { cancelable: true }
                          ); 
                    },
                    text : 'Delete', type: 'delete'
                }
                
            ],
            rowId : this.props.index,
            sectionId: 1  
        };
        return(
            <Swipeout {...swipeSettings}>
            <View style={styles.item}>
                <View style={styles.viewItem}>
                    <Image
                        source = {{uri: this.props.item.anh}}
                        style= {styles.anh}
                    >
                    </Image>
                    <View style={styles.textItem}>
                        <Text style={styles.text}>{this.props.item.hoten}</Text>
                        <Text style={styles.text}>{this.props.item.masv}</Text>
                        <Text style={styles.text}>{this.props.item.lop}</Text>
                       
                    </View>
                    
                </View>

                <View style={styles.vien}>

                </View>
            </View>
            </Swipeout>

        );
    }
}
*/
class DanhSach extends Component{
    static navigationOptions =
  {
     title: 'MainActivity',
     //title : null,
    // hearder: null,
  };
    constructor(props) {
        super(props);     
        this.state = ({
            deletedRowKey: null, 
            myData : [],           
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    refreshFlatList = (deletedKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: deletedKey
            };
        });
       // this.refs.flatList.scrollToEnd();
    }
    _onPressAdd () {
        alert("You add Item");
        //this.refs.addModal.showAddModal();
    }
    // ham load du lieu tu server
    loadDataFromServer = () => {
        //http://192.168.1.116/react/test.php
        fetch('http://192.168.1.116/react/test.php')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              myData: responseJson,
            });
          })
          .catch((e) => {
            alert(e)
          });
      }
      componentDidMount() {
        this.loadDataFromServer();
      }
      //Lay du lieu sv theo id
      GetStudentIDFunction=(id,hoten, lop, masv, anh)=>{
        this.props.navigation.navigate('Sua', { 
          id : id,
          hoten : hoten,
          lop : lop,
          masv : masv,
          anh : anh
        });
   }
    render (){
        return(
            <View style={{flex: 1}}>
                <View style={styles.hearder}>
                   {/* <Text style={{fontSize: 20}}>DANH SACH SINH VIEN</Text> */}
                        <TouchableHighlight 
                        style={{marginRight: 10}}
                        underlayColor='tomato'
                        //onPress={this._onPressAdd}
                        onPress={() => this.props.navigation.navigate('Them')}
                        
                        >
                        <Image
                            style={{width: 35, height: 35}}
                            source={require('../icons/icons-add.png')}
                        />
                    </TouchableHighlight>
                </View>
                
                <FlatList 
                    ref={"flatList"}
                    data = {this.state.myData}
                    // renderItem = {({item, index}) => {
                    //     return(
                    //     <FlatListItem item={item} index={index} parentFlatList={this}>  
                            
                    //     </FlatListItem>);
                    // }}
                    // keyExtractor={({id}, index) => id}
                    renderItem = {({item}) =>(
                        <View style={styles.item}>
                            <View style={styles.viewItem}>
                                <Image
                                    source = {{uri: item.anh}}
                                    style= {styles.anh}
                                >
                                </Image>
                                <View style={styles.textItem}>
                                    <Text style={styles.text}>{item.hoten}</Text>
                                    <Text style={styles.text}>{item.masv}</Text>
                                    <Text style={styles.text}>{item.lop}</Text>
                                </View>
                                <TouchableHighlight 
                                onPress={this.GetStudentIDFunction.bind(
                                    this, item.id,
                                    item.hoten, 
                                    item.lop, 
                                    item.masv, 
                                    
                                    )} > 
                                    <Text style={{fontSize:18,color: 'red', margin:10 , justifyContent: 'center',alignItems:'center'}}>SUA</Text>
                                </TouchableHighlight>
                                
                            </View>
        
                        <View style={styles.vien}>
        
                        </View>
                    </View>
                    )}
              
                >
               
                    
                </FlatList>
                

              

            </View>
        );
    }
}
const styles = StyleSheet.create({
    item:{
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        color: 'white',
        padding: 5,
        fontSize: 16,
    },
    textItem :{
        height: 100,
        flexDirection: 'column',
        flex: 1,
    },
    viewItem: {
        flex: 1,
        backgroundColor: 'mediumseagreen',
        flexDirection: 'row',
    },
    anh: {
        height: 100,
        width: 100,
        margin: 5,
    },
    vien: {
        height: 1,
        backgroundColor: 'white',
    },
    hearder: {
        backgroundColor: 'tomato',
        height: 40,
        flexDirection: 'row',
        justifyContent:'flex-end',                
        alignItems: 'center',
        
    },
})

  const RootStack = createStackNavigator(
    {
      Home: DanhSach,
      Them: ThemMoi,
      Sua: CapNhap,
   

    },
    {
      initialRouteName: 'Home',
    }
  );
  
  const AppContainer = createAppContainer(RootStack);
  
  export default class App extends React.Component {
    render() {
      return <AppContainer />;
    }
  }


  
 
  