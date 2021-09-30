import React, { useState, useEffect } from 'react'
import { Linking, Platform, TouchableOpacity, StyleSheet, Text, View, Image, Modal, Dimensions } from 'react-native'
import { Icon } from 'react-native-eva-icons';
const windowWidth = Dimensions.get('window').width;
import { colorBeta, colorGamma, colorEpsilon, colorDseta } from '../../Colors.js'
import ImageZoom from 'react-native-image-pan-zoom';

function UserCard(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [img, setimg] = useState(null);
  const [modal, setmodal] = useState(false);

  const CallPhone = async (jid) => {
    let number = jid.split('@')[0]
    await Linking.openURL(`tel:+${number}`)
    props.goToScreen("Dashboard", null)
    //props.hiddenAvatar()
  }

useEffect(() => {
 if(img !== null){
  setmodal(true)
 }
}, [img]);

  return (
    <TouchableOpacity
      onPress={() => props.hiddenAvatar()}
      style={styles.wrap}>
      <View style={styles.card}>

        <TouchableOpacity
          onPress={() => setimg(props.data.profilePicture)}
          style={styles.contained}>
          <View style={styles.head}>
            <Text style={styles.name}>
              {
                (props.data.name.length > 25) ? ((props.data.name.substring(0, 25 - 3)) + '...') : props.data.name
              }
            </Text>
          </View>
          <Image source={{ uri: props.data.profilePicture }} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.foot}>
          <TouchableOpacity onPress={() => props.goToScreen("Chat", props.data)} style={styles.btn}>
            <Icon name="message-square" fill={colorDseta} width={25} height={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => CallPhone(props.data.jid)} style={styles.btn}>
            <Icon name="phone" fill={colorDseta} width={25} height={25} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btn}>
            <Icon name="video" fill={colorDseta} width={25} height={25} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => props.goToScreen("ContactView", props.data)} style={styles.btn}>
            <Icon name="alert-circle-outline" fill={colorDseta} width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modal} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <TouchableOpacity
            onPress={() => setmodal(false)}
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: 999999999,
              position: "absolute", right: 10, top: 10, borderRadius: 50, padding: 4
            }}>
            <Icon name="close-circle-outline" fill="#FFF" width={30} height={30} />
          </TouchableOpacity>
          <ImageZoom
            cropWidth={windowWidth - 20}
            cropHeight={windowHeight - 10}
            imageWidth={windowWidth - 20}
            imageHeight={windowHeight - 20}
          >
            <Image
              style={{ width: "100%", height: "100%", flex: 1, resizeMode: "center" }}
              source={{ uri: img }}
            />
          </ImageZoom>
        </View>
      </Modal>

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
export default UserCard;