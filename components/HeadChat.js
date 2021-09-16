import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma }from '../Colors.js'

function HeadChat(props) {
  const data = props.data
  const [writing, setwriting] = useState(false);
  return (
    <View style={styles.wrap}>
      <View style={[{ width: "10%" }, styles.center]}>
        <TouchableOpacity onPress={() => props.goToScreen("Dashboard", null)}>
          <Icon name="arrow-back-outline" fill={"#fff"} width={30} height={30} />
        </TouchableOpacity>
      </View>
      <View style={[{ width: "70%" }, styles.center]}>
        <View style={{ width: "20%", }}>
          <View style={styles.avatarImageWraper}>
            <Image style={styles.avatarImage} source={{ uri: data.profilePicture }} />
          </View>
        </View>
        <TouchableOpacity onPress={() => props.goToScreen("ContactView", props.data)} style={{ flexDirection: "column" }}>
          <Text style={styles.avatarName}>
            {((data.name).length > 25) ? (((data.name).substring(0, 25 - 3)) + '...') : data.name}
          </Text>
          {
            writing &&
            <Text style={styles.writing}>Escribiendo...</Text>
          }
        </TouchableOpacity>
      </View>
      <View style={[{ width: "20%" }, styles.center]}>
        {/* <TouchableOpacity><Icon name="video" fill={"#fff"} width={30} height={30} /></TouchableOpacity>*/}
        {/* <TouchableOpacity><Icon name="phone" fill={"#fff"} width={30} height={30} /></TouchableOpacity> */}
        <TouchableOpacity onPress={() => props.openTopMenu()}><Icon name="more-vertical" fill={"#fff"} width={30} height={30} /></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    height: 60,
    backgroundColor: colorGamma,
    flexDirection: "row"
  },
  center: {
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  avatarImageWraper: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden"
  },
  avatarImage: {
    width: null,
    height: null,
    resizeMode: "center",
    flex: 1
  },
  avatarName: {
    color: "white",
    width: "100%",
    fontSize: 18,
    fontWeight: "bold"
  },
  writing: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14
  },
})
export default React.memo(HeadChat);