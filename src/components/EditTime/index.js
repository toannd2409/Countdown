import React, { Component } from 'react';
import { 
  Text,
  View,
  Picker, 
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

export default class EditTime extends Component {

  constructor(props){
    super(props)
    this.state = {
      date:"2020-01-01",
      pickerValueHour: [],
      pickerValueMinute: [],
      selectHour: "0",
      selectMinute: "0",
      selectSecond: "0",
      event: ""
    }
  }
  static navigationOptions = {
    title: 'Change countdown timer',
    headerStyle: {
      height: 54
    }
  };
  
  componentDidMount(){
    this.getTime()
    this.getTimePicker()    
  }

  goBack = () => {
    let expriDate = this.state.date + " " + this.state.selectHour + ":" +  this.state.selectMinute + ":" + this.state.selectSecond
    this.props.navigation.state.params.setExpiryDate(expriDate, this.state.event)
    this._saveKey("EVENT", this.state.event)
    this._saveKey("DATE_TIME", expriDate)
    this.props.navigation.goBack()
  }

  getTime(){
    var d = moment().utcOffset('+07:00').format('YYYY-MM-DD');
    let getDate = this.props.navigation.state.params.time
    let event = this.props.navigation.state.params.event
    if(getDate == ""){
      this.setState({date: d})
    }
    else {
      this.setState({
        date: getDate.slice(0,10),
        selectHour: getDate.slice(11,13),
        selectMinute: getDate.slice(14,16),
        selectSecond: getDate.slice(17,19),
        event: event })
        
    }
  }
  
  getTimePicker(){
    let pickerValueHour = []
    let pickerValueMinute = []
    var valueHour = ""
    for(let i = 0;i <24; i++) {
      if(i<10) 
        valueHour = "0" + i
      else 
        valueHour = i + ""
    
      pickerValueHour.push(<Picker.Item key={'key' + i} label={valueHour} value={valueHour} />);
    }
    
    for(let i = 0;i <60; i++) { 
      if(i<10) 
        valueHour = "0" + i
      else 
        valueHour = i + ""

      pickerValueMinute.push(<Picker.Item key={'key' + i} label={valueHour} value={valueHour} />);
    }

    this.setState({pickerValueHour})
    this.setState({pickerValueMinute})
  }

  _saveKey = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  }


  render() {
    
    return (
      <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
        <View style={{ flex: 1, padding:10, backgroundColor: 'white'}}>
        <StatusBar hidden={true}/>
          <Text style={styles.textTitle}>Countdown timer</Text>
          <View style={styles.subContainer}>
            <DatePicker
            style={styles.datePicker}
            
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderRadius: 5,
                borderColor: '#aaaaaa'
              },
              dateText: {
                fontSize: 18
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}} />
            
            <View style={styles.viewTime}>
              <View style={{justifyContent:'center'}}>
                <Text  style= {styles.textTime}>Hour</Text>
              </View>
              <Picker
                selectedValue={this.state.selectHour}
                style={styles.pickerTime}
                mode = "dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectHour: itemValue})
                }>
                  {this.state.pickerValueHour}
              </Picker>
            </View>
            
            <View style={styles.viewTime}>
              <View style={{justifyContent:'center'}}>
                <Text style= {styles.textTime}>Minute</Text>
              </View>
              <Picker
                selectedValue={this.state.selectMinute}
                style={styles.pickerTime}
                mode = "dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectMinute: itemValue})
                }>
                  {this.state.pickerValueMinute}
              </Picker>
            </View>
            
            <View style={styles.viewTime}>
              <View style={{justifyContent:'center'}}>
                <Text style= {styles.textTime}>Second</Text>
              </View>
              <Picker
                selectedValue={this.state.selectSecond}
                style={styles.pickerTime}
                mode = "dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectSecond: itemValue})
                }>
                  {this.state.pickerValueMinute}
              </Picker>
            </View>
          </View>

          <View style={{height:1, backgroundColor: '#bababa', margin: 10}}/>
          <Text style={styles.textTitle}>Countdown title</Text>
          <View style={styles.subContainer}>
            <TextInput 
            style={styles.textInputEvent}
            placeholder = 'Event name...'
            onChangeText={(text) => this.setState({event: text})}
            value={this.state.event}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress = {() => this.goBack()}>
            <Text style={{color:"#FFF"}}> Done </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles =  StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#15a6ea',
    padding: 10,
    borderColor: '#0895d8',
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 50
  },
  textTitle: {
    fontSize: 16,
    margin: 10,
    marginBottom: 20,
    color: '#969696',
  },
  subContainer: {
    paddingStart: 10,
    paddingEnd: 10
  },
  datePicker: {
    width: '100%', 
    marginBottom:30,
    justifyContent:'center',
  },
  viewTime: {
    width: '100%',
    flexDirection:'row', 
    alignContent:'center',
    justifyContent: 'space-between'
  },
  pickerTime: {
    height: 50, 
    width: 150, 
  },
  textTime: {
    width: 80,
    fontSize: 16
  },
  textInputEvent: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
    padding: 5,
    paddingStart: 10
  }
});