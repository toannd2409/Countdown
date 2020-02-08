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
  TouchableHighlight,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

export default class Home extends Component {
  static navigationOptions = {
    headerShown: false,
    };
    constructor(props) {
      super(props);
      //initialize the counter duration
      this.state = {
        totalDuration: 0,
        expirydate: "",
        event: "",
        modalVisible: false,
        gradient1: ['#f43b47', '#453a94']
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

  _setBackground(color){
    this.setState({gradient1: color})
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
      let colorGradient = ''
      const eventValue = await AsyncStorage.getItem('EVENT');
      const dateValue = await AsyncStorage.getItem('DATE_TIME');
      colorGradient = await AsyncStorage.getItem('COLOR_GRADIENT');

      if(dateValue != null){
        this.setState({expirydate: dateValue})
        this.setTime(dateValue)
      }

      if(eventValue != null)
        this.setState({event: eventValue})

      if(colorGradient != null)
        this.setState({gradient1: JSON.parse(colorGradient)})

      console.warn('gradient:' + colorGradient)
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
            <LinearGradient  
            colors={this.state.gradient1}
             style={styles.container}>
             <View style={{flex:1, width:'100%'}}>
                <TouchableOpacity
                    onPress={() => navigate('EditTime', {
                      setExpiryDate: this._setExpiryDate.bind(this),
                      setBackground: this._setBackground.bind(this),
                      time: this.state.expirydate,
                      event: this.state.event
                    })}
                    style={{width: 30, height: 30, marginTop:20,marginRight:20, position: 'absolute', right:0}}>
                    <Image
                    style={{width: 30, height: 30}}
                    source={require('./../../images/ic_edit.png')} />
                </TouchableOpacity >

                <Text style={styles.textCountdown}>Countdown</Text>
                <View style={{backgroundColor: 'rgba(0, 0, 0,0.3)', marginStart: 30, marginEnd: 30, padding:40, borderRadius: 15}}>
                  <CountDown 
                      until = {this.state.totalDuration}
                      size = {25}
                      digitStyle = {styles.digit}
                      onFinish={() => {
                        this.removeItemValue()}}
                      timeLabelStyle = {styles.timeLable} 
                      digitTxtStyle = {styles.digitTxt} />
              </View>
                <Text style={styles.txtEvent}>{this.state.event}</Text>
                <Text style={{position: 'absolute', bottom:8, color: 'white', alignSelf:'center', fontSize: 8}}>Develop by ToanND</Text>
                <TouchableOpacity
                    onPress={() => {this.setModalVisible(true)}}
                    style={{ alignSelf:'center', margin: 30, flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0,0.3)', paddingStart: 30, paddingEnd: 30, padding: 10, borderRadius: 30, borderWidth:1, borderColor: '#fff'}}>
                      <Text style={{alignSelf:'center', fontSize: 16, color:'#fff'}}>Reset</Text>
                </TouchableOpacity >
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
            </LinearGradient>
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
  textCountdown: {
    marginTop:25, 
    marginBottom: 80,
    color: 'white', 
    fontSize: 20, 
    alignSelf:'center',
  },
  digit: {
    backgroundColor: 'rgba(255, 255, 255,0)',
    borderRadius: 100,
    borderColor: '#FFF',
    borderWidth: 2,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitTxt: {
      color: '#FFF',
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
  txtEvent: {
    margin: 30,
    color: 'white', 
    fontSize: 18,
    textAlign:'center'
  }
});