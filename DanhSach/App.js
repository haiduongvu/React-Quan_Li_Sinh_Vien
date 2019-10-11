import * as React from 'react';
import { Button, View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class HomeScreen extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            lop: '',
        };

      }


  render() {
    return (

      <View style={{flex : 1, }}>
        <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}           
                    onChangeText={(text) => this.setState({ hoten: text })}
                    placeholder="Nhap ho ten"
                    value={this.state.hoten}                 
                />
        <TextInput
            style={{
                height: 40,
                borderBottomColor: 'gray',
                marginLeft: 30,
                marginRight: 30,
                marginTop: 10,
                marginBottom: 20,
                borderBottomWidth: 1
            }}
            
            onChangeText={(text) => this.setState({ lop: text })}
            placeholder="Nhập lớp"
            value={this.state.lop}
        />
        <Button style={{fontSize: 18, color: 'white' }}
          containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: 'mediumseagreen'}}

          title="Thêm"
         onPress={() => {
         
            if (this.state.hoten.length == 0 || this.state.lop.length == 0 ) {
                            alert(" Vui lòng nhập đầy đủ thông tin");
                            return;
                        }  
            this.props.navigation.navigate('Details', {
              hoten:this.state.hoten,
              lop: this.state.lop,
              
            });

          }}
        />
      </View>
    
     
    );
  }
}

class DetailsScreen extends React.Component {
      constructor(props){
    super(props);
    this.state = { dssv: [
      {
        "key": "1",
        "hoten": "Vu Hai Duong",
        "lop": "CNTT K14",
        "anh": "https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCH55aQ0QEQARgBMghzIxW-4yyOqQ",
      },
      {
        "key": "2",
        "hoten": "Nguyen Van A",
        "lop": "CNTT K14",
        "anh": "https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCHj4SdmAEQARgBMggiNOI4nidMOg",
      },
      {
        "key": "3",
        "hoten": "Tran Thi C",
        "lop": "CNTT K14",
        "anh": "https://cdn.24h.com.vn/upload/4-2019/images/2019-10-04/120x90/1570158442-52-nmax-1-1570156872-width640height480.jpg",
      },
      ],

      };
      const newSV = {
        key: this.props.navigation.getParam('hoten', 'NO-ID'),
        hoten: this.props.navigation.getParam('hoten', 'hoten'),
        anh: "https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDHlvv5nAEQARgBMghF53xUZNynPw",
        lop: this.props.navigation.getParam('lop', 'lop')
    };    
    this.state.dssv.push(newSV);  
         
                        
  }

  
  render() {
    return (
    <View style={{flex: 1, flexDirection:'column',}}>
        <View>
          <Text style={{color:'green', fontSize: 20,alignItems:'center'}}>Danh sach sv</Text>
        </View>
        <View>
            <FlatList
              data={this.state.dssv}
              renderItem={({item}) =>  (
            <View style={{backgroundColor: 'tomato',flex: 1, flexDirection: 'row'}}>

                <Image source={{uri: item.anh }}  style={{width: 100, height: 100, margin: 5}}/>
                <View style={{
                  flex: 1,
                  flexDirection:'column',   
                  height: 100                 
                }}>
                  <Text style={styles.text}>{item.hoten}</Text>
                  <Text style={styles.text}>{item.lop}</Text>
              </View>

              
              
          </View>
          ) }

          />
        </View>

        <View style={{color:'green',flex:1, height:1}}>
        </View>
    </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

export default createAppContainer(RootStack);

const styles = StyleSheet.create({
  text: {
      color: 'white',
      padding: 2,
      fontSize: 16,  
  }
});
