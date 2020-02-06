import React, { Component } from 'react';
import { 
  Text,
  View,
  Picker, 
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { CustomPicker } from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';

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
      event: "",
      colorGradient: ['#000', '#000'],
      colorName: "No background"
    }
  }
  static navigationOptions = {
    title: 'Change countdown timer'
  };
  
  componentDidMount(){
    this.getTime()
    this.getTimePicker()
    this._getBackground()    
  }

  _getBackground = async () => {
    try {
    let colorGradient = ''
    let colorName = ''
    colorGradient = await AsyncStorage.getItem('COLOR_GRADIENT');
    colorName = await AsyncStorage.getItem('COLOR_NAME');

    if(colorGradient != null)
      this.setState({colorGradient: JSON.parse(colorGradient)})
    
    if(colorName != null)
      this.setState({colorName: colorName})
    } catch (error) {
      
    }
  }

  goBack = () => {
    const { date,event, selectHour, selectMinute, selectSecond, colorGradient, colorName} = this.state;
    const {setExpiryDate, setBackground} = this.props.navigation.state.params
    let expriDate = date + " " + selectHour + ":" + selectMinute + ":" + selectSecond
    setExpiryDate(expriDate, event)
    setBackground(colorGradient)
    
    this._saveKey("EVENT", event)
    this._saveKey("DATE_TIME", expriDate)
    this._saveKeyArray("COLOR_GRADIENT", colorGradient)
    this._saveKey("COLOR_NAME", colorName)
    
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
  _saveKeyArray = async (key, value) => {
    try {
      await AsyncStorage.setItem(key,  JSON.stringify(value))
    } catch (error) {
      
    }
  }


  changeBackground(color, label){
    let colorGradient = []
    let colorName = ""
    colorGradient = color
    colorName = label

    this.setState({colorGradient})
    this.setState({colorName})
  }

  render() {
    const options = [
      {color: ['#000', '#000'], label: 'No background', value: 0},
      {color: ['#ff9a9e', '#fad0c4'], label: 'Warm Flame', value: 1},
      {color: ['#a18cd1', '#fbc2eb'], label: 'Night Fade', value: 2},
      {color: ['#fad0c4', '#ffd1ff'], label: 'Spring Warmth', value: 3},
      {color: ['#ffecd2', '#fcb69f'], label: 'Juicy Peach', value: 4},
      {color: ['#ff8177', '#ff8c7f', '#f99185', '#cf556c'], label: 'Young Passion', value: 5},
      {color: ['#ff9a9e', '#fecfef'], label: 'Lady Lips', value: 6},
      {color: ['#f6d365', '#fda085'], label: 'Sunny Morning', value: 7},
      {color: ['#fbc2eb', '#a6c1ee'], label: 'Rainy Ashville', value: 8},
      {color: ['#fdcbf1', '#e6dee9'], label: 'Frozen Dreams', value: 9},
      {color: ['#a1c4fd', '#c2e9fb'], label: 'Winter Neva', value: 10},
      {color: ['#d4fc79', '#96e6a1'], label: 'Dusty Grass', value: 11},
      {color: ['#84fab0', '#8fd3f4'], label: 'Tempting Azure', value: 12},
      {color: ['#cfd9df', '#e2ebf0'], label: 'Heavy Rain', value: 13},
      {color: ['#a6c0fe', '#f68084'], label: 'Amy Crisp', value: 14},
      {color: ['#fccb90', '#d57eeb'], label: 'Mean Fruit', value: 15},
      {color: ['#e0c3fc', '#8ec5fc'], label: 'Deep Blue', value: 16},
      {color: ['#f093fb', '#f5576c'], label: 'Ripe Malinka', value: 17},
      {color: ['#fdfbfb', '#ebedee'], label: 'Cloudy Knoxville', value: 18},
      {color: ['#4facfe', '#00f2fe'], label: 'Malibu Beach', value: 19},
      {color: ['#43e97b', '#38f9d7'], label: 'New Life', value: 20},
      {color: ['#fa709a', '#fee140'], label: 'True Sunset', value: 21},
      {color: ['#30cfd0', '#330867'], label: 'Morpheus Den', value: 22},
      {color: ['#a8edea', '#fed6e3'], label: 'Rare Wind', value: 23},
      {color: ['#5ee7df', '#b490ca'], label: 'Near Moon', value: 24},
      {color: ['#d299c2', '#fef9d7'], label: 'Wild Apple', value: 25},
      {color: ['#f5f7fa', '#c3cfe2'], label: 'Saint Petersburg', value: 26},
      {color: ['#16d9e3', '#30c7ec', '#46aef7'], label: 'Arielles Smile', value: 27},
      {color: ['#667eea', '#764ba2'], label: 'Plum Plate', value: 28},
      {color: ['#fdfcfb', '#e2d1c3'], label: 'Everlasting Sky', value: 29},
      {color: ['#89f7fe', '#66a6ff'], label: 'Happy Fisher', value: 30},
      {color: ['#fddb92', '#d1fdff'], label: 'Blessing', value: 31},
      {color: ['#9890e3', '#b1f4cf'], label: 'Sharpeye Eagle', value: 32},
      {color: ['#ebc0fd', '#d9ded8'], label: 'Ladoga Bottom', value: 33},
      {color: ['#96fbc4', '#f9f586'], label: 'Lemon Gate', value: 34},
      {color: ['#2af598', '#009efd'], label: 'Itmeo Branding', value: 35},
      {color: ['#cd9cf2', '#f6f3ff'], label: 'Zeus Miracle', value: 36},
      {color: ['#48c6ef', '#6f86d6'], label: 'Fly High', value: 37},
      {color: ['#c471f5', '#fa71cd'], label: 'Mixed Hopes', value: 38},
      {color: ['#f43b47', '#453a94'], label: 'Red Salvation', value: 39},
      {color: ['#fcc5e4', '#fda34b', '#ff7882', '#c8699e', '#7046aa', '#0c1db8', '#020f75'], label: 'Wide Matrix', value: 40},
    ]
    
    return (
      <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
        <View style={{ flex: 1, padding:10, backgroundColor: 'white'}}>
        <StatusBar hidden={true}/>
          <Text style={styles.textTitle}>COUNTDOWN TITLE</Text>
          <View style={styles.subContainer}>
            <TextInput 
            style={styles.textInputEvent}
            flat = 'outlined'
            placeholder = 'Event name...'
            onChangeText={(text) => this.setState({event: text})}
            value={this.state.event}
            />
          </View>

          <View style={{height:1, backgroundColor: '#d8d8d8', margin: 10, marginTop: 30}}/>
          
          <Text style={styles.textTitle}>COUNTDOWN TIMER</Text>
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

          <View style={{height:1, backgroundColor: '#d8d8d8', margin: 10, marginTop: 30}}/>

          <Text style={styles.textTitle}>BACKGROUND</Text>

          <View style={styles.subContainer}>
            <View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end'}}>
              <LinearGradient 
                style = {{width: 30, height: 30, marginEnd: 15}}
                colors = {this.state.colorGradient}
              />
              
              <CustomPicker
                placeholder={'Please select your favorite background...'}
                options={options}
                getLabel={item => item.label}
                fieldTemplate={this.renderField}
                optionTemplate={this.renderOption}
                onValueChange={value => {
                  this.changeBackground(value.color, value.label)
                }}
              />
            </View>
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
  renderOption(settings) {
    const { item, getLabel } = settings
    return (
      <View style={styles.optionContainer}>
        <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
          <LinearGradient style={[styles.box], {width: 30, height: 30, marginEnd: 10}} colors={item.color} />
          <Text style={{ color: item.color, alignSelf: 'flex-start' }}>{getLabel(item)}</Text>
        </View>
      </View>
    )
  }
  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={styles.innerContainer}>
              <Text style={[styles.text, { color: selectedItem.color }]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
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
    marginTop: 50,
    marginBottom: 50
  },
  textTitle: {
    fontSize: 14,
    margin: 10,
    marginBottom: 20,
    color: '#667484',
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
    borderColor: '#cecece',
    padding: 5,
    paddingStart: 10
  }
});