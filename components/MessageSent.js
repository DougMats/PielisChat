import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';

function MessageSent(props) {
  const [data, setdata] = useState(props.data);
  const [active, setactive] = useState(false);

  function getdate(info) {
    const datetime = parseInt(info)
    const date = new Date(datetime * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const time = `${date.getHours()}:${date.getMinutes()}`
    console.log(time, "datetime")
    //return `${day}/${month}/${year} ${time}`
    return `${time} p.m.`

  }

  if (data.message.imageMessage) { console.log("from me -> imageMessage"); return (<></>) }
  if (data.message.audioMessage) { console.log("from me -> audioMessage"); return (<></>) }
  if (data.message.conversation) {
    console.log("from me -> conversation");

    return (
      <TouchableOpacity
        onLongPress={() => setactive(!active)}
        //onPress={() => setshow(!show)}
        style={styles.wrap}>
        {active === true &&
          <TouchableOpacity onPress={() => setactive(false)} style={styles.actived}></TouchableOpacity>
        }
        <View style={styles.wrapper}>
          <Text style={styles.text}>{data.message.conversation}</Text>
          <Text style={styles.date}>

            {/* <Icon name="clock-outline" fill={"#000"} width={15} height={15} style={{ top: 2 }} /> */}

            {getdate(data.messageTimestamp)}</Text>
        </View>
      </TouchableOpacity>
    );

  }

  // return (
  //   <TouchableOpacity
  //     onLongPress={() => setactive(!active)}
  //     // onPress={() => setshow(!show)}
  //     style={styles.wrap}>
  //     {active === true &&
  //       <TouchableOpacity onPress={() => setactive(false)} style={styles.actived}></TouchableOpacity>
  //     }
  //     <View style={styles.wrapper}>
  //       <Text style={styles.text}>{data.text}</Text>
  //       <Text style={styles.date}>
  //       <Icon name="clock-outline" fill={"#000"} width={15} height={15} style={{top:2}}/>
  //       {data.date}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );
}
const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
  actived: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
    width: "100%",
    height: "100%"
  },
  wrapper: {
    marginVertical: 2,
    backgroundColor: "white",
    maxWidth: "80%",
    minWidth: "30%",
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  text: {
    marginBottom: 15,
    color: "#000"
  },
  date: {
    position: "absolute",
    right: 10,
    bottom: 5
  }
})
export default MessageSent;