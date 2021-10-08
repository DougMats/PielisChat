import React, { useState, useEffect, useCallback, Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Platform, Alert, Image } from "react-native";
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorDseta, colorGamma } from "../../../Colors";
import Toast from 'react-native-simple-toast';
import axios from 'axios';

import Slider from 'rn-range-slider';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const THUMB_RADIUS = 12;

function MessageAudio(props) {
  const [playing, setplaying] = useState("stop");
  const [position, setposition] = useState(0);
  const [data, setdata] = useState(null);
  const [whoosh, setwhoosh] = useState(null);
  const [counter, setcounter] = useState(0);

  useEffect(() => {
    get()
  }, [props.data]);

  useEffect(() => {
    if (data !== null) {
      var newwhoosh = new Sound(data.data.file, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // console.log('duration in seconds: ' + newwhoosh.getDuration() + ' - number of channels: ' + newwhoosh.getNumberOfChannels());
      });
      setwhoosh(newwhoosh)
    }
  }, [data]);

  async function get() {
    //console.log("get automatically")
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


  
  /* ____________________________________________ */
  function _Play() {
    Toast.show("play.")
    console.log("play")
    setplaying("play")
    whoosh.play((success) => {
      setplaying("stop")
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

  function _Pause() {
    Toast.show("pause.")
    console.log("pause")
    whoosh.pause();
    setplaying("pause")
  }

  function _Stop() {
    Toast.show("stop.")
    // // Stop the sound and rewind to the beginning
    // whoosh.stop(() => {
    //   // Note: If you want to play a sound after stopping and rewinding it,
    //   // it is important to call play() in a callback.
    //   whoosh.play();
    //   });
    // // Release the audio player resource
    //whoosh.release();
    // end AudioSound

    setplaying("stop")
  }

  // // Reduce the volume by half
  // whoosh.setVolume(0.5);

  // // Position the sound to the full right in a stereo field
  // whoosh.setPan(1);

  // // Loop indefinitely until stop() is called
  // whoosh.setNumberOfLoops(-1);


  //Get properties of the player instance
  // console.log('volume: ' + whoosh.getVolume());
  // console.log('pan: ' + whoosh.getPan());
  // console.log('loops: ' + whoosh.getNumberOfLoops());

  function _Seek(time) {
    // console.log("seek ", time)
    // Seek to a specific point in seconds
    // whoosh.setCurrentTime(8.0);
  }




  // // Get the current playback point in seconds
  // whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));







  /* ____________________________________________ */


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


  const TimerCounter = () => {

    if (playing === "play") {
      setTimeout(() => {
        setcounter(counter + 1)
      }, 1000);
    }
    return (<Text style={{ color: "#555" }}>{toSecunds(counter)}</Text>)
  }

  /* ____________________________________________ */

  const [rangeDisabled, setRangeDisabled] = useState(true);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(props.data.message.audioMessage.seconds);
  const [floatingLabel, setFloatingLabel] = useState(true);


  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {

    _Seek(low)
    // console.log(low,"-",high)

    // setLow(low);
    // setHigh(high);
  }, []);

  // const toggleRangeEnabled = useCallback(() => setRangeDisabled(!rangeDisabled), [rangeDisabled]);
  // const setMinTo50 = useCallback(() => setMin(50), []);
  // const setMinTo0 = useCallback(() => setMin(0), []);
  // const setMaxTo100 = useCallback(() => setMax(100), []);
  // const setMaxTo500 = useCallback(() => setMax(500), []);
  // const toggleFloatingLabel = useCallback(() => setFloatingLabel(!floatingLabel), [floatingLabel]);
  /* ____________________________________________ */
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

        {playing === "stop" &&
          <TouchableOpacity
            onPress={() => _Play()}
            style={{ justifyContent: "flex-end", paddingBottom: 10, bottom: 10 }}>
            <Icon name='play-circle' fill={colorAlfa} width={45} height={45} />
          </TouchableOpacity>
        }

        {playing === "play" &&
          <TouchableOpacity
            onLongPress={() => _Stop()}
            onPress={() => _Pause()}
            style={{ justifyContent: "flex-end", paddingBottom: 10, bottom: 10 }}>
            <Icon name='pause-circle' fill={colorAlfa} width={45} height={45} />
          </TouchableOpacity>
        }


        {playing === "pause" &&
          <TouchableOpacity
            onLongPress={() => _Stop()}
            onPress={() => _Play()}
            style={{ justifyContent: "flex-end", paddingBottom: 10, bottom: 10 }}>
            <Icon name='play-circle' fill={colorAlfa} width={45} height={45} />
          </TouchableOpacity>
        }

        <View style={{ width: (props.MaxWidth / 6) * 3.8, flexDirection: "column", paddingHorizontal: 5 }}>

          <Slider
            //style={{}}
            min={min}
            max={max}
            step={1}
            value={10}
            disableRange={rangeDisabled}
            floatingLabel={floatingLabel}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {playing === "stop" && <Text style={{ color: "#555" }}>{toSecunds(props.data.message.audioMessage.seconds)}</Text>}
            {playing !== "stop" && <TimerCounter />}
            {props.getdate(props.data.messageTimestamp, "#555")}
          </View>
        </View>
        <View style={{ width: props.MaxWidth / 6, height: props.MaxWidth / 6, }}>
        <Icon name="mic" fill={props.data.status === "PLAYED" ? "#0087FF" : "#2ECC71"} width={25} height={25}
          style={{ position: "absolute", zIndex: 1, bottom: -60, left: -5 }} />
            <View style={{ width: "100%", height: "100%", backgroundColor: "red", overflow: "hidden", position: "absolute", zIndex: -1, borderRadius: (props.MaxWidth / 6) / 2 }}>
            <Image source={
              props.data.key.fromMe === true?
              require('../../../images/isotype.png')
              :
              { uri: props.contact.profilePicture }
              } style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
          </View> 
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
// const img_speaker = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
// const img_pause = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
// const img_play = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
// const img_playjumpleft = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
// const img_playjumpright = { uri: "http://auditool.org/images/Fotolia_56692565_S.jpg" };
