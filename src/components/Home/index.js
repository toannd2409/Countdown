import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

export default class Home extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
      super(props);
      //initialize the counter duration
      this.state = {
        totalDuration: 0,
        expirydate: "",
        event: "",
        modalVisible: false,
      };
   
    }
  
  componentDidMount() {
    // this.setTimeNewYear()
    this._getValueKey()
  }
  
  _setExpiryDate(expirydate, event){
    this.setState({expirydate:expirydate})
    this.setState({event:event})
    this.setTime(expirydate)
  }

  setTimeNewYear = () => {
    let exDate = "2020-01-25 00:00:00";
    let d = 0
    var date = moment()
        .utcOffset('+07:00')
        .format('YYYY-MM-DD HH:mm:ss');

    var diffr = moment.duration(moment(exDate).diff(moment(date)));
        
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    d = hours * 60 * 60 + minutes * 60 + seconds;
    this.setState({ totalDuration: d});

    if(d <= 0)
      this.setTime(this.state.expirydate)
  }
  
  setTime = (expirydate) => {
    let exDate = "";
    let d = 0
    try {
      var that = this;
      var date = moment()
        .utcOffset('+07:00')
        .format('YYYY-MM-DD HH:mm:ss');

      exDate = expirydate;
      var diffr = moment.duration(moment(exDate).diff(moment(date)));
        
      var hours = parseInt(diffr.asHours());
      var minutes = parseInt(diffr.minutes());
      var seconds = parseInt(diffr.seconds());

      if(exDate=="") {
        d = 0
      } else {
        d = hours * 60 * 60 + minutes * 60 + seconds;
      }
    } catch (error) {
      d = 0
    }    
    that.setState({ totalDuration: d});
  }

  _getValueKey = async () => {
    try {
      const eventValue = await AsyncStorage.getItem('EVENT');
      const dateValue = await AsyncStorage.getItem('DATE_TIME');

      if(dateValue != null){
        this.setState({expirydate: dateValue})
        this.setTime(dateValue)
      }

      if(eventValue != null)
      this.setState({event: eventValue})

    } catch (error) {
      // Error retrieving data
    }
  };

  async removeItemValue() {
    try {
      await AsyncStorage.removeItem('EVENT');
      await AsyncStorage.removeItem('DATE_TIME');
      
      this.setState({
        event: "",
        totalDuration: 0,
        expirydate: ""
      })

      return true;
    }
    catch(exception) {
      return false;
    }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  render() {
    const {navigate} = this.props.navigation;
    console.disableYellowBox = true; 
    return (
      <View >
            <StatusBar hidden={true}/>
            <ImageBackground  
            source={{uri: 'https://s1.1zoom.me/b7866/985/Christmas_Snowflakes_Red_background_Template_573816_1080x1920.jpg'}}
             style={styles.container}>
             <View style={{flex:1, width:'100%'}}>
                <TouchableOpacity
                    onPress={() => navigate('EditTime', {
                      setExpiryDate: this._setExpiryDate.bind(this),
                      time: this.state.expirydate,
                      event: this.state.event
                    })}
                    style={{width: 30, height: 30, marginTop:20,marginRight:20, position: 'absolute', right:0}}>
                    <Image
                    style={{width: 30, height: 30,  position: 'absolute', right:0}}
                    source={require('./../../images/ic_edit.png')} />
                </TouchableOpacity >

                <Text style={{marginTop:50, marginBottom: 50,color: 'white', fontSize: 20, textAlign:'center'}}>Countdown</Text>

                <CountDown 
                    until = {this.state.totalDuration}
                    size = {25}
                    digitStyle = {styles.digit}
                    onFinish={() => {
                      this.removeItemValue()}}
                    timeLabelStyle = {styles.timeLable} 
                    digitTxtStyle = {styles.digitTxt} />

                <TouchableOpacity
                    onPress={() => {this.setModalVisible(true)}}
                    style={{width: 40, height: 40, alignSelf:'center', marginTop: 30}}>
                    <Image
                    style={{width: 40, height: 40}}
                    source={require('./../../images/ic_reset.png')} />
                </TouchableOpacity >
                
                <Text style={{marginTop:30, marginBottom: 50,color: 'white', fontSize: 20,textAlign:'center'}}>{this.state.event}</Text>
                </View>
                <Dialog
                  visible={this.state.modalVisible}
                  footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => {this.setModalVisible(false)}}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => {this.removeItemValue(), this.setModalVisible(false)}}
                      />
                    </DialogFooter>
                  }
                >
                  <DialogContent
                  style = {{width: 250, height: 100, padding: 20}}>
                    <Text>Do you want to reset Countdown? {this.state.expirydate}</Text>
                  </DialogContent>
                </Dialog>
            </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      width:'100%',
      height:'100%',
      alignItems: 'center',
  },
  text2020: {
      fontSize:50,
      color: '#FFF',
      marginTop: 15,
      textShadowColor: 'yellow',
      textAlign:'center'
  },
  digit: {
      backgroundColor: '#FFF',
      borderRadius: 50,
      marginHorizontal: 4,
      borderWidth: 1  ,
      borderColor:'#f23c4b',
      opacity: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  digitTxt: {
      color: '#CB2938'
  },
  timeLable: {
      color: "#FFF",
  },
  txtHappy: {
      fontSize:25,
      color: '#FFF',
      margin: 20,
      textShadowColor: 'yellow'
  },
  txtNewYear: {
      fontSize:40,
      color: '#6746E7',
      margin: 20,
      textShadowColor: 'yellow'
  },
});