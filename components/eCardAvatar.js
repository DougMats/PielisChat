import React from 'react'
import {Linking, Platform, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { Icon } from 'react-native-eva-icons';
const windowWidth = Dimensions.get('window').width;
import { colorBeta, colorGamma, colorEpsilon, colorDseta } from '../Colors.js'


function CardAvatar(props) {



  const CallPhone = async (jid) => {
    let number = jid.split('@')[0]
    await Linking.openURL(`tel:+${number}`)
    props.goToScreen("Dashboard",null )
    //props.hiddenAvatar()
  }






  return (
    <TouchableOpacity
      onPress={() => props.hiddenAvatar()}
      style={styles.wrap}>
      <View style={styles.card}>



        <View style={styles.contained}>

          <View style={styles.head}>
            <Text style={styles.name}>
              {
                (props.data.name.length > 25) ? ((props.data.name.substring(0, 25 - 3)) + '...') : props.data.name
              }
            </Text>
          </View>
          <Image source={{ uri: props.data.profilePicture }} style={styles.avatar} />
        </View>
        <View style={styles.foot}>
          <TouchableOpacity onPress={()=> props.goToScreen("Chat",props.data )}style={styles.btn}>
            <Icon name="message-square" fill={colorDseta} width={25} height={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>CallPhone(props.data.jid) }style={styles.btn}>
            <Icon name="phone" fill={colorDseta} width={25} height={25} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btn}>
            <Icon name="video" fill={colorDseta} width={25} height={25} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={()=>props.goToScreen("ContactView", props.data) }style={styles.btn}>
            <Icon name="alert-circle-outline" fill={colorDseta} width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 99999,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  card: {
    flexDirection: "column",
    width: windowWidth - 100
  },
  contained: {
    width: windowWidth - 100,
    height: windowWidth - 100,
    backgroundColor: "white"
  },
  head: {
    position: "absolute",
    zIndex: 99999,
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  name: {
    color: "white",
    fontSize: 20
  },




  avatar: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  foot: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#111",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  btn: {
    padding: 10
  }
})


export default CardAvatar;