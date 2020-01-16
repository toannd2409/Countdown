import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
export default class Home extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
      super(props);
      //initialize the counter duration
      this.state = {
        totalDuration: 0,
        expirydate: ""
      };
   
    }
  
  componentDidMount() {

    this.setTime(this.state.expirydate)
  }
  
  _setExpiryDate(expirydate){
    this.setState({expirydate:expirydate})
    console.warn(expirydate.slice(0,4))
    this.setTime(expirydate)
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
      console.warn(error)
      d = 0
    }    
    that.setState({ totalDuration: d});
  }

  render() {
    const {navigate} = this.props.navigation;
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
                      time: this.state.expirydate
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
                    timeLabelStyle = {styles.timeLable} 
                    onPress={() => alert('Countdown to 2020:01:01 00:00:00')}
                    digitTxtStyle = {styles.digitTxt} />

                <Text style={styles.text2020}>2020</Text>

                <Text style={{marginTop:10, marginBottom: 50,color: 'white', fontSize: 20,textAlign:'center'}}>🌸 happy new year 🌸</Text>
                </View>
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