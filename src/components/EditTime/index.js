import React, { Component } from 'react';
import { 
  Text,
  View,
  Picker, 
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

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

  getTime(){
    var d = moment().utcOffset('+07:00').format('YYYY-MM-DD');
    this.setState({date: d})
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
              dateIcon: {
                display: 'none'
              },
              dateInput: {
                borderRadius: 50
              },
              dateText: {
                fontSize: 18
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date});console.log("date: " +date)}} />
            
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

          <Text style={styles.textTitle}>Countdown title</Text>
          <View style={styles.subContainer}>
            <TextInput 
            style={styles.textInputEvent}
            placeholder = 'Event name...'
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles =  StyleSheet.create({
  textTitle: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  subContainer: {
    paddingStart: 20,
    paddingEnd: 20
  },
  datePicker: {
    width: '100%', 
    marginBottom:30,
    justifyContent:'center',
  },
  viewTime: {
    flexDirection:'row', 
    alignContent:'center'
  },
  pickerTime: {
    height: 50, 
    width: 120, 
    left: 50
  },
  textTime: {
    width: 80,
    fontSize: 16
  },
  textInputEvent: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 5,
    paddingStart: 10
  }
});