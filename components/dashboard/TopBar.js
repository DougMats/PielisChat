import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma, colorEpsilon, colorDseta } from '../../Colors.js'

const windowWidth = Dimensions.get('window').width;
const Wseventeen = (windowWidth * 70) / 100;
const columns = Wseventeen / 12;
const WW = (columns * 10)
const HH = WW / 3.3;

function TopBar(props) {
  const data = { name: "Douglas jesus matos parra" }




  return (
    <View style={{
      backgroundColor:colorGamma,
      width: "100%",
      flexDirection: "row",
      paddingTop: 10,
      paddingBottom: 5, }}>
      <View style={{ width: "70%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: WW, height: HH }}>
          <Image style={{
            width: null,
            height: null,
            resizeMode: "center",
            flex: 1
          }}
            source={require("../../images/logo-white.png")} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, paddingBottom: 10, width: "30%", alignContent: "center", alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
        <TouchableOpacity onPress={() => props.openTopMenuSearch()}>
          <Icon name="search" fill={"white"} width={30} height={30} style={{ top: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.openTopMenu()}>
          <Icon name="more-vertical" fill={"white"} width={30} height={30} style={{ top: 5 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row"
  },
  btn: {}
})
export default TopBar;