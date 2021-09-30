import React, { useState, useEffect, useCallback, Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Platform, Alert, Image } from "react-native";
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorDseta, colorGamma } from "../../../Colors";
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Slider from 'rn-range-slider';
import Sound from 'react-native-sound';
import PlayerScreen from 'react-native-sound-playerview'

Sound.setCategory('Playback');


const THUMB_RADIUS = 12;


function MessageAudio(props) {
  const [playing, setplaying] = useState(false);
  const [position, setposition] = useState(0);
  const [data, setdata] = useState(null);

  useEffect(() => {
    get()
  }, [props.data]);

  async function get() {
    console.log("get automatically")
    const URL = await getSound(props.data.message.audioMessage.mediaKey, props.data.message.audioMessage.url)
    // console.log("URL AUDIO:", URL)
    setdata(URL)
  }

  async function getSound(mediaKey, url) {
    var bodyFormData = new FormData();
    bodyFormData.append('mediakey', mediaKey)
    bodyFormData.append('filenc', url)
    const response = await axios({
      method: "post",
      url: "https://pdtclientsolutions.com:5000/decrypt/audio",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
    return response
  }

  // {"config": {
  //   "adapter": [Function xhrAdapter],
  //   "data": {"_parts": [Array]},
  //   "headers": {"Accept": "application/json, text/plain, */*"},
  //   "maxBodyLength": -1,
  //   "maxContentLength": -1,
  //   "method": "post",
  //   "timeout": 0,
  //   "transformRequest": [[Function transformRequest]],
  //   "transformResponse": [[Function transformResponse]],
  //   "transitional": {
  //     "clarifyTimeoutError": false,
  //     "forcedJSONParsing": true,
  //     "silentJSONParsing": true},
  //     "url": "https://pdtclientsolutions.com:5000/decrypt/audio", "validateStatus": [Function validateStatus], "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN"},
  //     "data": {"file": "https://pdtclientsolutions.com/images_whatsapp/1632933207.33_audio.ogg"},
  //     "headers": {"access-control-allow-origin": "*",
  //     "content-length": "87",
  //     "content-type": "application/json",
  //     "date": "Wed, 29 Sep 2021 16:33:27 GMT",
  //     "server": "Werkzeug/1.0.1 Python/2.7.17"
  //   }, "request": {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": false, "_headers": {"accept": "application/json, text/plain, */*"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {"access-control-allow-origin": "*", "content-length": "87", "content-type": "application/json", "date": "Wed, 29 Sep 2021 16:33:27 GMT", "server": "Werkzeug/1.0.1 Python/2.7.17"}, "_method": "POST", "_perfKey": "network_XMLHttpRequest_https://pdtclientsolutions.com:5000/decrypt/audio", "_performanceLogger": {"_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]}, "_requestId": null, "_response": "{
  //   \"file\": \"https://pdtclientsolutions.com/images_whatsapp/1632933207.33_audio.ogg\"
  // }
  // ", "_responseType": "", "_sent": true, "_subscriptions": [], "_timedOut": false, "_trackingName": "unknown", "_url": "https://pdtclientsolutions.com:5000/decrypt/audio", "readyState": 4, "responseHeaders": {"Access-Control-Allow-Origin": "*", "Content-Length": "87", "Content-Type": "application/json", "Date": "Wed, 29 Sep 2021 16:33:27 GMT", "Server": "Werkzeug/1.0.1 Python/2.7.17"}, "responseURL": "https://pdtclientsolutions.com:5000/decrypt/audio", "status": 200, "timeout": 0, "upload": {}, "withCredentials": true}, "status": 200, "statusText": undefined}


  // const [low, setLow] = useState(0);
  // const [high, setHigh] = useState(100);

  const [rangeDisabled, setRangeDisabled] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(props.data.message.audioMessage.seconds);
  const [floatingLabel, setFloatingLabel] = useState(true);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    console.log("low and high: ", low + " / " + high)
    // setLow(low);
    // setHigh(high);
  }, []);

  // const toggleRangeEnabled = useCallback(() => setRangeDisabled(!rangeDisabled), [rangeDisabled]);
  // const setMinTo50 = useCallback(() => setMin(50), []);
  // const setMinTo0 = useCallback(() => setMin(0), []);
  // const setMaxTo100 = useCallback(() => setMax(100), []);
  // const setMaxTo500 = useCallback(() => setMax(500), []);
  // const toggleFloatingLabel = useCallback(() => setFloatingLabel(!floatingLabel), [floatingLabel]);

  function AudioSound(event) {
    var whoosh = new Sound(data.data.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      if (event === "play") {
        console.log('duration in seconds: ' + whoosh.getDuration() + ' - number of channels: ' + whoosh.getNumberOfChannels());
        setplaying(true)
        whoosh.play((success) => {
          setplaying(false)
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
      if (event === "pause") {
        console.log("ww pasusaaaaaa")
        whoosh.stop();
      }
    });



    // // Reduce the volume by half
    // whoosh.setVolume(0.5);

    // // Position the sound to the full right in a stereo field
    // whoosh.setPan(1);

    // // Loop indefinitely until stop() is called
    // whoosh.setNumberOfLoops(-1);

    // // Pause the sound
    // // whoosh.pause();

    // // Get properties of the player instance
    // console.log('volume: ' + whoosh.getVolume());
    // console.log('pan: ' + whoosh.getPan());
    // console.log('loops: ' + whoosh.getNumberOfLoops());

    // // Seek to a specific point in seconds
    // whoosh.setCurrentTime(2.5);

    // // Get the current playback point in seconds
    // whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));

    // // Stop the sound and rewind to the beginning
    // whoosh.stop(() => {
    //   // Note: If you want to play a sound after stopping and rewinding it,
    //   // it is important to call play() in a callback.
    //   whoosh.play();
    // });

    // // Release the audio player resource
    // whoosh.release();


  }// end AudioSound



  function toSecunds(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10) ? '0' + second : second;
    return hour + ':' + minute + ':' + second;
  }


  /* ____________________________________________ */


  /* ____________________________________________ */

  // this.props.navigation.navigate('player', {title: __TITLE__, filepath: __AUDIO_FILEPATH__, dirpath: Sound.MAIN_BUNDLE });



  return (
    <View style={[styles.wrap, {
      maxWidth: props.MaxWidth,
      backgroundColor: props.data.key.fromMe ? props.ColorSend : props.ColorReceive,
      borderTopRightRadius: props.direction === "left" ? 0 : 20,
      borderBottomRightRadius: props.direction === "left" ? 0 : 20,
      borderTopLeftRadius: props.direction === "left" ? 20 : 0,
      borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {props.forwarded()}
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <TouchableOpacity
          onPress={() => { playing === false ? AudioSound("play") : AudioSound("pause") }}
          style={{ justifyContent: "flex-end", paddingBottom: 10, bottom: 10 }}>
          <Icon name={playing === false ? 'play-circle' : 'pause-circle'} fill={colorAlfa} width={45} height={45} />
        </TouchableOpacity>


        <View style={{ width: (props.MaxWidth / 6) * 3.8, flexDirection: "column", paddingHorizontal: 5 }}>




          <PlayerScreenControl />

          {/* <Slider
            //style={{}}
            min={min}
            max={max}
            step={1}
            disableRange={rangeDisabled}
            floatingLabel={floatingLabel}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          /> */}




          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#555" }}>{toSecunds(props.data.message.audioMessage.seconds)}</Text>
            {props.getdate(props.data.messageTimestamp, "#555")}
          </View>
        </View>
        <View style={{ width: props.MaxWidth / 6, height: props.MaxWidth / 6, backgroundColor: "silver", borderRadius: (props.MaxWidth / 6) / 2 }}>
          <Icon name="mic" fill={props.data.status === "PLAYED" ? "#0087FF" : "#2ECC71"} width={25} height={25} style={{ position: "absolute", zIndex: 2, bottom: -55, left: -5 }} />
        </View>
      </View>

    </View>
  )
}








const styles = StyleSheet.create({
  wrap: {
    marginVertical: 1,
    shadowColor: "#000",
    minWidth: "30%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },


  root1: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: colorBeta,
    borderRadius: 4,
  },
  text1: {
    fontSize: 16,
    color: '#fff',
  },
  root2: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colorBeta,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  root3: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7f7f7f',
  },
  root4: {
    height: 4,
    backgroundColor: colorBeta,
    borderRadius: 2,
  },
  root5: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
});


//top valor
const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root1} {...restProps}>
      <Text style={styles.text1}>{text}</Text>
    </View>
  );
};

//top arrow to label
const Notch = props => {
  return (
    <View style={styles.root2} {...props} />
  );
};

// linea gris
const Rail = () => {
  return (
    <View style={styles.root3} />
  );
};

//linea de color
const RailSelected = () => {
  return (
    <View style={styles.root4} />
  );
};

//botom
const Thumb = () => {
  return (
    <View style={styles.root5} />
  );
};


export default MessageAudio;





const img_speaker = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
const img_pause = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
const img_play = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
const img_playjumpleft = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
const img_playjumpright = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };












function PlayerScreenControl(){

  // static navigationOptions = props => ({
  //   title: props.navigation.state.params.title,
  // })

  // constructor() {
  //   super();
  //   this.state = {
  //     playState: 'paused', //playing, paused
  //     playSeconds: 0,
  //     duration: 0
  //   }
  //   this.sliderEditing = false;
  // }

  // componentDidMount() {
  //   this.play();

  //   this.timeout = setInterval(() => {
  //     if (this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing) {
  //       this.sound.getCurrentTime((seconds, isPlaying) => {
  //         this.setState({ playSeconds: seconds });
  //       })
  //     }
  //   }, 100);
  // }
  // componentWillUnmount() {
  //   if (this.sound) {
  //     this.sound.release();
  //     this.sound = null;
  //   }
  //   if (this.timeout) {
  //     clearInterval(this.timeout);
  //   }
  // }

  // onSliderEditStart = () => {
  //   this.sliderEditing = true;
  // }
  // onSliderEditEnd = () => {
  //   this.sliderEditing = false;
  // }
  // onSliderEditing = value => {
  //   if (this.sound) {
  //     this.sound.setCurrentTime(value);
  //     this.setState({ playSeconds: value });
  //   }
  // }

  // play = async () => {
  //   if (this.sound) {
  //     this.sound.play(this.playComplete);
  //     this.setState({ playState: 'playing' });
  //   } else {
  //     const filepath = this.props.navigation.state.params.filepath;
  //     var dirpath = '';
  //     if (this.props.navigation.state.params.dirpath) {
  //       dirpath = this.props.navigation.state.params.dirpath;
  //     }
  //     console.log('[Play]', filepath);

  //     this.sound = new Sound(filepath, dirpath, (error) => {
  //       if (error) {
  //         console.log('failed to load the sound', error);
  //         Alert.alert('Notice', 'audio file error. (Error code : 1)');
  //         this.setState({ playState: 'paused' });
  //       } else {
  //         this.setState({ playState: 'playing', duration: this.sound.getDuration() });
  //         this.sound.play(this.playComplete);
  //       }
  //     });
  //   }
  // }
  // playComplete = (success) => {
  //   if (this.sound) {
  //     if (success) {
  //       console.log('successfully finished playing');
  //     } else {
  //       console.log('playback failed due to audio decoding errors');
  //       Alert.alert('Notice', 'audio file error. (Error code : 2)');
  //     }
  //     this.setState({ playState: 'paused', playSeconds: 0 });
  //     this.sound.setCurrentTime(0);
  //   }
  // }

  // pause = () => {
  //   if (this.sound) {
  //     this.sound.pause();
  //   }

  //   this.setState({ playState: 'paused' });
  // }

const jumpPrev15Seconds = () => {


  //this.jumpSeconds(-15);

}


const jumpNext15Seconds = () => {
  //this.jumpSeconds(15);
}


  // jumpSeconds = (secsDelta) => {
  //   if (this.sound) {
  //     this.sound.getCurrentTime((secs, isPlaying) => {
  //       let nextSecs = secs + secsDelta;
  //       if (nextSecs < 0) nextSecs = 0;
  //       else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
  //       this.sound.setCurrentTime(nextSecs);
  //       this.setState({ playSeconds: nextSecs });
  //     })
  //   }
  // }

  // getAudioTimeString(seconds) {
  //   const h = parseInt(seconds / (60 * 60));
  //   const m = parseInt(seconds % (60 * 60) / 60);
  //   const s = parseInt(seconds % 60);

  //   return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
  // }



    // const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    // const durationString = this.getAudioTimeString(this.state.duration);

    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'red' }}>

<View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>



<TouchableOpacity onPress={()=>jumpPrev15Seconds()} style={{ justifyContent: 'center' }}>
            <Image source={img_playjumpleft} style={{ width: 30, height: 30 }} />
            <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 1, color: 'white', fontSize: 12 }}>15</Text>
          </TouchableOpacity>



        {/* 
       

         
          {this.state.playState == 'playing' &&
            <TouchableOpacity onPress={this.pause} style={{ marginHorizontal: 20 }}>
              <Image source={img_pause} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>}
          {this.state.playState == 'paused' &&
            <TouchableOpacity onPress={this.play} style={{ marginHorizontal: 20 }}>
              <Image source={img_play} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>}

        */}

          <TouchableOpacity onPress={()=>jumpNext15Seconds()} style={{ justifyContent: 'center' }}>
            <Image source={img_playjumpright} style={{ width: 30, height: 30 }} />
            <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 1, color: 'white', fontSize: 12 }}>15</Text>
          </TouchableOpacity>
          {/*
        </View>
        <View style={{ marginVertical: 15, marginHorizontal: 15, flexDirection: 'row' }}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString}</Text>
          <Slider
            onTouchStart={this.onSliderEditStart}
            // onTouchMove={() => console.log('onTouchMove')}
            onTouchEnd={this.onSliderEditEnd}
            // onTouchEndCapture={() => console.log('onTouchEndCapture')}
            // onTouchCancel={() => console.log('onTouchCancel')}
            onValueChange={this.onSliderEditing}
            value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white'
            style={{ flex: 1, alignSelf: 'center', marginHorizontal: Platform.select({ ios: 5 }) }} />
          <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString}</Text>
        */}
 </View>
      </View>
    )
}